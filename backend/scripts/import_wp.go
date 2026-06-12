package main

import (
	"encoding/xml"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode/utf8"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"yiaga-backend/models"
)

// WordPress XML Structures

type RSS struct {
	Channel Channel `xml:"channel"`
}

type Channel struct {
	Items []Item `xml:"item"`
}

type Item struct {
	Title       string     `xml:"title"`
	Link        string     `xml:"link"`
	PubDate     string     `xml:"pubDate"`
	Creator     string     `xml:"dc creator"`
	Content     string     `xml:"http://purl.org/rss/1.0/modules/content/ encoded"`
	Content2    string     `xml:"encoded"`
	Excerpt     string     `xml:"http://wordpress.org/export/1.2/excerpt/ encoded"`
	PostId      string     `xml:"http://wordpress.org/export/1.2/ post_id"`
	PostDate    string     `xml:"http://wordpress.org/export/1.2/ post_date"`
	PostName    string     `xml:"http://wordpress.org/export/1.2/ post_name"`
	Status      string     `xml:"http://wordpress.org/export/1.2/ status"`
	PostType    string     `xml:"http://wordpress.org/export/1.2/ post_type"`
	Categories  []Category `xml:"category"`
	PostMeta    []PostMeta `xml:"http://wordpress.org/export/1.2/ postmeta"`
	Attachments []Item     `xml:"item"` // Though usually attachments are separate items, sometimes embedded
}

type Category struct {
	Domain string `xml:"domain,attr"`
	Value  string `xml:",chardata"`
}

type PostMeta struct {
	MetaKey   string `xml:"meta_key"`
	MetaValue string `xml:"meta_value"`
}

var DB *gorm.DB

func initDB() {
	// 1. Move up from scripts directory to backend root if necessary, or just rely on where it's executed
	// Let's assume it's executed from the 'backend' folder
	envPath := ".env"
	if _, err := os.Stat(envPath); os.IsNotExist(err) {
		// Try moving up a directory if run from inside scripts folder
		envPath = "../.env"
	}

	err := godotenv.Load(envPath)
	if err != nil {
		log.Println("No .env file found or couldn't load, relying on system env variables")
	}

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is not set in .env")
	}

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	log.Println("Database connection established for import.")
}

func main() {
	if len(os.Args) < 2 {
		log.Fatalf("Usage: go run scripts/import_wp.go <path_to_xml_file>\nExample: go run scripts/import_wp.go ../yiagaafrica.WordPress.2026-03-09.xml")
	}

	xmlPath := os.Args[1]
	absPath, err := filepath.Abs(xmlPath)
	if err != nil {
		log.Fatalf("Invalid fast path: %v", err)
	}

	xmlFile, err := os.Open(absPath)
	if err != nil {
		log.Fatalf("Error opening XML file: %v", err)
	}
	defer xmlFile.Close()

	log.Printf("Parsing XML file: %s...", absPath)

	var rss RSS
	decoder := xml.NewDecoder(xmlFile)
	// strict false isn't directly available, but we can map namespaces if necessary.
	// We'll just decode normally.
	decoder.CharsetReader = nil
	err = decoder.Decode(&rss)
	if err != nil {
		log.Fatalf("Error unmarshaling XML. Ensure there are no unhandled charset issues: %v", err)
	}

	initDB()

	items := rss.Channel.Items
	log.Printf("Found %d items in the XML export. Processing up to 50 for testing...", len(items))

	// Truncate tables for fresh testing
	DB.Exec("TRUNCATE TABLE blog_posts, resources RESTART IDENTITY CASCADE;")
	log.Println("Cleared previous blog_posts and resources data.")

	var successCount, skipCount, errorCount, newsCount, blogCount, resourceCount int
	var totalProcessed int

	for _, item := range items {
		// 1. Check if it's a post type
		if item.PostType != "post" && item.PostType != "portfolio" {
			// Skip revisions, attachments, nav_menu_item, etc. unless we want to parse attachments.
			// Right now, mapping straight to BlogPost.
			skipCount++
			continue
		}

		if item.Status == "trash" || item.Status == "auto-draft" {
			skipCount++
			continue
		}

		// 2. Parse Date
		// Format in XML looks like: 2026-03-09 11:02:35
		var pubTime time.Time
		if item.PostDate != "" && item.PostDate != "0000-00-00 00:00:00" {
			pubTime, err = time.Parse("2006-01-02 15:04:05", item.PostDate)
			if err != nil {
				log.Printf("Warning: Could not parse date %s for item %s", item.PostDate, item.Title)
				pubTime = time.Now()
			}
		} else {
			pubTime = time.Now()
		}

		// Calculate basic date string for frontend like "Dec 4, 2024"
		dateStr := pubTime.Format("Jan 2, 2006")

		// 3. Status mapping
		isDraft := false
		if item.Status != "publish" {
			isDraft = true
		}

		// 4. Categories & Tags mapping
		isNews := false
		isResource := false
		var categoryName string
		var tags []string

		for _, cat := range item.Categories {
			if cat.Domain == "category" || cat.Domain == "portfolio_category" {
				valLower := strings.ToLower(cat.Value)
				if valLower == "news" {
					isNews = true
					categoryName = "News"
				} else if valLower == "publications" || valLower == "reports" {
					isResource = true
					categoryName = cat.Value
				} else if categoryName == "" {
					// Fallback to the first non-news/non-resource category
					categoryName = cat.Value
				}

				// Ensure "The Ballot" category is mapped correctly to categoryName
				if strings.Contains(valLower, "ballot") {
					categoryName = "The Ballot"
				}
			} else if cat.Domain == "post_tag" || cat.Domain == "portfolio_tag" {
				tags = append(tags, cat.Value)
			}
		}

		if categoryName == "" {
			categoryName = "Uncategorized"
		}

		// Determine Type
		postTypeField := "blog"
		if isNews {
			postTypeField = "news"
			newsCount++
		} else if isResource {
			postTypeField = "resource"
			resourceCount++
		} else {
			blogCount++
		}

		// Note: The excerpt and content fields can be huge or empty. Provide fallbacks if needed.
		if item.Title == "" {
			item.Title = "Untitled"
		}

		finalContent := item.Content
		if finalContent == "" {
			finalContent = item.Content2
		}

		finalExcerpt := item.Excerpt

		// 5. Build Model
		if postTypeField == "resource" {
			// Save as Resource
			resource := models.Resource{
				Title:       cleanUTF8(item.Title),
				Description: cleanUTF8(getExcerpt(cleanUTF8(finalExcerpt), cleanUTF8(finalContent))),
				Type:        "PDF Report", // Default, could analyze content for links
				Category:    categoryName,
				Date:        dateStr,
				PublishedAt: pubTime,
				// FileUrl can be hardcoded or extracted later if needed
				FileUrl: "#",
			}

			// We won't strictly enforce unique slug for Resource, but we can try to find if it exists based on Title
			var existing models.Resource
			if err := DB.Where("title = ?", resource.Title).First(&existing).Error; err != nil {
				if err == gorm.ErrRecordNotFound {
					if err := DB.Create(&resource).Error; err != nil {
						log.Printf("Error creating resource %s: %v", resource.Title, err)
						errorCount++
					} else {
						successCount++
						totalProcessed++
					}
				}
			} else {
				// Record exists, skip or update
				skipCount++
			}

		} else {
			// Save as BlogPost
			// Generate a clean slug from PostName or Title
			slug := strings.ToLower(item.PostName)
			if slug == "" {
				slug = strings.ToLower(strings.ReplaceAll(item.Title, " ", "-"))
			}
			// Strip existing prefixes if any
			slug = strings.ReplaceAll(slug, "blogs/", "")
			slug = strings.ReplaceAll(slug, "news/", "")
			
			// Append timestamp for guaranteed uniqueness
			if slug == "" {
				slug = fmt.Sprintf("post-%d", time.Now().UnixNano())
			} else {
				slug = fmt.Sprintf("%s-%d", slug, time.Now().UnixNano())
			}

			post := models.BlogPost{
				Title:       cleanUTF8(item.Title),
				Slug:        slug,
				Excerpt:     cleanUTF8(getExcerpt(cleanUTF8(finalExcerpt), cleanUTF8(finalContent))),
				Content:     cleanUTF8(finalContent),
				Date:        dateStr,
				PublishedAt: pubTime,
				Author:      item.Creator,
				Category:    categoryName,
				Type:        postTypeField,
				Tags:        tags,
				IsDraft:     isDraft,
				Image:       "", // Would need to parse attachment mapping for this
			}

			// Use OnConflict to avoid slug uniqueness errors
			result := DB.Clauses(clause.OnConflict{
				Columns:   []clause.Column{{Name: "slug"}},
				DoUpdates: clause.AssignmentColumns([]string{"title", "content", "excerpt", "category", "type", "updated_at"}),
			}).Create(&post)

			if result.Error != nil {
				log.Printf("Error inserting post %s: %v", post.Title, result.Error)
				errorCount++
			} else {
				successCount++
				totalProcessed++
			}
		}
	}

	log.Println("\n--- Import Summary ---")
	log.Printf("Successfully imported/updated: %d", successCount)
	log.Printf("Types: %d Blogs, %d News, %d Resources", blogCount, newsCount, resourceCount)
	log.Printf("Skipped (Not post/portfolio or Draft/Trash): %d", skipCount)
	log.Printf("Errors: %d", errorCount)
	log.Println("----------------------")
	log.Println("Done.")
}

// Helper to provide a fallback excerpt if empty
func getExcerpt(excerpt, content string) string {
	if excerpt != "" {
		return excerpt
	}

	// Strip HTML and take first 150 chars if excerpt is empty
	text := stripHTML(content)
	if len(text) > 150 {
		return text[:147] + "..."
	}
	return text
}

func stripHTML(str string) string {
	var builder strings.Builder
	inTag := false
	for _, r := range str {
		if r == '<' {
			inTag = true
		} else if r == '>' {
			inTag = false
		} else if !inTag {
			builder.WriteRune(r)
		}
	}
	// Return a cleaned up string without newlines for the excerpt
	cleaned := strings.ReplaceAll(builder.String(), "\n", " ")
	cleaned = strings.ReplaceAll(cleaned, "\r", "")
	cleaned = strings.Join(strings.Fields(cleaned), " ") // Remove extra spaces
	return cleaned
}

func cleanUTF8(s string) string {
	if !utf8.ValidString(s) {
		v := make([]rune, 0, len(s))
		for i, r := range s {
			if r == utf8.RuneError {
				_, size := utf8.DecodeRuneInString(s[i:])
				if size == 1 {
					continue
				}
			}
			v = append(v, r)
		}
		return string(v)
	}

	// Ensure the string is scrubbed for bad Postgres chars anyway, just in case
	return strings.ToValidUTF8(s, "")
}

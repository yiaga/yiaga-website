package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func generateUniqueSlug(title string) string {
	// Remove special characters, keep only letters, numbers, and spaces
	reg, _ := regexp.Compile("[^a-zA-Z0-9 ]+")
	slugTitle := reg.ReplaceAllString(title, "")
	// Append unix timestamp for uniqueness
	return strings.ToLower(strings.ReplaceAll(slugTitle, " ", "-")) + "-" + fmt.Sprintf("%d", time.Now().Unix())
}

// Public Helpers
func GetBlogs(w http.ResponseWriter, r *http.Request) {
	var posts []models.BlogPost
	// Filter by type if provided (blog vs news) or any other filters
	all := r.URL.Query().Get("all") == "true"

	query := database.DB.Model(&models.BlogPost{}).Order("published_at desc")

	if !all {
		query = query.Where("is_draft = ?", false)
	}

	typeParam := r.URL.Query().Get("type")
	if typeParam != "" {
		query = query.Where("type = ?", typeParam)
	}

	category := r.URL.Query().Get("category")
	if category != "" && category != "All" {
		query = query.Where("category = ?", category)
	}

	result := query.Find(&posts)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	// Auto-fix legacy data: Ensure PublishedAt is set for sorting
	// Auto-fix legacy data: Ensure PublishedAt is set and Slugs are clean
	for i := range posts {
		needsSave := false

		// 1. Fix Date
		if posts[i].PublishedAt.IsZero() {
			var newDate time.Time
			var err error

			// Try parsing existing Date string formats
			if posts[i].Date != "" {
				// Try "Jan 2, 2006" format (used in seeds)
				newDate, err = time.Parse("Jan 2, 2006", posts[i].Date)
				if err != nil {
					// Try "2006-01-02" format
					newDate, err = time.Parse("2006-01-02", posts[i].Date)
				}
			}

			if err != nil || newDate.IsZero() {
				newDate = time.Now()
				if posts[i].Date == "" {
					posts[i].Date = newDate.Format("2006-01-02")
				}
			}

			posts[i].PublishedAt = newDate
			needsSave = true
		}

		// 2. Fix Bad Slugs (containing special chars like '?')
		isBadSlug, _ := regexp.MatchString("[^a-z0-9-]+", posts[i].Slug)
		if isBadSlug {
			reg, _ := regexp.Compile("[^a-zA-Z0-9 ]+")
			slugTitle := reg.ReplaceAllString(posts[i].Title, "")
			// Use ID or Unix time to ensure uniqueness. Using ID helps stability if we run this often.
			// However, for consistency with creation, let's use a unique suffix.
			posts[i].Slug = strings.ToLower(strings.ReplaceAll(slugTitle, " ", "-")) + "-" + fmt.Sprintf("%d", time.Now().UnixNano())
			needsSave = true
		}

		if needsSave {
			database.DB.Save(&posts[i])
		}
	}
	// Re-sort slice manually or trust next refresh.
	// Since this runs on read, repeated calls fix it.
	// To ensure immediate order, we can just let the frontend re-query or user refresh.

	respondJSON(w, posts)
}

func GetBlogBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	var post models.BlogPost
	result := database.DB.Where("slug = ?", slug).First(&post)
	if result.Error != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}
	respondJSON(w, post)
}

func GetBlogById(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var post models.BlogPost
	result := database.DB.First(&post, id)
	if result.Error != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}
	respondJSON(w, post)
}

func CheckSlugUniqueness(w http.ResponseWriter, r *http.Request) {
	slug := r.URL.Query().Get("slug")
	excludeID := r.URL.Query().Get("exclude_id")

	if slug == "" {
		respondJSON(w, map[string]bool{"available": false})
		return
	}

	var count int64
	query := database.DB.Model(&models.BlogPost{}).Where("slug = ?", slug)
	if excludeID != "" {
		query = query.Where("id != ?", excludeID)
	}
	query.Count(&count)

	respondJSON(w, map[string]bool{"available": count == 0})
}

// Admin Handlers
func CreateBlogPost(w http.ResponseWriter, r *http.Request) {
	var post models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&post); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Always generate a unique slug on creation to avoid collisions
	post.Slug = generateUniqueSlug(post.Title)

	// Parse input Date string (YYYY-MM-DD) to PublishedAt
	if post.Date != "" {
		if parsedDate, err := time.Parse("2006-01-02", post.Date); err == nil {
			post.PublishedAt = parsedDate
		} else {
			// Fallback if parsing fails or different format
			post.PublishedAt = time.Now()
		}
	} else {
		post.Date = time.Now().Format("2006-01-02")
		post.PublishedAt = time.Now()
	}

	if err := database.DB.Create(&post).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, post)
}

func UpdateBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var post models.BlogPost
	if err := database.DB.First(&post, id).Error; err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	var input models.BlogPost
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update fields
	post.Title = input.Title
	post.Content = input.Content
	post.Excerpt = input.Excerpt
	post.Image = input.Image
	post.Category = input.Category
	post.Author = input.Author
	post.PdfUrl = input.PdfUrl
	post.Type = input.Type
	post.Date = input.Date
	// Update slug: if empty or if title has changed, regenerate it
	if input.Slug == "" || input.Title != post.Title {
		post.Slug = generateUniqueSlug(input.Title)
	} else if !strings.Contains(post.Slug, "-") || len(post.Slug) < 10 {
		// Safety: if the existing slug looks too short or lacks a timestamp, 
		// and we are updating the post, give it a unique one.
		// However, for stability, we usually keep it if title hasn't changed.
		post.Slug = input.Slug
	} else {
		post.Slug = input.Slug
	}

	// Update new fields
	post.IsDraft = input.IsDraft
	post.ActionText = input.ActionText
	post.ActionLink = input.ActionLink
	post.SecondaryDownloadUrl = input.SecondaryDownloadUrl
	post.SecondaryDownloadText = input.SecondaryDownloadText

	// Update PublishedAt if Date is provided
	if input.Date != "" {
		if parsedDate, err := time.Parse("2006-01-02", input.Date); err == nil {
			post.PublishedAt = parsedDate
		}
	}

	if err := database.DB.Save(&post).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, post)
}

func DeleteBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.BlogPost{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

func DuplicateBlogPost(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var post models.BlogPost
	if err := database.DB.First(&post, id).Error; err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	newPost := post
	newPost.ID = 0 // Reset ID for new record
	newPost.Title = post.Title + " (Copy)"
	newPost.IsDraft = true
	newPost.CreatedAt = time.Now()
	newPost.UpdatedAt = time.Now()
	newPost.PublishedAt = time.Now()

	newPost.Slug = generateUniqueSlug(newPost.Title)

	if err := database.DB.Create(&newPost).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, newPost)
}

package handlers

import (
	"fmt"
	"net/http"
	"strings"

	"yiaga-backend/database"
	"yiaga-backend/models"

	"github.com/go-chi/chi/v5"
)

// GetSEOForBlog serves a minimal HTML page with Open Graph and Twitter Card tags for a blog post.
// This is used by social media crawlers.
func GetSEOForBlog(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")

	var blog models.BlogPost
	if err := database.DB.Where("slug = ?", slug).First(&blog).Error; err != nil {
		// If blog not found, return a generic fallback or 404
		http.Error(w, "Blog not found", http.StatusNotFound)
		return
	}

	// Prepare data for the meta tags
	title := blog.Title + " | Yiaga Africa"
	description := blog.Excerpt
	if description == "" {
		description = "Yiaga Africa is a non-profit civic hub dedicated to promoting democratic governance, human rights, and civic participation across Africa."
	}
	
	image := blog.Image
	if image == "" {
		image = "https://yiaga.org/logo.png" // Fallback image
	} else if strings.HasPrefix(image, "/") {
		image = "https://yiaga.org" + image
	}

	url := "https://yiaga.org/blogs/" + slug

	// Generate raw HTML with only the head and meta tags
	html := fmt.Sprintf(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>%[1]s</title>
  <meta name="description" content="%[2]s" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="%[3]s" />
  <meta property="og:title" content="%[1]s" />
  <meta property="og:description" content="%[2]s" />
  <meta property="og:image" content="%[4]s" />
  <meta property="og:site_name" content="Yiaga Africa" />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="%[3]s" />
  <meta name="twitter:title" content="%[1]s" />
  <meta name="twitter:description" content="%[2]s" />
  <meta name="twitter:image" content="%[4]s" />
  <meta name="twitter:site" content="@YiagaAfrica" />
</head>
<body>
  <h1>%[1]s</h1>
  <p>%[2]s</p>
  <img src="%[4]s" alt="%[1]s" />
</body>
</html>`, escapeQuotes(title), escapeQuotes(description), escapeQuotes(url), escapeQuotes(image))

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(html))
}

// escapeQuotes helps prevent basic HTML injection in attributes
func escapeQuotes(s string) string {
	s = strings.ReplaceAll(s, "\"", "&quot;")
	s = strings.ReplaceAll(s, "<", "&lt;")
	s = strings.ReplaceAll(s, ">", "&gt;")
	return s
}

package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"yiaga-backend/database"
	"yiaga-backend/models"

	"github.com/go-chi/chi/v5"
)

// GetSEOForPost serves a minimal HTML page with Open Graph and Twitter Card tags
// for a blog, news, initiative, or resource item. Used by social media crawlers.
// It's registered against four routes (/seo/blogs/{slug}, /seo/news/{slug},
// /seo/resources/{slug}, /seo/initiatives/{slug}) and dispatches based on which
// route matched, since each content type lives in its own table/model.
func GetSEOForPost(w http.ResponseWriter, r *http.Request) {
	identifier := chi.URLParam(r, "slug")

	routeCtx := chi.RouteContext(r.Context())
	pattern := ""
	if routeCtx != nil {
		pattern = routeCtx.RoutePattern()
	}

	switch {
	case strings.Contains(pattern, "/seo/news/"):
		serveBlogSEO(w, identifier, "news")
	case strings.Contains(pattern, "/seo/blogs/"):
		serveBlogSEO(w, identifier, "")
	case strings.Contains(pattern, "/seo/resources/"):
		serveResourceSEO(w, identifier)
	case strings.Contains(pattern, "/seo/initiatives/"):
		serveInitiativeSEO(w, identifier)
	default:
		http.Error(w, "Unknown content type", http.StatusNotFound)
	}
}

// serveBlogSEO handles both blog posts and news items, which share the BlogPost table.
// If expectType is non-empty, it's used as an extra guard (e.g. "news") but lookup
// is primarily by slug since Slug has a unique index on BlogPost.
func serveBlogSEO(w http.ResponseWriter, slug string, expectType string) {
	var blog models.BlogPost
	if err := database.DB.Where("slug = ?", slug).First(&blog).Error; err != nil {
		http.Error(w, "Post not found", http.StatusNotFound)
		return
	}

	description := blog.Excerpt
	if description == "" {
		description = defaultDescription
	}

	image := resolveImage(blog.Image)

	path := "blogs"
	if blog.Type == "news" {
		path = "news"
	}
	url := "https://yiaga.org/" + path + "/" + slug

	renderSEOPage(w, blog.Title, description, image, url)
}

// serveResourceSEO handles the Resource table. Resource.Slug is not guaranteed
// unique, and the frontend route uses {id}, so we try slug first and fall back
// to numeric ID.
func serveResourceSEO(w http.ResponseWriter, identifier string) {
	var resource models.Resource
	err := database.DB.Where("slug = ?", identifier).First(&resource).Error
	if err != nil {
		if id, convErr := strconv.Atoi(identifier); convErr == nil {
			err = database.DB.First(&resource, id).Error
		}
	}
	if err != nil {
		http.Error(w, "Resource not found", http.StatusNotFound)
		return
	}

	description := resource.Description
	if description == "" {
		description = defaultDescription
	}

	// Resource has no dedicated image field; fall back to the site logo.
	image := defaultImage

	url := fmt.Sprintf("https://yiaga.org/resources/%s", identifier)

	renderSEOPage(w, resource.Title, description, image, url)
}

// serveInitiativeSEO handles the Initiative table.
func serveInitiativeSEO(w http.ResponseWriter, slug string) {
	var initiative models.Initiative
	if err := database.DB.Where("slug = ?", slug).First(&initiative).Error; err != nil {
		http.Error(w, "Initiative not found", http.StatusNotFound)
		return
	}

	description := initiative.Description
	if description == "" {
		description = defaultDescription
	}

	image := resolveImage(initiative.Image)

	url := "https://yiaga.org/initiatives/" + slug

	renderSEOPage(w, initiative.Title, description, image, url)
}

const (
	defaultDescription = "Yiaga Africa is a non-profit civic hub dedicated to promoting democratic governance, human rights, and civic participation across Africa."
	defaultImage        = "https://yiaga.org/logo.png"
)

// resolveImage normalizes a stored image path into an absolute URL, falling
// back to the site logo if none is set.
func resolveImage(image string) string {
	if image == "" {
		return defaultImage
	}
	if strings.HasPrefix(image, "/") {
		return "https://yiaga.org" + image
	}
	return image
}

// renderSEOPage writes the shared HTML/meta-tag template for any content type.
func renderSEOPage(w http.ResponseWriter, rawTitle, rawDescription, rawImage, rawURL string) {
	title := rawTitle + " | Yiaga Africa"

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
</html>`, escapeQuotes(title), escapeQuotes(rawDescription), escapeQuotes(rawURL), escapeQuotes(rawImage))

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

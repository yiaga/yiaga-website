package routes

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"

	"yiaga-backend/handlers"
	authMiddleware "yiaga-backend/middleware"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// CORS configuration
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins: []string{
			"https://yiaga.org",
			"https://www.yiaga.org",
			"http://localhost:3000",
			"http://localhost:5173",
			"http://localhost:5174",
			"http://localhost:8000",
			"http://127.0.0.1:3000",
			"http://127.0.0.1:5173",
			"http://127.0.0.1:5174",
			"http://127.0.0.1:8000",
			"https://yiaga-frontend-934225016182.us-central1.run.app",
		},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Requested-With"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
		Debug:            true,
	}))

	// API Routes
	r.Route("/api", func(r chi.Router) {
		// Announcements
		r.Get("/announcements", handlers.GetAnnouncements)
		r.Post("/announcements", handlers.CreateAnnouncement)

		// Blogs & News
		// Blogs & News
		r.Get("/blogs", handlers.GetBlogs)
		r.Get("/blogs/check-slug", handlers.CheckSlugUniqueness)
		r.Get("/blogs/{slug}", handlers.GetBlogBySlug)
		r.Get("/blogs/id/{id}", handlers.GetBlogById)

		// CMS - Hero
		r.Get("/content/hero/{page}", handlers.GetHeroContent)

		// Initiatives
		r.Get("/initiatives", handlers.GetInitiatives)
		r.Get("/initiatives/{slug}", handlers.GetInitiativeBySlug)

		// Resources
		r.Get("/resources", handlers.GetResources)
		r.Get("/resources/{id}", handlers.GetResourceById)

		// Jobs
		r.Get("/jobs", handlers.GetJobs)
		r.Get("/jobs/{id}", handlers.GetJob)

		// Forms
		// Public Routes
		r.Post("/contact", handlers.SubmitContact)
		r.Post("/subscribe", handlers.SubscribeNewsletter)
		r.Post("/login", handlers.Login)
		r.Post("/signup", handlers.Signup)
		r.Get("/comments", handlers.GetComments) // Public for specific posts (approved), Protected for list
		r.Post("/volunteer/submit", handlers.SubmitVolunteer)
		r.Post("/internship/submit", handlers.SubmitInternship)

		// --- Protected Admin Routes ---
		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.AuthMiddleware)

			r.Get("/dashboard/stats", handlers.GetDashboardStats)
			r.Get("/subscribers/analytics", handlers.GetSubscriberAnalytics)
			r.Post("/upload", handlers.FileUploadHandler)

			// CMS - Hero
			r.Post("/content/hero", handlers.CreateHeroContent)
			r.Put("/content/hero/{id}", handlers.UpdateHeroContent)
			r.Delete("/content/hero/{id}", handlers.DeleteHeroContent)

			// CMS - Blog/News Management
			r.Post("/blogs", handlers.CreateBlogPost)
			r.Put("/blogs/{id}", handlers.UpdateBlogPost)
			r.Delete("/blogs/{id}", handlers.DeleteBlogPost)
			r.Post("/blogs/{id}/duplicate", handlers.DuplicateBlogPost)

			// CMS - Resources Management
			r.Post("/resources", handlers.CreateResource)
			r.Put("/resources/{id}", handlers.UpdateResource)
			r.Delete("/resources/{id}", handlers.DeleteResource)

			// CMS - Announcements Management
			r.Delete("/announcements/{id}", handlers.DeleteAnnouncement)

			// CMS - Initiatives Management
			r.Post("/initiatives", handlers.CreateInitiative)
			r.Put("/initiatives/{id}", handlers.UpdateInitiative)
			r.Delete("/initiatives/{id}", handlers.DeleteInitiative)

			// CMS - Partners
			r.Get("/partners", handlers.GetPartners) // Admin might be the only one listing partners fully? Or public?

			// CMS - Careers Management
			r.Post("/jobs", handlers.CreateJob)
			r.Put("/jobs/{id}", handlers.UpdateJob)
			r.Delete("/jobs/{id}", handlers.DeleteJob)
			r.Post("/jobs/{id}/duplicate", handlers.DuplicateJob)
			r.Get("/volunteers", handlers.GetVolunteers)
			r.Get("/internships", handlers.GetInternships)
		})

		// Protected Mutations group
		r.Group(func(r chi.Router) {
			r.Use(authMiddleware.AuthMiddleware)

			// Partners Mutations
			r.Post("/partners", handlers.CreatePartner)
			r.Delete("/partners/{id}", handlers.DeletePartner)

			// Comments Admin
			r.Put("/comments/{id}/status", handlers.UpdateCommentStatus)
			r.Delete("/comments/{id}", handlers.DeleteComment)

			// Users
			r.Get("/users", handlers.GetUsers)
			r.Post("/users", handlers.CreateUser)
			r.Put("/users/{id}", handlers.UpdateUser)
			r.Delete("/users/{id}", handlers.DeleteUser)

			// Audit Logs
			r.Get("/audit-logs", handlers.GetAuditLogs)
			r.Post("/audit-logs", handlers.CreateAuditLog) // Technically system calls this, but fine for now

			// Badges Mutations
			r.Post("/badges", handlers.CreateBadge)
			r.Delete("/badges/{id}", handlers.DeleteBadge)
		})

		// Public GETs for shared resources that might be used on frontend
		r.Get("/partners", handlers.GetPartners)
		r.Get("/badges", handlers.GetBadges)

		r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
			w.Write([]byte("ok"))
		})
	})

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// This ensures the root path returns a 200 OK instead of a 404
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status": "success", "message": "Yiaga Backend API is running"}`)
	})

	// Serve static files from uploads directory
	workDir, _ := os.Getwd()
	filesDir := http.Dir(filepath.Join(workDir, "uploads"))
	FileServer(r, "/uploads", filesDir)

	return r
}

// FileServer conveniently sets up a http.FileServer handler to serve
// static files from a http.FileSystem.
func FileServer(r chi.Router, path string, root http.FileSystem) {
	if strings.ContainsAny(path, "{}*") {
		panic("FileServer does not permit any URL parameters.")
	}

	if path != "/" && path[len(path)-1] != '/' {
		r.Get(path, http.RedirectHandler(path+"/", 301).ServeHTTP)
		path += "/"
	}
	path += "*"

	r.Get(path, func(w http.ResponseWriter, r *http.Request) {
		rctx := chi.RouteContext(r.Context())
		pathPrefix := strings.TrimSuffix(rctx.RoutePattern(), "/*")
		fs := http.StripPrefix(pathPrefix, http.FileServer(root))
		fs.ServeHTTP(w, r)
	})
}

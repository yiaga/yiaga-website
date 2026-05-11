package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"yiaga-backend/database"
	"yiaga-backend/models"
	"yiaga-backend/routes"
	"yiaga-backend/seeds"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found or error loading it")
	}
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		instance := os.Getenv("INSTANCE_CONNECTION_NAME")
		user := os.Getenv("DB_USER")
		password := os.Getenv("DB_PASSWORD")
		dbname := os.Getenv("DB_NAME")
		sslmode := os.Getenv("DB_SSLMODE")
		if sslmode == "" {
			sslmode = "disable"
		}

		if instance != "" && user != "" && dbname != "" && password != "" {
			dsn = fmt.Sprintf(
				"host=/cloudsql/%s user=%s password=%s dbname=%s sslmode=%s",
				instance, user, password, dbname, sslmode,
			)
			log.Println("Using Cloud SQL socket for database connection")
		} else {
			dsn = "host=localhost user=yiaga password=yiagaPassword dbname=yiagadb port=5432 sslmode=disable TimeZone=Africa/Lagos"
			log.Println("Using default local database connection string")
		}
	}

	database.Init(dsn)
	log.Println("Successfully connected to database!")

	go seeds.SeedData()

	// Backfill missing slugs for old resources
	go func() {
		var resources []models.Resource
		database.DB.Where("slug = '' OR slug IS NULL").Find(&resources)
		for _, r := range resources {
			database.DB.Model(&r).Update("slug", models.GenerateSlug(r.Title))
		}
	}()

	// Get your router (assumed to be Gin or similar http.Handler)
	r := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Yiaga Backend Server starting on :%s", port)

	// Use 'r' directly as it already has CORS middleware from routes.SetupRouter()
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

package database

import (
	"log"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"yiaga-backend/models"
)

var DB *gorm.DB

func Init(dsn string) {
	var err error
	var counts int64

	for counts < 5 {
		DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err == nil {
			break
		}
		log.Printf("Failed to connect to database: %v. Retrying in 2 seconds...", err)
		time.Sleep(2 * time.Second)
		counts++
	}

	if err != nil {
		log.Fatalf("failed to connect database after retries: %v", err)
	}

	// Auto migrate models
	err = DB.AutoMigrate(
		&models.Announcement{},
		&models.BlogPost{},
		&models.Initiative{},
		&models.Resource{},
		&models.Job{},
		&models.ContactMessage{},
		&models.Subscriber{},
		&models.User{},
		&models.HeroContent{},
		&models.Partner{},
		&models.Badge{},
		&models.Comment{},
		&models.AuditLog{},
		&models.VolunteerApplication{},
		&models.InternshipApplication{},
	)
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
	log.Println("Database migration completed successfully.")
}

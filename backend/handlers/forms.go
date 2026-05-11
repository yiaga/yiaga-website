package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"yiaga-backend/database"
	"yiaga-backend/models"
	"yiaga-backend/services"
)

func SubmitContact(w http.ResponseWriter, r *http.Request) {
	var message models.ContactMessage
	if err := json.NewDecoder(r.Body).Decode(&message); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Initial status
	message.Status = "new"

	result := database.DB.Create(&message)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}

	// Send email to admin asynchronously
	go func() {
		err := services.SendAdminEmail(message.Name, message.Email, message.Subject, message.Message)
		if err != nil {
			fmt.Printf("[Contact] Error sending admin email: %v\n", err)
		}
	}()

	respondJSON(w, map[string]string{"message": "Contact form submitted successfully"})
}

func SubscribeNewsletter(w http.ResponseWriter, r *http.Request) {
	var sub models.Subscriber
	if err := json.NewDecoder(r.Body).Decode(&sub); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	sub.IsActive = true
	sub.SubscribedAt = time.Now()

	// 1. Sync to Local DB (Upsert strategy)
	// We check if user exists. If so, update preferences. If not, create.
	var existingSub models.Subscriber
	result := database.DB.Where("email = ?", sub.Email).First(&existingSub)

	if result.Error == nil {
		// User exists, update subscriptions
		existingSub.Subscriptions = sub.Subscriptions
		existingSub.FirstName = sub.FirstName
		existingSub.LastName = sub.LastName
		existingSub.IsActive = true // Reactivate if they were unsubscribed
		if err := database.DB.Save(&existingSub).Error; err != nil {
			http.Error(w, "Failed to update local subscription", http.StatusInternalServerError)
			return
		}
	} else {
		// User does not exist, create new
		if err := database.DB.Create(&sub).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	// 2. Sync to Mailchimp (Async)
	// Now that we support PUT/Upsert in the service, this is safe to call for both new and existing users.
	go func() {
		err := services.SubscribeToMailchimp(sub.Email, sub.FirstName, sub.LastName, sub.Subscriptions)
		if err != nil {
			fmt.Printf("Failed to sync to Mailchimp: %v\n", err)
		} else {
			fmt.Printf("Successfully synced %s to Mailchimp\n", sub.Email)
		}
	}()

	respondJSON(w, map[string]string{"message": "Subscribed successfully"})
}

func SubmitVolunteer(w http.ResponseWriter, r *http.Request) {
	var app models.VolunteerApplication
	if err := json.NewDecoder(r.Body).Decode(&app); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := database.DB.Create(&app).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Volunteer application submitted successfully"})
}

func GetVolunteers(w http.ResponseWriter, r *http.Request) {
	var apps []models.VolunteerApplication
	database.DB.Order("created_at desc").Find(&apps)
	respondJSON(w, apps)
}

func SubmitInternship(w http.ResponseWriter, r *http.Request) {
	var app models.InternshipApplication
	if err := json.NewDecoder(r.Body).Decode(&app); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := database.DB.Create(&app).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Internship application submitted successfully"})
}

func GetInternships(w http.ResponseWriter, r *http.Request) {
	var apps []models.InternshipApplication
	database.DB.Order("created_at desc").Find(&apps)
	respondJSON(w, apps)
}

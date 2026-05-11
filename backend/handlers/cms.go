package handlers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

// --- Dashboard ---

func GetDashboardStats(w http.ResponseWriter, r *http.Request) {
	var userCount, blogCount, newsCount, subscriberCount int64

	// 1. Key Metrics
	database.DB.Model(&models.User{}).Count(&userCount)
	// User specifically requested to separate Blog and News counts again
	database.DB.Model(&models.BlogPost{}).Where("type = ?", "blog").Count(&blogCount)
	database.DB.Model(&models.BlogPost{}).Where("type = ?", "news").Count(&newsCount)
	database.DB.Model(&models.Subscriber{}).Where("is_active = ?", true).Count(&subscriberCount)

	// 2. Recent Activity (Latest 5 Audit Logs)
	var recentLogs []models.AuditLog
	database.DB.Order("created_at desc").Limit(5).Find(&recentLogs)

	// 3. User Specific Stats
	var commentsPosted int64
	var daysActive int64 = 0

	userID := r.Context().Value("user_id")
	if userID != nil { // Should verify string conversion if needed, but context isinterface{}
		// Count comments by this user (Assuming Author match or exact relation logic)
		// Since Auth doesn't store display name consistently, we'll try to find the user to match email/username
		var currentUser models.User
		// userID is string in context from claims
		if err := database.DB.Where("id = ?", userID).First(&currentUser).Error; err == nil {
			// Find comments by author name or email (simple matching for now)
			database.DB.Model(&models.Comment{}).Where("email = ? OR author = ?", currentUser.Email, currentUser.Username).Count(&commentsPosted)

			// Calculate days active
			daysActive = int64(time.Since(currentUser.CreatedAt).Hours() / 24)
		}
	}

	respondJSON(w, map[string]interface{}{
		"users":           userCount,
		"blogs":           blogCount,
		"news":            newsCount,
		"subscribers":     subscriberCount,
		"recent_activity": recentLogs,
		"user_activity": map[string]interface{}{
			"comments_posted": commentsPosted,
			"days_active":     daysActive,
			"articles_saved":  0, // Future feature
			"articles_read":   0, // Future feature
		},
	})
}

// --- File Upload ---

func HandleFileUpload(w http.ResponseWriter, r *http.Request) {
	// maximize upload size appropriately
	r.ParseMultipartForm(10 << 20) // 10 MB

	file, handler, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Ensure unique filename
	filename := fmt.Sprintf("%d-%s", time.Now().Unix(), handler.Filename)

	// Save to local uploads directory
	uploadPath := filepath.Join("uploads", filename)

	dst, err := os.Create(uploadPath)
	if err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	if _, err := io.Copy(dst, file); err != nil {
		http.Error(w, "Error saving the file", http.StatusInternalServerError)
		return
	}

	respondJSON(w, map[string]string{
		"url":      fmt.Sprintf("/uploads/%s", filename),
		"filename": filename,
	})
}

// --- Hero Content ---

func GetHeroContent(w http.ResponseWriter, r *http.Request) {
	page := chi.URLParam(r, "page")
	var content []models.HeroContent
	// Return list of slides for the page
	database.DB.Where("page = ?", page).Find(&content)
	respondJSON(w, content)
}

func CreateHeroContent(w http.ResponseWriter, r *http.Request) {
	var content models.HeroContent
	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	if err := database.DB.Create(&content).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, content)
}

func UpdateHeroContent(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var content models.HeroContent
	if err := json.NewDecoder(r.Body).Decode(&content); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var existing models.HeroContent
	if err := database.DB.Where("id = ?", id).First(&existing).Error; err != nil {
		http.Error(w, "Hero content not found", http.StatusNotFound)
		return
	}

	// Update existing record
	if err := database.DB.Model(&existing).Updates(content).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, existing)
}

func DeleteHeroContent(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.HeroContent{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

// --- Audit Logs ---

func GetAuditLogs(w http.ResponseWriter, r *http.Request) {
	var logs []models.AuditLog
	database.DB.Order("created_at desc").Find(&logs)
	respondJSON(w, logs)
}

func CreateAuditLog(w http.ResponseWriter, r *http.Request) {
	var log models.AuditLog
	if err := json.NewDecoder(r.Body).Decode(&log); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Ensure timestamp is set if missing
	if log.Timestamp == "" {
		log.Timestamp = time.Now().Format(time.RFC3339)
	}

	if err := database.DB.Create(&log).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, log)
}

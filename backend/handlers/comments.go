package handlers

import (
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v5"

	"yiaga-backend/database"
	"yiaga-backend/middleware"
	"yiaga-backend/models"
)

func GetComments(w http.ResponseWriter, r *http.Request) {
	var comments []models.Comment
	query := database.DB.Model(&models.Comment{}).Order("created_at desc")

	postID := r.URL.Query().Get("post_id")
	if postID != "" {
		// Public fetch for a post - only RETURN APPROVED comments
		query = query.Where("post_id = ? AND status = ?", postID, "approved")
	} else {
		// Admin listing (all comments) - REQUIRE AUTH
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Authorization header required", http.StatusUnauthorized)
			return
		}
		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 {
			http.Error(w, "Invalid token format", http.StatusUnauthorized)
			return
		}
		token, err := jwt.ParseWithClaims(bearerToken[1], &models.Claims{}, func(token *jwt.Token) (interface{}, error) {
			return middleware.GetJwtKey(), nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		// Proceed with filters if any
		status := r.URL.Query().Get("status")
		if status != "" {
			query = query.Where("status = ?", status)
		}
	}

	query.Find(&comments)
	respondJSON(w, comments)
}

func CreateComment(w http.ResponseWriter, r *http.Request) {
	var c models.Comment
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Initial state
	c.Status = "pending"
	c.Date = time.Now().Format("Jan 2, 2006")

	// Fetch post title if available (optional optimization)
	var post models.BlogPost
	if c.PostID != 0 {
		database.DB.First(&post, c.PostID)
		c.PostTitle = post.Title
	}

	if err := database.DB.Create(&c).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, c)
}

func UpdateCommentStatus(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var status struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&status); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := database.DB.Model(&models.Comment{}).Where("id = ?", id).Update("status", status.Status).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Status updated"})
}

func DeleteComment(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	database.DB.Delete(&models.Comment{}, id)
	respondJSON(w, map[string]string{"message": "Deleted"})
}

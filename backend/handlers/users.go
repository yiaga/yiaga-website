package handlers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/go-chi/chi/v5"
	"golang.org/x/crypto/bcrypt"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.User
	// Exclude password hash if it were stored (json:"-" handles it)
	database.DB.Find(&users)
	respondJSON(w, users)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Role     string `json:"role"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validation: Admin/Technical must be @yiaga.org
	if input.Role == "admin" || input.Role == "technical" {
		if !strings.HasSuffix(input.Email, "@yiaga.org") {
			http.Error(w, "Admin and Technical users must have a @yiaga.org email address", http.StatusBadRequest)
			return
		}
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Role:     input.Role,
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	var input struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Role     string `json:"role"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if input.Username != "" {
		user.Username = input.Username
	}
	if input.Role != "" {
		// Validation
		emailToCheck := user.Email
		if input.Email != "" {
			emailToCheck = input.Email
		}

		if (input.Role == "admin" || input.Role == "technical") && !strings.HasSuffix(emailToCheck, "@yiaga.org") {
			http.Error(w, "Admin and Technical users must have a @yiaga.org email address", http.StatusBadRequest)
			return
		}
		user.Role = input.Role
	}
	if input.Email != "" {
		roleToCheck := user.Role
		if input.Role != "" {
			roleToCheck = input.Role
		}

		if (roleToCheck == "admin" || roleToCheck == "technical") && !strings.HasSuffix(input.Email, "@yiaga.org") {
			http.Error(w, "Admin and Technical users must have a @yiaga.org email address", http.StatusBadRequest)
			return
		}
		user.Email = input.Email
	}
	if input.Password != "" {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
		if err != nil {
			http.Error(w, "Server error", http.StatusInternalServerError)
			return
		}
		user.Password = string(hashedPassword)
	}

	if err := database.DB.Save(&user).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, user)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.User{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted"})
}

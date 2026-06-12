package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"

	"yiaga-backend/database"
	"yiaga-backend/middleware"
	"yiaga-backend/models"
)

func Signup(w http.ResponseWriter, r *http.Request) {
	var input struct {
		Username string `json:"username"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Force role to 'user' for public signup
	// Check if email already exists
	var existing models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existing).Error; err == nil {
		http.Error(w, "Email already registered", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Role:     "user", // Default role
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Don't return password
	user.Password = ""
	respondJSON(w, user)
}

func Login(w http.ResponseWriter, r *http.Request) {
	var creds models.Credentials
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var user models.User
	if err := database.DB.Where("email = ?", creds.Email).First(&user).Error; err != nil {
		fmt.Printf("Login failed: User not found for email %s. Error: %v\n", creds.Email, err)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		fmt.Printf("[AUTH] Password mismatch for %s\n", creds.Email)
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}
	fmt.Printf("[AUTH] Login successful for %s\n", creds.Email)

	expirationTime := time.Now().Add(24 * time.Hour)
	claims := &models.Claims{
		UserID: fmt.Sprintf("%d", user.ID),
		Role:   user.Role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(middleware.GetJwtKey())
	if err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	respondJSON(w, map[string]interface{}{
		"token": tokenString,
		"user": map[string]string{
			"id":    fmt.Sprintf("%d", user.ID),
			"email": user.Email,
			"name":  user.Username,
			"role":  user.Role,
		},
	})
}

package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func GetInitiatives(w http.ResponseWriter, r *http.Request) {
	var initiatives []models.Initiative
	result := database.DB.Order("created_at desc").Find(&initiatives)
	if result.Error != nil {
		http.Error(w, result.Error.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, initiatives)
}

func GetInitiativeBySlug(w http.ResponseWriter, r *http.Request) {
	slug := chi.URLParam(r, "slug")
	var initiative models.Initiative
	result := database.DB.Where("slug = ?", slug).First(&initiative)
	if result.Error != nil {
		http.Error(w, "Initiative not found", http.StatusNotFound)
		return
	}
	respondJSON(w, initiative)
}

func CreateInitiative(w http.ResponseWriter, r *http.Request) {
	var init models.Initiative
	if err := json.NewDecoder(r.Body).Decode(&init); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Always generate a unique slug on creation
	slugBase := strings.ToLower(strings.ReplaceAll(init.Title, " ", "-"))
	init.Slug = fmt.Sprintf("%s-%d", slugBase, time.Now().UnixNano())
	if err := database.DB.Create(&init).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, init)
}

func UpdateInitiative(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var init models.Initiative
	if err := database.DB.First(&init, id).Error; err != nil {
		http.Error(w, "Initiative not found", http.StatusNotFound)
		return
	}
	var input models.Initiative
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Update fields - simplistic
	input.ID = init.ID
	if err := database.DB.Save(&input).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, input)
}

func DeleteInitiative(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if err := database.DB.Delete(&models.Initiative{}, id).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

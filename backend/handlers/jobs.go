package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

// Helper to generate slug
func slugify(s string) string {
	s = strings.ToLower(s)
	reg := regexp.MustCompile(`[^a-z0-9]+`)
	s = reg.ReplaceAllString(s, "-")
	return strings.Trim(s, "-")
}

func GetJobs(w http.ResponseWriter, r *http.Request) {
	var jobs []models.Job

	// Check if we should return all jobs (for admin) or just active ones
	all := r.URL.Query().Get("all") == "true"
	// Check if we should filter by type
	jobType := r.URL.Query().Get("type")

	query := database.DB.Order("created_at desc")

	if !all {
		query = query.Where("is_active = ?", true)
	}

	if jobType != "" {
		if jobType == "job" {
			// For "job", also include those where type is empty (backward compatibility)
			query = query.Where("(type = ? OR type = ? OR type IS NULL)", "job", "")
		} else {
			query = query.Where("type = ?", jobType)
		}
	}

	if err := query.Find(&jobs).Error; err != nil {
		http.Error(w, "Failed to fetch jobs", http.StatusInternalServerError)
		return
	}

	respondJSON(w, jobs)
}

func GetJob(w http.ResponseWriter, r *http.Request) {
	idOrSlug := chi.URLParam(r, "id")
	var job models.Job

	// Check if input is numeric to determine if we should search by ID
	if id, err := strconv.Atoi(idOrSlug); err == nil {
		// It's a number, try finding by ID or Slug (in case slug is numeric)
		if err := database.DB.Where("id = ?", id).Or("slug = ?", idOrSlug).First(&job).Error; err != nil {
			http.Error(w, "Job not found", http.StatusNotFound)
			return
		}
	} else {
		// Not a number, search only by Slug
		if err := database.DB.Where("slug = ?", idOrSlug).First(&job).Error; err != nil {
			http.Error(w, "Job not found", http.StatusNotFound)
			return
		}
	}

	respondJSON(w, job)
}

func CreateJob(w http.ResponseWriter, r *http.Request) {
	var job models.Job
	if err := json.NewDecoder(r.Body).Decode(&job); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Generate a unique slug by default
	job.Slug = slugify(job.CallForApplication) + "-" + fmt.Sprintf("%d", time.Now().UnixNano())

	if err := database.DB.Create(&job).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, job)
}

func UpdateJob(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var job models.Job
	if err := database.DB.First(&job, id).Error; err != nil {
		http.Error(w, "Job not found", http.StatusNotFound)
		return
	}
	var input models.Job
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	job.CallForApplication = input.CallForApplication

	// Update slug if title changed and slug wasn't manually provided
	if input.Slug != "" {
		job.Slug = input.Slug
	} else if job.CallForApplication != input.CallForApplication {
		// Update slug if title changed
		job.Slug = slugify(input.CallForApplication)
	}

	job.Location = input.Location
	job.ApplicationDeadline = input.ApplicationDeadline
	job.TypeOfContract = input.TypeOfContract
	job.Department = input.Department
	job.PostLevel = input.PostLevel
	job.LanguagesRequired = input.LanguagesRequired
	job.DurationOfInitialContract = input.DurationOfInitialContract
	job.ApplicationLink = input.ApplicationLink
	job.AboutYiaga = input.AboutYiaga
	job.Background = input.Background
	job.DutiesAndResponsibilities = input.DutiesAndResponsibilities
	job.Competence = input.Competence
	job.LanguageRequirements = input.LanguageRequirements
	job.HowToApply = input.HowToApply
	job.Objectives = input.Objectives
	job.ExpectedOutcomes = input.ExpectedOutcomes
	job.SelectionCriteria = input.SelectionCriteria
	job.IsActive = input.IsActive
	job.Type = input.Type

	if err := database.DB.Save(&job).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, job)
}

func DeleteJob(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var job models.Job
	if err := database.DB.First(&job, id).Error; err != nil {
		http.Error(w, "Job not found", http.StatusNotFound)
		return
	}

	if err := database.DB.Delete(&job).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, map[string]string{"message": "Deleted successfully"})
}

func DuplicateJob(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	var job models.Job
	if err := database.DB.First(&job, id).Error; err != nil {
		http.Error(w, "Job not found", http.StatusNotFound)
		return
	}

	newJob := job
	newJob.ID = 0
	newJob.CallForApplication = job.CallForApplication + " (Copy)"
	newJob.IsActive = false // draft by default
	newJob.Slug = slugify(newJob.CallForApplication) + "-" + fmt.Sprintf("%d", time.Now().UnixNano())

	if err := database.DB.Create(&newJob).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	respondJSON(w, newJob)
}

package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"
	"regexp"
	"strings"
	"time"
	"yiaga-backend/services"

	"github.com/google/uuid"
)

func FileUploadHandler(w http.ResponseWriter, r *http.Request) {
	// Limit max upload size (e.g., 10MB)
	r.ParseMultipartForm(10 << 20)

	// Get the file from the request
	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, `{"error": "No file provided"}`, http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Sanitization: lowercase and replace non-alphanumeric with -
	originalName := header.Filename
	ext := filepath.Ext(originalName)
	nameWithoutExt := strings.TrimSuffix(originalName, ext)

	reg := regexp.MustCompile(`[^a-zA-Z0-9]+`)
	safeName := reg.ReplaceAllString(strings.ToLower(nameWithoutExt), "-")
	safeName = strings.Trim(safeName, "-")

	// Fallback if safeName is empty (e.g., only special chars)
	if safeName == "" {
		safeName = "file-" + uuid.New().String()[:8]
	}

	// Option: Append a short unique ID to avoid collisions (recommended for web apps)
	// But let's try to stick to what the user wants: "url as filename".
	// If the user wants to avoid collision, they can rename. 
	// For safety, I'll append a timestamp or short UUID.
	// Actually, the user's example had a UUID. If they want to get rid of it, 
	// they might be okay with just the name or name-timestamp.
	// I'll use name-timestamp for safety unless they ask otherwise.
	filename := fmt.Sprintf("%s-%d%s", safeName, time.Now().Unix(), ext)

	url, err := services.UploadFile(r.Context(), file, filename)
	if err != nil {
		// Log the error for internal debugging
		fmt.Printf("Upload failed: %v\n", err)
		http.Error(w, `{"error": "Upload failed"}`, http.StatusInternalServerError)
		return
	}

	// Return the URL so you can save it to Postgres later
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"url": url})
}

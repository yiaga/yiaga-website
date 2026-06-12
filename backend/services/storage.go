package services

import (
	"context"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"cloud.google.com/go/storage"
)

// UploadFile handles file upload based on STORAGE_TYPE env var
func UploadFile(ctx context.Context, file io.Reader, filename string) (string, error) {
	storageType := os.Getenv("STORAGE_TYPE")

	if storageType == "local" {
		return uploadToLocal(file, filename)
	}

	// Default to GCS
	bucketName := "yiaga-assets"
	// For GCS, we keep the "uploads/" prefix structure
	objectName := fmt.Sprintf("uploads/%s", filename)
	return UploadToGCS(ctx, bucketName, objectName, file)
}

func uploadToLocal(file io.Reader, filename string) (string, error) {
	// Create uploads directory if it doesn't exist
	uploadDir := "uploads"
	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		return "", fmt.Errorf("failed to create upload directory: %w", err)
	}

	// Create destination file
	dstPath := filepath.Join(uploadDir, filename)
	dst, err := os.Create(dstPath)
	if err != nil {
		return "", fmt.Errorf("failed to create file %s: %w", dstPath, err)
	}
	defer dst.Close()

	// Copy content
	if _, err := io.Copy(dst, file); err != nil {
		return "", fmt.Errorf("failed to save file: %w", err)
	}

	// Return URL
	baseURL := os.Getenv("BASE_URL")
	if baseURL == "" {
		baseURL = "http://localhost:8080"
	}
	return fmt.Sprintf("%s/uploads/%s", baseURL, filename), nil
}

// UploadToGCS streams a file directly to your GCS bucket.
func UploadToGCS(ctx context.Context, bucketName, objectName string, file io.Reader) (string, error) {
	client, err := storage.NewClient(ctx) // Uses Application Default Credentials (ADC)
	if err != nil {
		return "", fmt.Errorf("storage.NewClient: %w", err)
	}
	defer client.Close()

	// Create a writer to the bucket/object
	obj := client.Bucket(bucketName).Object(objectName)
	wc := obj.NewWriter(ctx)

	// Set public access control
	wc.ACL = []storage.ACLRule{{Entity: storage.AllUsers, Role: storage.RoleReader}}

	// Stream the data from the reader to GCS
	if _, err = io.Copy(wc, file); err != nil {
		return "", fmt.Errorf("io.Copy: %w", err)
	}

	// Close the writer to finalize the upload
	if err := wc.Close(); err != nil {
		return "", fmt.Errorf("Writer.Close: %w", err)
	}

	// Return the formatted public URL
	return fmt.Sprintf("https://storage.googleapis.com/%s/%s", bucketName, objectName), nil
}

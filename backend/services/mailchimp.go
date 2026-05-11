package services

import (
	"bytes"
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

// Interest IDs from your Mailchimp Audience
var (
	// Interest IDs from your Mailchimp Audience (Defaults, can be overridden by env)
	ID_MONTHLY       = getEnv("MAILCHIMP_INTEREST_MONTHLY", "bbaf1ac300")
	ID_BALLOT        = getEnv("MAILCHIMP_INTEREST_BALLOT", "d5f7538df5")
	ID_GENZ          = getEnv("MAILCHIMP_INTEREST_GENZ", "3609dc4fe2")
	ID_POLICY        = getEnv("MAILCHIMP_INTEREST_POLICY", "9487eaaee4")
	ID_NEWS          = getEnv("MAILCHIMP_INTEREST_NEWS", "dc7ac8549a")
	ID_OPPORTUNITIES = getEnv("MAILCHIMP_INTEREST_OPPORTUNITIES", "339a14f3a5")
)

func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}

type MailchimpMember struct {
	EmailAddress string            `json:"email_address"`
	Status       string            `json:"status"`
	Interests    map[string]bool   `json:"interests"`
	MergeFields  map[string]string `json:"merge_fields,omitempty"`
}

// MailchimpError helper to capture detailed API errors
type MailchimpError struct {
	Title  string `json:"title"`
	Status int    `json:"status"`
	Detail string `json:"detail"`
}

// SubscribeToMailchimp handles both new signups and preference updates
func SubscribeToMailchimp(email, firstName, lastName string, selectedSubscriptions []string) error {
	apiKey := os.Getenv("MAILCHIMP_API_KEY")
	listID := os.Getenv("MAILCHIMP_LIST_ID")

	if apiKey == "" || listID == "" {
		return fmt.Errorf("mailchimp credentials missing from environment")
	}

	// Extract server prefix (e.g., us17) from API key
	parts := strings.Split(apiKey, "-")
	if len(parts) != 2 {
		return fmt.Errorf("invalid MAILCHIMP_API_KEY format")
	}
	serverPrefix := parts[1]

	// Mailchimp requires MD5 hash of lowercase email for PUT (Add or Update)
	hash := md5.Sum([]byte(strings.ToLower(email)))
	subscriberHash := hex.EncodeToString(hash[:])

	url := fmt.Sprintf("https://%s.api.mailchimp.com/3.0/lists/%s/members/%s", serverPrefix, listID, subscriberHash)

	// Initialize all as false to ensure unselected items are "unsubscribed"
	interests := map[string]bool{
		ID_MONTHLY:       false,
		ID_BALLOT:        false,
		ID_GENZ:          false,
		ID_POLICY:        false,
		ID_NEWS:          false,
		ID_OPPORTUNITIES: false,
	}

	// Map UI keys to Mailchimp Interest IDs
	for _, sub := range selectedSubscriptions {
		switch strings.ToLower(sub) {
		case "monthly":
			interests[ID_MONTHLY] = true
		case "theballot":
			interests[ID_BALLOT] = true
		case "genz":
			interests[ID_GENZ] = true
		case "research":
			interests[ID_POLICY] = true
		case "press":
			interests[ID_NEWS] = true
		case "opportunities":
			interests[ID_OPPORTUNITIES] = true
		}
	}

	member := MailchimpMember{
		EmailAddress: email,
		Status:       "subscribed",
		Interests:    interests,
		MergeFields: map[string]string{
			"FNAME": firstName,
			"LNAME": lastName,
		},
	}

	jsonData, _ := json.Marshal(member)

	// Create PUT request to "upsert" member
	req, err := http.NewRequest(http.MethodPut, url, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("request creation failed: %v", err)
	}

	req.SetBasicAuth("user", apiKey) // Username can be anything
	req.Header.Set("Content-Type", "application/json")

	fmt.Printf("[Mailchimp] Attempting to sync email: %s with URL: %s\n", email, url)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("[Mailchimp] Network/Client Error: %v\n", err)
		return fmt.Errorf("connection to mailchimp failed: %v", err)
	}
	defer resp.Body.Close()

	// Handle API Errors
	if resp.StatusCode >= 400 {
		body, _ := io.ReadAll(resp.Body)
		fmt.Printf("[Mailchimp] API Error Status: %d\n[Mailchimp] Response Body: %s\n", resp.StatusCode, string(body))

		var mcErr MailchimpError
		json.Unmarshal(body, &mcErr)
		return fmt.Errorf("mailchimp error: %s - %s", mcErr.Title, mcErr.Detail)
	}

	fmt.Printf("[Mailchimp] Success! Status: %d\n", resp.StatusCode)
	return nil
}

package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func GetSubscriberAnalytics(w http.ResponseWriter, r *http.Request) {
	var totalActive int64
	var totalUnsubscribed int64
	var newThisWeek int64

	// Count active subscribers
	if err := database.DB.Model(&models.Subscriber{}).Where("is_active = ?", true).Count(&totalActive).Error; err != nil {
		http.Error(w, "Failed to count active subscribers", http.StatusInternalServerError)
		return
	}

	// Count unsubscribed
	if err := database.DB.Model(&models.Subscriber{}).Where("is_active = ?", false).Count(&totalUnsubscribed).Error; err != nil {
		http.Error(w, "Failed to count unsubscribed", http.StatusInternalServerError)
		return
	}

	// Count new subscribers in last 7 days
	sevenDaysAgo := time.Now().AddDate(0, 0, -7)
	if err := database.DB.Model(&models.Subscriber{}).Where("subscribed_at >= ?", sevenDaysAgo).Count(&newThisWeek).Error; err != nil {
		http.Error(w, "Failed to count new subscribers", http.StatusInternalServerError)
		return
	}

	// Topic Breakdown
	var subscribers []models.Subscriber
	if err := database.DB.Where("is_active = ?", true).Find(&subscribers).Error; err != nil {
		http.Error(w, "Failed to fetch subscribers", http.StatusInternalServerError)
		return
	}

	topicBreakdown := make(map[string]int)

	// Map of internal topic IDs to their display labels
	topicMapping := map[string]string{
		"monthly":       "Monthly Newsletter",
		"theballot":     "Weekly Election News Update (The Ballot)",
		"genz":          "GenZ Blog Series",
		"research":      "Research, Reports, Policy Briefs & Knowledge Products",
		"press":         "Press Releases, Stories & Democracy Updates",
		"opportunities": "Opportunities: Events Webinars & Open Calls",
	}

	// Initialize with 0 for all expected labels
	for _, label := range topicMapping {
		topicBreakdown[label] = 0
	}

	for _, sub := range subscribers {
		for _, topic := range sub.Subscriptions {
			if label, exists := topicMapping[topic]; exists {
				topicBreakdown[label]++
			} else {
				// Fallback in case old data has raw labels or unknown topics
				topicBreakdown[topic]++
			}
		}
	}

	// Remove any empty string keys if they exist
	delete(topicBreakdown, "")

	// Debug log
	log.Printf("Analytics: Active=%d, Unsub=%d, New=%d", totalActive, totalUnsubscribed, newThisWeek)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"total_active":       totalActive,
		"total_unsubscribed": totalUnsubscribed,
		"new_this_week":      newThisWeek,
		"topic_breakdown":    topicBreakdown,
	})
}

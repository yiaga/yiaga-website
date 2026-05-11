package models

import (
	"regexp"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"`
	jwt.RegisteredClaims
}

// --- Database Models ---

// Announcement - Updated by staff
type Announcement struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`

	Title       string    `json:"title"`
	Description string    `json:"description"`
	Date        string    `json:"date"`
	Link        string    `json:"link"`
	Image       string    `json:"image"`
	Status      string    `json:"status" gorm:"default:'published'"` // draft, published
	PublishedAt time.Time `json:"published_at"`
}

// BlogPost - Blog posts and News items
type BlogPost struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`

	Title       string    `json:"title"`
	Slug        string    `json:"slug" gorm:"uniqueIndex"`
	Excerpt     string    `json:"excerpt"`
	Content     string    `json:"content" gorm:"type:text"` // Rich text content
	Date        string    `json:"date"`                     // Using string to match frontend data for now
	Image       string    `json:"image"`                    // URL to image
	Author      string    `json:"author"`
	Category    string    `json:"category"` // e.g., "The Ballot", "Technology"
	IsFeatured  bool      `json:"featured"`
	Type        string    `json:"type"`                        // "blog" or "news"
	Tags        []string  `json:"tags" gorm:"serializer:json"` // JSON array of tags
	AuthorRole  string    `json:"author_role"`
	PdfUrl      string    `json:"pdf_url"` // Optional link to PDF
	PublishedAt time.Time `json:"published_at"`

	// New fields for Drafts, Custom Buttons, and Secondary Downloads
	IsDraft               bool   `json:"is_draft" gorm:"default:false"`
	ActionText            string `json:"action_text"`
	ActionLink            string `json:"action_link"`
	SecondaryDownloadUrl  string `json:"secondary_download_url"`
	SecondaryDownloadText string `json:"secondary_download_text"`
}

// Initiative - Projects and Initiatives
type Initiative struct {
	gorm.Model
	Title           string   `json:"title"`
	Slug            string   `json:"slug" gorm:"uniqueIndex"`
	Category        string   `json:"category"`
	Description     string   `json:"description" gorm:"type:text"`
	FullDescription string   `json:"full_description" gorm:"type:text"`
	Content         string   `json:"content" gorm:"type:text"`
	Status          string   `json:"status"` // e.g., "Ongoing", "Completed"
	Location        string   `json:"location"`
	Image           string   `json:"image"`
	Gallery         []string `json:"gallery" gorm:"serializer:json"`
	Activities      []string `json:"activities" gorm:"serializer:json"` // List of activities
	Stats           []Stat   `json:"stats" gorm:"serializer:json"`
	Color           string   `json:"color"`
}

type Stat struct {
	Label string `json:"label"`
	Value string `json:"value"`
}

// Resource - Downloadable reports, pdfs, videos
type Resource struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`

	Title       string    `json:"title"`
	Slug        string    `json:"slug" gorm:"index"`
	Description string    `json:"description" gorm:"type:text"`
	Type        string    `json:"type"`     // "PDF Report", "E-Book", "Video"
	Category    string    `json:"category"` // "Reports", "Toolkits"
	FileUrl     string    `json:"file_url"` // Link to download
	FileSize    string    `json:"file_size"`
	Downloads   string    `json:"downloads"` // Using string to match "2.5K" format
	Date        string    `json:"date"`
	PublishedAt time.Time `json:"published_at"`
	Icon        string    `json:"icon"` // Name of icon to use on frontend
}

func GenerateSlug(title string) string {
	re := regexp.MustCompile(`[^a-z0-9]+`)
	slug := re.ReplaceAllString(strings.ToLower(title), "-")
	return strings.Trim(slug, "-")
}

func (r *Resource) BeforeSave(tx *gorm.DB) (err error) {
	if r.Slug == "" {
		r.Slug = GenerateSlug(r.Title)
	}
	return
}

// Job - Careers & Opportunities
type Job struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at"`

	CallForApplication        string `json:"call_for_application"`
	Slug                      string `json:"slug" gorm:"uniqueIndex"`
	Location                  string `json:"location"`
	ApplicationDeadline       string `json:"application_deadline"`
	TypeOfContract            string `json:"type_of_contract"` // e.g., "Full-time", "Contract"
	Department                string `json:"department"`
	PostLevel                 string `json:"post_level"`
	LanguagesRequired         string `json:"languages_required"`
	DurationOfInitialContract string `json:"duration_of_initial_contract"`
	ApplicationLink           string `json:"application_link"` // External link for application

	// Long Text Fields
	AboutYiaga                string `json:"about_yiaga" gorm:"type:text"`
	Background                string `json:"background" gorm:"type:text"`
	DutiesAndResponsibilities string `json:"duties_and_responsibilities" gorm:"type:text"`
	Competence                string `json:"competence" gorm:"type:text"`
	LanguageRequirements      string `json:"language_requirements_long" gorm:"type:text"` // Renamed to avoid partial match issue if any, but clearer
	HowToApply                string `json:"how_to_apply" gorm:"type:text"`
	Objectives                string `json:"objectives" gorm:"type:text"`
	ExpectedOutcomes          string `json:"expected_outcomes" gorm:"type:text"`
	SelectionCriteria         string `json:"selection_criteria" gorm:"type:text"`

	IsActive bool   `json:"is_active" gorm:"default:true"`
	Type     string `json:"type" gorm:"default:'job'"` // "job" or "call"
}

// Comment - Blog/News discussions
type Comment struct {
	gorm.Model
	Content   string `json:"content"`
	Author    string `json:"author"`
	Email     string `json:"email"`
	PostID    uint   `json:"post_id"`                         // ID of the blog/news post
	PostTitle string `json:"post_title"`                      // Title for display in admin
	Status    string `json:"status" gorm:"default:'pending'"` // pending, approved, rejected
	Date      string `json:"date"`                            // Formatted date
}

// AuditLog - System activity
type AuditLog struct {
	gorm.Model
	Action    string `json:"action"`
	Details   string `json:"details"`
	UserID    string `json:"user_id"`
	UserName  string `json:"user_name"`
	UserRole  string `json:"user_role"`
	IPAddress string `json:"ip_address"`
	Timestamp string `json:"timestamp"` // ISO string
}

// ContactMessage - Form submissions
type ContactMessage struct {
	gorm.Model
	Name    string `json:"name"`
	Email   string `json:"email"`
	Subject string `json:"subject"`
	Message string `json:"message"`
	Status  string `json:"status" gorm:"default:'new'"` // new, read, archived
}

// Subscriber - Newsletter Subscribers
type Subscriber struct {
	gorm.Model
	Email         string    `json:"email" gorm:"uniqueIndex"`
	FirstName     string    `json:"first_name"`
	LastName      string    `json:"last_name"`
	Subscriptions []string  `json:"subscriptions" gorm:"serializer:json"` // List of selected topics
	IsActive      bool      `json:"is_active" gorm:"default:true"`
	SubscribedAt  time.Time `json:"subscribed_at"`
}

// VolunteerApplication - Form submissions for volunteers
type VolunteerApplication struct {
	gorm.Model
	Name       string `json:"name"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`
	Occupation string `json:"occupation"`
	Location   string `json:"location"`
	Skills     string `json:"skills"`
	Experience string `json:"experience"`
	Department string `json:"department"`
	Interests  string `json:"interests"`
	Status     string `json:"status" gorm:"default:'pending'"` // pending, reviewed, accepted, rejected
}

// InternshipApplication - Form submissions for interns
type InternshipApplication struct {
	gorm.Model
	FullName      string `json:"full_name"`
	Email         string `json:"email"`
	Phone         string `json:"phone"`
	Qualification string `json:"qualification"`
	Level         string `json:"level"`
	Duration      string `json:"duration"`
	Department    string `json:"department"`
	Message       string `json:"message"`
	Status        string `json:"status" gorm:"default:'pending'"` // pending, reviewed, accepted, rejected
}

// User - Admin Users for CMS
type User struct {
	gorm.Model
	Username string `json:"username" gorm:"uniqueIndex"`
	Email    string `json:"email" gorm:"uniqueIndex"`
	Password string `json:"-"`    // Hashed password to be added later
	Role     string `json:"role"` // "admin", "editor"
}

// HeroContent - CMS for Hero Section
type HeroContent struct {
	gorm.Model
	Page            string `json:"page"` // "home", "about", etc. No longer unique to allow slider
	Title           string `json:"title"`
	TitleHighlight  string `json:"title_highlight"`
	Description     string `json:"description"`
	CTAText         string `json:"cta_text"`
	CTALink         string `json:"cta_link"`
	SecondCTAText   string `json:"second_cta_text"`
	SecondCTALink   string `json:"second_cta_link"`
	BackgroundImage string `json:"background_image"`
}

// Partner - Partners & Supporters
type Partner struct {
	gorm.Model
	Name    string `json:"name"`
	Logo    string `json:"logo"`
	Website string `json:"website"`
}

// Badge - Badges of Excellence
type Badge struct {
	gorm.Model
	Name        string `json:"name"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

package services

import (
	"fmt"
	"net/smtp"
	"os"
)

func SendAdminEmail(fromName, fromEmail, subject, body string) error {
	// For production, these should be in .env
	smtpHost := os.Getenv("SMTP_HOST")
	smtpPort := os.Getenv("SMTP_PORT")
	smtpUser := os.Getenv("SMTP_USER")
	smtpPass := os.Getenv("SMTP_PASS")
	adminEmail := os.Getenv("ADMIN_EMAIL")

	if smtpHost == "" || smtpPort == "" || smtpUser == "" || smtpPass == "" || adminEmail == "" {
		fmt.Println("[Email Service] Missing SMTP configuration. Email not sent.")
		return nil // Not returning error to avoid breaking the contact form if email is not configured
	}

	auth := smtp.PlainAuth("", smtpUser, smtpPass, smtpHost)

	msg := []byte(fmt.Sprintf("To: %s\r\n"+
		"Subject: %s\r\n"+
		"Reply-To: %s\r\n"+
		"\r\n"+
		"Name: %s\r\n"+
		"Email: %s\r\n\r\n"+
		"Message:\n%s\r\n", adminEmail, subject, fromEmail, fromName, fromEmail, body))

	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpUser, []string{adminEmail}, msg)
	if err != nil {
		return err
	}

	return nil
}

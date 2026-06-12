package main

import (
	"encoding/xml"
	"fmt"
	"os"
)

type RSS struct {
	Channel Channel `xml:"channel"`
}

type Channel struct {
	Items []Item `xml:"item"`
}

type Item struct {
	Title    string `xml:"title"`
	PostType string `xml:"http://wordpress.org/export/1.2/ post_type"`
	Content  string `xml:"http://purl.org/rss/1.0/modules/content/ encoded"`
}

func main() {
	xmlFile, err := os.Open("../../../../yiagaafrica.WordPress.2026-03-09.xml")
	if err != nil {
		panic(err)
	}
	defer xmlFile.Close()

	var rss RSS
	xml.NewDecoder(xmlFile).Decode(&rss)

	countWithContent := 0
	countEmpty := 0

	for _, item := range rss.Channel.Items {
		if item.PostType == "post" || item.PostType == "portfolio" {
			if len(item.Content) > 0 {
				countWithContent++
			} else {
				countEmpty++
				if countEmpty <= 5 {
					fmt.Printf("Empty Content for Title: %s\n", item.Title)
				}
			}
		}
	}
	fmt.Printf("Total posts with content: %d\n", countWithContent)
	fmt.Printf("Total posts with empty content: %d\n", countEmpty)
}

package main

import (
	"bytes"
	"encoding/xml"
	"fmt"
	"log"
)

type Item struct {
	Title    string `xml:"title"`
	Content  string `xml:"http://purl.org/rss/1.0/modules/content/ encoded"`
	Content2 string `xml:"encoded"`
}

func main() {
	data := []byte(`
		<item xmlns:content="http://purl.org/rss/1.0/modules/content/">
			<title>Test Title</title>
			<content:encoded><![CDATA[<p>This is the content!</p>]]></content:encoded>
		</item>
	`)

	var item Item
	err := xml.NewDecoder(bytes.NewReader(data)).Decode(&item)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Content: '%s'\n", item.Content)
	fmt.Printf("Content2: '%s'\n", item.Content2)
}

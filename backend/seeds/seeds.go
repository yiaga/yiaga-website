package seeds

import (
	"errors"
	"log"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"yiaga-backend/database"
	"yiaga-backend/models"
)

func SeedData() {
	// Seed Hero Content
	heroSlides := []models.HeroContent{
		{
			Page:            "home",
			Title:           "Strengthening Democracy in Africa",
			TitleHighlight:  "Empowering Citizens for Good Governance",
			Description:     "Join us in building a continent where every voice matters and every vote counts.",
			CTAText:         "Learn More",
			CTALink:         "/democracy",
			SecondCTAText:   "Watch Video",
			SecondCTALink:   "#",
			BackgroundImage: "",
		},
		{
			Page:            "home",
			Title:           "Election Observation",
			TitleHighlight:  "Transparency in Every Vote",
			Description:     "Our nationwide network of observers ensures free and fair elections across Nigeria.",
			CTAText:         "View Reports",
			CTALink:         "/resources?category=Reports",
			SecondCTAText:   "Get Involved",
			SecondCTALink:   "/contact",
			BackgroundImage: "",
		},
		{
			Page:            "home",
			Title:           "Youth Political Participation",
			TitleHighlight:  "Ready to Run Campaign",
			Description:     "Training the next generation of leaders to transform governance in Africa.",
			CTAText:         "Join the Movement",
			CTALink:         "https://readytorun.ng",
			SecondCTAText:   "Success Stories",
			SecondCTALink:   "https://readytorun.ng",
			BackgroundImage: "",
		},
	}
	for _, h := range heroSlides {
		var existing models.HeroContent
		err := database.DB.Unscoped().Where("title = ? AND page = ?", h.Title, h.Page).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := database.DB.Create(&h).Error; err != nil {
				log.Printf("Failed to seed hero content '%s': %v\n", h.Title, err)
			}
		}
	}

	// Seed Announcements
	announcements := []models.Announcement{
		{
			Title:       "NVIS (National Voting Intentions Survey) Report 1 is released",
			Description: "Our comprehensive survey on national voting intentions is now available. Gain insights into the current political landscape and voter sentiment across the country.",
			Date:        "January 28, 2026",
			PublishedAt: time.Date(2026, 1, 28, 0, 0, 0, 0, time.UTC),
			Link:        "#",
			Image:       "/src/assets/nvis-report.jpg",
			Status:      "published",
		},
		{
			Title:       "Call for Applications: Election Observers",
			Description: "Join our nationwide network of citizen observers for the upcoming general elections. Make your voice count by ensuring electoral integrity.",
			Date:        "Dec 15, 2024",
			PublishedAt: time.Date(2024, 12, 15, 0, 0, 0, 0, time.UTC),
			Link:        "#",
			Image:       "/src/assets/hero-careers.jpg",
			Status:      "published",
		},
		{
			Title:       "Youth Leadership Summit 2025 Announced",
			Description: "Registration is now open for our annual summit bringing together young political leaders from across the continent.",
			Date:        "Dec 10, 2024",
			PublishedAt: time.Date(2024, 12, 10, 0, 0, 0, 0, time.UTC),
			Link:        "#",
			Image:       "/src/assets/youth.jpg",
			Status:      "published",
		},
	}
	for _, a := range announcements {
		var existing models.Announcement
		err := database.DB.Unscoped().Where("title = ?", a.Title).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := database.DB.Create(&a).Error; err != nil {
				log.Printf("Failed to seed announcement '%s': %v\n", a.Title, err)
			}
		}
	}

	// Seed Blog Posts & News
	posts := []models.BlogPost{
		{
			Title:       "The Role of Technology in Strengthening Electoral Processes",
			Slug:        "technology-strengthening-electoral-processes",
			Excerpt:     "Exploring how digital innovations are transforming election monitoring and citizen engagement across Africa.",
			Content:     "Technology has become an indispensable tool in modern election observation and democratic participation...",
			Date:        "Dec 4, 2024",
			PublishedAt: time.Date(2024, 12, 4, 0, 0, 0, 0, time.UTC),
			Author:      "Dr. Hussaini Abdu",
			AuthorRole:  "Country Director",
			Category:    "Technology",
			Image:       "/src/assets/blog-1.jpg",
			IsFeatured:  true,
			Type:        "blog",
		},
	}
	for _, p := range posts {
		var existing models.BlogPost
		err := database.DB.Unscoped().Where("slug = ?", p.Slug).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := database.DB.Create(&p).Error; err != nil {
				log.Printf("Failed to seed post '%s': %v\n", p.Title, err)
			}
		}
	}

	// Seed Initiatives
	defaultGallery := []string{
		"https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
		"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
		"https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
	}

	initiatives := []models.Initiative{
		{
			Title:           "The Transforming Electoral Governance in Africa (TEGA) initiative",
			Slug:            "tega",
			Category:        "Governance",
			Description:     "Enabling democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy.",
			FullDescription: "The Transforming Electoral Governance in Africa (TEGA) initiative aims to enable democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy. Under this initiative, Yiaga Africa undertakes policy conversations, study missions, and participatory action research on elections and electoral reforms.",
			Content:         "The Transforming Electoral Governance in Africa (TEGA) initiative aims to enable democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy. Under this initiative, Yiaga Africa undertakes policy conversations, study missions, and participatory action research on elections and electoral reforms. This initiative has deployed Election Study and Observation missions to presidential and parliamentary elections in Sierra Leone, Liberia, South Africa and Ghana. One result from the Election Study and Observation Mission to the 2024 South Africa General Elections was Yiaga Africa’s support in the drafting of an early voting bill. This bill provides citizens deployed for election day duties with an avenue to participate in the voting process and exercise their civic responsibility. The Bill was sponsored by Senator Abdulaziz Musa Yar’Adua, who is the Deputy Chair of the Senate Committee on Electoral Matters in the Nigerian National Assembly and was a member of the Election Observation and Study Mission.",
			Image:           "/src/assets/focus-governance.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Election Manipulation Risk Index",
			Slug:            "election-manipulation-risk-index",
			Category:        "Democracy",
			Description:     "A data-driven and evidence-based tool designed to curb election manipulation, facilitate strategic election planning and promote citizens' oversight.",
			FullDescription: "The Election Manipulation Risk Index (EMRI), which was first deployed during the 2023 general elections, is a data-driven and evidence-based tool designed to curb election manipulation, facilitate strategic election planning and promote citizens' oversight of the electoral process.",
			Content:         "The Election Manipulation Risk Index (EMRI), which was first deployed during the 2023 general elections, is a data-driven and evidence-based tool designed to curb election manipulation, facilitate strategic election planning and promote citizens' oversight of the electoral process. The EMRI monitors strategies and tools employed by election stakeholders to manipulate the electoral process. In addition, EMRI outlines mitigation measures to avert the risks posed by these actors. The central objective of the EMRI is to facilitate systematic and coherent monitoring of the insidious nature of election manipulation in Nigeria. The EMRI indicators reflect a comprehensive understanding of the electoral process and the interplay of other actors in the election value-chain. Though limited in scope, the EMRI is utilised by election stakeholders to spotlight issues likely to impact the integrity of the general elections. It is seen as a rapid scanning tool, rather than an in-depth solution for threats of election manipulation.",
			Image:           "/src/assets/initiative-2.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Gen Z Democratic Innovation Lab Initiative",
			Slug:            "gen-z-lab",
			Category:        "Democracy",
			Description:     "Empowering young people to drive civic engagement, electoral participation, and democratic reform through innovation.",
			FullDescription: "The Gen Z Democratic Innovation Lab by Yiaga Africa empowers young people to drive civic engagement, electoral participation, and democratic reform.",
			Content:         "The Gen Z Democratic Innovation Lab by Yiaga Africa empowers young people to drive civic engagement, electoral participation, and democratic reform. Focused on voter registration, civic education, and countering misinformation, the initiative is building a more informed and active generation of citizens. <br/><br/><strong>Key Impact include:</strong><br/><ul><li>Voter Access & Engagement</li><li>5,000+ new voters registered through CVR campaigns</li><li>New polling unit secured in partnership with Independent National Electoral Commission (INEC)</li><li>Strong partnerships with youth groups and student bodies</li><li>1,000+ social media engagements and ongoing youth coordination</li><li>Youth Participation</li><li>Civic campaigns reaching 2M+ people</li><li>11 youth election observers deployed across FCT Area Councils</li><li>700+ NYSC members engaged, driving voter interest</li><li>Digital platforms launched for fact-checking and civic learning</li><li>Policy & Media Influence</li><li>Engagement with key institutions youth-led reform priorities developed</li><li>65,000+ people reached through national and regional media.</li></ul>",
			Image:           "/src/assets/youth-1.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Research, Reports and Analysis",
			Slug:            "research-reports-analysis",
			Category:        "Governance",
			Description:     "Providing a rigorous, data-driven assessment of democracy in Africa to identify systemic threats and provide strategic frameworks.",
			FullDescription: "Yiaga Africa’s research, reports, and analysis provide a rigorous, data-driven assessment of democracy in Africa.",
			Content:         "Yiaga Africa’s research, reports, and analysis provide a rigorous, data-driven assessment of democracy in Africa. By conducting research, mid-term reviews, post-election audits and more, Yiaga Africa identifies systemic threats—ranging from judicial inconsistency and political violence to the emerging risks of AI-generated disinformation. This mode of work doesn't just document failures or highlight gaps; it provides a strategic framework of legislative and administrative recommendations aimed at rebuilding public trust, equipping citizens and providing credible resources for stakeholders.<br/><br/><strong>Some initiatives under this pillar include:</strong><br/><ul><li>National Voter Intention Survey (NVIS)</li><li>Dashed Hopes? 2023 General Election Report</li><li>The Electoral Integrity Index</li><li>Citizens’ Memorandum on Electoral Reform</li><li>Democratic Inclusivity Briefs</li><li>The \"Participation Paradox\" Study</li><li>Electoral Trust Tracker</li></ul>",
			Image:           "/src/assets/initiative-3.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Art for Democracy",
			Slug:            "art-for-democracy",
			Category:        "Democracy",
			Description:     "Leveraging creative arts (music, poetry, design) to foster active citizenship, democratic accountability and social cohesion.",
			FullDescription: "#Art4Democracy leverages the powerful role of arts to foster active citizenship, democratic accountability and social cohesion in Nigeria.",
			Content:         "#Art4Democracy leverages the powerful role of arts to foster active citizenship, democratic accountability and social cohesion in Nigeria. We collaborate with young artists, musicians, poets, creatives and designers to create civically-oriented art that promotes civic engagement by producing content that promotes political education, governance and social cohesion amongst Nigerians. Young creatives receive support and grants to bring their ideas to life, using art as a tool for awareness, education, and social impact. Summarily, #Art4Democracy builds the capacity of young creatives and civic activists on how to leverage art-based civic engagement for political education and policy advocacy.",
			Image:           "/src/assets/hero-careers.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Not Too Young To Run Hubs",
			Slug:            "not-too-young-to-run-hubs",
			Category:        "Democracy",
			Description:     "Community-based centers in tertiary institutions to mobilise youth participation in Nigeria’s democratic process.",
			FullDescription: "As part of efforts to increase youth interest in politics and foster effective civic engagement at the state and LGA level, we established Not Too Young To Run hubs.",
			Content:         "As part of efforts to increase youth interest in politics and foster effective civic engagement at the state and LGA level, we established Not Too Young To Run hubs in tertiary institutions across the six (6) geo-political zones of the country to mobilise youths to participate in Nigeria’s democratic process. Led by young people, the Not Too Young To Run hubs host local activities that promote democratic rights, political inclusion, leadership and transformative politics. Yiaga Africa supports the hubs with campaign organising funds to drive campaigns in host tertiary institutions and local government areas.<br/><br/>Currently, #NotTooYoungToRun Hubs are established in the following tertiary institutions: UNILAG, LASU, YABATECH, LAPOTECH, LASUSTECH, Ignatius Ajuru University, IMSU, Benue State University, Federal University Dutse, Modibbo Adama University, and Gombe State University.",
			Image:           "/src/assets/focus-civic.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Constituency Internship Programme",
			Slug:            "constituency-internship-programme",
			Category:        "Governance",
			Description:     "Providing young people with practical, hands-on experience in civic engagement, governance, and programme implementation.",
			FullDescription: "Our Constituency Internship Programme provides young people with practical, hands-on experience in civic engagement, governance, and programme implementation.",
			Content:         "Our Constituency Internship Programme provides young people with practical, hands-on experience in civic engagement, governance, and programme implementation. Since its inception in 2022, Yiaga Africa has recruited, trained and deployed 67 young people across 56 federal constituencies. Through the deployment of interns to constituency offices for a fixed period, the programme creates a structured pathway for youth to actively participate in governance while building relevant professional skills. Interns work closely with legislators and their aides, supporting administrative functions, conducting legislative research, and engaging in community outreach. This direct exposure not only strengthens their understanding of public service but also expands their networks and career opportunities within the governance and policy space.",
			Image:           "/src/assets/initiative-2.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Deliberative Democracy (People’s Assembly)",
			Slug:            "peoples-assembly",
			Category:        "Democracy",
			Description:     "Creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions.",
			FullDescription: "Through our People’s Assembly model, Yiaga Africa promotes deliberative democracy by creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions.",
			Content:         "Through our People’s Assembly model, Yiaga Africa promotes deliberative democracy by creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions. In a context where citizens often feel disconnected from political institutions, deliberative democracy offers a powerful alternative that values inclusive dialogue, collective reasoning, and citizen agency. The People’s Assembly is a citizen engagement platform that creates space for dialogue between citizens and stakeholders. It encourages inclusive participation, ensuring that diverse voices are heard and reflected in governance and decision-making processes.",
			Image:           "/src/assets/focus-community.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Watching The Vote (WTV) Programme",
			Slug:            "watching-the-vote",
			Category:        "Democracy",
			Description:     "A citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity.",
			FullDescription: "Our Watching The Vote (WTV) programme is a citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity.",
			Content:         "Our Watching The Vote (WTV) programme is a citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity. WTV is a comprehensive election and civic engagement initiative designed to strengthen electoral transparency, citizen participation, and democratic accountability across Nigeria and Africa. <br/><br/>Among others, we monitor: <ul><li>Election Observation</li><li>Process And Result Verification For Transparency (PVT / PRVT)</li><li>Process Monitoring</li></ul>",
			Image:           "/src/assets/focus-elections.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Electoral Reform & Policy Advocacy",
			Slug:            "electoral-reform-policy-advocacy",
			Category:        "Governance",
			Description:     "Strengthening democratic and electoral systems through sustained advocacy, research, and stakeholder engagement.",
			FullDescription: "We are committed to strengthening Nigeria’s democratic and electoral systems through sustained advocacy, research, and stakeholder engagement.",
			Content:         "We are committed to strengthening Nigeria’s democratic and electoral systems through sustained advocacy, research, and stakeholder engagement. We engage in evidence-based advocacy for reforms to Nigeria’s electoral legal framework, including the Electoral Act, and collaborate with key institutions such as the Independent National Electoral Commission (INEC), the National Assembly, state governments, and civil society organisations in promoting credible elections, deepening electoral integrity, and advancing reforms.",
			Image:           "/src/assets/focus-governance.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Voter Education & Outreach",
			Slug:            "voter-education-outreach",
			Category:        "Democracy",
			Description:     "Extensive voter education campaigns inform and empower citizens through community outreach and creative messaging.",
			FullDescription: "We carry out extensive voter education campaigns to inform and empower citizens.",
			Content:         "We carry out extensive voter education campaigns to inform and empower citizens. Our approach includes: Community outreach and engagement, Awareness campaigns in multiple states, Grassroots mobilisation before elections and Civic Education Programmes through radio jingles in local languages, television broadcasts, voter education videos and creative messaging tailored to different regions across various media channels and platforms.",
			Image:           "/src/assets/initiative-1.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Yiaga Africa Community Organising Institute (COI) Initiative",
			Slug:            "community-organising-institute",
			Category:        "Governance",
			Description:     "Building a new generation of responsible and accountable leaders to transform governance across the continent.",
			FullDescription: "Yiaga Africa has identified poor leadership as one of the major challenges facing the African continent.",
			Content:         "Yiaga Africa has identified poor leadership as one of the major challenges facing the African continent. In response, the organisation is working to close this gap through its Community Organising Institute (COI), a strategic platform designed to build a new generation of responsible and accountable leaders. The COI programme brings together young people under the age of 30 from across Africa.",
			Image:           "/src/assets/youth-1.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Women's Leadership and Representation Initiative",
			Slug:            "womens-leadership-representation",
			Category:        "Democracy",
			Description:     "Encouraging women's participation in political processes to engender increased leadership and representation.",
			FullDescription: "Under the Women Leadership and Representation Initiative, Yiaga Africa implemented the Young Women Political Organising Lab.",
			Content:         "Under the Women Leadership and Representation Initiative, Yiaga Africa implemented the Young Women Political Organising Lab, organised to fulfil the goal of encouraging Women’s Participation in the political processes, focusing on young women to engender increased leadership, political participation, and representation for women in Africa.",
			Image:           "/src/assets/focus-women.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "ReadytoRun Movement",
			Slug:            "ready-to-run-movement",
			Category:        "Democracy",
			Description:     "Inspiring, preparing, and supporting young Nigerians to run for elective office through tools and networks.",
			FullDescription: "The Ready To Run initiative, born out of the Not Too Young To Run movement (NTYTR), is designed to inspire, prepare, and support young Nigerians with the competence, capacity, and character to run for elective office.",
			Content:         "The Ready To Run initiative, born out of the Not Too Young To Run movement (NTYTR), is designed to inspire, prepare, and support young Nigerians with the competence, capacity, and character to run for elective office. Ready to Run responds to the challenge of preparedness while navigating the expensive tide of Nigeria’s political space.",
			Image:           "/src/assets/initiative-2.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Digital Democracy",
			Slug:            "digital-democracy-initiative",
			Category:        "Democracy",
			Description:     "Harnessing technology to enhance democratic processes, citizen participation, and institutional accountability.",
			FullDescription: "Innovation and emerging Technologies offer new opportunities to enhance public engagement and participation in democratic institutions and processes.",
			Content:         "Innovation and emerging Technologies offer new opportunities to enhance public engagement and participation in democratic institutions and processes. Yiaga Africa uses digital democracy to enhance democratic processes and citizen participation. We harness technology to strengthen citizen engagement, civic education, and institutional accountability.",
			Image:           "/src/assets/initiative-1.jpg",
			Gallery:         defaultGallery,
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Not Too Young To Run",
			Slug:            "not-too-young-to-run",
			Category:        "Democracy",
			Description:     "A global movement promoting youth inclusion in politics, transformative leadership and democratic rights.",
			FullDescription: "The Not Too Young To Run is a global movement promoting youth inclusion in politics, transformative leadership and democratic rights. The campaign was initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution to enable young people to run for public office.",
			Content:         "<p>The Not Too Young To Run is a global movement promoting youth inclusion in politics, transformative leadership and democratic rights. The campaign was initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution to enable young people to run for public office. In 2018, Nigeria passed legislation to reduce the age for running for the President, National and state parliaments. The Not Too Young To Run bill fulfilled all conditions prescribed in the Constitution for its passage. The Senate and House of Representatives passed the bill with an overwhelming majority, while 33 out of 36 state assemblies adopted the age reduction amendment.</p><p>May 31, 2018, will be remembered in history as the day democracy won and Nigeria witnessed a true “youthquake.” President Muhammadu Buhari signed the Not Too Young To Run bill into law, reducing the age for running for the office of the President from 40 to 35 years, House of Representatives from 30 to 25, and the State House of Assembly from 30 to 25. He acknowledged Not Too Young To Run as a “landmark piece of legislation conceived, championed and accomplished by young Nigerians.” The hallmark of the campaign was the adoption of the campaign by the United Nations, the African Union and the Economic Community of West African States. Not Too Young To Run has been launched in several countries in Africa, including Kenya, Gambia, Liberia, Zimbabwe, Tanzania, Cameroon and Sierra Leone. Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa.</p><p>The Not Too Young To Run Movement has inspired several young people to run for office in Nigeria and Africa. For instance, Gambia has 4 parliamentarians in the National Assembly who were part of the Not Too Young To Run movement in The Gambia. In Nigeria, there has been an increase in the number of young people contesting and winning their elections. Youth candidacy in Nigeria rose from 21% in the 2015 General Elections to 34.2% in the 2019 General Elections. Similarly, youth representation in the 2023 general election, National Assembly, and particularly the House of Representatives, increased from 3% in 2019 to 3.92%, while in State Houses of Assembly, it rose from 8.9% in 2019 to 9.2%. Two (2) seats in the House of Representatives were won by young people below 30 years, making them the first time direct beneficiaries since the passage of the age reduction act, also known as the Not Too Young To Run Act.</p><p>Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa. Yiaga Africa continues to support young legislators in the legislature to deliver on their legislative responsibilities for qualitative leadership and representation, showcase them as models of public leadership and improve public perception of youth public leadership.</p>",
			Stats: []models.Stat{
				{Label: "Youth Candidacy 2019", Value: "34.2%"},
				{Label: "African Countries", Value: "8+"},
				{Label: "States Adopted", Value: "33/36"},
			},
			Image:  "/src/assets/focus-women.jpg",
			Gallery: defaultGallery,
			Color:  "primary",
			Status: "Ongoing",
		},
	}

	// Delete existing initiatives to ensure clean slate for order
	database.DB.Unscoped().Where("1 = 1").Delete(&models.Initiative{})

	for _, i := range initiatives {
		if err := database.DB.Create(&i).Error; err != nil {
			log.Printf("Failed to seed initiative '%s': %v\n", i.Title, err)
		}
	}
	log.Println("Database seeded with exact titles, order, and Governance/Democracy categories")

	// Seed Partners & Badges
	partners := []models.Partner{
		{Name: "National Endowment for Democracy", Logo: "/src/assets/partners/ned.jpg"},
		{Name: "European Union", Logo: "/src/assets/partners/eu.jpg"},
	}
	for _, p := range partners {
		var existing models.Partner
		err := database.DB.Unscoped().Where("name = ?", p.Name).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			database.DB.Create(&p)
		}
	}

	badges := []models.Badge{
		{Name: "ED Certified", Image: "Shield", Description: "NGOsource Equivalency Determination"},
	}
	for _, b := range badges {
		var existing models.Badge
		err := database.DB.Unscoped().Where("name = ?", b.Name).First(&existing).Error
		if errors.Is(err, gorm.ErrRecordNotFound) {
			database.DB.Create(&b)
		}
	}

	// Seed Admin User
	var adminUser models.User
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("admin123"), bcrypt.DefaultCost)
	err := database.DB.Unscoped().Where("email = ?", "admin@yiaga.org").First(&adminUser).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		admin := models.User{
			Username: "Yiaga Admin",
			Email:    "admin@yiaga.org",
			Role:     "admin",
			Password: string(hashedPassword),
		}
		database.DB.Create(&admin)
	}
}

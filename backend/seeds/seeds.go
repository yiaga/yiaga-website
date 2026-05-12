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
			Image:       "/assets/nvis-report.jpg",
			Status:      "published",
		},
		{
			Title:       "Call for Applications: Election Observers",
			Description: "Join our nationwide network of citizen observers for the upcoming general elections. Make your voice count by ensuring electoral integrity.",
			Date:        "Dec 15, 2024",
			PublishedAt: time.Date(2024, 12, 15, 0, 0, 0, 0, time.UTC),
			Link:        "#",
			Image:       "/assets/hero-careers.jpg",
			Status:      "published",
		},
		{
			Title:       "Youth Leadership Summit 2025 Announced",
			Description: "Registration is now open for our annual summit bringing together young political leaders from across the continent.",
			Date:        "Dec 10, 2024",
			PublishedAt: time.Date(2024, 12, 10, 0, 0, 0, 0, time.UTC),
			Link:        "#",
			Image:       "/assets/youth.jpg",
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
			Image:       "/assets/blog-1.jpg",
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

	initiatives := []models.Initiative{
		{
			Title:           "The Transforming Electoral Governance in Africa (TEGA) initiative",
			Slug:            "tega",
			Category:        "Governance",
			Description:     "Enabling democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy.",
			FullDescription: "The Transforming Electoral Governance in Africa (TEGA) initiative aims to enable democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy. Under this initiative, Yiaga Africa undertakes policy conversations, study missions, and participatory action research on elections and electoral reforms.",
			Content:         "The Transforming Electoral Governance in Africa (TEGA) initiative aims to enable democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy. Under this initiative, Yiaga Africa undertakes policy conversations, study missions, and participatory action research on elections and electoral reforms. This initiative has deployed Election Study and Observation missions to presidential and parliamentary elections in Sierra Leone, Liberia, South Africa and Ghana. One result from the Election Study and Observation Mission to the 2024 South Africa General Elections was Yiaga Africa’s support in the drafting of an early voting bill. This bill provides citizens deployed for election day duties with an avenue to participate in the voting process and exercise their civic responsibility. The Bill was sponsored by Senator Abdulaziz Musa Yar’Adua, who is the Deputy Chair of the Senate Committee on Electoral Matters in the Nigerian National Assembly and was a member of the Election Observation and Study Mission.",
			Image:           "/assets/initiatives/election-1.jpg",
			Gallery:         []string{"/assets/initiatives/election-2.jpg", "/assets/initiatives/election-3.jpg", "/assets/initiatives/election-4.jpg"},
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
			Image:           "/assets/initiatives/election-5.jpg",
			Gallery:         []string{"/assets/initiatives/election-6.jpg", "/assets/initiatives/election-7.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Gen Z Democratic Innovation Lab Initiative",
			Slug:            "gen-z-lab",
			Category:        "Democracy",
			Description:     "Empowering young people to drive civic engagement, electoral participation, and democratic reform.",
			FullDescription: "The Gen Z Democratic Innovation Lab by Yiaga Africa empowers young people to drive civic engagement, electoral participation, and democratic reform.",
			Content:         "The Gen Z Democratic Innovation Lab by Yiaga Africa empowers young people to drive civic engagement, electoral participation, and democratic reform. Focused on voter registration, civic education, and countering misinformation, the initiative is building a more informed and active generation of citizens.<br/><br/><strong>Key Impact include:</strong><br/><ul><li><strong>Voter Access & Engagement</strong></li><li>5,000+ new voters registered through CVR campaigns</li><li>New polling unit secured in partnership with Independent National Electoral Commission (INEC)</li><li>Strong partnerships with youth groups and student bodies</li><li>1,000+ social media engagements and ongoing youth coordination</li><li><strong>Youth Participation</strong></li><li>Civic campaigns reaching 2M+ people</li><li>11 youth election observers deployed across FCT Area Councils</li><li>700+ NYSC members engaged, driving voter interest</li><li>Digital platforms launched for fact-checking and civic learning</li><li><strong>Policy & Media Influence</strong></li><li>Engagement with key institutions youth-led reform priorities developed</li><li>65,000+ people reached through national and regional media.</li></ul>",
			Image:           "/assets/initiatives/Gen Z/genz1.jpg",
			Gallery:         []string{"/assets/initiatives/Gen Z/genz2.jpg", "/assets/initiatives/Gen Z/genz3.jpg", "/assets/initiatives/Gen Z/genz4.jpg", "/assets/initiatives/Gen Z/genz5.jpg", "/assets/initiatives/Gen Z/genz6.jpg", "/assets/initiatives/Gen Z/genz7.jpg", "/assets/initiatives/Gen Z/genz8.jpg", "/assets/initiatives/Gen Z/genz9.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Research, Reports and Analysis",
			Slug:            "research-reports-analysis",
			Category:        "Governance",
			Description:     "Providing a rigorous, data-driven assessment of democracy in Africa to identify systemic threats and provide strategic frameworks.",
			FullDescription: "Yiaga Africa’s research, reports, and analysis provide a rigorous, data-driven assessment of democracy in Africa.",
			Content:         "Yiaga Africa’s research, reports, and analysis provide a rigorous, data-driven assessment of democracy in Africa. By conducting research, mid-term reviews, post-election audits and more, Yiaga Africa identifies systemic threats—ranging from judicial inconsistency and political violence to the emerging risks of AI-generated disinformation. This mode of work doesn't just document failures or highlight gaps; it provides a strategic framework of legislative and administrative recommendations aimed at rebuilding public trust, equipping citizens and providing credible resources for stakeholders.<br/><br/><strong>Some initiatives under this pillar include:</strong><br/><ul><li><strong>National Voter Intention Survey (NVIS):</strong> The National Voter Intention Survey (NVIS) is a data-driven initiative designed to systematically capture citizens’ views, perceptions, and intentions regarding elections and governance, generating credible empirical evidence on how citizens perceive electoral integrity, their readiness to participate in the voting process, and the level of trust they place in key democratic institutions. Beyond measuring attitudes, the NVIS provides deeper insights into the drivers of voter behaviour, such as access to information, past electoral experiences, and socio-economic factors, while also disaggregating data across demographics like age, gender, and location to reveal disparities in participation and inclusion. The findings serve as a vital resource for policymakers, electoral stakeholders, civil society organisations, and development partners, enabling evidence-based decision-making, strengthening voter engagement strategies, and informing reforms that enhance the transparency, credibility, and inclusiveness of electoral processes.</li><li><strong>Dashed Hopes? 2023 General Election Report:</strong> This is a rigorous, data-driven post-mortem of Nigeria’s seventh consecutive general election. This comprehensive report evaluates the performance of the Bimodal Voter Accreditation System (BVAS) and the IReV portal, identifying the logistical and technological gaps that impacted the process. It offers a strategic roadmap of 27 legislative and administrative recommendations aimed at professionalising appointments and safeguarding technology to rebuild public trust.</li><li><strong>The Electoral Integrity Index:</strong> a systematic tool designed to evaluate the fairness and quality of local government elections in Nigeria. By establishing clear democratic standards for transparency and impartial management, this index addresses the challenge of state interference in grassroots governance. It provides civil society and state actors with a structured pathway to transition local polls from state-controlled \"coronations\" to credible, citizen-led contests.</li><li><strong>Citizens’ Memorandum on Electoral Reform:</strong> a strategic advocacy framework for enhancing the integrity of Nigeria's legal architecture. Drawing on lessons from the 2023 polls, the memorandum provides a comprehensive set of proposals to unbundle the Independent National Electoral Commission (INEC), establish an Electoral Offences Commission, and mandate the electronic transmission of results to protect the sanctity of the ballot.</li><li><strong>Democratic Inclusivity Briefs:</strong> a series of targeted policy analyses exploring systemic disenfranchisement within the electoral framework. These briefs—specifically focused on Inmate Voting and Early Voting—identify legal and logistical pathways to expand the franchise to over 1.5 million essential service providers and over 81,000 citizens in correctional centres. By bridging these policy gaps, the initiative ensures that Nigeria's democracy aligns with international standards for inclusive suffrage.</li><li><strong>The \"Participation Paradox\" Study:</strong> an analytical investigation into the disconnect between record-high voter registration and historically low election-day turnout. This research addresses the root causes of voter apathy, from the erosion of institutional trust to the impact of electoral violence. It provides INEC and civil society with data-driven strategies to convert a growing electorate into active, informed participants on election day.</li><li><strong>Electoral Trust Tracker:</strong> a post-election analytical series that monitors the state of Nigeria’s democracy between major cycles. It evaluates the impact of judicial pronouncements on public confidence and assesses the commission’s performance in off-cycle and bye-elections. This tracker provides a vital feedback loop for stakeholders to initiate necessary reforms that safeguard electoral integrity long before the 2027 general elections.</li></ul><br/>At Yiaga Africa, we believe that data-driven advocacy is the cornerstone of a resilient democracy. Our extensive library of research, reports, and analytical tools is designed to provide citizens, lawmakers, and development partners with the evidence needed to drive meaningful change. Whether you are looking for a deep dive into electoral integrity, a practical toolkit for grassroots organising, or a concise policy brief for legislative advocacy, our comprehensive repository is open to all.",
			Image:           "/assets/initiatives/voter-education-1.jpg",
			Gallery:         []string{"/assets/initiatives/voter-education-2.jpg", "/assets/initiatives/voter-education-3.jpg", "/assets/initiatives/voter-education-4.jpg"},
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
			Image:           "/assets/initiatives/Art for Democracy/a4d1.jpg",
			Gallery:         []string{"/assets/initiatives/Art for Democracy/a4d2.jpg", "/assets/initiatives/Art for Democracy/a4d3.jpg", "/assets/initiatives/Art for Democracy/a4d4.jpg", "/assets/initiatives/Art for Democracy/a4d5.jpg", "/assets/initiatives/Art for Democracy/a4d6.jpg", "/assets/initiatives/Art for Democracy/a4d7.jpg", "/assets/initiatives/Art for Democracy/a4d8.jpg"},
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
			Image:           "/assets/initiatives/NTYTR HUB/ntytr_hub1.jpg",
			Gallery:         []string{"/assets/initiatives/NTYTR HUB/ntytr_hub2.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub3.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub4.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub5.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub6.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub7.jpg"},
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
			Image:           "/assets/initiatives/Constituency Office/constituency1.JPG",
			Gallery:         []string{"/assets/initiatives/Constituency Office/constituency2.JPG", "/assets/initiatives/Constituency Office/constituency3.JPG", "/assets/initiatives/Constituency Office/constituency4.JPG", "/assets/initiatives/Constituency Office/constituency5.JPG", "/assets/initiatives/Constituency Office/constituency6.JPG", "/assets/initiatives/Constituency Office/constituency7.JPG", "/assets/initiatives/Constituency Office/constituency8.JPG", "/assets/initiatives/Constituency Office/constituency9.JPG"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Deliberative Democracy (People’s Assembly)",
			Slug:            "peoples-assembly",
			Category:        "Democracy",
			Description:     "Creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions.",
			FullDescription: "Through our People’s Assembly model, Yiaga Africa promotes deliberative democracy by creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions.",
			Content:         "Through our People’s Assembly model, Yiaga Africa promotes deliberative democracy by creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions. In a context where citizens often feel disconnected from political institutions, deliberative democracy offers a powerful alternative that values inclusive dialogue, collective reasoning, and citizen agency. The People’s Assembly is a citizen engagement platform that creates space for dialogue between citizens and stakeholders. It encourages inclusive participation, ensuring that diverse voices are heard and reflected in governance and decision-making processes. These assemblies strengthen democratic legitimacy by making the government more responsive to grassroots voices. Yiaga Africa uses deliberative spaces to promote civic learning, critical thinking, and political education.",
			Image:           "/assets/initiatives/people Assembly/people_assembly1.jpg",
			Gallery:         []string{"/assets/initiatives/people Assembly/people_assembly2.jpg", "/assets/initiatives/people Assembly/people_assembly3.jpg", "/assets/initiatives/people Assembly/people_assembly4.jpg", "/assets/initiatives/people Assembly/people_assembly5.jpg", "/assets/initiatives/people Assembly/people_assembly6.jpg", "/assets/initiatives/people Assembly/people_assembly7.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Watching The Vote (WTV) Programme",
			Slug:            "watching-the-vote",
			Category:        "Democracy",
			Description:     "A citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity.",
			FullDescription: "Our Watching The Vote (WTV) programme is a citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity.",
			Content:         "Our Watching The Vote (WTV) programme is a citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity. WTV is a comprehensive election and civic engagement initiative designed to strengthen electoral transparency, citizen participation, and democratic accountability across Nigeria and Africa. Among others, we monitor:<br/><ul><li><strong>Election Observation:</strong> We deploy trained observers to monitor elections across Nigeria, including national, state, and local government elections. Our observation focuses on: Opening of polls, Voting process, Results collation. Over the years, we have conducted multiple election observations nationwide, ensuring credible and transparent electoral processes. We use election observation to strengthen electoral integrity, promote transparency, accountability, and credible elections. Yiaga Africa has also deployed international election observation missions to South Africa, Ghana, Sierra Leone, Liberia and the United States.</li><li><strong>Process And Result Verification For Transparency (PVT / PRVT):</strong> We implement the Process and Result Verification for Transparency (PRVT) to independently verify election results and the conduct of election day processes. We have conducted 18 PVT exercises across Nigeria in ____ presidential elections and ___ governorship election. The PRVT provides data-driven verification of official results and strengthens public trust in electoral outcomes through the use of technology.</li></ul><br/>Under WTV, Yiaga Africa conducts sample-based observation of pre-election, during and post-election activities. We monitor post-election court proceedings, including: Election tribunals, Appeal Court processes, and Supreme Court rulings to ensure continued accountability beyond election day.",
			Image:           "/assets/initiatives/WTV/wtv1.jpg",
			Gallery:         []string{"/assets/initiatives/WTV/wtv2.jpg", "/assets/initiatives/WTV/wtv3.jpg", "/assets/initiatives/WTV/wtv4.jpg", "/assets/initiatives/WTV/wtv5.jpg", "/assets/initiatives/WTV/wtv6.jpg", "/assets/initiatives/WTV/wtv7.jpg", "/assets/initiatives/WTV/wtv8.jpg", "/assets/initiatives/WTV/wtv9.jpg", "/assets/initiatives/WTV/wtv10.jpg", "/assets/initiatives/WTV/wtv11.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Electoral Reform & Policy Advocacy",
			Slug:            "electoral-reform-policy-advocacy",
			Category:        "Governance",
			Description:     "Strengthening democratic and electoral systems through sustained advocacy, research, and stakeholder engagement.",
			FullDescription: "We are committed to strengthening Nigeria’s democratic and electoral systems through sustained advocacy, research, and stakeholder engagement.",
			Content:         "We are committed to strengthening Nigeria’s democratic and electoral systems through sustained advocacy, research, and stakeholder engagement. We engage in evidence-based advocacy for reforms to Nigeria’s electoral legal framework, including the Electoral Act, and collaborate with key institutions such as the Independent National Electoral Commission (INEC), the National Assembly, state governments, and civil society organisations in promoting credible elections, deepening electoral integrity, and advancing reforms that make the electoral process more transparent, inclusive, and efficient. Through policy analysis and strategic engagement, we provide actionable recommendations aimed at improving voter registration systems, election administration, political party regulation, and result management processes.<br/><br/>Our initiatives also include the development of reform-focused policy proposals such as the “#ANewINEC” framework, which advocates for a more independent, efficient, and technologically driven electoral management body. We further support civic-driven reforms such as the Early Voting and Inmate Voting Bill Advocacy, aimed at ensuring that essential workers on election day are not disenfranchised and that eligible incarcerated persons retain their voting rights, thereby strengthening inclusion, fairness, and democratic legitimacy. In addition, we convene and contribute to multi-stakeholder platforms such as the Citizens’ Memorandum for the Reform of the Electoral Legal Framework, which aggregates citizen voices, expert insights, and institutional recommendations into coherent reform proposals for policymakers. Through these interventions, we aim to strengthen electoral governance, deepen public trust in democratic processes, and contribute to a more accountable and participatory political system in Nigeria.",
			Image:           "/assets/initiatives/Electoral Reform/elect_ref1.jpg",
			Gallery:         []string{"/assets/initiatives/Electoral Reform/elect_ref2.jpg", "/assets/initiatives/Electoral Reform/elect_ref3.jpg", "/assets/initiatives/Electoral Reform/elect_ref4.jpg", "/assets/initiatives/Electoral Reform/elect_ref5.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Voter Education & Outreach",
			Slug:            "voter-education-outreach",
			Category:        "Democracy",
			Description:     "Extensive voter education campaigns inform and empower citizens through community outreach and creative messaging.",
			FullDescription: "We carry out extensive voter education campaigns to inform and empower citizens.",
			Content:         "We carry out extensive voter education campaigns to inform and empower citizens.<br/><br/>Our approach includes: Community outreach and engagement, Awareness campaigns in multiple states, Grassroots mobilisation before elections and Civic Education Programmes through radio jingles in local languages (e.g., Yoruba, Pidgin, English), television broadcasts, voter education videos and creative messaging tailored to different regions across various media channels and platforms. The aim is to simplify electoral processes for citizens, especially young voters, break down how elections work, and promote informed participation. We use media to amplify voter education and civic awareness. Some initiatives under voter education and outreach include:<br/><ul><li><strong>Election 101 in 5:</strong> an illustrative expose that provides citizens with all the useful information on voting in Nigeria’s electoral process in five minutes or less. The series, which is made up of 80 videos, simplifies Nigeria’s electoral process and enlightens citizens on the electoral framework that guides the conduct of elections in Nigeria. It has been broadcast on a major television channel in Nigeria, and is available on Yiaga Africa’s social media and YouTube channels. Watch episodes of Election 101 in 5 Here: <a href=\"https://youtube.com/playlist?list=PLTNhOaAj12cjCAYYjJijnQPeai-nHJIlw&si=HsIOO76w05YBWWXi\" target=\"_blank\">YouTube Playlist</a></li><li><strong>My Election Buddy:</strong> a comprehensive voter education compendium for the 2023 General Elections in Nigeria. It covers all topics regarding the election, including the voting process, the offices being voted for, and how citizens can also be a part of the election monitoring process. It incorporates a digital tool in the form of a WhatsApp chatbot to provide citizens with all relevant information regarding elections in Nigeria.</li><li><strong>#SixtyPercentOfUs:</strong> In a bid to increase citizen turnout in Nigeria’s election, Yiaga Africa launched a project tagged #SixtyPercentOfUs, aimed at mobilising at least 60% of eligible young voters to register, collect their Permanent Voters Cards (PVCs) and vote in the 2023 elections using traditional and non-traditional tools of political mobilisation. The campaign successfully targeted and mobilised over 20 thousand young people to register and collect their PVCs ahead of the 2023 elections.</li></ul>",
			Image:           "/assets/initiatives/Outreach/outreach1.jpg",
			Gallery:         []string{"/assets/initiatives/Outreach/outreach2.jpg", "/assets/initiatives/Outreach/outreach3.jpg", "/assets/initiatives/Outreach/outreach4.jpg", "/assets/initiatives/Outreach/outreach5.jpg", "/assets/initiatives/Outreach/outreach6.jpg", "/assets/initiatives/Outreach/outreach7.jpg", "/assets/initiatives/Outreach/outreach8.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Yiaga Africa Community Organising Institute (COI) Initiative",
			Slug:            "community-organising-institute",
			Category:        "Governance",
			Description:     "Building a new generation of responsible and accountable leaders to transform governance across the continent.",
			FullDescription: "Yiaga Africa has identified poor leadership as one of the major challenges facing the African continent.",
			Content:         "Yiaga Africa has identified poor leadership as one of the major challenges facing the African continent. In response, the organisation is working to close this gap through its Community Organising Institute (COI), a strategic platform designed to build a new generation of responsible and accountable leaders. The COI programme brings together young people under the age of 30 from across Africa. Past cohorts have engaged over 500 participants drawn from Nigeria, The Gambia, Liberia, Cameroon, and Ghana. These participants are equipped with the knowledge, tools, and networks needed to drive social and political change within their communities. Yiaga Africa believes that empowering young leaders is key to transforming governance across the continent. Through the COI initiative, participants are trained to become agents of change, capable of inspiring civic participation, strengthening democratic processes, and promoting accountability.<br/><br/><strong>Key Focus Areas for COI include:</strong><br/><ul><li><strong>Youth Political Participation:</strong> Encouraging young people to actively engage in governance and electoral processes.</li><li><strong>Civic Education:</strong> Improving public understanding of democratic rights and responsibilities.</li><li><strong>Leadership Development:</strong> Building ethical, responsive, and community-driven leaders.</li><li><strong>Combating Voter Apathy:</strong> Supporting initiatives like “2023: Yiaga Africa, youths strategise to stop voter apathy” to increase voter turnout and participation.</li><li><strong>Strengthening Constituency Relations:</strong> Promoting stronger connections between elected representatives and citizens.</li></ul><br/>The COI initiative envisions a new generation of youth-led movements across Africa, increased civic engagement and reduced voter apathy, stronger, more accountable leadership systems and sustainable democratic development across communities.",
			Image:           "/assets/initiatives/COI/coi1.jpg",
			Gallery:         []string{"/assets/initiatives/COI/coi2.jpg", "/assets/initiatives/COI/coi3.jpg", "/assets/initiatives/COI/coi4.jpg", "/assets/initiatives/COI/coi5.jpg", "/assets/initiatives/COI/coi6.jpg", "/assets/initiatives/COI/coi7.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Women's Leadership and Representation Initiative",
			Slug:            "womens-leadership-representation",
			Category:        "Democracy",
			Description:     "Encouraging women's participation in political processes to engender increased leadership and representation.",
			FullDescription: "Under the Women Leadership and Representation Initiative, Yiaga Africa implemented the Young Women Political Organising Lab.",
			Content:         "Under the Women Leadership and Representation Initiative, Yiaga Africa implemented the Young Women Political Organising Lab, organised to fulfil the goal of encouraging Women’s Participation in the political processes, focusing on young women to engender increased leadership, political participation, and representation for women in Africa. The Young Women’s Political Organising Labs, so far implemented in Lagos and Accra, were designed as a training programme dedicated to empowering and strengthening the capacity of young female politicians, women-led civil society organisations, as well as female student union leaders. Beyond capacity strengthening, the initiative has contributed to tangible outcomes, including the emergence of young women who have successfully contested and won local elections in Lagos state, Nigeria. It aims to mobilise and support young women to pursue political leadership and helps young women develop leadership skills and self-confidence.",
			Image:           "/assets/initiatives/voter-education-5.jpg",
			Gallery:         []string{"/assets/initiatives/voter-education-6.jpg", "/assets/initiatives/voter-education-7.jpg", "/assets/initiatives/voter-education-8.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "#ReadyToRun Movement",
			Slug:            "ready-to-run-movement",
			Category:        "Democracy",
			Description:     "Inspiring, preparing, and supporting young Nigerians to run for elective office through tools and networks.",
			FullDescription: "The Ready To Run initiative, born out of the Not Too Young To Run movement (NTYTR), is designed to inspire, prepare, and support young Nigerians with the competence, capacity, and character to run for elective office.",
			Content:         "The Ready To Run initiative, born out of the Not Too Young To Run movement (NTYTR), is designed to inspire, prepare, and support young Nigerians with the competence, capacity, and character to run for elective office. The initiative seeks to increase youth candidacy and representation through contributory support, build a community of practice for the support of youth candidates and establish a network of young political leaders across Nigeria.<br/><br/>Ready to Run responds to the challenge of preparedness while navigating the expensive tide of Nigeria’s political space. While the removal of age barriers opened the political space, a critical gap identified during the NTYTR advocacy shows that many young aspirants still face structural, financial, and capacity challenges in contesting and winning elections. Ready To Run locates, inspires, supports, and connects young people, particularly those contesting for the House of Representatives and State Houses of Assembly seats, with the tools and networks required for electoral success.<br/><br/><strong>Since 2018, the #ReadyToRun campaign has built a growing pipeline of youth political participation across Nigeria:</strong><br/><ul><li>1,394 young people engaged across the 2019 and 2023 general elections</li><li>334 aspirants emerged from the platform</li><li>325 candidates successfully secured party tickets</li><li>45 young leaders elected into the House of Representatives and the State Houses of Assembly</li></ul><br/>These outcomes demonstrate the initiative’s role in strengthening youth political leadership and representation within Nigeria’s democratic institutions.",
			Image:           "/assets/initiatives/Readytorun/readytorun1.JPG",
			Gallery:         []string{"/assets/initiatives/Readytorun/readytorun2.JPG", "/assets/initiatives/Readytorun/readytorun3.JPG", "/assets/initiatives/Readytorun/readytorun4.JPG", "/assets/initiatives/Readytorun/readytorun5.JPG", "/assets/initiatives/Readytorun/readytorun6.JPG", "/assets/initiatives/Readytorun/readytorun7.JPG", "/assets/initiatives/Readytorun/readytorun8.JPG"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Digital Democracy",
			Slug:            "digital-democracy-initiative",
			Category:        "Democracy",
			Description:     "Harnessing technology to enhance democratic processes, citizen participation, and institutional accountability.",
			FullDescription: "Innovation and emerging Technologies offer new opportunities to enhance public engagement and participation in democratic institutions and processes.",
			Content:         "Innovation and emerging Technologies offer new opportunities to enhance public engagement and participation in democratic institutions and processes. By leveraging technology, e-democracy also empowers civil society to actively engage citizens and government institutions, which improves policy-making procedures. Yiaga Africa uses digital democracy to enhance democratic processes and citizen participation. We harness technology to strengthen citizen engagement, civic education, and institutional accountability. Our digital tools enhance participation, simplify civic knowledge, and support data-driven governance.<br/><br/><strong>Some of the solutions we have deployed include:</strong><br/><ul><li><strong>Election Result Analysis Dashboard (ERAD):</strong> ERAD is an innovative platform founded by Yiaga Africa in 2022 to support Nigeria’s election management body by providing the public with access to analysed election results from the polling units in relative real-time. ERAD is the only single alternative source that provides accurate election results as uploaded on the INEC Result Viewing Portal while serving as an independent audit and integrity test assessment tool for INEC’s results management.</li><li><strong>CVR (Continuous Voter Registration) Ward and Polling Unit Locator:</strong> This tool helps citizens easily find where they can register to vote or where their polling unit is located. Instead of struggling to locate registration centres, users can simply search online, making voter registration more accessible and encouraging more people—especially young voters—to participate in elections.</li><li><strong>Africa Elections Tracker:</strong> This is a platform that monitors and provides information about elections across different African countries. It keeps users updated on election timelines, key events, and developments. The tracker promotes awareness and helps citizens, researchers, and civil society stay informed about democratic processes across the continent.</li><li><strong>Digital Democracy Exhibitions:</strong> These are interactive events or showcases that use technology (like visuals, data displays, and digital tools) to educate citizens about democracy and governance. They make civic learning more engaging and relatable, especially for young people, and encourage active participation in democratic processes.</li><li><strong>Dashboard on Local Government Elections:</strong> This dashboard provides data and insights specifically on local government elections. It helps citizens understand what is happening at the grassroots level by showing election results, trends, and participation rates. This strengthens accountability and ensures that local governance is not ignored.</li></ul><br/>Digital Democracy involves leveraging digital tools to increase transparency, accountability, and inclusivity in governance, as well as fostering active citizenship through online platforms and digital engagement.",
			Image:           "/assets/initiatives/Digital DEmocracy/digi_dem1.jpg",
			Gallery:         []string{"/assets/initiatives/Digital DEmocracy/digi_dem2.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem3.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem4.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem5.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem6.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem7.jpg", "/assets/initiatives/Digital DEmocracy/digi_dem8.jpg"},
			Color:           "primary",
			Status:          "Ongoing",
		},
		{
			Title:           "Not Too Young To Run",
			Slug:            "not-too-young-to-run",
			Category:        "Democracy",
			Description:     "A global movement promoting youth inclusion in politics, transformative leadership and democratic rights.",
			FullDescription: "The Not Too Young To Run is a global movement promoting youth inclusion in politics, transformative leadership and democratic rights. The campaign was initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution to enable young people to run for public office.",
			Content:         "The Not Too Young To Run is a global movement promoting youth inclusion in politics, transformative leadership and democratic rights. The campaign was initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution to enable young people to run for public office. In 2018, Nigeria passed legislation to reduce the age for running for the President, National and state parliaments. The Not Too Young To Run bill fulfilled all conditions prescribed in the Constitution for its passage. The Senate and House of Representatives passed the bill with an overwhelming majority, while 33 out of 36 state assemblies adopted the age reduction amendment.<br/><br/>May 31, 2018, will be remembered in history as the day democracy won and Nigeria witnessed a true “youthquake.” President Muhammadu Buhari signed the Not Too Young To Run bill into law, reducing the age for running for the office of the President from 40 to 35 years, House of Representatives from 30 to 25, and the State House of Assembly from 30 to 25. He acknowledged Not Too Young To Run as a “landmark piece of legislation conceived, championed and accomplished by young Nigerians.” The hallmark of the campaign was the adoption of the campaign by the United Nations, the African Union and the Economic Community of West African States. Not Too Young To Run has been launched in several countries in Africa, including Kenya, Gambia, Liberia, Zimbabwe, Tanzania, Cameroon and Sierra Leone. Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa.<br/><br/>The Not Too Young To Run Movement has inspired several young people to run for office in Nigeria and Africa. For instance, Gambia has 4 parliamentarians in the National Assembly who were part of the Not Too Young To Run movement in The Gambia. In Nigeria, there has been an increase in the number of young people contesting and winning their elections. Youth candidacy in Nigeria rose from 21% in the 2015 General Elections to 34.2% in the 2019 General Elections. Similarly, youth representation in the 2023 general election, National Assembly, and particularly the House of Representatives, increased from 3% in 2019 to 3.92%, while in State Houses of Assembly, it rose from 8.9% in 2019 to 9.2%. Two (2) seats in the House of Representatives were won by young people below 30 years, making them the first time direct beneficiaries since the passage of the age reduction act, also known as the Not Too Young To Run Act.<br/><br/>Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa. Yiaga Africa continues to support young legislators in the legislature to deliver on their legislative responsibilities for qualitative leadership and representation, showcase them as models of public leadership and improve public perception of youth public leadership.",
			Stats: []models.Stat{
				{Label: "Youth Candidacy 2019", Value: "34.2%"},
				{Label: "African Countries", Value: "8+"},
				{Label: "States Adopted", Value: "33/36"},
			},
			Image:   "/assets/initiatives/NTYTR HUB/ntytr_hub6.jpg",
			Gallery: []string{"/assets/initiatives/NTYTR HUB/ntytr_hub7.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub5.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub4.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub3.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub2.jpg", "/assets/initiatives/NTYTR HUB/ntytr_hub1.jpg"},
			Color:   "primary",
			Status:  "Ongoing",
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
		{Name: "National Endowment for Democracy", Logo: "/assets/partners/ned.jpg"},
		{Name: "European Union", Logo: "/assets/partners/eu.jpg"},
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

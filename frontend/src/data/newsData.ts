import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
  author: string;
  authorRole: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 1,
    slug: "yiaga-africa-deploys-observers",
    title: "Yiaga Africa Deploys Observers for Upcoming State Elections",
    excerpt: "Over 5,000 citizen observers have been trained and deployed to monitor the upcoming gubernatorial elections in key states across Nigeria.",
    content: `In preparation for the upcoming gubernatorial elections, Yiaga Africa has successfully trained and deployed over 5,000 citizen observers across multiple states. These observers will be stationed at polling units to monitor the electoral process and ensure transparency.

The deployment represents one of the largest citizen-led observation efforts in Nigeria's electoral history. Observers have been equipped with mobile technology to report incidents in real-time, ensuring immediate response to any irregularities.

"This is a critical moment for Nigerian democracy," said the Executive Director. "Our observers are the eyes and ears of the Nigerian people, ensuring that every vote counts and is counted."

The observers have undergone rigorous training on election laws, observation protocols, and reporting mechanisms. They will monitor voter accreditation, voting procedures, and vote counting at their assigned polling units.

Key aspects of the deployment include:
- Real-time incident reporting through mobile applications
- Independent verification of official results
- Documentation of electoral irregularities
- Support for voters facing challenges

The initiative is supported by international partners committed to strengthening democracy in Africa.`,
    category: "Elections",
    date: "Dec 5, 2024",
    readTime: "4 min read",
    featured: true,
    image: news1,
    author: "Editorial Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 2,
    slug: "youth-political-participation-workshop",
    title: "Youth Political Participation Workshop Concludes in Abuja",
    excerpt: "The three-day intensive workshop trained 200 young leaders on effective political engagement strategies and campaign management.",
    content: `The Ready To Run program concluded its latest workshop in Abuja, having trained 200 young leaders from across Nigeria on political participation and campaign strategies.

Participants learned about:
- Campaign planning and management
- Public speaking and communication
- Fundraising strategies
- Digital campaign tools
- Policy development and advocacy

The workshop featured interactive sessions, role-playing exercises, and mentorship opportunities with experienced political leaders. Participants also developed action plans for their political engagement.

"Young people are not just the leaders of tomorrow - they are the leaders of today," emphasized the program director. "This workshop equips them with the tools they need to make a difference in their communities."`,
    category: "Training",
    date: "Dec 3, 2024",
    readTime: "3 min read",
    featured: false,
    image: news2,
    author: "Communications Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 3,
    slug: "state-of-democracy-report-2024",
    title: "New Report: State of Democracy in Nigeria 2024",
    excerpt: "Our comprehensive annual report examines the progress and challenges facing Nigerian democracy in the past year.",
    content: `Yiaga Africa releases its annual State of Democracy report, providing an in-depth analysis of democratic governance in Nigeria throughout 2024.

The report covers key areas including:
- Electoral integrity and reforms
- Citizen participation and engagement
- Government accountability and transparency
- Human rights and civic space
- Youth and women's political participation

Key findings reveal both progress and persistent challenges in Nigeria's democratic journey. The report provides evidence-based recommendations for strengthening democratic institutions and practices.`,
    category: "Research",
    date: "Dec 1, 2024",
    readTime: "5 min read",
    featured: false,
    image: news3,
    author: "Research Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 4,
    slug: "partnership-international-democracy-institute",
    title: "Partnership Announcement with International Democracy Institute",
    excerpt: "Yiaga Africa partners with leading international organizations to strengthen election integrity programs across Africa.",
    content: `A new strategic partnership has been announced that will expand Yiaga Africa's election integrity programs to additional African countries.

The partnership aims to:
- Share best practices in election observation
- Build capacity for citizen-led monitoring
- Develop technology solutions for electoral transparency
- Support continental networks of democracy advocates

This collaboration represents a significant step in strengthening democratic practices across the continent.`,
    category: "Partnerships",
    date: "Nov 28, 2024",
    readTime: "2 min read",
    featured: false,
    image: news1,
    author: "Editorial Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 5,
    slug: "civic-education-rural-communities",
    title: "Civic Education Campaign Launches in Rural Communities",
    excerpt: "A new initiative brings democracy education to underserved rural communities across six states.",
    content: `Yiaga Africa has launched an extensive civic education campaign targeting rural communities in six Nigerian states.

The campaign focuses on:
- Voter education and registration
- Understanding democratic rights
- Community engagement with local government
- Women's participation in governance

The initiative aims to reach over 500,000 citizens in underserved areas where access to civic education has been limited.`,
    category: "Events",
    date: "Nov 25, 2024",
    readTime: "3 min read",
    featured: false,
    image: news2,
    author: "Programs Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 6,
    slug: "women-politics-summit",
    title: "Women in Politics Summit Attracts Record Attendance",
    excerpt: "The annual summit brought together over 500 women leaders to discuss strategies for increasing female representation in government.",
    content: `The Women in Politics Summit 2024 saw record attendance with over 500 women leaders from across Nigeria participating.

Sessions covered topics including:
- Breaking barriers in political campaigns
- Building support networks for women candidates
- Addressing gender-based violence in politics
- Mentorship and leadership development

The summit concluded with commitments from participants to support more women candidates in upcoming elections.`,
    category: "Events",
    date: "Nov 20, 2024",
    readTime: "4 min read",
    featured: false,
    image: news3,
    author: "Communications Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 7,
    slug: "election-technology-innovation",
    title: "Introducing New Election Monitoring Technology",
    excerpt: "Yiaga Africa unveils cutting-edge technology for real-time election monitoring and result verification.",
    content: `Yiaga Africa has unveiled new technology tools designed to enhance election monitoring and result verification processes.

The technology suite includes:
- Mobile reporting applications
- Real-time dashboard for incident tracking
- Parallel vote tabulation systems
- Automated result verification tools

These innovations will improve the accuracy and speed of citizen-led election observation.`,
    category: "Technology",
    date: "Nov 15, 2024",
    readTime: "4 min read",
    featured: false,
    image: news1,
    author: "Tech Team",
    authorRole: "Yiaga Africa",
  },
  {
    id: 8,
    slug: "youth-governance-forum",
    title: "National Youth Governance Forum Kicks Off",
    excerpt: "Over 1,000 young people gather to discuss their role in shaping Nigeria's governance future.",
    content: `The National Youth Governance Forum has commenced, bringing together over 1,000 young Nigerians to discuss governance and civic participation.

The forum features:
- Panel discussions with government officials
- Workshops on advocacy and policy
- Networking opportunities
- Youth policy development sessions

The event aims to amplify youth voices in national governance discussions.`,
    category: "Events",
    date: "Nov 10, 2024",
    readTime: "3 min read",
    featured: false,
    image: news2,
    author: "Youth Programs",
    authorRole: "Yiaga Africa",
  },
];

export const getNewsItem = (slug: string): NewsItem | undefined => {
  return newsItems.find(item => item.slug === slug);
};

import focusElections from "@/assets/focus-elections.jpg";
import focusCivic from "@/assets/focus-civic.jpg";
import focusWomen from "@/assets/focus-women.jpg";
import focusGovernance from "@/assets/focus-governance.jpg";
import focusCommunity from "@/assets/focus-community.jpg";
import youth1 from "@/assets/youth-1.jpg";
import initiative1 from "@/assets/initiative-1.jpg";
import initiative2 from "@/assets/initiative-2.jpg";
import initiative3 from "@/assets/initiative-3.jpg";
import heroVolunteer from "@/assets/hero-careers.jpg";

export interface Initiative {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  full_description: string;
  content?: string;
  highlights?: string[];
  stats?: {
    label: string;
    value: string;
  }[];
  image: string;
  color: string;
  pillar: 'Democracy' | 'Governance';
  subCategory: string;
}

export const initiatives: Initiative[] = [
  {
    id: 1,
    slug: "tega",
    title: "Transforming Electoral Governance in Africa (TEGA)",
    category: "Legislative & Policy Reform",
    description: "Reimagining electoral laws through study missions and research (e.g., the Early Voting Bill in Nigeria).",
    full_description: "TEGA is a flagship policy research and advocacy initiative that examines electoral governance frameworks across Africa, using comparative analysis and study missions to push for progressive electoral law reforms in Nigeria.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">The Transforming Electoral Governance in Africa (TEGA) initiative aims to enable democratic societies and institutions to reimagine electoral governance through evidence-based learning, documentation and advocacy.</span> Under this initiative, Yiaga Africa undertakes policy conversations, study missions, and participatory action research on elections and electoral reforms. This initiative has deployed Election Study and Observation missions to presidential and parliamentary elections in Sierra Leone, Liberia, South Africa and Ghana.</p>
<p>One result from the Election Study and Observation Mission to the 2024 South Africa General Elections was Yiaga Africa’s support in the drafting of an early voting bill. This bill provides citizens deployed for election day duties with an avenue to participate in the voting process and exercise their civic responsibility. The Bill was sponsored by Senator Abdulaziz Musa Yar’Adua, who is the Deputy Chair of the Senate Committee on Electoral Matters in the Nigerian National Assembly and was a member of the Election Observation and Study Mission.</p>`,
    stats: [
      { label: "Countries Covered", value: "4+" },
      { label: "Reform Bills", value: "3+" }
    ],
    image: focusGovernance,
    color: "primary",
    pillar: "Governance",
    subCategory: "Legislative & Policy Reform"
  },
  {
    id: 2,
    slug: "election-manipulation-risk-index",
    title: "Election Manipulation Risk Index (EMRI)",
    category: "Electoral Integrity & Monitoring",
    description: "A data tool to identify and mitigate threats to fair elections.",
    full_description: "The Election Manipulation Risk Index is a diagnostic tool that assesses the vulnerability of electoral processes to manipulation, providing early warning indicators to civil society and stakeholders.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">The Election Manipulation Risk Index (EMRI), which was first deployed during the 2023 general elections, is a data-driven and evidence-based tool designed to curb election manipulation, facilitate strategic election planning and promote citizens' oversight of the electoral process.</span> The EMRI monitors strategies and tools employed by election stakeholders to manipulate the electoral process. In addition, EMRI outlines mitigation measures to avert the risks posed by these actors.</p>
<p>The central objective of the EMRI is to facilitate systematic and coherent monitoring of the insidious nature of election manipulation in Nigeria. The EMRI indicators reflect a comprehensive understanding of the electoral process and the interplay of other actors in the election value-chain. Though limited in scope, the EMRI is utilised by election stakeholders to spotlight issues likely to impact the integrity of the general elections. It is seen as a rapid scanning tool, rather than an in-depth solution for threats of election manipulation.</p>`,
    image: initiative2,
    color: "primary",
    pillar: "Democracy",
    subCategory: "Electoral Integrity & Monitoring"
  },
  {
    id: 3,
    slug: "gen-z-lab",
    title: "Gen Z Democratic Innovation Lab Initiative",
    category: "Leadership & Citizen Agency",
    description: "Empowering the next generation to redefine democratic participation through innovation and technology.",
    full_description: "The Gen Z Democratic Innovation Lab is a space for young people to experiment with new ways of engaging in democracy, leveraging digital tools and creative strategies to make civic participation more accessible and impactful for the youth demographic.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">The Gen Z Democratic Innovation Lab by Yiaga Africa empowers young people to drive civic engagement, electoral participation, and democratic reform.</span> Focused on voter registration, civic education, and countering misinformation, the initiative is building a more informed and active generation of citizens.</p>
<p><strong>Key Impact include:</strong></p>
<ul class="space-y-2 list-disc pl-5">
<li><strong>Voter Access & Engagement:</strong> 5,000+ new voters registered through CVR campaigns, New polling unit secured in partnership with Independent National Electoral Commission (INEC), Strong partnerships with youth groups and student bodies, 1,000+ social media engagements and ongoing youth coordination.</li>
<li><strong>Youth Participation:</strong> Civic campaigns reaching 2M+ people, 11 youth election observers deployed across FCT Area Councils, 700+ NYSC members engaged, driving voter interest, Digital platforms launched for fact-checking and civic learning.</li>
<li><strong>Policy & Media Influence:</strong> Engagement with key institutions youth-led reform priorities developed, 65,000+ people reached through national and regional media.</li>
</ul>`,
    image: youth1,
    color: "secondary",
    pillar: "Governance",
    subCategory: "Leadership & Citizen Agency"
  },
  {
    id: 4,
    slug: "research-reports-analysis",
    title: "Research, Reports and Analysis",
    category: "Legislative & Policy Reform",
    description: "Providing evidence-based insights and comprehensive analysis to inform democratic discourse and policy reform.",
    full_description: "Our research department produces in-depth reports, policy briefs, and analytical papers that provide the data-driven foundation for our advocacy and intervention strategies across Africa.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Yiaga Africa’s research, reports, and analysis provide a rigorous, data-driven assessment of democracy in Africa.</span> By conducting research, mid-term reviews, post-election audits and more, Yiaga Africa identifies systemic threats—ranging from judicial inconsistency and political violence to the emerging risks of AI-generated disinformation. This mode of work doesn't just document failures or highlight gaps; it provides a strategic framework of legislative and administrative recommendations aimed at rebuilding public trust, equipping citizens and providing credible resources for stakeholders.</p>
<p><strong>Some initiatives under this pillar include:</strong></p>
<ul class="space-y-4">
<li><strong>A. National Voter Intention Survey (NVIS):</strong> The National Voter Intention Survey (NVIS) is a data-driven initiative designed to systematically capture citizens’ views, perceptions, and intentions regarding elections and governance, generating credible empirical evidence on how citizens perceive electoral integrity, their readiness to participate in the voting process, and the level of trust they place in key democratic institutions. Beyond measuring attitudes, the NVIS provides deeper insights into the drivers of voter behaviour, such as access to information, past electoral experiences, and socio-economic factors, while also disaggregating data across demographics like age, gender, and location to reveal disparities in participation and inclusion. The findings serve as a vital resource for policymakers, electoral stakeholders, civil society organisations, and development partners, enabling evidence-based decision-making, strengthening voter engagement strategies, and informing reforms that enhance the transparency, credibility, and inclusiveness of electoral processes.<br/>
<a href="https://nvis.yiaga.org/" target="_blank" class="text-primary hover:underline">https://nvis.yiaga.org/</a><br/>
<a href="https://drive.google.com/drive/folders/1ta7-S3sxSHuKCEef_7c77do2Zr5GKvRX?usp=drive_link" target="_blank" class="text-primary hover:underline">NVIS Drive Link</a></li>
<li><strong>B. Dashed Hopes? 2023 General Election Report:</strong> This is a rigorous, data-driven post-mortem of Nigeria’s seventh consecutive general election. This comprehensive report evaluates the performance of the Bimodal Voter Accreditation System (BVAS) and the IReV portal, identifying the logistical and technological gaps that impacted the process. It offers a strategic roadmap of 27 legislative and administrative recommendations aimed at professionalising appointments and safeguarding technology to rebuild public trust.<br/>
<a href="https://yiaga.org/resources/dashed-hopes-yiaga-africa-report-on-nigeria-s-2023-general-election" target="_blank" class="text-primary hover:underline">Dashed Hopes Report</a></li>
<li><strong>C. The Electoral Integrity Index:</strong> a systematic tool designed to evaluate the fairness and quality of local government elections in Nigeria. By establishing clear democratic standards for transparency and impartial management, this index addresses the challenge of state interference in grassroots governance. It provides civil society and state actors with a structured pathway to transition local polls from state-controlled "coronations" to credible, citizen-led contests.<br/>
<a href="https://yiaga.org/resources/evaluating-grassroots-democracy-index-for-assessing-the-integrity-of-local-government-elections-in-nigeria" target="_blank" class="text-primary hover:underline">Electoral Integrity Index Report</a></li>
<li><strong>D. Citizens’ Memorandum on Electoral Reform:</strong> a strategic advocacy framework for enhancing the integrity of Nigeria's legal architecture. Drawing on lessons from the 2023 polls, the memorandum provides a comprehensive set of proposals to unbundle the Independent National Electoral Commission (INEC), establish an Electoral Offences Commission, and mandate the electronic transmission of results to protect the sanctity of the ballot.<br/>
<a href="https://yiaga.org/resources/championing-integrity-citizens-memorandum-for-reform-of-the-electoral-legal-framework" target="_blank" class="text-primary hover:underline">Citizens’ Memorandum</a></li>
<li><strong>E. Democratic Inclusivity Briefs:</strong> a series of targeted policy analyses exploring systemic disenfranchisement within the electoral framework. These briefs—specifically focused on Inmate Voting and Early Voting—identify legal and logistical pathways to expand the franchise to over 1.5 million essential service providers and over 81,000 citizens in correctional centres. By bridging these policy gaps, the initiative ensures that Nigeria's democracy aligns with international standards for inclusive suffrage.<br/>
<a href="https://yiaga.org/resources/democracy-behind-bars-bridging-legal-and-policy-gaps-for-inmate-voting-in-nigeria" target="_blank" class="text-primary hover:underline">Inmate Voting Brief</a><br/>
<a href="https://yiaga.org/resources/advancing-inclusivity-prospects-and-challenges-of-introducing-early-voting-in-nigeria" target="_blank" class="text-primary hover:underline">Early Voting Brief</a></li>
<li><strong>F. The "Participation Paradox" Study:</strong> an analytical investigation into the disconnect between record-high voter registration and historically low election-day turnout. This research addresses the root causes of voter apathy, from the erosion of institutional trust to the impact of electoral violence. It provides INEC and civil society with data-driven strategies to convert a growing electorate into active, informed participants on election day.<br/>
<a href="https://yiaga.org/resources/policy-brief-are-nigerians-voting" target="_blank" class="text-primary hover:underline">Participation Paradox Brief</a><br/>
<a href="https://drive.google.com/drive/folders/1e-6iHtfons3P3aJGeVCmmdKUSIZBSHlM?usp=drive_link" target="_blank" class="text-primary hover:underline">Study Drive Link</a></li>
<li><strong>G. Electoral Trust Tracker:</strong> a post-election analytical series that monitors the state of Nigeria’s democracy between major cycles. It evaluates the impact of judicial pronouncements on public confidence and assesses the commission’s performance in off-cycle and bye-elections. This tracker provides a vital feedback loop for stakeholders to initiate necessary reforms that safeguard electoral integrity long before the 2027 general elections.<br/>
<a href="https://yiaga.org/resources/electoral-trust-restored-nigeria-s-electoral-process-one-year-after-the-2023-general-election" target="_blank" class="text-primary hover:underline">Electoral Trust Tracker</a></li>
</ul>
<p class="font-display mt-8">At Yiaga Africa, we believe that data-driven advocacy is the cornerstone of a resilient democracy. Our extensive library of research, reports, and analytical tools is designed to provide citizens, lawmakers, and development partners with the evidence needed to drive meaningful change. Whether you are looking for a deep dive into electoral integrity, a practical toolkit for grassroots organising, or a concise policy brief for legislative advocacy, our comprehensive repository is open to all.</p>
<div class="mt-6">
<a href="/resources" class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">Explore and Download Our Full Library of Resources Here</a>
</div>`,
    image: initiative3,
    color: "primary",
    pillar: "Governance",
    subCategory: "Legislative & Policy Reform"
  },
  {
    id: 5,
    slug: "art-for-democracy",
    title: "Art for Democracy",
    category: "Youth & Women’s Political Inclusion",
    description: "Using creative arts (music, poetry, design) to simplify democratic concepts.",
    full_description: "Art for Democracy leverages creative arts to drive civic engagement, collaborating with young artists, musicians, poets, and designers to create content that makes democracy accessible and exciting for young Nigerians.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">#Art4Democracy leverages the powerful role of arts to foster active citizenship, democratic accountability and social cohesion in Nigeria.</span> We collaborate with young artists, musicians, poets, creatives and designers to create civically-oriented art that promotes civic engagement by producing content that promotes political education, governance and social cohesion amongst Nigerians.</p>
<p>Young creatives receive support and grants to bring their ideas to life, using art as a tool for awareness, education, and social impact. Summarily, #Art4Democracy builds the capacity of young creatives and civic activists on how to leverage art-based civic engagement for political education and policy advocacy.</p>`,
    image: heroVolunteer,
    color: "accent",
    pillar: "Democracy",
    subCategory: "Youth & Women’s Political Inclusion"
  },
  {
    id: 6,
    slug: "not-too-young-to-run-hubs",
    title: "Not Too Young To Run Hubs",
    category: "Youth & Women’s Political Inclusion",
    description: "Community-based centers for the Not Too Young To Run movement, fostering local political leadership.",
    full_description: "Not Too Young To Run Hubs serve as local organizing centers where young people can access resources, training, and networks to support their political aspirations and civic engagement efforts within their communities.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">As part of efforts to increase youth interest in politics and foster effective civic engagement at the state and LGA level, we established Not Too Young To Run hubs in tertiary institutions across the six (6) geo-political zones of the country to mobilise youths to participate in Nigeria’s democratic process.</span> Led by young people, the Not Too Young To Run hubs host local activities that promote democratic rights, political inclusion, leadership and transformative politics.</p>
<p>Yiaga Africa supports the hubs with campaign organising funds to drive campaigns in host tertiary institutions and local government areas. Currently, #NotTooYoungToRun Hubs are established in the following tertiary institutions – University of Lagos (UNILAG), Lagos State University (LASU), Yaba College of Technology (YABATECH), Lagos State Polytechnic (LAPOTECH), Lagos State University of Science and Technology (LASUSTECH), Ignatius Ajuru University of Education, Rivers, Imo State University (IMSU), Benue State University, Makurdi (BSU), Federal University, Dutse (FUD), Modibbo Adama University, Yola and Gombe State University (Gombe).</p>`,
    image: focusCivic,
    color: "accent",
    pillar: "Democracy",
    subCategory: "Youth & Women’s Political Inclusion"
  },
  {
    id: 7,
    slug: "constituency-internship-programme",
    title: "Constituency Internship Programme",
    category: "Leadership & Citizen Agency",
    description: "Providing practical governance experience to young people within the Yiaga team.",
    full_description: "The Constituency Internship Programme offers young professionals within the Yiaga Africa team hands-on experience in governance, policy, and civic engagement, bridging the gap between learning and real-world democratic practice.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Our Constituency Internship Programme provides young people with practical, hands-on experience in civic engagement, governance, and programme implementation.</span> Since its inception in 2022, Yiaga Africa has recruited, trained and deployed 67 young people across 56 federal constituencies. Through the deployment of interns to constituency offices for a fixed period, the programme creates a structured pathway for youth to actively participate in governance while building relevant professional skills. Interns work closely with legislators and their aides, supporting administrative functions, conducting legislative research, and engaging in community outreach. This direct exposure not only strengthens their understanding of public service but also expands their networks and career opportunities within the governance and policy space.</p>
<p>By embedding young people within constituency offices, the programme enhances the efficiency and responsiveness of elected representatives to the needs of their constituents. It supports stronger legislator–constituent relationships by improving communication channels, facilitating stakeholder engagement, and contributing to more effective service delivery at the grassroots level. The initiative aligns with broader youth empowerment priorities by equipping participants with the knowledge, skills, and experience required to contribute meaningfully to governance and policy-making processes.</p>
<p>The programme ultimately serves a dual purpose: strengthening the operational capacity of constituency offices while nurturing a new generation of civic-minded leaders. By providing administrative and research support, interns help offices better manage constituency issues, organise engagements such as town halls, and maintain effective communication with citizens, thereby reinforcing trust and accountability between representatives and the communities they serve.</p>`,
    image: initiative2,
    color: "secondary",
    pillar: "Governance",
    subCategory: "Leadership & Citizen Agency"
  },
  {
    id: 8,
    slug: "peoples-assembly",
    title: "People's Assembly",
    category: "Leadership & Citizen Agency",
    description: "Creating spaces for inclusive dialogue where citizens directly shape public policy beyond just voting.",
    full_description: "The People's Assembly is a citizen engagement platform that creates space for inclusive dialogue between citizens and stakeholders, ensuring diverse voices are heard and reflected in decision-making at the grassroots level.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Through our People’s Assembly model, Yiaga Africa promotes deliberative democracy by creating spaces where citizens move beyond voting to directly shaping public policy and governance decisions.</span> In a context where citizens often feel disconnected from political institutions, deliberative democracy offers a powerful alternative that values inclusive dialogue, collective reasoning, and citizen agency.</p>
<p>The People’s Assembly is a citizen engagement platform that creates space for dialogue between citizens and stakeholders. It encourages inclusive participation, ensuring that diverse voices are heard and reflected in governance and decision-making processes. These assemblies strengthen democratic legitimacy by making the government more responsive to grassroots voices. Yiaga Africa uses deliberative spaces to promote civic learning, critical thinking, and political education.</p>`,
    image: focusCommunity,
    color: "secondary",
    pillar: "Governance",
    subCategory: "Leadership & Citizen Agency"
  },
  {
    id: 9,
    slug: "watching-the-vote",
    title: "Watching The Vote (WTV)",
    category: "Electoral Integrity & Monitoring",
    description: "A citizen-led movement using technology and data to monitor elections (National, State, and Local) and verify results.",
    full_description: "Watching The Vote (WTV) is Nigeria's largest citizen-led election observation initiative. It deploys technology and trained observers to monitor elections at every level and independently verify results through the Parallel Vote Tabulation (PVT) methodology.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Our Watching The Vote (WTV) programme is a citizens’ movement that leverages technology, data and statistical principles for promoting electoral integrity.</span> WTV is a comprehensive election and civic engagement initiative designed to strengthen electoral transparency, citizen participation, and democratic accountability across Nigeria and Africa.</p>
<p><strong>Among others, we monitor:</strong></p>
<ul class="space-y-4 list-disc pl-5">
<li><strong>Election Observation:</strong> We deploy trained observers to monitor elections across Nigeria, including national, state, and local government elections. Our observation focuses on: Opening of polls, Voting process, Results collation. Over the years, we have conducted multiple election observations nationwide, ensuring credible and transparent electoral processes. We use election observation to strengthen electoral integrity, promote transparency, accountability, and credible elections. Yiaga Africa has also deployed international election observation missions to South Africa, Ghana, Sierra Leone, Liberia and the United States.</li>
<li><strong>Process And Result Verification For Transparency (PVT / PRVT):</strong> We implement the Process and Result Verification for Transparency (PRVT) to independently verify election results and the conduct of election day processes. We have conducted 18 PVT exercises across Nigeria in presidential elections and governorship election. The PRVT provides data-driven verification of official results and strengthens public trust in electoral outcomes through the use of technology.</li>
</ul>
<p class="mt-4">Under WTV, Yiaga Africa conducts sample-based observation of pre-election, during and post-election activities. We monitor post-election court proceedings, including: Election tribunals, Appeal Court processes, and Supreme Court rulings to ensure continued accountability beyond election day.</p>`,
    stats: [
      { label: "Observers Deployed", value: "10,000+" },
      { label: "Polling Units", value: "25,000+" },
      { label: "PVT Exercises", value: "18" },
      { label: "States Covered", value: "36" },
    ],
    image: focusElections,
    color: "primary",
    pillar: "Democracy",
    subCategory: "Electoral Integrity & Monitoring"
  },
  {
    id: 10,
    slug: "electoral-reform-policy-advocacy",
    title: "Electoral Reform & Policy Advocacy",
    category: "Legislative & Policy Reform",
    description: "Strategic contributions to laws like the Electoral Act 2022.",
    full_description: "Yiaga Africa has been a key contributor to major electoral reform efforts in Nigeria, including the passage of the Electoral Act 2022, through sustained advocacy, research publications, and stakeholder convening.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">We are committed to strengthening Nigeria’s democratic and electoral systems through sustained advocacy, research, and stakeholder engagement.</span> We engage in evidence-based advocacy for reforms to Nigeria’s electoral legal framework, including the Electoral Act, and collaborate with key institutions such as the Independent National Electoral Commission (INEC), the National Assembly, state governments, and civil society organisations in promoting credible elections, deepening electoral integrity, and advancing reforms that make the electoral process more transparent, inclusive, and efficient. Through policy analysis and strategic engagement, we provide actionable recommendations aimed at improving voter registration systems, election administration, political party regulation, and result management processes.</p>
<p>Our initiatives also include the development of reform-focused policy proposals such as the “#ANewINEC” framework, which advocates for a more independent, efficient, and technologically driven electoral management body. We further support civic-driven reforms such as the Early Voting and Inmate Voting Bill Advocacy, aimed at ensuring that essential workers on election day are not disenfranchised and that eligible incarcerated persons retain their voting rights, thereby strengthening inclusion, fairness, and democratic legitimacy.</p>
<p>In addition, we convene and contribute to multi-stakeholder platforms such as the Citizens’ Memorandum for the Reform of the Electoral Legal Framework, which aggregates citizen voices, expert insights, and institutional recommendations into coherent reform proposals for policymakers. Through these interventions, we aim to strengthen electoral governance, deepen public trust in democratic processes, and contribute to a more accountable and participatory political system in Nigeria.</p>`,
    image: focusGovernance,
    color: "primary",
    pillar: "Governance",
    subCategory: "Legislative & Policy Reform"
  },
  {
    id: 11,
    slug: "voter-assembly",
    title: "Voter Education & Outreach",
    category: "Voter Mobilization & Education",
    description: "A platform for citizen-led deliberation on electoral processes and democratic governance.",
    full_description: "The Voter Assembly brings together citizens from diverse backgrounds to deliberate on key electoral issues, fostering a deeper understanding of democratic processes and building a collective voice for electoral integrity.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">We carry out extensive voter education campaigns to inform and empower citizens.</span></p>
<p>Our approach includes: Community outreach and engagement, Awareness campaigns in multiple states, Grassroots mobilisation before elections and Civic Education Programmes through radio jingles in local languages (e.g., Yoruba, Pidgin, English), television broadcasts, voter education videos and creative messaging tailored to different regions across various media channels and platforms. The aim is to simplify electoral processes for citizens, especially young voters, break down how elections work, and promote informed participation. We use media to amplify voter education and civic awareness.</p>
<p><strong>Some initiatives under voter education and outreach include:</strong></p>
<ul class="space-y-4 list-disc pl-5">
<li><strong>Election 101 in 5:</strong> an illustrative expose that provides citizens with all the useful information on voting in Nigeria’s electoral process in five minutes or less. The series, which is made up of 80 videos, simplifies Nigeria’s electoral process and enlightens citizens on the electoral framework that guides the conduct of elections in Nigeria. It has been broadcast on a major television channel in Nigeria, and is available on Yiaga Africa’s social media and YouTube channels.<br/>
<a href="https://youtube.com/playlist?list=PLTNhOaAj12cjCAYYjJijnQPeai-nHJIlw&si=HsIOO76w05YBWWXi" target="_blank" class="text-primary hover:underline">Watch episodes of Election 101 in 5 Here</a></li>
<li><strong>My Election Buddy:</strong> a comprehensive voter education compendium for the 2023 General Elections in Nigeria. It covers all topics regarding the election, including the voting process, the offices being voted for, and how citizens can also be a part of the election monitoring process. It incorporates a digital tool in the form of a WhatsApp chatbot to provide citizens with all relevant information regarding elections in Nigeria.</li>
<li><strong>#SixtyPercentOfUs:</strong> In a bid to increase citizen turnout in Nigeria’s election, Yiaga Africa launched a project tagged #SixtyPercentOfUs, aimed at mobilising at least 60% of eligible young voters to register, collect their Permanent Voters Cards (PVCs) and vote in the 2023 elections using traditional and non-traditional tools of political mobilisation. The campaign successfully targeted and mobilised over 20 thousand young people to register and collect their PVCs ahead of the 2023 elections.</li>
</ul>`,
    image: initiative1,
    color: "secondary",
    pillar: "Democracy",
    subCategory: "Voter Mobilization & Education"
  },
  {
    id: 12,
    slug: "community-organising-institute",
    title: "Community Organising Institute (COI)",
    category: "Leadership & Citizen Agency",
    description: "A pan-African platform training leaders under 30 in ethical and accountable governance.",
    full_description: "The Community Organising Institute (COI) is Yiaga Africa's flagship leadership development platform, building a new generation of responsible and accountable leaders under the age of 30 across West Africa.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Yiaga Africa has identified poor leadership as one of the major challenges facing the African continent.</span> In response, the organisation is working to close this gap through its Community Organising Institute (COI), a strategic platform designed to build a new generation of responsible and accountable leaders. The COI programme brings together young people under the age of 30 from across Africa. Past cohorts have engaged over 500 participants drawn from Nigeria, The Gambia, Liberia, Cameroon, and Ghana.</p>
<p>These participants are equipped with the knowledge, tools, and networks needed to drive social and political change within their communities. Yiaga Africa believes that empowering young leaders is key to transforming governance across the continent. Through the COI initiative, participants are trained to become agents of change, capable of inspiring civic participation, strengthening democratic processes, and promoting accountability.</p>
<p><strong>Key Focus Areas for COI include:</strong></p>
<ul class="space-y-2 list-disc pl-5">
<li><strong>Youth Political Participation:</strong> Encouraging young people to actively engage in governance and electoral processes.</li>
<li><strong>Civic Education:</strong> Improving public understanding of democratic rights and responsibilities.</li>
<li><strong>Leadership Development:</strong> Building ethical, responsive, and community-driven leaders.</li>
<li><strong>Combating Voter Apathy:</strong> Supporting initiatives like “2023: Yiaga Africa, youths strategise to stop voter apathy” to increase voter turnout and participation.</li>
<li><strong>Strengthening Constituency Relations:</strong> Promoting stronger connections between elected representatives and citizens.</li>
</ul>
<p class="mt-4">The COI initiative envisions a new generation of youth-led movements across Africa, increased civic engagement and reduced voter apathy, stronger, more accountable leadership systems and sustainable democratic development across communities.</p>`,
    image: youth1,
    color: "secondary",
    pillar: "Governance",
    subCategory: "Leadership & Citizen Agency"
  },
  {
    id: 13,
    slug: "womens-leadership-representation",
    title: "Women's Leadership and Representation Initiative",
    category: "Youth & Women’s Political Inclusion",
    description: "Advancing gender equality in political leadership and representation across all levels of government.",
    full_description: "This initiative focuses on breaking barriers to women's political participation, providing mentorship, training, and advocacy to ensure that women are fairly represented in decision-making processes and leadership positions.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Under the Women Leadership and Representation Initiative, Yiaga Africa implemented the Young Women Political Organising Lab, organised to fulfil the goal of encouraging Women’s Participation in the political processes, focusing on young women to engender increased leadership, political participation, and representation for women in Africa.</span></p>
<p>The Young Women’s Political Organising Labs, so far implemented in Lagos and Accra, were designed as a training programme dedicated to empowering and strengthening the capacity of young female politicians, women-led civil society organisations, as well as female student union leaders. Beyond capacity strengthening, the initiative has contributed to tangible outcomes, including the emergence of young women who have successfully contested and won local elections in Lagos state, Nigeria. It aims to mobilise and support young women to pursue political leadership and helps young women develop leadership skills and self-confidence.</p>`,
    image: focusWomen,
    color: "accent",
    pillar: "Democracy",
    subCategory: "Youth & Women’s Political Inclusion"
  },
  {
    id: 14,
    slug: "readytorun-movement",
    title: "ReadyToRun",
    category: "Youth & Women’s Political Inclusion",
    description: "A support system providing tools and networks for young candidates contesting elections.",
    full_description: "The ReadyToRun Movement equips young aspiring politicians with the skills, resources, and peer networks they need to successfully contest elections at all levels of government.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">The Ready To Run initiative, born out of the Not Too Young To Run movement (NTYTR), is designed to inspire, prepare, and support young Nigerians with the competence, capacity, and character to run for elective office.</span> The initiative seeks to increase youth candidacy and representation through contributory support, build a community of practice for the support of youth candidates and establish a network of young political leaders across Nigeria.</p>
<p>Ready to Run responds to the challenge of preparedness while navigating the expensive tide of Nigeria’s political space. While the removal of age barriers opened the political space, a critical gap identified during the NTYTR advocacy shows that many young aspirants still face structural, financial, and capacity challenges in contesting and winning elections. Ready To Run locates, inspires, supports, and connects young people, particularly those contesting for the House of Representatives and State Houses of Assembly seats, with the tools and networks required for electoral success.</p>
<p><strong>Since 2018, the #ReadyToRun campaign has built a growing pipeline of youth political participation across Nigeria:</strong></p>
<ul class="space-y-2 list-disc pl-5">
<li>1,394 young people engaged across the 2019 and 2023 general elections</li>
<li>334 aspirants emerged from the platform</li>
<li>325 candidates successfully secured party tickets</li>
<li>45 young leaders elected into the House of Representatives and the State Houses of Assembly</li>
</ul>
<p class="mt-4">These outcomes demonstrate the initiative’s role in strengthening youth political leadership and representation within Nigeria’s democratic institutions.</p>`,
    image: initiative2,
    color: "accent",
    pillar: "Democracy",
    subCategory: "Youth & Women’s Political Inclusion"
  },
  {
    id: 15,
    slug: "digital-democracy-initiative",
    title: "Digital Democracy",
    category: "Digital Governance & Accountability",
    description: "Harnessing technology to enhance institutional accountability.",
    full_description: "The Digital Democracy Initiative explores and deploys technology solutions that increase transparency in governance, enable citizen participation, and strengthen institutional accountability across Nigeria.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">Innovation and emerging Technologies offer new opportunities to enhance public engagement and participation in democratic institutions and processes.</span> By leveraging technology, e-democracy also empowers civil society to actively engage citizens and government institutions, which improves policy-making procedures. Yiaga Africa uses digital democracy to enhance democratic processes and citizen participation. We harness technology to strengthen citizen engagement, civic education, and institutional accountability. Our digital tools enhance participation, simplify civic knowledge, and support data-driven governance.</p>
<p><strong>Some of the solutions we have deployed include:</strong></p>
<ul class="space-y-4 list-disc pl-5">
<li><strong>Election Result Analysis Dashboard (ERAD):</strong> ERAD is an innovative platform founded by Yiaga Africa in 2022 to support Nigeria’s election management body by providing the public with access to analysed election results from the polling units in relative real-time. ERAD is the only single alternative source that provides accurate election results as uploaded on the INEC Result Viewing Portal while serving as an independent audit and integrity test assessment tool for INEC’s results management.</li>
<li><strong>CVR (Continuous Voter Registration) Ward and Polling Unit Locator:</strong> This tool helps citizens easily find where they can register to vote or where their polling unit is located. Instead of struggling to locate registration centres, users can simply search online, making voter registration more accessible and encouraging more people—especially young voters—to participate in elections.</li>
<li><strong>Africa Elections Tracker:</strong> This is a platform that monitors and provides information about elections across different African countries. It keeps users updated on election timelines, key events, and developments. The tracker promotes awareness and helps citizens, researchers, and civil society stay informed about democratic processes across the continent.</li>
<li><strong>Digital Democracy Exhibitions:</strong> These are interactive events or showcases that use technology (like visuals, data displays, and digital tools) to educate citizens about democracy and governance. They make civic learning more engaging and relatable, especially for young people, and encourage active participation in democratic processes.</li>
<li><strong>Dashboard on Local Government Elections:</strong> This dashboard provides data and insights specifically on local government elections. It helps citizens understand what is happening at the grassroots level by showing election results, trends, and participation rates. This strengthens accountability and ensures that local governance is not ignored.</li>
</ul>
<p class="mt-4">Digital Democracy involves leveraging digital tools to increase transparency, accountability, and inclusivity in governance, as well as fostering active citizenship through online platforms and digital engagement.</p>`,
    image: initiative1,
    color: "accent",
    pillar: "Governance",
    subCategory: "Digital Governance & Accountability"
  },
  {
    id: 16,
    slug: "not-too-young-to-run",
    title: "Not Too Young To Run",
    category: "Youth & Women’s Political Inclusion",
    description: "A global movement initiated by Yiaga to lower the constitutional age for running for office.",
    full_description: "The Not Too Young To Run is a global movement initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution, enabling young people to run for public office and inspiring youth political inclusion across Africa.",
    content: `<p><span class="text-2xl lg:text-3xl font-display font-bold text-foreground block mb-4 leading-tight">The Not Too Young To Run is a global movement promoting youth inclusion in politics, transformative leadership and democratic rights.</span> The campaign was initiated by Yiaga Africa to remove age restrictions from the Nigerian constitution to enable young people to run for public office. In 2018, Nigeria passed legislation to reduce the age for running for the President, National and state parliaments. The Not Too Young To Run bill fulfilled all conditions prescribed in the Constitution for its passage. The Senate and House of Representatives passed the bill with an overwhelming majority, while 33 out of 36 state assemblies adopted the age reduction amendment.</p>
<p>May 31, 2018, will be remembered in history as the day democracy won and Nigeria witnessed a true “youthquake.” President Muhammadu Buhari signed the Not Too Young To Run bill into law, reducing the age for running for the office of the President from 40 to 35 years, House of Representatives from 30 to 25, and the State House of Assembly from 30 to 25. He acknowledged Not Too Young To Run as a “landmark piece of legislation conceived, championed and accomplished by young Nigerians.” The hallmark of the campaign was the adoption of the campaign by the United Nations, the African Union and the Economic Community of West African States. Not Too Young To Run has been launched in several countries in Africa, including Kenya, Gambia, Liberia, Zimbabwe, Tanzania, Cameroon and Sierra Leone. Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa.</p>
<p>The Not Too Young To Run Movement has inspired several young people to run for office in Nigeria and Africa. For instance, Gambia has 4 parliamentarians in the National Assembly who were part of the Not Too Young To Run movement in The Gambia. In Nigeria, there has been an increase in the number of young people contesting and winning their elections. Youth candidacy in Nigeria rose from 21% in the 2015 General Elections to 34.2% in the 2019 General Elections. Similarly, youth representation in the 2023 general election, National Assembly, and particularly the House of Representatives, increased from 3% in 2019 to 3.92%, while in State Houses of Assembly, it rose from 8.9% in 2019 to 9.2%. Two (2) seats in the House of Representatives were won by young people below 30 years, making them the first time direct beneficiaries since the passage of the age reduction act, also known as the Not Too Young To Run Act.</p>
<p>Other countries are making efforts to launch the campaign as a strategy of mobilising youth to reclaim Africa. Yiaga Africa continues to support young legislators in the legislature to deliver on their legislative responsibilities for qualitative leadership and representation, showcase them as models of public leadership and improve public perception of youth public leadership.</p>`,
    stats: [
      { label: "Youth Candidacy 2019", value: "34.2%" },
      { label: "African Countries", value: "8+" },
      { label: "States Adopted", value: "33/36" }
    ],
    image: focusWomen,
    color: "accent",
    pillar: "Democracy",
    subCategory: "Youth & Women’s Political Inclusion"
  },
];

export const getInitiative = (slug: string): Initiative | undefined => {
  return initiatives.find(initiative => initiative.slug === slug);
};

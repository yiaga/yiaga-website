import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Vote, Settings, BarChart3, Users, MessageSquare, Laptop, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusElections from "@/assets/focus-elections.jpg";
import focusGovernance from "@/assets/focus-governance.jpg";
import discuss from "@/assets/discuss.jpg";
import focusWomen from "@/assets/focus-women.jpg";
import focusCommunity from "@/assets/focus-community.jpg";
import focusTechnology from "@/assets/focus-technology.jpg";
import youth1 from "@/assets/youth-1.jpg";

const Democracy = () => {
  const pillars = [
    {
      id: 1,
      title: "Electoral Integrity and Observation",
      icon: Vote,
      color: "primary",
      image: focusElections,
      content: "We promote credible elections through evidence-based election observation, data-driven verification, and risk monitoring. Through the Watching The Vote (WTV) initiative, Yiaga Africa deploys trained observers to monitor elections across the electoral cycle—from pre-election activities to post-election processes—ensuring transparency and accountability. Our Process and Result Verification for Transparency (PRVT) methodology provides independent verification of election results using statistical principles and technology, strengthening public confidence in electoral outcomes. Complementing this is the Election Manipulation Risk Index (EMRI), a rapid assessment tool that identifies and tracks risks to electoral integrity while proposing mitigation strategies for stakeholders."
    },
    {
      id: 2,
      title: "Electoral Governance and Reform",
      icon: Settings,
      color: "secondary",
      image: focusGovernance,
      content: "Under the Transforming Electoral Governance in Africa (TEGA) initiative, we facilitate policy dialogue, research, and cross-country learning to reimagine electoral systems. Through study missions, participatory research, and advocacy, we generate insights that inform reforms and strengthen electoral governance across the continent. Our work has contributed to practical policy outcomes, including support for early voting reforms, and extends to engagements with electoral institutions, parliaments, and regional actors to advance transparent, inclusive, and efficient electoral processes."
    },
    {
      id: 3,
      title: "Research, Data, and Policy Analysis",
      icon: BarChart3,
      color: "accent",
      image: discuss,
      content: "We produce rigorous, data-driven research and analytical tools that assess the health of democracy and provide pathways for reform. Through initiatives such as the National Voter Intention Survey (NVIS), post-election audits, electoral integrity indices, and thematic policy briefs, Yiaga Africa generates credible evidence on voter behaviour, institutional performance, and systemic risks. Our research addresses key challenges such as voter apathy, political violence, judicial inconsistency, and emerging threats like digital disinformation. By translating findings into actionable recommendations, we support policymakers, civil society, and development partners to strengthen democratic systems and rebuild public trust."
    },
    {
      id: 4,
      title: "Inclusion and Representation",
      icon: Users,
      color: "primary",
      image: focusWomen,
      content: "We promote a more inclusive democracy by supporting the participation of underrepresented groups, particularly women and marginalised populations. Through targeted interventions such as the Young Women Political Organising Lab and advocacy for reforms like early voting and inmate voting, we work to remove structural barriers to participation and expand access to the electoral process. We also invest in young people as drivers of democratic transformation, advancing youth political inclusion through movements such as Not Too Young To Run and Ready To Run, which have expanded opportunities for young people to contest for and win elective office. We work to demystify political processes and reduce barriers to entry, enabling more young people to contest for office, win and contribute to decision-making. Since 2018, we have supported and built the capacity of 1394 young political aspirants in Nigeria. Our work ensures that democratic systems reflect the diversity of society and uphold the principle of equal representation."
    },
    {
      id: 5,
      title: "Deliberative Democracy and Citizen Voice",
      icon: MessageSquare,
      color: "secondary",
      image: focusCommunity,
      content: "We create platforms that enable citizens to move beyond voting to actively shaping governance and public policy. Through initiatives such as the People’s Assembly, we convene inclusive dialogue spaces where citizens, policymakers, and stakeholders engage in collective problem-solving. These platforms strengthen democratic legitimacy by amplifying citizen voices, promoting civic learning, and fostering more responsive governance."
    },
    {
      id: 6,
      title: "Digital Democracy and Innovation",
      icon: Laptop,
      color: "accent",
      image: focusTechnology,
      content: "We leverage technology to enhance civic participation, transparency, and accountability. Our digital tools—including election result dashboards, voter registration locators, and election trackers—simplify access to information and enable citizens to engage more effectively in democratic processes. Through digital platforms and interactive civic learning initiatives, we promote data-driven governance and expand opportunities for participation, particularly among young and digitally connected populations."
    },
    {
      id: 7,
      title: "Art, Media, and Public Engagement",
      icon: Palette,
      color: "primary",
      image: youth1,
      content: "We harness creative expression as a tool for civic education and mobilisation. Through Art for Democracy, we collaborate with artists, storytellers, and creatives to translate complex democratic concepts into accessible and engaging formats. This approach broadens reach, deepens public understanding, and inspires participation by connecting democracy to everyday experiences."
    }
  ];

  return (
    <PageLayout>
      <PageHero
        badge="Program Pillar 1"
        title="Democracy"
        titleHighlight="Programme"
        description="Strengthening electoral integrity, deepening citizen participation, and advancing inclusive, accountable democratic systems across Africa."
        backgroundImage={focusElections}
      />

      {/* Overview Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">Overview</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 leading-tight">
              Deepening Participation, <span className="text-gradient">Securing Integrity</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Our Democracy Programme is designed to strengthen electoral integrity, deepen citizen participation, and advance inclusive, accountable democratic systems across Africa. We deploy data, technology, civic engagement, research, and advocacy to improve how elections are conducted, how citizens participate, and how democratic institutions respond to public trust.
              </p>
              <p>
                Through this work, we support credible elections, expand civic space, and promote a democracy that is participatory, transparent, and responsive to citizens’ needs. The programme is structured across these pillars:
              </p>
            </div>
          </div>

          <div className="space-y-24 lg:space-y-32">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.id} 
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    pillar.color === 'primary' ? 'bg-primary/10 text-primary' :
                    pillar.color === 'secondary' ? 'bg-secondary/10 text-secondary' : 'bg-accent/10 text-accent'
                  }`}>
                    <pillar.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {pillar.content}
                  </p>
                </div>

                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className={`absolute -inset-4 rounded-[2rem] opacity-20 group-hover:opacity-30 transition-opacity blur-2xl ${
                      pillar.color === 'primary' ? 'bg-primary' :
                      pillar.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
                    }`}></div>
                    <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                      <img 
                        src={pillar.image} 
                        alt={pillar.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Approach Section */}
      <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
              A <span className="text-gradient">Holistic Approach</span> to Democracy
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              Across all these pillars, Yiaga Africa advances a holistic approach to democracy—one that integrates credible elections, informed citizens, inclusive participation, and accountable institutions. By combining research, innovation, advocacy, and civic engagement, the Democracy Programme contributes to building resilient democratic systems that are trusted by citizens and responsive to their aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Support Our Mission</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Your engagement and support help us continue our work in strengthening democracy across the continent.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/get-involved"><Button variant="default" size="lg">Get Involved</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Contact Us</Button></Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Democracy;

import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Landmark, Users, GraduationCap, Scale, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusGovernance from "@/assets/focus-governance.jpg";
import focusCommunity from "@/assets/focus-community.jpg";
import youth from "@/assets/youth.jpg";
import youth2 from "@/assets/youth-2.jpg";
import focusCivic from "@/assets/focus-civic.jpg";

const Governance = () => {
  const pillars = [
    {
      id: 1,
      title: "Local Governance",
      icon: Landmark,
      color: "primary",
      image: focusCommunity,
      content: "We recognise that the local government is the closest tier of government to citizens, and we support the quality of service delivery, deepen citizen engagement, and enhance transparency in decision-making processes at the community level. promoting openness and accountability in the management of public resources. We facilitate platforms for citizen-government engagement, including town halls, community dialogues, and participatory forums that enable citizens to articulate their needs, monitor government performance, and influence local development priorities and strengthen the capacity of local government institutions, elected officials, and administrative structures to function effectively and responsively."
    },
    {
      id: 2,
      title: "Leadership",
      icon: Users,
      color: "secondary",
      image: youth,
      content: "To translate the numerical strength of the youth demographic into meaningful representation, we empower young people as active agents in democratic governance and public leadership. Through targeted interventions, such as the Gen Z Democratic Innovation Lab, Community Organising Institute (COI), and constituency-based internship programmes, Yiaga Africa builds the capacity of young leaders to engage in civic action, policy processes, and electoral participation. These initiatives combine civic education, leadership development, and hands-on governance experience to reduce barriers to participation and nurture a new generation of civic-minded leaders."
    },
    {
      id: 3,
      title: "Youth Political Engagement",
      icon: GraduationCap,
      color: "accent",
      image: youth2,
      content: "Yiaga Africa builds the capacity of young people to engage in politics, governance, and policy processes. This includes leadership development programmes, political education, mentorship, and skills-building initiatives that equip young people with the knowledge and tools required to participate effectively as voters, advocates, candidates, and public leaders."
    },
    {
      id: 4,
      title: "Legislative Engagement",
      icon: Scale,
      color: "primary",
      image: focusGovernance,
      content: "We engage with governance institutions, including the National Assembly and State Houses of Assembly, to promote transparency, accountability, and citizen-centred policymaking. This initiative supports collaboration, advocacy, and informed policy development. We deliver a range of tailored engagements designed to strengthen legislative performance and institutional effectiveness. These include capacity development training for legislators and their aides, technical support to committees and individual lawmakers, as well as bill drafting, review, and legislative analysis to improve the quality of laws and oversight functions. We promote citizen engagement by creating platforms for constructive interaction between lawmakers and constituents, including town halls, policy briefings, and feedback mechanisms. By combining technical expertise, advocacy, and civic engagement, this programme contributes to building a more effective, transparent, and people-centred legislative system. Yiaga Africa has engaged not just in Nigeria, but also in the Parliament of Ghana and Sierra Leone."
    },
    {
      id: 5,
      title: "Civic Engagement and Voter Education",
      icon: MessageSquare,
      color: "secondary",
      image: focusCivic,
      content: "We empower citizens with the knowledge and tools required for informed participation in democratic processes. Through nationwide voter education campaigns, community outreach, and multimedia engagement, we simplify electoral processes and promote active citizenship. Our initiatives leverage traditional and digital media—including radio, television, social platforms, and interactive tools—to reach diverse audiences, particularly young voters. Programmes such as targeted civic campaigns, digital voter education platforms, and grassroots mobilisation efforts have expanded voter awareness, increased registration, and strengthened participation across multiple election cycles."
    }
  ];

  return (
    <PageLayout>
      <PageHero
        badge="Program Pillar 2"
        title="Governance"
        titleHighlight="Programme"
        description="Strengthening democratic institutions, enhancing accountability, and promoting inclusive citizen participation across Africa."
        backgroundImage={focusGovernance}
      />

      {/* Overview */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">Overview</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8 leading-tight">
              Strengthening Institutions, <span className="text-gradient">Bridging Gaps</span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Our Governance Program is designed to strengthen democratic institutions, enhance accountability, and promote inclusive citizen participation in governance processes. We leverage research, civic engagement, capacity development, and advocacy to improve how public institutions function and how citizens interact with them.
              </p>
              <p>
                We strive to bridge the gap between citizens and public institutions while advancing transparency, responsiveness and effective leadership across national and subnational levels of government. The program is structured across these pillars:
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

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Partner With Us</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">Join our mission to strengthen democratic governance across Africa. Together, we can build more accountable institutions.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/resources"><Button variant="default" size="lg">Access Our Resources</Button></Link>
            <Link to="/contact"><Button variant="outline" size="lg">Contact Our Team</Button></Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Governance;

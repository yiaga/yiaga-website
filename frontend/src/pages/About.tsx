import { Target, Users, Award, TrendingUp, Heart, Globe, Lightbulb, Shield, Vote, Eye, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import focusCommunity from "@/assets/focus-community.jpg";
import samsonImg from "@/assets/team/Samson.jpg";
import cynthiaImg from "@/assets/team/Cynthia.jpg";
import hussainiImg from "@/assets/team/hussaini.jpg";
import nnamdiImg from "@/assets/team/nnamdi.jpg";
import ezeImg from "@/assets/team/eze.jpg";
import aishaImg from "@/assets/team/aisha.jpg";
import yiagaAtAGlance from "@/assets/pdfs/Yiaga Africa at a Glance 2025 New.pdf";

const stats = [
  { icon: Users, value: "50K+", label: "Trained Citizens" },
  { icon: Target, value: "36", label: "States Covered" },
  { icon: Award, value: "19+", label: "Experience (Years)" },
  { icon: TrendingUp, value: "200+", label: "Projects Completed" },
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparency and accountability guide our operations, setting the standard we expect from leaders."
  },
  {
    icon: Vote,
    title: "Democracy",
    description: "We are committed to advancing democratic principles and practices across the continent."
  },
  {
    icon: Heart,
    title: "Inclusion",
    description: "We champion diversity and ensure that marginalized voices are included in the democratic process."
  },
  {
    icon: Target,
    title: "Accountability",
    description: "We hold ourselves and public institutions responsible for actions, decisions, and outcomes."
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We maintain openness in our operations and advocate for transparent governance."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest quality in our research, advocacy, and programmatic interventions."
  },
  {
    icon: Handshake,
    title: "Teamwork",
    description: "We believe in the power of collaboration and work closely with stakeholders to achieve our goals."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We leverage technology and creative approaches to solve complex governance challenges."
  },
];

const team = [
  {
    name: "Dr. Hussaini Abdu",
    role: "Board Chairman",
    image: hussainiImg
  },
  {
    name: "Dr. Aisha Abdullahi",
    role: "Member",
    image: aishaImg
  },
  {
    name: "Ezenwa Nwagwu",
    role: "Member",
    image: ezeImg
  },
  {
    name: "Prof. Nnamdi Aduba",
    role: "Member",
    image: nnamdiImg
  },
  {
    name: "Cynthia Mbamalu",
    role: "Member",
    image: cynthiaImg
  },
  {
    name: "Samson Itodo",
    role: "Board Secretary",
    image: samsonImg
  },
];

const About = () => {
  return (
    <PageLayout>
      <PageHero
        badge="About Yiaga Africa"
        title="Advancing Democracy &"
        titleHighlight="Good Governance"
        description="We are a non-profit civic hub dedicated to the promotion of democratic governance, human rights, and civic participation across Africa."
        backgroundImage={focusCommunity}
      />

      {/* Our Story Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                Building a Stronger
                <span className="text-gradient"> Africa Together</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded with a vision to strengthen democracy across Africa, Yiaga Africa has grown into one of the continent's leading civic organizations. Our journey began with a simple belief: that citizens have the power to shape their own governance.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Over the years, we have trained thousands of election observers, advocated for policy reforms, and empowered young people to participate in politics. Our "Not Too Young To Run" campaign led to a constitutional amendment that reduced the age for running for political office in Nigeria.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we continue to innovate and expand our reach, using technology and grassroots mobilization to ensure that governments remain transparent, accountable, and responsive to citizens.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="group relative bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <stat.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Unique Value Proposition Section */}
      <section className="py-20 lg:py-28 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Why We Stand Out
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-8 leading-tight">
              Our Unique <span className="text-gradient">Value Proposition</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-12 leading-relaxed font-medium">
              Yiaga Africa bridges the gap between citizens and institutions, creating an impact that is data-driven, youth-led, and community-rooted. We stand out in the following ways:
            </p>

            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold text-lg">01</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Citizen-led innovation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From tech solutions like ChatVE to arts-based campaigns like #Art4Democracy, we fuse creativity with civic education.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold text-lg">02</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Data-driven credibility</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Our Process and Result Verification for Transparency (PRVT) methodology has positioned us as a trusted source of real-time electoral data.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold text-lg">03</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Youth-rooted leadership</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Born from student activism, our DNA is steeped in youth agency, grassroots mobilisation, and policy reform.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold text-lg">04</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Pan-African influence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    With proven models exported across Africa, we lead continent-wide electoral missions, digital democracy research, and regional civic coalitions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold text-lg">05</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Sustained engagement</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We don’t show up just on election day. Our work ensures democratic participation year-round, in communities, online, and in Parliament.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Yiaga at a Glance Section */}
      <section className="py-16 bg-accent/5 border-y border-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-card rounded-3xl p-8 md:p-12 border border-accent/20 shadow-xl shadow-accent/5 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">Keep Yiaga at a Glance within Reach</h2>
              <p className="text-muted-foreground text-lg">Download our comprehensive overview to learn more about our impact and mission.</p>
            </div>
            <div className="relative z-10 shrink-0">
              <a href={yiagaAtAGlance} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/25 px-8">
                  Download the PDF Here
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Our Vision & Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Our Path for
              <span className="text-gradient"> Africa</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8 text-left">
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold mb-4 text-primary font-display">Our Vision</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  "People driven, democratic and developed Africa"
                </p>
              </div>
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <h3 className="text-2xl font-bold mb-4 text-secondary font-display">Our Mission</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  "To build and support sustainable democracy and development anchored on the principles of inclusion, accountability, and justice through research, advocacy, and capacity development."
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              To achieve this, our core values shape every initiative we undertake and guide how we engage with communities.
            </p>
          </div>

          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Our Foundations
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Core
              <span className="text-gradient"> Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Our Governance
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Board of
              <span className="text-gradient"> Directors</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Yiaga Africa is governed by a diverse Board of Directors comprising experts in governance, law, and social change, providing strategic oversight and guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {team.map((member, index) => {
              const imageUrl = member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=500`;
              return (
                <div
                  key={member.name}
                  className="group bg-card rounded-2xl p-4 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center flex flex-col h-full"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl mb-4 shadow-sm group-hover:shadow-md transition-all duration-300">
                    <img src={imageUrl} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="mt-auto">
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm">
                      {member.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/team">
              <Button variant="outline" size="lg">
                View Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who are actively participating in shaping the future of governance in Africa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/initiatives">
              <Button variant="hero" size="lg">
                Explore Our Work
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;

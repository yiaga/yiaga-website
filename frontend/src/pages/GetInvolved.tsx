import { ArrowRight, Users, Briefcase, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";

import heroTeam from "@/assets/hero-careers.jpg";

const waysToInvolve = [
  {
    icon: Users,
    title: "Volunteer with Us",
    description: "Join our active community of civic leaders. Volunteer for events across Media, Governance, and Democracy categories.",
    linkText: "Become a Volunteer",
    linkTo: "/volunteer",
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Award,
    title: "Internship Opportunities",
    description: "Kickstart your career in civic engagement and governance. Gain hands-on experience by joining our internship program.",
    linkText: "Apply for Internship",
    linkTo: "/internship",
    bgColor: "bg-secondary/10",
    iconColor: "text-secondary",
  },
];

const GetInvolved = () => {
  return (
    <PageLayout>
      <PageHero
        badge="Get Involved"
        title="Be Part of the"
        titleHighlight="Change"
        description="Whether you want to volunteer, intern, or build a lasting career with us, your contribution helps shape the future of democracy in Africa."
        backgroundImage={heroTeam}
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              How You Can
              <span className="text-gradient"> Contribute</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We offer multiple pathways for you to engage with our programs. Choose the opportunity that aligns with your passion and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-center">
            {waysToInvolve.map((item, index) => (
              <div
                key={item.title}
                className="group bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl ${item.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <item.icon className={`w-8 h-8 ${item.iconColor} transition-colors`} />
                </div>
                <h3 className="text-2xl font-display font-bold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {item.description}
                </p>
                <Link to={item.linkTo}>
                  <Button variant="outline" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                    {item.linkText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Call to Action or Information */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Not sure which path is right for you? Reach out to our team and we'll help you find the best way to get involved.
          </p>
          <Link to="/contact">
            <Button variant="default" size="lg">
              Contact Us Today
            </Button>
          </Link>
        </div>
      </section>

    </PageLayout>
  );
};

export default GetInvolved;

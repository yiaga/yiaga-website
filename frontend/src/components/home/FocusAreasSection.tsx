import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

import focusElections from "@/assets/focus-elections.jpg";
import focusGovernance from "@/assets/focus-governance.jpg";
import focusCivic from "@/assets/focus-civic.jpg";
import focusWomen from "@/assets/focus-women.jpg";
import focusTechnology from "@/assets/focus-technology.jpg";
import focusCommunity from "@/assets/focus-community.jpg";

import { Link } from "react-router-dom";

const focusAreas = [
  {
    title: "Democracy",
    description: "Strengthening democratic institutions, promoting electoral integrity, and empowering citizens to participate actively in the democratic process.",
    color: "primary",
    image: focusElections,
    link: "/democracy",
  },
  {
    title: "Governance",
    description: "Promoting accountable, transparent, and responsive governance at all levels. We work to strengthen legislative oversight and public service delivery.",
    color: "secondary",
    image: focusGovernance,
    link: "/governance",
  },
];

const FocusAreasSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="focus-areas" ref={ref} className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
            Our Focus Areas
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            Building a Stronger
            <span className="text-gradient"> Democracy</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We focus on key areas that strengthen democratic institutions and empower citizens to participate in governance.
          </p>
        </div>

        {/* Focus Areas Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {focusAreas.map((area, index) => (
            <Link
              key={area.title}
              to={area.link}
              className={cn(
                "group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500 w-full md:w-[calc(50%-1rem)] lg:max-w-md",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={area.image}
                  alt={area.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className={`absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-50 ${area.color === 'primary' ? 'bg-primary' :
                    area.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
                  }`} />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${area.color === 'primary' ? 'bg-primary text-primary-foreground' :
                      area.color === 'secondary' ? 'bg-secondary text-secondary-foreground' :
                        'bg-accent text-accent-foreground'
                    }`}>
                    Focus Area
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                  {area.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                  {area.description}
                </p>

                {/* Learn More Link */}
                <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <span className="text-lg">→</span>
                </div>
              </div>

              {/* Decorative element */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-300 opacity-0 group-hover:opacity-100 ${area.color === 'primary' ? 'bg-primary' :
                  area.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
                }`} />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/programmes">
            <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold">
              View All Programmes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FocusAreasSection;

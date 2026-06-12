import { Target, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const stats = [
  { icon: Users, value: "50K+", label: "Trained Citizens" },
  { icon: Target, value: "36", label: "States Covered" },
  { icon: Award, value: "19+", label: "Years Experience" },
  { icon: TrendingUp, value: "200+", label: "Projects Completed" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              About Yiaga Africa
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Advancing Democracy & 
              <span className="text-gradient"> Good Governance</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Yiaga Africa is a non-profit civic hub dedicated to the promotion of democratic governance, human rights, and civic participation across Africa. We work to ensure that governments are transparent, accountable, and responsive to citizens.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Through our initiatives in election observation, civic education, and policy advocacy, we empower citizens to actively participate in the democratic process and hold their leaders accountable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button variant="default" size="lg">
                  Our Story
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Meet the Team
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Grid */}
          <div className={cn(
            "grid grid-cols-2 gap-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn(
                  "group relative bg-card rounded-2xl p-6 shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
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
                {/* Accent corner */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-secondary/20 transform rotate-45 translate-x-4 -translate-y-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

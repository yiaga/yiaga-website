import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const InitiativesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ['initiatives'],
    queryFn: () => api.getInitiatives()
  });

  // Filter for specific initiatives if needed, or just take the first 3
  const displayInitiatives = initiatives.slice(0, 3);
  const featuredInitiative = displayInitiatives[0];

  return (
    <section id="initiatives" ref={ref} className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className={cn(
          "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Our Initiatives
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Impactful Programs
              <span className="text-gradient"> Transforming Africa</span>
            </h2>
          </div>
          <Link to="/initiatives">
            <Button variant="outline" size="lg" className="self-start md:self-auto">
              View All Initiatives
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Initiatives Grid */}
        <div className={cn(
          "transition-all duration-700 delay-200",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {isLoading ? (
            <div className="flex h-[40vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : initiatives.length === 0 ? (
            <div className="text-center py-12 bg-muted/30 rounded-3xl border border-dashed border-border">
              <p className="text-muted-foreground">No initiatives found.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Featured Initiative */}
              {featuredInitiative && (
                <div className="lg:row-span-2 group relative bg-primary rounded-3xl overflow-hidden">
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={featuredInitiative.image}
                      alt={featuredInitiative.title}
                      className="w-full h-full object-cover opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col p-8 lg:p-10">
                    <span className="inline-block px-3 py-1 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-medium mb-6 self-start backdrop-blur-sm">
                      {featuredInitiative.category}
                    </span>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary-foreground mb-4">
                      {featuredInitiative.title}
                    </h3>

                    <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed flex-grow">
                      {featuredInitiative.full_description}
                    </p>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                      {featuredInitiative.stats?.slice(0, 2).map((stat) => (
                        <div key={stat.label} className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="text-2xl font-display font-bold text-primary-foreground mb-1">
                            {stat.value}
                          </div>
                          <div className="text-primary-foreground/70 text-sm">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link to={`/initiatives/${featuredInitiative.slug}`}>
                      <Button variant="red" className="self-start group-hover:translate-x-1 transition-transform">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {/* Other Initiatives */}
              {displayInitiatives.slice(1).map((initiative) => (
                <div
                  key={initiative.id}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={initiative.image}
                      alt={initiative.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                        initiative.category === 'Governance' ? 'bg-primary/90 text-primary-foreground' :
                        initiative.category === 'Democracy' ? 'bg-secondary/90 text-secondary-foreground' :
                        'bg-accent/90 text-accent-foreground'
                      }`}>
                        {initiative.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {initiative.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                      {initiative.full_description}
                    </p>

                    <div className="flex gap-6 mb-6">
                      {initiative.stats?.slice(0, 2).map((stat) => (
                        <div key={stat.label}>
                          <div className="text-xl font-display font-bold text-foreground">
                            {stat.value}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link to={`/initiatives/${initiative.slug}`}>
                      <Button variant="red">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InitiativesSection;

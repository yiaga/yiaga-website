import { ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import focusGovernance from "@/assets/focus-governance.jpg";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const Initiatives = () => {
  const { data: initiatives = [], isLoading } = useQuery({
    queryKey: ['initiatives'],
    queryFn: api.getInitiatives
  });

  return (
    <PageLayout>
      <PageHero
        badge="Our Impact"
        title="Our"
        titleHighlight="Initiatives"
        description="Driving democratic governance and civic engagement through evidence-based research, advocacy, and strategic interventions across Africa."
        backgroundImage={focusGovernance}
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex h-[40vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-24 lg:space-y-32">
              {initiatives.map((initiative, index) => (
                <div
                  key={initiative.id}
                  className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                      initiative.category === 'Governance' ? 'bg-primary/10 text-primary' :
                      initiative.category === 'Democracy' ? 'bg-secondary/10 text-secondary' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {initiative.category || 'Initiative'}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                      {initiative.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                      {initiative.full_description}
                    </p>
                    <Link to={`/initiatives/${initiative.slug}`}>
                      <Button variant="red" size="lg" className="group">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      <div className={`absolute -inset-4 rounded-[2rem] opacity-20 group-hover:opacity-30 transition-opacity blur-2xl ${
                        initiative.color === 'primary' ? 'bg-primary' :
                        initiative.color === 'secondary' ? 'bg-secondary' : 'bg-accent'
                      }`}></div>
                      <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                          src={initiative.image}
                          alt={initiative.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2">15+</div>
              <div className="text-primary-foreground/70 uppercase tracking-widest text-sm font-semibold">Active Programs</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2">36</div>
              <div className="text-primary-foreground/70 uppercase tracking-widest text-sm font-semibold">States Reached</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/70 uppercase tracking-widest text-sm font-semibold">Observers Deployed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-display font-bold mb-2">1M+</div>
              <div className="text-primary-foreground/70 uppercase tracking-widest text-sm font-semibold">Citizens Engaged</div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Initiatives;

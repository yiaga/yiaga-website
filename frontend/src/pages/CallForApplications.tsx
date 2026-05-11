import { MapPin, Clock, Briefcase, ArrowRight, CheckCircle, Loader2, Sparkles, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

import heroCareers from "@/assets/hero-careers.jpg";

const CallForApplications = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs', 'call'],
    queryFn: () => api.getJobs(false, 'call')
  });

  // For now, we use the same jobs endpoint. 
  // In a future update, we might filter by a 'type' field if the backend supports it.

  return (
    <PageLayout>
      <PageHero
        badge="Opportunities"
        title="Active Calls for"
        titleHighlight="Applications"
        description="Explore our current fellowships, grants, and program intakes. Join our mission through these specific engagement opportunities."
        backgroundImage={heroCareers}
      />

      {/* Intro Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Engage with Our
            <span className="text-gradient"> Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Yiaga Africa regularly opens calls for applications for various initiatives, including fellowships, research grants, and youth training programs. Find an opportunity that matches your expertise and passion.
          </p>
        </div>
      </section>

      {/* Current Calls */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Megaphone className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  No Active Calls
                </h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  We don't have any active calls for applications at the moment. Please check back later or subscribe to our newsletter to stay updated.
                </p>
                <Link to="/contact">
                  <Button variant="default" size="lg">
                    Contact Us for Inquiries
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {jobs.map((job: any) => (
                  <div
                    key={job.id}
                    className="group bg-card rounded-2xl p-6 md:p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                            {job.call_for_application}
                          </h3>
                          <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium">
                            {job.type_of_contract}
                          </span>
                        </div>

                        <div className="text-muted-foreground mb-4 line-clamp-2" dangerouslySetInnerHTML={{ __html: job.about_yiaga }} />

                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Deadline: {job.application_deadline}
                          </span>
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        <Link to={`/careers/${job.slug || job.id}`}>
                          <Button variant="default">
                            Apply Now
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Stay Informed
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Never miss an opportunity. Subscribe to our newsletter to receive the latest calls for applications directly in your inbox.
          </p>
          <Button variant="hero" size="lg">
            Subscribe to Opportunities
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default CallForApplications;

import { MapPin, Clock, Briefcase, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const CareersSection = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: () => api.getJobs()
  });

  return (
    <section id="careers" className="py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block px-4 py-2 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              Join Our Team
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              Build Your Career with 
              <span className="text-secondary"> Purpose</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-6 leading-relaxed">
              Join a team of passionate individuals committed to strengthening democracy and empowering citizens across Africa.
            </p>
            <p className="text-primary-foreground/70 mb-8 leading-relaxed">
              We offer a dynamic work environment, competitive benefits, and the opportunity to make a real impact on governance and civic participation in Nigeria and beyond.
            </p>
            <Link to="/careers">
              <Button variant="hero" size="lg">
                View All Openings
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-foreground/50" />
              </div>
            ) : jobs.length === 0 ? (
              <>
                {/* No Openings Card */}
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20 text-center">
                  <Briefcase className="w-12 h-12 mx-auto text-primary-foreground/50 mb-4" />
                  <h3 className="text-xl font-display font-bold text-primary-foreground mb-3">
                    No Current Openings
                  </h3>
                  <p className="text-primary-foreground/70 leading-relaxed">
                    We don't have any open positions at the moment. Check back soon or submit your CV for future opportunities.
                  </p>
                </div>

                {/* CTA Card */}
                <div className="bg-secondary rounded-2xl p-8 text-center">
                  <h4 className="text-xl font-display font-bold text-secondary-foreground mb-3">
                    Interested in Joining Us?
                  </h4>
                  <p className="text-secondary-foreground/80 mb-4">
                    Send us your CV and we'll reach out when there's a match.
                  </p>
                  <Link to="/contact">
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Submit Your CV
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {jobs.slice(0, 3).map((job, index) => (
                  <Link
                    key={job.id}
                    to={`/careers/${job.id}`}
                    className="group bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-300 block"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-display font-bold text-primary-foreground mb-1 group-hover:text-secondary transition-colors">
                          {job.call_for_application}
                        </h3>
                        <span className="text-primary-foreground/70 text-sm">
                          {job.department}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm font-medium self-start">
                        <Clock className="w-3 h-3" />
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-primary-foreground/70 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        {job.type_of_contract}
                      </span>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-primary-foreground/10 flex justify-end">
                      <span 
                        className="inline-flex items-center gap-2 text-secondary font-semibold group-hover:gap-3 transition-all"
                      >
                        Apply Now
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}

                {/* CTA Card */}
                <div className="bg-secondary rounded-2xl p-8 text-center">
                  <h4 className="text-xl font-display font-bold text-secondary-foreground mb-3">
                    Don't see a fit?
                  </h4>
                  <p className="text-secondary-foreground/80 mb-4">
                    Send us your CV and we'll reach out when there's a match.
                  </p>
                  <Link to="/contact">
                    <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Submit Your CV
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;

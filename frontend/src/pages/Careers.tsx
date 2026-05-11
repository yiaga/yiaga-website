import { MapPin, Clock, Briefcase, ArrowRight, Users, Heart, Lightbulb, Globe, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

import heroCareers from "@/assets/hero-careers.jpg";

const benefits = [
  {
    icon: Heart,
    title: "Health & Wellness",
    description: "Comprehensive health insurance and wellness programs for you and your family."
  },
  {
    icon: Lightbulb,
    title: "Professional Development",
    description: "Continuous learning opportunities, training, and career advancement paths."
  },
  {
    icon: Globe,
    title: "Meaningful Work",
    description: "Make a real impact on democracy and governance across Africa."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Work with passionate professionals committed to positive change."
  },
];

const values = [
  "Integrity and transparency in all we do",
  "Commitment to citizen empowerment",
  "Innovation and continuous improvement",
  "Diversity and inclusion",
  "Collaboration and teamwork",
];

const Careers = () => {
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['jobs', 'job'],
    queryFn: () => api.getJobs(false, 'job')
  });

  return (
    <PageLayout>
      <PageHero
        badge="Join Our Team"
        title="Build Your Career with"
        titleHighlight="Purpose"
        description="Join a team of passionate individuals committed to strengthening democracy and empowering citizens across Africa."
        backgroundImage={heroCareers}
      />

      {/* Why Join Us Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
                Why Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
                More Than a Job,
                <span className="text-gradient"> A Mission</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At Yiaga Africa, we believe that meaningful work creates meaningful lives. When you join our team, you become part of a movement that's shaping the future of democracy across Africa.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We offer a dynamic work environment, competitive compensation, and the opportunity to work alongside dedicated professionals who share your passion for civic engagement and good governance.
              </p>

              <ul className="space-y-3">
                {values.map((value) => (
                  <li key={value} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="group bg-card rounded-2xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Current Openings
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Find Your
              <span className="text-gradient"> Perfect Role</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Explore our current job openings and find a position that matches your skills and aspirations.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-16 bg-card rounded-2xl border border-border">
                <Briefcase className="w-16 h-16 mx-auto text-muted-foreground/50 mb-6" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                  No Current Openings
                </h3>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  We don't have any open positions at the moment, but we're always looking for talented individuals. Submit your CV and we'll reach out when there's a match.
                </p>
                <Button variant="default" size="lg">
                  Submit Your CV
                  <ArrowRight className="w-4 h-4" />
                </Button>
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
                            View Details
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

      {/* Submit CV Section */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Don't See a Perfect Fit?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 leading-relaxed">
              We're always looking for talented individuals who are passionate about democracy and governance. Submit your CV and we'll reach out when there's a match.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                Submit Your CV
              </Button>
              <Link to="/about">
                <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Learn About Our Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
            Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Get in Touch with Our
            <span className="text-gradient"> HR Team</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Have questions about working at Yiaga Africa? Our Human Resources team is here to help.
          </p>
          <Button variant="outline" size="lg">
            Contact HR
          </Button>
        </div>
      </section>
    </PageLayout>
  );
};

export default Careers;

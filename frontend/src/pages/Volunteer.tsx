import React, { useState } from "react";
import { Send, Heart, MapPin, Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import heroVolunteer from "@/assets/hero-careers.jpg";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

const Volunteer = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get('first_name')} ${formData.get('last_name')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      occupation: formData.get('occupation'),
      location: formData.get('location'),
      skills: formData.get('skills'),
      experience: formData.get('experience'),
      department: formData.get('department'),
      interests: formData.get('interests'),
    };

    try {
      await api.submitVolunteer(data);
      toast({
        title: "Application Received!",
        description: "Thank you for volunteering. We will review your application and get back to you.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <PageHero
        badge="Volunteer"
        title="Become a"
        titleHighlight="Volunteer"
        description="Join thousands of active citizens to drive change across Africa. Sign up to volunteer in your community."
        backgroundImage={heroVolunteer}
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Volunteer Application Form
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Please fill out the form below to register your interest in volunteering. Make sure to select the category that aligns best with your skills and passions.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium text-foreground">Area of Interest *</label>
                    <select
                      id="category"
                      name="interests"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="" disabled selected>Select interest</option>
                      <option value="Election Observation">Election Observation</option>
                      <option value="Civic Education">Civic Education</option>
                      <option value="Policy Advocacy">Policy Advocacy</option>
                      <option value="Community Organizing">Community Organizing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium text-foreground">Preferred Department *</label>
                    <select
                      id="department"
                      name="department"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="" disabled selected>Select department</option>
                      <option value="Programs">Programs</option>
                      <option value="Elections">Elections</option>
                      <option value="Governance">Governance</option>
                      <option value="Media and Communications">Media and Communications</option>
                      <option value="IT & Tech">IT & Tech</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="first_name" className="text-sm font-medium text-foreground">First Name *</label>
                    <Input id="first_name" name="first_name" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last_name" className="text-sm font-medium text-foreground">Last Name *</label>
                    <Input id="last_name" name="last_name" placeholder="Doe" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</label>
                    <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                    <Input id="phone" name="phone" type="tel" placeholder="+234..." />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="location" className="text-sm font-medium text-foreground">City/State *</label>
                    <Input id="location" name="location" placeholder="e.g. Abuja, FCT" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="experience" className="text-sm font-medium text-foreground">Years of Experience *</label>
                    <Input id="experience" name="experience" type="number" min="0" placeholder="e.g. 2" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="skills" className="text-sm font-medium text-foreground">Your Skills *</label>
                  <Textarea
                    id="skills"
                    name="skills"
                    placeholder="List your key skills (e.g., Data Analysis, Social Media, Event Planning)..."
                    className="min-h-[80px] resize-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="why_volunteer" className="text-sm font-medium text-foreground">Why do you want to volunteer? *</label>
                  <Textarea
                    id="why_volunteer"
                    name="occupation"
                    placeholder="Tell us a bit about your motivation..."
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-14 text-lg font-semibold group" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    {!isSubmitting && <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Volunteer;

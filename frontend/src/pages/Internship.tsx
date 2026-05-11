import React, { useState } from "react";
import { Send, GraduationCap, MapPin, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import heroInternship from "@/assets/hero-careers.jpg";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/services/api";

const Internship = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      full_name: `${formData.get('first_name')} ${formData.get('last_name')}`,
      email: formData.get('email'),
      phone: formData.get('phone'),
      qualification: formData.get('qualification'),
      level: formData.get('level'),
      duration: formData.get('duration'),
      department: formData.get('department'),
      message: formData.get('message'),
    };

    try {
      await api.submitInternship(data);
      toast({
        title: "Application Received!",
        description: "Thank you for your interest in an internship with Yiaga Africa. We will review your application and contact you.",
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
        badge="Career Growth"
        title="Internship"
        titleHighlight="Opportunities"
        description="Launch your career in civic engagement and governance. Apply for an internship at Yiaga Africa and learn from the best in the field."
        backgroundImage={heroInternship}
      />

      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Internship Application Form
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Please provide your details and academic background. Internships are available across various departments for motivated students and recent graduates.
              </p>
            </div>

            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number *</label>
                    <Input id="phone" name="phone" type="tel" placeholder="+234..." required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="qualification" className="text-sm font-medium text-foreground">Highest Qualification *</label>
                    <Input id="qualification" name="qualification" placeholder="e.g. B.Sc. Political Science" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="level" className="text-sm font-medium text-foreground">Current Level/Year *</label>
                    <Input id="level" name="level" placeholder="e.g. 400 Level or Graduate" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium text-foreground">Department to Serve *</label>
                    <select
                      id="department"
                      name="department"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="" disabled selected>Select a department</option>
                      <option value="Programs">Programs</option>
                      <option value="Elections">Elections</option>
                      <option value="Governance">Governance</option>
                      <option value="Media and Communications">Media and Communications</option>
                      <option value="Admin">Admin</option>
                      <option value="Finance">Finance</option>
                      <option value="IT">IT</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="duration" className="text-sm font-medium text-foreground">Duration of Internship *</label>
                    <select
                      id="duration"
                      name="duration"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      required
                    >
                      <option value="" disabled selected>Select duration</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="1 Year">1 Year</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="statement" className="text-sm font-medium text-foreground">Personal Statement *</label>
                  <Textarea
                    id="statement"
                    name="message"
                    placeholder="Briefly describe why you want to intern with Yiaga Africa..."
                    className="min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full h-14 text-lg font-semibold group" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Internship Application"}
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

export default Internship;

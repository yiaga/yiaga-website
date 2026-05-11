import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import heroContact from "@/assets/hero-contact.jpg";
import { useToast } from "@/components/ui/use-toast";

import { api } from "@/services/api";

const Contact = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get('first_name');
        const lastName = formData.get('last_name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        try {
            await api.submitContact({
                name: `${firstName} ${lastName}`,
                email: email as string,
                subject: `FROM WEBSITE: ${subject as string}`,
                message: message as string
            });

            toast({
                title: "Message Sent!",
                description: "Thank you for reaching out. We have received your message and will get back to you soon.",
            });
            
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "There was an error sending your message. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <PageLayout>
            <PageHero
                badge="Contact Us"
                title="Get in"
                titleHighlight="Touch"
                description="Have questions or want to collaborate? Reach out to us. Our team is ready to listen and work together for a better Africa."
                backgroundImage={heroContact}
            />

            <section className="py-20 lg:py-28 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div className="space-y-12">
                            <div>
                                <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
                                    Contact Information
                                </span>
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                                    Visit Our Headquarters or
                                    <span className="text-gradient"> Reach Out Online</span>
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    We are always open to discussions about partnerships, project inquiries, or any questions you might have about our work across the continent.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Our Office</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            Plot 54 Cadastral Zone, Idu, Karmo, Abuja 900108, Federal Capital Territory.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-6 h-6 text-secondary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Email Us</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            info@yiaga.org
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Call Us</h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            +234 (0) 903 800 7744
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <Globe className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Social Media</h4>
                                        <div className="flex gap-4 mt-2">
                                            <a href="https://www.facebook.com/yiaga.org/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Facebook className="w-5 h-5" />
                                            </a>
                                            <a href="https://x.com/YIAGA" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                            <a href="https://www.instagram.com/yiaga/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Instagram className="w-5 h-5" />
                                            </a>
                                            <a href="https://www.linkedin.com/company/yiagaafrica" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a href="https://www.youtube.com/@YIAGA1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <Youtube className="w-5 h-5" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map Integration */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border bg-muted flex items-center justify-center">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15760.36465053535!2d7.385317719602513!3d9.055307399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e751268e2197f%3A0xe54eebd6ab4500ea!2sYIAGA%20AFRICA!5e0!3m2!1sen!2sng!4v1714412341234"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16" />
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-tr-full -ml-12 -mb-12" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-display font-bold text-foreground">Send a Message</h3>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="first_name" className="text-sm font-medium text-foreground">First Name</label>
                                            <Input id="first_name" name="first_name" placeholder="John" required />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="last_name" className="text-sm font-medium text-foreground">Last Name</label>
                                            <Input id="last_name" name="last_name" placeholder="Doe" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                                        <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                                        <Input id="subject" name="subject" placeholder="How can we help?" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us more about your inquiry..."
                                            className="min-h-[150px] resize-none"
                                            required
                                        />
                                    </div>

                                    <Button type="submit" className="w-full h-14 text-lg font-semibold group" disabled={isSubmitting}>
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                        {!isSubmitting && <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />}
                                    </Button>
                                </form>

                                <p className="mt-8 text-center text-sm text-muted-foreground">
                                    By submitting this form, you agree to our
                                    <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PageLayout>
    );
};

export default Contact;

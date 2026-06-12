import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";

const subscriptionOptions = [
  { id: "monthly", label: "Monthly Newsletter", description: "Comprehensive monthly updates" },
  { id: "theballot", label: "Weekly Election News Update (The Ballot)", description: "Weekly political analysis" },
  { id: "genz", label: "GenZ Blog Series", description: "Youth-focused perspectives" },
  { id: "research", label: "Research, Reports, Policy Briefs & Knowledge Products", description: "In-depth analysis and reports" },
  { id: "press", label: "Press Releases, Stories & Democracy Updates", description: "Latest news and stories" },
  { id: "opportunities", label: "Opportunities: Events Webinars & Open Calls", description: "Get involved" },
];

interface SubscriptionSectionProps {
  variant?: "primary" | "muted";
  title?: string;
  description?: string;
  id?: string;
}

const SubscriptionSection = ({
  variant = "primary",
  title = "Stay Connected with Our Mission",
  description = "Subscribe to receive updates on our programs, events, and opportunities to get involved in strengthening democracy.",
  id
}: SubscriptionSectionProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // Initialize with all options selected
  const [selectedOptions, setSelectedOptions] = useState<string[]>(subscriptionOptions.map(o => o.id));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !firstName || !lastName) {
      toast({ title: "Please fill in all fields (Name and Email)", variant: "destructive" });
      return;
    }
    if (selectedOptions.length === 0) {
      toast({ title: "Please select at least one subscription", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      await api.subscribeNewsletter(email, firstName, lastName, selectedOptions);
      toast({
        title: "Subscribed successfully!",
        description: `You've subscribed to ${selectedOptions.length} item(s).`
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      setSelectedOptions([]);
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPrimary = variant === "primary";

  return (
    <section id={id} className={`py-20 lg:py-28 ${isPrimary ? 'bg-primary text-primary-foreground' : 'bg-muted/50'}`}>
      <div className="container mx-auto px-4">
        <div className={`relative ${isPrimary ? '' : 'bg-gradient-to-br from-secondary via-secondary to-accent'} rounded-3xl p-8 md:p-12 lg:p-16 overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='40' stroke='%23ffffff' stroke-width='2' fill='none'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }} />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 ${isPrimary ? '' : 'text-secondary-foreground'}`}>
              {title}
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${isPrimary ? 'text-primary-foreground/80' : 'text-secondary-foreground/80'}`}>
              {description}
            </p>

            {/* Subscription Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
              {subscriptionOptions.map((option) => (
                <label
                  key={option.id}
                  className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${selectedOptions.includes(option.id)
                    ? "bg-background shadow-lg"
                    : "bg-background/60 hover:bg-background/80"
                    }`}
                >
                  <Checkbox
                    checked={selectedOptions.includes(option.id)}
                    onCheckedChange={() => handleOptionToggle(option.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{option.label}</p>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </label>
              ))}
            </div>

            {/* Newsletter Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="flex-1 h-14 px-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                  disabled={isSubmitting}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="flex-1 h-14 px-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full h-14 pl-12 pr-4 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-2 border-transparent focus:border-primary focus:outline-none transition-colors"
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" variant={isPrimary ? "hero" : "default"} size="xl" className="h-14 shrink-0" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>

            <p className={`text-sm ${isPrimary ? 'text-primary-foreground/60' : 'text-secondary-foreground/60'}`}>
              Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;

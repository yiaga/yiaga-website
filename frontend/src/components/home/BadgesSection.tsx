import { Award, Shield, Star, Trophy, Medal, Crown, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const getBadgeIcon = (iconName: string) => {
  const icons: { [key: string]: any } = {
    Shield,
    Award,
    Trophy,
    Star,
    Medal,
    Crown
  };
  return icons[iconName] || Award;
};

const BadgesSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const { data: badges = [], isLoading } = useQuery({
    queryKey: ['badges'],
    queryFn: () => api.getBadges()
  });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className={cn(
          "text-center mb-14 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            Recognition & Awards
          </span>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Badges of Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our commitment to democracy and civic engagement has been recognized by leading organizations across Africa
          </p>
        </div>

        {/* Badges container */}
        <div className="flex flex-wrap justify-center gap-8">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : badges.length === 0 ? (
            <p className="text-muted-foreground">Recognition badges will be displayed here soon.</p>
          ) : (
            badges.map((badge, index) => {
              const Icon = getBadgeIcon(badge.icon);
              return (
                <div
                  key={badge.id}
                  className={cn(
                    "group relative transition-all duration-500 w-full max-w-[200px]",
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 h-full">
                    {/* Badge Icon */}
                    <div className={cn(
                      "w-20 h-20 rounded-full bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300 bg-primary text-white"
                    )}>
                      <Icon className="w-10 h-10" />
                    </div>

                    {/* Year Tag */}
                    <span className="absolute top-3 right-3 text-xs font-bold bg-muted px-2 py-1 rounded-full text-muted-foreground">
                      {badge.year}
                    </span>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-sm leading-tight mb-2">
                      {badge.title}
                    </h3>

                    {/* Issuer */}
                    <p className="text-xs text-muted-foreground">
                      {badge.issuer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default BadgesSection;

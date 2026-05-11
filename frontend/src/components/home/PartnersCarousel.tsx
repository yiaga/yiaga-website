import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Loader2 } from 'lucide-react';

const PartnersCarousel = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.getPartners()
  });

  return (
    <section ref={ref} className="py-16 bg-muted/30 overflow-hidden">
      <div className={cn(
        "container mx-auto px-4 mb-10 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2 block">
            Our Partners
          </span>
          <h2 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
            Trusted By Leading Organizations
          </h2>
        </div>
      </div>

      {/* Infinite Scroll Animation */}
      <div className={cn(
        "relative transition-all duration-700 delay-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}>
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Partner list currently unavailable.</p>
          </div>
        ) : (
          <>
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-muted/30 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-muted/30 to-transparent z-10" />

            {/* First Row - Left to Right */}
            <div className="flex animate-scroll-left mb-6">
              {[...partners, ...partners].map((partner, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 mx-6 w-40 h-24 bg-background rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>

            {/* Second Row - Right to Left */}
            <div className="flex animate-scroll-right">
              {[...partners.slice().reverse(), ...partners].map((partner, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 mx-6 w-40 h-24 bg-background rounded-xl shadow-sm border border-border/50 flex items-center justify-center p-4 hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PartnersCarousel;

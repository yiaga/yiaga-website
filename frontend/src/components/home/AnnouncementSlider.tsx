import { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Megaphone, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

import nvisReport from "@/assets/nvis-report.jpg";
import ngoSourceEd from "@/assets/ngosource-ed.jpg";
import discuss from "@/assets/discuss.jpg";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const AnnouncementSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => api.getAnnouncements()
  });

  const displayedAnnouncements = useMemo(() => {
    if (announcements.length <= 5) return announcements;
    const shuffled = [...announcements].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 5);
  }, [announcements]);

  useEffect(() => {
    if (displayedAnnouncements.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displayedAnnouncements.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [displayedAnnouncements.length]);

  const nextSlide = () => displayedAnnouncements.length > 0 && setCurrentSlide((prev) => (prev + 1) % displayedAnnouncements.length);
  const prevSlide = () => displayedAnnouncements.length > 0 && setCurrentSlide((prev) => (prev - 1 + displayedAnnouncements.length) % displayedAnnouncements.length);

  if (displayedAnnouncements.length === 0) {
    return null;
  }

  const current = displayedAnnouncements[currentSlide];

  return (
    <section
      ref={ref}
      className="py-12 bg-gradient-to-r from-secondary/10 via-background to-accent/10 overflow-hidden"
    >
      <div className={cn(
        "container mx-auto px-4 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}>
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 max-w-20 bg-gradient-to-r from-transparent to-secondary" />
          <Megaphone className="w-5 h-5 text-secondary" />
          <span className="text-sm font-semibold uppercase tracking-widest text-secondary">
            Announcements
          </span>
          <div className="h-px flex-1 max-w-20 bg-gradient-to-l from-transparent to-secondary" />
        </div>

        {/* Slider Content */}
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image Column */}
            <div className={cn(
              "relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 delay-100",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            )}>
              <img
                src={current.image}
                alt={current.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

              {/* Slide Counter */}
              <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">{String(currentSlide + 1).padStart(2, '0')}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{String(displayedAnnouncements.length).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Content Column */}
            <div className={cn(
              "space-y-6 transition-all duration-500 delay-200",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            )}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{current.date}</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground leading-tight">
                {current.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg">
                {current.description}
              </p>

              <Button className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                Read More
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              {/* Navigation & Dots */}
              <div className="flex items-center gap-4 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="p-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-2">
                  {displayedAnnouncements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        index === currentSlide
                          ? "w-8 bg-primary"
                          : "w-2 bg-border hover:bg-muted-foreground"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementSlider;

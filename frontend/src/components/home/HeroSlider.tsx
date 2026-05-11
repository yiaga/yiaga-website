import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import heroImage1 from "@/assets/youth.jpg";
import heroImage2 from "@/assets/youth-2.jpg";
import heroImage3 from "@/assets/youth-1.jpg";

const slides = [
  {
    id: 1,
    title: "Strengthening Democracy in Africa",
    subtitle: "Empowering Citizens for Good Governance",
    description: "Join us in building a continent where every voice matters and every vote counts.",
    cta: "Learn More",
    ctaLink: "/democracy",
    ctaSecondary: "Watch Video",
    ctaSecondaryLink: "#",
  },
  {
    id: 2,
    title: "Election Observation",
    subtitle: "Transparency in Every Vote",
    description: "Our nationwide network of observers ensures free and fair elections across Nigeria.",
    cta: "View Reports",
    ctaLink: "/resources?category=Reports",
    ctaSecondary: "Get Involved",
    ctaSecondaryLink: "/contact",
  },
  {
    id: 3,
    title: "Youth Political Participation",
    subtitle: "Ready to Run Campaign",
    description: "Training the next generation of leaders to transform governance in Africa.",
    cta: "Join the Movement",
    ctaLink: "https://readytorun.ng",
    ctaSecondary: "Success Stories",
    ctaSecondaryLink: "https://readytorun.ng",
  },
];

const images = [heroImage1, heroImage2, heroImage3];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(index);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Calculate image positions based on current slide
  const getImageStyle = (index: number) => {
    const diff = (index - currentSlide + images.length) % images.length;

    // Positions for 3 visible images in a creative layout on the right side
    const positions = [
      { // Active - Large main image (top right)
        top: "14%",
        right: "5%",
        width: "45%",
        height: "70%",
        zIndex: 30,
        rotate: "2deg",
        opacity: 1,
        scale: 1,
      },
      { // Second - Medium image, offset left
        top: "25%",
        right: "35%",
        width: "30%",
        height: "50%",
        zIndex: 20,
        rotate: "-4deg",
        opacity: 0.9,
        scale: 0.95,
      },
      { // Third - Smaller, bottom left of stack
        top: "55%",
        right: "55%",
        width: "25%",
        height: "40%",
        zIndex: 10,
        rotate: "6deg",
        opacity: 0.7,
        scale: 0.9,
      },
    ];

    return positions[diff] || positions[2];
  };

  return (
    <section className="relative min-h-[700px] lg:min-h-screen overflow-hidden bg-primary-dark pt-20 lg:pt-24">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--secondary)) 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, hsl(var(--accent)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px, 80px 80px",
        }} />
      </div>

      {/* Decorative Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-40 left-1/4 w-48 h-48 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-secondary/10 blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />

      {/* Content - Top Left aligned */}
      <div className="relative z-40 container mx-auto px-4 pt-8 lg:pt-16">
        <div className="max-w-xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={cn(
                "transition-all duration-700 ease-out",
                index === currentSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none absolute"
              )}
            >
              <span
                className={cn(
                  "inline-block px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-4 backdrop-blur-sm border border-secondary/30",
                  index === currentSlide && "animate-fade-in"
                )}
                style={{ animationDelay: "0.1s" }}
              >
                {slide.subtitle}
              </span>
              <h1
                className={cn(
                  "text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-primary-foreground mb-4 leading-tight text-left",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: "0.2s" }}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  "text-base md:text-lg lg:text-xl text-primary-foreground/90 mb-6 max-w-lg leading-relaxed text-left",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: "0.3s" }}
              >
                {slide.description}
              </p>
              <div
                className={cn(
                  "flex flex-wrap gap-4",
                  index === currentSlide && "animate-slide-up"
                )}
                style={{ animationDelay: "0.4s" }}
              >
                {slide.ctaLink.startsWith('http') ? (
                  <a href={slide.ctaLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="hero" size="xl">
                      {slide.cta}
                    </Button>
                  </a>
                ) : (
                  <Link to={slide.ctaLink}>
                    <Button variant="hero" size="xl">
                      {slide.cta}
                    </Button>
                  </Link>
                )}

                {slide.ctaSecondaryLink.startsWith('http') ? (
                  <a href={slide.ctaSecondaryLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="heroOutline" size="xl">
                      <Play className="w-5 h-5" />
                      {slide.ctaSecondary}
                    </Button>
                  </a>
                ) : (
                  <Link to={slide.ctaSecondaryLink}>
                    <Button variant="heroOutline" size="xl">
                      {slide.ctaSecondaryLink === '#' ? (
                        <Play className="w-5 h-5" />
                      ) : null}
                      {slide.ctaSecondary}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Images Collage - Right side */}
      <div className="absolute inset-0 pointer-events-none">
        {images.map((image, index) => {
          const style = getImageStyle(index);
          return (
            <div
              key={index}
              className="absolute transition-all duration-700 ease-out"
              style={{
                top: style.top,
                right: style.right,
                width: style.width,
                height: style.height,
                zIndex: style.zIndex,
                transform: `rotate(${style.rotate}) scale(${style.scale})`,
                opacity: style.opacity,
              }}
            >
              {/* Image Container with Frame Effect */}
              <div className="relative w-full h-full group">
                {/* Colored Border Accent */}
                <div
                  className={cn(
                    "absolute -inset-1 rounded-2xl transition-all duration-500",
                    index === currentSlide
                      ? "bg-gradient-to-br from-secondary via-accent to-secondary opacity-100"
                      : "bg-primary-foreground/20 opacity-50"
                  )}
                />

                {/* Image */}
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={image}
                    alt={`Hero image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Image Overlay */}
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    index === currentSlide
                      ? "bg-primary/10"
                      : "bg-primary/30"
                  )} />
                </div>

                {/* Decorative Corner */}
                {index === currentSlide && (
                  <>
                    <div className="absolute -top-3 -left-3 w-8 h-8 border-l-3 border-t-3 border-secondary rounded-tl-lg" />
                    <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-3 border-b-3 border-accent rounded-br-lg" />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation - Bottom Left */}
      <div className="absolute bottom-8 left-4 md:left-8 flex items-center gap-4 z-50">
        <button
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-all duration-300 border border-primary-foreground/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 right-4 md:right-8 flex items-center gap-3 z-50">
        <span className="text-5xl font-display font-bold text-primary-foreground">
          {String(currentSlide + 1).padStart(2, '0')}
        </span>
        <div className="flex flex-col">
          <span className="text-primary-foreground/50 text-sm">of</span>
          <span className="text-primary-foreground/70 text-lg font-medium">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-28 right-4 md:right-8 flex flex-col gap-2 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-1 rounded-full transition-all duration-500",
              index === currentSlide
                ? "h-12 bg-secondary"
                : "h-6 bg-primary-foreground/30 hover:bg-primary-foreground/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-30" />
    </section>
  );
};

export default HeroSlider;

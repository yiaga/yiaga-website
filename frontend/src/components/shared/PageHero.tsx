import { cn } from "@/lib/utils";

interface PageHeroProps {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  backgroundImage?: string;
}

const PageHero = ({ badge, title, titleHighlight, description, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {backgroundImage && (
        <div className="absolute inset-0">
          <img 
            src={backgroundImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-4 py-2 bg-primary-foreground/20 text-primary-foreground rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            {badge}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-6 leading-tight">
            {title}
            <span className="text-secondary"> {titleHighlight}</span>
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageHero;

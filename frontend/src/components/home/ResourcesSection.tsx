import { FileText, Download, Video, BookOpen, ArrowRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const getResourceIcon = (type: string) => {
  if (type?.toLowerCase().includes('video')) return Video;
  if (type?.toLowerCase().includes('book')) return BookOpen;
  return FileText;
};

const ResourcesSection = () => {
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => api.getResources()
  });

  const displayResources = resources.slice(0, 4);

  return (
    <section id="resources" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-6">
              Resources
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              Knowledge for 
              <span className="text-gradient"> Civic Action</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              Access our comprehensive collection of reports, guides, and educational materials designed to empower citizens and strengthen democratic participation.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              From election observation reports to civic education toolkits, our resources are freely available to support your engagement with governance processes.
            </p>
            <Link to="/resources">
              <Button variant="default" size="lg">
                Browse All Resources
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="col-span-2 flex h-[30vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : displayResources.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-muted-foreground">No resources available.</p>
              </div>
            ) : (
              displayResources.map((resource, index) => {
                const Icon = getResourceIcon(resource.type);
                return (
                  <div
                    key={resource.id}
                    className="group bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <button className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{resource.type}</span>
                      <span>{resource.file_size}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

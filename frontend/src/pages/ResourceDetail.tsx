import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Download, FileText, Video, BookOpen, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const getIcon = (type: string, category: string) => {
  const lowerType = type?.toLowerCase() || '';
  const lowerCat = category?.toLowerCase() || '';
  if (lowerCat.includes("video") || lowerType.includes("video")) return Video;
  if (lowerCat.includes("book") || lowerType.includes("book") || lowerType.includes("guide")) return BookOpen;
  if (lowerCat.includes("report") || lowerType.includes("report")) return FileText;
  return FileText;
};

const ResourceDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: resource, isLoading } = useQuery({
    queryKey: ['resource', id],
    queryFn: () => id ? api.getResourceById(id) : Promise.resolve(undefined),
    enabled: !!id
  });

  const { data: allResources = [] } = useQuery({
    queryKey: ['resources'],
    queryFn: () => api.getResources(),
    enabled: !!resource // Only fetch related if main resource is loaded
  });

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!resource) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Resource Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The resource you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/resources">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get related resources (same category, excluding current)
  const relatedResources = allResources
    .filter((r: any) => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);

  const Icon = getIcon(resource.type, resource.category);

  return (
    <PageLayout>
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/resources"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>

            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-12 h-12 text-primary" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                      {resource.category}
                    </span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                      {resource.type}
                    </span>
                  </div>

                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {resource.title}
                  </h1>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 border-b border-border pb-6">
                    <span>{resource.date}</span>
                    <span>{resource.file_size}</span>
                  </div>

                  <div className="prose prose-lg max-w-none text-foreground mb-12">
                    <div 
                      className="text-muted-foreground leading-relaxed prose prose-sm sm:prose-base dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: resource.description }}
                    />
                  </div>

                  {resource.file_url && (
                    <Button size="lg" className="w-full sm:w-auto font-semibold gap-2 cursor-pointer" asChild>
                      <a href={resource.file_url} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-5 h-5" />
                        Download Resource
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      {relatedResources.length > 0 && (
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Related Resources
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedResources.map((res: any) => {
                const ResIcon = getIcon(res.type, res.category);
                return (
                  <Link
                    key={res.id}
                    to={`/resources/${res.id}`}
                    className="group bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <ResIcon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                      </div>
                    </div>

                    <span className="inline-block px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground mb-3 self-start">
                      {res.category}
                    </span>

                    <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {res.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                      {res.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4 mt-auto">
                      <span>{res.type}</span>
                      <span>{res.file_size}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default ResourceDetail;

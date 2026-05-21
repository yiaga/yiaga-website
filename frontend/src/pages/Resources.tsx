import { FileText, Download, Video, BookOpen, Search, Loader2 } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import SubscriptionSection from "@/components/shared/SubscriptionSection";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

import focusCivic from "@/assets/focus-civic.jpg";

const categories = ["All", "Reports", "Analysis", "E-Books", "Videos", "Toolkits", "Policy Briefs"];

const Resources = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryParam = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const { data: resources = [], isLoading: isResourcesLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: () => api.getResources()
  });

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [resources, selectedCategory, searchQuery]);

  const { displayedItems, hasMore, isLoading: isInfiniteLoading, loadMoreRef } = useInfiniteScroll({
    items: filteredResources,
    itemsPerPage: 8,
  });

  // Helper to get icon based on type/category (since backend doesn't store icon component)
  const getIcon = (type: string, category: string) => {
    const lowerType = type.toLowerCase();
    const lowerCat = category.toLowerCase();
    if (lowerCat.includes("video") || lowerType.includes("video")) return Video;
    if (lowerCat.includes("book") || lowerType.includes("book") || lowerType.includes("guide")) return BookOpen;
    if (lowerCat.includes("report") || lowerType.includes("report")) return FileText;
    return FileText;
  };

  return (
    <PageLayout>
      <PageHero
        badge="Resources"
        title="Knowledge for"
        titleHighlight="Civic Action"
        description="Access our comprehensive collection of reports, guides, and educational materials designed to empower citizens and strengthen democratic participation."
        backgroundImage={focusCivic}
      />

      {/* Search and Filter */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search resources..."
                className="pl-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          {isResourcesLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : displayedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No resources found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayedItems.map((resource) => {
                  const Icon = getIcon(resource.type, resource.category);

                  const handleDownload = async (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (!resource.file_url) return;
                    try {
                      const response = await fetch(resource.file_url);
                      const blob = await response.blob();
                      const blobUrl = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = blobUrl;
                      // Derive filename: use title + extension from URL
                      const urlExt = resource.file_url.split('.').pop()?.split('?')[0] || '';
                      a.download = urlExt ? `${resource.title}.${urlExt}` : resource.title || 'resource';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(blobUrl);
                      // Update download count in "Resources" table if download is successful
                      const updated = await api.incrementDownloadCount(resource.id);
                    } catch {
                      // Fallback: open in new tab if fetch fails (e.g. CORS blocked)
                      window.open(resource.file_url, '_blank', 'noopener,noreferrer');
                    }
                  };

                  return (
                    <div
                      key={resource.id}
                      onClick={(e) => {
                        // Don't navigate if clicking the download button
                        if ((e.target as HTMLElement).closest('button')) return;
                        navigate(`/resources/${resource.slug || resource.id}`);
                      }}
                      className="group bg-card rounded-xl p-6 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col h-full"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <button
                          onClick={handleDownload}
                          title="Download"
                          className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                      </div>

                      <span className="inline-block px-2 py-1 bg-muted rounded-md text-xs font-medium text-muted-foreground mb-3">
                        {resource.category}
                      </span>

                      <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {resource.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {resource.description?.replace(/<[^>]*>/g, '')}
                      </p>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        <span className="text-primary" style={{fontSize:"10px"}}>{resource.downloads || "0"} total downloads</span>
                      </p>

                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4 mt-auto">
                        <span>{resource.type}</span>
                        <span>{resource.file_size}</span>
                      </div>

                      <div className="text-xs text-muted-foreground mt-2">
                        <span>{resource.date}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="flex justify-center mt-12">
                {isInfiniteLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more resources...</span>
                  </div>
                )}
                {!hasMore && displayedItems.length > 0 && (
                  <p className="text-muted-foreground text-center">
                    You've reached the end of the resources.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Request Resources Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-6">
              Can't Find What You Need?
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Request Custom
              <span className="text-gradient"> Resources</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              If you need specific information or materials for your civic engagement activities, reach out to our team. We're here to support your work.
            </p>
            <Button variant="default" size="lg">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <SubscriptionSection
        variant="primary"
        title="Stay Updated with New Resources"
        description="Subscribe to receive notifications when we publish new reports, guides, and educational materials."
      />
    </PageLayout>
  );
};

export default Resources;

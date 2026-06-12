import { Calendar, Clock, ArrowRight, Search, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import PageHero from "@/components/shared/PageHero";
import SubscriptionSection from "@/components/shared/SubscriptionSection";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const categories = ["All", "Elections", "Training", "Research", "Partnerships", "Events", "Technology"];

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: newsItems = [], isLoading: isInitialLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => api.getNews()
  });

  const filteredNews = useMemo(() => {
    return newsItems.filter((news) => {
      const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, newsItems]);

  const { displayedItems, hasMore, isLoading, loadMoreRef } = useInfiniteScroll({
    items: filteredNews,
    itemsPerPage: 6,
  });

  const featuredNews = displayedItems.find(item => item.featured);
  const otherNews = displayedItems.filter(item => !item.featured);

  if (isInitialLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHero
        badge="News"
        title="Latest Updates from"
        titleHighlight="Yiaga Africa"
        description="Stay informed about our work, initiatives, and the latest developments in democracy and governance across Africa."
        backgroundImage={newsItems[0]?.image}
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
                placeholder="Search news..."
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

      {/* News Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          {displayedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No news found matching your criteria.</p>
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
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Featured News */}
                {featuredNews && (
                  <Link to={`/news/${featuredNews.slug}`} className="lg:col-span-2 lg:row-span-2 group">
                    <div className="h-full bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                      <div className="h-64 lg:h-80 relative overflow-hidden">
                        <img
                          src={featuredNews.image}
                          alt={featuredNews.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold">
                            {featuredNews.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {featuredNews.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredNews.readTime || '4 min read'}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                          {featuredNews.title}
                        </h3>

                        <p className="text-muted-foreground leading-relaxed mb-6">
                          {featuredNews.excerpt}
                        </p>

                        <span className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                          Read Full Story
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )}

                {/* Other News Items */}
                {otherNews.map((news) => (
                  <Link
                    key={news.id}
                    to={`/news/${news.slug}`}
                    className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-32 relative overflow-hidden">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                          {news.category}
                        </span>
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {news.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {news.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                        {news.excerpt}
                      </p>

                      <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="flex justify-center mt-12">
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more news...</span>
                  </div>
                )}
                {!hasMore && displayedItems.length > 0 && (
                  <p className="text-muted-foreground text-center">
                    You've reached the end of the news.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <SubscriptionSection
        variant="primary"
        title="Stay Updated with Our Newsletter"
        description="Get the latest news and updates delivered directly to your inbox. Join thousands of citizens committed to strengthening democracy."
      />
    </PageLayout>
  );
};

export default News;

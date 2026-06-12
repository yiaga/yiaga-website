import { User, Calendar, ArrowRight, Search, Loader2 } from "lucide-react";
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

import { useSearchParams } from "react-router-dom";

const categories = ["All", "The Ballot", "GenZ Series", "Technology", "Youth", "Governance", "Women", "Elections"];

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const { data: blogPosts = [], isLoading: isInitialLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.getBlogs()
  });

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, blogPosts]);

  const { displayedItems, hasMore, isLoading, loadMoreRef } = useInfiniteScroll({
    items: filteredPosts,
    itemsPerPage: 6,
  });

  const featuredPost = displayedItems.find(item => item.featured);
  const otherPosts = displayedItems.filter(item => !item.featured);

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
        badge="Blog"
        title="Insights &"
        titleHighlight="Perspectives"
        description="Expert analysis and thought leadership on democracy, governance, and civic engagement in Africa."
        backgroundImage={blogPosts[0]?.image}
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
                placeholder="Search articles..."
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
                  onClick={() => handleCategoryChange(category)}
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

      {/* Blog Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4">
          {displayedItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
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
              {/* Featured Post */}
              {featuredPost && (
                <Link
                  to={
                    (featuredPost.category === "Gen Z Series" || featuredPost.category === "GenZ Series") && featuredPost.pdf_url
                      ? featuredPost.pdf_url
                      : `/blogs/${featuredPost.slug}`
                  }
                  target={
                    (featuredPost.category === "Gen Z Series" || featuredPost.category === "GenZ Series") && featuredPost.pdf_url
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    (featuredPost.category === "Gen Z Series" || featuredPost.category === "GenZ Series") && featuredPost.pdf_url
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block mb-12 group"
                >
                  <div className="grid lg:grid-cols-2 gap-8 bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                    <div className="h-64 lg:h-full relative overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col justify-center">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold w-fit mb-4">
                        {featuredPost.category}
                      </span>

                      <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {featuredPost.date}
                        </span>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-foreground">
                            {featuredPost.author}
                          </div>
                          <div className="text-muted-foreground text-sm">
                            {featuredPost.author_role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post) => {
                  const isGenZ = post.category === "Gen Z Series" || post.category === "GenZ Series";
                  const linkTarget = isGenZ && post.pdf_url ? post.pdf_url : `/blogs/${post.slug}`;
                  const isExternal = isGenZ && post.pdf_url;

                  return (
                    <Link
                      key={post.id}
                      to={linkTarget}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                        </div>

                        <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 whitespace-pre-line">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground text-sm">
                                {post.author}
                              </div>
                              <div className="text-muted-foreground text-xs">
                                {post.author_role}
                              </div>
                            </div>
                          </div>
                          <span className="text-primary hover:text-primary/80 transition-colors">
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={loadMoreRef} className="flex justify-center mt-12">
                {isLoading && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading more articles...</span>
                  </div>
                )}
                {!hasMore && displayedItems.length > 0 && (
                  <p className="text-muted-foreground text-center">
                    You've reached the end of the articles.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <SubscriptionSection
        variant="muted"
        title="Subscribe to Our Weekly Digest"
        description="Get the latest insights, analysis, and updates delivered to your inbox every week."
      />
    </PageLayout>
  );
};

export default Blog;

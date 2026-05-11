import { Calendar, ArrowRight, Clock, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const NewsSection = () => {
  const { data: newsItems = [], isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: () => api.getNews()
  });

  const displayNews = newsItems.slice(0, 4);
  const featuredNews = displayNews.find(item => item.featured) || displayNews[0];
  const otherNews = displayNews.filter(item => item.id !== (featuredNews?.id));

  return (
    <section id="news" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              Latest News
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
              Stay Updated with
              <span className="text-gradient"> Our Work</span>
            </h2>
          </div>
          <Link to="/news">
            <Button variant="outline" size="lg" className="self-start md:self-auto">
              View All News
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="flex h-[40vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : displayNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news updates available.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured News */}
            {featuredNews && (
              <Link to={`/news/${featuredNews.slug}`} className="lg:col-span-2 lg:row-span-2 group">
                <div className="h-full bg-card rounded-3xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                  {/* Image */}
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
                    
                    <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2">
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
                {/* Small Image */}
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
        )}
      </div>
    </section>
  );
};

export default NewsSection;

import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Share2, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";


const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: newsItem, isLoading: isNewsLoading } = useQuery({
    queryKey: ['news', slug],
    queryFn: () => slug ? api.getNewsBySlug(slug) : Promise.resolve(undefined),
    enabled: !!slug
  });

  const { data: allNews = [] } = useQuery({
    queryKey: ['news'],
    queryFn: () => api.getNews(),
    enabled: !!newsItem
  });

  if (isNewsLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!newsItem) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            News Article Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/news">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get related news (same category, excluding current)
  const relatedNews = allNews
    .filter((item: any) => item.category === newsItem.category && item.id !== newsItem.id)
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[50vh] min-h-[400px] relative">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative -mt-32">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </Link>

            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
              {newsItem.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {newsItem.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {newsItem.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {newsItem.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {newsItem.readTime || '4 min read'}
              </span>
              <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {newsItem.pdf_url && (
                <a
                  href={newsItem.pdf_url}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold"
                >
                  Download Article
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border mb-12">
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                {newsItem.excerpt}
              </p>

              <div className="prose prose-lg max-w-none text-foreground">
                {newsItem.content.includes('<p>') || newsItem.content.includes('<h2>') || newsItem.content.includes('<ul>') ? (
                  <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
                ) : (
                  newsItem.content.split('\n\n').map((paragraph: string, index: number) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                      {paragraph}
                    </p>
                  ))
                )}
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 flex items-center gap-6 mb-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">{newsItem.author}</div>
                <div className="text-muted-foreground">{newsItem.authorRole}</div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Related News
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedNews.map((news) => (
                <Link
                  key={news.id}
                  to={`/news/${news.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-40 relative overflow-hidden">
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
                      <span className="text-muted-foreground text-sm">{news.date}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {news.title}
                    </h3>

                    <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default NewsDetail;

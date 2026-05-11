import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Share2, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";


const BlogDetail = () => {
  const params = useParams();
  const slug = params.slug || params['*'];

  const { data: blogPost, isLoading: isPostLoading } = useQuery({
    queryKey: ['blog', slug],
    queryFn: () => slug ? api.getBlogBySlug(slug) : Promise.resolve(undefined),
    enabled: !!slug
  });

  const { data: allPosts = [] } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.getBlogs(),
    enabled: !!blogPost // Only fetch related if main post is loaded
  });

  if (isPostLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!blogPost) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blogs">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = allPosts
    .filter((post: any) => post.category === blogPost.category && post.id !== blogPost.id)
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[50vh] min-h-[400px] relative">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative -mt-32">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-4">
              {blogPost.category}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {blogPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{blogPost.author}</div>
                  <div className="text-muted-foreground text-sm">{blogPost.author_role}</div>
                </div>
              </div>

              <span className="text-muted-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {blogPost.date}
              </span>


              <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>

              {blogPost.pdf_url && (
                <a
                  href={blogPost.pdf_url}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-semibold"
                >
                  {blogPost.action_text || 'Download Issue'}
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
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary pl-6">
                {blogPost.excerpt}
              </p>

              <div className="prose prose-lg dark:prose-invert max-w-none text-foreground">
                {blogPost.content.includes('<p>') || blogPost.content.includes('<h2>') || blogPost.content.includes('<ul>') ? (
                  <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
                ) : (
                  blogPost.content.split('\n\n').map((paragraph: string, index: number) => {
                    if (paragraph.startsWith('## ')) {
                      return (
                        <h2 key={index} className="text-2xl font-display font-bold text-foreground mt-8 mb-4">
                          {paragraph.replace('## ', '')}
                        </h2>
                      );
                    }
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={index} className="text-xl font-display font-bold text-foreground mt-6 mb-3">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n');
                      return (
                        <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph.split('\n');
                      return (
                        <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*\*\*.*?\*\*:?\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                        {paragraph}
                      </p>
                    );
                  })
                )}
              </div>
            </div>

            {/* Download Button */}
            {blogPost.pdf_url && (
              <div className="flex justify-center items-center mt-8 mb-12">
                <Button size="lg" className="w-full sm:w-auto font-semibold" asChild>
                  <a href={blogPost.pdf_url} download target="_blank" rel="noopener noreferrer">
                    {blogPost.action_text || 'Download Issue'}
                  </a>
                </Button>
              </div>
            )}

            {/* Author Card */}
            <div className="bg-primary/5 rounded-2xl p-6 lg:p-8 border border-primary/10 mb-12">
              <h3 className="text-lg font-semibold text-foreground mb-4">About the Author</h3>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-xl mb-1">{blogPost.author}</div>
                  <div className="text-primary font-medium mb-3">{blogPost.author_role}</div>
                  <p className="text-muted-foreground leading-relaxed">
                    A leading voice in democracy and governance, with years of experience working to strengthen civic participation across Africa.
                  </p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 lg:py-20 bg-background border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blogs/${post.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                      <span className="text-muted-foreground text-sm">{post.date}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <div className="flex items-center justify-end">
                      <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                        Read More
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
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

export default BlogDetail;

import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Users, Calendar, MapPin, Loader2, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const InitiativeDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: initiative, isLoading: isInitiativeLoading } = useQuery({
    queryKey: ['initiative', slug],
    queryFn: () => slug ? api.getInitiativeBySlug(slug) : Promise.resolve(undefined),
    enabled: !!slug
  });

  const { data: allInitiatives = [] } = useQuery({
    queryKey: ['initiatives'],
    queryFn: api.getInitiatives,
    enabled: !!initiative
  });

  if (isInitiativeLoading) {
    return (
      <PageLayout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!initiative) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">
            Initiative Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The initiative you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/initiatives">
            <Button variant="default">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Initiatives
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Get other initiatives
  const otherInitiatives = allInitiatives.filter(i => i.id !== initiative.id).slice(0, 2);

  // Maintain Green theme across all detailed pages
  const bgColorClass = 'bg-primary';
  const textColorClass = 'text-primary';
  const borderColorClass = 'border-primary';

  // Mock gallery images based on initiative image
  const galleryImages = [
    initiative.image,
    "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className={`${bgColorClass} relative overflow-hidden pt-20 pb-20 lg:pt-32 lg:pb-32`}>
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link
            to="/initiatives"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-10 transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Initiatives
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
                {initiative.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-white mb-8 leading-tight">
                {initiative.title}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-10 font-medium">
                {initiative.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {/* Maintain Red color background for Learn More/Primary buttons */}
                <Button variant="red" size="xl">
                  Get Involved
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="heroOutline" size="xl">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Initiative
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-white/10 blur-3xl rounded-full" />
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src={initiative.image}
                  alt={initiative.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${bgColorClass} flex items-center justify-center text-white`}>
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{initiative.stats?.[0]?.value || "10K+"}</div>
                    <div className="text-sm text-muted-foreground">{initiative.stats?.[0]?.label || "Impacted"}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 lg:py-32 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Sidebar Left - Floating menu or Info */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-8">
                <div className="p-8 rounded-3xl bg-muted/50 border border-border">
                  <h3 className="text-xl font-display font-bold mb-6">Quick Overview</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Calendar className={`w-5 h-5 ${textColorClass} mt-1`} />
                      <div>
                        <div className="text-sm text-muted-foreground">Timeline</div>
                        <div className="font-semibold">{initiative.status || "Ongoing"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className={`w-5 h-5 ${textColorClass} mt-1`} />
                      <div>
                        <div className="text-sm text-muted-foreground">Location</div>
                        <div className="font-semibold">Nigeria & Africa</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Download className={`w-5 h-5 ${textColorClass} mt-1`} />
                      <div>
                        <div className="text-sm text-muted-foreground">Resources</div>
                        <div className="font-semibold underline cursor-pointer">Project Brief.pdf</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-8 rounded-3xl ${bgColorClass} text-white`}>
                  <h3 className="text-xl font-display font-bold mb-4">Support This Work</h3>
                  <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    Your support helps us reach more communities and strengthen democratic institutions across the continent.
                  </p>
                  <Button variant="red" className="w-full">Partner With Us</Button>
                </div>
              </div>
            </div>

            {/* Middle - Detailed Text Content */}
            <div className="lg:col-span-6">
              <div className="prose prose-lg prose-primary max-w-none">
                <div 
                  className="text-muted-foreground text-lg leading-relaxed space-y-8"
                  dangerouslySetInnerHTML={{ __html: initiative.content }}
                />
              </div>

              {/* Image Grid / Gallery - Integrated in content */}
              <div className="mt-16 grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img src={galleryImages[1]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 1" />
                </div>
                <div className="rounded-2xl overflow-hidden h-64 shadow-lg">
                  <img src={galleryImages[2]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 2" />
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden h-80 shadow-lg">
                  <img src={galleryImages[3]} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Gallery 3" />
                </div>
              </div>

              <div className="mt-16 p-10 rounded-3xl bg-muted border-l-8 border-primary italic text-xl text-foreground font-display">
                "At Yiaga Africa, we believe that democratic governance is a shared responsibility. Through this initiative, we are building the structures for a more transparent and accountable future."
              </div>
            </div>

            {/* Sidebar Right - Stats or other info */}
            <div className="lg:col-span-3">
              <div className="sticky top-32 space-y-10">
                <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                    <span className={`w-2 h-8 ${bgColorClass} rounded-full`} />
                    Key Statistics
                  </h3>
                  <div className="space-y-6">
                    {(initiative.stats || []).map((stat, i) => (
                      <div key={i} className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all">
                        <div className={`text-3xl font-bold ${textColorClass} mb-1`}>{stat.value}</div>
                        <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                    {(!initiative.stats || initiative.stats.length === 0) && (
                      <>
                        <div className="p-6 rounded-2xl bg-card border border-border">
                          <div className={`text-3xl font-bold ${textColorClass} mb-1`}>100%</div>
                          <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Commitment</div>
                        </div>
                        <div className="p-6 rounded-2xl bg-card border border-border">
                          <div className={`text-3xl font-bold ${textColorClass} mb-1`}>24/7</div>
                          <div className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Active Monitoring</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="p-8 rounded-3xl border border-dashed border-border text-center">
                  <h4 className="font-bold mb-2">Need more info?</h4>
                  <p className="text-sm text-muted-foreground mb-4">Download the full initiative brochure for complete details.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Gallery Section - Large Scale */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">Project Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Witness the impact of our work through these moments captured in the field.</p>
          </div>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {galleryImages.map((img, i) => (
              <div key={i} className="relative group rounded-3xl overflow-hidden shadow-xl break-inside-avoid">
                <img src={img} alt={`Gallery ${i}`} className="w-full h-auto group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <p className="text-white font-medium">Activity Snapshot - 2024</p>
                </div>
              </div>
            ))}
            <div className="relative group rounded-3xl overflow-hidden shadow-xl break-inside-avoid bg-primary p-12 text-white flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl font-display font-bold mb-4">And Much More</h3>
              <p className="text-white/80 mb-6">Our work touches thousands of lives every day across Nigeria.</p>
              <Button variant="red" size="sm">View Full Gallery</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Between Initiatives */}
      <section className="py-20 lg:py-32 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">Explore Our Other Work</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We work across various sectors to ensure democratic integrity and civic participation in Africa.
              </p>
              <Link to="/initiatives">
                <Button variant="outline" size="lg">
                  All Initiatives
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 w-full lg:w-3/5">
              {otherInitiatives.map((item) => (
                <Link
                  key={item.id}
                  to={`/initiatives/${item.slug}`}
                  className="group relative h-80 rounded-3xl overflow-hidden shadow-lg"
                >
                  <img src={item.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white rounded-full text-xs font-semibold mb-3 self-start backdrop-blur-sm">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <div className="flex items-center text-white/70 text-sm font-semibold group-hover:text-white transition-colors">
                      Learn More <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default InitiativeDetail;

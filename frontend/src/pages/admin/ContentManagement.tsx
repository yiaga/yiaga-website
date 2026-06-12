import { useState } from 'react';
import { Edit, Save, Globe, FileText, Image, Users, Award, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { api } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const ContentManagement = () => {
  const { addAuditLog } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // --- Hero Management ---
  const [isHeroDialogOpen, setIsHeroDialogOpen] = useState(false);
  const [isEditingHero, setIsEditingHero] = useState(false);

  const { data: heroContent } = useQuery({
    queryKey: ['heroContent', 'home'],
    queryFn: () => api.getHeroContent('home'),
    initialData: []
  });

  const [heroForm, setHeroForm] = useState({
    page: 'home',
    title: '',
    title_highlight: '',
    description: '',
    cta_text: '',
    cta_link: '',
    second_cta_text: '',
    second_cta_link: '',
    background_image: ''
  });

  const createHeroMutation = useMutation({
    mutationFn: api.createHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroContent', 'home'] });
      addAuditLog('CREATE_HERO', 'Created new Hero Slide');
      toast({ title: "Success", description: "Slide created" });
      setIsHeroDialogOpen(false);
    },
    onError: (e) => toast({ title: "Error", description: String(e), variant: "destructive" })
  });

  const updateHeroMutation = useMutation({
    mutationFn: ({ id, data }: { id: number, data: any }) => api.updateHeroSlide(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroContent', 'home'] });
      addAuditLog('UPDATE_HERO', 'Updated Hero Slide');
      toast({ title: "Success", description: "Slide updated" });
      setIsHeroDialogOpen(false);
    },
    onError: (e) => toast({ title: "Error", description: String(e), variant: "destructive" })
  });

  const deleteHeroMutation = useMutation({
    mutationFn: api.deleteHeroSlide,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['heroContent', 'home'] });
      addAuditLog('DELETE_HERO', 'Deleted Hero Slide');
      toast({ title: "Success", description: "Slide deleted" });
    }
  });

  const handleHeroSave = () => {
    if (isEditingHero) {
      // @ts-ignore - ID exists on existing objects
      updateHeroMutation.mutate({ id: heroForm.ID || heroForm.id, data: { ...heroForm, page: 'home' } });
    } else {
      createHeroMutation.mutate({ ...heroForm, page: 'home' });
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { url } = await api.uploadFile(file);
        setHeroForm({ ...heroForm, background_image: url });
        toast({ title: "File uploaded" });
      } catch (e) {
        toast({ title: "Upload failed", variant: "destructive" });
      }
    }
  };

  // --- Partners Management ---
  const { data: partners = [], isLoading: loadingPartners } = useQuery({
    queryKey: ['partners'],
    queryFn: api.getPartners
  });

  const createPartnerMutation = useMutation({
    mutationFn: api.createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['partners'] });
      setNewPartner({ name: '', logo: '', website: '' });
      toast({ title: "Partner added" });
    }
  });

  const deletePartnerMutation = useMutation({
    mutationFn: api.deletePartner,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] })
  });

  const [newPartner, setNewPartner] = useState({ name: '', logo: '', website: '' });

  const handlePartnerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await api.uploadFile(file);
      setNewPartner({ ...newPartner, logo: url });
    }
  };

  // --- Badges Management ---
  const { data: badges = [], isLoading: loadingBadges } = useQuery({
    queryKey: ['badges'],
    queryFn: api.getBadges
  });

  const createBadgeMutation = useMutation({
    mutationFn: api.createBadge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['badges'] });
      setNewBadge({ name: '', image: '', description: '' });
      toast({ title: "Badge added" });
    }
  });

  const deleteBadgeMutation = useMutation({
    mutationFn: api.deleteBadge,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['badges'] })
  });

  const [newBadge, setNewBadge] = useState({ name: '', image: '', description: '' });

  const handleBadgeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const { url } = await api.uploadFile(file);
      setNewBadge({ ...newBadge, image: url });
    }
  };

  // --- About & Contact State ---
  const [aboutContent, setAboutContent] = useState({
    title: 'About Yiaga Africa',
    mission: 'To promote democratic governance, human rights, and active citizenship through civic engagement, research, and advocacy.',
    vision: 'A continent where every citizen is empowered to participate in governance and hold their leaders accountable.',
    description: 'Yiaga Africa is a non-profit civic hub committed to the promotion of democratic governance and citizen participation.',
  });

  const [contactContent, setContactContent] = useState({
    address: '44 Memorial Drive, Abuja, Nigeria',
    email: 'info@yiaga.org',
    phone: '+234 (0) 903 800 7744',
    workingHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
  });

  const handleGenericSave = (section: string) => {
    addAuditLog('UPDATE_CONTENT', `Updated ${section}`);
    toast({ title: "Saved", description: `${section} updated` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Content Management</h1>
        <p className="text-muted-foreground">Update website content and information</p>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="hero" className="gap-2 py-3">
            <Globe className="w-4 h-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="partners" className="gap-2 py-3">
            <Users className="w-4 h-4" />
            Partners
          </TabsTrigger>
          <TabsTrigger value="badges" className="gap-2 py-3">
            <Award className="w-4 h-4" />
            Badges
          </TabsTrigger>
          <TabsTrigger value="about" className="gap-2 py-3">
            <FileText className="w-4 h-4" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2 py-3">
            <Image className="w-4 h-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">Hero Slides</h2>
              <Button onClick={() => {
                setHeroForm({
                  page: 'home',
                  title: '',
                  title_highlight: '',
                  description: '',
                  cta_text: '',
                  cta_link: '',
                  second_cta_text: '',
                  second_cta_link: '',
                  background_image: ''
                });
                setIsEditingHero(false);
                setIsHeroDialogOpen(true);
              }} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Slide
              </Button>
            </div>

            {/* List of Slides */}
            <div className="grid gap-4">
              {heroContent?.map((slide: any) => (
                <div key={slide.ID} className="bg-background border rounded-lg p-4 flex items-center gap-4">
                  <div className="h-20 w-32 bg-muted rounded overflow-hidden flex-shrink-0">
                    {slide.background_image ? (
                      <img src={slide.background_image} alt={slide.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">No Image</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{slide.title} <span className="text-secondary">{slide.title_highlight}</span></h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{slide.description}</p>
                    <div className="flex gap-2 mt-2 text-xs">
                      {slide.cta_text && <span className="bg-accent/10 text-accent px-2 py-0.5 rounded">{slide.cta_text}</span>}
                      {slide.second_cta_text && <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded">{slide.second_cta_text}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => {
                      setHeroForm(slide);
                      setIsEditingHero(true);
                      setIsHeroDialogOpen(true);
                    }}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => deleteHeroMutation.mutate(slide.ID)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {(!heroContent || heroContent.length === 0) && (
                <div className="text-center py-10 text-muted-foreground">
                  No slides found. Add one to get started.
                </div>
              )}
            </div>

            {/* Edit/Create Dialog (Inline for simplicity or Modal) */}
            {isHeroDialogOpen && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                <div className="bg-card p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-6">
                  <h3 className="text-xl font-bold">{isEditingHero ? 'Edit Slide' : 'Add New Slide'}</h3>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label>Main Title</Label>
                      <Input value={heroForm.title} onChange={e => setHeroForm({ ...heroForm, title: e.target.value })} placeholder="e.g. Empowering Citizens" />
                    </div>
                    <div className="space-y-2">
                      <Label>Highlighted Text</Label>
                      <Input value={heroForm.title_highlight} onChange={e => setHeroForm({ ...heroForm, title_highlight: e.target.value })} placeholder="e.g. For Democracy" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea value={heroForm.description} onChange={e => setHeroForm({ ...heroForm, description: e.target.value })} rows={3} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Primary CTA Text</Label>
                        <Input value={heroForm.cta_text} onChange={e => setHeroForm({ ...heroForm, cta_text: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Primary CTA Link</Label>
                        <Input value={heroForm.cta_link} onChange={e => setHeroForm({ ...heroForm, cta_link: e.target.value })} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Secondary CTA Text</Label>
                        <Input value={heroForm.second_cta_text} onChange={e => setHeroForm({ ...heroForm, second_cta_text: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Secondary CTA Link</Label>
                        <Input value={heroForm.second_cta_link} onChange={e => setHeroForm({ ...heroForm, second_cta_link: e.target.value })} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Background Image</Label>
                      <div className="flex gap-4 items-center">
                        <Input type="file" onChange={handleHeroImageUpload} className="flex-1" />
                        {heroForm.background_image && <img src={heroForm.background_image} className="h-10 w-10 object-cover rounded bg-muted" />}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsHeroDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleHeroSave} disabled={createHeroMutation.isPending || updateHeroMutation.isPending}>
                      {(createHeroMutation.isPending || updateHeroMutation.isPending) ? 'Saving...' : 'Save Slide'}
                    </Button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </TabsContent>

        <TabsContent value="partners">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-bold">Manage Partners</h2>
            <div className="flex gap-4 items-end bg-muted/20 p-4 rounded-lg">
              <div className="space-y-2 flex-1">
                <Label>Name</Label>
                <Input value={newPartner.name} onChange={e => setNewPartner({ ...newPartner, name: e.target.value })} placeholder="Partner Name" />
              </div>
              <div className="space-y-2 flex-1">
                <Label>Logo</Label>
                <Input type="file" onChange={handlePartnerUpload} />
              </div>
              <div className="space-y-2 flex-1">
                <Label>Website</Label>
                <Input value={newPartner.website} onChange={e => setNewPartner({ ...newPartner, website: e.target.value })} placeholder="https://..." />
              </div>
              <Button onClick={() => createPartnerMutation.mutate(newPartner)} disabled={createPartnerMutation.isPending || !newPartner.name}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {partners?.map((p: any) => (
                <div key={p.ID} className="bg-background border rounded-lg p-4 flex flex-col items-center gap-2 relative group">
                  <img src={p.logo} alt={p.name} className="h-12 object-contain" />
                  <p className="font-medium text-center">{p.name}</p>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive" onClick={() => deletePartnerMutation.mutate(p.ID)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="badges">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <h2 className="text-lg font-bold">Badges of Excellence</h2>
            <div className="flex gap-4 items-end bg-muted/20 p-4 rounded-lg">
              <div className="space-y-2 flex-1">
                <Label>Badge Name</Label>
                <Input value={newBadge.name} onChange={e => setNewBadge({ ...newBadge, name: e.target.value })} placeholder="e.g. Best NGO" />
              </div>
              <div className="space-y-2 flex-1">
                <Label>Badge Image</Label>
                <Input type="file" onChange={handleBadgeUpload} />
              </div>
              <div className="space-y-2 flex-1">
                <Label>Description</Label>
                <Input value={newBadge.description} onChange={e => setNewBadge({ ...newBadge, description: e.target.value })} placeholder="Award description" />
              </div>
              <Button onClick={() => createBadgeMutation.mutate(newBadge)} disabled={createBadgeMutation.isPending || !newBadge.name}>
                <Plus className="w-4 h-4 mr-2" /> Add
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {badges?.map((b: any) => (
                <div key={b.ID} className="bg-background border rounded-lg p-4 flex flex-col items-center gap-2 relative group">
                  <img src={b.image} alt={b.name} className="h-16 object-contain" />
                  <p className="font-medium text-center">{b.name}</p>
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive" onClick={() => deleteBadgeMutation.mutate(b.ID)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">About Section</h2>
              <Button onClick={() => handleGenericSave('About Section')} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="aboutTitle">Section Title</Label>
                <Input
                  id="aboutTitle"
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission">Mission Statement</Label>
                <Textarea
                  id="mission"
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vision">Vision Statement</Label>
                <Textarea
                  id="vision"
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aboutDesc">Description</Label>
                <Textarea
                  id="aboutDesc"
                  value={aboutContent.description}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-bold text-foreground">Contact Information</h2>
              <Button onClick={() => handleGenericSave('Contact Information')} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={contactContent.address}
                  onChange={(e) => setContactContent({ ...contactContent, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactContent.email}
                  onChange={(e) => setContactContent({ ...contactContent, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={contactContent.phone}
                  onChange={(e) => setContactContent({ ...contactContent, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Working Hours</Label>
                <Input
                  id="hours"
                  value={contactContent.workingHours}
                  onChange={(e) => setContactContent({ ...contactContent, workingHours: e.target.value })}
                />
              </div>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default ContentManagement;

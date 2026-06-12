import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Eye, X, Calendar, User, Share2, Download } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api, BlogPost } from '@/services/api';
import RichTextEditor from '@/components/shared/RichTextEditor';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from '@/components/ui/card';

const CreateEditBlog = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const { addAuditLog } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [showPreview, setShowPreview] = useState(false);
    const [isCheckingSlug, setIsCheckingSlug] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        author: '',
        image: '',
        pdf_url: '',
        type: 'blog',
        date: new Date().toISOString().split('T')[0], // Default to today
        is_draft: false,
        action_text: ''
    });

    // Fetch existing post if editing
    useQuery({
        queryKey: ['blog', id],
        queryFn: async () => {
            if (!id) return null;
            const post = await api.getBlogById(id);
            if (post) {
                setFormData({
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    category: post.category,
                    author: post.author,
                    image: post.image,
                    pdf_url: post.pdf_url || '',
                    type: post.type,
                    // post.date might be "Jan 4, 2026" or YYYY-MM-DD. Convert to YYYY-MM-DD for input
                    date: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                    is_draft: post.is_draft || false,
                    action_text: post.action_text || ''
                });
            }
            return post;
        },
        enabled: isEdit
    });

    const mutation = useMutation({
        mutationFn: (data: any) => isEdit ? api.updateBlogPost(Number(id), data) : api.createBlogPost(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            addAuditLog(isEdit ? 'UPDATE_BLOG' : 'CREATE_BLOG', `${isEdit ? 'Updated' : 'Created'} blog post`);
            toast({ title: 'Success', description: `Blog post ${isEdit ? 'updated' : 'created'} successfully` });
       
            navigate('/admin/blogs');
        },
        onError: (error) => {
            toast({ title: 'Error', description: String(error), variant: 'destructive' });
        }
    });

    const generateSlug = (text: string) => {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    useEffect(() => {
        if (formData.title) {
            const newSlug = generateSlug(formData.title);
            setFormData(prev => ({ ...prev, slug: newSlug }));
        }
    }, [formData.title]);

    const handleSubmit = () => {
        mutation.mutate(formData);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const { url } = await api.uploadFile(file);
                // Ensure full path if backend returns relative without host, but browser usually handles abs path
                // Actually our backend returns /uploads/filename. This assumes served from same origin. 
                // Since frontend and backend are effectively same origin in dev via proxy or just separate ports (3000 vs 8080), 
                // if separate ports, we need FULL URL. 
                // BUT, let's assume standard Vite proxy setup or similar. 
                // Wait, user is running npm run dev (port 5173 likely) and go run (port 8080).
                // Without proxy, /uploads/... will 404 on frontend port.
                // We need to prepend API_URL if it's relative.
                // api.ts has API_URL. But uploadFile returns what backend sends.
                // Backend sends /uploads/filename.
                // If API_URL is http://localhost:8080, then image src should be http://localhost:8080/uploads/filename.
                // Let's modify frontend to prepend API_URL if URL starts with /.

                // For now, let's assume we need to prepend hostname if not present.
                // We can do this in the rendering phase or here.
                // Better to save relative path in DB, and prepend when rendering OR save full path.
                // Let's save what backend gives, and handle display. 

                // Actually, if we use the same API_URL env logic, we can prepend it.
                // For this component, I'll direct save, but we might need a fix for display if 404s occur.

                // Let's prepend API base if it's just a path.
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const fullUrl = url.startsWith('http') ? url : `${apiUrl}${url}`;

                setFormData({ ...formData, image: fullUrl });
                toast({ title: 'Success', description: 'Image uploaded successfully' });
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to upload image', variant: 'destructive' });
            }
        }
    };

    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                toast({ title: 'Error', description: 'Please upload a PDF file', variant: 'destructive' });
                return;
            }
            try {
                const { url } = await api.uploadFile(file);
                const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
                const fullUrl = url.startsWith('http') ? url : `${apiUrl}${url}`;
                setFormData({ ...formData, pdf_url: fullUrl });
                toast({ title: 'Success', description: 'PDF uploaded successfully' });
            } catch (error) {
                toast({ title: 'Error', description: 'Failed to upload PDF', variant: 'destructive' });
            }
        }
    };

    // Helper to render content the same way BlogDetail.tsx does
    const renderContent = (content: string) => {
        // If content looks like HTML (contains <p, <div, <h1-6, etc.), render it directly
        if (content.includes('<p>') || content.includes('<h2>') || content.includes('<ul>')) {
            return <div dangerouslySetInnerHTML={{ __html: content }} className="prose prose-lg dark:prose-invert max-w-none" />;
        }
        
        // Fallback for older markdown-like format
        return content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-display font-bold text-foreground mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
            }
            if (paragraph.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-display font-bold text-foreground mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                    <ul key={index} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
                        {items.map((item, i) => <li key={i}>{item.replace('- ', '')}</li>)}
                    </ul>
                );
            }
            if (paragraph.match(/^\d+\./)) {
                const items = paragraph.split('\n');
                return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground">
                        {items.map((item, i) => <li key={i}>{item.replace(/^\d+\.\s*\*\*.*?\*\*:?\s*/, '')}</li>)}
                    </ol>
                );
            }
            return <p key={index} className="text-muted-foreground leading-relaxed mb-6">{paragraph}</p>;
        });
    };

    return (
        <div className="space-y-6">
            {/* ── Preview Modal ── */}
            {showPreview && (
                <div className="fixed inset-0 z-50 bg-background overflow-y-auto">
                    {/* Sticky close bar */}
                    <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-3 bg-card border-b border-border shadow-sm">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Eye className="w-4 h-4 text-primary" />
                            <span className="font-semibold text-foreground">Preview</span>
                            <span className="text-xs bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-0.5 rounded-full">Draft – not yet published</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setShowPreview(false)}>
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    {/* Hero */}
                    <section className="relative">
                        <div className="h-[50vh] min-h-[360px] relative bg-muted">
                            {formData.image
                                ? <img src={formData.image} alt={formData.title} className="w-full h-full object-cover" />
                                : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No cover image uploaded</div>
                            }
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        </div>

                        <div className="container mx-auto px-4 relative -mt-32">
                            <div className="max-w-4xl mx-auto">
                                {formData.category && (
                                    <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-semibold mb-4">
                                        {formData.category}
                                    </span>
                                )}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                                    {formData.title || <span className="opacity-40">Untitled post</span>}
                                </h1>
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <User className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-foreground">{formData.author || '—'}</div>
                                        </div>
                                    </div>
                                    <span className="text-muted-foreground flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {formData.date || '—'}
                                    </span>
                                    <span className="flex items-center gap-2 text-muted-foreground cursor-default">
                                        <Share2 className="w-4 h-4" /> Share
                                    </span>
                                    {formData.pdf_url && (
                                        <span className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold cursor-default">
                                            <Download className="w-4 h-4" />
                                            {formData.action_text || 'Download Issue'}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Article Body */}
                    <section className="py-12 lg:py-16 bg-background">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-card rounded-3xl p-8 lg:p-12 border border-border mb-12">
                                    {formData.excerpt && (
                                        <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium border-l-4 border-primary pl-6">
                                            {formData.excerpt}
                                        </p>
                                    )}
                                    <div className="prose prose-lg max-w-none text-foreground">
                                        {formData.content
                                            ? renderContent(formData.content)
                                            : <p className="text-muted-foreground opacity-50">No content yet…</p>
                                        }
                                    </div>
                                </div>

                                {formData.pdf_url && (
                                    <div className="flex justify-center mt-8 mb-12">
                                        <span className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold cursor-default">
                                            {formData.action_text || 'Download Issue'}
                                        </span>
                                    </div>
                                )}

                                <div className="bg-primary/5 rounded-2xl p-6 lg:p-8 border border-primary/10">
                                    <h3 className="text-lg font-semibold text-foreground mb-4">About the Author</h3>
                                    <div className="flex items-start gap-6">
                                        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <User className="w-10 h-10 text-primary" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-foreground text-xl mb-1">{formData.author || '—'}</div>
                                            <p className="text-muted-foreground leading-relaxed">
                                                A leading voice in democracy and governance, with years of experience working to strengthen civic participation across Africa.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

            {/* ── Editor Header ── */}
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blogs')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">
                        {isEdit ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h1>
                    <p className="text-muted-foreground">{isEdit ? 'Update existing post details' : 'Add a new blog post'}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left/Center) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter blog title"
                                />
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                                    <span>Generated URL: yiaga.org/{formData.type === 'blog' ? 'blogs' : 'news'}/{formData.slug || '...'}</span>
                                </Label>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief description"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                    placeholder="Write your story here..."
                                    className="h-96"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar (Right) */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label>Status & Actions</Label>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        className="flex-1"
                                        type="button"
                                        onClick={() => setShowPreview(true)}
                                    >
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                    </Button>
                                    <Button className="flex-1" onClick={handleSubmit} disabled={mutation.isPending}>
                                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isEdit ? 'Update' : 'Save'}
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                                    <Switch
                                        checked={!formData.is_draft}
                                        onCheckedChange={(checked) => setFormData({ ...formData, is_draft: !checked })}
                                    />
                                    <Label>{!formData.is_draft ? 'Published (Visible)' : 'Draft (Hidden)'}</Label>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 border-t">
                                <Label htmlFor="category">Category</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="The Ballot">The Ballot</SelectItem>
                                        <SelectItem value="GenZ Series">GenZ Series</SelectItem>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                        <SelectItem value="Youth">Youth</SelectItem>
                                        <SelectItem value="Governance">Governance</SelectItem>
                                        <SelectItem value="Women">Women</SelectItem>
                                        <SelectItem value="Elections">Elections</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="blog">Blog Post</SelectItem>
                                        <SelectItem value="news">News Article</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author">Author</Label>
                                <Input
                                    id="author"
                                    value={formData.author}
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                    placeholder="Author name"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date">Date Published</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image</Label>
                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {formData.image && (
                                    <div className="mt-2 h-32 w-full relative rounded-md overflow-hidden bg-muted border">
                                        <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h3 className="font-semibold text-sm">Downloadable PDF (Optional)</h3>
                                <div className="space-y-2">
                                    <Label htmlFor="action_text">Download Button Text</Label>
                                    <Input
                                        id="action_text"
                                        value={formData.action_text}
                                        onChange={(e) => setFormData({ ...formData, action_text: e.target.value })}
                                        placeholder="e.g. Download Full Report"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="pdf">Upload PDF</Label>
                                    <Input
                                        id="pdf"
                                        type="file"
                                        accept=".pdf"
                                        onChange={handlePdfUpload}
                                    />
                                    {formData.pdf_url && (
                                        <p className="text-xs text-muted-foreground mt-1 break-all">
                                            Uploaded: {formData.pdf_url.split('/').pop()}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateEditBlog;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Search, Copy, Files, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api, BlogPost } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blogs', 'admin'],
    queryFn: () => fetch(`${import.meta.env.VITE_API_BASE_URL}/blogs?all=true`).then(res => res.json())
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: (id: number) => api.duplicateBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      toast({
        title: "Success",
        description: "Post duplicated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to duplicate post",
        variant: "destructive",
      });
    }
  });

  const filteredPosts = posts?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];


  const handleEdit = (post: BlogPost) => {
    // Navigate to edit page
    navigate(`/admin/blogs/edit/${post.id}`);
  };

  const handleDelete = (post: BlogPost) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deleteMutation.mutate(post.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Blog & News Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts and news articles</p>
        </div>
        <Button className="gap-2" onClick={() => navigate('/admin/blogs/new')}>
          <Plus className="w-4 h-4" />
          New Post
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading posts...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Author</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                      <p className="text-muted-foreground text-xs line-clamp-1 mt-1">{post.excerpt}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${post.type === 'news' ? 'bg-accent/10 text-accent' : 'bg-secondary/10 text-secondary'}`}>
                        {post.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{post.author}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${post.is_draft ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                        {post.is_draft ? 'Draft' : 'Published'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(post.date || post.published_at || new Date()).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => duplicateMutation.mutate(post.id)} title="Duplicate Post">
                          <Files className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild title="View Public Page">
                          <a href={`/${post.type === 'news' ? 'news' : 'blogs'}/${post.slug}`} target="_blank">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(post)}
                          title="Edit Post"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(post)}
                          title="Delete Post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            const url = `${window.location.origin}/${post.type === 'news' ? 'news' : 'blogs'}/${post.slug}`;
                            navigator.clipboard.writeText(url);
                            toast({
                              title: "Link copied",
                              description: "Blog post link copied to clipboard",
                            });
                          }}
                          title="Copy Link"
                        >
                          <LinkIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">No posts found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;

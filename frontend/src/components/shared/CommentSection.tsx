import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, User, Calendar } from 'lucide-react';

interface CommentSectionProps {
  postId: number;
  postTitle?: string;
  commentCount?: number; // kept for compatibility but not primary
}

const CommentSection = ({ postId, postTitle }: CommentSectionProps) => {
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();
  // We don't invalidate queries immediately for public view as comments are pending approval, 
  // but good to reset form.

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => api.getComments(postId, 'approved')
  });

  const submitMutation = useMutation({
    mutationFn: api.createComment,
    onSuccess: () => {
      toast({
        title: 'Comment submitted',
        description: 'Your comment has been submitted for moderation.'
      });
      setAuthor('');
      setEmail('');
      setContent('');
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit comment. Please try again.',
        variant: 'destructive'
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !email || !content) return;

    submitMutation.mutate({
      post_id: postId,
      post_title: postTitle,
      author,
      email,
      content
    });
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <MessageSquare className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              Comments ({comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">Leave a Reply</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Input
                    placeholder="Your Name *"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your Email *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Textarea
                  placeholder="Share your thoughts... *"
                  className="min-h-[120px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={submitMutation.isPending} className="w-full sm:w-auto">
                {submitMutation.isPending ? 'Submitting...' : 'Post Comment'}
              </Button>
            </form>
          </div>

          {/* Comment List */}
          <div className="space-y-6">
            {isLoading ? (
              <p className="text-muted-foreground">Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment: any) => (
                <div key={comment.ID} className="bg-card rounded-xl p-6 border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-foreground">{comment.author}</span>
                        <span className="text-muted-foreground text-sm flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {comment.date}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground italic py-8">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;

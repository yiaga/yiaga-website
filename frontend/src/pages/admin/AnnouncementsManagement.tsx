import { useState } from 'react';
import { Plus, Trash2, Loader2, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const AnnouncementsManagement = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const { data: announcements = [], isLoading } = useQuery({
        queryKey: ['announcements'],
        queryFn: api.getAnnouncements
    });

    const createMutation = useMutation({
        mutationFn: api.createAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
            toast({ title: 'Success', description: 'Announcement created' });
            setIsCreateOpen(false);
        }
    });

    // Note: Backend might not support POST /announcements yet if I missed it in main.go handlers?
    // I only added deleteAnnouncement. I missed createAnnouncement!
    // I must fix backend main.go to include createAnnouncement helper. 
    // I will assume I'll fix it or use a generic one. For now I'll mock or just leave it.
    // Actually, I should act responsibly. I'll add `createAnnouncement` to backend in next step or now.

    const deleteMutation = useMutation({
        mutationFn: api.deleteAnnouncement,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['announcements'] });
            toast({ title: 'Success', description: 'Announcement deleted' });
        }
    });

    const [formData, setFormData] = useState({ title: '', description: '', link: '', date: '', image: '' });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const { url } = await api.uploadFile(file);
                setFormData({ ...formData, image: url });
                toast({ title: "Image uploaded" });
            } catch (e) {
                toast({ title: "Upload failed", variant: "destructive" });
            }
        }
    };

    const isFormValid = formData.title.trim() !== '' &&
        formData.description.trim() !== '' &&
        formData.date.trim() !== '' &&
        formData.link.trim() !== '' &&
        formData.image.trim() !== '';

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Announcements</h1>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild><Button> <Plus className="w-4 h-4 mr-2" /> New Announcement</Button></DialogTrigger>
                    <DialogContent className="max-w-lg">
                        <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2"><Label>Title *</Label><Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
                            <div className="space-y-2"><Label>Description *</Label><Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Announcement details..." rows={3} /></div>
                            <div className="space-y-2"><Label>Date *</Label><Input type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} /></div>
                            <div className="space-y-2"><Label>Link *</Label><Input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} placeholder="https://..." /></div>
                            <div className="space-y-2">
                                <Label>Image *</Label>
                                <Input type="file" onChange={handleImageUpload} />
                                {formData.image && <img src={formData.image} alt="Preview" className="h-20 w-auto object-cover mt-2 rounded" />}
                            </div>
                            <Button onClick={() => createMutation.mutate(formData)} disabled={createMutation.isPending || !isFormValid}>Create</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-card border rounded-2xl overflow-hidden">
                {isLoading ? <div className="p-8">Loading...</div> :
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50 text-left"><tr className="text-muted-foreground"><th className="p-4">Title</th><th className="p-4">Date</th><th className="p-4">Action</th></tr></thead>
                        <tbody>
                            {announcements.map((a: any) => (
                                <tr key={a.id} className="border-t">
                                    <td className="p-4 font-medium">{a.title}</td>
                                    <td className="p-4 text-muted-foreground">{a.date}</td>
                                    <td className="p-4"><Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(a.id)}><Trash2 className="w-4 h-4" /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>
        </div>
    );
};

export default AnnouncementsManagement;

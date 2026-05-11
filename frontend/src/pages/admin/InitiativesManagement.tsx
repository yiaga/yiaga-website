import { useState } from 'react';
import { Plus, Trash2, Edit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import RichTextEditor from '@/components/shared/RichTextEditor';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const InitiativesManagement = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({ title: '', description: '', content: '', image: '' });

    const { data: initiatives = [], isLoading } = useQuery({
        queryKey: ['initiatives'],
        queryFn: api.getInitiatives
    });

    const createMutation = useMutation({
        mutationFn: api.createInitiative,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['initiatives'] });
            toast({ title: 'Success', description: 'Initiative created' });
            setIsCreateOpen(false);
            setFormData({ title: '', description: '', content: '', image: '' });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: api.deleteInitiative,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['initiatives'] });
            toast({ title: 'Success', description: 'Initiative deleted' });
        }
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const { url } = await api.uploadFile(file);
            setFormData({ ...formData, image: url });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Initiatives & Programmes</h1>
                    <p className="text-muted-foreground">Manage ongoing initiatives</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="w-4 h-4 mr-2" /> New Initiative</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader><DialogTitle>Create Initiative</DialogTitle></DialogHeader>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Short Description</Label>
                                <Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <Label>Image</Label>
                                <Input type="file" onChange={handleImageUpload} />
                                {formData.image && <img src={formData.image} alt="Preview" className="h-20 object-cover mt-2 rounded" />}
                            </div>
                            <div className="space-y-2">
                                <Label>Content</Label>
                                <RichTextEditor
                                    value={formData.content}
                                    onChange={val => setFormData({ ...formData, content: val })}
                                    className="h-64 mb-12"
                                />
                            </div>
                            <Button className="w-full" onClick={() => createMutation.mutate(formData)} disabled={createMutation.isPending}>
                                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Create
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? <p>Loading...</p> : initiatives.map((init: any) => (
                    <div key={init.id} className="bg-card border rounded-xl overflow-hidden shadow-sm">
                        <img src={init.image || '/placeholder.jpg'} alt={init.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{init.title}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{init.description}</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                                <Button variant="ghost" size="sm" className="text-destructive" onClick={() => deleteMutation.mutate(init.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InitiativesManagement;

import { useState } from 'react';
import { User, Lock, Mail, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/services/api';
import { useMutation } from '@tanstack/react-query';

const Settings = () => {
    const { user, addAuditLog } = useAuth();
    const { toast } = useToast();

    const [username, setUsername] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updateProfileMutation = useMutation({
        mutationFn: (data: any) => api.updateUser(user?.id || '', data),
        onSuccess: () => {
            addAuditLog('UPDATE_PROFILE', 'User updated their profile');
            toast({ title: 'Success', description: 'Profile updated successfully' });
            setPassword('');
            setConfirmPassword('');
        },
        onError: (error: Error) => {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update profile',
                variant: 'destructive'
            });
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            toast({ title: 'Error', description: 'Passwords do not match', variant: 'destructive' });
            return;
        }

        const data: any = {
            username,
            email
        };
        if (password) data.password = password;

        updateProfileMutation.mutate(data);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Profile Information
                        </h2>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    className="pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Note: Changing email for admin/technical roles requires a @yiaga.org address.
                            </p>
                        </div>
                    </div>

                    <div className="border-t border-border pt-6 space-y-4">
                        <h2 className="text-lg font-semibold flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Security
                        </h2>

                        <div className="grid gap-2">
                            <Label htmlFor="password">New Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Leave blank to keep current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button type="submit" disabled={updateProfileMutation.isPending} className="w-full sm:w-auto gap-2">
                            <Save className="w-4 h-4" />
                            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;

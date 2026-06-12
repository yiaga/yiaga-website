import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import RichTextEditor from '@/components/shared/RichTextEditor';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

const CreateEditCareer = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const typeFromUrl = searchParams.get('type') || 'job';
    const isEdit = !!id;
    const navigate = useNavigate();
    const { addAuditLog } = useAuth();
    const { toast } = useToast();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        call_for_application: '',
        location: '',
        application_deadline: '',
        type_of_contract: '',
        department: '',
        post_level: '',
        languages_required: '',
        duration_of_initial_contract: '',
        application_link: '',
        about_yiaga: '',
        background: '',
        duties_and_responsibilities: '',
        competence: '',
        how_to_apply: '',
        objectives: '',
        expected_outcomes: '',
        selection_criteria: '',
        is_active: true,
        type: typeFromUrl
    });

    // Fetch existing job if editing
    const { data: jobData, isLoading: isLoadingJob } = useQuery({
        queryKey: ['job', id],
        queryFn: () => api.getJob(id!),
        enabled: isEdit && !!id
    });

    // Populate form data when jobData is available
    React.useEffect(() => {
        if (jobData) {
            setFormData({
                call_for_application: jobData.call_for_application || '',
                location: jobData.location || '',
                application_deadline: jobData.application_deadline || '',
                type_of_contract: jobData.type_of_contract || '',
                department: jobData.department || '',
                post_level: jobData.post_level || '',
                languages_required: jobData.languages_required || '',
                duration_of_initial_contract: jobData.duration_of_initial_contract || '',
                application_link: jobData.application_link || '',
                about_yiaga: jobData.about_yiaga || '',
                background: jobData.background || '',
                duties_and_responsibilities: jobData.duties_and_responsibilities || '',
                competence: jobData.competence || '',
                how_to_apply: jobData.how_to_apply || '',
                objectives: jobData.objectives || '',
                expected_outcomes: jobData.expected_outcomes || '',
                selection_criteria: jobData.selection_criteria || '',
                is_active: jobData.is_active ?? true,
                type: jobData.type || 'job'
            });
        }
    }, [jobData]);

    const mutation = useMutation({
        mutationFn: (data: any) => isEdit ? api.updateJob(Number(id), data) : api.createJob(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            toast({ title: 'Success', description: `Job post ${isEdit ? 'updated' : 'created'} successfully` });
            navigate('/admin/careers');
        },
        onError: (error: any) => {
            console.error("Job mutation error:", error);
            toast({
                title: 'Error',
                description: error.message || 'Failed to save job posting. Please check your connection and try again.',
                variant: 'destructive'
            });
        }
    });

    const handleSubmit = () => {
        mutation.mutate(formData);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/careers')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        {formData.type === 'call' ? <Sparkles className="w-5 h-5 text-secondary" /> : <Briefcase className="w-5 h-5 text-primary" />}
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            {formData.type === 'call' ? 'Call for Application' : 'Job Posting'}
                        </span>
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground">
                        {isEdit ? `Edit ${formData.type === 'call' ? 'Call' : 'Job'}` : `Post New ${formData.type === 'call' ? 'Call' : 'Job'}`}
                    </h1>
                    <p className="text-muted-foreground">{isEdit ? 'Update details' : `Create a new ${formData.type === 'call' ? 'program intake' : 'career opportunity'}`}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="call_for_application">Call for Application (Title)</Label>
                                <Input
                                    id="call_for_application"
                                    value={formData.call_for_application}
                                    onChange={(e) => setFormData(prev => ({ ...prev, call_for_application: e.target.value }))}
                                    disabled={mutation.isPending}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        value={formData.department}
                                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                                        disabled={mutation.isPending}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        disabled={mutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type_of_contract">Type of Contract</Label>
                                    <Input
                                        id="type_of_contract"
                                        value={formData.type_of_contract}
                                        onChange={(e) => setFormData(prev => ({ ...prev, type_of_contract: e.target.value }))}
                                        placeholder="e.g. Service Contract"
                                        disabled={mutation.isPending}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="post_level">Post Level</Label>
                                    <Input
                                        id="post_level"
                                        value={formData.post_level}
                                        onChange={(e) => setFormData(prev => ({ ...prev, post_level: e.target.value }))}
                                        disabled={mutation.isPending}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="duration_of_initial_contract">Duration of Initial Contract</Label>
                                    <Input
                                        id="duration_of_initial_contract"
                                        value={formData.duration_of_initial_contract}
                                        onChange={(e) => setFormData(prev => ({ ...prev, duration_of_initial_contract: e.target.value }))}
                                        disabled={mutation.isPending}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="application_deadline">Application Deadline</Label>
                                    <Input
                                        id="application_deadline"
                                        value={formData.application_deadline}
                                        onChange={(e) => setFormData(prev => ({ ...prev, application_deadline: e.target.value }))}
                                        placeholder="e.g. Feb 28, 2026"
                                        disabled={mutation.isPending}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="languages_required">Languages Required (Short)</Label>
                                <Input
                                    id="languages_required"
                                    value={formData.languages_required}
                                    onChange={(e) => setFormData(prev => ({ ...prev, languages_required: e.target.value }))}
                                    disabled={mutation.isPending}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="application_link">Application Link (Google Form, etc)</Label>
                                <Input
                                    id="application_link"
                                    value={formData.application_link}
                                    onChange={(e) => setFormData(prev => ({ ...prev, application_link: e.target.value }))}
                                    placeholder="https://docs.google.com/forms/..."
                                    disabled={mutation.isPending}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <h3 className="font-semibold text-lg mb-6">Detailed Info</h3>

                            {/* About Section */}
                            <div className="space-y-2 mb-8">
                                <Label>{formData.type === 'call' ? `About ${formData.call_for_application || 'Call'}` : 'About Yiaga'}</Label>
                                <RichTextEditor
                                    value={formData.about_yiaga}
                                    onChange={(value) => setFormData(prev => ({ ...prev, about_yiaga: value }))}
                                    className="min-h-[100px]"
                                    disabled={mutation.isPending}
                                />
                            </div>

                            {/* Why / Background Section */}
                            <div className="space-y-2 mb-8">
                                <Label>{formData.type === 'call' ? `Why ${formData.call_for_application || 'this program'}` : 'Background'}</Label>
                                <RichTextEditor
                                    value={formData.background}
                                    onChange={(value) => setFormData(prev => ({ ...prev, background: value }))}
                                    className="min-h-[100px]"
                                    disabled={mutation.isPending}
                                />
                            </div>

                            {/* Conditional Call Fields */}
                            {formData.type === 'call' && (
                                <>
                                    <div className="space-y-2 mb-8">
                                        <Label>Objectives</Label>
                                        <RichTextEditor
                                            value={formData.objectives}
                                            onChange={(value) => setFormData(prev => ({ ...prev, objectives: value }))}
                                            className="min-h-[150px]"
                                            disabled={mutation.isPending}
                                        />
                                    </div>
                                    <div className="space-y-2 mb-8">
                                        <Label>Expected Outcomes</Label>
                                        <RichTextEditor
                                            value={formData.expected_outcomes}
                                            onChange={(value) => setFormData(prev => ({ ...prev, expected_outcomes: value }))}
                                            className="min-h-[150px]"
                                            disabled={mutation.isPending}
                                        />
                                    </div>
                                </>
                            )}

                            {/* Who Should Apply / Duties */}
                            <div className="space-y-2 mb-8">
                                <Label>{formData.type === 'call' ? 'Who Should Apply' : 'Duties and Responsibilities'}</Label>
                                <RichTextEditor
                                    value={formData.duties_and_responsibilities}
                                    onChange={(value) => setFormData(prev => ({ ...prev, duties_and_responsibilities: value }))}
                                    className="min-h-[200px]"
                                    disabled={mutation.isPending}
                                />
                            </div>

                            {/* Eligibility / Competence */}
                            <div className="space-y-2 mb-8">
                                <Label>{formData.type === 'call' ? 'Eligibility Criteria' : 'Competence'}</Label>
                                <RichTextEditor
                                    value={formData.competence}
                                    onChange={(value) => setFormData(prev => ({ ...prev, competence: value }))}
                                    className="min-h-[200px]"
                                    disabled={mutation.isPending}
                                />
                            </div>

                            {/* Selection Criteria (Calls only) */}
                            {formData.type === 'call' && (
                                <div className="space-y-2 mb-8">
                                    <Label>Selection Criteria</Label>
                                    <RichTextEditor
                                        value={formData.selection_criteria}
                                        onChange={(value) => setFormData(prev => ({ ...prev, selection_criteria: value }))}
                                        className="min-h-[150px]"
                                        disabled={mutation.isPending}
                                    />
                                </div>
                            )}

                            {/* How to Apply */}
                            <div className="space-y-2">
                                <Label>How to Apply</Label>
                                <RichTextEditor
                                    value={formData.how_to_apply}
                                    onChange={(value) => setFormData(prev => ({ ...prev, how_to_apply: value }))}
                                    className="min-h-[100px]"
                                    disabled={mutation.isPending}
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
                                <Label>Status</Label>
                                <div className="flex gap-2">
                                    <Button className="w-full" onClick={handleSubmit} disabled={mutation.isPending}>
                                        {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isEdit ? 'Update' : 'Post'} {formData.type === 'call' ? 'Call' : 'Job'}
                                    </Button>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <Switch
                                    checked={formData.is_active}
                                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                                    disabled={mutation.isPending}
                                />
                                <Label className={mutation.isPending ? 'opacity-50' : ''}>{formData.is_active ? 'Published (Active)' : 'Draft (Inactive)'}</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateEditCareer;

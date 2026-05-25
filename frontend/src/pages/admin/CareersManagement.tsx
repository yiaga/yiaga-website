import { useState } from 'react';
import { Plus, Edit, Trash2, Briefcase, MapPin, Search, Files, Users, GraduationCap, Calendar, Mail, Phone, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CareersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addAuditLog } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: jobs = [], isLoading: isLoadingJobs } = useQuery({
    queryKey: ['jobs', 'admin'],
    queryFn: () => api.getJobs(true)
  });

  const { data: volunteers = [], isLoading: isLoadingVolunteers } = useQuery({
    queryKey: ['volunteers'],
    queryFn: () => api.getVolunteers()
  });

  const { data: internships = [], isLoading: isLoadingInternships } = useQuery({
    queryKey: ['internships'],
    queryFn: () => api.getInternships()
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      addAuditLog('DELETE_JOB', 'Deleted job posting');
      toast({ title: 'Success', description: 'Job posting deleted' });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      toast({ title: 'Error', description: 'Failed to delete job posting', variant: 'destructive' });
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: api.duplicateJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      addAuditLog('DUPLICATE_JOB', 'Duplicated job posting');
      toast({ title: 'Success', description: 'Job posting duplicated' });
    },
    onError: (error) => {
      console.error("Duplicate failed:", error);
      toast({ title: 'Error', description: 'Failed to duplicate job posting', variant: 'destructive' });
    }
  });

  const handleDelete = (id: number) => {
    if (confirm('Delete this job posting?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDuplicate = (id: number) => {
    duplicateMutation.mutate(id);
  };

  const toggleMutation = useMutation({
    mutationFn: (job: any) => api.updateJob(job.id, { ...job, is_active: !job.is_active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      addAuditLog('UPDATE_JOB_STATUS', 'Changed job active status');
      toast({ title: 'Success', description: 'Job status updated' });
    },
    onError: (error) => {
      console.error("Status update failed:", error);
      toast({ title: 'Error', description: 'Failed to update job status', variant: 'destructive' });
    }
  });

  const handleToggleStatus = (job: any) => {
    toggleMutation.mutate(job);
  };

  const handleEdit = (id: number) => {
    navigate(`/admin/careers/edit/${id}`);
  };

  const filteredJobs = (jobs || []).filter(job =>
    (job.type === 'job' || !job.type) && (
      (job.call_for_application && job.call_for_application.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.department && job.department.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const filteredCalls = (jobs || []).filter(job =>
    job.type === 'call' && (
      (job.call_for_application && job.call_for_application.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.department && job.department.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const filteredVolunteers = (volunteers || []).filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInternships = (internships || []).filter(i =>
    i.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Careers & Application</h1>
          <p className="text-muted-foreground">Manage job postings, program calls, volunteers, and internships</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2" onClick={() => navigate('/admin/careers/new?type=job')}>
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
          <Button className="gap-2 bg-secondary hover:bg-secondary/90" onClick={() => navigate('/admin/careers/new?type=call')}>
            <Plus className="w-4 h-4" />
            Post New Calls
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search all records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="jobs" className="space-y-6">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="jobs" className="gap-2">
            <Briefcase className="w-4 h-4" />
            Job Postings
          </TabsTrigger>
          <TabsTrigger value="calls" className="gap-2">
            <Sparkles className="w-4 h-4" />
            Calls for Application
          </TabsTrigger>
          <TabsTrigger value="volunteers" className="gap-2">
            <Users className="w-4 h-4" />
            Volunteers
          </TabsTrigger>
          <TabsTrigger value="internships" className="gap-2">
            <GraduationCap className="w-4 h-4" />
            Internships
          </TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isLoadingJobs ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Title</th>
                      <th className="px-6 py-4 font-medium">Department</th>
                      <th className="px-6 py-4 font-medium">Type / Location</th>
                      <th className="px-6 py-4 font-medium">Deadline</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Posted</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{job.call_for_application}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{job.department}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type_of_contract}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">{job.application_deadline}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={job.is_active}
                              onCheckedChange={() => handleToggleStatus(job)}
                              disabled={toggleMutation.isPending}
                            />
                            <span className={`text-xs capitalize ${job.is_active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                              {job.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground"><span className="text-xs">{formatDate(job.created_at)}</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(job.id)} title="Duplicate Job">
                              <Files className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(job.id)} title="Edit Job">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(job.id)}
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredJobs.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">No jobs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="calls">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isLoadingJobs ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Call Title</th>
                      <th className="px-6 py-4 font-medium">Department</th>
                      <th className="px-6 py-4 font-medium">Type / Location</th>
                      <th className="px-6 py-4 font-medium">Deadline</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Call Date</th>
                      <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredCalls.map((call) => (
                      <tr key={call.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{call.call_for_application}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{call.department}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {call.type_of_contract}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {call.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">{call.application_deadline}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={call.is_active}
                              onCheckedChange={() => handleToggleStatus(call)}
                              disabled={toggleMutation.isPending}
                            />
                            <span className={`text-xs capitalize ${call.is_active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                              {call.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground"><span className="text-xs">{formatDate(call.created_at)}</span></td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDuplicate(call.id)} title="Duplicate Call">
                              <Files className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(call.id)} title="Edit Call">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => handleDelete(call.id)}
                              title="Delete Call"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredCalls.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-muted-foreground">No calls found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="volunteers">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isLoadingVolunteers ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Volunteer</th>
                      <th className="px-6 py-4 font-medium">Contact</th>
                      <th className="px-6 py-4 font-medium">Department / Interest</th>
                      <th className="px-6 py-4 font-medium">Applied On</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredVolunteers.map((v) => (
                      <tr key={v.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{v.name}</p>
                          <p className="text-xs text-muted-foreground italic">{v.occupation}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {v.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {v.phone}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {v.location}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <p className="font-medium text-primary text-xs">{v.department}</p>
                          <p className="text-[10px] mt-1">{v.interests}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(v.created_at).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                            {v.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredVolunteers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">No volunteer applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="internships">
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isLoadingInternships ? (
              <div className="p-8 text-center text-muted-foreground">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                      <th className="px-6 py-4 font-medium">Intern</th>
                      <th className="px-6 py-4 font-medium">Background</th>
                      <th className="px-6 py-4 font-medium">Placement</th>
                      <th className="px-6 py-4 font-medium">Applied On</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {filteredInternships.map((i) => (
                      <tr key={i.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-medium text-foreground">{i.full_name}</p>
                          <div className="flex flex-col gap-1 mt-1 text-[10px] text-muted-foreground">
                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {i.email}</span>
                            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {i.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <p className="text-xs font-medium">{i.qualification}</p>
                          <p className="text-[10px] italic">{i.level}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="font-medium text-primary">{i.department}</span>
                            <span>{i.duration}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground text-xs">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(i.created_at).toLocaleDateString()}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">
                            {i.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredInternships.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-muted-foreground">No internship applications found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CareersManagement;

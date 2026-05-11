import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Clock, Briefcase, Calendar, Building, Globe } from "lucide-react";
import { Loader2 } from "lucide-react";

/**
 * CareerDetail Component
 * Displays the full details of a specific job posting.
 */
const CareerDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: job, isLoading } = useQuery({
        queryKey: ['job', id],
        queryFn: async () => {
            if (!id) return null;
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/jobs/${id}`);
            if (!response.ok) throw new Error("Job not found");
            return await response.json();
        },
        enabled: !!id
    });

    if (isLoading) {
        return (
            <PageLayout>
                <div className="flex justify-center items-center py-40">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </PageLayout>
        );
    }

    if (!job) {
        return (
            <PageLayout>
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
                    <Button onClick={() => navigate('/careers')}>Back to Careers</Button>
                </div>
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="bg-muted/30 py-12 border-b border-border">
                <div className="container mx-auto px-4">
                    <Button variant="ghost" onClick={() => navigate(job.type === 'call' ? '/call-for-applications' : '/careers')} className="mb-6 gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to {job.type === 'call' ? 'Calls' : 'Careers'}
                    </Button>

                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 mb-4">
                             {job.type === 'call' ? (
                                <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase tracking-wider">Call for Application</span>
                             ) : (
                                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">Career Opportunity</span>
                             )}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
                            {job.call_for_application}
                        </h1>

                        <div className="flex flex-wrap gap-4 md:gap-8 text-muted-foreground mb-8">
                            <span className="flex items-center gap-2">
                                <Building className="w-5 h-5 text-primary" />
                                {job.department}
                            </span>
                            <span className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                {job.location}
                            </span>
                            <span className="flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary" />
                                {job.type_of_contract}
                            </span>
                            <span className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                Deadline: {job.application_deadline}
                            </span>
                        </div>

                        <Button size="lg" onClick={() => window.open(job.application_link || `mailto:recruitment@yiaga.org?subject=Application for ${job.call_for_application}`, '_blank')}>
                            {job.type === 'call' ? 'Apply for this Call' : 'Apply for this Position'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

                    <div className="md:col-span-2 space-y-10">
                        {job.about_yiaga && job.about_yiaga.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">
                                    {job.type === 'call' ? `About ${job.call_for_application}` : 'About Yiaga Africa'}
                                </h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.about_yiaga }} />
                            </section>
                        )}

                        {job.background && job.background.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">
                                    {job.type === 'call' ? `Why ${job.call_for_application}` : 'Background'}
                                </h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.background }} />
                            </section>
                        )}

                        {job.type === 'call' && job.objectives && job.objectives.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">Objectives</h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.objectives }} />
                            </section>
                        )}

                        {job.type === 'call' && job.expected_outcomes && job.expected_outcomes.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">Expected Outcomes</h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.expected_outcomes }} />
                            </section>
                        )}

                        {job.duties_and_responsibilities && job.duties_and_responsibilities.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">
                                    {job.type === 'call' ? 'Who Should Apply' : 'Duties and Responsibilities'}
                                </h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.duties_and_responsibilities }} />
                            </section>
                        )}

                        {job.competence && job.competence.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">
                                    {job.type === 'call' ? 'Eligibility Criteria' : 'Competencies'}
                                </h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.competence }} />
                            </section>
                        )}

                        {job.type === 'call' && job.selection_criteria && job.selection_criteria.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">Selection Criteria</h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.selection_criteria }} />
                            </section>
                        )}

                        {job.how_to_apply && job.how_to_apply.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, '').trim() && (
                            <section>
                                <h3 className="text-xl font-display font-bold mb-4 border-b pb-2">How to Apply</h3>
                                <div className="prose prose-stone dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
                            </section>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="bg-card rounded-xl p-6 border border-border sticky top-24">
                            <h3 className="font-bold text-lg mb-4">{job.type === 'call' ? 'Call Overview' : 'Job Overview'}</h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">{job.type === 'call' ? 'Department' : 'Post Level'}</span>
                                    <span className="font-medium">{job.type === 'call' ? job.department : (job.post_level || 'N/A')}</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">{job.type === 'call' ? 'Location' : 'Duration'}</span>
                                    <span className="font-medium">{job.type === 'call' ? job.location : (job.duration_of_initial_contract || 'N/A')}</span>
                                </li>
                                <li className="flex flex-col gap-1">
                                    <span className="text-muted-foreground">Languages Required</span>
                                    <span className="font-medium">{job.languages_required || 'English'}</span>
                                </li>
                            </ul>

                            <div className="mt-8 pt-6 border-t border-border">
                                <Button className="w-full" onClick={() => window.open(job.application_link || `mailto:recruitment@yiaga.org?subject=Application for ${job.call_for_application}`, '_blank')}>
                                    {job.type === 'call' ? 'Apply Now' : 'Apply for Position'}
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageLayout>
    );
};

export default CareerDetail;

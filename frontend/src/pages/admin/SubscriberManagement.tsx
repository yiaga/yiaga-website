import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserMinus, BarChart3, PieChart } from 'lucide-react';

const SubscriberManagement = () => {
    const { data: analytics, isLoading } = useQuery({
        queryKey: ['subscriberAnalytics'],
        queryFn: api.getSubscriberAnalytics,
        initialData: {
            total_active: 0,
            total_unsubscribed: 0,
            new_this_week: 0,
            topic_breakdown: {}
        }
    });

    if (isLoading) return <div className="p-8">Loading analytics...</div>;

    const breakdown = analytics.topic_breakdown || {};

    // Ordered topics as requested
    const orderedTopics = [
        "Monthly Newsletter",
        "Weekly Election News Update (The Ballot)",
        "GenZ Blog Series",
        "Research, Reports, Policy Briefs & Knowledge Products",
        "Press Releases, Stories & Democracy Updates",
        "Opportunities: Events Webinars & Open Calls"
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-display font-bold text-foreground">Subscriber Analytics</h1>
                <p className="text-muted-foreground">Detailed overview of newsletter subscriptions.</p>
            </div>

            {/* Top Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Active Subscribers</CardTitle>
                        <Users className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.total_active}</div>
                        <p className="text-xs text-muted-foreground">Currently receiving emails</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Weekly Subscription Report</CardTitle>
                        <BarChart3 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+{analytics.new_this_week}</div>
                        <p className="text-xs text-muted-foreground">New subscribers in last 7 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
                        <UserMinus className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{analytics.total_unsubscribed}</div>
                        <p className="text-xs text-muted-foreground">Total opt-outs</p>
                    </CardContent>
                </Card>
            </div>

            {/* Topic Breakdown */}
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle>Subscriptions by Topic</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {orderedTopics.map((topic) => {
                            const count = breakdown[topic] || 0;
                            const percentage = analytics.total_active > 0 ? (count / analytics.total_active) * 100 : 0;
                            return (
                                <div key={topic} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium">{topic}</span>
                                        <span className="text-sm font-bold">{count}</span>
                                    </div>
                                    <div className="h-2 w-full bg-secondary/20 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default SubscriberManagement;

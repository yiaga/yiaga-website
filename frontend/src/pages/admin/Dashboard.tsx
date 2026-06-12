import {
  Users,
  FileText,
  Newspaper,
  Briefcase,
  TrendingUp,
  Eye,
  MessageSquare,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, hasPermission, getAuditLogs } = useAuth();
  const auditLogs = getAuditLogs().slice(0, 5);

  const { data: dashboardStats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: api.getDashboardStats
  });

  const stats = [
    { label: 'Total Users', value: isLoading ? '...' : dashboardStats?.users?.toLocaleString(), icon: Users, change: '+12%', color: 'bg-primary' },
    { label: 'Blog Posts', value: isLoading ? '...' : dashboardStats?.blogs?.toLocaleString(), icon: FileText, change: '+3', color: 'bg-secondary' },
    { label: 'News Articles', value: isLoading ? '...' : dashboardStats?.news?.toLocaleString(), icon: Newspaper, change: '+8', color: 'bg-accent' },
    { label: 'Subscribers', value: isLoading ? '...' : dashboardStats?.subscribers?.toLocaleString(), icon: Users, change: '+24', color: 'bg-primary' },
  ];



  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      {hasPermission(['technical', 'admin']) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const LinkWrapper = ({ children }: { children: React.ReactNode }) => {
              if (stat.label === 'Blog Posts') return <Link to="/admin/blogs">{children}</Link>;
              if (stat.label === 'News Articles') return <Link to="/admin/news">{children}</Link>;
              if (stat.label === 'Subscribers') return <Link to="/admin/subscribers">{children}</Link>;
              if (stat.label === 'Total Users') return <Link to="/admin/users">{children}</Link>;
              return <>{children}</>;
            };

            return (
              <LinkWrapper key={stat.label}>
                <div
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="flex items-center gap-1 text-sm text-primary font-medium">
                      <TrendingUp className="w-4 h-4" />
                      {stat.change}
                    </span>
                  </div>
                  <div className="mt-4">
                    <p className="text-3xl font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-muted-foreground text-sm mt-1">{stat.label}</p>
                  </div>
                </div>
              </LinkWrapper>
            );
          })}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-display font-bold text-foreground mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading activity...</p>
            ) : dashboardStats?.recent_activity && dashboardStats.recent_activity.length > 0 ? (
              dashboardStats.recent_activity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm list-item font-medium">{activity.action}</p>
                    <p className="text-foreground text-xs mt-1">{activity.details}</p>
                    <p className="text-muted-foreground text-xs flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            )}
          </div>
        </div>

        {/* Quick Stats for User */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-display font-bold text-foreground mb-6">Your Activity</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {isLoading ? '...' : dashboardStats?.user_activity?.comments_posted}
              </p>
              <p className="text-muted-foreground text-sm">Comments Posted</p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {isLoading ? '...' : dashboardStats?.user_activity?.articles_saved}
              </p>
              <p className="text-muted-foreground text-sm">Articles Saved</p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {isLoading ? '...' : dashboardStats?.user_activity?.days_active}
              </p>
              <p className="text-muted-foreground text-sm">Days Active</p>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {isLoading ? '...' : dashboardStats?.user_activity?.articles_read}
              </p>
              <p className="text-muted-foreground text-sm">Articles Read</p>
            </div>
          </div>
        </div>
      </div>
      {/* Recent Audit Logs - Admin Only */}
      {hasPermission(['admin']) && auditLogs.length > 0 && (
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-lg font-display font-bold text-foreground mb-6">Recent Audit Logs</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Action</th>
                  <th className="pb-3 font-medium">Details</th>
                  <th className="pb-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border last:border-0">
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-foreground">{log.userName}</p>
                        <p className="text-xs text-muted-foreground capitalize">{log.userRole}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-muted rounded-lg text-xs font-medium">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{log.details}</td>
                    <td className="py-3 text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

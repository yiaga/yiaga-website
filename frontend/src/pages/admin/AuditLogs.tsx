import { Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';

const AuditLogs = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: logs = [], isLoading } = useQuery({
    queryKey: ['audit-logs'],
    queryFn: api.getAuditLogs
  });

  const filteredLogs = logs.filter((log: any) =>
    (log.action || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.user_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">Track all user activities on the platform</p>
        </div>
        <Button variant="outline" className="gap-2"><Download className="w-4 h-4" />Export</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Action</th>
              <th className="px-6 py-4 font-medium">Details</th>
              <th className="px-6 py-4 font-medium">IP Address</th>
              <th className="px-6 py-4 font-medium">Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredLogs.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No audit logs yet. Actions will appear here.</td></tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.ID} className="border-t border-border">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{log.user_name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{log.user_role}</p>
                  </td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-muted rounded-lg text-xs font-medium">{log.action}</span></td>
                  <td className="px-6 py-4 text-muted-foreground max-w-xs truncate">{log.details}</td>
                  <td className="px-6 py-4 text-muted-foreground">{log.ip_address}</td>
                  <td className="px-6 py-4 text-muted-foreground">{new Date(log.timestamp || log.CreatedAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogs;

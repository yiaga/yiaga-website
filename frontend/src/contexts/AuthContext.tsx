import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '@/services/api';

export type UserRole = 'user' | 'technical' | 'admin' | 'communications';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (requiredRole: UserRole | UserRole[]) => boolean;
  addAuditLog: (action: string, details: string) => void;
  getAuditLogs: () => AuditLogEntry[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const DEMO_USERS: (User & { password: string })[] = [
  {
    id: '1',
    email: 'admin@yiaga.org',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'technical@yiaga.org',
    password: 'tech123',
    name: 'Technical User',
    role: 'technical',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'user@yiaga.org',
    password: 'user123',
    name: 'Regular User',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
];

const ROLE_HIERARCHY: Record<UserRole, number> = {
  user: 1,
  communications: 1.5,
  technical: 2,
  admin: 3,
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('yiaga_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('yiaga_user');
      }
    }
    setIsLoading(false);
  }, []);

  const addAuditLog = (action: string, details: string) => {
    if (!user) return;

    const newLog: AuditLogEntry = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action,
      details,
      timestamp: new Date().toISOString(),
      ipAddress: '192.168.1.1', // Demo IP
    };

    // Send to backend
    api.createAuditLog({
      action: newLog.action,
      details: newLog.details,
      user_id: newLog.userId,
      user_name: newLog.userName,
      user_role: newLog.userRole,
      ip_address: newLog.ipAddress,
      timestamp: newLog.timestamp
    }).catch(console.error);

    // Also keep local for fallbacks or immediate UI updates if needed
    const logs = JSON.parse(localStorage.getItem('yiaga_audit_logs') || '[]');
    logs.unshift(newLog);
    localStorage.setItem('yiaga_audit_logs', JSON.stringify(logs.slice(0, 1000)));
  };

  const getAuditLogs = (): AuditLogEntry[] => {
    return JSON.parse(localStorage.getItem('yiaga_audit_logs') || '[]');
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const data = await api.login(email, password);
      // data = { token, user: { id, email, name, role } }

      localStorage.setItem('token', data.token);
      localStorage.setItem('yiaga_user', JSON.stringify(data.user));
      setUser(data.user);

      // Add audit log (backend might already do this via logic, or we do it here strictly frontend side?)
      // Backend doesn't automatically log login unless we add it to the login handler. 
      // Current frontend logic logs it to localStorage audit logs. 
      // Let's keep frontend tracking for now or rely on backend. 
      // Since we moved audit logs to backend, we should probably add a log entry via API.
      // But we can't call protected API comfortably yet? 
      // We have the token now.

      // Let's record login success
      addAuditLog('LOGIN', 'User logged in successfully');

      return { success: true };
    } catch (error: any) {
      console.error("Login failed:", error);
      return { success: false, error: error.message || 'Invalid email or password' };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const user = await api.signup(name, email, password);
      // Automatically log them in? 
      // The signup endpoint currently returns the user object but NOT the token.
      // So we probably need to ask them to login, or update backend to return token on signup.
      // For now, let's just return success so they can redirect to login.

      addAuditLog('REGISTER', `New user registered: ${email}`);
      return { success: true };
    } catch (error: any) {
      console.error("Registration failed:", error);
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  const logout = () => {
    if (user) {
      addAuditLog('LOGOUT', 'User logged out');
    }
    setUser(null);
    localStorage.removeItem('yiaga_user');
  };

  const hasPermission = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    const userLevel = ROLE_HIERARCHY[user.role];

    return roles.some(role => userLevel >= ROLE_HIERARCHY[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        hasPermission,
        addAuditLog,
        getAuditLogs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

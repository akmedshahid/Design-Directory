import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type PlanType = 'None' | 'Member' | 'Collector' | 'Patron';

export interface MembershipDetails {
  plan: PlanType;
  billingCycle: 'monthly' | 'yearly';
  status: 'active' | 'trialing' | 'past_due' | 'cancelled';
  downloadsUsedToday: number;
  lastResetDate: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Invited Member' | 'Curator' | 'Admin';
  membership: MembershipDetails;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
  updateMembership: (details: Partial<MembershipDetails>) => void;
  incrementDownloadUsage: () => boolean; // returns true if successful, false if limit reached
  getDownloadLimit: () => number;
  canAccessRooms: boolean;
  canDirectMessage: boolean;
  canPostRequests: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const PLAN_LIMITS: Record<PlanType, number> = {
  'None': 0,
  'Member': 5,
  'Collector': 25,
  'Patron': 100
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage on initial load
    const storedAuth = localStorage.getItem('auth_session');
    if (storedAuth) {
      try {
        const parsed: User = JSON.parse(storedAuth);
        
        // Ensure legacy sessions get the new membership data structure
        if (!parsed.membership) {
          parsed.membership = {
            plan: 'None',
            billingCycle: 'monthly',
            status: 'active',
            downloadsUsedToday: 0,
            lastResetDate: new Date().toISOString().split('T')[0]
          };
        }

        // Check if daily reset is needed
        const today = new Date().toISOString().split('T')[0];
        if (parsed.membership.lastResetDate !== today) {
          parsed.membership.downloadsUsedToday = 0;
          parsed.membership.lastResetDate = today;
        }

        setIsAuthenticated(true);
        setUser(parsed);
        localStorage.setItem('auth_session', JSON.stringify(parsed));
      } catch (e) {
        localStorage.removeItem('auth_session');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newUser: User) => {
    setIsAuthenticated(true);
    setUser(newUser);
    localStorage.setItem('auth_session', JSON.stringify(newUser));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth_session');
  };

  const updateMembership = (details: Partial<MembershipDetails>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      membership: { ...user.membership, ...details }
    };
    setUser(updatedUser);
    localStorage.setItem('auth_session', JSON.stringify(updatedUser));
  };

  const getDownloadLimit = () => {
    if (!user) return 0;
    return PLAN_LIMITS[user.membership.plan] || 0;
  };

  const incrementDownloadUsage = () => {
    if (!user) return false;
    const limit = getDownloadLimit();
    if (user.membership.downloadsUsedToday >= limit) {
      return false; // Limit reached
    }

    const updatedUser = {
      ...user,
      membership: {
        ...user.membership,
        downloadsUsedToday: user.membership.downloadsUsedToday + 1
      }
    };
    setUser(updatedUser);
    localStorage.setItem('auth_session', JSON.stringify(updatedUser));
    return true;
  };

  const plan = user?.membership?.plan || 'None';
  const canAccessRooms = plan === 'Member' || plan === 'Collector' || plan === 'Patron' || user?.role === 'Admin';
  const canDirectMessage = plan === 'Collector' || plan === 'Patron' || user?.role === 'Admin';
  const canPostRequests = plan === 'Collector' || plan === 'Patron' || user?.role === 'Admin';

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      login, 
      logout, 
      isLoading,
      updateMembership,
      incrementDownloadUsage,
      getDownloadLimit,
      canAccessRooms,
      canDirectMessage,
      canPostRequests
    }}>
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

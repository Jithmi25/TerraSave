import React, { createContext, useContext, useEffect, useState } from 'react';

export type UserType = 'player' | 'ngo' | 'admin';

type AppUser = {
  id: string;
  email: string;
  userType: UserType;
  user_metadata?: { full_name?: string };
};

type AppSession = {
  user: AppUser;
} | null;

interface AuthContextType {
  user: AppUser | null;
  session: AppSession;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, userType: UserType) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials mapping
const DEMO_CREDENTIALS: Record<string, { password: string; userType: UserType }> = {
  'player@terrasave.com': { password: 'player123', userType: 'player' },
  'ngo@terrasave.com': { password: 'ngo123', userType: 'ngo' },
  'admin@terrasave.com': { password: 'admin123', userType: 'admin' },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<AppSession>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, fullName: string, userType: UserType) => {
    const newUser: AppUser = {
      id: `mock-${Date.now()}`,
      email,
      userType,
      user_metadata: { full_name: fullName },
    };
    setUser(newUser);
    setSession({ user: newUser });
  };

  const signIn = async (email: string, password: string) => {
    // Check if it's a demo account
    const demoAccount = DEMO_CREDENTIALS[email];
    
    if (!demoAccount) {
      throw new Error('Demo account not found. Use demo credentials from .env');
    }

    if (demoAccount.password !== password) {
      throw new Error('Invalid password');
    }

    const newUser: AppUser = {
      id: `mock-${Date.now()}`,
      email,
      userType: demoAccount.userType,
    };
    setUser(newUser);
    setSession({ user: newUser });
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
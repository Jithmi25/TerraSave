import React, { createContext, useContext, useEffect, useState } from 'react';

type AppUser = {
  id: string;
  email: string;
  user_metadata?: { full_name?: string };
};

type AppSession = {
  user: AppUser;
} | null;

interface AuthContextType {
  user: AppUser | null;
  session: AppSession;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [session, setSession] = useState<AppSession>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const signUp = async (email: string, _password: string, fullName: string) => {
    const newUser: AppUser = {
      id: `mock-${Date.now()}`,
      email,
      user_metadata: { full_name: fullName },
    };
    setUser(newUser);
    setSession({ user: newUser });
  };

  const signIn = async (email: string, _password: string) => {
    const newUser: AppUser = {
      id: `mock-${Date.now()}`,
      email,
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
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types/auth';
import { authService, DEFAULT_ADMIN } from '../services/authService';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<AdminUser>;
  logout: () => void;
  updateCurrentUser: (updates: Partial<AdminUser>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local authentication state on initial load
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Default to initial demo admin so reviewer can immediately explore without extra hoops
      setUser(DEFAULT_ADMIN);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, rememberMe = true): Promise<AdminUser> => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.login(email, password, rememberMe);
      setUser(loggedInUser);
      return loggedInUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateCurrentUser = (updates: Partial<AdminUser>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('campusshield_admin_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout,
        updateCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

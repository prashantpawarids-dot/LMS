// =====================================================
// Auth Context - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authService } from '@/api';
import type { AuthUser, LoginCredentials, Company } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  selectCompany: (companyId: string) => void;
  selectedCompanyId: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = authService.getStoredUser();
    const storedCompany = authService.getSelectedCompany();
    
    if (storedUser) {
      setUser(storedUser);
      setSelectedCompanyId(storedCompany || storedUser.companyId);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      if (response.success && response.data) {
        setUser(response.data);
        setSelectedCompanyId(response.data.companyId);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setSelectedCompanyId(null);
      setIsLoading(false);
    }
  }, []);

  const selectCompany = useCallback((companyId: string) => {
    authService.setSelectedCompany(companyId);
    setSelectedCompanyId(companyId);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    selectCompany,
    selectedCompanyId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

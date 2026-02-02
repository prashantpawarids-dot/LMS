// =====================================================
// Auth Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS, STORAGE_KEYS } from '../config';
import type { AuthUser, LoginCredentials, ApiResponse } from '@/types';

/**
 * Authentication service
 */
export const authService = {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthUser>> {
    const response = await httpClient.post<ApiResponse<AuthUser>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Store auth data
    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data));
      if (response.data.companyId) {
        localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY, response.data.companyId);
      }
    }
    
    return response;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Clear storage regardless of API response
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      localStorage.removeItem(STORAGE_KEYS.SELECTED_COMPANY);
    }
  },

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
    return httpClient.get<ApiResponse<AuthUser>>(API_ENDPOINTS.AUTH.ME);
  },

  /**
   * Refresh auth token
   */
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await httpClient.post<ApiResponse<{ token: string }>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    
    if (response.success && response.data) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.data.token);
    }
    
    return response;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get stored user data
   */
  getStoredUser(): AuthUser | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as AuthUser;
    } catch {
      return null;
    }
  },

  /**
   * Get current auth token
   */
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  /**
   * Get selected company ID
   */
  getSelectedCompany(): string | null {
    return localStorage.getItem(STORAGE_KEYS.SELECTED_COMPANY);
  },

  /**
   * Set selected company
   */
  setSelectedCompany(companyId: string): void {
    localStorage.setItem(STORAGE_KEYS.SELECTED_COMPANY, companyId);
  },
};

export default authService;

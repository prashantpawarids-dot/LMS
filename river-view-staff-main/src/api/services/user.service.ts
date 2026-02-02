// =====================================================
// User Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  User,
  CreateUserDTO,
  UpdateUserDTO,
  ApiResponse,
  PaginatedResponse,
  PaginationParams 
} from '@/types';

/**
 * User registration service for CRUD operations
 */
export const userService = {
  /**
   * Get all users
   */
  async getAll(params?: PaginationParams & { companyId?: string }): Promise<ApiResponse<User[]>> {
    return httpClient.get<ApiResponse<User[]>>(
      API_ENDPOINTS.USER.GET_ALL,
      params as Record<string, unknown>
    );
  },

  /**
   * Get paginated users
   */
  async getPaginated(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<User>>> {
    return httpClient.get<ApiResponse<PaginatedResponse<User>>>(
      API_ENDPOINTS.USER.GET_ALL,
      { ...params, paginated: true } as Record<string, unknown>
    );
  },

  /**
   * Get user by ID
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    return httpClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USER.GET_BY_ID(id)
    );
  },

  /**
   * Add new user
   */
  async create(data: CreateUserDTO): Promise<ApiResponse<User>> {
    return httpClient.post<ApiResponse<User>>(
      API_ENDPOINTS.USER.ADD,
      data
    );
  },

  /**
   * Update user
   */
  async update(id: string, data: UpdateUserDTO): Promise<ApiResponse<User>> {
    return httpClient.post<ApiResponse<User>>(
      API_ENDPOINTS.USER.UPDATE(id),
      data
    );
  },

  /**
   * Delete user
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.USER.DELETE(id)
    );
  },

  /**
   * Change user password
   */
  async changePassword(id: string, oldPassword: string, newPassword: string): Promise<ApiResponse<void>> {
    return httpClient.post<ApiResponse<void>>(
      `${API_ENDPOINTS.USER.BASE}/ChangePassword/${id}`,
      { oldPassword, newPassword }
    );
  },
};

export default userService;

// =====================================================
// Labour Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  Labour,
  CreateLabourDTO,
  ApiResponse,
  PaginatedResponse,
  LabourFilter 
} from '@/types';

/**
 * Labour service for CRUD operations
 */
export const labourService = {
  /**
   * Get all labours with optional filters
   */
  async getAll(params?: LabourFilter): Promise<ApiResponse<Labour[]>> {
    return httpClient.get<ApiResponse<Labour[]>>(
      API_ENDPOINTS.LABOUR.GET_ALL,
      params as Record<string, unknown>
    );
  },

  /**
   * Get paginated labours
   */
  async getPaginated(params?: LabourFilter): Promise<ApiResponse<PaginatedResponse<Labour>>> {
    return httpClient.get<ApiResponse<PaginatedResponse<Labour>>>(
      API_ENDPOINTS.LABOUR.GET_ALL,
      { ...params, paginated: true } as Record<string, unknown>
    );
  },

  /**
   * Get labour by ID
   */
  async getById(id: string): Promise<ApiResponse<Labour>> {
    return httpClient.get<ApiResponse<Labour>>(
      API_ENDPOINTS.LABOUR.GET_BY_ID(id)
    );
  },

  /**
   * Add new labour
   */
  async create(data: CreateLabourDTO): Promise<ApiResponse<Labour>> {
    return httpClient.post<ApiResponse<Labour>>(
      API_ENDPOINTS.LABOUR.ADD,
      data
    );
  },

  /**
   * Update labour
   */
  async update(id: string, data: Partial<CreateLabourDTO>): Promise<ApiResponse<Labour>> {
    return httpClient.put<ApiResponse<Labour>>(
      API_ENDPOINTS.LABOUR.UPDATE(id),
      data
    );
  },

  /**
   * Delete labour
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.LABOUR.DELETE(id)
    );
  },

  /**
   * Search labours by name or pass number
   */
  async search(query: string): Promise<ApiResponse<Labour[]>> {
    return httpClient.get<ApiResponse<Labour[]>>(
      API_ENDPOINTS.LABOUR.GET_ALL,
      { search: query }
    );
  },

  /**
   * Get labours by site
   */
  async getBySite(siteId: string, params?: LabourFilter): Promise<ApiResponse<Labour[]>> {
    return httpClient.get<ApiResponse<Labour[]>>(
      API_ENDPOINTS.LABOUR.GET_ALL,
      { ...params, siteId } as Record<string, unknown>
    );
  },

  /**
   * Get labours by contractor
   */
  async getByContractor(contractorId: string, params?: LabourFilter): Promise<ApiResponse<Labour[]>> {
    return httpClient.get<ApiResponse<Labour[]>>(
      API_ENDPOINTS.LABOUR.GET_ALL,
      { ...params, contractorId } as Record<string, unknown>
    );
  },
};

export default labourService;

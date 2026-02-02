// =====================================================
// Site Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  Site, 
  CreateSiteDTO, 
  UpdateSiteDTO,
  ApiResponse,
  PaginatedResponse,
  PaginationParams 
} from '@/types';

/**
 * Site/Project service for CRUD operations
 */
export const siteService = {
  /**
   * Get all sites
   */
  async getAll(params?: PaginationParams & { companyId?: string }): Promise<ApiResponse<Site[]>> {
    return httpClient.get<ApiResponse<Site[]>>(
      API_ENDPOINTS.SITE.GET_ALL,
      params as Record<string, unknown>
    );
  },

  /**
   * Get paginated sites
   */
  async getPaginated(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Site>>> {
    return httpClient.get<ApiResponse<PaginatedResponse<Site>>>(
      API_ENDPOINTS.SITE.GET_ALL,
      { ...params, paginated: true } as Record<string, unknown>
    );
  },

  /**
   * Get site by ID
   */
  async getById(id: string): Promise<ApiResponse<Site>> {
    return httpClient.get<ApiResponse<Site>>(
      API_ENDPOINTS.SITE.GET_BY_ID(id)
    );
  },

  /**
   * Add new site
   */
  async create(data: CreateSiteDTO): Promise<ApiResponse<Site>> {
    return httpClient.post<ApiResponse<Site>>(
      API_ENDPOINTS.SITE.ADD,
      data
    );
  },

  /**
   * Update site
   */
  async update(id: string, data: UpdateSiteDTO): Promise<ApiResponse<Site>> {
    return httpClient.post<ApiResponse<Site>>(
      API_ENDPOINTS.SITE.UPDATE(id),
      data
    );
  },

  /**
   * Delete site
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.SITE.DELETE(id)
    );
  },

  /**
   * Bulk save sites
   */
  async bulkSave(sites: CreateSiteDTO[]): Promise<ApiResponse<Site[]>> {
    return httpClient.post<ApiResponse<Site[]>>(
      API_ENDPOINTS.SITE.BULK_SAVE,
      sites
    );
  },
};

export default siteService;

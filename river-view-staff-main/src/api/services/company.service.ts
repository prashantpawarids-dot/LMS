// =====================================================
// Company Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  Company, 
  CreateCompanyDTO, 
  UpdateCompanyDTO,
  ApiResponse,
  PaginatedResponse,
  PaginationParams 
} from '@/types';

/**
 * Company service for CRUD operations
 */
export const companyService = {
  /**
   * Get all companies
   */
  async getAll(params?: PaginationParams): Promise<ApiResponse<Company[]>> {
    return httpClient.get<ApiResponse<Company[]>>(
      API_ENDPOINTS.COMPANY.GET_ALL,
      params as Record<string, unknown>
    );
  },

  /**
   * Get paginated companies
   */
  async getPaginated(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Company>>> {
    return httpClient.get<ApiResponse<PaginatedResponse<Company>>>(
      API_ENDPOINTS.COMPANY.GET_ALL,
      { ...params, paginated: true } as Record<string, unknown>
    );
  },

  /**
   * Get company by ID
   */
  async getById(id: string): Promise<ApiResponse<Company>> {
    return httpClient.get<ApiResponse<Company>>(
      API_ENDPOINTS.COMPANY.GET_BY_ID(id)
    );
  },

  /**
   * Add new company
   */
  async create(data: CreateCompanyDTO): Promise<ApiResponse<Company>> {
    return httpClient.post<ApiResponse<Company>>(
      API_ENDPOINTS.COMPANY.ADD,
      data
    );
  },

  /**
   * Update company
   */
  async update(id: string, data: UpdateCompanyDTO): Promise<ApiResponse<Company>> {
    return httpClient.post<ApiResponse<Company>>(
      API_ENDPOINTS.COMPANY.UPDATE(id),
      data
    );
  },

  /**
   * Delete company
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.COMPANY.DELETE(id)
    );
  },

  /**
   * Bulk save companies
   */
  async bulkSave(companies: CreateCompanyDTO[]): Promise<ApiResponse<Company[]>> {
    return httpClient.post<ApiResponse<Company[]>>(
      API_ENDPOINTS.COMPANY.BULK_SAVE,
      companies
    );
  },
};

export default companyService;

// =====================================================
// Contractor Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  Contractor,
  ContractorDetails,
  CreateContractorDTO, 
  UpdateContractorDTO,
  ApiResponse,
  PaginatedResponse,
  PaginationParams 
} from '@/types';

/**
 * Contractor service for CRUD operations
 */
export const contractorService = {
  /**
   * Get all contractors
   */
  async getAll(params?: PaginationParams & { companyId?: string }): Promise<ApiResponse<Contractor[]>> {
    return httpClient.get<ApiResponse<Contractor[]>>(
      API_ENDPOINTS.CONTRACTOR.GET_ALL,
      params as Record<string, unknown>
    );
  },

  /**
   * Get paginated contractors
   */
  async getPaginated(params?: PaginationParams): Promise<ApiResponse<PaginatedResponse<Contractor>>> {
    return httpClient.get<ApiResponse<PaginatedResponse<Contractor>>>(
      API_ENDPOINTS.CONTRACTOR.GET_ALL,
      { ...params, paginated: true } as Record<string, unknown>
    );
  },

  /**
   * Get contractor by ID
   */
  async getById(id: string): Promise<ApiResponse<Contractor>> {
    return httpClient.get<ApiResponse<Contractor>>(
      API_ENDPOINTS.CONTRACTOR.GET_BY_ID(id)
    );
  },

  /**
   * Get contractor details with related data
   */
  async getDetails(id: string): Promise<ApiResponse<ContractorDetails>> {
    return httpClient.get<ApiResponse<ContractorDetails>>(
      API_ENDPOINTS.CONTRACTOR.GET_DETAILS(id)
    );
  },

  /**
   * Add new contractor
   */
  async create(id: string, data: CreateContractorDTO): Promise<ApiResponse<Contractor>> {
    return httpClient.post<ApiResponse<Contractor>>(
      API_ENDPOINTS.CONTRACTOR.ADD(id),
      data
    );
  },

  /**
   * Update contractor
   */
  async update(id: string, data: UpdateContractorDTO): Promise<ApiResponse<Contractor>> {
    return httpClient.post<ApiResponse<Contractor>>(
      API_ENDPOINTS.CONTRACTOR.UPDATE(id),
      data
    );
  },

  /**
   * Delete contractor
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.CONTRACTOR.DELETE(id)
    );
  },

  /**
   * Bulk add contractors
   */
  async bulkAdd(type: string, contractors: CreateContractorDTO[]): Promise<ApiResponse<Contractor[]>> {
    return httpClient.post<ApiResponse<Contractor[]>>(
      API_ENDPOINTS.CONTRACTOR.ADD_BULK(type),
      contractors
    );
  },
};

export default contractorService;

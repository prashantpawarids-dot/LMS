// =====================================================
// HTTP Client - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { API_CONFIG, HTTP_STATUS, STORAGE_KEYS } from './config';
import type { ApiError, ApiResponse } from '@/types';

/**
 * Custom error class for API errors
 */
export class ApiException extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: unknown
  ) {
    super(`API Error: ${status} ${statusText}`);
    this.name = 'ApiException';
  }
}

/**
 * Get auth token from storage
 */
const getAuthToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

/**
 * Build headers for requests
 */
const buildHeaders = (customHeaders?: HeadersInit): Headers => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...customHeaders,
  });

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

/**
 * Build URL with query parameters
 */
const buildUrl = (endpoint: string, params?: Record<string, unknown>): string => {
  const url = new URL(endpoint, API_CONFIG.BASE_URL);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.append(key, String(value));
      }
    });
  }
  
  return url.toString();
};

/**
 * Handle API response
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  // Handle 204 No Content
  if (response.status === HTTP_STATUS.NO_CONTENT) {
    return {} as T;
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    // Handle 401 - redirect to login
    if (response.status === HTTP_STATUS.UNAUTHORIZED) {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
      window.location.href = '/login';
    }

    throw new ApiException(response.status, response.statusText, data);
  }

  return data;
};

/**
 * Retry logic for failed requests
 */
const withRetry = async <T>(
  fn: () => Promise<T>,
  retries: number = API_CONFIG.RETRY_ATTEMPTS
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && error instanceof ApiException) {
      // Only retry on server errors (5xx)
      if (error.status >= 500) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.RETRY_DELAY)
        );
        return withRetry(fn, retries - 1);
      }
    }
    throw error;
  }
};

/**
 * HTTP Client with all common methods
 */
export const httpClient = {
  /**
   * GET request
   */
  async get<T>(
    endpoint: string, 
    params?: Record<string, unknown>,
    headers?: HeadersInit
  ): Promise<T> {
    return withRetry(async () => {
      const response = await fetch(buildUrl(endpoint, params), {
        method: 'GET',
        headers: buildHeaders(headers),
      });
      return handleResponse<T>(response);
    });
  },

  /**
   * POST request
   */
  async post<T>(
    endpoint: string, 
    body?: unknown,
    headers?: HeadersInit
  ): Promise<T> {
    return withRetry(async () => {
      const response = await fetch(buildUrl(endpoint), {
        method: 'POST',
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      });
      return handleResponse<T>(response);
    });
  },

  /**
   * PUT request
   */
  async put<T>(
    endpoint: string, 
    body?: unknown,
    headers?: HeadersInit
  ): Promise<T> {
    return withRetry(async () => {
      const response = await fetch(buildUrl(endpoint), {
        method: 'PUT',
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      });
      return handleResponse<T>(response);
    });
  },

  /**
   * PATCH request
   */
  async patch<T>(
    endpoint: string, 
    body?: unknown,
    headers?: HeadersInit
  ): Promise<T> {
    return withRetry(async () => {
      const response = await fetch(buildUrl(endpoint), {
        method: 'PATCH',
        headers: buildHeaders(headers),
        body: body ? JSON.stringify(body) : undefined,
      });
      return handleResponse<T>(response);
    });
  },

  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    headers?: HeadersInit
  ): Promise<T> {
    return withRetry(async () => {
      const response = await fetch(buildUrl(endpoint), {
        method: 'DELETE',
        headers: buildHeaders(headers),
      });
      return handleResponse<T>(response);
    });
  },

  /**
   * Upload file(s)
   */
  async upload<T>(
    endpoint: string,
    formData: FormData,
    headers?: HeadersInit
  ): Promise<T> {
    const uploadHeaders = new Headers(headers);
    const token = getAuthToken();
    if (token) {
      uploadHeaders.set('Authorization', `Bearer ${token}`);
    }
    // Don't set Content-Type for FormData - browser will set it with boundary

    const response = await fetch(buildUrl(endpoint), {
      method: 'POST',
      headers: uploadHeaders,
      body: formData,
    });
    
    return handleResponse<T>(response);
  },
};

export default httpClient;

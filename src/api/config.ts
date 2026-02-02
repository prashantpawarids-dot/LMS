// =====================================================
// API Configuration - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

/**
 * Base API configuration
 * Change BASE_URL to point to your actual API server
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
};

/**
 * API Endpoints - Centralized endpoint definitions
 * Easy to modify when API changes
 */
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
  },

  // Company
  COMPANY: {
    BASE: '/api/Company',
    GET_ALL: '/api/Company',
    GET_BY_ID: (id: string) => `/api/Company/GetCompany/${id}`,
    ADD: '/api/Company/AddCompany',
    UPDATE: (id: string) => `/api/Company/UpdateCompany/${id}`,
    DELETE: (id: string) => `/api/Company/DeleteCompany/${id}`,
    BULK_SAVE: '/api/Company/bulkSaveCompany',
  },

  // Site/Project
  SITE: {
    BASE: '/api/Site',
    GET_ALL: '/api/Site',
    GET_BY_ID: (id: string) => `/api/Site/GetSite/${id}`,
    ADD: '/api/Site/AddSite',
    UPDATE: (id: string) => `/api/Site/UpdateSite/${id}`,
    DELETE: (id: string) => `/api/Site/DeleteSite/${id}`,
    BULK_SAVE: '/api/Site/bulkSaveSite',
  },

  // Contractor
  CONTRACTOR: {
    BASE: '/api/Contractor',
    GET_ALL: '/api/Contractor',
    GET_BY_ID: (id: string) => `/api/Contractor/GetContractor/${id}`,
    GET_DETAILS: (id: string) => `/api/Contractor/GetContractorDetails/${id}`,
    ADD: (id: string) => `/api/Contractor/AddContractor/${id}`,
    ADD_BULK: (type: string) => `/api/Contractor/${type}`,
    UPDATE: (id: string) => `/api/Contractor/UpdateContractor/${id}`,
    DELETE: (id: string) => `/api/Contractor/${id}`,
  },

  // Labour
  LABOUR: {
    BASE: '/api/labours',
    GET_ALL: '/api/labours',
    ADD: '/api/labours',
    GET_BY_ID: (id: string) => `/api/labours/${id}`,
    UPDATE: (id: string) => `/api/labours/${id}`,
    DELETE: (id: string) => `/api/labours/${id}`,
  },

  // Attendance
  ATTENDANCE: {
    BASE: '/api/attendance',
    MARK: '/api/attendance/mark',
    GET_BY_DATE: (date: string) => `/api/attendance/${date}`,
    GET_BY_LABOUR: (labourId: string, date: string) => 
      `/api/attendance/labour/${labourId}/${date}`,
    GET_SUMMARY: (date: string) => `/api/attendance/summary/${date}`,
  },

  // User Registration
  USER: {
    BASE: '/api/UserRegistration',
    GET_ALL: '/api/UserRegistration',
    GET_BY_ID: (id: string) => `/api/UserRegistration/GetUser/${id}`,
    ADD: '/api/UserRegistration/AddUser',
    UPDATE: (id: string) => `/api/UserRegistration/UpdateUser/${id}`,
    DELETE: (id: string) => `/api/UserRegistration/${id}`,
  },
} as const;

/**
 * HTTP Status codes for consistent error handling
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Storage keys for auth tokens
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'lms_auth_token',
  REFRESH_TOKEN: 'lms_refresh_token',
  USER: 'lms_user',
  SELECTED_COMPANY: 'lms_selected_company',
} as const;

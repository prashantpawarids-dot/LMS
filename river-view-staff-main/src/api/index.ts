// =====================================================
// API Module - Centralized API Exports
// Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

// Configuration
export * from './config';

// HTTP Client
export { httpClient, ApiException } from './client';

// Services
export { authService } from './services/auth.service';
export { companyService } from './services/company.service';
export { siteService } from './services/site.service';
export { contractorService } from './services/contractor.service';
export { labourService } from './services/labour.service';
export { attendanceService } from './services/attendance.service';
export { userService } from './services/user.service';

/**
 * Unified API object for easy access
 */
import authService from './services/auth.service';
import companyService from './services/company.service';
import siteService from './services/site.service';
import contractorService from './services/contractor.service';
import labourService from './services/labour.service';
import attendanceService from './services/attendance.service';
import userService from './services/user.service';

export const api = {
  auth: authService,
  company: companyService,
  site: siteService,
  contractor: contractorService,
  labour: labourService,
  attendance: attendanceService,
  user: userService,
} as const;

export default api;

// =====================================================
// Labour Management System - Type Definitions
// All rights reserved by IDS IS PVT LTD
// Client: River View City
// =====================================================

// ==================== Auth Types ====================
export interface LoginCredentials {
  username: string;
  password: string;
  companyId?: string;
}

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  companyId: string;
  companyName: string;
  permissions: Permission[];
  token: string;
}

export type UserRole = 
  | 'COMP_ADMIN' 
  | 'HR_MANAGER' 
  | 'SITE_SUPERVISOR' 
  | 'ACCOUNTANT' 
  | 'LABOUR_VIEWER';

export interface Permission {
  moduleCode: string;
  actions: ('VIEW' | 'CREATE' | 'EDIT' | 'DELETE' | 'APPROVE' | 'EXPORT')[];
}

// ==================== Company Types ====================
export interface Company {
  id: string;
  companyCode: string;
  companyName: string;
  address?: string;
  contactPerson?: string;
  contactNo?: string;
  email?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDTO {
  companyCode: string;
  companyName: string;
  address?: string;
  contactPerson?: string;
  contactNo?: string;
  email?: string;
}

export interface UpdateCompanyDTO extends Partial<CreateCompanyDTO> {
  status?: 'active' | 'inactive';
}

// ==================== Site/Project Types ====================
export interface Site {
  id: string;
  siteCode: string;
  siteName: string;
  address?: string;
  companyId: string;
  companyName?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSiteDTO {
  siteCode: string;
  siteName: string;
  address?: string;
  companyId: string;
}

export interface UpdateSiteDTO extends Partial<CreateSiteDTO> {
  status?: 'active' | 'inactive';
}

// ==================== Contractor Types ====================
export interface Contractor {
  id: string;
  contractorCode: string;
  name: string;
  contactPerson?: string;
  contactNo?: string;
  email?: string;
  address?: string;
  workOrderNo?: string;
  companyId: string;
  status: 'active' | 'blocked';
  createdAt: string;
  updatedAt: string;
}

export interface CreateContractorDTO {
  contractorCode?: string;
  name: string;
  contactPerson?: string;
  contactNo?: string;
  email?: string;
  address?: string;
  workOrderNo?: string;
  companyId: string;
}

export interface UpdateContractorDTO extends Partial<CreateContractorDTO> {
  status?: 'active' | 'blocked';
}

export interface ContractorDetails extends Contractor {
  laboursCount: number;
  activeSites: Site[];
  workOrders: WorkOrder[];
}

export interface WorkOrder {
  id: string;
  workOrderNo: string;
  createdAt: string;
}

// ==================== Labour Types ====================
export interface Labour {
  id: string;
  passNo: string;
  name: string;
  fatherName?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo?: string;
  address?: string;
  category: LabourCategory;
  type: LabourType;
  skillType?: string;
  dailyWage: number;
  contractorId: string;
  contractorName?: string;
  siteId: string;
  siteName?: string;
  companyId: string;
  photo?: string;
  idProofType?: string;
  idProofNo?: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'blocked';
  fingerEnrolled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type LabourCategory = 
  | 'Labour'
  | 'Staff'
  | 'Security'
  | 'Driver'
  | 'Technician'
  | 'Engineer'
  | 'Supervisor'
  | 'Other';

export type LabourType = 
  | 'Resident'
  | 'Construction'
  | 'Contractor'
  | 'FT_Employee';

export interface CreateLabourDTO {
  name: string;
  fatherName?: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  contactNo?: string;
  address?: string;
  category: LabourCategory;
  type: LabourType;
  skillType?: string;
  dailyWage: number;
  contractorId: string;
  siteId: string;
  companyId: string;
  idProofType?: string;
  idProofNo?: string;
  issueDate: string;
  expiryDate: string;
}

// ==================== Attendance Types ====================
export interface Attendance {
  id: string;
  labourId: string;
  labourName?: string;
  passNo?: string;
  siteId: string;
  siteName?: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  workHours?: number;
  overtime?: number;
  remarks?: string;
}

export type AttendanceStatus = 
  | 'present'
  | 'absent'
  | 'half_day'
  | 'overtime'
  | 'leave';

export interface MarkAttendanceDTO {
  labourId: string;
  siteId: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  remarks?: string;
}

export interface DailyAttendanceSummary {
  date: string;
  siteId: string;
  siteName: string;
  totalLabours: number;
  present: number;
  absent: number;
  halfDay: number;
  onLeave: number;
  records: Attendance[];
}

// ==================== User Types ====================
export interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: UserRole;
  companyId: string;
  companyName?: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  companyId: string;
}

export interface UpdateUserDTO {
  email?: string;
  fullName?: string;
  role?: UserRole;
  status?: 'active' | 'inactive';
}

// ==================== API Response Types ====================
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// ==================== Filter & Search Types ====================
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface DateRangeFilter {
  fromDate: string;
  toDate: string;
}

export interface LabourFilter extends PaginationParams {
  search?: string;
  category?: LabourCategory;
  type?: LabourType;
  status?: string;
  siteId?: string;
  contractorId?: string;
}

export interface AttendanceFilter extends DateRangeFilter {
  siteId?: string;
  labourId?: string;
  status?: AttendanceStatus;
}

// ==================== Dashboard Types ====================
export interface DashboardStats {
  totalLabours: number;
  activeLabours: number;
  todayAttendance: number;
  attendanceRate: number;
  totalSites: number;
  activeSites: number;
  totalContractors: number;
  pendingPayments: number;
}

export interface AttendanceTrend {
  date: string;
  present: number;
  absent: number;
  total: number;
}

export interface SiteWiseStats {
  siteId: string;
  siteName: string;
  totalLabours: number;
  presentToday: number;
  attendanceRate: number;
}

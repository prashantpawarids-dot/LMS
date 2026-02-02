// =====================================================
// Attendance Service - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import httpClient from '../client';
import { API_ENDPOINTS } from '../config';
import type { 
  Attendance,
  MarkAttendanceDTO,
  DailyAttendanceSummary,
  ApiResponse,
  AttendanceFilter 
} from '@/types';

/**
 * Attendance service for marking and retrieving attendance
 */
export const attendanceService = {
  /**
   * Mark attendance for a labour
   */
  async mark(data: MarkAttendanceDTO): Promise<ApiResponse<Attendance>> {
    return httpClient.post<ApiResponse<Attendance>>(
      API_ENDPOINTS.ATTENDANCE.MARK,
      data
    );
  },

  /**
   * Mark attendance for multiple labours
   */
  async markBulk(data: MarkAttendanceDTO[]): Promise<ApiResponse<Attendance[]>> {
    return httpClient.post<ApiResponse<Attendance[]>>(
      API_ENDPOINTS.ATTENDANCE.MARK,
      data
    );
  },

  /**
   * Get attendance records by date
   */
  async getByDate(date: string, filter?: AttendanceFilter): Promise<ApiResponse<Attendance[]>> {
    return httpClient.get<ApiResponse<Attendance[]>>(
      API_ENDPOINTS.ATTENDANCE.GET_BY_DATE(date),
      filter ? { ...filter } : undefined
    );
  },

  /**
   * Get daily attendance summary
   */
  async getDailySummary(date: string, siteId?: string): Promise<ApiResponse<DailyAttendanceSummary>> {
    return httpClient.get<ApiResponse<DailyAttendanceSummary>>(
      API_ENDPOINTS.ATTENDANCE.GET_SUMMARY(date),
      siteId ? { siteId } : undefined
    );
  },

  /**
   * Get attendance for a specific labour on a date
   */
  async getByLabour(labourId: string, date: string): Promise<ApiResponse<Attendance>> {
    return httpClient.get<ApiResponse<Attendance>>(
      API_ENDPOINTS.ATTENDANCE.GET_BY_LABOUR(labourId, date)
    );
  },

  /**
   * Get attendance for date range
   */
  async getByDateRange(
    fromDate: string, 
    toDate: string, 
    filter?: Omit<AttendanceFilter, 'fromDate' | 'toDate'>
  ): Promise<ApiResponse<Attendance[]>> {
    return httpClient.get<ApiResponse<Attendance[]>>(
      API_ENDPOINTS.ATTENDANCE.BASE,
      { fromDate, toDate, ...filter } as Record<string, unknown>
    );
  },

  /**
   * Get today's attendance
   */
  async getToday(siteId?: string): Promise<ApiResponse<Attendance[]>> {
    const today = new Date().toISOString().split('T')[0];
    return this.getByDate(today, siteId ? { siteId, fromDate: today, toDate: today } : undefined);
  },
};

export default attendanceService;

// =====================================================
// usePagination Hook - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState, useCallback, useMemo } from 'react';
import type { PaginationParams } from '@/types';

interface UsePaginationOptions {
  initialPage?: number;
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortOrder?: 'asc' | 'desc';
}

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  sortBy: string | undefined;
  sortOrder: 'asc' | 'desc';
  params: PaginationParams;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSorting: (field: string, order?: 'asc' | 'desc') => void;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (page: number) => void;
  reset: () => void;
}

/**
 * Hook for managing pagination state
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    initialPage = 1,
    initialPageSize = 10,
    initialSortBy,
    initialSortOrder = 'asc',
  } = options;

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState<string | undefined>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  const params = useMemo<PaginationParams>(() => ({
    page,
    pageSize,
    sortBy,
    sortOrder,
  }), [page, pageSize, sortBy, sortOrder]);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage));
  }, []);

  const handleSetPageSize = useCallback((size: number) => {
    setPageSize(size);
    setPage(1); // Reset to first page when changing page size
  }, []);

  const setSorting = useCallback((field: string, order?: 'asc' | 'desc') => {
    if (sortBy === field && !order) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(order || 'asc');
    }
  }, [sortBy]);

  const nextPage = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage(prev => Math.max(1, prev - 1));
  }, []);

  const goToPage = useCallback((targetPage: number) => {
    setPage(Math.max(1, targetPage));
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
    setSortBy(initialSortBy);
    setSortOrder(initialSortOrder);
  }, [initialPage, initialPageSize, initialSortBy, initialSortOrder]);

  return {
    page,
    pageSize,
    sortBy,
    sortOrder,
    params,
    setPage: handleSetPage,
    setPageSize: handleSetPageSize,
    setSorting,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}

export default usePagination;

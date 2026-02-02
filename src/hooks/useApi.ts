// =====================================================
// useApi Hook - Labour Management System
// All rights reserved by IDS IS PVT LTD
// =====================================================

import { useState, useCallback } from 'react';
import { ApiException } from '@/api';

interface UseApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseApiReturn<T, P extends unknown[]> extends UseApiState<T> {
  execute: (...args: P) => Promise<T | null>;
  reset: () => void;
  setData: (data: T | null) => void;
}

/**
 * Generic hook for API calls with loading and error states
 */
export function useApi<T, P extends unknown[] = []>(
  apiFunc: (...args: P) => Promise<T>
): UseApiReturn<T, P> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await apiFunc(...args);
        setState({ data: result, isLoading: false, error: null });
        return result;
      } catch (error) {
        const apiError = error instanceof ApiException 
          ? new Error(error.message)
          : error instanceof Error 
            ? error 
            : new Error('Unknown error occurred');
        
        setState({ data: null, isLoading: false, error: apiError });
        return null;
      }
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setState({ data: null, isLoading: false, error: null });
  }, []);

  const setData = useCallback((data: T | null) => {
    setState(prev => ({ ...prev, data }));
  }, []);

  return {
    ...state,
    execute,
    reset,
    setData,
  };
}

export default useApi;

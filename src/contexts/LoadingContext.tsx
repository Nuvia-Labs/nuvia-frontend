'use client';

import { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

interface LoadingContextType {
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setGlobalLoading = (loading: boolean) => {
    setIsGlobalLoading(loading);
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    // Set auto-reset timeout when loading starts
    if (loading) {
      timeoutRef.current = setTimeout(() => {
        setIsGlobalLoading(false);
        timeoutRef.current = null;
      }, 15000); // 15 second safety timeout
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isGlobalLoading, setGlobalLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
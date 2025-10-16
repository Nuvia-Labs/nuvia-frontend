'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isGlobalLoading, setGlobalLoading] = useState(false);

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
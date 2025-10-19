'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationStore, getIndexFromPathname } from '@/stores/navigationStore';

interface NavigationProviderProps {
  children: React.ReactNode;
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const pathname = usePathname();
  const { setActiveIndex, activeIndex } = useNavigationStore();

  // Initialize navigation state on mount and path changes
  useEffect(() => {
    const newIndex = getIndexFromPathname(pathname);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [pathname, setActiveIndex, activeIndex]);

  return <>{children}</>;
}
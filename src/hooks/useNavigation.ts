import { useRouter } from 'next/navigation';
import { useNavigationStore, getPathnameFromIndex } from '@/stores/navigationStore';

/**
 * Hook for smooth navigation with Zustand state management
 */
export const useNavigation = () => {
  const router = useRouter();
  const {
    activeIndex,
    isTransitioning,
    setActiveIndex,
  } = useNavigationStore();

  /**
   * Navigate to a specific index with smooth transitions
   */
  const navigateToIndex = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    
    setActiveIndex(index);
    const pathname = getPathnameFromIndex(index);
    router.push(pathname);
  };

  /**
   * Navigate to a specific route with smooth transitions
   */
  const navigateToRoute = (href: string) => {
    const navItems = useNavigationStore.getState().navItems;
    const index = navItems.findIndex(item => item.href === href);
    
    if (index >= 0) {
      navigateToIndex(index);
    } else {
      router.push(href);
    }
  };

  /**
   * Get current route information
   */
  const getCurrentRoute = () => {
    const navItems = useNavigationStore.getState().navItems;
    return navItems[activeIndex];
  };

  return {
    activeIndex,
    isTransitioning,
    navigateToIndex,
    navigateToRoute,
    getCurrentRoute,
  };
};
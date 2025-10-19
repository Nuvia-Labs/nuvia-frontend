import { create } from 'zustand';

interface NavigationState {
  // Current active tab index
  activeIndex: number;
  
  // Previous active index for smooth transitions
  previousIndex: number;
  
  // Loading states for smooth transitions
  isTransitioning: boolean;
  
  // Hide navbars state
  hideNavbars: boolean;
  
  // AI loading state
  isAILoading: boolean;
  
  // Actions
  setActiveIndex: (index: number) => void;
  setTransitioning: (isTransitioning: boolean) => void;
  setHideNavbars: (hide: boolean) => void;
  setAILoading: (isLoading: boolean) => void;
  
  // Navigation items for consistent state
  navItems: Array<{
    href: string;
    label: string;
    icon: string;
  }>;
}

// Navigation items definition
const navItems = [
  { href: '/friends', label: 'Friends', icon: 'Users' },
  { href: '/earn', label: 'Earn', icon: 'Layers' },
  { href: '/ai', label: 'AI', icon: 'Zap' },
  { href: '/portfolio', label: 'Portfolio', icon: 'Briefcase' },
];

export const useNavigationStore = create<NavigationState>((set, get) => ({
  activeIndex: 1, // Default to Earn page
  previousIndex: 1,
  isTransitioning: false,
  hideNavbars: false,
  isAILoading: false,
  navItems,
  
  setActiveIndex: (index: number) => {
    const currentIndex = get().activeIndex;
    set({ 
      previousIndex: currentIndex,
      activeIndex: index,
      isTransitioning: true 
    });
    
    // Reset transitioning state after animation
    setTimeout(() => {
      set({ isTransitioning: false });
    }, 300);
  },
  
  setTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
  
  setHideNavbars: (hide: boolean) => set({ hideNavbars: hide }),
  
  setAILoading: (isLoading: boolean) => set({ isAILoading: isLoading }),
}));

// Helper function to get index from pathname
export const getIndexFromPathname = (pathname: string): number => {
  const index = navItems.findIndex(item => item.href === pathname);
  return index >= 0 ? index : 1; // Default to Earn if not found
};

// Helper function to get pathname from index
export const getPathnameFromIndex = (index: number): string => {
  return navItems[index]?.href || '/earn';
};
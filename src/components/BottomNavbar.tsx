'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Layers, Briefcase, Zap } from 'lucide-react';
import { startTransition, useCallback, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useNavigationStore, getIndexFromPathname } from '@/stores/navigationStore';

const navItems = [
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/earn', label: 'Earn', icon: Layers },
  { href: '/ai', label: 'AI', icon: Zap },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
];

export function BottomNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const {
    activeIndex,
    isTransitioning,
    hideNavbars,
    isAILoading,
    setActiveIndex,
    setHideNavbars,
    setAILoading,
  } = useNavigationStore(
    useShallow((state) => ({
      activeIndex: state.activeIndex,
      isTransitioning: state.isTransitioning,
      hideNavbars: state.hideNavbars,
      isAILoading: state.isAILoading,
      setActiveIndex: state.setActiveIndex,
      setHideNavbars: state.setHideNavbars,
      setAILoading: state.setAILoading,
    }))
  );

  // Sync pathname changes with Zustand store
  useEffect(() => {
    const newIndex = getIndexFromPathname(pathname);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  }, [pathname, activeIndex, setActiveIndex]);

  useEffect(() => {
    const handleAILoading = (event: CustomEvent) => {
      setAILoading(event.detail.isLoading);
    };

    window.addEventListener('ai-loading-state', handleAILoading as EventListener);

    return () => {
      window.removeEventListener('ai-loading-state', handleAILoading as EventListener);
    };
  }, [setAILoading]);

  useEffect(() => {
    navItems.forEach((item) => {
      try {
        router.prefetch(item.href);
      } catch {
        // Ignore prefetch errors (e.g. during dev)
      }
    });
  }, [router]);

  // Watch for hide-navbars class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setHideNavbars(document.body.classList.contains('hide-navbars'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Initial check
    setHideNavbars(document.body.classList.contains('hide-navbars'));

    return () => observer.disconnect();
  }, [setHideNavbars]);

  // Handle navigation with smooth transitions
  const handleNavigation = useCallback(
    (href: string, index: number) => {
      if (index === activeIndex && pathname === href) {
        return;
      }

      setActiveIndex(index);

      startTransition(() => {
        router.push(href);
      });
    },
    [activeIndex, pathname, router, setActiveIndex]
  );

  const navButtons = useMemo(
    () =>
      navItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={item.href}
            onClick={() => handleNavigation(item.href, index)}
            className="relative z-10 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className={cn(
                'flex items-center justify-center w-[70px] h-11 rounded-full transition-all duration-150',
                isActive ? 'text-white' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.08 : 1,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <item.icon size={20} />
              </motion.div>
            </div>
          </motion.button>
        );
      }),
    [activeIndex, handleNavigation]
  );

  return (
    <AnimatePresence>
      {!isAILoading && !hideNavbars && (
        <motion.nav 
          className="fixed bottom-0 left-0 right-0 z-50"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            mass: 0.8
          }}
        >
          <div className="w-full max-w-sm mx-auto">
            <div className="flex items-center justify-center py-4 relative">
              <div className="flex items-center bg-gray-50 rounded-full p-1 relative px-2 shadow-lg border-2 border-gray-200 backdrop-blur-md">
                {/* Animated Background - Enhanced with Zustand */}
                <motion.div
                  className="absolute bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg border-2 border-red-300"
                  style={{
                    width: '70px',
                    height: '44px',
                    left: '8px',
                  }}
                  animate={{
                    x: activeIndex * 70,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 32,
                    mass: 0.55,
                    velocity: isTransitioning ? 5 : 0
                  }}
                />
                
                {/* Navigation Items */}
                {navButtons}
              </div>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Layers, Briefcase, Zap } from 'lucide-react';
import { useMemo, useEffect, useState } from 'react';

const navItems = [
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/earn', label: 'Earn', icon: Layers },
  { href: '/ai', label: 'AI', icon: Zap },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
];

export function BottomNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAILoading, setIsAILoading] = useState(false);
  const [hideNavbars, setHideNavbars] = useState(false);

  useEffect(() => {
    const handleAILoading = (event: CustomEvent) => {
      setIsAILoading(event.detail.isLoading);
    };

    window.addEventListener('ai-loading-state', handleAILoading as EventListener);
    
    return () => {
      window.removeEventListener('ai-loading-state', handleAILoading as EventListener);
    };
  }, []);

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
  }, []);

  // Memoize active index calculation
  const currentActiveIndex = useMemo(() => {
    const index = navItems.findIndex(item => item.href === pathname);
    return index >= 0 ? index : 0;
  }, [pathname]);

  // Memoize navigation items to prevent re-renders
  const navigationItems = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      isActive: pathname === item.href,
      index
    }));
  }, [pathname]);

  // Handle navigation with immediate visual feedback
  const handleNavigation = (href: string) => {
    router.push(href);
  };

  // Hide navbar when AI is loading or when navbars should be hidden
  if (isAILoading || hideNavbars) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-center py-4 relative">
          <div className="flex items-center bg-gray-50 rounded-full p-1 relative px-2 shadow-lg border-2 border-gray-200">
            {/* Animated Background - Optimized */}
            <motion.div
              className="absolute bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg border-2 border-red-300"
              style={{
                width: '70px',
                height: '44px',
                left: '8px',
              }}
              animate={{
                x: currentActiveIndex * 70,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8
              }}
            />
            
            {/* Navigation Items - Optimized */}
            {navigationItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigation(item.href)}
                className="relative z-10"
              >
                <div
                  className={cn(
                    'flex items-center justify-center w-[70px] h-11 rounded-full transition-colors duration-200',
                    item.isActive
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <item.icon size={20} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, Layers, Briefcase } from 'lucide-react';

const navItems = [
  { href: '/friends', label: 'Friends', icon: Users },
  { href: '/earn', label: 'Earn', icon: Layers },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex items-center justify-center py-4 relative">
          <div className="flex items-center bg-gray-50 rounded-full p-1 relative px-2 shadow-lg border-2 border-gray-200">
            {/* Animated Background */}
            {navItems.map((item, index) => {
              const isActive = pathname === item.href;
              return isActive ? (
                <motion.div
                  key={`bg-${item.href}`}
                  layoutId="activeTab"
                  className="absolute bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg border-2 border-red-300"
                  style={{
                    width: '80px',
                    height: '44px',
                    left: `${index * 80 + 8}px`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 800,
                    damping: 25
                  }}
                />
              ) : null;
            })}
            
            {/* Navigation Items */}
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative z-10"
                >
                  <motion.div
                    className={cn(
                      'flex items-center justify-center w-20 h-11 rounded-full transition-colors duration-150',
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 hover:text-gray-600'
                    )}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                  >
                    <item.icon size={20} />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
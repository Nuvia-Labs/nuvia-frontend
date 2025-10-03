'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useWallet } from '@/hooks/useWallet';
import { Home, TrendingUp, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/learn', label: 'Learn', icon: Home },
  { href: '/', label: 'Earn', icon: TrendingUp },
  { href: '/deposits', label: 'Profile', icon: User },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isConnecting, connect, disconnect } = useWallet();

  return (
    <>
      {/* Top Navigation - Connect Wallet */}
      <nav className="bg-red-500 to-transparent sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Nuvia Logo */}
            <div className="w-8 h-8 flex items-center justify-center">
              <Image
                src="/Images/Logo/nuvia-logo.png"
                alt="Nuvia Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            
            {/* Connect Wallet Button */}
            <Button
              onClick={user ? disconnect : connect}
              disabled={isConnecting}
              className="rounded-full px-4 h-8 text-xs font-medium shadow-sm hover:shadow-md transition-all bg-white hover:bg-gray-100 text-red-600"
            >
              <span className="ml-1">{user ? 'Connected' : 'Connect Wallet'}</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Learn, Earn, My Deposits */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto">
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
    </>
  );
}
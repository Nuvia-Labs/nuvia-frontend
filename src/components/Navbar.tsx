'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { WalletConnect } from './WalletConnect';
import { useWallet } from '@/hooks/useWallet';
import { Home, TrendingUp, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navItems = [
  { href: '/learn', label: 'Learn', icon: Home },
  { href: '/', label: 'Earn', icon: TrendingUp },
  { href: '/deposits', label: 'My Deposits', icon: Briefcase },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, isConnecting, connect, disconnect } = useWallet();

  return (
    <>
      {/* Top Navigation - Connect Wallet */}
      <nav className="bg-white sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-end items-center h-12">
            <Button
              onClick={user ? disconnect : connect}
              disabled={isConnecting}
              variant="outline"
              className="rounded-full px-6 h-10 text-sm font-medium shadow-sm hover:shadow-md transition-all"
            >
              <span>💼</span>
              <span className="ml-2">{user ? 'Connected' : 'Connect Wallet'}</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation - Learn, Earn, My Deposits */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-around py-3">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center transition-colors',
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <item.icon size={24} />
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
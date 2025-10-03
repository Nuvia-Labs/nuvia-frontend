'use client';

import Image from 'next/image';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/Button';

export function TopNavbar() {
  const { user, isConnecting, connect, disconnect } = useWallet();

  return (
    <nav className="bg-red-500 to-transparent sticky top-0 z-50">
      <div className="w-full max-w-sm mx-auto px-4">
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
  );
}
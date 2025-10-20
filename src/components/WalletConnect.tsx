'use client';

import { usePrivy } from '@privy-io/react-auth';
import { Wallet, User, Mail } from 'lucide-react';
import { NetworkIndicator } from './NetworkIndicator';

interface WalletConnectProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function WalletConnect({ className, variant = 'default' }: WalletConnectProps) {
  const { ready, authenticated, user, login, logout } = usePrivy();

  const isCompact = variant === 'compact';

  if (!ready) {
    return (
      <div
        className={`
          ${className}
          ${isCompact 
            ? 'px-3 py-2 text-sm' 
            : 'px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base'
          }
          bg-gray-100 rounded-xl animate-pulse
        `}
      />
    );
  }

  if (!authenticated) {
    return (
      <div className={className}>
        <button
          onClick={login}
          type="button"
          className={`
            group relative flex items-center justify-center gap-2 
            bg-white border border-gray-200 hover:border-gray-300 
            text-gray-700 hover:text-gray-900 
            rounded-xl transition-all duration-200 
            hover:shadow-md active:scale-95
            ${isCompact 
              ? 'px-3 py-2 text-sm' 
              : 'px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base'
            }
          `}
        >
          <div className="flex items-center gap-1">
            <Wallet size={isCompact ? 14 : 16} className="flex-shrink-0" />
          </div>
          <span className={`font-medium ${isCompact ? '' : 'hidden sm:inline'}`}>
            Connect Wallet
          </span>
          <span className={`font-medium ${isCompact ? 'hidden' : 'sm:hidden'}`}>
            Connect
          </span>
        </button>
      </div>
    );
  }

  // User is authenticated
  const displayName = user?.email?.address || 
                     user?.google?.email || 
                     user?.wallet?.address?.slice(0, 6) + '...' || 
                     'User';

  const isEmailUser = user?.email || user?.google;

  return (
    <div className={`${className} space-y-2`}>
      <NetworkIndicator />
      <button
        onClick={logout}
        type="button"
        className={`
          group relative flex items-center justify-center gap-2 
          bg-red-500 hover:bg-red-600 border border-red-600 hover:border-red-700 
          text-white 
          rounded-xl transition-all duration-200 
          hover:shadow-md active:scale-95
          ${isCompact 
            ? 'px-3 py-2 text-sm' 
            : 'px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base'
          }
        `}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
        <span className="font-medium truncate max-w-[120px] sm:max-w-none">
          {isCompact && displayName.length > 10 
            ? displayName.slice(0, 8) + '...' 
            : displayName
          }
        </span>
        {isEmailUser ? (
          <Mail size={14} className="opacity-80" />
        ) : (
          <User size={14} className="opacity-80" />
        )}
      </button>
    </div>
  );
}
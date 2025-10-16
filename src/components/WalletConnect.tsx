'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Wallet, User } from 'lucide-react';

interface WalletConnectProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function WalletConnect({ className, variant = 'default' }: WalletConnectProps) {
  return (
    <div className={className}>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          const isCompact = variant === 'compact';

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
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
                      <Wallet size={isCompact ? 16 : 18} className="flex-shrink-0" />
                      <span className={`font-medium ${isCompact ? '' : 'hidden sm:inline'}`}>
                        Connect Wallet
                      </span>
                      <span className={`font-medium ${isCompact ? 'hidden' : 'sm:hidden'}`}>
                        Connect
                      </span>
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className={`
                        group relative flex items-center justify-center gap-2 
                        bg-orange-50 border border-orange-200 hover:border-orange-300 
                        text-orange-700 hover:text-orange-800 
                        rounded-xl transition-all duration-200 
                        hover:shadow-md active:scale-95
                        ${isCompact 
                          ? 'px-3 py-2 text-sm' 
                          : 'px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base'
                        }
                      `}
                    >
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      <span className="font-medium">
                        {isCompact ? 'Switch' : 'Wrong Network'}
                      </span>
                    </button>
                  );
                }

                return (
                  <button
                    onClick={openAccountModal}
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
                      {isCompact 
                        ? account.displayName?.slice(0, 6) + '...' 
                        : account.displayName
                      }
                    </span>
                    <User size={14} className="opacity-80" />
                  </button>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
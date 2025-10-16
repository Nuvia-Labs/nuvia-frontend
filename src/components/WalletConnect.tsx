'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletConnectProps {
  className?: string;
}

export function WalletConnect({ className }: WalletConnectProps) {
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
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md border border-red-600"
                    >
                      Connect
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md border border-orange-600"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium transition-all shadow-sm hover:shadow-md border border-red-600 flex items-center gap-1"
                  >
                    <div className="w-3 h-3 bg-white rounded-full" />
                    <span className="hidden sm:inline">{account.displayName}</span>
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
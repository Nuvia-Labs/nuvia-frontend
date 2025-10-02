'use client';

import { User } from '@/lib/types';
import { truncateAddress } from '@/lib/utils';
import { Button } from '@/components/ui';

interface WalletConnectProps {
  user: User | null;
  isConnecting: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({ user, isConnecting, onConnect, onDisconnect }: WalletConnectProps) {
  if (user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-green-700">
            {truncateAddress(user.walletAddress)}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onDisconnect}
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="primary"
      size="md"
      onClick={onConnect}
      isLoading={isConnecting}
      disabled={isConnecting}
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </Button>
  );
}
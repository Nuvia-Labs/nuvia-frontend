'use client';

import { useAccount, useDisconnect, useBalance } from 'wagmi';
import { useCallback } from 'react';
import { config } from '@/lib/config';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: usdcBalance } = useBalance({
    address,
    token: config.contracts.usdc,
  });

  const getBalance = useCallback(async (assetSymbol: string): Promise<number> => {
    if (!address) return 0;

    if (assetSymbol === 'USDC' && usdcBalance) {
      return parseFloat(usdcBalance.formatted);
    }

    const mockBalances: Record<string, number> = {
      'cbBTC': 0.5,
      'cbETH': 2.5,
    };

    return mockBalances[assetSymbol] || 0;
  }, [address, usdcBalance]);

  return {
    address,
    isConnected,
    disconnect,
    getBalance,
    usdcBalance: usdcBalance ? parseFloat(usdcBalance.formatted) : 0
  };
}
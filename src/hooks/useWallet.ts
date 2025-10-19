'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAccount, useBalance } from 'wagmi';
import { useCallback } from 'react';
import { config } from '@/lib/config';

export function useWallet() {
  const { authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const { address } = useAccount();

  // Get the active wallet address - either from embedded wallet or connected wallet
  const walletAddress = address || wallets[0]?.address;
  const isConnected = authenticated && !!walletAddress;

  const { data: usdcBalance } = useBalance({
    address: walletAddress as `0x${string}`,
    token: config.contracts.usdc,
  });

  const getBalance = useCallback(async (assetSymbol: string): Promise<number> => {
    if (!walletAddress) return 0;

    if (assetSymbol === 'USDC' && usdcBalance) {
      return Number(usdcBalance.formatted);
    }

    const mockBalances: Record<string, number> = {
      'cbBTC': 0.5,
      'cbETH': 2.5,
    };

    return mockBalances[assetSymbol] || 0;
  }, [walletAddress, usdcBalance]);

  return {
    address: walletAddress,
    isConnected,
    disconnect: logout,
    getBalance,
    usdcBalance: usdcBalance ? Number(usdcBalance.formatted) : 0,
    user,
    authenticated
  };
}
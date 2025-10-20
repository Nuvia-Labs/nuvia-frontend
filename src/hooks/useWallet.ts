'use client';

import { usePrivy, useWallets } from '@privy-io/react-auth';
import { useAccount, useBalance, useChainId, useSwitchChain } from 'wagmi';
import { useCallback, useEffect } from 'react';
import { config } from '@/lib/config';

export function useWallet() {
  const { authenticated, user, logout } = usePrivy();
  const { wallets } = useWallets();
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Get the active wallet address - either from embedded wallet or connected wallet
  const walletAddress = address || wallets[0]?.address;
  const isConnected = authenticated && !!walletAddress;
  const isCorrectNetwork = chainId === config.network.chainId;

  // Auto-switch to Base Sepolia when wallet is connected but on wrong network
  useEffect(() => {
    if (isConnected && !isCorrectNetwork && switchChain) {
      switchChain({ chainId: config.network.chainId });
    }
  }, [isConnected, isCorrectNetwork, switchChain]);

  const switchToBaseSepoliaChain = useCallback(async () => {
    if (switchChain) {
      try {
        await switchChain({ chainId: config.network.chainId });
        return true;
      } catch (error) {
        console.error('Failed to switch network:', error);
        return false;
      }
    }
    return false;
  }, [switchChain]);

  const { data: usdcBalance } = useBalance({
    address: walletAddress as `0x${string}`,
    token: config.contracts.usdc,
  });

  const getBalance = useCallback(async (assetSymbol: string): Promise<number> => {
    if (!walletAddress) return 0;

    if (assetSymbol === 'USDC' && usdcBalance) {
      return Number(usdcBalance.value) / Math.pow(10, usdcBalance.decimals);
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
    isCorrectNetwork,
    chainId,
    disconnect: logout,
    getBalance,
    usdcBalance: usdcBalance ? Number(usdcBalance.value) / Math.pow(10, usdcBalance.decimals) : 0,
    user,
    authenticated,
    switchToBaseSepoliaChain
  };
}
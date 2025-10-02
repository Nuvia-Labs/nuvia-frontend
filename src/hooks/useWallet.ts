'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, WalletConnectionResponse } from '@/lib/types';
import { storage } from '@/lib/utils';

// Mock Farcaster connection for development
const mockFarcasterConnection = (): Promise<WalletConnectionResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful connection
      resolve({
        success: true,
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        farcasterFid: 'demo_user_12345'
      });
    }, 1500);
  });
};

export function useWallet() {
  const [user, setUser] = useState<User | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = storage.get<User>('farcaster-defi-user');
    if (storedUser) {
      // Ensure dates are properly converted
      const userWithDates = {
        ...storedUser,
        connectedAt: new Date(storedUser.connectedAt),
        deposits: storedUser.deposits.map(d => ({
          ...d,
          timestamp: new Date(d.timestamp)
        }))
      };
      setUser(userWithDates);
    }
  }, []);

  // Connect wallet through Farcaster
  const connect = useCallback(async () => {
    if (isConnecting) return;

    setIsConnecting(true);
    setError(null);

    try {
      // In a real implementation, this would use @farcaster/frame-kit
      const response = await mockFarcasterConnection();

      if (response.success && response.walletAddress && response.farcasterFid) {
        const newUser: User = {
          farcasterFid: response.farcasterFid,
          walletAddress: response.walletAddress,
          deposits: [],
          totalDeposited: 0,
          connectedAt: new Date()
        };

        setUser(newUser);
        storage.set('farcaster-defi-user', newUser);
      } else {
        throw new Error(response.error || 'Failed to connect wallet');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Connection failed';
      setError(errorMessage);
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [isConnecting]);

  // Disconnect wallet
  const disconnect = useCallback(() => {
    setUser(null);
    setError(null);
    storage.remove('farcaster-defi-user');
    storage.remove('farcaster-defi-deposits');
  }, []);

  // Update user data
  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser);
    storage.set('farcaster-defi-user', updatedUser);
  }, []);

  // Check if wallet is connected
  const isConnected = Boolean(user);

  // Get wallet balance for specific asset (mock implementation)
  const getBalance = useCallback(async (assetSymbol: string): Promise<number> => {
    if (!user?.walletAddress) return 0;

    // Mock balance check
    const mockBalances: Record<string, number> = {
      'cbBTC': 0.5,
      'cbETH': 2.5,
      'USDC': 5000
    };

    return mockBalances[assetSymbol] || 0;
  }, [user?.walletAddress]);

  return {
    user,
    isConnected,
    isConnecting,
    error,
    connect,
    disconnect,
    updateUser,
    getBalance
  };
}
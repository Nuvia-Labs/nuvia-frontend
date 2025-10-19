'use client';

import { useState, useEffect, useCallback } from 'react';
import { Deposit, Asset, DepositStatus } from '@/lib/types';
import { mockApiResponses } from '@/lib/mock-data';
import { storage } from '@/lib/utils';

export function useDeposits(userFid?: string) {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load deposits from localStorage on mount
  useEffect(() => {
    if (!userFid) return;

    const loadDeposits = async () => {
      try {
        setIsLoading(true);
        const response = await mockApiResponses.getUserDeposits(userFid);
        setDeposits(response.deposits);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load deposits');
      } finally {
        setIsLoading(false);
      }
    };

    loadDeposits();
  }, [userFid]);

  // Create new deposit
  const createDeposit = useCallback(async (asset: Asset, amount: number): Promise<{ success: boolean; error?: string }> => {
    if (!userFid) {
      return { success: false, error: 'User not connected' };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApiResponses.createDeposit(asset.id, amount, userFid);

      if (response.success && response.deposit) {
        // Add to local state
        const newDeposit = response.deposit;
        setDeposits(prev => [newDeposit, ...prev]);

        // Save to localStorage
        const allDeposits = storage.get<Deposit[]>('farcaster-defi-deposits') || [];
        allDeposits.push(newDeposit);
        storage.set('farcaster-defi-deposits', allDeposits);

        return { success: true };
      } else {
        return { success: false, error: response.error || 'Deposit failed' };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Deposit failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [userFid]);

  // Update deposit status (for transaction processing)
  const updateDepositStatus = useCallback((depositId: string, status: DepositStatus, txHash?: string) => {
    setDeposits(prev => prev.map(deposit => 
      deposit.id === depositId 
        ? { ...deposit, status, txHash }
        : deposit
    ));

    // Update localStorage
    const allDeposits = storage.get<Deposit[]>('farcaster-defi-deposits') || [];
    const updatedDeposits = allDeposits.map(deposit =>
      deposit.id === depositId
        ? { ...deposit, status, txHash }
        : deposit
    );
    storage.set('farcaster-defi-deposits', updatedDeposits);
  }, []);

  // Get deposits by status
  const getDepositsByStatus = useCallback((status: DepositStatus) => {
    return deposits.filter(deposit => deposit.status === status);
  }, [deposits]);

  // Calculate total deposited amount
  const totalDeposited = deposits
    .filter(deposit => deposit.status === 'confirmed')
    .reduce((sum, deposit) => sum + deposit.amount, 0);

  // Calculate total estimated yield
  const totalEstimatedYield = deposits
    .filter(deposit => deposit.status === 'confirmed')
    .reduce((sum, deposit) => sum + deposit.estimatedYield, 0);

  // Get deposits by asset
  const getDepositsByAsset = useCallback((assetId: string) => {
    return deposits.filter(deposit => deposit.assetId === assetId);
  }, [deposits]);

  // Calculate total deposited for specific asset
  const getTotalDepositedByAsset = useCallback((assetId: string) => {
    return deposits
      .filter(deposit => deposit.assetId === assetId && deposit.status === 'confirmed')
      .reduce((sum, deposit) => sum + deposit.amount, 0);
  }, [deposits]);

  // Get recent deposits (last 5)
  const recentDeposits = deposits
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  // Refresh deposits from API
  const refreshDeposits = useCallback(async () => {
    if (!userFid) return;

    try {
      setIsLoading(true);
      const response = await mockApiResponses.getUserDeposits(userFid);
      setDeposits(response.deposits);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh deposits');
    } finally {
      setIsLoading(false);
    }
  }, [userFid]);

  return {
    deposits,
    isLoading,
    error,
    totalDeposited,
    totalEstimatedYield,
    recentDeposits,
    createDeposit,
    updateDepositStatus,
    getDepositsByStatus,
    getDepositsByAsset,
    getTotalDepositedByAsset,
    refreshDeposits
  };
}
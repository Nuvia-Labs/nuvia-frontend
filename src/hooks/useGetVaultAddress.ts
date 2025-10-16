'use client';

import { useState, useEffect } from 'react';

interface Contracts {
  strategy_manager: string;
  gateway: string;
}

interface VaultInfoResponse {
  total_tvl: number;
  allocations: Record<string, number>;
  network: string;
  contracts: Contracts;
}

export function useGetVaultAddress() {
  const [data, setData] = useState<VaultInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVaultInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/vault-info`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch vault info');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVaultInfo();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchVaultInfo
  };
}
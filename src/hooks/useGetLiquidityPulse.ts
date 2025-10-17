'use client';

import { useState, useEffect } from 'react';

interface Protocol {
  protocol: string;
  pulse_score: number;
  status: string;
  tvl: number;
  tvl_change_24h: number;
  net_flow: string;
  is_anomaly: boolean;
  alert: string | null;
  timestamp: string;
}

interface VaultPulse {
  vault_pulse: number;
  status: string;
  timestamp: string;
}

interface LiquidityPulseResponse {
  vault_pulse: VaultPulse;
  protocols: Protocol[];
}

export function useGetLiquidityPulse(enabled: boolean = true) {
  const [data, setData] = useState<LiquidityPulseResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLiquidityPulse = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/liquidity-pulse`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch liquidity pulse data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchLiquidityPulse();
    }
  }, [enabled]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchLiquidityPulse
  };
}
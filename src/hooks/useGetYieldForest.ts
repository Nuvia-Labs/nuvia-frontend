'use client';

import { useState, useEffect } from 'react';

interface YieldForecast {
  protocol: string;
  current_apy: number;
  forecast_7d: number[];
  trend: string;
  weather: string;
  confidence: number;
  slope: number;
}

interface YieldForestResponse {
  timestamp: number;
  forecasts: YieldForecast[];
}

export function useGetYieldForest() {
  const [data, setData] = useState<YieldForestResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchYieldForest = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/yield-forecast`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch yield forest data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchYieldForest();
  }, []);

  return {
    data,
    isLoading,
    error,
    refetch: fetchYieldForest
  };
}
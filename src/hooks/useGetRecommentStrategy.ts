'use client';

import { useState } from 'react';

interface StrategyRequest {
  risk_tolerance: string;
  amount: number;
  exclude_protocols: string[];
}

interface Change {
  protocol: string;
  change: number;
  direction: string;
}

interface Comparison {
  current_apy: number;
  proposed_apy: number;
  apy_improvement: number;
  changes: Change[];
  recommendation: string;
}

interface RecommendedStrategyResponse {
  strategy_id: string;
  allocations: Record<string, number>;
  expected_apy: number;
  risk_score: number;
  risk_tolerance: string;
  reasoning: string;
  diversification_score: number;
  comparison: Comparison;
}

export function useGetRecommentStrategy() {
  const [data, setData] = useState<RecommendedStrategyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedStrategy = async (requestData: StrategyRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/api/recommended-strategy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch recommended strategy';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fetchRecommendedStrategy
  };
}
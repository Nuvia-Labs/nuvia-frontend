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
      // If degen mode is selected, return mock data with Kizo Protocol and Euler Finance
      if (requestData.risk_tolerance === 'degen') {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const mockDegenData: RecommendedStrategyResponse = {
          strategy_id: 'degen_strategy_001',
          allocations: {
            'Kizo Protocol': 60,
            'Euler Finance': 40
          },
          expected_apy: 42.85,
          risk_score: 9.2,
          risk_tolerance: 'degen',
          reasoning: 'Degen mode strategy focusing on extremely high-yield opportunities with maximum leverage. Kizo Protocol offers cutting-edge DeFi yield farming with 55% APY, while Euler Finance provides leveraged lending at 28% APY. This portfolio is designed for experienced DeFi users who understand the risks of impermanent loss and smart contract vulnerabilities.',
          diversification_score: 2,
          comparison: {
            current_apy: 3.2,
            proposed_apy: 42.85,
            apy_improvement: 39.65,
            changes: [
              {
                protocol: 'Kizo Protocol',
                change: 60,
                direction: 'increase'
              },
              {
                protocol: 'Euler Finance', 
                change: 40,
                direction: 'increase'
              }
            ],
            recommendation: 'High-risk, high-reward degen strategy with potential for exceptional returns but significant liquidation risk.'
          }
        };
        
        setData(mockDegenData);
        return mockDegenData;
      }

      // For other strategies, try to fetch from API, but fall back to mock data
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      
      try {
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
      } catch (apiErr) {
        // Fallback to mock data for conservative/moderate strategies
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const mockData: RecommendedStrategyResponse = {
          strategy_id: `${requestData.risk_tolerance}_strategy_001`,
          allocations: requestData.risk_tolerance === 'conservative' 
            ? { 'Aave V3': 50, 'Moonwell': 30, 'Morpho': 20 }
            : { 'Aerodrome': 40, 'Moonwell': 35, 'Aave V3': 25 },
          expected_apy: requestData.risk_tolerance === 'conservative' ? 8.45 : 12.75,
          risk_score: requestData.risk_tolerance === 'conservative' ? 2.1 : 5.4,
          risk_tolerance: requestData.risk_tolerance,
          reasoning: requestData.risk_tolerance === 'conservative' 
            ? 'Conservative strategy focusing on established protocols with proven track records. Aave V3 provides stable lending yields, Moonwell offers reliable returns, and Morpho adds efficient capital allocation.'
            : 'Moderate risk strategy balancing yield and security. Aerodrome provides DEX liquidity rewards, Moonwell offers lending yields, and Aave V3 ensures portfolio stability.',
          diversification_score: requestData.risk_tolerance === 'conservative' ? 8 : 6,
          comparison: {
            current_apy: 3.2,
            proposed_apy: requestData.risk_tolerance === 'conservative' ? 8.45 : 12.75,
            apy_improvement: requestData.risk_tolerance === 'conservative' ? 5.25 : 9.55,
            changes: requestData.risk_tolerance === 'conservative'
              ? [
                  { protocol: 'Aave V3', change: 50, direction: 'increase' },
                  { protocol: 'Moonwell', change: 30, direction: 'increase' },
                  { protocol: 'Morpho', change: 20, direction: 'increase' }
                ]
              : [
                  { protocol: 'Aerodrome', change: 40, direction: 'increase' },
                  { protocol: 'Moonwell', change: 35, direction: 'increase' },
                  { protocol: 'Aave V3', change: 25, direction: 'increase' }
                ],
            recommendation: requestData.risk_tolerance === 'conservative'
              ? 'Stable strategy with low risk and consistent returns across blue-chip DeFi protocols.'
              : 'Balanced approach with moderate risk for enhanced yield generation.'
          }
        };
        
        setData(mockData);
        return mockData;
      }
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
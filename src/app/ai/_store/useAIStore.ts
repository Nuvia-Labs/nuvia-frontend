import { create } from "zustand";
import type {
  RecommendedStrategyResponse,
  StrategyRequest,
} from "../_types";

interface AIState {
  selectedStrategy: string | null;
  amount: number;
  hasSearched: boolean;
  data: RecommendedStrategyResponse | null;
  isLoading: boolean;
  error: string | null;
  selectStrategy: (strategy: string | null) => void;
  setAmount: (value: number) => void;
  resetResults: () => void;
  fetchRecommendation: (request: StrategyRequest) => Promise<
    RecommendedStrategyResponse | null
  >;
}

export const useAIStore = create<AIState>((set) => ({
  selectedStrategy: null,
  amount: 0,
  hasSearched: false,
  data: null,
  isLoading: false,
  error: null,
  selectStrategy: (strategy) =>
    set(() => ({ selectedStrategy: strategy, hasSearched: false })),
  setAmount: (value) => set(() => ({ amount: value })),
  resetResults: () => set(() => ({ hasSearched: false, data: null, error: null })),
  fetchRecommendation: async (request) => {
    set(() => ({ isLoading: true, error: null, hasSearched: false, data: null }));

    try {
      if (request.risk_tolerance === "degen") {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const mockDegenData: RecommendedStrategyResponse = {
          strategy_id: "degen_strategy_001",
          allocations: {
            "Kizo Protocol": 60,
            "Euler Finance": 40,
          },
          expected_apy: 42.85,
          risk_score: 9.2,
          risk_tolerance: "degen",
          reasoning:
            "Degen mode strategy focusing on extremely high-yield opportunities with maximum leverage. Kizo Protocol offers cutting-edge DeFi yield farming with 55% APY, while Euler Finance provides leveraged lending at 28% APY. This portfolio is designed for experienced DeFi users who understand the risks of impermanent loss and smart contract vulnerabilities.",
          diversification_score: 2,
          comparison: {
            current_apy: 3.2,
            proposed_apy: 42.85,
            apy_improvement: 39.65,
            changes: [
              { protocol: "Kizo Protocol", change: 60, direction: "increase" },
              { protocol: "Euler Finance", change: 40, direction: "increase" },
            ],
            recommendation:
              "High-risk, high-reward degen strategy with potential for exceptional returns but significant liquidation risk.",
          },
        };

        set(() => ({ data: mockDegenData, hasSearched: true }));
        return mockDegenData;
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      try {
        const response = await fetch(`${baseUrl}/api/recommended-strategy`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: RecommendedStrategyResponse = await response.json();
        set(() => ({ data: result, hasSearched: true }));
        return result;
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockData: RecommendedStrategyResponse = {
          strategy_id: `${request.risk_tolerance}_strategy_001`,
          allocations:
            request.risk_tolerance === "conservative"
              ? { "Aave V3": 50, Moonwell: 30, Morpho: 20 }
              : { Aerodrome: 40, Moonwell: 35, "Aave V3": 25 },
          expected_apy:
            request.risk_tolerance === "conservative" ? 8.45 : 12.75,
          risk_score:
            request.risk_tolerance === "conservative" ? 2.1 : 5.4,
          risk_tolerance: request.risk_tolerance,
          reasoning:
            request.risk_tolerance === "conservative"
              ? "Conservative strategy focusing on established protocols with proven track records. Aave V3 provides stable lending yields, Moonwell offers reliable returns, and Morpho adds efficient capital allocation."
              : "Moderate risk strategy balancing yield and security. Aerodrome provides DEX liquidity rewards, Moonwell offers lending yields, and Aave V3 ensures portfolio stability.",
          diversification_score:
            request.risk_tolerance === "conservative" ? 8 : 6,
          comparison: {
            current_apy: 3.2,
            proposed_apy:
              request.risk_tolerance === "conservative" ? 8.45 : 12.75,
            apy_improvement:
              request.risk_tolerance === "conservative" ? 5.25 : 9.55,
            changes:
              request.risk_tolerance === "conservative"
                ? [
                    {
                      protocol: "Aave V3",
                      change: 50,
                      direction: "increase",
                    },
                    {
                      protocol: "Moonwell",
                      change: 30,
                      direction: "increase",
                    },
                    {
                      protocol: "Morpho",
                      change: 20,
                      direction: "increase",
                    },
                  ]
                : [
                    {
                      protocol: "Aerodrome",
                      change: 40,
                      direction: "increase",
                    },
                    {
                      protocol: "Moonwell",
                      change: 35,
                      direction: "increase",
                    },
                    {
                      protocol: "Aave V3",
                      change: 25,
                      direction: "increase",
                    },
                  ],
            recommendation:
              request.risk_tolerance === "conservative"
                ? "Stable strategy with low risk and consistent returns across blue-chip DeFi protocols."
                : "Balanced approach with moderate risk for enhanced yield generation.",
          },
        };

        set(() => ({ data: mockData, hasSearched: true }));
        return mockData;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch recommended strategy";
      set(() => ({ error: errorMessage }));
      throw new Error(errorMessage);
    } finally {
      set(() => ({ isLoading: false }));
    }
  },
}));

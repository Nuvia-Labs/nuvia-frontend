export interface StrategyRequest {
  risk_tolerance: string;
  amount: number;
  exclude_protocols: string[];
}

export interface Change {
  protocol: string;
  change: number;
  direction: string;
}

export interface Comparison {
  current_apy: number;
  proposed_apy: number;
  apy_improvement: number;
  changes: Change[];
  recommendation: string;
}

export interface RecommendedStrategyResponse {
  strategy_id: string;
  allocations: Record<string, number>;
  expected_apy: number;
  risk_score: number;
  risk_tolerance: string;
  reasoning: string;
  diversification_score: number;
  comparison: Comparison;
}

export interface WhaleActivity {
  amount: string;
  protocol: string;
  action: "deposited" | "withdrew" | "staked";
  timeAgo: string;
  isWhale: boolean;
  walletType: "whale" | "smart_money" | "institution";
}

export interface StrategyRecommendation {
  fromProtocol: string;
  toProtocol: string;
  amount: number;
  frequency: "daily" | "weekly" | "hourly";
  duration: number;
  expectedGain: number;
  confidenceTier: "High" | "Medium" | "Low";
  reasoning: string;
  riskLevel: "Low" | "Medium" | "High";
  whaleActivity?: WhaleActivity[];
  hotness?: "fire" | "trending" | "normal";
}

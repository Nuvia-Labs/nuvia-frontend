import type { StrategyRecommendation, WhaleActivity } from "./types";

const generateWhaleActivity = (protocol: string): WhaleActivity[] => {
  const activities: WhaleActivity[] = [];
  const amounts = ["2.5M", "8.3M", "15.7M", "543K", "1.2M", "4.8M", "12.1M"];
  const timeAgos = [
    "2m ago",
    "8m ago",
    "15m ago",
    "23m ago",
    "1h ago",
    "2h ago",
    "3h ago",
  ];
  const walletTypes: ("whale" | "smart_money" | "institution")[] = [
    "whale",
    "smart_money",
    "institution",
  ];
  const actions: ("deposited" | "withdrew" | "staked")[] = [
    "deposited",
    "staked",
    "deposited",
  ];

  const numActivities = Math.floor(Math.random() * 3) + 2;

  for (let i = 0; i < numActivities; i++) {
    activities.push({
      amount: amounts[Math.floor(Math.random() * amounts.length)],
      protocol,
      action: actions[Math.floor(Math.random() * actions.length)],
      timeAgo: timeAgos[i] || `${Math.floor(Math.random() * 24)}h ago`,
      isWhale: true,
      walletType: walletTypes[Math.floor(Math.random() * walletTypes.length)],
    });
  }

  return activities.sort((a, b) => {
    const aTime = parseInt(a.timeAgo);
    const bTime = parseInt(b.timeAgo);
    return aTime - bTime;
  });
};

export const generateStrategyRecommendations = (): StrategyRecommendation[] => {
  const strategies: StrategyRecommendation[] = [];

  strategies.push({
    fromProtocol: "USDC",
    toProtocol: "Aerodrome",
    amount: 100,
    frequency: "daily",
    duration: 7,
    expectedGain: 4.34,
    confidenceTier: "High",
    reasoning: `Aerodrome showing strong performance with rising trend and high confidence`,
    riskLevel: "Medium",
    whaleActivity: generateWhaleActivity("Aerodrome"),
  });

  strategies.push({
    fromProtocol: "Aerodrome",
    toProtocol: "Moonwell",
    amount: 100,
    frequency: "daily",
    duration: 7,
    expectedGain: 3.25,
    confidenceTier: "Medium",
    reasoning: `Moonwell has rising trend while Aerodrome provides stable base - balanced growth strategy`,
    riskLevel: "Medium",
    whaleActivity: generateWhaleActivity("Moonwell"),
  });

  strategies.push({
    fromProtocol: "USDC",
    toProtocol: "Zora",
    amount: 200,
    frequency: "hourly",
    duration: 3,
    expectedGain: 8.75,
    confidenceTier: "Low",
    reasoning: `Zora offering exceptional APY with high volatility - high risk, high reward opportunity`,
    riskLevel: "High",
    whaleActivity: generateWhaleActivity("Zora"),
  });

  strategies.push({
    fromProtocol: "USDC",
    toProtocol: "Kizo Protocol",
    amount: 500,
    frequency: "hourly",
    duration: 1,
    expectedGain: 45.67,
    confidenceTier: "Low",
    reasoning: `New DeFi protocol offering extreme APY with maximum volatility - pure degen play`,
    riskLevel: "High",
    whaleActivity: generateWhaleActivity("Kizo Protocol"),
  });

  strategies.push({
    fromProtocol: "USDC",
    toProtocol: "Euler Finance",
    amount: 1000,
    frequency: "daily",
    duration: 2,
    expectedGain: 32.89,
    confidenceTier: "Low",
    reasoning: `Leveraged lending strategy with Euler Finance - high risk, high return using leverage mechanics`,
    riskLevel: "High",
    whaleActivity: generateWhaleActivity("Euler Finance"),
  });

  return strategies;
};

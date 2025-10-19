export interface PortfolioData {
  currentValue: number;
  previousValue: number;
  change: number;
  changePercent: number;
  isPositive: boolean;
  chartData: number[];
  dates: string[];
}

export interface DepositItem {
  id: number;
  token: string;
  name: string;
  logo: string;
  amount: string;
  valueUSD: string;
  gain: string;
  apy: string;
  protocol: string;
  protocolLogo: string;
}

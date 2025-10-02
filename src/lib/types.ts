// Core entity types for the Farcaster DeFi yield mini app

export interface Asset {
  id: string;                 // Unique identifier (e.g., "usde", "ton")
  name: string;              // Display name (e.g., "USDe", "Toncoin")
  symbol: string;            // Trading symbol (e.g., "USDe", "TON")
  logoUrl: string;           // Asset logo image path
  apr: number;               // Annual percentage rate (decimal, e.g., 0.085 = 8.5%)
  tvl: number;               // Total value locked across all users
  description: string;       // Brief description of the asset/protocol
  isActive: boolean;         // Whether deposits are currently accepted
}

export type DepositStatus = 'pending' | 'confirmed' | 'failed';

export interface Deposit {
  id: string;                // Unique deposit identifier
  userId: string;            // Farcaster FID
  assetId: string;           // References Asset.id
  amount: number;            // Deposit amount in asset units
  timestamp: Date;           // When deposit was initiated
  status: DepositStatus;     // Current transaction status
  estimatedYield: number;    // Projected annual yield in asset units
  txHash?: string;          // Blockchain transaction hash (if applicable)
}

export interface User {
  farcasterFid: string;      // Farcaster Frame ID
  walletAddress: string;     // Connected wallet address
  deposits: Deposit[];       // User's deposit history
  totalDeposited: number;    // Sum of all confirmed deposits (computed)
  connectedAt: Date;         // When wallet was first connected
}

// API Contract types
export interface AssetResponse {
  id: string;
  name: string;
  symbol: string;
  logoUrl: string;
  apr: number;
  tvl: number;
  description: string;
  isActive: boolean;
}

export interface DepositRequest {
  assetId: string;
  amount: number;
  userFid: string;
}

export interface DepositResponse {
  deposit: {
    id: string;
    userId: string;
    assetId: string;
    amount: number;
    timestamp: string;
    status: DepositStatus;
    estimatedYield: number;
    txHash?: string;
  };
  success: boolean;
  error?: string;
}

export interface UserDepositsResponse {
  deposits: DepositResponse['deposit'][];
  totalDeposited: number;
  totalEstimatedYield: number;
}

// Wallet integration types
export interface WalletConnectionRequest {
  frameContext: string; // Farcaster frame context
}

export interface WalletConnectionResponse {
  success: boolean;
  walletAddress?: string;
  farcasterFid?: string;
  error?: string;
}

export interface BalanceCheckRequest {
  walletAddress: string;
  assetSymbol: string; // 'USDe', 'TON', etc.
}

export interface BalanceCheckResponse {
  balance: number;
  symbol: string;
  decimals: number;
  sufficient: boolean; // Whether balance covers requested amount
}

// App state types
export interface AppState {
  user: User | null;
  assets: Asset[];
  deposits: Deposit[];
  isLoading: boolean;
  error: string | null;
}

// Component prop types
export interface AssetCardProps {
  asset: Asset;
  onSelect: (asset: Asset) => void;
}

export interface DepositFormProps {
  asset: Asset;
  onDeposit: (amount: number) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface WalletConnectProps {
  onConnect: (user: User) => void;
  isConnecting?: boolean;
}

export interface NavbarProps {
  currentTab: 'earn' | 'deposits';
  onTabChange: (tab: 'earn' | 'deposits') => void;
}

// Utility types
export type FormatNumberOptions = {
  decimals?: number;
  currency?: boolean;
  percentage?: boolean;
};

export type LocalStorageKeys = 
  | 'farcaster-defi-user'
  | 'farcaster-defi-deposits' 
  | 'farcaster-defi-assets';
import { Asset, Deposit, DepositStatus } from './types';

// Mock vault data for development
export const mockAssets: Asset[] = [
  {
    id: 'cbbtc-vault',
    name: 'cbBTC',
    symbol: 'cbBTC',
    logoUrl: '/Images/Logo/cbbtc-logo.webp',
    apr: 0.085,  // 8.5%
    tvl: 15600000,  // $15.6M
    description: 'Coinbase Wrapped Bitcoin with institutional-grade security and DeFi rewards',
    isActive: true
  },
  {
    id: 'cbeth-vault',
    name: 'cbETH',
    symbol: 'cbETH',
    logoUrl: '/Images/Logo/cbeth-logo.png',
    apr: 0.067,  // 6.7%
    tvl: 24300000,  // $24.3M
    description: 'Coinbase Wrapped Ethereum with staking rewards and ecosystem benefits',
    isActive: true
  },
  {
    id: 'usdc-vault',
    name: 'USDC',
    symbol: 'USDC',
    logoUrl: '/Images/Logo/usdc-logo.png',
    apr: 0.053,  // 5.3%
    tvl: 38700000,  // $38.7M
    description: 'USDC stablecoin with consistent yield and low volatility exposure',
    isActive: true
  }
];

// Mock reward multipliers for each vault
export const mockRewardMultipliers = {
  'cbbtc-vault': [
    { name: 'Aerodrome', logo: '/Images/Logo/aerodrome-logo.svg', multiplier: '2x' },
    { name: 'Ethena', logo: '/Images/Logo/ethena-logo.png', multiplier: '1x' },
    { name: 'Moonwell', logo: '/Images/Logo/moonwell-logo.png', multiplier: '1x' }
  ],
  'cbeth-vault': [
    { name: 'EtherFi', logo: '/Images/Logo/etherfi-logo.png', multiplier: '3x' },
    { name: 'Aerodrome', logo: '/Images/Logo/aerodrome-logo.svg', multiplier: '2x' },
    { name: 'Tumbuh', logo: '/Images/Logo/tumbuh-logo.jpg', multiplier: '1x' }
  ],
  'usdc-vault': [
    { name: 'Moonwell', logo: '/Images/Logo/moonwell-logo.png', multiplier: '1x' },
    { name: 'Aerodrome', logo: '/Images/Logo/aerodrome-logo.svg', multiplier: '2x' },
    { name: 'Ethena', logo: '/Images/Logo/ethena-logo.png', multiplier: '1x' }
  ]
};

// Generate mock deposit for demo purposes
export const generateMockDeposit = (
  assetId: string, 
  amount: number, 
  userId: string,
  status: DepositStatus = 'confirmed'
): Deposit => {
  const asset = mockAssets.find(a => a.id === assetId);
  const estimatedYield = asset ? amount * asset.apr : 0;
  
  return {
    id: `deposit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    userId,
    assetId,
    amount,
    timestamp: new Date(),
    status,
    estimatedYield,
    txHash: status === 'confirmed' ? `0x${Math.random().toString(16).substr(2, 64)}` : undefined
  };
};

// Mock API responses
export const mockApiResponses = {
  getAssets: () => Promise.resolve(mockAssets),
  
  createDeposit: (assetId: string, amount: number, userFid: string) => {
    return new Promise<{ success: boolean; deposit?: Deposit; error?: string }>((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        if (amount <= 0) {
          resolve({ success: false, error: 'Amount must be greater than 0' });
          return;
        }
        
        const asset = mockAssets.find(a => a.id === assetId);
        if (!asset) {
          resolve({ success: false, error: 'Asset not found' });
          return;
        }
        
        if (!asset.isActive) {
          resolve({ success: false, error: 'Asset deposits are currently disabled' });
          return;
        }
        
        const deposit = generateMockDeposit(assetId, amount, userFid);
        resolve({ success: true, deposit });
      }, 1000 + Math.random() * 2000); // 1-3 second delay
    });
  },
  
  getUserDeposits: (userFid: string) => {
    // Get deposits from localStorage or return empty array
    const stored = localStorage.getItem('farcaster-defi-deposits');
    const deposits: Deposit[] = stored ? JSON.parse(stored) : [];
    
    const userDeposits = deposits
      .filter(d => d.userId === userFid)
      .map(d => ({
        ...d,
        timestamp: new Date(d.timestamp)
      }));
    
    const totalDeposited = userDeposits
      .filter(d => d.status === 'confirmed')
      .reduce((sum, d) => sum + d.amount, 0);
    
    const totalEstimatedYield = userDeposits
      .filter(d => d.status === 'confirmed')
      .reduce((sum, d) => sum + d.estimatedYield, 0);
    
    return Promise.resolve({
      deposits: userDeposits,
      totalDeposited,
      totalEstimatedYield
    });
  }
};


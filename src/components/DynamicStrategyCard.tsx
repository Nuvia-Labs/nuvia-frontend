'use client';

import { X, Eye, Users } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface WhaleActivity {
  amount: string;
  protocol: string;
  action: 'deposited' | 'withdrew' | 'staked';
  timeAgo: string;
  isWhale: boolean;
  walletType: 'whale' | 'smart_money' | 'institution';
}

interface StrategyRecommendation {
  fromProtocol: string;
  toProtocol: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'hourly';
  duration: number;
  expectedGain: number;
  confidenceTier: 'High' | 'Medium' | 'Low';
  reasoning: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  whaleActivity?: WhaleActivity[];
  hotness?: 'fire' | 'trending' | 'normal';
}

interface DynamicStrategyCardProps {
  strategy: StrategyRecommendation;
  onSelect: (strategy: StrategyRecommendation) => void;
  onDeselect?: () => void;
  isSelected?: boolean;
}

export function DynamicStrategyCard({ strategy, onSelect, onDeselect, isSelected = false }: DynamicStrategyCardProps) {

  const getWalletTypeEmoji = (walletType: string) => {
    switch (walletType) {
      case 'whale':
        return '🐋';
      case 'smart_money':
        return '🧠';
      case 'institution':
        return '🏛️';
      default:
        return '💰';
    }
  };

  const getWalletTypeLabel = (walletType: string) => {
    switch (walletType) {
      case 'whale':
        return 'Whale';
      case 'smart_money':
        return 'Smart Money';
      case 'institution':
        return 'Institution';
      default:
        return 'Big Wallet';
    }
  };


  const getProtocolLogo = (protocol: string) => {
    const protocolLower = protocol.toLowerCase().trim();
    switch (protocolLower) {
      case 'aerodrome':
        return '/Images/Logo/aerodrome-logo.svg';
      case 'moonwell':
        return '/Images/Logo/moonwell-logo.png';
      case 'aave':
        return '/Images/Logo/aave-logo.png';
      case 'cbeth':
        return '/Images/Logo/cbeth-logo.png';
      case 'cbbtc':
        return '/Images/Logo/cbbtc-logo.webp';
      case 'usdc':
        return '/Images/Logo/usdc-logo.png';
      case 'zora':
        return '/Images/Logo/zora-logo.png';
      case 'ethena':
        return '/Images/Logo/ethena-logo.png';
      case 'etherfi':
        return '/Images/Logo/etherfi-logo.png';
      case 'morpho':
        return '/Images/Logo/morpho-logo.jpeg';
      default:
        return '/Images/Logo/usdc-logo.png'; // fallback to USDC
    }
  };


  const recentActivity = strategy.whaleActivity?.slice(0, 2) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`mb-3 relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-red-600 to-red-700 shadow-2xl border-2 border-red-400' 
          : 'bg-white hover:shadow-xl border border-gray-200'
      }`}
    >

      <div className="p-3 sm:p-4 relative z-5">
        {/* Protocol Header - More Compact */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {/* Protocol Icons - Smaller */}
            <div className="flex items-center">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0">
                <Image
                  src={getProtocolLogo(strategy.fromProtocol)}
                  alt={strategy.fromProtocol}
                  width={32}
                  height={32}
                  className="rounded-full object-cover w-full h-full"
                  priority
                  unoptimized
                  onError={(e) => {
                    console.log('Image load error for:', strategy.fromProtocol);
                    e.currentTarget.src = '/Images/Logo/usdc-logo.png';
                  }}
                />
              </div>
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 -ml-2">
                <Image
                  src={getProtocolLogo(strategy.toProtocol)}
                  alt={strategy.toProtocol}
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-white shadow-sm object-cover w-full h-full"
                  priority
                  unoptimized
                  onError={(e) => {
                    console.log('Image load error for:', strategy.toProtocol);
                    e.currentTarget.src = '/Images/Logo/usdc-logo.png';
                  }}
                />
              </div>
            </div>
            
            {/* Strategy Title - More Compact */}
            <div className="flex-1">
              <div className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {strategy.toProtocol.toLowerCase() === 'zora' 
                  ? `Add Liquidity ${strategy.fromProtocol} → ${strategy.toProtocol}`
                  : `Supply ${strategy.fromProtocol} → ${strategy.toProtocol}`
                }
              </div>
              <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>
                {strategy.toProtocol.toLowerCase() === 'zora' 
                  ? 'Provide liquidity to earn high yield'
                  : 'Stake/Supply to earn yield'
                }
              </div>
            </div>
          </div>

          {/* Close Button for Selected */}
          {isSelected && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeselect?.();
              }}
              className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
            >
              <X size={14} className="text-white" />
            </button>
          )}
        </div>

        {/* Whale Activity Feed - More Compact */}
        {recentActivity.length > 0 && !isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-2 bg-gray-50 rounded-lg p-2 border-l-3 border-blue-500"
          >
            <div className="flex items-center gap-1 mb-1">
              <Users size={12} className="text-blue-600" />
              <span className="text-xs font-bold text-blue-600">WHALE ACTIVITY</span>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-0.5">
              {recentActivity.slice(0, 2).map((activity, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <span className="text-xs">{getWalletTypeEmoji(activity.walletType)}</span>
                    <span className="font-medium text-gray-700 truncate">
                      {getWalletTypeLabel(activity.walletType)}
                    </span>
                    <span className="text-gray-500 hidden sm:inline">{activity.action}</span>
                    <span className="font-bold text-green-600">${activity.amount}</span>
                  </div>
                  <span className="text-gray-400 text-xs flex-shrink-0 ml-1">{activity.timeAgo}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* APY and Risk Display - More Compact */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>Expected APY</div>
            <div className={`text-xl sm:text-2xl font-bold ${isSelected ? 'text-white' : 'text-green-600'}`}>
              +{strategy.expectedGain.toFixed(2)}%
            </div>
          </div>
          <div className="text-right">
            <div className={`text-xs ${isSelected ? 'text-red-100' : 'text-gray-500'}`}>Risk Level</div>
            <div className={`text-sm font-bold ${isSelected ? 'text-white' : 
              strategy.riskLevel === 'Low' ? 'text-green-600' : 
              strategy.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'}`}>
              {strategy.riskLevel}
            </div>
          </div>
        </div>

        {/* FOMO Counter - More Compact */}
        {!isSelected && strategy.whaleActivity && strategy.whaleActivity.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-2 text-center"
          >
            <div className="text-xs text-gray-600 mb-0.5">
              <Eye size={10} className="inline mr-1" />
              {Math.floor(Math.random() * 47) + 13} users watching
            </div>
            <div className="text-xs text-orange-600 font-medium">
              🔥 {strategy.whaleActivity.length} major deposits in 4h
            </div>
          </motion.div>
        )}

        {/* Select Button - More Compact */}
        {!isSelected && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(strategy);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full h-10 sm:h-12 text-sm font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Select Strategy
          </motion.button>
        )}

        {/* Selected State Info - More Compact */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-white/90 text-sm">
              ✅ Strategy Selected
            </div>
            <div className="text-white/70 text-xs mt-0.5">
              Configure amount below
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Asset } from '@/lib/types';
import { formatAPR, formatTVL } from '@/lib/utils';
import { mockRewardMultipliers } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/badge';

interface AssetCardProps {
  asset: Asset;
  onSelect: (asset: Asset) => void;
  userDeposited?: number;
}

export function AssetCard({ asset, onSelect, userDeposited = 0 }: AssetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleSelect = () => {
    if (asset.isActive) {
      onSelect(asset);
    }
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const rewards = mockRewardMultipliers[asset.id as keyof typeof mockRewardMultipliers] || [];
  
  // Define gradient colors for each asset
  const getGradientColors = (assetId: string) => {
    switch (assetId) {
      case 'cbbtc-vault':
        return 'from-white via-red-50/30 to-red-100/20';
      case 'cbeth-vault':
        return 'from-white via-red-50/30 to-red-100/20';
      case 'usdc-vault':
        return 'from-white via-red-50/30 to-red-100/20';
      default:
        return 'from-white via-red-50/30 to-red-100/20';
    }
  };

  return (
    <Card className={`mb-3 border border-gray-100 shadow-sm bg-gradient-to-br ${getGradientColors(asset.id)} cursor-pointer transition-all duration-200 hover:shadow-md`} 
          onClick={handleCardClick}>
      <CardContent className="p-3">
        {/* Compact Header */}
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={asset.logoUrl}
              alt={asset.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {asset.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {asset.name === 'cbBTC' ? 'Bitcoin' : asset.name === 'cbETH' ? 'Ethereum' : 'Stablecoin'}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-lg font-bold text-red-600">
                    {formatAPR(asset.apr)}
                  </div>
                  <div className="text-xs text-gray-500">APY</div>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  {isExpanded ? (
                    <ChevronUp size={20} className="text-gray-400" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Rewards Preview */}
            <div className="mt-2">
              <div className="text-xs font-medium text-gray-700 mb-1">Rewards</div>
              <div className="flex items-center gap-2">
                {rewards.slice(0, 3).map((reward, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                      <Image
                        src={reward.logo}
                        alt={reward.name}
                        width={10}
                        height={10}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900">
                      {reward.multiplier}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <p className="text-xs text-gray-600 leading-relaxed">
              {asset.description}
            </p>
            
            {/* APY and TVL Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                <div className="text-xs text-gray-500 mb-1">APY (est.)</div>
                <div className="text-lg font-bold text-red-600">
                  {formatAPR(asset.apr)}
                </div>
                <div className="text-xs text-red-500">+ rewards</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="text-xs text-gray-500 mb-1">TVL</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatTVL(asset.tvl)}
                </div>
              </div>
            </div>

            {/* Rewards Section */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-2">Rewards</div>
              <div className="flex items-center gap-3">
                {rewards.map((reward, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                      <Image
                        src={reward.logo}
                        alt={reward.name}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-900">
                      {reward.multiplier}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deposit Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleSelect();
              }}
              disabled={!asset.isActive}
              className="w-full h-10 text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
            >
              Deposit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
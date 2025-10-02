'use client';

import Image from 'next/image';
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
  const handleSelect = () => {
    if (asset.isActive) {
      onSelect(asset);
    }
  };

  const rewards = mockRewardMultipliers[asset.id as keyof typeof mockRewardMultipliers] || [];

  return (
    <Card className="mb-3 border border-red-200 shadow-sm bg-gradient-to-br from-white to-red-50/30">
      <CardContent className="p-4">
        {/* Header with Logo and Name */}
        <div className="flex items-start space-x-3 mb-4">
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
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-semibold text-gray-900">
                {asset.name}
              </h3>
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 border-red-200">
                Base
              </Badge>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              {asset.description}
            </p>
          </div>
        </div>

        {/* APY and TVL Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 border border-red-200">
            <div className="text-xs text-gray-500 mb-1">APY (est.)</div>
            <div className="text-lg font-bold text-red-600">
              {formatAPR(asset.apr)}
            </div>
            <div className="text-xs text-red-500">+ ecosystem rewards</div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">TVL</div>
            <div className="text-lg font-bold text-gray-900">
              {formatTVL(asset.tvl)}
            </div>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Rewards</div>
          <div className="flex items-center gap-3">
            {rewards.map((reward, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-red-200">
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
          onClick={handleSelect}
          disabled={!asset.isActive}
          className="w-full h-10 text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
        >
          Deposit
        </Button>
      </CardContent>
    </Card>
  );
}
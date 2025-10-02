'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Asset } from '@/lib/types';
import { mockAssets } from '@/lib/mock-data';
import { useWallet } from '@/hooks/useWallet';
import { useDeposits } from '@/hooks/useDeposits';
import { AssetCard } from '@/components/AssetCard';

export default function Home() {
  const router = useRouter();
  const { user, isConnected } = useWallet();
  const { getTotalDepositedByAsset } = useDeposits(user?.farcasterFid);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load assets on mount
  useEffect(() => {
    const loadAssets = async () => {
      try {
        // In production, this would fetch from API
        setAssets(mockAssets);
      } catch (error) {
        console.error('Failed to load assets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssets();
  }, []);

  const handleAssetSelect = (asset: Asset) => {
    if (!isConnected) {
      // Show connect wallet prompt or trigger wallet connection
      return;
    }
    
    // Navigate to deposit page with asset
    router.push(`/deposit?asset=${asset.id}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Hero Section with Red Background */}
      <div className="bg-gradient-to-br from-red-500 to-red-600 mx-4 rounded-2xl px-4 py-6 mb-6 shadow-lg">
        {/* Header with Logo and Title */}
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
            <Image
              src="/Images/Logo/nuvia-logo.png"
              alt="Nuvia Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1">
              Start Earning Today
            </h1>
            <p className="text-red-100 text-sm leading-relaxed">
              Choose your vault and start earning competitive yields on your crypto assets
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="px-4">

        {/* Assets List */}
        <div className="space-y-3">
          {assets.map((asset) => {
            const userDeposited = isConnected 
              ? getTotalDepositedByAsset(asset.id)
              : 0;

            return (
              <AssetCard
                key={asset.id}
                asset={asset}
                onSelect={handleAssetSelect}
                userDeposited={userDeposited}
              />
            );
          })}
        </div>

        {/* Connect Wallet Prompt for non-connected users */}
        {!isConnected && (
          <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-4 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">👝</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Connect your wallet to start earning
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect your wallet to deposit assets and start earning yield
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

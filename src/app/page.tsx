"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Asset } from "@/lib/types";
import { mockAssets } from "@/lib/mock-data";
import { useWallet } from "@/hooks/useWallet";
import { useDeposits } from "@/hooks/useDeposits";
import { AssetCard } from "@/components/AssetCard";

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
        console.error("Failed to load assets:", error);
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
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-600">
      {/* Hero Section - Full Width Red Background */}
      <div className="px-6 py-8 pb-12 relative overflow-hidden">
        {/* Background Pattern/Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent"></div>
        <div className="absolute top-4 right-4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-red-300/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Nuvia Logo - Larger and Centered */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="flex items-center justify-center"
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: 1,
                rotate: [-15, 15],
                x: 0,
              }}
              transition={{
                scale: {
                  duration: 0.8,
                  ease: "easeOut",
                  delay: 0.2,
                },
                rotate: {
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1,
                },
              }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/Images/Logo/nuvia-logo.png"
                alt="Nuvia Logo"
                width={120}
                height={48}
                className="object-contain rounded-full"
              />
            </motion.div>
          </div>

          {/* Title and Description */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Select an asset to
            <br />
            Deposit & Earn
          </h1>
          <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
            Choose your vault and start earning competitive yields on your
            crypto assets
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-t-3xl px-4 pt-6 pb-6 -mt-6 relative z-10">
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

        {!isConnected && (
          <div className="mt-6 p-4 text-center">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-3 overflow-hidden">
              <video autoPlay loop muted playsInline>
                <source
                  src="/Images/Logo/wallet_animation.webm"
                  type="video/webm"
                />
              </video>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Connect your wallet to start earning
            </h3>
            <p className="text-sm text-gray-600">
              Connect your wallet to deposit assets and start earning yield
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

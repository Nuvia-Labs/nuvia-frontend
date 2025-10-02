'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Asset } from '@/lib/types';
import { mockAssets } from '@/lib/mock-data';
import { useWallet } from '@/hooks/useWallet';
import { useDeposits } from '@/hooks/useDeposits';
import { DepositForm } from '@/components/DepositForm';
import { Button } from '@/components/ui';

function DepositPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assetId = searchParams.get('asset');
  
  const { user, isConnected, getBalance } = useWallet();
  const { createDeposit } = useDeposits(user?.farcasterFid);
  
  const [asset, setAsset] = useState<Asset | null>(null);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Load asset and balance
  useEffect(() => {
    if (!assetId) {
      router.push('/');
      return;
    }

    const foundAsset = mockAssets.find(a => a.id === assetId);
    if (!foundAsset) {
      router.push('/');
      return;
    }

    setAsset(foundAsset);

    // Load balance if wallet is connected
    if (isConnected && user) {
      getBalance(foundAsset.symbol).then(setBalance);
    }
  }, [assetId, isConnected, user, router, getBalance]);

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  const handleDeposit = async (amount: number) => {
    if (!asset || !isConnected) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await createDeposit(asset, amount);
      
      if (result.success) {
        setSuccess(true);
        // Redirect to deposits page after 2 seconds
        setTimeout(() => {
          router.push('/deposits');
        }, 2000);
      } else {
        setError(result.error || 'Deposit failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Deposit failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!asset) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="max-w-md mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">
              Deposit Successful!
            </h2>
            <p className="text-green-700 mb-6">
              Your {asset.name} deposit has been processed successfully. 
              You will start earning yield immediately.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push('/deposits')}
            >
              View My Deposits
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Header */}
      <div className="max-w-md mx-auto mb-8">
        <button
          onClick={handleCancel}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <span className="mr-2">←</span>
          Back to Assets
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Deposit {asset.name}
        </h1>
        <p className="text-gray-600">
          Deposit your {asset.symbol} and start earning yield immediately.
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-md mx-auto mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Deposit Form */}
      <div className="max-w-md mx-auto">
        <DepositForm
          asset={asset}
          balance={balance}
          onDeposit={handleDeposit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>

      {/* Info Section */}
      <div className="max-w-md mx-auto mt-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            How it works
          </h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                1
              </span>
              <p>
                Enter the amount you want to deposit
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                2
              </span>
              <p>
                Confirm the transaction in your wallet
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                3
              </span>
              <p>
                Start earning yield immediately with {asset.symbol} at {((asset.apr * 100).toFixed(1))}% APR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DepositPage() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    }>
      <DepositPageContent />
    </Suspense>
  );
}
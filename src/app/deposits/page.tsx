'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useWallet } from '@/hooks/useWallet';
import { useDeposits } from '@/hooks/useDeposits';
import { mockAssets } from '@/lib/mock-data';
import { formatTokenAmount, formatTimeAgo, formatAPR } from '@/lib/utils';
import { Card, CardHeader, CardContent, Button } from '@/components/ui';

export default function DepositsPage() {
  const router = useRouter();
  const { user, isConnected } = useWallet();
  const { 
    deposits, 
    isLoading, 
    totalDeposited, 
    totalEstimatedYield,
    refreshDeposits 
  } = useDeposits(user?.farcasterFid);

  // Redirect if not connected
  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  // Refresh deposits on mount
  useEffect(() => {
    if (user) {
      refreshDeposits();
    }
  }, [user, refreshDeposits]);

  if (!isConnected) {
    return null; // Will redirect
  }

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const getAssetInfo = (assetId: string) => {
    return mockAssets.find(asset => asset.id === assetId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '✅';
      case 'pending':
        return '⏳';
      case 'failed':
        return '❌';
      default:
        return '⚪';
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          My Deposits
        </h1>
        <p className="text-gray-600">
          Track your yield-earning deposits and estimated returns
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Deposited</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalDeposited.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estimated Yearly Yield</p>
                <p className="text-2xl font-bold text-green-600">
                  ${totalEstimatedYield.toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📈</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">Active Deposits</p>
                <p className="text-2xl font-bold text-gray-900">
                  {deposits.filter(d => d.status === 'confirmed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deposits List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Deposit History
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshDeposits}
              disabled={isLoading}
            >
              Refresh
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {deposits.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No deposits yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start earning yield by making your first deposit
              </p>
              <Link href="/">
                <Button variant="primary">
                  Browse Assets
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {deposits.map((deposit) => {
                const asset = getAssetInfo(deposit.assetId);
                if (!asset) return null;

                return (
                  <div
                    key={deposit.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-600">
                          {asset.symbol.charAt(0)}
                        </span>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">
                            {asset.name}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(deposit.status)}`}>
                            <span className="mr-1">{getStatusIcon(deposit.status)}</span>
                            {deposit.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(new Date(deposit.timestamp))} • {formatAPR(asset.apr)} APR
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatTokenAmount(deposit.amount, asset.symbol)}
                      </p>
                      {deposit.status === 'confirmed' && (
                        <p className="text-sm text-green-600">
                          +{formatTokenAmount(deposit.estimatedYield, asset.symbol)}/year
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Deposit CTA */}
      {deposits.length > 0 && (
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Make Another Deposit
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
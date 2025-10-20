'use client';

import { useWallet } from '@/hooks/useWallet';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface NetworkIndicatorProps {
  className?: string;
  showWhenCorrect?: boolean;
}

export function NetworkIndicator({ className, showWhenCorrect = false }: NetworkIndicatorProps) {
  const { isConnected, isCorrectNetwork, switchToBaseSepoliaChain } = useWallet();
  const [isSwitching, setIsSwitching] = useState(false);

  if (!isConnected) return null;
  if (isCorrectNetwork && !showWhenCorrect) return null;

  const handleSwitchNetwork = async () => {
    setIsSwitching(true);
    try {
      await switchToBaseSepoliaChain();
    } finally {
      setIsSwitching(false);
    }
  };

  if (isCorrectNetwork) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 ${className}`}>
        <CheckCircle size={16} />
        <span className="text-sm font-medium">Base Sepolia</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg ${className}`}>
      <div className="flex items-center gap-2 flex-1">
        <AlertTriangle size={18} className="text-amber-600" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-amber-900">Wrong Network</span>
          <span className="text-xs text-amber-700">Please switch to Base Sepolia</span>
        </div>
      </div>
      <button
        onClick={handleSwitchNetwork}
        disabled={isSwitching}
        className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white text-sm font-medium rounded-md transition-colors"
      >
        {isSwitching ? (
          <RefreshCw size={14} className="animate-spin" />
        ) : (
          <RefreshCw size={14} />
        )}
        {isSwitching ? 'Switching...' : 'Switch'}
      </button>
    </div>
  );
}
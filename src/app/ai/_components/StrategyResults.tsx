'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Bot, Target, Shield, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useExecuteStrategy } from '@/hooks/useExecuteStrategy';
import { SuccessNotification } from '@/components/SuccessNotification';

interface StrategyResultsProps {
  data: {
    strategy_id: string;
    allocations: Record<string, number>;
    expected_apy: number;
    risk_score: number;
    risk_tolerance: string;
    reasoning: string;
    diversification_score: number;
    comparison: {
      current_apy: number;
      proposed_apy: number;
      apy_improvement: number;
      changes: Array<{
        protocol: string;
        change: number;
        direction: string;
      }>;
      recommendation: string;
    };
  };
  amount: number;
}

const protocolLogos: Record<string, string> = {
  'Aerodrome': '/Images/Logo/aerodrome-logo.svg',
  'Moonwell': '/Images/Logo/moonwell-logo.png',
  'Aave V3': '/Images/Logo/aave-logo.png',
  'Aave': '/Images/Logo/aave-logo.png',
  'Seamless': '/Images/Logo/nuvia-logo.png',
  'Morpho': '/Images/Logo/morpho-logo.jpeg',
};

export function StrategyResults({ data, amount }: StrategyResultsProps) {
  const { executeStrategy, isLoading, isCompleted, hasError, errorMessage, step, reset } = useExecuteStrategy();
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const getRiskColor = (score: number) => {
    if (score <= 3) return { color: '#10b981', bg: '#dcfce7', label: 'Low Risk' };
    if (score <= 7) return { color: '#f59e0b', bg: '#fef3c7', label: 'Medium Risk' };
    return { color: '#ef4444', bg: '#fecaca', label: 'High Risk' };
  };

  const riskData = getRiskColor(data.risk_score);

  const handleExecuteStrategy = () => {
    executeStrategy(amount);
  };

  useEffect(() => {
    if (isCompleted) {
      setShowSuccessNotification(true);
    }
  }, [isCompleted]);

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
    reset();
  };

  const getButtonText = () => {
    if (isCompleted) return 'Strategy Executed Successfully!';
    if (hasError) return 'Retry Strategy Execution';
    if (step === 'approving') return 'Approving USDC...';
    if (step === 'depositing') return 'Depositing to Vault...';
    return 'Execute Strategy';
  };

  const getButtonColor = () => {
    if (isCompleted) return 'from-green-500 to-green-600';
    if (hasError) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-center space-x-2 mb-3">
        <Bot size={16} className="text-red-500" />
        <h3 className="text-base font-semibold text-gray-900">
          AI Strategy Recommendation
        </h3>
      </div>

      {/* Main Strategy Card */}
      <motion.div
        className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-base font-bold text-green-600">
                {data.expected_apy.toFixed(2)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Expected APY</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Shield size={14} style={{ color: riskData.color }} />
              <span className="text-base font-bold" style={{ color: riskData.color }}>
                {data.risk_score.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{riskData.label}</p>
          </div>

          {/* <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Target size={14} className="text-blue-500" />
              <span className="text-base font-bold text-blue-600">
                {data.diversification_score}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">Score Protocols</p>
          </div> */}
        </div>

        {/* APY Improvement */}
        {data.comparison.apy_improvement > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
            <div className="flex items-center justify-center space-x-1.5">
              <TrendingUp size={14} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">
                +{data.comparison.apy_improvement.toFixed(2)}% APY Improvement
              </span>
            </div>
          </div>
        )}

        {/* Reasoning */}
        <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
          <h4 className="font-medium text-gray-900 mb-1 text-sm">AI Analysis</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            {data.reasoning}
          </p>
        </div>

        {/* Protocol Allocations */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2 text-sm">Portfolio Allocation</h4>
          <div className="space-y-2">
            {Object.entries(data.allocations).map(([protocol, percentage]) => (
              <div key={protocol} className="flex items-center space-x-2.5">
                <div className="w-7 h-7 flex-shrink-0">
                  <Image
                    src={protocolLogos[protocol] || '/Images/Logo/nuvia-logo.png'}
                    alt={protocol}
                    width={28}
                    height={28}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-gray-900">
                      {protocol}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-red-500 h-1.5 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3"
        >
          <p className="text-red-700 text-sm text-center">
            {errorMessage}
          </p>
        </motion.div>
      )}

      {/* Execute Button */}
      <motion.button
        onClick={hasError ? reset : handleExecuteStrategy}
        disabled={isLoading}
        className={`w-full py-3.5 bg-gradient-to-r ${getButtonColor()} text-white rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50`}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        <span>{getButtonText()}</span>
      </motion.button>

      <SuccessNotification
        isVisible={showSuccessNotification}
        onClose={handleCloseSuccessNotification}
        title="Strategy Executed!"
        message={`Successfully executed AI strategy with $${amount.toLocaleString()} investment. Your funds are now optimally allocated across ${Object.keys(data.allocations).length} protocols.`}
      />
    </motion.div>
  );
}
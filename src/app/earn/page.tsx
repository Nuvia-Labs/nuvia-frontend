"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useWallet } from "@/hooks/useWallet";
import { useGetYieldForest } from "@/hooks/useGetYieldForest";
import { useGetLiquidityPulse } from "@/hooks/useGetLiquidityPulse";
import { DeFiWeatherboard } from "@/components/DeFiWeatherboard";
import { DynamicStrategyCard } from "@/components/DynamicStrategyCard";
import { AmountInput } from "@/app/ai/_components/AmountInput";
import { useExecuteStrategy } from "@/hooks/useExecuteStrategy";
import { SuccessNotification } from "@/components/SuccessNotification";
import walletAnimation from "../../../public/Images/Logo/wallet_animation.json";
import catLoadingAnimation from "../../../public/Images/Logo/CatLoading.json";
import analyzeMarketAnimation from "../../../public/Images/Logo/analyze-market.json";

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
}

export default function Earn() {
  const router = useRouter();
  const { address, isConnected } = useWallet();
  const [selectedStrategy, setSelectedStrategy] = useState<StrategyRecommendation | null>(null);
  const [hasTriggeredAI, setHasTriggeredAI] = useState(false);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState(100);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  
  const { executeStrategy, isLoading: isExecuting, isCompleted, hasError, errorMessage, step, reset } = useExecuteStrategy();
  
  // Only fetch data when user triggers AI analysis
  const { data: yieldData, isLoading: yieldLoading, error: yieldError, refetch: refetchYield } = useGetYieldForest(hasTriggeredAI);
  const { data: pulseData, isLoading: pulseLoading, error: pulseError, refetch: refetchPulse } = useGetLiquidityPulse(hasTriggeredAI);

  const isLoading = hasTriggeredAI && yieldLoading && pulseLoading && !yieldError && !pulseError;

  const handleStrategySelect = (strategy: StrategyRecommendation) => {
    if (!isConnected) {
      // Show connect wallet prompt or trigger wallet connection
      return;
    }
    setSelectedStrategy(strategy);
    setShowAmountInput(true);
  };

  const handleExecuteStrategy = async () => {
    if (selectedStrategy && amount) {
      try {
        await executeStrategy(amount);
      } catch (error) {
        console.error('Strategy execution failed:', error);
      }
    }
  };

  // Watch for completion
  useEffect(() => {
    if (isCompleted) {
      setShowSuccessNotification(true);
    }
  }, [isCompleted]);

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
    setSelectedStrategy(null);
    setShowAmountInput(false);
    reset();
  };

  const handleBackToStrategies = () => {
    setSelectedStrategy(null);
    setShowAmountInput(false);
  };

  const handleTriggerAI = () => {
    setHasTriggeredAI(true);
  };

  // Mock data fallback when APIs fail
  const getMockForecastData = () => [
    {
      protocol: 'Aerodrome',
      current_apy: 8.45,
      forecast_7d: [8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8],
      trend: 'rising',
      weather: 'stable',
      confidence: 0.82,
      slope: 0.045
    },
    {
      protocol: 'Moonwell',
      current_apy: 12.30,
      forecast_7d: [12.1, 12.2, 12.4, 12.3, 12.5, 12.6, 12.7],
      trend: 'rising',
      weather: 'moderate',
      confidence: 0.75,
      slope: 0.023
    },
    {
      protocol: 'Aave',
      current_apy: 6.80,
      forecast_7d: [7.2, 7.0, 6.9, 6.8, 6.7, 6.6, 6.5],
      trend: 'declining',
      weather: 'volatile',
      confidence: 0.60,
      slope: -0.032
    }
  ];

  const getMockPulseData = () => ({
    vault_pulse: { vault_pulse: 65, status: 'moderate', timestamp: new Date().toISOString() },
    protocols: [
      {
        protocol: 'Aerodrome',
        pulse_score: 75,
        status: 'strong',
        tvl: 45000000,
        tvl_change_24h: 2.3,
        net_flow: 'positive',
        is_anomaly: false,
        alert: null,
        timestamp: new Date().toISOString()
      },
      {
        protocol: 'Moonwell',
        pulse_score: 68,
        status: 'moderate',
        tvl: 32000000,
        tvl_change_24h: 1.8,
        net_flow: 'positive',
        is_anomaly: false,
        alert: null,
        timestamp: new Date().toISOString()
      },
      {
        protocol: 'Aave',
        pulse_score: 45,
        status: 'weak',
        tvl: 78000000,
        tvl_change_24h: -1.2,
        net_flow: 'negative',
        is_anomaly: true,
        alert: 'High outflow detected',
        timestamp: new Date().toISOString()
      }
    ]
  });

  // Use mock data if APIs fail
  const effectiveYieldData = yieldData || { forecasts: getMockForecastData(), timestamp: Date.now() };
  const effectivePulseData = pulseData || getMockPulseData();

  // Generate dynamic strategy recommendations based on API data
  const generateStrategyRecommendations = (): StrategyRecommendation[] => {
    if (!effectiveYieldData?.forecasts || !effectivePulseData?.protocols) return [];

    const strategies: StrategyRecommendation[] = [];
    const forecasts = effectiveYieldData.forecasts;

    // Find rising and declining protocols
    const risingProtocols = forecasts.filter(f => f.trend.toLowerCase() === 'rising');
    const decliningProtocols = forecasts.filter(f => f.trend.toLowerCase() === 'declining');

    // Create strategies for moving from declining to rising protocols
    decliningProtocols.forEach(declining => {
      const bestRising = risingProtocols
        .filter(r => r.protocol !== declining.protocol)
        .sort((a, b) => (b.current_apy * b.confidence) - (a.current_apy * a.confidence))[0];

      if (bestRising) {
        const expectedGain = (bestRising.current_apy - declining.current_apy) * bestRising.confidence;
        strategies.push({
          fromProtocol: declining.protocol,
          toProtocol: bestRising.protocol,
          amount: 100,
          frequency: 'daily',
          duration: 7,
          expectedGain: Math.max(0, expectedGain),
          confidenceTier: bestRising.confidence > 0.8 ? 'High' : bestRising.confidence > 0.6 ? 'Medium' : 'Low',
          reasoning: `${declining.protocol} showing declining trend while ${bestRising.protocol} has rising trend with ${bestRising.confidence.toFixed(2)} confidence`,
          riskLevel: bestRising.confidence > 0.7 ? 'Low' : bestRising.confidence > 0.5 ? 'Medium' : 'High'
        });
      }
    });

    // Add top performer strategies
    const topPerformer = risingProtocols.sort((a, b) => b.current_apy - a.current_apy)[0];
    if (topPerformer) {
      strategies.push({
        fromProtocol: 'USDC',
        toProtocol: topPerformer.protocol,
        amount: 50,
        frequency: 'weekly',
        duration: 14,
        expectedGain: topPerformer.current_apy * 0.1,
        confidenceTier: topPerformer.confidence > 0.8 ? 'High' : 'Medium',
        reasoning: `${topPerformer.protocol} showing highest APY with strong confidence`,
        riskLevel: 'Medium'
      });
    }

    return strategies.slice(0, 3); // Limit to 3 strategies
  };

  const strategyRecommendations = generateStrategyRecommendations();

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-white">
        {/* Hero Section - Full Width Red Background */}
        <div className="px-6 py-8 pb-12 relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600">
          {/* Background Pattern/Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent"></div>
          <div className="absolute top-4 right-4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-32 h-32 bg-red-300/10 rounded-full blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Nuvia Logo - Larger and Centered */}
            <div className="flex justify-center mb-4">
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
                  width={100}
                  height={40}
                  className="object-contain rounded-full"
                />
              </motion.div>
            </div>

            {/* Title and Description */}
            <h1 className="text-xl font-bold text-white mb-2">
              AI-Powered DeFi Strategies
            </h1>
            <p className="text-red-100 text-xs leading-relaxed max-w-xs mx-auto">
              Smart AI Strategies with real-time market information.
              <br />
            </p>
          </div>
        </div>

        {/* Content Area - Full White Background for Loading */}
        <div className="bg-white rounded-t-3xl px-4 pt-6 pb-28 -mt-6 relative z-10 flex-1">
          {/* Loading State */}
          <div className="text-center py-4 flex flex-col justify-center items-center h-full">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Lottie
                animationData={catLoadingAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI Analyzing Strategies
            </h3>
            <p className="text-gray-600 text-sm max-w-sm mx-auto mb-4">
              Finding optimal DeFi allocations for your portfolio...
            </p>
            
            <div className="flex justify-center space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-red-500 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gradient-to-br from-red-500 to-red-600 flex flex-col">
      {/* Hero Section - Full Width Red Background */}
      <div className="px-6 py-6 pb-8 relative overflow-hidden flex-shrink-0">
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
            AI-Powered DeFi Strategies
          </h1>
          <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
            Smart AI Strategies with real-time market information.
            <br />
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-t-3xl px-4 pt-4 pb-18 -mt-6 relative z-10 flex-1">
        {/* AI Trigger Section */}
        {!hasTriggeredAI && (
          <div className="text-center py-4 flex-1 flex flex-col justify-center">
            <div className="w-50 h-24 flex items-center justify-center mx-auto mb-4">
              <Lottie
                animationData={analyzeMarketAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                AI-Powered Smart Strategy
              </h3>
              <p className="text-gray-600 text-xs max-w-xs mx-auto leading-relaxed">
                Get real-time market analysis, strategy recommendations, and insights powered by AI.
              </p>
            </div>
            <button
              onClick={handleTriggerAI}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl mx-auto"
            >
              Get AI Strategies
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Lottie
                animationData={catLoadingAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              AI Analyzing Strategies
            </h3>
            <p className="text-gray-600 text-sm">
              Finding optimal DeFi allocations for your portfolio...
            </p>
          </div>
        )}

        {/* DeFi Weather Board */}
        {hasTriggeredAI && effectiveYieldData?.forecasts && effectivePulseData?.protocols && (
          <DeFiWeatherboard 
            forecasts={effectiveYieldData.forecasts} 
            protocols={effectivePulseData.protocols} 
          />
        )}

        {/* Strategy Recommendations */}
        {hasTriggeredAI && strategyRecommendations.length > 0 && !showAmountInput && (
          <div className="space-y-3 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
              AI Strategy Recommendations
            </h3>
            {strategyRecommendations.map((strategy, index) => (
              <DynamicStrategyCard
                key={index}
                strategy={strategy}
                onSelect={handleStrategySelect}
                onDeselect={() => setSelectedStrategy(null)}
                isSelected={selectedStrategy?.toProtocol === strategy.toProtocol && selectedStrategy?.frequency === strategy.frequency}
              />
            ))}
          </div>
        )}

        {/* Amount Input and Execute Strategy */}
        {showAmountInput && selectedStrategy && (
          <div className="mb-6">
            <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  💰 Execute Strategy
                </h3>
                <button
                  onClick={handleBackToStrategies}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  ← Back
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="text-sm font-medium text-gray-700 mb-1">Selected Strategy</div>
                <div className="text-base font-bold text-gray-900">
                  {selectedStrategy.amount} {selectedStrategy.fromProtocol} → {selectedStrategy.toProtocol} {selectedStrategy.frequency}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Expected Gain: +{selectedStrategy.expectedGain.toFixed(2)}% | Risk: {selectedStrategy.riskLevel}
                </div>
              </div>

              <AmountInput 
                amount={amount} 
                onAmountChange={setAmount} 
              />

              {hasError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-700 text-sm text-center">
                    {errorMessage}
                  </p>
                </div>
              )}

              <button
                onClick={handleExecuteStrategy}
                disabled={isExecuting || !amount}
                className={`w-full py-3 rounded-xl font-medium text-white transition-all ${
                  isExecuting 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg'
                }`}
              >
                {isExecuting 
                  ? step === 'approving' 
                    ? '⏳ Approving USDC...' 
                    : '⏳ Executing Strategy...'
                  : `🚀 Execute Strategy with $${amount.toLocaleString()}`
                }
              </button>
            </div>
          </div>
        )}

        <SuccessNotification
          isVisible={showSuccessNotification}
          onClose={handleCloseSuccessNotification}
          title="🎉 Strategy Executed!"
          message={`Successfully executed strategy with $${amount.toLocaleString()} investment. Your funds are now optimally allocated.`}
        />

        {!isConnected && !hasTriggeredAI && (
          <div className="mt-4 p-3 text-center">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
              <Lottie
                animationData={walletAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1 text-xs">
              Connect your wallet to start earning
            </h3>
            <p className="text-xs text-gray-500">
              Connect wallet to deploy strategies
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useWallet } from "@/hooks/useWallet";
import { useGetYieldForest } from "@/hooks/useGetYieldForest";
import { useGetLiquidityPulse } from "@/hooks/useGetLiquidityPulse";
import { DynamicStrategyCard } from "@/components/DynamicStrategyCard";
import { AmountInput } from "@/app/ai/_components/AmountInput";
import { useExecuteStrategy } from "@/hooks/useExecuteStrategy";
import { SuccessNotification } from "@/components/SuccessNotification";
import walletAnimation from "../../../public/Images/Logo/wallet_animation.json";
import catLoadingAnimation from "../../../public/Images/Logo/CatLoading.json";
import analyzeMarketAnimation from "../../../public/Images/Logo/analyze-market.json";
import { Sparkles } from "lucide-react";

interface WhaleActivity {
  amount: string;
  protocol: string;
  action: "deposited" | "withdrew" | "staked";
  timeAgo: string;
  isWhale: boolean;
  walletType: "whale" | "smart_money" | "institution";
}

interface StrategyRecommendation {
  fromProtocol: string;
  toProtocol: string;
  amount: number;
  frequency: "daily" | "weekly" | "hourly";
  duration: number;
  expectedGain: number;
  confidenceTier: "High" | "Medium" | "Low";
  reasoning: string;
  riskLevel: "Low" | "Medium" | "High";
  whaleActivity?: WhaleActivity[];
  hotness?: "fire" | "trending" | "normal";
}

export default function Earn() {
  const { isConnected } = useWallet();
  const [selectedStrategy, setSelectedStrategy] =
    useState<StrategyRecommendation | null>(null);
  const [hasTriggeredAI, setHasTriggeredAI] = useState(false);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState(100);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const {
    executeStrategy,
    isLoading: isExecuting,
    isCompleted,
    hasError,
    errorMessage,
    step,
    reset,
  } = useExecuteStrategy();

  // Only fetch data when user triggers AI analysis
  const { isLoading: yieldLoading, error: yieldError } =
    useGetYieldForest(hasTriggeredAI);
  const { isLoading: pulseLoading, error: pulseError } =
    useGetLiquidityPulse(hasTriggeredAI);

  const isLoading =
    hasTriggeredAI &&
    yieldLoading &&
    pulseLoading &&
    !yieldError &&
    !pulseError;

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
        console.error("Strategy execution failed:", error);
      }
    }
  };

  // Watch for completion and hide navbars
  useEffect(() => {
    if (isCompleted) {
      setShowSuccessNotification(true);
      // Hide navbars during success notification
      document.body.classList.add("hide-navbars");
    }
  }, [isCompleted]);

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
    setSelectedStrategy(null);
    setShowAmountInput(false);
    // Show navbars again
    document.body.classList.remove("hide-navbars");
    reset();
  };

  const handleBackToStrategies = () => {
    setSelectedStrategy(null);
    setShowAmountInput(false);
  };

  const handleTriggerAI = useCallback(() => {
    startTransition(() => {
      setHasTriggeredAI(true);
    });
  }, []);

  // Generate realistic whale activity data
  const generateWhaleActivity = (protocol: string): WhaleActivity[] => {
    const activities: WhaleActivity[] = [];
    const amounts = ["2.5M", "8.3M", "15.7M", "543K", "1.2M", "4.8M", "12.1M"];
    const timeAgos = [
      "2m ago",
      "8m ago",
      "15m ago",
      "23m ago",
      "1h ago",
      "2h ago",
      "3h ago",
    ];
    const walletTypes: ("whale" | "smart_money" | "institution")[] = [
      "whale",
      "smart_money",
      "institution",
    ];
    const actions: ("deposited" | "withdrew" | "staked")[] = [
      "deposited",
      "staked",
      "deposited",
    ];

    // Generate 2-4 whale activities per protocol
    const numActivities = Math.floor(Math.random() * 3) + 2;

    for (let i = 0; i < numActivities; i++) {
      activities.push({
        amount: amounts[Math.floor(Math.random() * amounts.length)],
        protocol,
        action: actions[Math.floor(Math.random() * actions.length)],
        timeAgo: timeAgos[i] || `${Math.floor(Math.random() * 24)}h ago`,
        isWhale: true,
        walletType: walletTypes[Math.floor(Math.random() * walletTypes.length)],
      });
    }

    return activities.sort((a, b) => {
      const aTime = parseInt(a.timeAgo);
      const bTime = parseInt(b.timeAgo);
      return aTime - bTime;
    });
  };

  // Mock data is available but using direct strategy generation

  // Generate dynamic strategy recommendations based on API data
  const generateStrategyRecommendations = (): StrategyRecommendation[] => {
    // Always return exactly 5 strategies with mock data (including degen mode)
    const strategies: StrategyRecommendation[] = [];

    // Strategy 1: USDC → Aerodrome (Low-Medium Risk)
    strategies.push({
      fromProtocol: "USDC",
      toProtocol: "Aerodrome",
      amount: 100,
      frequency: "daily",
      duration: 7,
      expectedGain: 4.34,
      confidenceTier: "High",
      reasoning: `Aerodrome showing strong performance with rising trend and high confidence`,
      riskLevel: "Medium",
      whaleActivity: generateWhaleActivity("Aerodrome"),
    });

    // Strategy 2: Aerodrome → Moonwell (Medium Risk)
    strategies.push({
      fromProtocol: "Aerodrome",
      toProtocol: "Moonwell",
      amount: 100,
      frequency: "daily",
      duration: 7,
      expectedGain: 3.25,
      confidenceTier: "Medium",
      reasoning: `Moonwell has rising trend while Aerodrome provides stable base - balanced growth strategy`,
      riskLevel: "Medium",
      whaleActivity: generateWhaleActivity("Moonwell"),
    });

    // Strategy 3: USDC → Zora (High Risk)
    strategies.push({
      fromProtocol: "USDC",
      toProtocol: "Zora",
      amount: 200,
      frequency: "hourly",
      duration: 3,
      expectedGain: 8.75,
      confidenceTier: "Low",
      reasoning: `Zora offering exceptional APY with high volatility - high risk, high reward opportunity`,
      riskLevel: "High",
      whaleActivity: generateWhaleActivity("Zora"),
    });

    // Strategy 4: USDC → Kizo Protocol (Degen Mode - Very High Risk)
    strategies.push({
      fromProtocol: "USDC",
      toProtocol: "Kizo Protocol",
      amount: 500,
      frequency: "hourly",
      duration: 1,
      expectedGain: 45.67,
      confidenceTier: "Low",
      reasoning: `New DeFi protocol offering extreme APY with maximum volatility - pure degen play`,
      riskLevel: "High",
      whaleActivity: generateWhaleActivity("Kizo Protocol"),
    });

    // Strategy 5: USDC → Euler Finance (Degen Mode - Leveraged High Risk)
    strategies.push({
      fromProtocol: "USDC",
      toProtocol: "Euler Finance",
      amount: 1000,
      frequency: "daily",
      duration: 2,
      expectedGain: 32.89,
      confidenceTier: "Low",
      reasoning: `Leveraged lending strategy with Euler Finance - high risk, high return using leverage mechanics`,
      riskLevel: "High",
      whaleActivity: generateWhaleActivity("Euler Finance"),
    });

    return strategies;
  };

  const strategyRecommendations = generateStrategyRecommendations();

  // Handle loading with minimalist overlay
  useEffect(() => {
    if (isLoading) {
      document.body.classList.add('hide-navbars');
    } else {
      document.body.classList.remove('hide-navbars');
    }
  }, [isLoading]);

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
                Get real-time market analysis, strategy recommendations, and
                insights powered by AI.
              </p>
            </div>
            <motion.button
              onClick={handleTriggerAI}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto transform-gpu"
              whileHover={{
                scale: 1.02,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.2,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              Get AI Strategies
            </motion.button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <motion.div
              className="w-20 h-20 flex items-center justify-center mx-auto mb-4"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.1,
              }}
            >
              <Lottie
                animationData={catLoadingAnimation}
                loop={true}
                className="w-full h-full"
              />
            </motion.div>
            <motion.h3
              className="text-lg font-bold text-gray-900 mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              🤖 AI Analyzing Strategies
            </motion.h3>
            <motion.p
              className="text-gray-600 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              Finding optimal DeFi allocations for your portfolio...
            </motion.p>

            <motion.div
              className="flex justify-center space-x-1 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
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
            </motion.div>
          </motion.div>
        )}

        {/* Strategy Recommendations */}
        {hasTriggeredAI &&
          strategyRecommendations.length > 0 &&
          !showAmountInput && (
            <motion.div
              className="space-y-3 mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.2,
              }}
            >
              <div
                className="bg-gradient-to-r from-[#FF4E4E] via-[#E63946] to-[#B71C1C] 
                rounded-full p-2 mr-3 flex items-center justify-center mb-4 
                gap-2 shadow-lg animate-glow"
              >
                <Sparkles className="w-4 h-6 text-white drop-shadow-md" />
                <h3 className="text-sm font-bold bg-white bg-clip-text text-transparent">
                  AI Strategy Recommendations
                </h3>
              </div>

              {strategyRecommendations.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.4 + index * 0.1,
                  }}
                >
                  <DynamicStrategyCard
                    strategy={strategy}
                    onSelect={handleStrategySelect}
                    onDeselect={() => setSelectedStrategy(null)}
                    isSelected={
                      selectedStrategy?.toProtocol === strategy.toProtocol &&
                      selectedStrategy?.frequency === strategy.frequency
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
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
                <div className="text-sm font-medium text-gray-700 mb-1">
                  Selected Strategy
                </div>
                <div className="text-base font-bold text-gray-900">
                  {selectedStrategy.amount} {selectedStrategy.fromProtocol} →{" "}
                  {selectedStrategy.toProtocol} {selectedStrategy.frequency}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Expected Gain: +{selectedStrategy.expectedGain.toFixed(2)}% |
                  Risk: {selectedStrategy.riskLevel}
                </div>
              </div>

              <AmountInput amount={amount} onAmountChange={setAmount} />

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
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg"
                }`}
              >
                {isExecuting
                  ? step === "approving"
                    ? "⏳ Approving USDC..."
                    : "⏳ Executing Strategy..."
                  : `🚀 Execute Strategy with $${amount.toLocaleString()}`}
              </button>
            </div>
          </div>
        )}

        <SuccessNotification
          isVisible={showSuccessNotification}
          onClose={handleCloseSuccessNotification}
          title="Strategy Executed!"
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

      {/* Minimalist Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="text-center"
          >
            <motion.div
              className="w-28 h-28 flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.2,
              }}
            >
              <Lottie
                animationData={catLoadingAnimation}
                loop={true}
                className="w-full h-full"
              />
            </motion.div>
            
            <motion.h3
              className="text-xl font-bold text-black mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              AI Analyzing Strategies
            </motion.h3>
            
            <motion.p
              className="text-gray-700 text-sm mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Finding optimal DeFi allocations for your portfolio...
            </motion.p>

            <motion.div
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-black rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6] 
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

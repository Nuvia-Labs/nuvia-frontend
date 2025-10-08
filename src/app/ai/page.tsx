"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Bot } from "lucide-react";
import Image from "next/image";
import Lottie from "lottie-react";
import catLoadingAnimation from "../../../public/Images/Logo/CatLoading.json";
import catYieldAnimation from "../../../public/Images/Logo/cat-yield.json";
import catStakeAnimation from "../../../public/Images/Logo/cat-stake.json";
import catSupplyAnimation from "../../../public/Images/Logo/cat-supply.json";
import catAskAnimation from "../../../public/Images/Logo/cat-ask.json";

type YieldStrategy = "stake" | "supply" | null;

interface YieldOption {
  id: string;
  protocol: string;
  token: "USDC";
  apy: string;
  tvl: string;
  risk: "Low" | "Medium" | "High";
  logo: string;
  description: string;
}

const mockYieldOptions: Record<string, YieldOption[]> = {
  stake: [
    {
      id: "aave-stake",
      protocol: "Aave",
      token: "USDC",
      apy: "8.2%",
      tvl: "$1.2B",
      risk: "Low",
      logo: "/Images/Logo/aave-logo.png",
      description: "Stake USDC in Aave Safety Module",
    },
    {
      id: "morpho-stake",
      protocol: "Morpho",
      token: "USDC",
      apy: "9.1%",
      tvl: "$850M",
      risk: "Medium",
      logo: "/Images/Logo/morpho-logo.jpeg",
      description: "Stake USDC for enhanced yield",
    },
    {
      id: "moonwell-stake",
      protocol: "Moonwell",
      token: "USDC",
      apy: "7.5%",
      tvl: "$420M",
      risk: "Low",
      logo: "/Images/Logo/moonwell-logo.png",
      description: "Cross-chain USDC staking rewards",
    },
  ],
  supply: [
    {
      id: "aave-supply",
      protocol: "Aave",
      token: "USDC",
      apy: "5.4%",
      tvl: "$2.1B",
      risk: "Low",
      logo: "/Images/Logo/aave-logo.png",
      description: "Supply USDC to earn lending yield",
    },
    {
      id: "morpho-supply",
      protocol: "Morpho",
      token: "USDC",
      apy: "6.8%",
      tvl: "$650M",
      risk: "Medium",
      logo: "/Images/Logo/morpho-logo.jpeg",
      description: "Optimized USDC lending on Morpho",
    },
    {
      id: "moonwell-supply",
      protocol: "Moonwell",
      token: "USDC",
      apy: "4.9%",
      tvl: "$380M",
      risk: "Low",
      logo: "/Images/Logo/moonwell-logo.png",
      description: "Multi-chain USDC lending protocol",
    },
  ],
};

export default function AI() {
  const [selectedStrategy, setSelectedStrategy] = useState<YieldStrategy>(null);
  const [searchResults, setSearchResults] = useState<YieldOption[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!selectedStrategy) return;

    setIsSearching(true);
    setHasSearched(false);

    // Simulate AI search - return top 3 recommendations
    setTimeout(() => {
      setSearchResults(mockYieldOptions[selectedStrategy]);
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };


  const RiskIndicator = ({ risk }: { risk: "Low" | "Medium" | "High" }) => {
    const riskData = {
      Low: { percentage: 85, color: "#10b981", bgColor: "#dcfce7" },
      Medium: { percentage: 60, color: "#f59e0b", bgColor: "#fef3c7" },
      High: { percentage: 35, color: "#ef4444", bgColor: "#fecaca" },
    };

    const data = riskData[risk];
    const circumference = 2 * Math.PI * 30;
    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (data.percentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 80 80">
            {/* Background circle */}
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="40"
              cy="40"
              r="30"
              stroke={data.color}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: data.color }}>
              {data.percentage}%
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {risk} Risk
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-600">
      {/* Hero Section */}
      <div className="px-6 py-8 pb-12 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent"></div>
        <div className="absolute top-4 right-4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-32 h-32 bg-red-300/10 rounded-full blur-3xl"></div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* AI Icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              className="flex items-center justify-center w-40 h-40"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                scale: { duration: 0.8, ease: "easeOut", delay: 0.2 },
              }}
              whileHover={{ scale: 1.1 }}
            >
              <Lottie
                animationData={catYieldAnimation}
                loop={true}
                className="w-full h-full"
              />
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-white mb-3">
            Make your asset productive
            <br />
            with AI
          </h1>
          <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
            Let AI find the best USDC yields for you.
            <br />
            <span className="font-semibold">
              Optimized for maximum returns.
            </span>
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-t-3xl px-4 pt-6 pb-18 -mt-6 relative z-10">
        {/* Strategy Selection */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Choose Your Strategy
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={() => setSelectedStrategy("stake")}
              className={`p-4 rounded-xl border transition-all ${
                selectedStrategy === "stake"
                  ? "border-red-500 bg-red-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Lottie
                    animationData={catStakeAnimation}
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Stake USDC
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Lock & earn rewards
                </p>
              </div>
            </motion.button>

            <motion.button
              onClick={() => setSelectedStrategy("supply")}
              className={`p-4 rounded-xl border transition-all ${
                selectedStrategy === "supply"
                  ? "border-red-500 bg-red-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Lottie
                    animationData={catSupplyAnimation}
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">
                  Supply USDC
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Lend & earn interest
                </p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* AI Search Button */}
        {selectedStrategy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <motion.button
              onClick={handleSearch}
              disabled={isSearching}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSearching ? (
                <>
                  <motion.div
                    className="w-6 h-6"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      scale: {
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <Lottie
                      animationData={catLoadingAnimation}
                      loop={true}
                      className="w-full h-full"
                    />
                  </motion.div>
                  <span>AI is finding best yields...</span>
                </>
              ) : (
                <>
                  <span>
                    Find Best{" "}
                    {selectedStrategy === "stake" ? "Staking" : "Supply"} Yields
                  </span>
                </>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Loading Screen */}
        {isSearching && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <div className="text-center px-4">
              <motion.div
                className="w-24 h-24 mx-auto mb-6"
                animate={{
                  scale: [1, 1.1, 1],
                  y: [0, -10, 0],
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Lottie
                  animationData={catLoadingAnimation}
                  loop={true}
                  className="w-full h-full"
                />
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-2">
                Finding Best Yields
              </h3>
              <p className="text-white/80 text-sm">
                AI is analyzing DeFi protocols to find the best{" "}
                {selectedStrategy} opportunities...
              </p>

              {/* Loading dots */}
              <div className="flex justify-center space-x-1 mt-4">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-white rounded-full"
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
          </motion.div>
        )}

        {/* Search Results */}
        {hasSearched && !isSearching && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Bot size={20} className="text-black" />
              <h3 className="text-lg font-semibold text-gray-900">
                AI Recommendations
              </h3>
            </div>

            {searchResults.map((option, index) => (
              <motion.div
                key={option.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                {/* Protocol Header */}
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-3">
                    <Image
                      src={option.logo}
                      alt={option.protocol}
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {option.protocol}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {option.description}
                  </p>
                </div>

                {/* Stats Row */}
                <div className={`flex items-center justify-between ${option.risk === 'Medium' ? 'mb-12' : 'mb-6'}`}>
                  {/* APY */}
                  <div className="text-center flex-1">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <TrendingUp size={16} className="text-green-500" />
                      <span className="text-xl font-bold text-green-600">
                        {option.apy}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Annual Yield</p>
                  </div>

                  {/* Risk */}
                  <div className="text-center flex-1">
                    <div className="flex justify-center items-center mb-1">
                      <div className="w-16 h-16">
                        <RiskIndicator risk={option.risk} />
                      </div>
                    </div>
                  </div>

                  {/* TVL */}
                  <div className="text-center flex-1">
                    <div className="text-xl font-bold text-red-600 mb-1">
                      {option.tvl}
                    </div>
                    <p className="text-xs text-gray-500">Total Locked</p>
                  </div>
                </div>

                {/* Action Button */}
                <motion.button
                  className="w-full py-3 bg-red-500 text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Supply USDC
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Initial State */}
        {!selectedStrategy && (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4">
              <Lottie
                animationData={catAskAnimation}
                loop={true}
                className="w-full h-full"
              />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Select a strategy above
            </h3>
            <p className="text-sm text-gray-600">
              Choose between staking or supplying USDC
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

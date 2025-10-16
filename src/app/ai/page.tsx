'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useGetRecommentStrategy } from '@/hooks/useGetRecommentStrategy';
import { HeroSection } from './_components/HeroSection';
import { StrategySelector } from './_components/StrategySelector';
import { AmountInput } from './_components/AmountInput';
import { LoadingScreen } from './_components/LoadingScreen';
import { StrategyResults } from './_components/StrategyResults';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catAskAnimation from '../../../public/Images/Logo/cat-ask.json';

export default function AI() {
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(10000);
  const [hasSearched, setHasSearched] = useState(false);
  
  const { data, isLoading, error, fetchRecommendedStrategy } = useGetRecommentStrategy();

  const handleGetRecommendation = async () => {
    if (!selectedStrategy) return;

    try {
      setHasSearched(false);
      
      const requestData = {
        risk_tolerance: selectedStrategy,
        amount: amount,
        exclude_protocols: [],
      };

      await fetchRecommendedStrategy(requestData);
      setHasSearched(true);
    } catch (err) {
      console.error('Failed to fetch recommendation:', err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-600">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Area */}
      <div className="bg-white rounded-t-3xl px-4 pt-6 pb-18 -mt-6 relative z-10">
        {/* Strategy Selection */}
        <StrategySelector
          selectedStrategy={selectedStrategy}
          onStrategySelect={setSelectedStrategy}
        />

        {/* Amount Input */}
        {selectedStrategy && (
          <AmountInput
            amount={amount}
            onAmountChange={setAmount}
          />
        )}

        {/* AI Search Button */}
        {selectedStrategy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <motion.button
              onClick={handleGetRecommendation}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <span>AI is analyzing strategies...</span>
              ) : (
                <span>Get AI Strategy Recommendation</span>
              )}
            </motion.button>
          </motion.div>
        )}

        {/* Loading Screen */}
        <LoadingScreen isVisible={isLoading} />

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4"
          >
            <p className="text-red-700 text-sm text-center">
              {error}
            </p>
          </motion.div>
        )}

        {/* Search Results */}
        {hasSearched && !isLoading && data && (
          <StrategyResults data={data} amount={amount} />
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
              Choose your risk tolerance to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
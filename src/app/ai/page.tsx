'use client';

import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useShallow } from 'zustand/react/shallow';
import { HeroSection } from './_components/HeroSection';
import { StrategySelector } from './_components/StrategySelector';
import { AmountInput } from './_components/AmountInput';
import { StrategyResults } from './_components/StrategyResults';
import { useAIStore } from './_store/useAIStore';
import type { StrategyRequest } from './_types';

const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => <div className="w-20 h-20 bg-gray-100 rounded-lg animate-pulse" />
});
import catAskAnimation from '../../../public/Images/Logo/cat-ask.json';
import catLoadingAnimation from '../../../public/Images/Logo/CatLoading.json';

export default function AI() {
  const {
    selectedStrategy,
    amount,
    hasSearched,
    data,
    isLoading,
    error,
    selectStrategy,
    fetchRecommendation,
  } = useAIStore(
    useShallow((state) => ({
      selectedStrategy: state.selectedStrategy,
      amount: state.amount,
      hasSearched: state.hasSearched,
      data: state.data,
      isLoading: state.isLoading,
      error: state.error,
      selectStrategy: state.selectStrategy,
      fetchRecommendation: state.fetchRecommendation,
    }))
  );

  useEffect(() => {
    // Hide/show navbars during loading
    if (isLoading) {
      document.body.classList.add('hide-navbars');
    } else {
      document.body.classList.remove('hide-navbars');
    }
  }, [isLoading]);

  useEffect(() => {
    if (hasSearched && !isLoading && data) {
      const strategySection = document.getElementById('strategy-results');
      strategySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hasSearched, isLoading, data]);


  const handleStrategySelect = useCallback(
    (strategy: string) => {
      selectStrategy(strategy);

      // Auto-scroll to amount input after strategy selection
      setTimeout(() => {
        const amountSection = document.getElementById('amount-input-section');
        amountSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    },
    [selectStrategy]
  );

  const handleGetRecommendation = useCallback(async () => {
    if (!selectedStrategy) return;

    const requestData: StrategyRequest = {
      risk_tolerance: selectedStrategy,
      amount,
      exclude_protocols: [],
    };

    try {
      await fetchRecommendation(requestData);
    } catch (err) {
      console.error('Failed to fetch recommendation:', err);
    }
  }, [amount, fetchRecommendation, selectedStrategy]);

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-gradient-to-br from-red-500 to-red-600">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Area */}
      <div className="bg-white rounded-t-3xl px-4 pt-6 pb-18 -mt-6 relative z-10">
        {/* Strategy Selection */}
        <StrategySelector onStrategySelect={handleStrategySelect} />

        {/* Amount Input */}
        {selectedStrategy && (
          <div id="amount-input-section">
            <AmountInput />
          </div>
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
              className="cursor-pointer w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl font-medium flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Get AI Strategy Recommendation</span>
            </motion.button>
          </motion.div>
        )}


        {/* Loading State - Minimalist Full Screen Overlay */}
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

        {/* Error Message */}
        {error && !isLoading && (
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
          <div id="strategy-results">
            <StrategyResults data={data} />
          </div>
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

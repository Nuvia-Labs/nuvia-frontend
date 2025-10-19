'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useAIStore } from '../_store/useAIStore';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catStakeAnimation from '../../../../public/Images/Logo/cat-stake.json';
import catSupplyAnimation from '../../../../public/Images/Logo/cat-supply.json';
import degenModeAnimation from '../../../../public/Images/Logo/degen_mode.json';

interface StrategySelectorProps {
  onStrategySelect?: (strategy: string) => void;
}

export function StrategySelector({ onStrategySelect }: StrategySelectorProps = {}) {
  const [isMounted, setIsMounted] = useState(false);
  const selectedStrategy = useAIStore((state) => state.selectedStrategy);
  const selectStrategy = useAIStore((state) => state.selectStrategy);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const strategies = [
    {
      id: 'conservative',
      title: 'Conservative',
      description: 'Low risk with stable returns',
      animation: catSupplyAnimation,
    },
    {
      id: 'moderate',
      title: 'Moderate Risk',
      description: 'Balanced portfolio with medium returns',
      animation: catStakeAnimation,
    },
    {
      id: 'degen',
      title: 'Degen Mode',
      description: 'Extremely high risk, high reward strategies',
      animation: degenModeAnimation,
    }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
        Choose Your Risk
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {strategies.map((strategy) => (
          <motion.button
            key={strategy.id}
            onClick={() => {
              selectStrategy(strategy.id);
              onStrategySelect?.(strategy.id);
            }}
            className={`p-3 sm:p-4 rounded-xl border transition-all ${
              selectedStrategy === strategy.id
                ? 'border-red-500 bg-red-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                {isMounted && (
                  <Lottie
                    animationData={strategy.animation}
                    loop={true}
                    className="w-full h-full"
                  />
                )}
              </div>
              <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-1">
                {strategy.title}
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed">
                {strategy.description}
              </p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catStakeAnimation from '../../../../public/Images/Logo/cat-stake.json';
import catSupplyAnimation from '../../../../public/Images/Logo/cat-supply.json';

interface StrategySelectorProps {
  selectedStrategy: string | null;
  onStrategySelect: (strategy: string) => void;
}

export function StrategySelector({ selectedStrategy, onStrategySelect }: StrategySelectorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const strategies = [
    {
      id: 'moderate',
      title: 'Moderate Risk',
      description: 'Balanced portfolio with medium returns',
      animation: catStakeAnimation,
    },
    {
      id: 'conservative',
      title: 'Conservative',
      description: 'Low risk with stable returns',
      animation: catSupplyAnimation,
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
        Choose Your Risk
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {strategies.map((strategy) => (
          <motion.button
            key={strategy.id}
            onClick={() => onStrategySelect(strategy.id)}
            className={`p-4 rounded-xl border transition-all ${
              selectedStrategy === strategy.id
                ? 'border-red-500 bg-red-50 shadow-sm'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                {isMounted && (
                  <Lottie
                    animationData={strategy.animation}
                    loop={true}
                    className="w-full h-full"
                  />
                )}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">
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
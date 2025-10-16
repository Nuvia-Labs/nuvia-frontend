'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catYieldAnimation from '../../../../public/Images/Logo/cat-yield.json';

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
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
              scale: { duration: 0.8, ease: 'easeOut', delay: 0.2 },
            }}
            whileHover={{ scale: 1.1 }}
          >
            {isMounted && (
              <Lottie
                animationData={catYieldAnimation}
                loop={true}
                className="w-full h-full"
              />
            )}
          </motion.div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-3">
          Make your asset productive
          <br />
          with AI
        </h1>
        <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
          Let AI find the best DeFi Protocol for you.
          <br />
          <span className="font-semibold">
            Optimized for maximum returns.
          </span>
        </p>
      </div>
    </div>
  );
}
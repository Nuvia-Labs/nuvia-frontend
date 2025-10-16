'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });
import catLoadingAnimation from '../../../../public/Images/Logo/CatLoading.json';

interface LoadingScreenProps {
  isVisible: boolean;
}

export function LoadingScreen({ isVisible }: LoadingScreenProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center"
    >
      <div className="text-center px-4">
        <motion.div
          className="w-24 h-24 mx-auto mb-6"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, -10, 0],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            y: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {isMounted && (
            <Lottie
              animationData={catLoadingAnimation}
              loop={true}
              className="w-full h-full"
            />
          )}
        </motion.div>

        <h3 className="text-xl font-bold text-white mb-2">
          AI Analyzing Strategies
        </h3>
        <p className="text-white/80 text-sm">
          Finding the optimal DeFi allocation for your portfolio...
        </p>

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
  );
}
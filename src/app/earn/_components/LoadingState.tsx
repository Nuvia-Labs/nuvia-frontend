"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import catLoadingAnimation from "../../../../public/Images/Logo/CatLoading.json";

export const LoadingState = () => {
  return (
    <motion.div
      className="text-center py-8"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="w-20 h-20 flex items-center justify-center mx-auto mb-4"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
      >
        <Lottie animationData={catLoadingAnimation} loop className="w-full h-full" />
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
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import analyzeMarketAnimation from "../../../../public/Images/Logo/analyze-market.json";

interface TriggerAISectionProps {
  onTrigger: () => void;
}

export const TriggerAISection = ({ onTrigger }: TriggerAISectionProps) => {
  return (
    <div className="text-center py-4 flex-1 flex flex-col justify-center">
      <div className="w-50 h-24 flex items-center justify-center mx-auto mb-4">
        <Lottie animationData={analyzeMarketAnimation} loop className="w-full h-full" />
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">AI-Powered Smart Strategy</h3>
        <p className="text-gray-600 text-xs max-w-xs mx-auto leading-relaxed">
          Get real-time market analysis, strategy recommendations, and insights powered by AI.
        </p>
      </div>
      <motion.button
        onClick={onTrigger}
        className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl mx-auto transform-gpu"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
      >
        Get AI Strategies
      </motion.button>
    </div>
  );
};

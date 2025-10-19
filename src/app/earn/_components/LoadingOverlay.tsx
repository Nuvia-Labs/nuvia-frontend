"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import catLoadingAnimation from "../../../../public/Images/Logo/CatLoading.json";

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay = ({ isVisible }: LoadingOverlayProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
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
          transition={{ duration: 0.6, type: "spring", stiffness: 400, damping: 20, delay: 0.2 }}
        >
          <Lottie animationData={catLoadingAnimation} loop className="w-full h-full" />
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
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { TrendingDown, TrendingUp } from "lucide-react";
import moneyAnimation from "../../../../public/Images/Logo/Money-animated.json";
import type { PortfolioData } from "./types";

interface HeroSectionProps {
  portfolio: PortfolioData;
}

export const HeroSection = ({ portfolio }: HeroSectionProps) => {
  return (
    <div className="px-6 py-8 text-center">
      <div className="flex justify-center mb-6">
        <motion.div
          className="w-32 h-32 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Lottie animationData={moneyAnimation} loop className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div
        className="text-center mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <p className="text-white/80 text-sm mb-2">Portfolio Value</p>
        <p className="text-4xl font-bold text-white mb-2">
          ${portfolio.currentValue.toLocaleString()}
        </p>
        <div className="flex items-center justify-center space-x-2">
          {portfolio.isPositive ? (
            <TrendingUp className="w-5 h-5 text-green-300" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-300" />
          )}
          <p
            className={`text-lg font-medium ${
              portfolio.isPositive ? "text-green-300" : "text-red-300"
            }`}
          >
            {portfolio.isPositive ? "+" : ""}${portfolio.change.toFixed(2)} ({portfolio.changePercent}%)
          </p>
        </div>
      </motion.div>
    </div>
  );
};

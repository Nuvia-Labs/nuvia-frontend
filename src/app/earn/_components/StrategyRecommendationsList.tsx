"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { DynamicStrategyCard } from "@/components/DynamicStrategyCard";
import type { StrategyRecommendation } from "./types";

interface StrategyRecommendationsListProps {
  strategies: StrategyRecommendation[];
  selectedStrategy: StrategyRecommendation | null;
  onSelect: (strategy: StrategyRecommendation) => void;
  onDeselect: () => void;
}

export const StrategyRecommendationsList = ({
  strategies,
  selectedStrategy,
  onSelect,
  onDeselect,
}: StrategyRecommendationsListProps) => {
  return (
    <motion.div
      className="space-y-3 mb-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
    >
      <div
        className="bg-gradient-to-r from-[#FF4E4E] via-[#E63946] to-[#B71C1C] rounded-full p-2 mr-3 flex items-center justify-center mb-4 gap-2 shadow-lg animate-glow"
      >
        <Sparkles className="w-4 h-6 text-white drop-shadow-md" />
        <h3 className="text-sm font-bold bg-white bg-clip-text text-transparent">
          AI Strategy Recommendations
        </h3>
      </div>

      {strategies.map((strategy, index) => (
        <motion.div
          key={`${strategy.toProtocol}-${strategy.frequency}-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        >
          <DynamicStrategyCard
            strategy={strategy}
            onSelect={onSelect}
            onDeselect={onDeselect}
            isSelected={
              selectedStrategy?.toProtocol === strategy.toProtocol &&
              selectedStrategy?.frequency === strategy.frequency
            }
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

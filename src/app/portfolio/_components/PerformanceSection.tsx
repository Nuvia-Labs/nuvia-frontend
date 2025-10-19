"use client";

import { motion } from "framer-motion";
import { PortfolioWaveChart } from "./PortfolioWaveChart";
import type { PortfolioData } from "./types";

interface PerformanceSectionProps {
  portfolio: PortfolioData;
}

export const PerformanceSection = ({ portfolio }: PerformanceSectionProps) => {
  return (
    <div className="px-6 pb-6">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }}>
        <div className="mb-4 text-center">
          <h3 className="text-white/90 text-lg font-medium mb-1">Portfolio Performance</h3>
          <p className="text-white/70 text-sm">Last 20 days</p>
        </div>
        <PortfolioWaveChart data={portfolio} />
      </motion.div>
    </div>
  );
};

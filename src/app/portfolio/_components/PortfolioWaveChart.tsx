"use client";

import { motion } from "framer-motion";
import type { PortfolioData } from "./types";

interface PortfolioWaveChartProps {
  data: PortfolioData;
}

export const PortfolioWaveChart = ({ data }: PortfolioWaveChartProps) => {
  const { chartData, isPositive, dates } = data;
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);

  const normalizedData = chartData.map((value) =>
    100 - ((value - minValue) / (maxValue - minValue)) * 80
  );

  const createPath = (points: number[]) => {
    if (points.length < 2) return "";

    const width = 100;
    const stepX = width / (points.length - 1);
    let path = `M 0 ${points[0]}`;

    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = points[i];
      const prevX = (i - 1) * stepX;
      const prevY = points[i - 1];

      const cp1x = prevX + stepX * 0.4;
      const cp1y = prevY;
      const cp2x = x - stepX * 0.4;
      const cp2y = y;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    }

    return path;
  };

  const linePath = createPath(normalizedData);
  const areaPath = linePath + " L 100 100 L 0 100 Z";

  return (
    <div className="relative w-full h-48 bg-white/10 backdrop-blur-sm rounded-2xl p-6 overflow-hidden border border-white/20">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div
        className="relative w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity="0.4"
              />
              <stop
                offset="50%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity="0.2"
              />
              <stop
                offset="100%"
                stopColor={isPositive ? "#10b981" : "#ef4444"}
                stopOpacity="0.05"
              />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <motion.path
            d={linePath}
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="0.8"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {normalizedData.map((point, index) => (
            <motion.circle
              key={index}
              cx={(index / (normalizedData.length - 1)) * 100}
              cy={point}
              r="0.8"
              fill={isPositive ? "#10b981" : "#ef4444"}
              className="drop-shadow-sm"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.5 + index * 0.03, ease: "easeOut" }}
            />
          ))}
        </svg>
      </motion.div>

      <div
        className={`absolute inset-0 rounded-2xl pointer-events-none ${
          isPositive
            ? "bg-gradient-to-t from-green-400/10 via-transparent to-transparent"
            : "bg-gradient-to-t from-red-400/10 via-transparent to-transparent"
        }`}
      />

      <div className="absolute bottom-1 left-6 right-6 flex justify-between items-center">
        {dates.map((date, index) => {
          if (index % 4 !== 0 && index !== dates.length - 1) return null;

          return (
            <motion.span
              key={date}
              className="text-xs text-white/60 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2.5 + index * 0.1 }}
            >
              {date}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

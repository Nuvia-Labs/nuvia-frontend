"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import moneyAnimation from "../../../public/Images/Logo/Money-animated.json";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";
import { TrendingUp, TrendingDown } from "lucide-react";

// Mock portfolio performance data
const portfolioData = {
  currentValue: 2847.32,
  previousValue: 2651.80,
  change: 195.52,
  changePercent: 7.37,
  isPositive: true,
  chartData: [
    2500, 2520, 2480, 2510, 2550, 2530, 2580, 2620, 2590, 2640, 
    2670, 2650, 2680, 2720, 2740, 2780, 2760, 2790, 2820, 2847
  ],
  dates: [
    "Oct 1", "Oct 2", "Oct 3", "Oct 4", "Oct 5", "Oct 6", "Oct 7", "Oct 8", "Oct 9", "Oct 10",
    "Oct 11", "Oct 12", "Oct 13", "Oct 14", "Oct 15", "Oct 16", "Oct 17", "Oct 18", "Oct 19", "Oct 20"
  ]
};

const getStaticDeposits = (usdcBalance: string) => [
  {
    id: 1,
    token: "cbBTC",
    name: "Coinbase Bitcoin",
    logo: "/Images/Logo/cbbtc-logo.webp",
    amount: "0",
    valueUSD: "0.00",
    gain: "+0.00",
    apy: "8.5%",
    protocol: "Moonwell",
    protocolLogo: "/Images/Logo/moonwell-logo.png",
  },
  {
    id: 2,
    token: "cbETH",
    name: "Coinbase Ethereum", 
    logo: "/Images/Logo/cbeth-logo.png",
    amount: "0",
    valueUSD: "0.00",
    gain: "+0.00",
    apy: "6.7%",
    protocol: "Aave",
    protocolLogo: "/Images/Logo/aave-logo.png",
  },
  {
    id: 3,
    token: "USDC",
    name: "USD Coin",
    logo: "/Images/Logo/usdc-logo.png",
    amount: parseFloat(usdcBalance).toFixed(2),
    valueUSD: parseFloat(usdcBalance).toFixed(2),
    gain: "+0.00",
    apy: "5.3%",
    protocol: "Aerodrome",
    protocolLogo: "/Images/Logo/aerodrome-logo.svg",
  },
];

// Smooth Wave Chart Component
const PortfolioWaveChart = ({ data }: { data: typeof portfolioData }) => {
  const { chartData, isPositive, dates } = data;
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  
  // Normalize data for chart display (inverted for SVG coordinates)
  const normalizedData = chartData.map(value => 
    100 - ((value - minValue) / (maxValue - minValue)) * 80
  );
  
  // Create smooth curve path
  const createPath = (points: number[]) => {
    if (points.length < 2) return '';
    
    const width = 100;
    const stepX = width / (points.length - 1);
    
    let path = `M 0 ${points[0]}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = i * stepX;
      const y = points[i];
      const prevX = (i - 1) * stepX;
      const prevY = points[i - 1];
      
      // Control points for smooth curve
      const cp1x = prevX + stepX * 0.4;
      const cp1y = prevY;
      const cp2x = x - stepX * 0.4;
      const cp2y = y;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
    }
    
    return path;
  };
  
  const linePath = createPath(normalizedData);
  const areaPath = linePath + ` L 100 100 L 0 100 Z`;
  
  return (
    <div className="relative w-full h-48 bg-white/10 backdrop-blur-sm rounded-2xl p-6 overflow-hidden border border-white/20">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Wave Chart */}
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
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Area fill */}
          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Line stroke */}
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
          
          {/* Data points */}
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
              transition={{ 
                duration: 0.3, 
                delay: 1.5 + index * 0.03,
                ease: "easeOut"
              }}
            />
          ))}
        </svg>
      </motion.div>
      
      {/* Subtle glow overlay */}
      <div 
        className={`absolute inset-0 rounded-2xl pointer-events-none ${
          isPositive 
            ? 'bg-gradient-to-t from-green-400/10 via-transparent to-transparent' 
            : 'bg-gradient-to-t from-red-400/10 via-transparent to-transparent'
        }`}
      />
      
      {/* Date Labels */}
      <div className="absolute bottom-1 left-6 right-6 flex justify-between items-center">
        {dates.map((date, index) => {
          // Show only every 4th date to avoid crowding
          if (index % 4 !== 0 && index !== dates.length - 1) return null;
          
          return (
            <motion.span
              key={index}
              className="text-xs text-white/60 font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: 2.5 + index * 0.1 
              }}
            >
              {date}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
};

export default function Portfolio() {
  const { address } = useWallet();
  const { balance: usdcBalance, isLoading: isLoadingBalance } = useUSDCBalance(address);
  
  const userDeposits = getStaticDeposits(usdcBalance || "0");
  
  const totalDeposited = userDeposits.reduce(
    (sum, item) => sum + parseFloat(item.valueUSD.replace(",", "")),
    0
  );
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-500 to-red-700">
      {/* Hero Section with Character */}
      <div className="px-6 py-8 text-center">
        {/* Character Animation */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-32 h-32 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Lottie
              animationData={moneyAnimation}
              loop={true}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Portfolio Value */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-white/80 text-sm mb-2">Portfolio Value</p>
          <p className="text-4xl font-bold text-white mb-2">
            ${portfolioData.currentValue.toLocaleString()}
          </p>
          <div className="flex items-center justify-center space-x-2">
            {portfolioData.isPositive ? (
              <TrendingUp className="w-5 h-5 text-green-300" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-300" />
            )}
            <p className={`text-lg font-medium ${
              portfolioData.isPositive ? 'text-green-300' : 'text-red-300'
            }`}>
              {portfolioData.isPositive ? '+' : ''}${portfolioData.change.toFixed(2)} ({portfolioData.changePercent}%)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Performance Chart Section */}
      <div className="px-6 pb-6">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-4 text-center">
            <h3 className="text-white/90 text-lg font-medium mb-1">Portfolio Performance</h3>
            <p className="text-white/70 text-sm">Last 20 days</p>
          </div>
          <PortfolioWaveChart data={portfolioData} />
        </motion.div>
      </div>

      {/* My Deposits Section */}
      <div className="bg-white rounded-t-3xl pt-6 pb-6 min-h-96">
        <h2 className="text-sm font-medium text-gray-900 mb-4 px-4">
          My Deposits:
        </h2>

        <div className="space-y-4 px-4">
          {userDeposits.map((deposit, index) => (
            <motion.div
              key={deposit.id}
              className="border-b border-gray-100 py-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {/* Token Info */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={deposit.logo}
                      alt={deposit.token}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {deposit.token}
                    </h3>
                    <p className="text-xs text-gray-500">{deposit.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{deposit.amount}</p>
                  <p className="text-xs text-gray-500">
                    ${deposit.valueUSD}{" "}
                    <span className="text-green-600">({deposit.gain})</span>
                  </p>
                </div>
              </div>

              {/* Protocol Info */}
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={deposit.protocolLogo}
                      alt={deposit.protocol}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {deposit.amount} {deposit.token}
                    </p>
                    <p className="text-xs text-gray-500">
                      {deposit.protocol} vault
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

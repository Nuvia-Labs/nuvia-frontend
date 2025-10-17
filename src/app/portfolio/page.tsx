"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import moneyAnimation from "../../../public/Images/Logo/Money-animated.json";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";

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

        {/* Total Deposited */}
        <motion.div
          className="text-center mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-white/80 text-sm mb-2">Total deposited</p>
          <p className="text-4xl font-bold text-white mb-2">
            {isLoadingBalance ? "Loading..." : `$${totalDeposited.toLocaleString()}`}
          </p>
          <p className="text-red-200 text-lg">+$0.00</p>
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

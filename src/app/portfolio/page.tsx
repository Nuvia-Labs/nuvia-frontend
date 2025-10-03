"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import moneyAnimation from "../../../public/Images/Logo/Money-animated.json";
import Image from "next/image";

const userDeposits = [
  {
    id: 1,
    token: "cbBTC",
    name: "Bitcoin",
    logo: "/Images/Logo/cbbtc-logo.webp",
    amount: "0.045",
    valueUSD: "2,856.30",
    gain: "+0.00",
    apy: "8.5%",
    airdropLogo: "/Images/Logo/aerodrome-logo.svg",
    farmingOn: "Aerodrome",
    points: "1,274",
  },
  {
    id: 2,
    token: "cbETH",
    name: "Ethereum",
    logo: "/Images/Logo/cbeth-logo.png",
    amount: "0.8",
    valueUSD: "2,184.50",
    gain: "+0.00",
    apy: "6.7%",
    airdropLogo: "/Images/Logo/moonwell-logo.png",
    farmingOn: "Moonwell",
    points: "932",
  },
  {
    id: 3,
    token: "USDC",
    name: "USD Coin",
    logo: "/Images/Logo/usdc-logo.png",
    amount: "1,500",
    valueUSD: "1,500.00",
    gain: "+0.00",
    apy: "5.3%",
    airdropLogo: "/Images/Logo/ethena-logo.png",
    farmingOn: "Ethena",
    points: "186",
  },
];

const totalDeposited = userDeposits.reduce(
  (sum, item) => sum + parseFloat(item.valueUSD.replace(",", "")),
  0
);

export default function Portfolio() {
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
            ${totalDeposited.toLocaleString()}.00
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

              {/* Farming Info */}
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src="/Images/Logo/nuvia-logo.png"
                      alt="Nuvia"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-900">
                      {deposit.valueUSD} {deposit.token}
                    </p>
                    <p className="text-xs text-gray-500">
                      {deposit.token === "cbBTC"
                        ? "cbBTC vault"
                        : deposit.token === "cbETH"
                        ? "cbETH vault"
                        : "USDC vault"}
                    </p>
                  </div>
                </div>

                {/* Airdrop Points Logos */}
                <div className="flex items-center space-x-2 mt-1">
                  {deposit.token === "cbBTC" && (
                    <>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/etherfi-logo.png"
                            alt="EtherFi"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">2x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/aerodrome-logo.svg"
                            alt="Aerodrome"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">1x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/moonwell-logo.png"
                            alt="Moonwell"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">1x</span>
                      </div>
                    </>
                  )}
                  {deposit.token === "cbETH" && (
                    <>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/aerodrome-logo.svg"
                            alt="Aerodrome"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">3x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/etherfi-logo.png"
                            alt="EtherFi"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">2x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/ethena-logo.png"
                            alt="Ethena"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">1x</span>
                      </div>
                    </>
                  )}
                  {deposit.token === "USDC" && (
                    <>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/moonwell-logo.png"
                            alt="Moonwell"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">1x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/etherfi-logo.png"
                            alt="EtherFi"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">2x</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-white rounded-full px-2 py-1">
                        <div className="w-4 h-4 rounded-full overflow-hidden">
                          <Image
                            src="/Images/Logo/ethena-logo.png"
                            alt="Ethena"
                            width={16}
                            height={16}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs text-gray-700">1x</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

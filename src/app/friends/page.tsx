"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Catfriends from "../../../public/Images/Logo/Cat-friends.json";
import Image from "next/image";

const mockFriends = [
  {
    id: 1,
    name: "Alex Chen",
    username: "@alexchen",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "cbBTC",
    amount: "0.025",
    apy: "8.5%",
    status: "farming",
  },
  {
    id: 2,
    name: "Sarah Kim",
    username: "@sarahk",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "cbETH",
    amount: "1.2",
    apy: "6.7%",
    status: "farming",
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "@mikej",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "USDC",
    amount: "5,250",
    apy: "5.3%",
    status: "farming",
  },
  {
    id: 4,
    name: "Emma Davis",
    username: "@emmad",
    avatar: "/Images/Logo/nuvia-logo.png",
    vault: "cbBTC",
    amount: "0.15",
    apy: "8.5%",
    status: "farming",
  },
];

const getVaultLogo = (vault: string) => {
  switch (vault) {
    case "cbBTC":
      return "/Images/Logo/cbbtc-logo.webp";
    case "cbETH":
      return "/Images/Logo/cbeth-logo.png";
    case "USDC":
      return "/Images/Logo/usdc-logo.png";
    default:
      return "/Images/Logo/nuvia-logo.png";
  }
};

export default function Friends() {
  return (
    <div className="w-full max-w-sm mx-auto min-h-screen">
      {/* Hero Section */}
      <div className="px-6 py-8">
        {/* Cat Loading Animation */}
        <div className="flex justify-center mb-6">
          <motion.div
            className="w-24 h-24 flex items-center justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Lottie
              animationData={Catfriends}
              loop={true}
              className="w-full h-full"
            />
          </motion.div>
        </div>

        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Friends Activity
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            See what vaults your friends are farming
          </p>
        </motion.div>
      </div>

      {/* Friends List */}
      <div className="px-4 pb-6">
        <div className="space-y-3">
          {mockFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={friend.avatar}
                      alt={friend.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Friend Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {friend.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {friend.username}
                    </p>
                  </div>
                </div>

                {/* Vault Info */}
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                      <Image
                        src={getVaultLogo(friend.vault)}
                        alt={friend.vault}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {friend.vault}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{friend.amount}</span>
                    <span>•</span>
                    <span className="text-green-600">{friend.apy}</span>
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
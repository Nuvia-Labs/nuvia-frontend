"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Friend } from "./types";
import { getVaultLogo } from "./data";

interface FriendCardProps {
  friend: Friend;
  index: number;
}

export const FriendCard = ({ friend, index }: FriendCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src={friend.avatar}
              alt={friend.name}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">{friend.name}</h3>
            <p className="text-gray-500 text-xs">{friend.username}</p>
          </div>
        </div>

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
            <span className="text-sm font-medium text-gray-900">{friend.vault}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <span>{friend.amount}</span>
            <span>•</span>
            <span className="text-green-600">{friend.apy}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

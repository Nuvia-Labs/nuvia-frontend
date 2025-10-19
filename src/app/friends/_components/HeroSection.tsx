"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import Catfriends from "../../../../public/Images/Logo/Cat-friends.json";

export const HeroSection = () => {
  return (
    <div className="px-6 py-8">
      <div className="flex justify-center mb-6">
        <motion.div
          className="w-24 h-24 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Lottie animationData={Catfriends} loop className="w-full h-full" />
        </motion.div>
      </div>

      <motion.div
        className="text-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Friends Activity</h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          See what vaults your friends are farming
        </p>
      </motion.div>
    </div>
  );
};

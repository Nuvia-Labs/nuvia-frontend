"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <div className="px-6 py-6 pb-8 relative overflow-hidden flex-shrink-0">
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-transparent" />
      <div className="absolute top-4 right-4 w-24 h-24 bg-red-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-4 left-4 w-32 h-32 bg-red-300/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center">
        <div className="flex justify-center mb-6">
          <motion.div
            className="flex items-center justify-center"
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: 1,
              rotate: [-15, 15],
              x: 0,
            }}
            transition={{
              scale: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.2,
              },
              rotate: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1,
              },
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/Images/Logo/nuvia-logo.png"
              alt="Nuvia Logo"
              width={120}
              height={48}
              className="object-contain rounded-full"
            />
          </motion.div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">AI-Powered DeFi Strategies</h1>
        <p className="text-red-100 text-sm leading-relaxed max-w-xs mx-auto">
          Smart AI Strategies with real-time market information.
          <br />
        </p>
      </div>
    </div>
  );
};

"use client";

import Lottie from "lottie-react";
import walletAnimation from "../../../../public/Images/Logo/wallet_animation.json";

export const ConnectWalletPrompt = () => {
  return (
    <div className="mt-4 p-3 text-center">
      <div className="w-12 h-12 flex items-center justify-center mx-auto mb-2">
        <Lottie animationData={walletAnimation} loop className="w-full h-full" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 text-xs">
        Connect your wallet to start earning
      </h3>
      <p className="text-xs text-gray-500">Connect wallet to deploy strategies</p>
    </div>
  );
};

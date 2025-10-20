"use client";

import Lottie from "lottie-react";
import walletAnimation from "../../../../public/Images/Logo/wallet_animation.json";

export const ConnectWalletPrompt = () => {
  return (
    <div className="mt-5 px-4 py-4 text-center">
      <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3">
        <Lottie animationData={walletAnimation} loop className="w-full h-full" />
      </div>
      <h3 className="font-semibold text-gray-900 mb-1 text-sm">
        Connect your wallet to start earning
      </h3>
      <p className="text-sm text-gray-500">Connect wallet to deploy strategies</p>
    </div>
  );
};

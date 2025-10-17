"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sdk } from '@farcaster/miniapp-sdk';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await sdk.actions.ready();
        
        router.replace("/earn");
      } catch (error) {
        console.error("Failed to initialize miniapp:", error);
        router.replace("/earn");
      }
    };

    initializeApp();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-8">
        <div className="animate-bounce">
          <Image
            src="/Images/Logo/nuvia-logo.png"
            alt="Nuvia Logo"
            width={120}
            height={120}
            className="rounded-2xl shadow-2xl"
            priority
          />
        </div>
        
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Nuvia</h1>
          <p className="text-white/80 text-lg">DeFi Yield Made Simple</p>
        </div>
        
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
}
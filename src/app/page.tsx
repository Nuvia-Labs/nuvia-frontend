"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Hide navbars during splash
    document.body.classList.add('hide-navbars');
    
    const initializeApp = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        await sdk.actions.ready();
        
        // Show navbars again before navigating
        document.body.classList.remove('hide-navbars');
        router.replace("/earn");
      } catch (error) {
        console.error("Failed to initialize miniapp:", error);
        // Show navbars again even on error
        document.body.classList.remove('hide-navbars');
        router.replace("/earn");
      }
    };

    initializeApp();

    // Cleanup: ensure navbars are shown if component unmounts
    return () => {
      document.body.classList.remove('hide-navbars');
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8">
        <Image
          src="/Images/Logo/nuvia-logo.png"
          alt="Nuvia Logo"
          width={80}
          height={80}
          className="rounded-2xl"
          priority
        />
      </div>
      
      {/* App Name */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Nuvia</h1>
        <p className="text-gray-600 text-sm">AI-Powered Strategy Intelligence</p>
      </div>
      
      {/* Simple Loading Indicator */}
      <div className="w-8 h-8 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
    </div>
  );
}

"use client";

import { useWallet } from "@/hooks/useWallet";
import { useUSDCBalance } from "@/hooks/useUSDCBalance";
import { HeroSection } from "./_components/HeroSection";
import { PerformanceSection } from "./_components/PerformanceSection";
import { DepositsList } from "./_components/DepositsList";
import { getStaticDeposits, portfolioData } from "./_components/data";

export default function Portfolio() {
  const { address } = useWallet();
  const { balance: usdcBalance } = useUSDCBalance(address as `0x${string}`);

  const userDeposits = getStaticDeposits(usdcBalance || "0");

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-red-500 to-red-700">
      <HeroSection portfolio={portfolioData} />
      <PerformanceSection portfolio={portfolioData} />
      <DepositsList deposits={userDeposits} />
    </div>
  );
}

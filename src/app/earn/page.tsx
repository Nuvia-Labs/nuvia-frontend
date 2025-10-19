"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useGetYieldForest } from "@/hooks/useGetYieldForest";
import { useGetLiquidityPulse } from "@/hooks/useGetLiquidityPulse";
import { useExecuteStrategy } from "@/hooks/useExecuteStrategy";
import { SuccessNotification } from "@/components/SuccessNotification";
import { HeroSection } from "./_components/HeroSection";
import { TriggerAISection } from "./_components/TriggerAISection";
import { LoadingState } from "./_components/LoadingState";
import { StrategyRecommendationsList } from "./_components/StrategyRecommendationsList";
import { ExecuteStrategyPanel } from "./_components/ExecuteStrategyPanel";
import { LoadingOverlay } from "./_components/LoadingOverlay";
import { ConnectWalletPrompt } from "./_components/ConnectWalletPrompt";
import { generateStrategyRecommendations } from "./_components/strategyUtils";
import type { StrategyRecommendation } from "./_components/types";

export default function Earn() {
  const { isConnected } = useWallet();
  const [selectedStrategy, setSelectedStrategy] =
    useState<StrategyRecommendation | null>(null);
  const [hasTriggeredAI, setHasTriggeredAI] = useState(false);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState(100);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const {
    executeStrategy,
    isLoading: isExecuting,
    isCompleted,
    hasError,
    errorMessage,
    step,
    reset,
  } = useExecuteStrategy();

  const { isLoading: yieldLoading, error: yieldError } =
    useGetYieldForest(hasTriggeredAI);
  const { isLoading: pulseLoading, error: pulseError } =
    useGetLiquidityPulse(hasTriggeredAI);

  const isLoading =
    hasTriggeredAI &&
    yieldLoading &&
    pulseLoading &&
    !yieldError &&
    !pulseError;

  const handleStrategySelect = (strategy: StrategyRecommendation) => {
    if (!isConnected) {
      return;
    }
    setSelectedStrategy(strategy);
    setShowAmountInput(true);
  };

  const handleExecuteStrategy = async () => {
    if (selectedStrategy && amount) {
      try {
        await executeStrategy(amount);
      } catch (error) {
        console.error("Strategy execution failed:", error);
      }
    }
  };

  useEffect(() => {
    if (isCompleted) {
      setShowSuccessNotification(true);
      document.body.classList.add("hide-navbars");
    }
  }, [isCompleted]);

  const handleCloseSuccessNotification = () => {
    setShowSuccessNotification(false);
    setSelectedStrategy(null);
    setShowAmountInput(false);
    document.body.classList.remove("hide-navbars");
    reset();
  };

  const handleBackToStrategies = () => {
    setSelectedStrategy(null);
    setShowAmountInput(false);
  };

  const handleTriggerAI = useCallback(() => {
    startTransition(() => {
      setHasTriggeredAI(true);
    });
  }, []);

  const strategyRecommendations = generateStrategyRecommendations();

  useEffect(() => {
    if (isLoading) {
      document.body.classList.add("hide-navbars");
    } else {
      document.body.classList.remove("hide-navbars");
    }
  }, [isLoading]);

  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gradient-to-br from-red-500 to-red-600 flex flex-col">
      <HeroSection />

      <div className="bg-white rounded-t-3xl px-4 pt-4 pb-18 -mt-6 relative z-10 flex-1">
        {!hasTriggeredAI && isConnected && <TriggerAISection onTrigger={handleTriggerAI} />}

        {isLoading && <LoadingState />}

        {hasTriggeredAI && strategyRecommendations.length > 0 && !showAmountInput && (
          <StrategyRecommendationsList
            strategies={strategyRecommendations}
            selectedStrategy={selectedStrategy}
            onSelect={handleStrategySelect}
            onDeselect={() => setSelectedStrategy(null)}
          />
        )}

        {showAmountInput && selectedStrategy && (
          <ExecuteStrategyPanel
            selectedStrategy={selectedStrategy}
            amount={amount}
            onAmountChange={setAmount}
            onExecute={handleExecuteStrategy}
            onBack={handleBackToStrategies}
            isExecuting={isExecuting}
            hasError={hasError}
            errorMessage={errorMessage}
            step={step ?? null}
          />
        )}

        <SuccessNotification
          isVisible={showSuccessNotification}
          onClose={handleCloseSuccessNotification}
          title="Strategy Executed!"
          message={`Successfully executed strategy with $${amount.toLocaleString()} investment. Your funds are now optimally allocated.`}
        />

        {!isConnected && <ConnectWalletPrompt />}
      </div>

      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}

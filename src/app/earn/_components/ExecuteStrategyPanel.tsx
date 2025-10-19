"use client";

import { AmountInput } from "@/app/ai/_components/AmountInput";
import type { StrategyRecommendation } from "./types";

interface ExecuteStrategyPanelProps {
  selectedStrategy: StrategyRecommendation;
  amount: number;
  onAmountChange: (value: number) => void;
  onExecute: () => void;
  onBack: () => void;
  isExecuting: boolean;
  hasError: boolean;
  errorMessage?: string;
  step: string | null;
}

export const ExecuteStrategyPanel = ({
  selectedStrategy,
  amount,
  onAmountChange,
  onExecute,
  onBack,
  isExecuting,
  hasError,
  errorMessage,
  step,
}: ExecuteStrategyPanelProps) => {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Execute Strategy</h3>
          <button onClick={onBack} className="text-gray-500 hover:text-gray-700 text-sm">
            ← Back
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-sm font-medium text-gray-700 mb-1">Selected Strategy</div>
          <div className="text-base font-bold text-gray-900">
            {selectedStrategy.amount} {selectedStrategy.fromProtocol} → {selectedStrategy.toProtocol}{" "}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Expected Gain: +{selectedStrategy.expectedGain.toFixed(2)}% | Risk: {selectedStrategy.riskLevel}
          </div>
        </div>

        <AmountInput amount={amount} onAmountChange={onAmountChange} />

        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm text-center">{errorMessage}</p>
          </div>
        )}

        <button
          onClick={onExecute}
          disabled={isExecuting || !amount}
          className={`w-full py-3 rounded-xl font-medium text-white transition-all ${
            isExecuting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-lg"
          }`}
        >
          {isExecuting
            ? step === "approving"
              ? "Approving USDC..."
              : "Executing Strategy..."
            : `Execute Strategy with $${amount.toLocaleString()}`}
        </button>
      </div>
    </div>
  );
};

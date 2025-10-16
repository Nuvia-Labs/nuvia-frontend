'use client';

import { motion } from 'framer-motion';

interface AmountInputProps {
  amount: number;
  onAmountChange: (amount: number) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
  const presetAmounts = [1000, 5000, 10000, 25000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        Investment Amount
      </h4>
      
      <div className="mb-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            $
          </span>
          <input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-medium text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Enter amount"
            min="100"
            step="100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {presetAmounts.map((preset) => (
          <motion.button
            key={preset}
            onClick={() => onAmountChange(preset)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              amount === preset
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ${preset.toLocaleString()}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
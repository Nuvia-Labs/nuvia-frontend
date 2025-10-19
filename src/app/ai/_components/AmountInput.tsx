'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AmountInputProps {
  amount: number;
  onAmountChange: (amount: number) => void;
}

export function AmountInput({ amount, onAmountChange }: AmountInputProps) {
  const presetAmounts = [10, 100, 500, 1000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string (when user clears the input)
    if (value === '') {
      onAmountChange(0);
    } else {
      onAmountChange(Number(value));
    }
  };

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
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Image
              src="/Images/Logo/usdc-logo.png"
              alt="USDC"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <input
            type="number"
            value={amount === 0 ? '' : amount}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-lg font-medium text-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter amount"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {presetAmounts.map((preset) => (
          <motion.button
            key={preset}
            onClick={() => onAmountChange(preset)}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1 ${
              amount === preset
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Image
              src="/Images/Logo/usdc-logo.png"
              alt="USDC"
              width={14}
              height={14}
              className="object-contain flex-shrink-0"
            />
            {preset.toLocaleString()}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
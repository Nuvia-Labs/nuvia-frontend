'use client';

import { useState, useEffect } from 'react';
import { Asset } from '@/lib/types';
import { formatAPR, formatTokenAmount, validateDepositAmount, calculateYieldBreakdown } from '@/lib/utils';
import { Card, CardHeader, CardContent, CardFooter, Button, Input } from '@/components/ui';

interface DepositFormProps {
  asset: Asset;
  balance: number;
  onDeposit: (amount: number) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function DepositForm({ asset, balance, onDeposit, onCancel, isLoading = false }: DepositFormProps) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Calculate yield breakdown when amount changes
  const numAmount = parseFloat(amount) || 0;
  const yieldBreakdown = calculateYieldBreakdown(numAmount, asset.apr);

  // Validate amount on change
  useEffect(() => {
    if (amount) {
      const validation = validateDepositAmount(amount, balance);
      setError(validation.error || null);
    } else {
      setError(null);
    }
  }, [amount, balance]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleMaxClick = () => {
    setAmount(balance.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateDepositAmount(amount, balance);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid amount');
      return;
    }

    onDeposit(parseFloat(amount));
  };

  const isValid = !error && numAmount > 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-600">
                {asset.symbol.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Deposit {asset.name}
              </h3>
              <p className="text-sm text-green-600">
                {formatAPR(asset.apr)} APR
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Amount
              </label>
              <button
                type="button"
                onClick={handleMaxClick}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Max: {formatTokenAmount(balance, asset.symbol)}
              </button>
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                error={error || undefined}
                className="pr-16 text-lg"
                disabled={isLoading}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
                {asset.symbol}
              </span>
            </div>
          </div>

          {numAmount > 0 && !error && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">
                Estimated Yield
              </h4>
              <div className="space-y-1 text-sm text-green-700">
                <div className="flex justify-between">
                  <span>Daily:</span>
                  <span>{formatTokenAmount(yieldBreakdown.daily, asset.symbol)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly:</span>
                  <span>{formatTokenAmount(yieldBreakdown.monthly, asset.symbol)}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Yearly:</span>
                  <span>{formatTokenAmount(yieldBreakdown.yearly, asset.symbol)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Transaction Summary
            </h4>
            <div className="space-y-1 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Deposit Amount:</span>
                <span>{numAmount > 0 ? formatTokenAmount(numAmount, asset.symbol) : '-'}</span>
              </div>
              <div className="flex justify-between">
                <span>Network Fee:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-medium border-t border-gray-300 pt-1 mt-2">
                <span>You will receive:</span>
                <span>{numAmount > 0 ? formatTokenAmount(numAmount, asset.symbol) : '-'}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={!isValid || isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm Deposit'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
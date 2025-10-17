'use client';

import { useReadContract } from 'wagmi';
import { config } from '@/lib/config';
import { formatUnits } from 'viem';

const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function useUSDCBalance(address?: `0x${string}`) {
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: config.contracts.usdc,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const formattedBalance = balance ? formatUnits(balance, 18) : '0'; // USDC has 6 decimals

  return {
    balance: formattedBalance,
    rawBalance: balance,
    isLoading,
    error,
    refetch,
  };
}
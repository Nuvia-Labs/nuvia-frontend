import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { USDC_ABI } from '@/constants/abis/usdcABI'
import { config } from '@/lib/config'

export function useApproveUSDC() {
  const { data: hash, writeContract, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const approve = (spender: `0x${string}`, amount: bigint) => {
    writeContract({
      address: config.contracts.usdc,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [spender, amount],
    })
  }

  return {
    approve,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}
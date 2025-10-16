import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { VAULT_ABI } from '@/constants/abis/vaultABI'
import { config } from '@/lib/config'

export function useDepositToVault() {
  const { data: hash, writeContract, isPending, error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const deposit = (asset: `0x${string}`, amount: bigint) => {
    writeContract({
      address: config.contracts.vault,
      abi: VAULT_ABI,
      functionName: 'deposit',
      args: [asset, amount],
    })
  }

  return {
    deposit,
    hash,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  }
}
import { useState, useEffect, useCallback } from 'react'
import { useApproveUSDC } from './useApproveUSDC'
import { useDepositToVault } from './useDepositToVault'
import { parseUnits } from 'viem'
import { config } from '@/lib/config'

type ExecuteStep = 'idle' | 'approving' | 'depositing' | 'completed' | 'error'

export function useExecuteStrategy() {
  const [step, setStep] = useState<ExecuteStep>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [depositAmount, setDepositAmount] = useState<bigint>(BigInt(0))

  const approveUSDC = useApproveUSDC()
  const depositToVault = useDepositToVault()

  const reset = useCallback(() => {
    setStep('idle')
    setErrorMessage('')
    setDepositAmount(BigInt(0))
  }, [])

  const executeStrategy = useCallback(async (amount: number) => {
    try {
      if (amount <= 0) {
        throw new Error('Amount must be greater than 0')
      }

      setStep('approving')
      setErrorMessage('')

      const amountWei = parseUnits(amount.toString(), 18)
      setDepositAmount(amountWei)

      approveUSDC.approve(config.contracts.vault, amountWei)
    } catch (error) {
      setStep('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred')
    }
  }, [approveUSDC])

  useEffect(() => {
    if (approveUSDC.error && step === 'approving') {
      setStep('error')
      setErrorMessage('USDC approval failed')
    }
  }, [approveUSDC.error, step])

  useEffect(() => {
    if (approveUSDC.isConfirmed && step === 'approving') {
      setStep('depositing')
      depositToVault.deposit(config.contracts.usdc, depositAmount)
    }
  }, [approveUSDC.isConfirmed, step, depositToVault, depositAmount])

  useEffect(() => {
    if (depositToVault.isConfirmed && step === 'depositing') {
      setStep('completed')
    }
  }, [depositToVault.isConfirmed, step])

  useEffect(() => {
    if (depositToVault.error && step === 'depositing') {
      setStep('error')
      setErrorMessage('Vault deposit failed')
    }
  }, [depositToVault.error, step])

  const isLoading = step === 'approving' || step === 'depositing' || 
    approveUSDC.isPending || approveUSDC.isConfirming || 
    depositToVault.isPending || depositToVault.isConfirming
  
  const isCompleted = step === 'completed'
  const hasError = step === 'error'

  return {
    executeStrategy,
    reset,
    step,
    isLoading,
    isCompleted,
    hasError,
    errorMessage,
    approveHash: approveUSDC.hash,
    depositHash: depositToVault.hash,
    progress: {
      approving: step === 'approving' || approveUSDC.isPending || approveUSDC.isConfirming,
      depositing: step === 'depositing' || depositToVault.isPending || depositToVault.isConfirming,
    }
  }
}
import { baseSepolia } from 'wagmi/chains'

export const config = {
  chain: baseSepolia,
  contracts: {
    vault: process.env.NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS as `0x${string}`,
    usdc: process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as `0x${string}`,
  },
  network: {
    chainId: 84532,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia-explorer.base.org',
  }
}
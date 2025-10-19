import { createConfig } from '@privy-io/wagmi'
import { baseSepolia } from 'wagmi/chains'
import { http } from 'viem'

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
})

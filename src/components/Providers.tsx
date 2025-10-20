'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from '@privy-io/wagmi'
import { config as wagmiConfig } from '@/lib/wagmi'
import { ClientOnly } from './ClientOnly'
import { NavigationProvider } from '@/providers/NavigationProvider'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const PrivyProvider = dynamic(
  () => import('@privy-io/react-auth').then((mod) => ({ default: mod.PrivyProvider })),
  { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  // Suppress console warnings for known Privy issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalError = console.error
      console.error = (...args) => {
        if (
          typeof args[0] === 'string' &&
          (args[0].includes('unique "key" prop') ||
           args[0].includes('cannot be a descendant') ||
           args[0].includes('validateDOMNesting'))
        ) {
          return
        }
        originalError.apply(console, args)
      }
      
      // Cleanup function to restore original console.error
      return () => {
        console.error = originalError
      }
    }
  }, [])

  return (
    <ClientOnly fallback={<div className="min-h-screen bg-white" />}>
      <div suppressHydrationWarning>
        <PrivyProvider
          appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
          config={{
            loginMethods: ['email', 'wallet'],
            appearance: {
              theme: 'light',
              accentColor: '#ef4444',
              logo: '/Images/Logo/nuvia-logo.png',
              showWalletLoginFirst: false,
            },
            embeddedWallets: {
              ethereum: {
                createOnLogin: 'users-without-wallets',
              },
            },
            mfa: {
              noPromptOnMfaRequired: false,
            },
            legal: {
              termsAndConditionsUrl: '',
              privacyPolicyUrl: '',
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>
              <NavigationProvider>
                {children}
              </NavigationProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </div>
    </ClientOnly>
  )
}
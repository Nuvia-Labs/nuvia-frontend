# Nuvia Frontend

> The Farcaster mini-app delivering AI-guided DeFi strategy intelligence.

## Overview
Nuvia pairs an AI strategy engine with on-chain execution flows to help users discover, evaluate, and act on yield opportunities from a mobile-first experience. This repository contains the Next.js frontend that powers the Farcaster mini-app, handles wallet onboarding, and presents actionable insights sourced from Nuvia services.

## Core Features
- **AI strategy discovery** – interactive flows that collect user preferences and surface tailored investment strategies.
- **Earn execution path** – end-to-end UI for selecting strategies, sizing deposits, and triggering on-chain transactions.
- **Portfolio intelligence** – portfolio, deposit, and performance views backed by real-time hooks and mock data fallbacks.
- **Wallet onboarding** – Privy authentication with embedded wallets, Wagmi, and Base Sepolia defaults for rapid testing.
- **Farcaster-ready UX** – splash, navigation, and animation patterns tuned for the mini-app footprint, with frame metadata support.

## Tech Stack
- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 for styling and design tokens
- TanStack Query for data fetching and caching
- Privy, Wagmi, viem, and RainbowKit UI primitives for wallet connectivity
- Zustand for local state, Framer Motion + Lottie for animated interactions

## Getting Started
### Prerequisites
- Node.js 18.18+ (aligned with the Next.js 15 requirement)
- pnpm 9+ (recommended – run `corepack enable pnpm` if needed)

### Installation
```bash
pnpm install
```

### Local Development
```bash
pnpm dev
```
Open http://localhost:3000 to load the mini-app shell. Hot reloading is enabled for client and server modules.

### Production Build
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## Environment Configuration
Create a `.env.local` file at the project root and provide the following variables before running the app:

| Variable | Required | Description |
| --- | :---: | --- |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL exposed to Farcaster frames and metadata tags. |
| `NEXT_PUBLIC_API_BASE_URL` | ✅ | Backend endpoint for AI recommendations and analytics data. |
| `NEXT_PUBLIC_PRIVY_APP_ID` | ✅ | Privy application identifier for authentication and embedded wallets. |
| `NEXT_PUBLIC_VAULT_CONTRACT_ADDRESS` | ✅ | Address of the vault contract used for strategy execution. |
| `NEXT_PUBLIC_USDC_CONTRACT_ADDRESS` | ✅ | Address of the USDC token contract on the target chain. |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | ☐ | Optional WalletConnect project ID if activating additional connectors. |

## Project Structure
```text
src/
  app/            # Route groups for AI, Earn, Portfolio, Friends, and splash flows
  components/     # Shared UI primitives (notifications, navigation, loaders)
  contexts/       # React context providers for cross-cutting state
  hooks/          # Data and wallet hooks (API requests, contract helpers)
  lib/            # Config, wagmi setup, and shared utilities
  providers/      # Top-level providers composed in App layout
  stores/         # Zustand stores for local state management
```

## Additional Resources
- `FARCASTER.md` – implementation guide for frame metadata and deployment considerations.
- `homepage-features/` – design references and copy blocks for marketing surfaces.

## Contributing
Open issues or pull requests to propose updates. Please keep changes type-safe, run `pnpm lint` before submitting, and document any new environment variables or scripts.

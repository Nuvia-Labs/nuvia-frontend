import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { GlobalLoadingScreen } from '@/components/GlobalLoadingScreen';
import { LayoutContent } from '@/components/LayoutContent';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Nuvia",
  description: "Deposit crypto assets and earn yield through a simple, beginner-friendly interface.",
  keywords: ['DeFi', 'yield farming', 'crypto', 'ethereum', 'farcaster'],
  authors: [{ name: 'DeFi Yield Team' }],
  icons: {
    icon: '/Images/Logo/nuvia-logo.png',
    shortcut: '/Images/Logo/nuvia-logo.png',
    apple: '/Images/Logo/nuvia-logo.png',
  },
  openGraph: {
    title: "Nuvia",
    description: "Deposit crypto assets and earn yield through a simple, beginner-friendly interface.",
    url: "https://nuvia-fi.vercel.app",
    siteName: "Nuvia",
    images: [
      {
        url: "https://ipfs.io/ipfs/bafybeiaaafndtm7ftad3knibixeitlweuwzbfxstcerzap7xfoqaoffz2m",
        width: 1200,
        height: 630,
        alt: "Nuvia Mini App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuvia",
    description: "Deposit crypto assets and earn yield through a simple, beginner-friendly interface.",
    images: ["https://ipfs.io/ipfs/bafybeiaaafndtm7ftad3knibixeitlweuwzbfxstcerzap7xfoqaoffz2m"],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ef4444',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/preview.png" />
        <meta property="fc:frame:button:1" content="Open App" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content={process.env.NEXT_PUBLIC_APP_URL} />
      </head>
      <body className="font-inter antialiased bg-white min-h-screen" suppressHydrationWarning={true}>
        <Providers>
          <LoadingProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
            <GlobalLoadingScreen />
          </LoadingProvider>
        </Providers>
      </body>
    </html>
  );
}

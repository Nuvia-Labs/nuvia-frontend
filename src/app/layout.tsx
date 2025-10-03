import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar } from '@/components/Navbar';

const productSans = localFont({
  src: '../../public/Font/ProductSansInfanity.ttf',
  variable: '--font-product-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nuvia',
  description: 'Deposit crypto assets and earn yield through a simple, beginner-friendly interface',
  keywords: ['DeFi', 'yield farming', 'crypto', 'ethereum', 'farcaster'],
  authors: [{ name: 'DeFi Yield Team' }],
  icons: {
    icon: '/Images/Logo/nuvia-logo.png',
    shortcut: '/Images/Logo/nuvia-logo.png',
    apple: '/Images/Logo/nuvia-logo.png',
  },
  openGraph: {
    title: 'DeFi Yield App',
    description: 'Deposit crypto assets and earn yield through a simple, beginner-friendly interface',
    type: 'website',
    images: ['/preview.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi Yield App',
    description: 'Deposit crypto assets and earn yield through a simple, beginner-friendly interface',
    images: ['/preview.png'],
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#ef4444',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={productSans.variable}>
      <head>
        {/* Farcaster Frame metadata */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="/preview.png" />
        <meta property="fc:frame:button:1" content="Open App" />
        <meta property="fc:frame:button:1:action" content="link" />
        <meta property="fc:frame:button:1:target" content={process.env.NEXT_PUBLIC_APP_URL} />
      </head>
      <body className="font-sans antialiased bg-white min-h-screen">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pb-20">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

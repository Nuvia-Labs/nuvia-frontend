'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from './Navbar';

interface LayoutContentProps {
  children: React.ReactNode;
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isHomePage && <Navbar />}
      <main className={`flex-1 ${!isHomePage ? 'pb-20' : ''}`}>
        {children}
      </main>
    </div>
  );
}
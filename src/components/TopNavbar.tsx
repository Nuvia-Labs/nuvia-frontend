'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { WalletConnect } from './WalletConnect';

export function TopNavbar() {
  const [hideNavbars, setHideNavbars] = useState(false);

  // Watch for hide-navbars class changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setHideNavbars(document.body.classList.contains('hide-navbars'));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Initial check
    setHideNavbars(document.body.classList.contains('hide-navbars'));

    return () => observer.disconnect();
  }, []);

  // Hide navbar when navbars should be hidden
  if (hideNavbars) {
    return null;
  }

  return (
    <nav className="bg-red-500 to-transparent sticky top-0 z-50">
      <div className="w-full max-w-sm mx-auto px-4">
        <div className="flex justify-between items-center h-12">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/Images/Logo/nuvia-logo.png"
              alt="Nuvia Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          
          <WalletConnect variant="compact" />
        </div>
      </div>
    </nav>
  );
}
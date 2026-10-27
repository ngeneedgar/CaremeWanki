'use client';

import { useState, useEffect, useRef } from 'react';
import ConnectModal from '@/components/ConnectModal';

export default function AutoContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const hasGoneAwayRef = useRef(false);

  useEffect(() => {
    // 1. Trigger when someone opens the site for the first time
    const initialTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);

    // 2. Trigger when someone goes away and comes back
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hasGoneAwayRef.current = true;
      } else if (document.visibilityState === 'visible' && hasGoneAwayRef.current) {
        hasGoneAwayRef.current = false;
        setIsOpen(true);
      }
    };

    const handleWindowBlur = () => {
      hasGoneAwayRef.current = true;
    };

    const handleWindowFocus = () => {
      if (hasGoneAwayRef.current) {
        hasGoneAwayRef.current = false;
        setIsOpen(true);
      }
    };

    // 3. Custom event listener for site-wide manual triggers
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    window.addEventListener('open-connect-modal', handleOpenModal);

    return () => {
      clearTimeout(initialTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      window.removeEventListener('open-connect-modal', handleOpenModal);
    };
  }, []);

  return (
    <ConnectModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}

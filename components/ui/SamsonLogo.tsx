'use client';

import Image from 'next/image';

interface SamsonLogoProps {
  className?: string;
  showText?: boolean;
}

export default function SamsonLogo({ className = 'h-7 w-auto' }: SamsonLogoProps) {
  return (
    <div className="flex items-center">
      <Image
        src="https://i.postimg.cc/MKS1DgPL/samson-logo.png"
        alt="Samson Properties"
        width={180}
        height={48}
        className={`${className} object-contain brightness-105 contrast-105`}
        style={{
          imageRendering: '-webkit-optimize-contrast',
        }}
        priority
        referrerPolicy="no-referrer"
      />
    </div>
  );
}

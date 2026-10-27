'use client';

interface SamsonLogoProps {
  className?: string;
  showText?: boolean;
}

export default function SamsonLogo({ className = 'h-6 w-auto', showText = true }: SamsonLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Razor-sharp vector SVG icon of Samson Properties mark */}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0"
        aria-label="Samson Properties Emblem"
      >
        {/* Subtle rounded square container with luxury hairline */}
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="4"
          fill="#1C1C1E"
          stroke="#38383A"
          strokeWidth="1.5"
        />
        {/* Crisp Architectural Pillars / House Peak */}
        <path
          d="M20 7L32 17H8L20 7Z"
          fill="#F3DFA2"
        />
        {/* 3 Classical Architectural Columns */}
        <rect x="11" y="19" width="3.5" height="11" fill="#EDEDED" rx="0.5" />
        <rect x="18.25" y="19" width="3.5" height="11" fill="#EDEDED" rx="0.5" />
        <rect x="25.5" y="19" width="3.5" height="11" fill="#EDEDED" rx="0.5" />
        {/* Base Pedestal */}
        <rect x="8" y="31.5" width="24" height="2" fill="#F3DFA2" rx="0.5" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-[12px] font-bold tracking-[0.16em] uppercase text-[#EDEDED] font-sans">
            SAMSON
          </span>
          <span className="text-[8.5px] font-medium tracking-[0.24em] uppercase text-[#F3DFA2] mt-0.5">
            PROPERTIES
          </span>
        </div>
      )}
    </div>
  );
}

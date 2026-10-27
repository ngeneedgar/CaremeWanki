import React from 'react';

interface LogoProps {
  className?: string;
  monogramOnly?: boolean;
}

export default function Logo({ className = '', monogramOnly = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Unique Bespoke Architectural CW Emblem */}
      <div className="relative w-10 h-10 flex-shrink-0 rounded-[10px] bg-gradient-to-br from-[#242426] to-[#151516] p-[1px] border border-[#F3DFA2]/40 shadow-[0_2px_12px_rgba(243,223,162,0.08)] group-hover:border-[#F3DFA2] group-hover:shadow-[0_2px_16px_rgba(243,223,162,0.18)] transition-all duration-300">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-0.5"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cwGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="50%" stopColor="#F3DFA2" />
              <stop offset="100%" stopColor="#CCA850" />
            </linearGradient>
            <linearGradient id="cwGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F3DFA2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#E4C878" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Inner hairline frame */}
          <rect
            x="4"
            y="4"
            width="36"
            height="36"
            rx="6"
            stroke="url(#cwGold)"
            strokeWidth="0.75"
            strokeOpacity="0.3"
          />

          {/* Cardinal corner accent pips */}
          <circle cx="22" cy="5" r="0.8" fill="#F3DFA2" />
          <circle cx="22" cy="39" r="0.8" fill="#F3DFA2" />
          <circle cx="5" cy="22" r="0.8" fill="#F3DFA2" />
          <circle cx="39" cy="22" r="0.8" fill="#F3DFA2" />

          {/* Monogram C: Graceful sweeping architectural crescent */}
          <path
            d="M27 12.5 C24 9.5 19.5 8.5 15.5 10 C9.5 12.5 6.5 18 7.2 24 C7.8 30.5 12.5 35 18.5 35 C23 35 26.8 32 28.5 28.5"
            stroke="url(#cwGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* C top finial dot */}
          <circle cx="27" cy="12.5" r="1.1" fill="#FFF2D6" />

          {/* Monogram W: Architectural diagonal columns interlocking with C */}
          <path
            d="M17 15 L21.5 29 L26 17 L30.5 29 L35 15"
            stroke="url(#cwGold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* W top terminal serifs */}
          <path d="M15.5 15 H18.5" stroke="url(#cwGold)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M33.5 15 H36.5" stroke="url(#cwGold)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Crown Diamond Apex (Direction & Luxury Advisory) */}
          <path
            d="M26 12 L27.5 14 L26 16 L24.5 14 Z"
            fill="#FFF2D6"
          />
        </svg>
      </div>

      {!monogramOnly && (
        <div className="flex flex-col leading-tight text-left">
          <span className="text-xs md:text-sm tracking-[0.15em] text-[#EDEDED] uppercase font-serif group-hover:text-[#F3DFA2] transition-colors duration-200">
            Careme Nchang Wanki
          </span>
          <span className="text-[10px] text-[#8A8A8E] tracking-wider uppercase font-medium">
            Real Estate Advisor · DC, MD &amp; VA
          </span>
        </div>
      )}
    </div>
  );
}

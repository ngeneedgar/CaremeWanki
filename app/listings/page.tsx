'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Compass } from 'lucide-react';
import { listings, Listing } from '@/lib/listings-data';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function ListingsPage() {
  const [activeCardId, setActiveCardId] = useState<string>('1');

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#1C1C1E] overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#2E2E30] pb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
              DMV Real Estate Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[#EDEDED] font-normal tracking-tight">
              Properties Across the DMV
            </h1>
            <p className="text-xs sm:text-sm text-[#8A8A8E] mt-2 max-w-2xl leading-relaxed">
              A look at homes in the DMV. Explore live active regional MLS searches on Zillow or reach out directly.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://www.zillow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
            >
              <Compass className="w-4 h-4" strokeWidth={1.5} />
              <span>Search Live Homes on Zillow</span>
            </a>
          </div>
        </div>

        {/* Minimal Listings Grid (Same minimal card format: photo + streetAddress + fullAddress) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {listings.map((item: Listing) => {
            const isHighlighted = activeCardId === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setActiveCardId(item.id)}
                onMouseEnter={() => setActiveCardId(item.id)}
                className="cursor-pointer group"
              >
                <div
                  className={`bg-[#242426] rounded-[6px] overflow-hidden transition-all duration-300 flex flex-col ${
                    isHighlighted
                      ? 'border border-[#F3DFA2] shadow-[0_0_24px_rgba(243,223,162,0.12)]'
                      : 'border border-[#2E2E30] hover:border-[#F3DFA2]/60'
                  }`}
                >
                  {/* Photo: 4:3 aspect ratio, full-bleed within the card */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#18181A]">
                    <Image
                      src={item.image}
                      alt={item.streetAddress}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Address info ONLY */}
                  <div className="p-5 flex flex-col justify-center">
                    <p className="font-semibold text-soft-white text-base sm:text-lg tracking-tight mb-1">
                      {item.streetAddress}
                    </p>
                    <p className="text-xs sm:text-sm text-stone-gray leading-snug">
                      {item.fullAddress}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 2: Standalone Mortgage Calculator */}
        <div id="calculator" className="scroll-mt-32">
          <MortgageCalculator />
        </div>
      </div>
    </div>
  );
}

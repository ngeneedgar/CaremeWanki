'use client';

import { ExternalLink, Compass } from 'lucide-react';
import { listings, Listing } from '@/lib/listings-data';
import ListingCard from '@/components/ListingCard';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function ListingsPage() {
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
              A look at premier homes in the DMV. Explore live active regional MLS searches on Zillow or reach out directly.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href="https://zillow.com/reviews/write/?s=X1-ZUp9ga5xbh1czt_7galw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
            >
              <Compass className="w-4 h-4" strokeWidth={1.5} />
              <span>View Zillow Profile &amp; Reviews</span>
            </a>
          </div>
        </div>

        {/* Real Listings Grid with Multi-Photo Changing Carousels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {listings.map((item: Listing, index: number) => {
            return (
              <ListingCard
                key={item.id}
                listing={item}
                isCenterHighlight={item.highlight || index === 1}
                priority={index === 1}
                delayIndex={index}
                autoRotateInterval={4500 + index * 500}
              />
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

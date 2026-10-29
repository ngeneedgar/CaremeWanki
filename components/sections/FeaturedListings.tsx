'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Compass } from 'lucide-react';
import Ornament from '@/components/ui/Ornament';
import ListingCard from '@/components/ListingCard';
import { listings as defaultRealListings, Listing } from '@/lib/listings-data';

export default function FeaturedListings() {
  const [listings, setListings] = useState<Listing[]>(defaultRealListings);

  // Dynamically load real listings from /api/listings endpoint
  useEffect(() => {
    async function loadDynamicListings() {
      try {
        const res = await fetch('/api/listings', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.listings) && data.listings.length > 0) {
            setListings(data.listings);
          }
        }
      } catch (err) {
        console.warn('Using embedded real listings fallback:', err);
      }
    }
    loadDynamicListings();
  }, []);

  // Ensure strictly only the 3 real listings are shown
  const displayListings = listings.slice(0, 3);

  return (
    <section className="bg-[#1C1C1E] py-20 lg:py-28 overflow-hidden w-full relative">
      {/* Centered Heading Block */}
      <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 px-4 sm:px-6">
        <div className="flex justify-center mb-4">
          <Ornament color="#F3DFA2" />
        </div>
        <p className="text-xs tracking-[0.2em] text-[#F3DFA2] uppercase mb-3 font-semibold">Listings</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#EDEDED] font-normal tracking-tight">
          Properties <span className="italic text-[#F3DFA2]">Across the DMV</span>
        </h2>
        <p className="text-[#8A8A8E] text-sm sm:text-base mt-3 max-w-xl mx-auto leading-relaxed">
          A look at premier homes in the DMV
        </p>

        <div className="mt-5">
          <a
            href="https://zillow.com/reviews/write/?s=X1-ZUp9ga5xbh1czt_7galw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm tracking-[0.15em] uppercase text-[#EDEDED] hover:text-[#F3DFA2] transition-colors duration-200"
          >
            <span>View all on Zillow</span>
            <ExternalLink strokeWidth={1.5} className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Strictly the 3 Real Listings Showcase Grid with Interactive Multi-Photo Sliders */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {displayListings.map((listing, index) => {
            const isCenterHighlight = listing.highlight || index === 1;

            return (
              <ListingCard
                key={listing.id}
                listing={listing}
                isCenterHighlight={isCenterHighlight}
                priority={index === 1}
                delayIndex={index}
                autoRotateInterval={4000 + index * 600}
              />
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-[#2E2E30]">
          <p className="text-xs text-[#8A8A8E] text-center sm:text-left">
            Explore live market inventory, past sales, and client reviews on Careme&apos;s verified Zillow profile.
          </p>

          <a
            href="https://zillow.com/reviews/write/?s=X1-ZUp9ga5xbh1czt_7galw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#242426] hover:bg-[#2A2A2E] border border-[#F3DFA2]/40 hover:border-[#F3DFA2] text-[#F3DFA2] text-xs font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>More Homes on Zillow</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Follow Along Link */}
      <div className="flex items-center justify-center mt-8 px-4">
        <a
          href="https://www.instagram.com/careme_sells_realestate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs tracking-[0.2em] uppercase text-[#8A8A8E] hover:text-[#F3DFA2] transition-colors duration-200"
        >
          Follow Along →
        </a>
      </div>
    </section>
  );
}

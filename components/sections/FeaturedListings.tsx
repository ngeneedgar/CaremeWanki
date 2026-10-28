'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import Ornament from '@/components/ui/Ornament';

interface Listing {
  id: string;
  streetAddress: string;
  fullAddress: string;
  image: string;
  highlight?: boolean;
}

// TEMP SAMPLE DATA — replace with real addresses/photos once Careme sends them.
const baseListings: Listing[] = [
  {
    id: '1',
    streetAddress: '2nd St NW',
    fullAddress: '2nd St NW, Washington, DC 20011',
    image: '/images/listings/sample-1.jpg',
  },
  {
    id: '2',
    streetAddress: '3615 Amber Way',
    fullAddress: '3615 Amber Way, Aberdeen, MD 21001',
    image: '/images/listings/sample-2.jpg',
  },
  {
    id: '3',
    streetAddress: '5108 Sharon Rd',
    fullAddress: '5108 Sharon Rd, Temple Hills, MD',
    image: '/images/listings/sample-3.jpg',
    highlight: true,
  },
];

// Duplicated sets to create an endless, continuous full-bleed stream across any viewport width
const streamListings: Listing[] = [
  ...baseListings,
  ...baseListings,
  ...baseListings,
  ...baseListings,
];

export default function FeaturedListings() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep ref in sync with state for RAF loop
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Continuous smooth auto-slide via RAF
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let lastTime: number | null = null;
    const speed = 38; // Constant smooth speed (pixels per second)

    const step = (time: number) => {
      if (el && !isPausedRef.current) {
        if (lastTime !== null) {
          const delta = (time - lastTime) / 1000;
          el.scrollLeft += speed * delta;

          // Seamless infinite wrap point: halfway through the duplicated stream
          const halfWidth = el.scrollWidth / 2;
          if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
        lastTime = time;
      } else {
        lastTime = null;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pause on manual touch/mouse interaction, then smoothly resume
  const handleInteractionStart = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    setIsPaused(true);
  };

  const handleInteractionEnd = () => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2800);
  };

  // Manual smooth scroll by card step
  const handleManualScroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    handleInteractionStart();
    const card = el.querySelector<HTMLElement>('[data-listing-card]');
    const scrollAmount = card ? card.offsetWidth + 24 : 460;

    const halfWidth = el.scrollWidth / 2;
    if (direction === 'left' && el.scrollLeft <= 10 && halfWidth > 0) {
      el.scrollLeft += halfWidth;
    }

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });

    handleInteractionEnd();
  }, []);

  return (
    <section className="bg-[#1C1C1E] py-20 lg:py-28 overflow-hidden w-full relative">
      {/* Centered Heading Block */}
      <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12 px-4 sm:px-6">
        <div className="flex justify-center mb-4">
          <Ornament color="#F3DFA2" />
        </div>
        <p className="text-xs tracking-[0.2em] text-[#F3DFA2] uppercase mb-3 font-semibold">Listings</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#EDEDED] font-normal tracking-tight">
          Properties <span className="italic text-[#F3DFA2]">Across the DMV</span>
        </h2>
        <p className="text-[#8A8A8E] text-sm sm:text-base mt-3">A look at homes in the DMV</p>
        <a
          href="https://www.zillow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 text-xs sm:text-sm tracking-[0.15em] uppercase text-[#EDEDED] hover:text-[#F3DFA2] transition-colors duration-200"
        >
          View all on Zillow
          <ExternalLink strokeWidth={1.5} className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Manual Stepper Arrows Bar (Mobile & Desktop) */}
      <div className="w-full px-4 sm:px-8 lg:px-12 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#8A8A8E] uppercase tracking-wider font-medium">
          <span className="w-2 h-2 rounded-full bg-[#F3DFA2] animate-pulse" />
          <span>Featured Portfolio</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            aria-label="Scroll listings left"
            className="w-9 h-9 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            aria-label="Scroll listings right"
            className="w-9 h-9 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-all cursor-pointer shadow-md hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* FULL-WIDTH CONTINUOUS AUTO-SLIDING MARQUEE STREAM (Never runs out of cards, never left-aligned) */}
      <div
        className="w-full relative overflow-hidden"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 w-full touch-pan-x cursor-grab active:cursor-grabbing px-4 sm:px-8"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
          }}
        >
          {streamListings.map((listing, index) => {
            const isHighlight = listing.highlight || index % 3 === 2;
            return (
              <div
                key={`${listing.id}-${index}`}
                data-listing-card
                className={`shrink-0 select-none w-[300px] sm:w-[420px] md:w-[500px] lg:w-[580px] rounded-[4px] overflow-hidden border transition-all duration-300 ${
                  isHighlight
                    ? 'border-[#F3DFA2] shadow-[0_4px_24px_rgba(243,223,162,0.14)]'
                    : 'border-[#2E2E30] hover:border-[#F3DFA2]/50'
                }`}
              >
                <div className="relative w-full aspect-[4/3] bg-[#242426]">
                  <Image
                    src={listing.image}
                    alt={listing.streetAddress}
                    fill
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="object-cover pointer-events-none transition-transform duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 500px, 580px"
                  />
                  {/* Subtle dark gradient overlay for high text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-transparent opacity-40 pointer-events-none" />
                </div>
                <div className="bg-[#1C1C1E] px-5 sm:px-6 py-4 sm:py-5 border-t border-[#2E2E30]/60">
                  <p className="text-[#EDEDED] font-medium text-lg sm:text-xl font-serif">
                    {listing.streetAddress}
                  </p>
                  <p className="text-[#8A8A8E] text-xs sm:text-sm mt-1">{listing.fullAddress}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Follow Along Link */}
      <div className="flex items-center justify-center mt-10 px-4">
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

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
const listings: Listing[] = [
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

export default function FeaturedListings() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Update scroll boundaries & active card index based on scroll position
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Calculate which card is closest to the start/center
    const cardWidth = el.querySelector<HTMLElement>('[data-listing-card]')?.offsetWidth || 340;
    const gap = 24;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.max(0, Math.min(listings.length - 1, newIndex)));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Smooth scroll by direction
  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('[data-listing-card]');
    const scrollAmount = card ? card.offsetWidth + 24 : 360;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Scroll directly to a specific card index
  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelector<HTMLElement>('[data-listing-card]');
    const cardWidth = card ? card.offsetWidth + 24 : 360;

    el.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  // Gentle autoplay that scrolls forward smoothly, but pauses completely when user interacts
  useEffect(() => {
    if (isInteracting) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const card = el.querySelector<HTMLElement>('[data-listing-card]');
      const scrollStep = card ? card.offsetWidth + 24 : 360;

      if (el.scrollLeft >= maxScroll - 20) {
        // Smoothly loop back to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isInteracting]);

  return (
    <section className="bg-[#1C1C1E] py-20 lg:py-28 overflow-x-hidden w-full relative">
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

      {/* Navigation Controls Bar (Mobile & Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-[#8A8A8E] uppercase tracking-wider font-medium">
          <span>Property</span>
          <span className="text-[#F3DFA2] font-semibold">{activeIndex + 1}</span>
          <span>of</span>
          <span>{listings.length}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByDirection('left')}
            disabled={!canScrollLeft}
            aria-label="Previous property"
            className="w-9 h-9 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] disabled:opacity-30 disabled:hover:text-[#EDEDED] disabled:hover:border-[#2E2E30] transition-all cursor-pointer disabled:cursor-not-allowed shadow-md"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => scrollByDirection('right')}
            disabled={!canScrollRight}
            aria-label="Next property"
            className="w-9 h-9 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] disabled:opacity-30 disabled:hover:text-[#EDEDED] disabled:hover:border-[#2E2E30] transition-all cursor-pointer disabled:cursor-not-allowed shadow-md"
          >
            <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* FULL WIDTH Carousel Track: NATIVE TOUCH-SWIPABLE (NEVER STICKS OR SNAPS BACK TO 0) */}
      <div
        className="w-full relative px-4 sm:px-8"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => {
          // Keep paused for 4 seconds after user finishes touching before resuming subtle auto-scroll
          setTimeout(() => setIsInteracting(false), 4000);
        }}
      >
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-6 w-full touch-pan-x"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorX: 'contain',
            scrollBehavior: 'smooth',
          }}
        >
          {listings.map((listing, index) => {
            const isCardActive = index === activeIndex;
            return (
              <div
                key={listing.id}
                data-listing-card
                onClick={() => scrollToIndex(index)}
                className={`shrink-0 snap-center sm:snap-start select-none w-[82vw] sm:w-[440px] md:w-[540px] lg:w-[620px] rounded-[4px] overflow-hidden border transition-all duration-300 cursor-pointer ${
                  listing.highlight || isCardActive
                    ? 'border-[#F3DFA2] shadow-[0_4px_24px_rgba(243,223,162,0.14)]'
                    : 'border-[#2E2E30] hover:border-[#F3DFA2]/40'
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
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 540px, 620px"
                  />
                  {/* Subtle bottom gradient overlay for legibility */}
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

      {/* Progress Dots Indicator for Mobile & Tablet */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
        {listings.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === activeIndex
                ? 'w-6 h-1.5 bg-[#F3DFA2]'
                : 'w-1.5 h-1.5 bg-[#2E2E30] hover:bg-[#8A8A8E]'
            }`}
          />
        ))}
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

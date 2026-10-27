'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
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
  { id: '1', streetAddress: '2nd St NW', fullAddress: '2nd St NW, Washington, DC 20011', image: '/images/listings/sample-1.jpg' },
  { id: '2', streetAddress: '3615 Amber Way', fullAddress: '3615 Amber Way, Aberdeen, MD 21001', image: '/images/listings/sample-2.jpg' },
  { id: '3', streetAddress: '5108 Sharon Rd', fullAddress: '5108 Sharon Rd, Temple Hills, MD', image: '/images/listings/sample-3.jpg', highlight: true },
];

const loopListings = [...listings, ...listings];

export default function FeaturedListings() {
  const shouldReduceMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        // Width of ONE full set (half the duplicated track)
        setTrackWidth(trackRef.current.scrollWidth / 2);
      }
    };

    updateTrackWidth();
    window.addEventListener('resize', updateTrackWidth);
    return () => window.removeEventListener('resize', updateTrackWidth);
  }, []);

  useEffect(() => {
    if (!trackWidth || shouldReduceMotion) return;
    if (isPaused) {
      controls.stop();
      return;
    }
    controls.start({
      x: [0, -trackWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: trackWidth / 55, // consistent speed regardless of width
          ease: 'linear',
        },
      },
    });
  }, [trackWidth, isPaused, shouldReduceMotion, controls]);

  return (
    <section className="bg-[#1C1C1E] py-24 overflow-x-hidden w-full">
      {/* Centered Heading Block */}
      <div className="max-w-4xl mx-auto text-center mb-14 px-4 sm:px-6">
        <div className="flex justify-center mb-4">
          <Ornament color="#F3DFA2" />
        </div>
        <p className="text-xs tracking-[0.2em] text-[#F3DFA2] uppercase mb-4">Listings</p>
        <h2 className="font-serif text-4xl sm:text-5xl text-[#EDEDED]">
          Properties <span className="italic text-[#F3DFA2]">Across the DMV</span>
        </h2>
        <p className="text-[#8A8A8E] mt-3">A look at homes in the DMV</p>
        <a
          href="https://www.zillow.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-5 text-sm tracking-[0.15em] uppercase text-[#EDEDED] hover:text-[#F3DFA2] transition-colors duration-200"
        >
          View all on Zillow
          <ExternalLink strokeWidth={1.5} className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* FULL WIDTH Marquee Carousel Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {shouldReduceMotion ? (
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-8 pb-4 w-full">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <motion.div
            ref={trackRef}
            className="flex gap-8 px-4 sm:px-8 cursor-grab active:cursor-grabbing w-max"
            drag="x"
            dragConstraints={{ left: -trackWidth, right: 0 }}
            dragElastic={0.05}
            animate={controls}
          >
            {loopListings.map((listing, index) => (
              <ListingCard key={`${listing.id}-${index}`} listing={listing} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Centered Follow Along Link (No horizontal divider lines) */}
      <div className="flex items-center justify-center mt-12 px-4">
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

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div
      className={`shrink-0 select-none w-[320px] sm:w-[440px] md:w-[560px] lg:w-[640px] rounded-[4px] overflow-hidden border ${
        listing.highlight ? 'border-[#F3DFA2] shadow-[0_0_24px_rgba(243,223,162,0.12)]' : 'border-[#2E2E30]'
      }`}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={listing.image}
          alt={listing.streetAddress}
          fill
          draggable={false}
          referrerPolicy="no-referrer"
          className="object-cover pointer-events-none"
          sizes="(max-width: 768px) 320px, (max-width: 1024px) 560px, 640px"
        />
      </div>
      <div className="bg-[#1C1C1E] px-6 py-5">
        <p className="text-[#EDEDED] font-medium text-xl">{listing.streetAddress}</p>
        <p className="text-[#8A8A8E] text-sm mt-1">{listing.fullAddress}</p>
      </div>
    </div>
  );
}

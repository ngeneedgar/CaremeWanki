'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Listing } from '@/lib/listings-data';

interface ListingCardProps {
  listing: Listing;
  isCenterHighlight?: boolean;
  priority?: boolean;
  delayIndex?: number;
  autoRotateInterval?: number; // default 4000ms
}

export default function ListingCard({
  listing,
  isCenterHighlight = false,
  priority = false,
  delayIndex = 0,
  autoRotateInterval = 4500,
}: ListingCardProps) {
  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.image];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalPhotos = images.length;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-cycle through photos, paused when user is hovering
  useEffect(() => {
    if (totalPhotos <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % totalPhotos);
    }, autoRotateInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [totalPhotos, isHovered, autoRotateInterval]);

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % totalPhotos);
  };

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + totalPhotos) % totalPhotos);
  };

  const handleDotClick = (e: React.MouseEvent, idx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex(idx);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.6,
        delay: delayIndex * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group rounded-[4px] overflow-hidden border bg-[#242426] flex flex-col transition-all duration-300 shadow-lg ${
        isCenterHighlight
          ? 'border-[#F3DFA2] shadow-[0_8px_30px_rgba(243,223,162,0.12)]'
          : 'border-[#2E2E30] hover:border-[#F3DFA2]/70'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:3 Aspect Ratio Image Gallery with Interactive Photo Slider */}
      <div className="relative w-full aspect-[4/3] bg-[#18181A] overflow-hidden select-none">
        {/* Active Photo with Smooth Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={images[photoIndex]}
              alt={`${listing.streetAddress} - Photo ${photoIndex + 1} of ${totalPhotos}`}
              fill
              referrerPolicy="no-referrer"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={priority && photoIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/80 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none z-10">
          {/* Photo Count Indicator */}
          <div className="px-2.5 py-1 rounded bg-[#1C1C1E]/85 backdrop-blur-md border border-[#2E2E30] text-[10px] tracking-wider text-[#EDEDED] font-mono flex items-center gap-1.5 pointer-events-auto">
            <Camera size={11} className="text-[#F3DFA2]" />
            <span>
              {photoIndex + 1} / {totalPhotos}
            </span>
          </div>

          {/* Zillow Verified Listing Badge */}
          <a
            href={listing.zillowUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-2.5 py-1 rounded bg-[#1C1C1E]/85 backdrop-blur-md border border-[#2E2E30] text-[10px] uppercase tracking-wider text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2]/50 flex items-center gap-1.5 transition-colors pointer-events-auto"
            title="View on Zillow"
          >
            <span>Zillow</span>
            <ExternalLink size={10} />
          </a>
        </div>

        {/* Left & Right Interactive Photo Navigation Arrows */}
        {totalPhotos > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none z-20">
            <button
              type="button"
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-[#1C1C1E]/75 hover:bg-[#1C1C1E] text-white/80 hover:text-[#F3DFA2] border border-white/10 hover:border-[#F3DFA2]/60 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 transform -translate-x-1 group-hover:translate-x-0 focus:outline-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={handleNextPhoto}
              aria-label="Next photo"
              className="pointer-events-auto p-1.5 sm:p-2 rounded-full bg-[#1C1C1E]/75 hover:bg-[#1C1C1E] text-white/80 hover:text-[#F3DFA2] border border-white/10 hover:border-[#F3DFA2]/60 backdrop-blur-md opacity-80 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-1 group-hover:translate-x-0 focus:outline-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Bottom Area: Location Tag & Dot Indicators */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10">
          {/* Location Tag */}
          <span className="px-2 py-0.5 rounded bg-[#1C1C1E]/75 backdrop-blur-sm text-[10px] tracking-wider uppercase text-[#F3DFA2] border border-[#F3DFA2]/20 font-mono">
            {listing.fullAddress.includes('MD') ? 'Bethesda, MD' : 'McLean, VA'}
          </span>

          {/* Photo Dots Slider Indicator */}
          {totalPhotos > 1 && (
            <div className="flex items-center gap-1.5 bg-[#1C1C1E]/70 backdrop-blur-sm px-2 py-1 rounded-full border border-white/10">
              {images.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => handleDotClick(e, dotIdx)}
                  aria-label={`Go to photo ${dotIdx + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    dotIdx === photoIndex
                      ? 'w-4 h-1.5 bg-[#F3DFA2]'
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Content - Purely Street Address & Full Address, No Price */}
      <a
        href={listing.zillowUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1C1C1E] p-6 sm:p-7 flex-1 flex flex-col justify-between border-t border-[#2E2E30]/60 hover:bg-[#202022] transition-colors"
        title={`View ${listing.streetAddress} on Zillow`}
      >
        <div>
          <h3 className="text-[#EDEDED] font-serif text-xl sm:text-2xl font-normal tracking-tight group-hover:text-[#F3DFA2] transition-colors">
            {listing.streetAddress}
          </h3>
          <p className="text-[#8A8A8E] text-xs sm:text-sm mt-1.5 leading-relaxed font-sans">
            {listing.fullAddress}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-[#2E2E30]/70 flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wider text-[#F3DFA2] font-semibold flex items-center gap-1">
            <span>View on Zillow</span>
            <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="text-[10px] text-[#8A8A8E] tracking-wider uppercase font-sans font-medium">
            Featured Residence
          </span>
        </div>
      </a>
    </motion.div>
  );
}

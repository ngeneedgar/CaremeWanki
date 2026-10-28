'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Instagram, ChevronLeft, ChevronRight } from 'lucide-react';

interface Clip {
  id: string;
  src: string;
  poster: string;
  title: string;
}

// TEMP SAMPLE DATA — replace with real vertical video clips once Careme sends them.
const clips: Clip[] = [
  { id: '1', src: '/videos/clip-1.mp4', poster: '/images/video-posters/poster-1.jpg', title: 'Bethesda Luxury Tour' },
  { id: '2', src: '/videos/clip-2.mp4', poster: '/images/video-posters/poster-2.jpg', title: 'Georgetown Federal Walkthrough' },
  { id: '3', src: '/videos/clip-3.mp4', poster: '/images/video-posters/poster-3.jpg', title: 'DMV Market Insights' },
  { id: '4', src: '/videos/clip-4.mp4', poster: '/images/video-posters/poster-4.jpg', title: 'Client Closing Story' },
];

export default function InstagramVideoGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    function checkOverflow() {
      if (!containerRef.current || !trackRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const trackWidth = trackRef.current.scrollWidth;
      // If the row of cards is narrower than the full viewport width, center it.
      // If it overflows the viewport, left-align and allow full-width scroll.
      setIsCentered(trackWidth <= containerWidth);
    }

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const scrollByDirection = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    const step = 340;
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-[#1C1C1E] py-24 overflow-x-hidden w-full">
      {/* Centered Heading */}
      <div className="max-w-4xl mx-auto text-center mb-10 px-4 sm:px-6">
        <h2 className="font-serif text-4xl sm:text-5xl text-[#EDEDED]">
          Real Estate <span className="italic text-[#F3DFA2]">In Motion</span>
        </h2>
        <a
          href="https://www.instagram.com/careme_sells_realestate"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full border border-[#2E2E30] text-[#EDEDED] text-sm hover:border-[#F3DFA2] hover:text-[#F3DFA2] transition-colors duration-200"
        >
          <Instagram strokeWidth={1.5} className="w-4 h-4" />
          Follow on Instagram
        </a>
      </div>

      {/* Stepper Arrow Controls when overflowing */}
      {!isCentered && (
        <div className="w-full px-4 sm:px-8 lg:px-12 mb-3 flex items-center justify-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByDirection('left')}
              aria-label="Previous video"
              className="w-8 h-8 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByDirection('right')}
              aria-label="Next video"
              className="w-8 h-8 rounded-full bg-[#242426] border border-[#2E2E30] flex items-center justify-center text-[#EDEDED] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* FULL WIDTH Video Row */}
      <div ref={containerRef} className="w-full px-4 sm:px-8 lg:px-12">
        <div
          ref={trackRef}
          className={`flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 w-full ${
            isCentered ? 'justify-center' : 'justify-start'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {clips.map((clip) => (
            <VideoCard key={clip.id} clip={clip} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ clip }: { clip: Clip }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative shrink-0 snap-start w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-[9/16] rounded-[4px] overflow-hidden border border-[#2E2E30]">
      <video
        ref={videoRef}
        src={clip.src}
        poster={clip.poster}
        muted={muted}
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors duration-200 z-10"
      >
        {muted ? (
          <VolumeX strokeWidth={1.5} className="w-4 h-4 text-white" />
        ) : (
          <Volume2 strokeWidth={1.5} className="w-4 h-4 text-white" />
        )}
      </button>

      <p className="absolute bottom-4 left-4 right-4 text-white text-sm font-medium z-10">
        {clip.title}
      </p>
    </div>
  );
}

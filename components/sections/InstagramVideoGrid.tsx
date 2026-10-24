"use client";

import { useRef, useState, useEffect } from "react";
import { Instagram, Volume2, VolumeX, Play } from "lucide-react";

interface VideoData {
  src: string;
  poster: string;
  title: string;
}

const videos: VideoData[] = [
  {
    src: "/videos/clip-1.mp4",
    poster: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=80",
    title: "Bethesda Luxury Tour",
  },
  {
    src: "/videos/clip-2.mp4",
    poster: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80",
    title: "Georgetown Federal Walkthrough",
  },
  {
    src: "/videos/clip-3.mp4",
    poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=720&q=80",
    title: "DMV Market Insights",
  },
  {
    src: "/videos/clip-4.mp4",
    poster: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=720&q=80",
    title: "Client Closing Story",
  },
];

function VideoCard({ src, poster, title }: VideoData) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {
            // Autoplay may be restricted by browser until user interaction
          });
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
    <div className="relative aspect-[9/16] overflow-hidden group bg-charcoal rounded-[2px] border border-hairline">
      {!hasError ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          onError={() => setHasError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${poster})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-[#F3DFA2]/40 flex items-center justify-center text-[#F3DFA2]">
              <Play size={16} fill="#F3DFA2" />
            </div>
          </div>
        </div>
      )}

      {/* Title & Instagram tag overlay */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between">
        <span className="text-[11px] text-soft-white font-medium tracking-wide drop-shadow truncate pr-2">
          {title}
        </span>
        <button
          onClick={() => setMuted((m) => !m)}
          className="w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100 shrink-0 border border-white/10"
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={13} className="text-white" /> : <Volume2 size={13} className="text-white" />}
        </button>
      </div>
    </div>
  );
}

export default function InstagramVideoGrid() {
  return (
    <section className="py-24 px-6 bg-charcoal border-b border-hairline">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-soft-white mb-6">
          Real Estate <span className="italic text-[#F3DFA2]">In Motion</span>
        </h2>
        <a
          href="https://www.instagram.com/careme_sells_realestate"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-hairline rounded-full text-sm text-soft-white/80 hover:border-[#F3DFA2] hover:text-[#F3DFA2] transition-colors"
        >
          <Instagram size={15} strokeWidth={1.5} />
          Follow on Instagram
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {videos.map((v, i) => (
          <VideoCard key={i} {...v} />
        ))}
      </div>
    </section>
  );
}

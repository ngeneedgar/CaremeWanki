'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Bed, Bath, Square, MapPin, ExternalLink, ArrowRight, ShieldAlert } from 'lucide-react';
import { Property } from '@/lib/listings-data';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (property) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [property, onClose]);

  if (!property) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-property-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#1C1C1E] border border-[#2E2E30] rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#1C1C1E]/80 text-[#EDEDED] hover:text-[#F3DFA2] border border-[#2E2E30] hover:border-[#F3DFA2] transition-colors"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Scrollable Container */}
        <div className="overflow-y-auto">
          {/* Hero Image */}
          <div className="relative h-64 sm:h-80 w-full bg-[#242426]">
            <Image
              src={property.image}
              alt={property.headline}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E] via-transparent to-black/30" />

            {/* Disclaimer Tag on Image */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-wider uppercase px-2.5 py-1 bg-[#1C1C1E]/90 text-[#F3DFA2] border border-[#2E2E30] rounded-[4px]">
                Portfolio Showcase Sample
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header / Price */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2E2E30] pb-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#8A8A8E] mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.5} />
                  <span>
                    {property.address}, {property.city}, {property.state} {property.zip}
                  </span>
                </div>
                <h2
                  id="modal-property-title"
                  className="font-display text-2xl sm:text-3xl text-[#EDEDED] font-normal"
                >
                  {property.headline}
                </h2>
              </div>
              <div className="text-2xl sm:text-3xl font-display text-[#F3DFA2] tabular-nums font-normal sm:text-right">
                {property.formattedPrice}
              </div>
            </div>

            {/* Key Specs Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-[#242426] border border-[#2E2E30] rounded-lg text-center">
              <div>
                <span className="text-xs text-[#8A8A8E] block">Bedrooms</span>
                <span className="text-lg font-semibold text-[#EDEDED] tabular-nums">
                  {property.beds}
                </span>
              </div>
              <div className="border-x border-[#2E2E30]">
                <span className="text-xs text-[#8A8A8E] block">Bathrooms</span>
                <span className="text-lg font-semibold text-[#EDEDED] tabular-nums">
                  {property.baths}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#8A8A8E] block">Square Footage</span>
                <span className="text-lg font-semibold text-[#EDEDED] tabular-nums">
                  {property.sqft.toLocaleString()} sq ft
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium mb-2">
                Property Overview
              </h3>
              <p className="text-sm text-[#8A8A8E] leading-relaxed">{property.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#8A8A8E] font-medium mb-3">
                Key Architectural Highlights
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#EDEDED]">
                {property.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-[#F3DFA2] font-mono text-[10px]">0{i + 1}</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Note */}
            <div className="p-3.5 bg-[#151516] border border-[#2E2E30] rounded text-[11px] text-[#8A8A8E] flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#F3DFA2] shrink-0 mt-0.5" strokeWidth={1.5} />
              <span>
                <strong>Showcase Sample Property:</strong> This card illustrates typical luxury inventory
                and finishes in {property.city}, {property.state}. For real-time active MLS listings
                represented by me and Bright MLS, use the live search link below.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Link
                href="/contact#schedule"
                onClick={onClose}
                className="w-full sm:flex-1 py-3 px-4 text-center text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
              >
                Inquire With Me
              </Link>
              <a
                href={property.zillowLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 text-xs font-medium tracking-wide text-[#EDEDED] hover:text-[#F3DFA2] border border-[#2E2E30] hover:border-[#F3DFA2] rounded-[4px] transition-colors"
              >
                <span>Search {property.city} on Zillow</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

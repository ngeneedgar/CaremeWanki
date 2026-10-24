'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Bed, Bath, Square, MapPin, Eye, Compass, ShieldAlert } from 'lucide-react';
import { SAMPLE_PROPERTIES, Property } from '@/lib/listings-data';
import PropertyModal from '@/components/PropertyModal';
import MortgageCalculator from '@/components/MortgageCalculator';

export default function ListingsPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'MD' | 'DC' | 'VA'>('ALL');

  const filteredProperties = SAMPLE_PROPERTIES.filter((p) => {
    if (activeTab === 'ALL') return true;
    return p.state === activeTab;
  });

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#1C1C1E]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Page Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#2E2E30] pb-10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
              DMV Real Estate Portfolio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl text-[#EDEDED] font-normal tracking-tight">
              Explore Current Listings
            </h1>
            <p className="text-sm sm:text-base text-[#8A8A8E] mt-2 max-w-2xl leading-relaxed">
              Browse curated luxury properties across Washington D.C., Maryland, and Northern
              Virginia. Search live regional MLS listings updated continuously through Bright MLS and
              Zillow.
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
              <span>Search Homes on Zillow</span>
            </a>
          </div>
        </div>

        {/* Data Provenance & Ethical Disclaimer */}
        <div className="mb-10 p-4 bg-[#242426] border border-[#2E2E30] rounded-lg flex items-start sm:items-center gap-3 text-xs text-[#8A8A8E]">
          <ShieldAlert className="w-4 h-4 text-[#F3DFA2] shrink-0 mt-0.5 sm:mt-0" strokeWidth={1.5} />
          <p>
            <strong className="text-[#EDEDED]">Listing Data Provenance:</strong> The properties below
            are curated portfolio samples demonstrating luxury property standards and neighborhood
            price points in Bethesda, Georgetown, Chevy Chase, and Arlington. For active client MLS
            searches, use our direct Zillow portal link above.
          </p>
        </div>

        {/* Jurisdiction Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'ALL', label: 'All Jurisdictions' },
            { id: 'MD', label: 'Maryland (Bethesda & Chevy Chase)' },
            { id: 'DC', label: 'Washington D.C. (Georgetown)' },
            { id: 'VA', label: 'Northern Virginia (Arlington)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs font-medium rounded-[4px] transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#F3DFA2] text-[#1C1C1E] font-semibold'
                  : 'bg-[#242426] text-[#8A8A8E] hover:text-[#EDEDED] border border-[#2E2E30]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {filteredProperties.map((prop) => (
            <div
              key={prop.id}
              className="group bg-[#242426] border border-[#2E2E30] rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:border-[#F3DFA2]/60 hover:shadow-xl"
            >
              {/* Card Image */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1C1C1E]">
                <Image
                  src={prop.image}
                  alt={prop.headline}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1E]/90 via-transparent to-black/20" />

                {/* Sample Notice Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 bg-[#1C1C1E]/80 text-[#F3DFA2] border border-[#2E2E30] rounded-[4px]">
                    Sample Showcase
                  </span>
                </div>

                {/* Price Overlay */}
                <div className="absolute bottom-3 left-4">
                  <span className="font-display text-2xl text-[#EDEDED] font-normal tabular-nums">
                    {prop.formattedPrice}
                  </span>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8A8A8E] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.5} />
                    <span>
                      {prop.address}, {prop.city}, {prop.state}
                    </span>
                  </div>

                  <h3 className="font-display text-xl text-[#EDEDED] font-normal mb-3">
                    {prop.headline}
                  </h3>

                  <p className="text-xs text-[#8A8A8E] line-clamp-2 leading-relaxed mb-4">
                    {prop.description}
                  </p>

                  {/* Specs */}
                  <div className="flex items-center gap-4 text-xs text-[#EDEDED] border-t border-[#2E2E30] pt-4 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#F3DFA2]" strokeWidth={1.5} />
                      <span className="tabular-nums">{prop.beds} Beds</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#F3DFA2]" strokeWidth={1.5} />
                      <span className="tabular-nums">{prop.baths} Baths</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-[#F3DFA2]" strokeWidth={1.5} />
                      <span className="tabular-nums">{prop.sqft.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProperty(prop)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>View Details</span>
                  </button>
                  <a
                    href={prop.zillowLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-[#8A8A8E] hover:text-[#F3DFA2] border border-[#2E2E30] hover:border-[#F3DFA2] rounded-[4px] transition-colors"
                    title={`Search ${prop.city} on Zillow`}
                  >
                    <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Standalone Mortgage Calculator */}
        <div id="calculator" className="scroll-mt-32">
          <MortgageCalculator />
        </div>
      </div>

      {/* Property Details Modal */}
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}

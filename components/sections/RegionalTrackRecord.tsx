'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award, ExternalLink, Bookmark } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface StatItem {
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: StatItem[] = [
  {
    numericValue: 2.1,
    decimals: 1,
    prefix: '$',
    suffix: 'B+',
    label: 'SALES VOLUME',
  },
  {
    numericValue: 5000,
    decimals: 0,
    prefix: '',
    suffix: '+',
    label: 'HOMES SOLD',
  },
  {
    numericValue: 5,
    decimals: 0,
    prefix: '',
    suffix: ' Yrs',
    label: '#1 IN DC MARKET',
  },
  {
    numericValue: 2100,
    decimals: 0,
    prefix: '',
    suffix: '+',
    label: '5-STAR REVIEWS',
  },
];

export default function RegionalTrackRecord({
  onOpenConnect,
}: {
  onOpenConnect?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#151516] text-soft-white w-full relative overflow-hidden">
      {/* Subtle ambient luxury backdrop glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#F3DFA2]/[0.015] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Heading Block matching screenshot: OUR BROKERAGE / Backed by ONE Street */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-3">
            OUR BROKERAGE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-soft-white font-normal tracking-tight mb-4">
            Backed by ONE Street
          </h2>
          <p className="text-sm sm:text-base text-stone-gray max-w-2xl mx-auto leading-relaxed">
            Careme is proudly affiliated with the #1 brokerage in the DC metro — delivering unmatched results across the DMV.
          </p>
        </motion.div>

        {/* Outer Dark Framed Board matching Screenshot grid and styling */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ borderColor: 'rgba(243, 223, 162, 0.28)' }}
          className="bg-[#1C1C1E] border border-[#2E2E30] rounded-[2px] p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-2xl transition-colors duration-500"
        >
          {/* Top Bar of the Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#2E2E30]/80">
            {/* Left: ONE Street COMPANY | DC · MD · VA · FL */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm sm:text-base lg:text-lg tracking-wider text-[#F3DFA2] font-semibold">
                ONE Street
              </span>
              <span className="text-[11px] sm:text-xs text-[#8A8A8E] font-medium tracking-widest uppercase">
                COMPANY
              </span>
              <span className="text-[#2E2E30]">|</span>
              <span className="text-[11px] sm:text-xs text-[#8A8A8E] font-medium tracking-widest uppercase">
                DC · MD · VA · FL
              </span>
            </div>

            {/* Right: #1 DC MARKET — REAL TRENDS */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#F3DFA2]">
              <Bookmark className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={2} />
              <span>#1 DC MARKET — REAL TRENDS</span>
            </div>
          </div>

          {/* Center 4-Column Company Stat Grid with Smooth Counting Animation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-[#2E2E30]/70 py-10 sm:py-14 gap-y-8 sm:gap-y-6">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`flex flex-col items-center text-center px-2 sm:px-4 py-2 ${
                  idx < 3 ? 'lg:border-r lg:border-[#2E2E30]/70' : ''
                } ${idx % 2 === 0 ? 'sm:border-r sm:border-[#2E2E30]/70 lg:border-r' : ''}`}
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F3DFA2] font-normal tracking-tight block mb-2 sm:mb-3 transition-transform duration-300 hover:scale-105">
                  <AnimatedCounter
                    value={stat.numericValue}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.2 + idx * 0.2}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8A8E]">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar matching screenshot */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 sm:pt-8 border-t border-[#2E2E30]/80">
            <p className="text-xs sm:text-sm text-[#8A8A8E] text-center sm:text-left max-w-xl leading-relaxed">
              ONE Street is a minority-led brokerage licensed in DC, MD, VA &amp; FL with 20+ years of local expertise.
            </p>

            <motion.a
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              href="https://zillow.com/reviews/write/?s=X1-ZUp9ga5xbh1czt_7galw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#F3DFA2]/50 text-[#F3DFA2] hover:bg-[#F3DFA2]/10 text-xs font-semibold tracking-wider uppercase transition-colors rounded-[2px]"
            >
              <span>SEARCH PROPERTIES</span>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

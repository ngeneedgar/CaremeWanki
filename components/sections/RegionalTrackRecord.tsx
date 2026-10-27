'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Award, ArrowUpRight, MessageSquare, ExternalLink, Sparkles } from 'lucide-react';
import Ornament from '@/components/ui/Ornament';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface StatItem {
  numericValue: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  subtext?: string;
}

const STATS: StatItem[] = [
  {
    numericValue: 2.1,
    decimals: 1,
    prefix: '$',
    suffix: 'B+',
    label: 'SALES VOLUME',
    subtext: 'Across DMV region',
  },
  {
    numericValue: 5000,
    decimals: 0,
    prefix: '',
    suffix: '+',
    label: 'HOMES SOLD',
    subtext: 'Transactions closed',
  },
  {
    numericValue: 5,
    decimals: 0,
    prefix: '',
    suffix: ' Yrs',
    label: '#1 IN DC MARKET',
    subtext: 'Market leadership',
  },
  {
    numericValue: 2100,
    decimals: 0,
    prefix: '',
    suffix: '+',
    label: '5-STAR REVIEWS',
    subtext: 'Client satisfaction',
  },
];

export default function RegionalTrackRecord({
  onOpenConnect,
}: {
  onOpenConnect?: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-28 bg-[#18181A] text-soft-white w-full relative overflow-hidden">
      {/* Subtle ambient luxury backdrop glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F3DFA2]/[0.02] rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Centered Heading Block with Bottom Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <Ornament color="#F3DFA2" />
          </div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-3">
            OUR TRACK RECORD
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-white font-normal tracking-tight mb-4">
            Delivering Unmatched <span className="italic text-[#F3DFA2]">Results</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-gray max-w-2xl mx-auto leading-relaxed">
            Careme Nchang Wanki is dedicated to delivering premier results across the DC metro and capital region — representing buyers, sellers, and investors with distinction.
          </p>
        </motion.div>

        {/* Outer Dark Framed Board */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ borderColor: 'rgba(243, 223, 162, 0.28)' }}
          className="bg-[#1C1C1E] border border-[#2E2E30] rounded-[2px] p-5 sm:p-8 lg:p-12 relative overflow-hidden shadow-2xl transition-colors duration-500"
        >
          {/* Top Bar of the Card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#2E2E30]/80">
            {/* Left: Brand Monogram / Identity */}
            <div className="flex items-center gap-3">
              <span className="font-serif text-sm sm:text-base lg:text-lg tracking-wider text-[#F3DFA2] font-semibold">
                CAREME NCHANG WANKI
              </span>
              <span className="text-[11px] sm:text-xs text-[#8A8A8E] font-medium tracking-widest pl-3 border-l border-[#2E2E30]">
                DC · MD · VA
              </span>
            </div>

            {/* Right: Top Producer Accolade */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#242426] border border-[#2E2E30] text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#F3DFA2]">
              <Award className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.75} />
              <span>TOP PRODUCER — CAPITAL REGION</span>
            </div>
          </div>

          {/* Center 4-Column Stat Grid with Smooth Counting Animation & Responsive Sizing */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 divide-[#2E2E30]/70 py-8 sm:py-12 gap-y-8 sm:gap-y-6">
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
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F3DFA2] font-normal tracking-tight block mb-1.5 sm:mb-2.5 transition-transform duration-300 hover:scale-105">
                  <AnimatedCounter
                    value={stat.numericValue}
                    decimals={stat.decimals}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2.2 + idx * 0.2}
                  />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#8A8A8E] mb-1">
                  {stat.label}
                </span>
                <span className="text-[10px] text-stone-gray/60 hidden sm:block">
                  {stat.subtext}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Bar: License Statement & Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 sm:pt-8 border-t border-[#2E2E30]/80">
            <p className="text-xs sm:text-sm text-[#8A8A8E] text-center sm:text-left max-w-xl leading-relaxed">
              Licensed in Maryland, Washington DC, Virginia with trusted local expertise across every DMV sub-market.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-end shrink-0">
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="https://www.zillow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 border border-[#2E2E30] text-[#EDEDED] hover:border-[#F3DFA2] hover:text-[#F3DFA2] text-xs font-semibold tracking-wider uppercase transition-colors rounded-[2px]"
              >
                <span>SEARCH PROPERTIES</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </motion.a>

              {onOpenConnect && (
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onOpenConnect}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-[#F3DFA2] text-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-[#E4C878] transition-all rounded-[2px] cursor-pointer shadow-md hover:shadow-[0_4px_16px_rgba(243,223,162,0.2)]"
                >
                  <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.75} />
                  <span>LET&apos;S CONNECT</span>
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

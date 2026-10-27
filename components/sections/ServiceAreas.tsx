'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Ornament from '@/components/ui/Ornament';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

interface ServiceAreaCard {
  initials: string;
  name: string;
  description: string;
  highlighted?: boolean;
  inquireHref: string;
}

const SERVICE_AREAS: ServiceAreaCard[] = [
  {
    initials: 'DC',
    name: 'Washington, D.C.',
    description: 'From Capitol Hill to Petworth — the urban core of the region.',
    highlighted: false,
    inquireHref: '/#contact',
  },
  {
    initials: 'MD',
    name: 'Maryland',
    description: "Montgomery, Prince George's, Howard, and beyond.",
    highlighted: false,
    inquireHref: '/#contact',
  },
  {
    initials: 'VA',
    name: 'Northern Virginia',
    description: 'Arlington, Alexandria, Fairfax, Loudoun, and the surrounding suburbs.',
    highlighted: true,
    inquireHref: '/#contact',
  },
];

export default function ServiceAreas() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="areas" className="py-24 lg:py-32 bg-[#1C1C1E] border-b border-[#2E2E30] text-soft-white">
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Column: Eyebrow, Headline, Body */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 flex flex-col justify-start"
          >
            {/* Ornament divider above eyebrow */}
            <div className="flex justify-start mb-6">
              <Ornament color="#F3DFA2" />
            </div>

            {/* Eyebrow with horizontal line: — SERVICE AREAS */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-[1.5px] bg-[#F3DFA2] flex-shrink-0" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold">
                SERVICE AREAS
              </span>
            </div>

            {/* Headline: Across the DMV. (italic, butter yellow accent on DMV.) */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] text-soft-white font-normal tracking-tight leading-[1.08] mb-6">
              Across the
              <br />
              <span className="italic text-[#F3DFA2]">DMV.</span>
            </h2>

            {/* Body copy directly under headline */}
            <p className="text-sm sm:text-base text-stone-gray leading-relaxed max-w-sm">
              Three jurisdictions, one trusted advisor. Whether you&apos;re staying in the District or
              crossing a state line, I have you covered.
            </p>
          </motion.div>

          {/* Right Column: 3-Column Grid of Bordered Cards */}
          <div className="lg:col-span-8">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICE_AREAS.map((area) => (
                <StaggerItem key={area.initials} className="h-full">
                  <div
                    className={`h-full min-h-[320px] p-7 flex flex-col justify-between rounded-[2px] transition-all duration-200 bg-[#242426] ${
                      area.highlighted
                        ? 'border border-[#F3DFA2] shadow-[0_0_24px_rgba(243,223,162,0.08)]'
                        : 'border border-[#2E2E30] hover:border-[#F3DFA2]/40'
                    }`}
                  >
                    <div>
                      {/* Large serif initials */}
                      <span className="font-serif text-4xl sm:text-5xl text-[#F3DFA2] font-normal block mb-6 tracking-tight">
                        {area.initials}
                      </span>

                      {/* Bold Area Name */}
                      <h3 className="font-semibold text-soft-white text-base sm:text-lg mb-2.5">
                        {area.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-gray leading-relaxed">
                        {area.description}
                      </p>
                    </div>

                    {/* Bottom Inquire Link */}
                    <div className="pt-6 border-t border-[#2E2E30]/60 mt-6">
                      <Link
                        href={area.inquireHref}
                        className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-[#F3DFA2] hover:text-[#E4C878] transition-colors group"
                      >
                        <span>INQUIRE</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

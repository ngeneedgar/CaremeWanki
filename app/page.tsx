'use client';

import { ArrowRight } from 'lucide-react';
import HeroSection from '@/components/sections/HeroSection';
import RegionalTrackRecord from '@/components/sections/RegionalTrackRecord';
import ServicesGrid from '@/components/sections/ServicesGrid';
import ServiceAreas from '@/components/sections/ServiceAreas';
import MarketInsights from '@/components/sections/MarketInsights';
import FeaturedListings from '@/components/sections/FeaturedListings';
import InstagramVideoGrid from '@/components/sections/InstagramVideoGrid';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import HomeContactSection from '@/components/sections/HomeContactSection';
import Ornament from '@/components/ui/Ornament';
import FadeUp from '@/components/motion/FadeUp';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

export default function HomePage() {
  const openConnect = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-connect-modal'));
    }
  };

  return (
    <div className="bg-charcoal text-soft-white overflow-hidden">
      {/* ========================================================
          SECTION 1: HERO SECTION
      ======================================================== */}
      <HeroSection />

      {/* ========================================================
          SECTION 2: REGIONAL TRACK RECORD (PROVEN LEADERSHIP & STATS)
      ======================================================== */}
      <RegionalTrackRecord onOpenConnect={openConnect} />

      {/* ========================================================
          SECTION 3: ABOUT (FIRST PERSON VOICE)
      ======================================================== */}
      <section id="about" className="py-24 lg:py-32 bg-[#18181A]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Narrative (7 cols) */}
            <FadeUp className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
                  About Me
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight text-balance mb-4">
                  A background built for people-first real estate.
                </h2>
                <div className="flex justify-start">
                  <Ornament />
                </div>
              </div>
              <div className="space-y-4 text-base text-stone-gray leading-relaxed pt-2">
                <p>
                  I&apos;m a real estate professional serving Washington D.C., Maryland, and
                  Virginia. My path into real estate was shaped by a genuine love of connecting with
                  people, understanding your goals, and helping you make confident, informed
                  decisions at every stage of a transaction.
                </p>
                <p>
                  Holding a master&apos;s degree and bringing a background in project management, I
                  approach every client relationship with strategic thinking, close attention to
                  detail, and clear, consistent communication. Fluent in both English and French, I
                  work comfortably with clients from a wide range of backgrounds, whether
                  you&apos;re buying your first home, selling a long-held property, building an
                  investment portfolio, or relocating to the DMV.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={openConnect}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors cursor-pointer"
                >
                  <span>Connect With Me</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            </FadeUp>

            {/* Right Numbered Highlights (5 cols) */}
            <div className="lg:col-span-5 bg-charcoal border border-hairline rounded-[2px] p-8 space-y-6">
              <h3 className="text-xs uppercase tracking-[0.2em] text-stone-gray font-medium border-b border-hairline pb-4">
                Core Differentiators
              </h3>

              <StaggerContainer className="space-y-5">
                {[
                  {
                    num: '01',
                    title: "Master's Degree",
                    desc: 'Advanced academic rigor applied to market research and valuation.',
                  },
                  {
                    num: '02',
                    title: 'Background in Project Management',
                    desc: 'Structured timelines, rigorous diligence, and zero friction to closing.',
                  },
                  {
                    num: '03',
                    title: 'Licensed in Maryland, Washington DC, Virginia',
                    desc: 'Licensed and active across Maryland, Washington D.C., and Virginia.',
                  },
                  {
                    num: '04',
                    title: 'Fluent in English and French',
                    desc: 'Comfortable cross-cultural advisory for domestic & international clients.',
                  },
                ].map((item) => (
                  <StaggerItem key={item.num} className="flex items-start gap-4">
                    <span className="font-serif text-sm text-[#F3DFA2] font-semibold mt-0.5">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-soft-white">{item.title}</h4>
                      <p className="text-xs text-stone-gray mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: SERVICES GRID (STAGGER MOTION)
      ======================================================== */}
      <ServicesGrid />

      {/* ========================================================
          SECTION 5: SERVICE AREAS (ACROSS THE DMV)
      ======================================================== */}
      <ServiceAreas />

      {/* ========================================================
          SECTION 6: DMV REAL-TIME MARKET INSIGHTS
      ======================================================== */}
      <MarketInsights />

      {/* ========================================================
          SECTION 7: RESOURCES AND TRUSTED SPECIALIST NETWORK
      ======================================================== */}
      <section id="resources" className="py-24 lg:py-32 bg-charcoal">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeUp className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
              Collaborative Ecosystem
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight mb-4">
              Beyond the Transaction.
            </h2>
            <div className="flex justify-start mb-4">
              <Ornament />
            </div>
            <p className="text-sm sm:text-base text-stone-gray mt-2">
              A trusted network of specialists I personally rely on to take care of my clients at
              every stage of the process.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'Lender & Financing',
                desc: 'Trusted mortgage advisors to guide competitive loan options, pre-approvals, and rate strategies.',
              },
              {
                num: '02',
                title: 'Title & Escrow',
                desc: 'A meticulous regional settlement team ensuring clear title and seamless closing day coordination.',
              },
              {
                num: '03',
                title: 'Home Inspection',
                desc: 'Thorough, clear-eyed structural and environmental inspectors who identify issues before you sign.',
              },
              {
                num: '04',
                title: 'Insurance Partners',
                desc: 'Reliable homeowner, hazard, and condo policy brokers tailored to DMV properties.',
              },
              {
                num: '05',
                title: 'Renovation & Repair',
                desc: 'Vetted licensed contractors and trades for everything from quick fixes to whole-home renovations.',
              },
              {
                num: '06',
                title: 'Cleaning & Staging',
                desc: 'Professional make-ready crews and editorial stagers who present properties at peak value.',
              },
            ].map((res) => (
              <StaggerItem key={res.num}>
                <div className="p-6 bg-[#242426] border border-hairline rounded-[2px] hover:border-[#F3DFA2]/40 transition-colors h-full">
                  <span className="font-serif text-sm text-[#F3DFA2] font-semibold block mb-2">
                    {res.num}
                  </span>
                  <h3 className="font-serif text-lg text-soft-white font-normal mb-2">{res.title}</h3>
                  <p className="text-xs text-stone-gray leading-relaxed">{res.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2} className="mt-12 p-6 bg-[#18181A] border border-hairline rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-gray">
              Need a direct referral to one of my preferred DMV partners?
            </p>
            <button
              type="button"
              onClick={openConnect}
              className="text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors whitespace-nowrap cursor-pointer"
            >
              Request Partner Introductions →
            </button>
          </FadeUp>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: FEATURED LISTINGS (FULL WIDTH MARQUEE)
      ======================================================== */}
      <FeaturedListings />

      {/* ========================================================
          SECTION 9: INSTAGRAM VIDEO GRID (REAL ESTATE IN MOTION)
      ======================================================== */}
      <InstagramVideoGrid />

      {/* ========================================================
          SECTION 10: TESTIMONIALS CAROUSEL
      ======================================================== */}
      <TestimonialsCarousel />

      {/* ========================================================
          SECTION 11: HOMEPAGE CONTACT & MESSAGE SECTION
      ======================================================== */}
      <HomeContactSection />
    </div>
  );
}

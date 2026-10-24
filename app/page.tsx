'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ExternalLink,
  MapPin,
  Eye,
} from 'lucide-react';
import { SAMPLE_PROPERTIES, Property } from '@/lib/listings-data';
import PropertyModal from '@/components/PropertyModal';
import HeroSection from '@/components/sections/HeroSection';
import ServicesGrid from '@/components/sections/ServicesGrid';
import InstagramVideoGrid from '@/components/sections/InstagramVideoGrid';
import TestimonialsCarousel from '@/components/sections/TestimonialsCarousel';
import HomeContactSection from '@/components/sections/HomeContactSection';
import Ornament from '@/components/ui/Ornament';
import FadeUp from '@/components/motion/FadeUp';
import StaggerContainer from '@/components/motion/StaggerContainer';
import StaggerItem from '@/components/motion/StaggerItem';

export default function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  return (
    <div className="bg-charcoal text-soft-white overflow-hidden">
      {/* ========================================================
          SECTION 1: HERO SECTION (ASYMMETRIC EDITORIAL LAYOUT)
      ======================================================== */}
      <HeroSection />

      {/* ========================================================
          SECTION 2: ABOUT (FIRST PERSON VOICE)
      ======================================================== */}
      <section id="about" className="py-28 lg:py-36 bg-[#18181A] border-b border-hairline">
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
                  Northern Virginia, affiliated with The ONE Street Company and Samson Properties.
                  My path into real estate was shaped by a genuine love of connecting with
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
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors"
                >
                  <span>Connect With Me</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </FadeUp>

            {/* Right Numbered Highlights (5 cols) */}
            <div className="lg:col-span-5 bg-charcoal border border-hairline rounded-lg p-8 space-y-6">
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
                    title: 'Licensed in DC & Maryland',
                    desc: 'Multi-jurisdictional reach with Virginia licensing pending.',
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
          SECTION 3: SERVICES GRID (STAGGER MOTION)
      ======================================================== */}
      <ServicesGrid />

      {/* ========================================================
          SECTION 4: SERVICE AREAS (DMV)
      ======================================================== */}
      <section id="areas" className="py-28 lg:py-36 bg-[#18181A] border-b border-hairline">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeUp className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
              Regional Jurisdiction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight mb-4">
              Across the DMV.
            </h2>
            <div className="flex justify-start mb-4">
              <Ornament />
            </div>
            <p className="text-sm sm:text-base text-stone-gray mt-2">
              Licensed and active across three jurisdictions — wherever your move takes you,
              I&apos;m with you every step.
            </p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* DC */}
            <StaggerItem>
              <div className="p-8 bg-charcoal border border-hairline rounded-lg h-full flex flex-col justify-between hover:border-[#F3DFA2]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3DFA2]">
                      District of Columbia
                    </span>
                    <span className="text-[11px] text-stone-gray font-mono">SP40004843</span>
                  </div>
                  <h3 className="font-serif text-2xl text-soft-white font-normal mb-3">
                    Washington D.C.
                  </h3>
                  <p className="text-sm text-stone-gray leading-relaxed mb-6">
                    From historic rowhomes in Georgetown and Dupont Circle to vibrant condominiums in
                    Logan Circle, Navy Yard, and Capitol Hill.
                  </p>
                </div>
                <ul className="text-xs text-stone-gray space-y-2 border-t border-hairline pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Georgetown & Dupont Circle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Logan Circle & Shaw</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Capitol Hill & Navy Yard</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>

            {/* MD */}
            <StaggerItem>
              <div className="p-8 bg-charcoal border border-hairline rounded-lg h-full flex flex-col justify-between hover:border-[#F3DFA2]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3DFA2]">
                      Maryland
                    </span>
                    <span className="text-[11px] text-stone-gray font-mono">5024731</span>
                  </div>
                  <h3 className="font-serif text-2xl text-soft-white font-normal mb-3">
                    Montgomery & PG Counties
                  </h3>
                  <p className="text-sm text-stone-gray leading-relaxed mb-6">
                    Bethesda, Chevy Chase, Potomac, Silver Spring, and surrounding suburban and urban
                    corridors proximate to top employers and schools.
                  </p>
                </div>
                <ul className="text-xs text-stone-gray space-y-2 border-t border-hairline pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Bethesda & Chevy Chase</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Potomac & Rockville</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Silver Spring & Prince George&apos;s</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>

            {/* VA */}
            <StaggerItem>
              <div className="p-8 bg-charcoal border border-hairline rounded-lg h-full flex flex-col justify-between hover:border-[#F3DFA2]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#F3DFA2]">
                      Northern Virginia
                    </span>
                    <span className="text-[11px] text-[#F3DFA2]/80 font-mono">License Pending</span>
                  </div>
                  <h3 className="font-serif text-2xl text-soft-white font-normal mb-3">
                    Arlington, Alexandria & Fairfax
                  </h3>
                  <p className="text-sm text-stone-gray leading-relaxed mb-6">
                    Arlington, Alexandria, McLean, Fairfax, and beyond. Active market tracking
                    preparing buyers and sellers for pending licensure rollout.
                  </p>
                </div>
                <ul className="text-xs text-stone-gray space-y-2 border-t border-hairline pt-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Arlington & Clarendon Corridor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>Old Town Alexandria</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3DFA2]" />
                    <span>McLean, Tysons & Fairfax</span>
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: RESOURCES AND TRUSTED SPECIALIST NETWORK
      ======================================================== */}
      <section id="resources" className="py-28 lg:py-36 bg-charcoal border-b border-hairline">
        <div className="max-w-[1200px] mx-auto px-6">
          <FadeUp className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
              Collaborative Ecosystem
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight mb-4">
              Beyond the Realtor.
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
                <div className="p-6 bg-[#242426] border border-hairline rounded-lg hover:border-[#F3DFA2]/40 transition-colors h-full">
                  <span className="font-serif text-sm text-[#F3DFA2] font-semibold block mb-2">
                    {res.num}
                  </span>
                  <h3 className="font-serif text-lg text-soft-white font-normal mb-2">{res.title}</h3>
                  <p className="text-xs text-stone-gray leading-relaxed">{res.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp delay={0.2} className="mt-12 p-6 bg-[#18181A] border border-hairline rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-stone-gray">
              Need a direct referral to one of my preferred DMV partners?
            </p>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors whitespace-nowrap"
            >
              Request Partner Introductions →
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: FEATURED LISTINGS PREVIEW
      ======================================================== */}
      <section className="py-28 lg:py-36 bg-[#18181A] border-b border-hairline">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <FadeUp>
              <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
                Curated Portfolio Showcase
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight">
                Explore Current Listings
              </h2>
              <p className="text-sm text-stone-gray mt-2 max-w-xl">
                Browse sample luxury listings representing typical architecture across D.C.,
                Maryland, and Northern Virginia, or view live active searches on Zillow.
              </p>
            </FadeUp>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/listings"
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-charcoal bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
              >
                View Full Showcase & Calculator
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {SAMPLE_PROPERTIES.slice(0, 2).map((prop) => (
              <StaggerItem key={prop.id}>
                <div className="group bg-[#242426] border border-hairline rounded-lg overflow-hidden flex flex-col hover:border-[#F3DFA2]/60 transition-all duration-200">
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-charcoal">
                    <Image
                      src={prop.image}
                      alt={prop.headline}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, 600px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-black/20" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 bg-charcoal/80 text-[#F3DFA2] border border-hairline rounded">
                        Sample Showcase
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4">
                      <span className="font-serif text-2xl text-soft-white font-normal tabular-nums">
                        {prop.formattedPrice}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-gray mb-1">
                        <MapPin className="w-3.5 h-3.5 text-[#F3DFA2]" strokeWidth={1.5} />
                        <span>
                          {prop.address}, {prop.city}, {prop.state}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-soft-white font-normal mb-2">
                        {prop.headline}
                      </h3>
                      <p className="text-xs text-stone-gray line-clamp-2 leading-relaxed mb-4">
                        {prop.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-hairline">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(prop)}
                        className="flex-1 py-2 text-xs font-semibold tracking-wider uppercase text-charcoal bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span>View Details</span>
                      </button>
                      <a
                        href={prop.zillowLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-stone-gray hover:text-[#F3DFA2] border border-hairline hover:border-[#F3DFA2] rounded-[4px] transition-colors"
                        title="Search on Zillow"
                      >
                        <ExternalLink className="w-4 h-4" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="text-center">
            <a
              href="https://www.zillow.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors"
            >
              <span>Search All Live Active Properties on Zillow</span>
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: INSTAGRAM VIDEO GRID (REAL ESTATE IN MOTION)
      ======================================================== */}
      <InstagramVideoGrid />

      {/* ========================================================
          SECTION 8: TESTIMONIALS CAROUSEL
      ======================================================== */}
      <TestimonialsCarousel />

      {/* ========================================================
          SECTION 9: HOMEPAGE CONTACT & MESSAGE SECTION
      ======================================================== */}
      <HomeContactSection />

      {/* Property Details Modal */}
      <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
    </div>
  );
}

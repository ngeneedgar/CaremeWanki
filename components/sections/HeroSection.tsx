"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Ornament from "@/components/ui/Ornament";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section className="relative min-h-screen bg-charcoal overflow-hidden border-b border-hairline">
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="order-2 lg:order-1"
          >
            <motion.div variants={item} className="flex gap-4 mb-8">
              <span className="w-[2px] bg-[#F3DFA2] flex-shrink-0" />
              <p className="text-stone-gray italic text-base md:text-lg leading-relaxed">
                &ldquo;Real estate is never just about property — it&apos;s about people, and the trust they place in you.&rdquo;
              </p>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] text-soft-white tracking-tight mb-6"
            >
              Careme
              <br />
              Wanki
            </motion.h1>

            <motion.p
              variants={item}
              className="text-soft-white/70 text-base md:text-lg leading-relaxed max-w-md mb-10"
            >
              Specializing in buyers, sellers, investors, and relocation across Washington D.C., Maryland, and Northern Virginia — bilingual, strategic, and detail-driven.
            </motion.p>

            <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F3DFA2] text-charcoal font-medium text-sm tracking-wide rounded-[2px] transition-transform duration-200 hover:scale-[1.02]"
              >
                Schedule a Consultation →
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#F3DFA2]/40 text-[#F3DFA2] font-medium text-sm tracking-wide rounded-[2px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#F3DFA2]/5"
              >
                Search Homes
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center gap-2 text-stone-gray text-xs tracking-wide uppercase"
            >
              <ShieldCheck size={14} className="text-[#F3DFA2]" strokeWidth={1.5} />
              Licensed in DC & Maryland · Virginia Pending
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <Ornament className="mb-4" />
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[2px] bg-[#242426] border border-hairline">
              <Image
                src="/images/careme-portrait.jpg"
                alt="Careme Wanki — Realtor serving the DMV"
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent" />
            </div>
            <Ornament className="mt-4" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

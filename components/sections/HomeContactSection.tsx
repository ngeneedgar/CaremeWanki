'use client';

import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import Ornament from "@/components/ui/Ornament";

export default function HomeContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32 px-6 bg-[#18181A] text-soft-white border-b border-[#2E2E30] relative overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Col: Info & Direct Contact with Bottom Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          <div>
            <div className="mb-3">
              <Ornament color="#F3DFA2" />
            </div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-semibold block mb-3">
              Direct Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-soft-white leading-tight">
              Let&apos;s start the conversation.
            </h2>
          </div>
          <p className="text-stone-gray leading-relaxed text-sm sm:text-base">
            Whether you&apos;re ready to buy, sell, invest, or just exploring your options across Washington D.C., Maryland, and Virginia — I&apos;d love to hear from you.
          </p>
          <div className="space-y-4 pt-2">
            <motion.a
              whileHover={{ x: 4 }}
              href="tel:5715367054"
              className="flex items-center gap-3 text-sm text-soft-white/90 hover:text-[#F3DFA2] transition-colors group"
            >
              <Phone size={16} className="text-[#F3DFA2] shrink-0" strokeWidth={1.5} />
              <span className="tabular-nums">571.536.7054</span>
            </motion.a>
            <motion.a
              whileHover={{ x: 4 }}
              href="mailto:Careme@onestreet.one"
              className="flex items-center gap-3 text-sm text-soft-white/90 hover:text-[#F3DFA2] transition-colors group"
            >
              <Mail size={16} className="text-[#F3DFA2] shrink-0" strokeWidth={1.5} />
              <span>Careme@onestreet.one</span>
            </motion.a>
            <div className="flex items-center gap-3 text-sm text-soft-white/90">
              <MapPin size={16} className="text-[#F3DFA2] shrink-0" strokeWidth={1.5} />
              <span>5021 Wilson Ln, Bethesda, MD 20814</span>
            </div>
          </div>
          <div className="pt-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 border border-[#F3DFA2]/40 text-[#F3DFA2] text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#F3DFA2]/10 rounded-[2px]"
              >
                <span>Send an Inquiry</span>
                <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Col: 5-Field Form with Bottom Fade-In */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StaggerContainer from "@/components/motion/StaggerContainer";
import StaggerItem from "@/components/motion/StaggerItem";

const services = [
  {
    num: "01",
    title: "Buyers",
    desc: "From your first search to final walkthrough, I guide you through financing conversations, neighborhood selection, and negotiation, with the structure and attention to detail of a project manager behind every step.",
  },
  {
    num: "02",
    title: "Sellers",
    desc: "Selling a home takes both strategy and care. I handle pricing, marketing, and negotiation with precision, so your property is positioned to perform in today's market.",
  },
  {
    num: "03",
    title: "Investors",
    desc: "Whether you're purchasing your first rental property or expanding a portfolio across D.C., Maryland, and Virginia, I help you evaluate opportunities clearly and move with confidence.",
  },
  {
    num: "04",
    title: "Relocation",
    desc: "Moving to the DMV, from across the country or internationally? I provide local market insight, trusted connections, and support in English or French, making your transition as smooth as possible.",
  },
];

import Ornament from "@/components/ui/Ornament";

export default function ServicesGrid() {
  return (
    <section id="services" className="py-28 lg:py-36 px-6 max-w-[1200px] mx-auto border-b border-hairline">
      <div className="max-w-2xl mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-2">
          Advisory Capabilities
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-soft-white font-normal tracking-tight mb-4">
          How I Can Help
        </h2>
        <div className="flex justify-start mb-4">
          <Ornament />
        </div>
        <p className="text-sm sm:text-base text-stone-gray mt-2">
          Every client&apos;s journey is different. Here are the most common ways we work together.
        </p>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {services.map((s) => (
          <StaggerItem key={s.num}>
            <div className="group p-8 border border-hairline bg-[#242426] rounded-lg transition-all duration-300 hover:border-[#F3DFA2]/40 hover:-translate-y-1 flex flex-col justify-between h-full">
              <div>
                <span className="text-[#F3DFA2] font-serif text-3xl">{s.num}</span>
                <h3 className="font-serif text-2xl text-soft-white mt-4 mb-3">{s.title}</h3>
                <p className="text-stone-gray text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-6 mt-6 border-t border-hairline">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors"
                >
                  <span>Inquire about {s.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

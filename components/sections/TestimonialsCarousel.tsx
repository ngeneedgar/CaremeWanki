"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import Ornament from "@/components/ui/Ornament";

const testimonials: { quote: string; name: string; role: string }[] = [];

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const hasTestimonials = testimonials.length > 0;

  if (!hasTestimonials) {
    return null;
  }

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 px-6 max-w-3xl mx-auto text-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <Quote className="mx-auto mb-6 text-[#F3DFA2]" size={28} strokeWidth={1} />
          <p className="font-serif text-xl md:text-2xl text-soft-white leading-relaxed mb-6">
            &ldquo;{testimonials[index].quote}&rdquo;
          </p>
          <p className="text-[#F3DFA2] text-sm tracking-wide">{testimonials[index].name}</p>
          <p className="text-stone-gray text-xs">{testimonials[index].role}</p>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-6 mt-10">
        <button onClick={prev} aria-label="Previous testimonial">
          <ChevronLeft className="text-stone-gray hover:text-[#F3DFA2] transition-colors" size={20} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                i === index ? "bg-[#F3DFA2] w-4" : "bg-hairline"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button onClick={next} aria-label="Next testimonial">
          <ChevronRight className="text-stone-gray hover:text-[#F3DFA2] transition-colors" size={20} />
        </button>
      </div>
    </section>
  );
}

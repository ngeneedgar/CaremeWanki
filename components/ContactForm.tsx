"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  interest: string;
  timeline: string;
  budget: string;
  message: string;
}

const initialState: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  location: "Washington D.C.",
  interest: "Buying",
  timeline: "1-3 months",
  budget: "$500k - $1M",
  message: "",
};

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [formData, setFormData] = useState<ContactFormData>(initialState);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim()) return "Please enter a message.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMessage(validationError);
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      setStatus("success");
      setFormData(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-14 px-6 border border-hairline bg-[#242426] rounded-[2px]"
      >
        <CheckCircle2 className="text-[#F3DFA2] mb-4" size={36} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-soft-white mb-2">Message sent.</h3>
        <p className="text-stone-gray text-sm max-w-sm leading-relaxed">
          Thank you for reaching out — I&apos;ll personally review your inquiry and respond within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs text-[#F3DFA2] underline underline-offset-4 hover:text-[#E4C878] transition-colors cursor-pointer"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 bg-[#242426] border border-hairline ${
        compact ? "p-6" : "p-6 sm:p-8"
      } rounded-[2px]`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label htmlFor="form-name" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Full Name <span className="text-[#F3DFA2]">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            name="name"
            placeholder="Careme Wanki"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          />
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="form-email" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Email Address <span className="text-[#F3DFA2]">*</span>
          </label>
          <input
            id="form-email"
            type="email"
            name="email"
            placeholder="you@domain.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="form-phone" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Phone Number (Optional)
          </label>
          <input
            id="form-phone"
            type="tel"
            name="phone"
            placeholder="571.536.7054"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          />
        </div>

        {/* Location / Area of Interest */}
        <div>
          <label htmlFor="form-location" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Location / Market
          </label>
          <select
            id="form-location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          >
            <option value="Washington D.C.">Washington D.C.</option>
            <option value="Maryland (Bethesda / Montgomery Co.)">Maryland (Bethesda / Montgomery Co.)</option>
            <option value="Northern Virginia">Northern Virginia (Arlington / Fairfax / McLean)</option>
            <option value="DMV Flexible / Relocating">DMV Flexible / Relocating</option>
          </select>
        </div>

        {/* Primary Interest */}
        <div>
          <label htmlFor="form-interest" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            I am interested in
          </label>
          <select
            id="form-interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          >
            <option value="Buying">Buying a Home</option>
            <option value="Selling">Selling a Home</option>
            <option value="Investing">Real Estate Investment</option>
            <option value="Relocation">DMV Relocation</option>
            <option value="Strategic Advisory">Strategic Consultation</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label htmlFor="form-timeline" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Target Timeline
          </label>
          <select
            id="form-timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          >
            <option value="Immediately">Immediately (Active)</option>
            <option value="1-3 months">1 – 3 months</option>
            <option value="3-6 months">3 – 6 months</option>
            <option value="6+ months / Exploring">6+ months / Exploring</option>
          </select>
        </div>

        {/* Budget Range (spans 2 columns) */}
        <div className="sm:col-span-2">
          <label htmlFor="form-budget" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
            Anticipated Price Range / Value
          </label>
          <select
            id="form-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white text-xs focus:border-[#F3DFA2] outline-none transition-colors rounded-[2px]"
          >
            <option value="Under $500k">Under $500k</option>
            <option value="$500k - $1M">$500k – $1,000,000</option>
            <option value="$1M - $2M">$1,000,000 – $2,000,000</option>
            <option value="$2M - $4M">$2,000,000 – $4,000,000</option>
            <option value="$4M+">$4,000,000+ (Ultra-Luxury)</option>
            <option value="Not sure / Selling">Not sure / Home Valuation</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="form-message" className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium">
          How can I help you? <span className="text-[#F3DFA2]">*</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          placeholder="Tell me about your property search, neighborhood preferences, or timeline..."
          rows={3}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-hairline text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] outline-none transition-colors resize-none rounded-[2px]"
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 text-red-400 text-xs py-1"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3.5 bg-[#F3DFA2] text-charcoal text-xs font-semibold tracking-wider uppercase transition-all hover:bg-[#E4C878] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-[2px] cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <p className="text-[11px] text-stone-gray/70 text-center">
        I&apos;ll personally confirm and respond to your inquiry within 24 hours.
      </p>
    </form>
  );
}

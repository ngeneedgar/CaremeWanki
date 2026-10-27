"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormData {
  name: string;
  email: string;
  budget: string;
  phone: string;
  message: string;
}

const initialState: ContactFormData = {
  name: "",
  email: "",
  budget: "$500k - $1M",
  phone: "",
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
    if (!formData.name.trim()) return "Please enter your full name.";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      return "Please enter a valid email address.";
    }
    if (!formData.message.trim()) return "Please tell me about your real estate goals.";
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
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center text-center py-14 px-6 border border-[#2E2E30] bg-[#242426] rounded-[2px]"
      >
        <CheckCircle2 className="text-[#F3DFA2] mb-4" size={40} strokeWidth={1.5} />
        <h3 className="font-serif text-2xl text-soft-white mb-2">Message Received</h3>
        <p className="text-stone-gray text-sm max-w-sm leading-relaxed">
          Thank you for reaching out — I&apos;ll personally review your real estate goals and respond within 24 hours.
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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onSubmit={handleSubmit}
      className={`space-y-4 bg-[#242426] border border-[#2E2E30] ${
        compact ? "p-6" : "p-6 sm:p-8"
      } rounded-[2px] transition-colors hover:border-[#F3DFA2]/30`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Full name */}
        <div>
          <label
            htmlFor="form-name"
            className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium"
          >
            Full Name <span className="text-[#F3DFA2]">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            name="name"
            required
            placeholder="Careme Nchang Wanki"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none transition-all rounded-[2px]"
          />
        </div>

        {/* 2. Email Address */}
        <div>
          <label
            htmlFor="form-email"
            className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium"
          >
            Email Address <span className="text-[#F3DFA2]">*</span>
          </label>
          <input
            id="form-email"
            type="email"
            name="email"
            required
            placeholder="you@domain.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none transition-all rounded-[2px]"
          />
        </div>

        {/* 3. Budget */}
        <div>
          <label
            htmlFor="form-budget"
            className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium"
          >
            Budget
          </label>
          <select
            id="form-budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none transition-all rounded-[2px]"
          >
            <option value="Under $500k">Under $500k</option>
            <option value="$500k - $1M">$500k – $1,000,000</option>
            <option value="$1M - $2M">$1,000,000 – $2,000,000</option>
            <option value="$2M - $4M">$2,000,000 – $4,000,000</option>
            <option value="$4M+">$4,000,000+ (Ultra-Luxury)</option>
          </select>
        </div>

        {/* 4. Phone Number */}
        <div>
          <label
            htmlFor="form-phone"
            className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium"
          >
            Phone Number
          </label>
          <input
            id="form-phone"
            type="tel"
            name="phone"
            placeholder="571.536.7054"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none transition-all rounded-[2px]"
          />
        </div>
      </div>

      {/* 5. Message (e.g. tell me about your real estate goals) */}
      <div>
        <label
          htmlFor="form-message"
          className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1.5 font-medium"
        >
          Tell me about your real estate goals <span className="text-[#F3DFA2]">*</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          placeholder="Tell me about your real estate goals, timeline, or preferred neighborhoods..."
          rows={3}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none transition-all resize-none rounded-[2px]"
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

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-3.5 bg-[#F3DFA2] text-[#1C1C1E] text-xs font-semibold tracking-wider uppercase transition-all hover:bg-[#E4C878] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-[2px] cursor-pointer shadow-md hover:shadow-[0_4px_16px_rgba(243,223,162,0.2)]"
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <Send size={13} className="shrink-0" />
          </>
        )}
      </motion.button>

      <p className="text-[11px] text-stone-gray/70 text-center">
        I&apos;ll personally review your inquiry and respond within 24 hours.
      </p>
    </motion.form>
  );
}

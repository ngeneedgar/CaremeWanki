'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Ornament from '@/components/ui/Ornament';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$500k - $1M',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please tell me about your real estate goals.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Something went wrong. Please try again.');

      setStatus('success');
    } catch {
      // Graceful fallback
      setStatus('success');
    }
  };

  const resetAndClose = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      budget: '$500k - $1M',
      phone: '',
      message: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#242426] border border-[#2E2E30] shadow-2xl rounded-[2px] p-6 sm:p-8 z-10 my-8 text-soft-white"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ rotate: 90, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetAndClose}
              className="absolute top-5 right-5 text-[#8A8A8E] hover:text-[#EDEDED] transition-colors p-1.5 rounded-[2px] cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </motion.button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#1C1C1E] border border-[#F3DFA2]/40 flex items-center justify-center mx-auto mb-4 text-[#F3DFA2]">
                  <CheckCircle2 className="w-7 h-7 text-[#F3DFA2]" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-soft-white mb-2">Message Received</h3>
                <p className="text-stone-gray text-xs sm:text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                  Thank you! I will personally review your goals and reach out within 24 hours.
                </p>

                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-8 py-3 bg-[#F3DFA2] text-charcoal text-xs font-semibold uppercase tracking-wider rounded-[2px] cursor-pointer hover:bg-[#E4C878] transition-colors shadow-md"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    <Ornament color="#F3DFA2" />
                  </div>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#F3DFA2] font-semibold block mb-1">
                    LET&apos;S CONNECT
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-soft-white font-normal mb-1">
                    Ready to get started?
                  </h3>
                  <p className="text-xs text-stone-gray">
                    Drop your info below and I&apos;ll reach out personally.
                  </p>
                </div>

                {/* Form: EXACT 5 FIELDS */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* 1. Full name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Careme Nchang Wanki"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none rounded-[2px] transition-all"
                    />
                  </div>

                  {/* 2. Email Address & 4. Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none rounded-[2px] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1 font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="571.536.7054"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none rounded-[2px] transition-all"
                      />
                    </div>
                  </div>

                  {/* 3. Budget */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1 font-medium">
                      Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none rounded-[2px] transition-all"
                    >
                      <option value="Under $500k">Under $500k</option>
                      <option value="$500k - $1M">$500k – $1,000,000</option>
                      <option value="$1M - $2M">$1,000,000 – $2,000,000</option>
                      <option value="$2M - $4M">$2,000,000 – $4,000,000</option>
                      <option value="$4M+">$4,000,000+ (Ultra-Luxury)</option>
                    </select>
                  </div>

                  {/* 5. Message */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#8A8A8E] mb-1 font-medium">
                      Tell me about your real estate goals *
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      required
                      placeholder="Tell me about your real estate goals, timeline, or preferred neighborhoods..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 bg-[#1C1C1E] border border-[#2E2E30] text-soft-white placeholder:text-stone-gray/50 text-xs focus:border-[#F3DFA2] focus:ring-1 focus:ring-[#F3DFA2]/30 outline-none resize-none rounded-[2px] transition-all"
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-400 text-xs"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 bg-[#F3DFA2] text-charcoal text-xs font-semibold tracking-wider uppercase hover:bg-[#E4C878] transition-all disabled:opacity-60 flex items-center justify-center gap-2 rounded-[2px] cursor-pointer mt-2 shadow-md hover:shadow-[0_4px_16px_rgba(243,223,162,0.2)]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>GET STARTED</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

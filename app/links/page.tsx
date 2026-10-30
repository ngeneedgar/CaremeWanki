"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  CalendarCheck,
  MessageSquare,
  Home,
  Star,
  Instagram,
  Music2,
  Copy,
  Check,
  ArrowUpRight,
  Send,
} from "lucide-react";
import ConnectModal from "@/components/ConnectModal";

const PRETYPED_SMS_MESSAGE =
  "Hey Careme! I’m thinking about buying or selling and wanted to connect. I’d love to hear what you think the best next step is!";

export default function LinksPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const universalSmsHref = `sms:+15715367054?&body=${encodeURIComponent(
    PRETYPED_SMS_MESSAGE
  )}`;

  const handleCopyMessage = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(PRETYPED_SMS_MESSAGE);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // ignore clipboard error
    }
  };

  const handleTextMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(PRETYPED_SMS_MESSAGE);
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const targetUrl = isIOS
      ? `sms:+15715367054&body=${encoded}`
      : `sms:+15715367054?body=${encoded}`;

    try {
      navigator.clipboard.writeText(PRETYPED_SMS_MESSAGE);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2200);
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      window.location.href = targetUrl;
    }
  };

  return (
    <main className="min-h-screen bg-charcoal flex flex-col items-center px-4 sm:px-6 py-12 sm:py-16">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Profile photo with gold ring */}
        <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[#F3DFA2] to-[#E4C878] mb-5 shadow-lg">
          <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-charcoal">
            <Image
              src="/images/profile-picture.jpg"
              alt="Careme Nchang Wanki"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl text-soft-white mb-1.5 text-center">
          Careme Nchang Wanki
        </h1>
        <p className="text-xs text-stone-gray text-center tracking-wide mb-8">
          Real Estate Advisor · DC, MD &amp; VA · ONE Street / Samson Properties
        </p>

        {/* Link buttons stack */}
        <div className="flex flex-col gap-3.5 w-full">
          {/* 1. Official Website (FIRST as requested) */}
          <Link
            href="/"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#F3DFA2] bg-[#F3DFA2]/15 text-[#F3DFA2] font-medium text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:bg-[#F3DFA2]/25 active:scale-[0.99] shadow-[0_2px_14px_rgba(243,223,162,0.12)]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#F3DFA2]/20 flex items-center justify-center shrink-0">
                <Globe size={17} className="text-[#F3DFA2]" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Official Website
                </span>
                <span className="block text-[11px] text-stone-gray font-normal">
                  Careme Wanki Real Estate Advisory
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={16}
              className="text-[#F3DFA2] opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>

          {/* 2. Schedule a Consultation (Direct to Form) */}
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#F3DFA2]/40 bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99] text-left cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <CalendarCheck
                  size={16}
                  className="text-[#F3DFA2]"
                  strokeWidth={1.75}
                />
              </div>
              <div>
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Schedule a Consultation
                </span>
                <span className="block text-[11px] text-[#F3DFA2]/90 font-normal">
                  Direct consultation form &amp; meeting request
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#F3DFA2] bg-[#F3DFA2]/10 px-2 py-1 rounded-[2px] border border-[#F3DFA2]/20">
              Form
            </span>
          </button>

          {/* 3. Text Me Directly with Pre-typed Message */}
          <div className="flex flex-col w-full border border-[#2E2E30] hover:border-[#F3DFA2]/50 bg-[#242426] rounded-[3px] p-4 transition-all duration-200">
            <div className="flex items-center justify-between mb-2.5">
              <a
                href={universalSmsHref}
                onClick={handleTextMeClick}
                className="flex items-center gap-3 text-soft-white hover:text-[#F3DFA2] transition-colors group flex-1"
              >
                <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                  <MessageSquare
                    size={16}
                    className="text-[#F3DFA2]"
                    strokeWidth={1.75}
                  />
                </div>
                <div>
                  <span className="block font-medium text-sm text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                    Text Me Directly
                  </span>
                  <span className="block text-[11px] text-stone-gray font-mono tabular-nums">
                    571.536.7054
                  </span>
                </div>
              </a>

              <a
                href={universalSmsHref}
                onClick={handleTextMeClick}
                className="px-3 py-1.5 bg-[#F3DFA2] hover:bg-[#E4C878] text-charcoal text-xs font-semibold rounded-[2px] flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Text</span>
                <Send size={11} strokeWidth={2.2} />
              </a>
            </div>

            {/* Pre-typed SMS Message Bubble (Mirrors User's Attachment) */}
            <div className="mt-1 pt-2.5 border-t border-[#2E2E30]/70">
              <div className="flex items-center justify-between text-[10px] text-stone-gray uppercase tracking-wider mb-2 font-medium">
                <span>Pre-typed SMS Message</span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1 text-[#F3DFA2] hover:underline cursor-pointer"
                  title="Copy pre-typed text"
                >
                  {copiedMessage ? (
                    <>
                      <Check size={11} className="text-[#34C759]" />
                      <span className="text-[#34C759]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>Copy text</span>
                    </>
                  )}
                </button>
              </div>

              {/* iOS iMessage Style Bubble */}
              <a
                href={universalSmsHref}
                onClick={handleTextMeClick}
                className="block bg-[#1C1C1E] hover:bg-[#1E1E22] border border-[#2E2E30] hover:border-[#F3DFA2]/40 rounded-2xl p-3.5 text-xs text-soft-white leading-relaxed transition-colors cursor-pointer group/bubble"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-soft-white/95 text-[13px] leading-snug font-sans">
                    &ldquo;Hey Careme! I’m thinking about buying or selling and
                    wanted to connect. I’d love to hear what you think the best
                    next step is!&rdquo;
                  </p>
                  <div className="w-5 h-5 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover/bubble:scale-110 transition-transform">
                    <Send size={10} className="translate-x-[0.5px]" />
                  </div>
                </div>
                <span className="block mt-2 text-[10px] text-[#F3DFA2] font-medium tracking-wide">
                  Tap to launch Messages with pre-filled text &rarr;
                </span>
              </a>
            </div>
          </div>

          {/* 4. Featured Properties */}
          <Link
            href="/listings"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <Home size={16} className="text-[#F3DFA2]" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Featured DMV Listings
                </span>
                <span className="block text-[11px] text-stone-gray font-normal">
                  Bethesda &amp; McLean premier properties
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </Link>

          {/* 5. Zillow Reviews Profile */}
          <a
            href="https://zillow.com/reviews/write/?s=X1-ZUp9ga5xbh1czt_7galw"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <Star size={16} className="text-[#F3DFA2]" strokeWidth={1.75} />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Zillow Client Reviews
                </span>
                <span className="block text-[11px] text-stone-gray font-normal">
                  Read testimonials &amp; leave a review
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </a>

          {/* 6. Instagram */}
          <a
            href="https://www.instagram.com/careme_sells_realestate"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <Instagram
                  size={16}
                  className="text-[#F3DFA2]"
                  strokeWidth={1.75}
                />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Instagram
                </span>
                <span className="block text-[11px] text-stone-gray font-normal">
                  @careme_sells_realestate
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </a>

          {/* 7. TikTok */}
          <a
            href="https://www.tiktok.com/@careme_sells_realestate"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <Music2
                  size={16}
                  className="text-[#F3DFA2]"
                  strokeWidth={1.75}
                />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  TikTok
                </span>
                <span className="block text-[11px] text-stone-gray font-normal">
                  @careme_sells_realestate
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </a>
        </div>

        {/* Bottom footer: licenses + Samson Properties & ONE Street logos */}
        <div className="mt-12 flex flex-col items-center gap-3.5 text-center">
          <p className="text-[11px] text-stone-gray/70">
            Licensed in Maryland, Washington D.C., and Virginia
          </p>

          <div className="flex items-center gap-4 pt-1">
            <Image
              src="https://i.postimg.cc/MKS1DgPL/samson-logo.png"
              alt="Samson Properties"
              width={180}
              height={50}
              className="h-8 sm:h-9 w-auto object-contain brightness-105 contrast-105"
              style={{
                imageRendering: "-webkit-optimize-contrast",
              }}
              referrerPolicy="no-referrer"
            />
            <div className="h-7 w-px bg-white/20" aria-hidden="true" />
            <Image
              src="https://i.postimg.cc/7PFHVjKB/one-street-white-logo.png"
              alt="ONE Street"
              width={220}
              height={56}
              className="h-9 sm:h-10 w-auto object-contain brightness-110"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Direct Consultation Form Modal */}
      <ConnectModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}

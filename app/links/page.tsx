"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  CalendarCheck,
  MessageSquare,
  Instagram,
  Music2,
  ArrowUpRight,
} from "lucide-react";

const PRETYPED_SMS_MESSAGE =
  "Hey Careme! I’m thinking about buying or selling and wanted to connect. I’d love to hear what you think the best next step is!";

export default function LinksPage() {
  const universalSmsHref = `sms:+15715367054?&body=${encodeURIComponent(
    PRETYPED_SMS_MESSAGE
  )}`;

  const handleTextMeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const encoded = encodeURIComponent(PRETYPED_SMS_MESSAGE);
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const targetUrl = isIOS
      ? `sms:+15715367054&body=${encoded}`
      : `sms:+15715367054?body=${encoded}`;

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
          {/* 1. Official Website */}
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
          <Link
            href="/contact#consultation"
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99] text-left"
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
                <span className="block text-[11px] text-stone-gray font-normal">
                  Direct consultation form &amp; meeting request
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </Link>

          {/* 3. Text Me Directly (Message pre-typed only when client taps text) */}
          <a
            href={universalSmsHref}
            onClick={handleTextMeClick}
            className="group flex items-center justify-between w-full px-5 py-4 border border-[#2E2E30] bg-[#242426] text-soft-white text-sm tracking-wide rounded-[3px] transition-all duration-200 hover:border-[#F3DFA2] hover:bg-[#2A2A2D] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-[#1C1C1E] border border-[#2E2E30] flex items-center justify-center shrink-0 group-hover:border-[#F3DFA2]/40">
                <MessageSquare
                  size={16}
                  className="text-[#F3DFA2]"
                  strokeWidth={1.75}
                />
              </div>
              <div className="text-left">
                <span className="block font-medium text-soft-white group-hover:text-[#F3DFA2] transition-colors">
                  Text Me Directly
                </span>
                <span className="block text-[11px] text-stone-gray font-mono tabular-nums">
                  571.536.7054
                </span>
              </div>
            </div>
            <ArrowUpRight
              size={15}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </a>

          {/* 4. Instagram */}
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

          {/* 5. TikTok */}
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
    </main>
  );
}

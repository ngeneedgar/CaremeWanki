"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MessageSquare,
  Send,
  Phone,
  Copy,
  Check,
  CalendarCheck,
  Globe,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import ConnectModal from "@/components/ConnectModal";

const PHONE_NUMBER = "571.536.7054";
const PHONE_RAW = "+15715367054";
const PRETYPED_MESSAGE =
  "Hey Careme! I’m thinking about buying or selling and wanted to connect. I’d love to hear what you think the best next step is!";

export default function TextBioPage() {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const encodedMessage = encodeURIComponent(PRETYPED_MESSAGE);
  const universalSmsHref = `sms:${PHONE_RAW}?&body=${encodedMessage}`;

  // Automatically attempt opening the SMS app when navigating here from Instagram bio
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isIOS =
      /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const targetUrl = isIOS
      ? `sms:${PHONE_RAW}&body=${encodedMessage}`
      : `sms:${PHONE_RAW}?body=${encodedMessage}`;

    if (isMobile) {
      // Small timeout allows initial page render in Instagram in-app browser
      const timer = setTimeout(() => {
        window.location.href = targetUrl;
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [encodedMessage]);

  const handleLaunchSms = (e: React.MouseEvent) => {
    e.preventDefault();
    const isIOS =
      typeof navigator !== "undefined" &&
      /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent);
    const targetUrl = isIOS
      ? `sms:${PHONE_RAW}&body=${encodedMessage}`
      : `sms:${PHONE_RAW}?body=${encodedMessage}`;

    try {
      navigator.clipboard.writeText(PRETYPED_MESSAGE);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      // ignore
    }

    if (typeof window !== "undefined") {
      window.location.href = targetUrl;
    }
  };

  const handleCopyTextOnly = async () => {
    try {
      await navigator.clipboard.writeText(PRETYPED_MESSAGE);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } catch {
      // ignore
    }
  };

  const handleCopyBioLink = async () => {
    try {
      const link =
        typeof window !== "undefined"
          ? `${window.location.origin}/text`
          : "https://caremewanki.com/text";
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 text-soft-white">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Profile photo */}
        <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[#F3DFA2] to-[#E4C878] mb-4 shadow-xl">
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

        {/* Title & Advisory info */}
        <h1 className="font-serif text-2xl sm:text-3xl text-soft-white mb-1 text-center font-normal">
          Careme Nchang Wanki
        </h1>
        <p className="text-xs text-stone-gray text-center tracking-wide mb-2">
          Real Estate Advisor · DC, MD &amp; VA
        </p>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1E] border border-[#2E2E30] text-[11px] text-[#F3DFA2] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
          <span>Direct SMS Line: {PHONE_NUMBER}</span>
        </div>

        {/* Primary Action Card */}
        <div className="w-full bg-[#242426] border border-[#F3DFA2]/40 rounded-xl p-5 shadow-2xl mb-6">
          <div className="text-center mb-4">
            <span className="text-[10px] uppercase font-semibold tracking-widest text-[#F3DFA2] block mb-1">
              Direct Text Message
            </span>
            <h2 className="text-lg font-serif text-soft-white">
              Connect With Careme
            </h2>
            <p className="text-xs text-stone-gray mt-1">
              Tap below to open your messaging app with a pre-filled message.
            </p>
          </div>

          {/* Primary CTA Button */}
          <a
            href={universalSmsHref}
            onClick={handleLaunchSms}
            className="flex items-center justify-center gap-3 w-full py-4 px-6 bg-gradient-to-r from-[#F3DFA2] to-[#E4C878] text-charcoal font-semibold text-sm tracking-wide rounded-lg shadow-lg hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer mb-4"
          >
            <MessageSquare size={18} strokeWidth={2.2} />
            <span>Open in Messages (SMS)</span>
            <Send size={15} strokeWidth={2.5} className="ml-0.5" />
          </a>

          {/* Pre-typed SMS Bubble Preview */}
          <div className="bg-[#1C1C1E] border border-[#2E2E30] rounded-xl p-4">
            <div className="flex items-center justify-between text-[11px] text-stone-gray mb-2.5">
              <span className="uppercase tracking-wider text-[10px] font-medium text-[#F3DFA2]">
                Pre-typed Message
              </span>
              <button
                type="button"
                onClick={handleCopyTextOnly}
                className="inline-flex items-center gap-1.5 text-xs text-[#F3DFA2] hover:underline cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check size={12} className="text-[#34C759]" />
                    <span className="text-[#34C759]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy text</span>
                  </>
                )}
              </button>
            </div>

            <a
              href={universalSmsHref}
              onClick={handleLaunchSms}
              className="block bg-[#242426] hover:bg-[#2A2A2E] border border-[#2E2E30] rounded-lg p-3.5 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-2.5">
                <p className="text-xs sm:text-[13px] leading-relaxed text-soft-white font-sans flex-1">
                  &ldquo;{PRETYPED_MESSAGE}&rdquo;
                </p>
                <div className="w-6 h-6 rounded-full bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 group-hover:scale-110 transition-transform">
                  <Send size={11} className="translate-x-[0.5px]" />
                </div>
              </div>
            </a>
          </div>

          {/* Copy Direct IG Bio Link Button */}
          <div className="mt-4 pt-3.5 border-t border-[#2E2E30]/70 flex items-center justify-between text-xs text-stone-gray">
            <span className="text-[11px]">Instagram Bio Link:</span>
            <button
              type="button"
              onClick={handleCopyBioLink}
              className="inline-flex items-center gap-1.5 text-[#F3DFA2] hover:underline cursor-pointer font-medium text-xs"
            >
              {copiedLink ? (
                <>
                  <Check size={13} className="text-[#34C759]" />
                  <span className="text-[#34C759]">Link Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy /text link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Navigation Options */}
        <div className="w-full space-y-2.5 mb-10">
          {/* Call option */}
          <a
            href={`tel:${PHONE_RAW}`}
            className="flex items-center justify-between w-full px-4 py-3 bg-[#1C1C1E] border border-[#2E2E30] hover:border-[#F3DFA2]/40 rounded-lg text-xs text-soft-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Phone size={15} className="text-[#F3DFA2]" />
              <span>Call Directly: {PHONE_NUMBER}</span>
            </div>
            <ArrowRight
              size={14}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </a>

          {/* Schedule Consultation Form */}
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="flex items-center justify-between w-full px-4 py-3 bg-[#1C1C1E] border border-[#2E2E30] hover:border-[#F3DFA2]/40 rounded-lg text-xs text-soft-white transition-all group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <CalendarCheck size={15} className="text-[#F3DFA2]" />
              <span>Schedule a Consultation (Form)</span>
            </div>
            <span className="text-[10px] uppercase font-semibold text-[#F3DFA2] bg-[#F3DFA2]/10 px-2 py-0.5 rounded border border-[#F3DFA2]/20">
              Form
            </span>
          </button>

          {/* Main Website */}
          <Link
            href="/"
            className="flex items-center justify-between w-full px-4 py-3 bg-[#1C1C1E] border border-[#2E2E30] hover:border-[#F3DFA2]/40 rounded-lg text-xs text-soft-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <Globe size={15} className="text-[#F3DFA2]" />
              <span>Visit Official Website</span>
            </div>
            <ExternalLink
              size={14}
              className="text-stone-gray group-hover:text-[#F3DFA2] transition-colors"
            />
          </Link>

          {/* All Links */}
          <Link
            href="/links"
            className="flex items-center justify-center gap-2 w-full pt-2 text-xs text-[#8A8A8E] hover:text-[#F3DFA2] transition-colors"
          >
            <span>View All Quick Links (Socials, Zillow, Listings) &rarr;</span>
          </Link>
        </div>

        {/* Brokerage & Licensing Badges */}
        <div className="flex flex-col items-center gap-3.5 text-center">
          <p className="text-[11px] text-stone-gray/70">
            Licensed in Maryland, Washington D.C., and Virginia
          </p>

          <div className="flex items-center gap-5 pt-1">
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

      {/* Consultation Modal */}
      <ConnectModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}

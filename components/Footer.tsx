'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Instagram, ExternalLink } from 'lucide-react';
import Logo from '@/components/Logo';
import Ornament from '@/components/ui/Ornament';
import SamsonLogo from '@/components/ui/SamsonLogo';

export default function Footer() {
  const pathname = usePathname();

  if (
    pathname === '/links' ||
    pathname?.startsWith('/links/') ||
    pathname === '/text' ||
    pathname?.startsWith('/text/')
  ) {
    return null;
  }

  return (
    <footer className="bg-[#151516] border-t border-[#2E2E30] pt-20 pb-12 text-[#8A8A8E]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#2E2E30]">
          {/* Col 1: Brand & Monogram (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <Logo />
              </div>

              <h2 className="font-display text-2xl text-[#EDEDED] font-normal tracking-tight mb-3">
                Careme Nchang Wanki
              </h2>
              <p className="text-sm text-[#8A8A8E] leading-relaxed max-w-sm mb-6">
                Real estate advisory serving Washington D.C., Maryland, and Virginia. Strategic
                counsel, project management discipline, and people-first service.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://www.instagram.com/careme_sells_realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[4px] border border-[#2E2E30] flex items-center justify-center text-[#8A8A8E] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@careme_sells_realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-[4px] border border-[#2E2E30] flex items-center justify-center text-[#8A8A8E] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-colors"
                aria-label="TikTok"
              >
                <span className="text-xs font-mono font-semibold">TT</span>
              </a>
              <Link
                href="/links"
                className="text-xs tracking-wider uppercase px-3 py-2 border border-[#2E2E30] rounded-[4px] hover:text-[#F3DFA2] hover:border-[#F3DFA2] transition-colors"
              >
                Quick Links (/links)
              </Link>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-medium mb-5">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#about" className="hover:text-[#EDEDED] transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-[#EDEDED] transition-colors">
                  Client Services
                </Link>
              </li>
              <li>
                <Link href="/#areas" className="hover:text-[#EDEDED] transition-colors">
                  Service Areas (DMV)
                </Link>
              </li>
              <li>
                <Link href="/#resources" className="hover:text-[#EDEDED] transition-colors">
                  Trusted Specialist Network
                </Link>
              </li>
              <li>
                <Link href="/listings" className="hover:text-[#EDEDED] transition-colors">
                  Featured Properties & Calculator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#EDEDED] transition-colors">
                  Contact Careme
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact & Office (4 cols) */}
          <div className="lg:col-span-4">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#F3DFA2] font-medium mb-5">
              Direct Contact
            </h3>
            <div className="space-y-3.5 text-sm">
              <a
                href="tel:5715367054"
                className="flex items-center gap-3 hover:text-[#EDEDED] transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#F3DFA2] shrink-0" strokeWidth={1.5} />
                <span className="tabular-nums">571.536.7054</span>
              </a>
              <a
                href="mailto:Careme@onestreet.one"
                className="flex items-center gap-3 hover:text-[#EDEDED] transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#F3DFA2] shrink-0" strokeWidth={1.5} />
                <span>Careme@onestreet.one</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#F3DFA2] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>5021 Wilson Ln, Bethesda, MD 20814</span>
              </div>
            </div>

            {/* Quick Action */}
            <div className="mt-6 pt-5 border-t border-[#2E2E30]/60">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#F3DFA2] hover:text-[#E4C878] transition-colors"
              >
                <span>Send an Inquiry</span>
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Legal, Licensure & Compliance Block */}
        <div className="pt-8 text-xs leading-relaxed space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* License numbers ONCE */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#8A8A8E]">
              <span>
                <strong className="text-[#EDEDED] font-medium">Licensed in DC:</strong>{' '}
                <span className="tabular-nums font-mono">SP40004843</span>
              </span>
              <span className="text-[#2E2E30]">·</span>
              <span>
                <strong className="text-[#EDEDED] font-medium">MD:</strong>{' '}
                <span className="tabular-nums font-mono">5024731</span>
              </span>
              <span className="text-[#2E2E30]">·</span>
              <span>
                <strong className="text-[#EDEDED] font-medium">Virginia</strong>
              </span>
            </div>

            {/* Badges: GCAAR & Bright MLS */}
            <div className="flex items-center gap-3 text-[11px] tracking-wider uppercase text-[#8A8A8E]">
              <span>GCAAR</span>
              <span>·</span>
              <span>Bright MLS</span>
            </div>
          </div>

          <p className="text-[11px] text-[#8A8A8E]/80">
            All information provided is deemed reliable but is not guaranteed accurate and should be
            independently verified. Properties are subject to prior sale, change, or withdrawal.
            Neither listing broker(s) nor Samson Properties shall be responsible for any
            typographical errors, misinformation, or misprints and shall be held totally harmless.
          </p>

          <div className="py-4 flex justify-center">
            <Ornament color="#F3DFA2" />
          </div>

          {/* Bottom Bar: Samson Properties logo and ONE Street logo on the LEFT side, copyright on the right */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 border-t border-[#2E2E30]/40 pt-6 text-[11px]">
            {/* Samson Properties & ONE Street on the LEFT */}
            <div className="flex items-center gap-4 sm:gap-6">
              <SamsonLogo className="h-7 sm:h-8 w-auto" />
              <div className="h-7 w-px bg-[#2E2E30]" aria-hidden="true" />
              <Image
                src="https://i.postimg.cc/7PFHVjKB/one-street-white-logo.png"
                alt="ONE Street"
                width={220}
                height={56}
                className="h-9 sm:h-10 md:h-11 w-auto object-contain brightness-110"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Copyright on the RIGHT */}
            <p className="text-[#8A8A8E]">© {new Date().getFullYear()} Careme Nchang Wanki. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

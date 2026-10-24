'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import NavLink from '@/components/NavLink';

import Logo from '@/components/Logo';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname === '/links' || pathname?.startsWith('/links/')) {
    return null;
  }

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Areas', href: '/#areas' },
    { label: 'Resources', href: '/#resources' },
    { label: 'Listings', href: '/listings' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#1C1C1E]/95 backdrop-blur-md border-b border-[#2E2E30] py-3.5 shadow-sm'
          : 'bg-[#1C1C1E]/80 backdrop-blur-sm border-b border-[#2E2E30]/60 py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Logo Lockup */}
        <Link
          href="/"
          className="group transition-opacity duration-200 hover:opacity-90 shrink-0"
        >
          <Logo />
        </Link>

        {/* Zone 2: Navigation Links (Desktop) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium"
        >
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Mobile Toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/contact#schedule"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors duration-200 whitespace-nowrap"
          >
            Schedule a Consultation
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#EDEDED] hover:text-[#F3DFA2] transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F3DFA2]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#1C1C1E] border-b border-[#2E2E30] px-6 py-8 shadow-2xl transition-all">
          <nav className="flex flex-col gap-5 text-base">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#EDEDED] hover:text-[#F3DFA2] py-2 border-b border-[#2E2E30]/40 flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A8A8E]" strokeWidth={1.5} />
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/contact#schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 text-xs font-semibold tracking-wider uppercase text-[#1C1C1E] bg-[#F3DFA2] hover:bg-[#E4C878] rounded-[4px] transition-colors"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/links"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 text-xs font-medium tracking-wide text-[#8A8A8E] hover:text-[#EDEDED] transition-colors border border-[#2E2E30] rounded-[4px]"
              >
                Link.me Bio Hub
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

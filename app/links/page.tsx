import Image from "next/image";
import Link from "next/link";
import { Home, CalendarCheck, Mail, Instagram, Linkedin, Globe, Music2 } from "lucide-react";

const links = [
  { label: "Search Homes on Zillow", href: "https://www.zillow.com", icon: Home, external: true },
  { label: "Schedule a Consultation", href: "/contact", icon: CalendarCheck, external: false },
  { label: "Contact Me Directly", href: "mailto:Careme@onestreet.one", icon: Mail, external: true },
  { label: "Instagram (@careme_sells_realestate)", href: "https://www.instagram.com/careme_sells_realestate", icon: Instagram, external: true },
  { label: "TikTok (@careme_sells_realestate)", href: "https://www.tiktok.com/@careme_sells_realestate", icon: Music2, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: Linkedin, external: true },
  { label: "Main Website", href: "/", icon: Globe, external: false },
];

export const metadata = {
  title: "Careme Nchang Wanki | Links",
  description: "Connect with Careme Nchang Wanki — Real Estate Advisor serving DC, Maryland, and Virginia.",
};

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-charcoal flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Profile photo with butter-yellow ring */}
        <div className="relative w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-[#F3DFA2] to-[#E4C878] mb-5">
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

        <h1 className="font-serif text-2xl text-soft-white mb-1.5 text-center">
          Careme Nchang Wanki
        </h1>
        <p className="text-xs text-stone-gray text-center tracking-wide mb-8">
          Real Estate Advisor · DC, MD & VA
        </p>

        {/* Link buttons */}
        <div className="flex flex-col gap-3 w-full">
          {links.map((link) => {
            const Icon = link.icon;
            const content = (
              <div className="flex items-center justify-center gap-3 w-full px-6 py-4 border border-[#F3DFA2]/30 text-soft-white text-sm tracking-wide transition-all duration-200 active:scale-[0.98] hover:border-[#F3DFA2] hover:bg-[#F3DFA2]/5 rounded-[2px]">
                <Icon size={16} className="text-[#F3DFA2]" strokeWidth={1.5} />
                <span>{link.label}</span>
              </div>
            );

            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block"
              >
                {content}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="w-full block">
                {content}
              </Link>
            );
          })}
        </div>

        {/* Bottom footer for links: licenses + small Samson Properties logo */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] text-stone-gray/70">
            Licensed in Maryland, Washington D.C., and Virginia
          </p>

          <div className="flex items-center gap-2 opacity-75">
            <Image
              src="/images/samson-logo.png"
              alt="Samson Properties"
              width={16}
              height={16}
              className="h-4 w-auto object-contain brightness-90"
            />
            <span className="text-[11px] text-stone-gray font-medium">Samson Properties</span>
          </div>
        </div>
      </div>
    </main>
  );
}

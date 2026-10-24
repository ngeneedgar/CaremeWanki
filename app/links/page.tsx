import Image from "next/image";
import Link from "next/link";
import { Home, CalendarCheck, Mail, Instagram, Linkedin, Globe, Music2 } from "lucide-react";

const links = [
  { label: "Search Homes on Zillow", href: "#", icon: Home, external: true },
  { label: "Schedule a Consultation", href: "/contact", icon: CalendarCheck, external: false },
  { label: "Contact Me Directly", href: "mailto:Careme@onestreet.one", icon: Mail, external: true },
  { label: "Instagram (@careme_sells_realestate)", href: "https://www.instagram.com/careme_sells_realestate", icon: Instagram, external: true },
  { label: "TikTok (@careme_sells_realestate)", href: "https://www.tiktok.com/@careme_sells_realestate", icon: Music2, external: true },
  { label: "LinkedIn", href: "#", icon: Linkedin, external: true },
  { label: "Main Website", href: "/", icon: Globe, external: false },
];

export const metadata = {
  title: "Careme Wanki | Links",
  description: "Connect with Careme Wanki — Realtor serving DC, Maryland, and Northern Virginia.",
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
              alt="Careme Wanki"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-2xl text-soft-white mb-1">
          Careme Wanki
        </h1>
        <p className="text-xs text-stone-gray text-center tracking-wide mb-1">
          The ONE Street Company
        </p>
        <p className="text-[11px] text-stone-gray text-center tracking-wide mb-8">
          Brokered by Samson Properties
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

        <p className="text-[10px] text-stone-gray/60 mt-10 text-center">
          Licensed in DC &amp; Maryland · Virginia Pending
        </p>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Instagram, Globe, Music2, MessageSquare } from "lucide-react";

const links = [
  {
    label: "Text Me Directly (571.536.7054)",
    href: "sms:+15715367054",
    icon: MessageSquare,
    external: true,
    highlight: true,
  },
  {
    label: "Schedule a Consultation",
    href: "/contact",
    icon: CalendarCheck,
    external: false,
  },
  {
    label: "Instagram (@careme_sells_realestate)",
    href: "https://www.instagram.com/careme_sells_realestate",
    icon: Instagram,
    external: true,
  },
  {
    label: "TikTok (@careme_sells_realestate)",
    href: "https://www.tiktok.com/@careme_sells_realestate",
    icon: Music2,
    external: true,
  },
  {
    label: "Main Website",
    href: "/",
    icon: Globe,
    external: false,
  },
];

export const metadata = {
  title: "Careme Nchang Wanki | Links",
  description: "Connect with Careme Nchang Wanki — Real Estate Advisor serving DC, Maryland, and Virginia.",
};

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-charcoal flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Profile photo with gold ring */}
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
              <div
                className={`flex items-center justify-center gap-3 w-full px-6 py-4 border text-sm tracking-wide transition-all duration-200 active:scale-[0.98] rounded-[2px] ${
                  link.highlight
                    ? "border-[#F3DFA2] bg-[#F3DFA2]/15 text-[#F3DFA2] font-medium shadow-[0_2px_12px_rgba(243,223,162,0.15)] hover:bg-[#F3DFA2]/25"
                    : "border-[#F3DFA2]/30 text-soft-white hover:border-[#F3DFA2] hover:bg-[#F3DFA2]/5"
                }`}
              >
                <Icon size={16} className="text-[#F3DFA2]" strokeWidth={1.5} />
                <span>{link.label}</span>
              </div>
            );

            return link.external ? (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("sms:") ? undefined : "_blank"}
                rel={link.href.startsWith("sms:") ? undefined : "noopener noreferrer"}
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

        {/* Bottom footer for links: licenses + sharp Samson Properties & ONE Street logos */}
        <div className="mt-12 flex flex-col items-center gap-3 text-center">
          <p className="text-[11px] text-stone-gray/70">
            Licensed in Maryland, Washington D.C., and Virginia
          </p>

          <div className="flex items-center gap-4 pt-1">
            <Image
              src="https://i.postimg.cc/MKS1DgPL/samson-logo.png"
              alt="Samson Properties"
              width={160}
              height={44}
              className="h-7 sm:h-8 w-auto object-contain brightness-105 contrast-105"
              style={{
                imageRendering: "-webkit-optimize-contrast",
              }}
              referrerPolicy="no-referrer"
            />
            <div className="h-5 w-px bg-white/20" aria-hidden="true" />
            <Image
              src="https://i.postimg.cc/7PFHVjKB/one-street-white-logo.png"
              alt="ONE Street"
              width={160}
              height={44}
              className="h-6 sm:h-7 w-auto object-contain brightness-105"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

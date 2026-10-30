import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careme Nchang Wanki | Quick Links & Connect',
  description:
    'Connect directly with Careme Nchang Wanki — Real Estate Advisor serving Washington D.C., Maryland, and Virginia.',
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-charcoal">{children}</div>;
}


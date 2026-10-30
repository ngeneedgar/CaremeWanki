import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Careme Directly | Careme Nchang Wanki',
  description:
    'Connect directly with Careme Nchang Wanki via text message at 571.536.7054 for real estate guidance across Washington D.C., Maryland, and Virginia.',
};

export default function TextLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-charcoal">{children}</div>;
}

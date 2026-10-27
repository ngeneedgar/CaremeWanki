import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MouseAnchor from '@/components/ui/MouseAnchor';
import AutoContactPopup from '@/components/AutoContactPopup';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Careme Nchang Wanki | Real Estate Advisor | DC, MD & VA',
  description:
    'Careme Nchang Wanki is a real estate advisor serving Washington D.C., Maryland, and Virginia. Affiliated with Samson Properties.',
  metadataBase: new URL(process.env.APP_URL || 'https://caremewanki.com'),
  openGraph: {
    title: 'Careme Nchang Wanki | Real Estate Advisor | DC, MD & VA',
    description:
      'Careme Nchang Wanki is a real estate advisor serving Washington D.C., Maryland, and Virginia. Affiliated with Samson Properties.',
    type: 'website',
    images: ['/images/profile-picture.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careme Nchang Wanki | Real Estate Advisor | DC, MD & VA',
    description:
      'Careme Nchang Wanki is a real estate advisor serving Washington D.C., Maryland, and Virginia. Affiliated with Samson Properties.',
    images: ['/images/profile-picture.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Careme Nchang Wanki',
              worksFor: {
                '@type': 'Organization',
                name: 'Samson Properties',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '5021 Wilson Ln',
                  addressLocality: 'Bethesda',
                  addressRegion: 'MD',
                  postalCode: '20814',
                },
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '5021 Wilson Ln',
                addressLocality: 'Bethesda',
                addressRegion: 'MD',
                postalCode: '20814',
              },
              telephone: '+1-571-536-7054',
              email: 'Careme@onestreet.one',
              areaServed: ['Washington D.C.', 'Maryland', 'Virginia'],
              hasCredential: ['DC SP40004843', 'MD 5024731', 'Virginia'],
            }),
          }}
        />
      </head>
      <body className="bg-charcoal text-soft-white antialiased min-h-screen selection:bg-[#F3DFA2] selection:text-[#1C1C1E]" suppressHydrationWarning>
        <MouseAnchor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <AutoContactPopup />
      </body>
    </html>
  );
}

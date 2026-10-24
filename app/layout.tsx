import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MouseAnchor from '@/components/ui/MouseAnchor';

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
  title: 'Careme Wanki | Realtor — DC, Maryland & Northern Virginia',
  description:
    'Careme Wanki is a real estate professional serving Washington D.C., Maryland, and Northern Virginia. The ONE Street Company · Brokered by Samson Properties.',
  metadataBase: new URL(process.env.APP_URL || 'https://caremewanki.com'),
  openGraph: {
    title: 'Careme Wanki | Realtor — DC, Maryland & Northern Virginia',
    description:
      'Careme Wanki is a real estate professional serving Washington D.C., Maryland, and Northern Virginia. The ONE Street Company · Brokered by Samson Properties.',
    type: 'website',
    images: ['/images/profile-picture.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careme Wanki | Realtor — DC, Maryland & Northern Virginia',
    description:
      'Careme Wanki is a real estate professional serving Washington D.C., Maryland, and Northern Virginia.',
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
              name: 'Careme Wanki',
              worksFor: {
                '@type': 'Organization',
                name: 'The ONE Street Company · Samson Properties',
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
              areaServed: ['Washington D.C.', 'Maryland', 'Northern Virginia'],
            }),
          }}
        />
      </head>
      <body className="bg-charcoal text-soft-white antialiased min-h-screen selection:bg-[#F3DFA2] selection:text-[#1C1C1E]" suppressHydrationWarning>
        <MouseAnchor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';
import CommandSearchModal from '@/components/layout/CommandSearchModal';
import CompareTrayModal from '@/components/layout/CompareTrayModal';
import GlobalWidgets from '@/components/layout/GlobalWidgets';
import { BRAND_CONFIG } from '@/lib/brand';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.description,
  manifest: '/manifest.json',
  openGraph: {
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: BRAND_CONFIG.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    name: BRAND_CONFIG.name,
    description: BRAND_CONFIG.description,
    telephone: BRAND_CONFIG.contact.hotlineBd,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BRAND_CONFIG.contact.address,
    },
    openingHours: 'Mo-Su 05:00-23:30',
  };

  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-obsidian text-bone antialiased selection:bg-volt selection:text-obsidian">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain-overlay" />
        <Navbar />
        <CartDrawer />
        <CommandSearchModal />
        <CompareTrayModal />
        <GlobalWidgets />
        <main className="pt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

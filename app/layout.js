import './globals.css';
import Script from 'next/script';
import { Lato } from 'next/font/google';
import { structuredData } from './structuredData';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata = {
  metadataBase: new URL('https://www.neo-heidelberg.de'),
  title: 'NEO \u2014 Bar & Restaurant Heidelberg | Dry-Aged \u00b7 Sushi \u00b7 Bar',
  description:
    'Seit 2016 in der Bahnstadt: Dry-Aged aus dem Humidor, Californisches Sushi, eigene Bar. NEO Heidelberg \u2014 Feed your soul.',
  keywords: [
    'Neo Heidelberg', 'Restaurant Heidelberg', 'Bar Heidelberg', 'Dry Aged Steak',
    'Sushi Heidelberg', 'Hochzeit Heidelberg', 'Bahnstadt Restaurant', 'Zollhofgarten',
  ],
  authors: [{ name: 'NEO Bar & Restaurant Heidelberg' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.neo-heidelberg.de/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/',
    title: 'NEO \u2014 Bar & Restaurant Heidelberg',
    description: 'Seit 2016 in der Bahnstadt. Dry-Aged, Californisches Sushi, eigene Bar. Feed your soul.',
    images: [{ url: 'https://www.neo-heidelberg.de/wp-content/uploads/L1170568.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEO \u2014 Bar & Restaurant Heidelberg',
    description: 'Dry-Aged \u00b7 Sushi \u00b7 Bar \u00b7 Feed your soul.',
    images: ['https://www.neo-heidelberg.de/wp-content/uploads/L1170568.jpg'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080a0c',
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={lato.variable}>
      <head>
        <link rel="preload" as="image" href="/bg/hero.webp" fetchPriority="high" />
      </head>
      <body>
        {structuredData.map((json, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
        ))}
        {children}
        <Script defer data-domain="neo-heidelberg.de" src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

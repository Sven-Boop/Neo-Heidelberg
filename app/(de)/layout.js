import { Grundgeruest, VIEWPORT } from '../Grundgeruest';

const TITEL = 'NEO Heidelberg · Dry-Aged-Steaks, Sushi & Bar am Hauptbahnhof';
const TEXT =
  'Bar & Restaurant in der Heidelberger Bahnstadt am Hauptbahnhof: Dry-Aged-Steaks aus eigenem Humidor, handgerolltes Sushi, Bar und Garten. Feiern bis 199 Gäste.';

export const metadata = {
  metadataBase: new URL('https://www.neo-heidelberg.de'),
  title: TITEL,
  description: TEXT,
  keywords: [
    'Neo Heidelberg', 'Restaurant Heidelberg', 'Steakhaus Heidelberg', 'Dry Aged Steak Heidelberg',
    'Sushi Heidelberg', 'Restaurant Hauptbahnhof Heidelberg', 'Bar Heidelberg', 'Hochzeit Heidelberg',
    'Bahnstadt Restaurant', 'Zollhofgarten',
  ],
  authors: [{ name: 'NEO Bar & Restaurant Heidelberg' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.neo-heidelberg.de/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/',
    title: TITEL,
    description: TEXT,
    images: [{ url: 'https://www.neo-heidelberg.de/img/og-neo.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITEL,
    description: TEXT,
    images: ['https://www.neo-heidelberg.de/img/og-neo.jpg'],
  },
};

export const viewport = VIEWPORT;

export default function RootLayout({ children }) {
  return <Grundgeruest lang="de">{children}</Grundgeruest>;
}

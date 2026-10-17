import { Grundgeruest, VIEWPORT } from '../Grundgeruest';

// Englische Seiten (/en, /en/menu, /en/impressum, /en/datenschutz): eigenes
// Root-Layout, damit schon das Server-HTML lang="en" trägt.
const TITLE = 'NEO Heidelberg · Dry-Aged Steaks, Sushi & Bar at Main Station';
const TEXT =
  "Bar & restaurant in Heidelberg's Bahnstadt by the main station: dry-aged steaks from our humidor, hand-rolled sushi, bar and garden. Parties up to 199 guests.";

export const metadata = {
  metadataBase: new URL('https://www.neo-heidelberg.de'),
  title: TITLE,
  description: TEXT,
  authors: [{ name: 'NEO Bar & Restaurant Heidelberg' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/en',
    title: TITLE,
    description: TEXT,
    images: [{ url: 'https://www.neo-heidelberg.de/img/og-neo.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: TEXT,
    images: ['https://www.neo-heidelberg.de/img/og-neo.jpg'],
  },
};

export const viewport = VIEWPORT;

export default function RootLayoutEn({ children }) {
  return <Grundgeruest lang="en">{children}</Grundgeruest>;
}

import { speisekarteHtml } from '../../seitenTeile';
import { brotkrumenLd } from '../../anlassSeiten';
import SiteScripts from '../../SiteScripts';

const URL = 'https://www.neo-heidelberg.de/speisekarte';
const TITEL = 'Speisekarte — NEO Bar & Restaurant Heidelberg';
const TEXT =
  'Die Speisekarte des NEO in der Bahnstadt: Dry-Aged aus dem Humidor, Filets, Californisches Sushi, Rolls, Bowls und Desserts — mit Preisen.';

export const metadata = {
  title: TITEL,
  description: TEXT,
  alternates: {
    canonical: URL,
    languages: { 'de-DE': URL, en: 'https://www.neo-heidelberg.de/menu' },
  },
  twitter: { card: 'summary_large_image', title: TITEL, description: TEXT, images: ['https://www.neo-heidelberg.de/img/og-neo.jpg'] },
  openGraph: { type: 'website', locale: 'de_DE', siteName: 'NEO Bar & Restaurant', url: URL, title: TITEL, description: TEXT, images: [{ url: 'https://www.neo-heidelberg.de/img/og-neo.jpg', width: 1200, height: 630 }] },
};

// Eigenes JSON-LD der Speisekarte: die Karte mit ihren Kapiteln (wie die Überschriften der Seite), Brotkrumen
const KAPITEL = [
  'Sharing Menu', 'Starter & Appetizer', 'Sushi & More', 'Sushi Rolls', 'Maki & Mehr', 'Bowls',
  'Main Course', 'Beef & Filet', 'Sides & Saucen', 'Sweets & Desserts',
];
const ld = [
  {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${URL}#karte`,
    name: 'Speisekarte NEO Bar & Restaurant Heidelberg',
    url: URL,
    inLanguage: 'de',
    hasMenuSection: KAPITEL.map((name) => ({ '@type': 'MenuSection', name })),
  },
  brotkrumenLd('Speisekarte', '/speisekarte'),
].map((o) => JSON.stringify(o));

export default function Speisekarte() {
  return (
    <>
      {ld.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: speisekarteHtml }} />
      <SiteScripts />
    </>
  );
}

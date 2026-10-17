import { hochzeitHtml } from '../../seitenTeile';
import { brotkrumenLd, veranstaltungsortLd } from '../../anlassSeiten';
import SiteScripts from '../../SiteScripts';

const URL = 'https://www.neo-heidelberg.de/hochzeit';
const TITEL = 'Hochzeitslocation Heidelberg · Hochzeit im NEO';
const TEXT =
  'Heiraten im NEO Heidelberg: bis 199 Gäste in Restaurant, Bar, Terrasse und Garten, freie Trauung im Garten (Mai bis September), Hochzeitsmenü ab 52 € p. P.';

export const metadata = {
  title: TITEL,
  description: TEXT,
  alternates: { canonical: URL },
  twitter: { card: 'summary_large_image', title: TITEL, description: TEXT, images: ['https://www.neo-heidelberg.de/img/og-neo.jpg'] },
  openGraph: { type: 'website', locale: 'de_DE', siteName: 'NEO Bar & Restaurant', url: URL, title: TITEL, description: TEXT, images: [{ url: 'https://www.neo-heidelberg.de/img/og-neo.jpg', width: 1200, height: 630 }] },
};

// Eigenes JSON-LD der Hochzeitsseite: Ort, Leistung mit dem öffentlichen Menüpreis, Brotkrumen
const ld = [
  veranstaltungsortLd({
    url: URL,
    name: 'NEO Bar & Restaurant · Hochzeitslocation Heidelberg',
    beschreibung:
      'Hochzeitslocation in der Heidelberger Bahnstadt: Halle im ehemaligen Güterbahnhof mit Restaurant, Bar, Terrasse und Garten. Freie Trauung im Garten (Mai bis September), bis 199 Gäste.',
    bilder: ['/gallery/neo-interior.webp', '/img/L1170568.webp', '/img/gallery/garten-abend.webp'],
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Hochzeitslocation',
    name: 'Hochzeiten im NEO Heidelberg',
    description:
      'Hochzeiten im NEO Bar & Restaurant Heidelberg: bis 199 Gäste in Restaurant, Bar, Terrasse und Garten. Freie Trauung im Garten von Mai bis September. Küche, Bar und DJ aus dem Haus.',
    provider: { '@id': 'https://www.neo-heidelberg.de/#restaurant' },
    areaServed: { '@type': 'City', name: 'Heidelberg' },
    url: URL,
    offers: {
      '@type': 'Offer',
      name: 'Hochzeitsmenü, drei Gänge',
      priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: 52, priceCurrency: 'EUR', unitText: 'pro Person' },
    },
  },
  brotkrumenLd('Hochzeit', '/hochzeit'),
].map((o) => JSON.stringify(o));

export default function Hochzeit() {
  return (
    <>
      {ld.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: hochzeitHtml }} />
      <SiteScripts />
    </>
  );
}

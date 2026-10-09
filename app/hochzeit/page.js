import { subpageHtml } from '../subpageHtml';
import SiteScripts from '../SiteScripts';

const URL = 'https://www.neo-heidelberg.de/hochzeit';
const TITEL = 'Hochzeit im NEO Heidelberg — Hochzeitslocation in der Bahnstadt';
const TEXT =
  'Eure Hochzeit im NEO: bis zu 199 Gäste in Restaurant und Bar, im Sommer mit Terrasse und Garten, im Winter mit Chalet. Trauung, Dinner, Tanz und Tombola aus einer Hand, Menü ab 52 € pro Person.';

export const metadata = {
  title: TITEL,
  description: TEXT,
  alternates: { canonical: URL },
  twitter: { card: 'summary_large_image', title: TITEL, description: TEXT, images: ['https://www.neo-heidelberg.de/img/og-image.jpg'] },
  openGraph: { type: 'website', locale: 'de_DE', siteName: 'NEO Bar & Restaurant', url: URL, title: TITEL, description: TEXT, images: [{ url: 'https://www.neo-heidelberg.de/img/og-image.jpg', width: 1200, height: 630 }] },
};

const html = subpageHtml('hochzeit');

export default function Hochzeit() {
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <SiteScripts />
    </>
  );
}

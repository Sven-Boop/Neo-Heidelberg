import { subpageHtml } from '../subpageHtml';
import SiteScripts from '../SiteScripts';

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
  twitter: { card: 'summary_large_image', title: TITEL, description: TEXT, images: ['https://www.neo-heidelberg.de/img/og-image.jpg'] },
  openGraph: { type: 'website', locale: 'de_DE', siteName: 'NEO Bar & Restaurant', url: URL, title: TITEL, description: TEXT, images: [{ url: 'https://www.neo-heidelberg.de/img/og-image.jpg', width: 1200, height: 630 }] },
};

const html = subpageHtml('speisekarte');

export default function Speisekarte() {
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <SiteScripts />
    </>
  );
}

import { bodyHtml } from './bodyHtmlEn';
import SiteScripts from '../SiteScripts';
import SetLang from '../SetLang';

export const metadata = {
  title: 'NEO — Bar & Restaurant Heidelberg | Dry-Aged · Sushi · Bar',
  description:
    'In the Bahnstadt since 2016: dry-aged from the humidor, Californian sushi, our own bar. NEO Heidelberg — Feed your soul.',
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/en',
    languages: {
      'de-DE': 'https://www.neo-heidelberg.de/',
      'en': 'https://www.neo-heidelberg.de/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/en',
    title: 'NEO — Bar & Restaurant Heidelberg',
    description: 'In the Bahnstadt since 2016. Dry-aged, Californian sushi, our own bar. Feed your soul.',
    images: [{ url: 'https://www.neo-heidelberg.de/img/og-image.jpg', width: 1200, height: 630 }],
  },
};

export default function HomeEN() {
  return (
    <>
      <SetLang lang="en" />
      <div id="app-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SiteScripts />
    </>
  );
}

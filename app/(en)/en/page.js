import { bodyHtml } from './bodyHtmlEn';
import SiteScripts from '../../SiteScripts';
import SetLang from '../../SetLang';
import { structuredDataEn } from '../../structuredData';
import { mitHaeuserLeiste } from '../../haeuser';
import { mitKarte, mitSharingTeaser } from '../../winterkarte/render';

// Fuß mit Häuser-Leiste über der Copyright-Zeile (app/haeuser.js), Winterkarte aus app/winterkarte
const html = mitKarte(mitSharingTeaser(mitHaeuserLeiste(bodyHtml, 'en'), 'en'), 'en');

export const metadata = {
  title: 'NEO Heidelberg · Dry-Aged Steaks, Sushi & Bar at Main Station',
  description:
    "Bar & restaurant in Heidelberg's Bahnstadt by the main station: dry-aged steaks from our humidor, hand-rolled sushi, bar and garden. Parties up to 199 guests.",
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/en',
    languages: {
      'de-DE': 'https://www.neo-heidelberg.de/',
      'en': 'https://www.neo-heidelberg.de/en',
      'x-default': 'https://www.neo-heidelberg.de/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/en',
    title: 'NEO Heidelberg · Dry-Aged Steaks, Sushi & Bar at Main Station',
    description: "Bar & restaurant in Heidelberg's Bahnstadt by the main station: dry-aged steaks from our humidor, hand-rolled sushi, bar and garden. Parties up to 199 guests.",
    images: [{ url: 'https://www.neo-heidelberg.de/img/og-neo.jpg', width: 1200, height: 630 }],
  },
};

export default function HomeEN() {
  return (
    <>
      <SetLang lang="en" />
      {structuredDataEn.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <SiteScripts />
    </>
  );
}

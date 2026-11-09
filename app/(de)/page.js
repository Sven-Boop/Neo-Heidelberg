import { startseiteHtml } from '../seitenTeile';
import SiteScripts from '../SiteScripts';
import { structuredData } from '../structuredData';
import { mitAdventStoerer } from '../adventskalender';

// Stündlich neu erzeugen: der Adventskalender-Störer verschwindet nach dem 24.12.2026 von selbst (app/adventskalender.js).
export const revalidate = 3600;

export const metadata = {
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/',
    languages: {
      'de-DE': 'https://www.neo-heidelberg.de/',
      'en': 'https://www.neo-heidelberg.de/en',
      'x-default': 'https://www.neo-heidelberg.de/',
    },
  },
};

export default function Home() {
  return (
    <>
      {structuredData.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: mitAdventStoerer(startseiteHtml, 'de') }} />
      <SiteScripts />
    </>
  );
}

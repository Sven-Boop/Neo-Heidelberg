import { startseiteHtml } from '../seitenTeile';
import SiteScripts from '../SiteScripts';
import { structuredData } from '../structuredData';
import { stoererHtml, STOERER_SKRIPT } from '../stoerer';

// Stündlich neu erzeugen: der Störer (app/stoerer.js) zeigt den Adventskalender bis 24.12., Silvester bis 31.12.2026
// und verschwindet danach ohne neuen Deploy.
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
  // Störer mittig über dem Startbild, nur auf der Startseite (app/stoerer.js); leer nach dem 31.12.2026
  const stoerer = stoererHtml('de');
  return (
    <>
      {structuredData.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: startseiteHtml }} />
      {stoerer && <div dangerouslySetInnerHTML={{ __html: stoerer }} />}
      {stoerer && <script dangerouslySetInnerHTML={{ __html: STOERER_SKRIPT }} />}
      <SiteScripts />
    </>
  );
}

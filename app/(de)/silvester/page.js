import { silvesterHtml } from '../../seitenTeile';
import { silvesterMetadata, silvesterLd, KARTEN_SKRIPT } from '../../silvester';
import SiteScripts from '../../SiteScripts';

// Silvester 2026 „Paris meets San Sebastián“ (Entwurf 06.11.2026, Inhalt in app/silvester.js)
export const metadata = silvesterMetadata('de');

const ld = silvesterLd('de');

export default function Seite() {
  return (
    <>
      {ld.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: silvesterHtml }} />
      <script dangerouslySetInnerHTML={{ __html: KARTEN_SKRIPT }} />
      <SiteScripts />
    </>
  );
}

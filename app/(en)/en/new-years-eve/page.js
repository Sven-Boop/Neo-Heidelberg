import { silvesterHtmlEn } from '../../../seitenTeile';
import { silvesterMetadata, silvesterLd, KARTEN_SKRIPT } from '../../../silvester';
import SiteScripts from '../../../SiteScripts';

// New Year's Eve 2026 „Paris meets San Sebastián“ (englische Fassung von /silvester, Inhalt in app/silvester.js)
export const metadata = silvesterMetadata('en');

const ld = silvesterLd('en');

export default function Seite() {
  return (
    <>
      {ld.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: silvesterHtmlEn }} />
      <script dangerouslySetInnerHTML={{ __html: KARTEN_SKRIPT }} />
      <SiteScripts />
    </>
  );
}

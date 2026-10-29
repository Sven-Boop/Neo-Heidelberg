import { menuHtmlEn } from '../../seitenTeile';
import SiteScripts from '../../SiteScripts';

// Englische Online-Karte — Ziel des QR-Codes auf der gedruckten Winterkarte (neo-heidelberg.de/menu).
// Sven 29.10.2026: Gäste sollen die Online-Karte mit Fotos sehen und die Sprache umschalten können.
// Deshalb Kopf (mit DE → /speisekarte), Speisekarte und Fuß wie die übrigen Seiten (app/seitenTeile.js).
// Deutsch eingestellte Handys schickt next.config.mjs von /menu direkt auf /speisekarte.
export const metadata = {
  title: 'Menu (English) — NEO Bar & Restaurant Heidelberg',
  description:
    'The NEO winter menu 2026/27 in English. Dry-aged steaks, Californian sushi, signature rolls, bowls and desserts — Zollhofgarten 2, Heidelberg.',
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/menu',
    languages: { 'de-DE': 'https://www.neo-heidelberg.de/speisekarte', en: 'https://www.neo-heidelberg.de/menu' },
  },
};

export default function MenuEnglishPage() {
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: menuHtmlEn }} />
      <SiteScripts />
    </>
  );
}

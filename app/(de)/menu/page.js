import { karteHtml } from '../../winterkarte/render';
import SetLang from '../../SetLang';

export const metadata = {
  title: 'Menu (English) — NEO Bar & Restaurant Heidelberg',
  description:
    'The NEO winter menu 2026/27 in English. Dry-aged steaks, Californian sushi, signature rolls, bowls and desserts — Zollhofgarten 2, Heidelberg.',
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/menu',
    languages: { 'de-DE': 'https://www.neo-heidelberg.de/speisekarte', en: 'https://www.neo-heidelberg.de/menu' },
  },
};

// Englische Winterkarte 2026/27 aus app/winterkarte (dieselben Daten wie /speisekarte und /en).
// Ziel des QR-Codes auf Seite 11 der gedruckten Winterkarte.
const KARTE = karteHtml('en', {
  cats: false,
  download: false,
  sharingEyebrow: 'Signature · Sharing Menu',
  knopf: '<a href="https://reservation.gastronaut.ai/neo-heidelberg" target="_blank" rel="noopener noreferrer" class="btn">Book a table</a>',
});

export default function MenuEnglishPage() {
  return (
    <main className="menu-en">
      <SetLang lang="en" />
      <header className="menu-en-hero">
        <a href="/" className="menu-en-logo" aria-label="NEO Bar & Restaurant Heidelberg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/neo-logo-weiss.png" alt="NEO" width="76" height="76" />
        </a>
        <a href="/" className="legal-back">← Back to neo-heidelberg.de</a>
        <div className="eyebrow">Winter Menu 2026/27 · English</div>
        <h1>
          Feed your <em>soul.</em>
        </h1>
        <p>
          Dry-aged steaks from our humidor, Californian sushi, signature rolls and
          desserts. Kitchen open from 5:30 pm, Sundays from 4 pm. Please let us know about
          any allergies or intolerances — our team is happy to help.
        </p>
        <a href="/pdf/menu-english.pdf" target="_blank" rel="noopener" className="btn-outline menu-pdf-btn no-print">
          Download menu as PDF
        </a>
      </header>

      <div dangerouslySetInnerHTML={{ __html: KARTE }} />

      <section className="reserve">
        <div className="reserve-inner">
          <div className="eyebrow">Reservation</div>
          <h3>
            There you are. We’ve <em>been waiting.</em>
          </h3>
          <p className="sub">
            Zollhofgarten 2 · 69115 Heidelberg · Mon–Sat from 5:30 pm · Sun from 4 pm
          </p>
          <div className="btn-row">
            <a
              href="https://reservation.gastronaut.ai/neo-heidelberg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary"
            >
              Book a table
            </a>
            <a href="mailto:info@neo-heidelberg.de" className="btn">
              Contact
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

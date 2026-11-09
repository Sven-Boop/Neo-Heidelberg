// BLISS Adventskalender 2026: runder Störer im Startbild (Sven 09.11.2026: „mach mir nen störer auf der neo seite“).
// Steht im Container .hero-stoerer (von app/silvester.js gesetzt) links neben dem Silvester-Störer;
// Aussehen und Layout beider Störer in app/globals.css („Störer-Reihe im Startbild“).
// Gilt bis einschließlich 24.12.2026 (deutsche Zeit). Die Startseiten (app/(de)/page.js, app/(en)/en/page.js)
// werden dafür stündlich neu erzeugt (revalidate), danach ist der Störer ohne neuen Deploy weg.

export const ADVENT_BIS = '2026-12-24';
const ZIEL = 'https://adventskalender.bliss-group.de/?utm_source=neo-heidelberg&utm_medium=stoerer';
const BEHAELTER = '<div class="hero-stoerer">';

// Kalendertag in Europe/Berlin als JJJJ-MM-TT (sv-SE liefert genau dieses Format)
export function berlinTag(jetzt = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(jetzt);
}

export function adventAktiv(jetzt = new Date()) {
  return berlinTag(jetzt) <= ADVENT_BIS;
}

const TEXT = {
  de: { a: 'Adventskalender', b: '24', t: 'Momente 2026', c: 'Jetzt sichern', aria: 'BLISS Adventskalender 2026, 24 Momente aus unseren Häusern, jetzt sichern' },
  en: { a: 'Advent Calendar', b: '24', t: 'moments 2026', c: 'Get yours', aria: 'BLISS Advent Calendar 2026, 24 moments from our houses, get yours' },
};

function stoererHtml(lang) {
  const z = TEXT[lang] || TEXT.de;
  return `<a class="ak-stoerer" href="${ZIEL.replace(/&/g, '&amp;')}" target="_blank" rel="noopener" aria-label="${z.aria}"><span class="sv-st-innen" aria-hidden="true"><span class="sv-st-a sv-st-lang">${z.a}</span><span class="sv-st-b">${z.b}</span><span class="sv-st-t">${z.t}</span><span class="sv-st-c">${z.c}</span></span></a>`;
}

// Setzt den Störer vorn in den Container (Adventskalender links, Silvester rechts). Nach dem 24.12. bleibt das HTML unverändert.
export function mitAdventStoerer(html, lang, jetzt = new Date()) {
  if (html.split(BEHAELTER).length !== 2) throw new Error('adventskalender: Container für die Störer nicht eindeutig: ' + BEHAELTER);
  if (!adventAktiv(jetzt)) return html;
  return html.replace(BEHAELTER, BEHAELTER + stoererHtml(lang));
}

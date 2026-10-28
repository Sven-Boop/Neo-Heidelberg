import { bodyHtml } from './bodyHtml';
import { mitHaeuserLeiste } from './haeuser';
import { mitFeiernMenues } from './feiernMenues';
import { mitKarte, mitSharingTeaser } from './winterkarte/render';

// Seit 17.10.2026 liefert jede deutsche Adresse nur ihren eigenen Inhalt aus (vorher bekamen
// /speisekarte und /hochzeit die komplette Startseite und schalteten nur per CSS-Klasse um).
// Quelle bleibt app/bodyHtml.js; hier wird sie in Kopf, Startseite, Speisekarte, Hochzeit und Fuß zerlegt.

function schneide(von, bis) {
  const a = bodyHtml.indexOf(von);
  const b = bis ? bodyHtml.indexOf(bis, a + 1) : bodyHtml.length;
  if (a < 0 || b < 0) throw new Error('seitenTeile: Markierung nicht gefunden: ' + (a < 0 ? von : bis));
  return bodyHtml.slice(a, b);
}

const KOPF = schneide('<!-- NAV -->', '<!-- HERO -->');
// Startseite mit Wintermenüs im Abschnitt „Feiern im NEO“ (app/feiernMenues.js)
const START = mitSharingTeaser(mitFeiernMenues(schneide('<!-- HERO -->', '<div class="subpage" id="page-speisekarte">')), 'de');
// Speisekarte Winter 2026/27 aus app/winterkarte (Daten + Fotos), eingesetzt an <!--WINTERKARTE-->
const KARTE = mitKarte(schneide('<div class="subpage" id="page-speisekarte">', '<!-- ==================== HOCHZEIT PAGE'), 'de');
const HOCHZEIT = schneide('<div class="subpage" id="page-hochzeit">', '<!-- FOOTER -->');
// Fuß mit Häuser-Leiste über der Copyright-Zeile (app/haeuser.js)
const FUSS = mitHaeuserLeiste(schneide('<!-- FOOTER -->'), 'de');

const ids = (html) => new Set([...html.matchAll(/\sid="([\w-]+)"/g)].map((m) => m[1]));
const BEREICHE = [
  { pfad: '/', ids: ids(START) },
  { pfad: '/speisekarte', ids: ids(KARTE) },
  { pfad: '/hochzeit', ids: ids(HOCHZEIT) },
];

// Anker-Links (#bar, #starter …), deren Ziel nicht im ausgelieferten Inhalt steht, zeigen auf die
// Adresse, wo das Ziel liegt (/#bar, /speisekarte#starter). So stimmen die Links auch ohne JavaScript.
function verlinke(html, eigeneIds) {
  return html.replace(/href="#([\w-]+)"/g, (ganz, id) => {
    if (eigeneIds.has(id)) return ganz;
    const ziel = BEREICHE.find((b) => b.ids.has(id));
    return ziel ? `href="${ziel.pfad}#${id}"` : `href="/#${id}"`;
  });
}

function aktiv(html, id) {
  const alt = `<div class="subpage" id="${id}">`;
  if (!html.includes(alt)) throw new Error('seitenTeile: Seitenanfang nicht gefunden: ' + id);
  return html.replace(alt, `<div class="subpage active" id="${id}">`);
}

// Ganze Seite: Kopf + Inhalt + Fuß, Anker passend zum Inhalt
export function seitenHtml(inhalt) {
  const eigene = ids(inhalt);
  return verlinke(KOPF, eigene) + verlinke(inhalt, eigene) + verlinke(FUSS, eigene);
}

export const startseiteHtml = seitenHtml(START);
export const speisekarteHtml = seitenHtml(aktiv(KARTE, 'page-speisekarte'));
export const hochzeitHtml = seitenHtml(aktiv(HOCHZEIT, 'page-hochzeit'));

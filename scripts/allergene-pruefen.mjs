// Prüft app/winterkarte/allergene.json gegen die Karte (app/winterkarte/karte.json).
// Aufruf: node scripts/allergene-pruefen.mjs  → Exit 1 bei einem Fehler.
// Optional mit Adresse eines laufenden Servers: node scripts/allergene-pruefen.mjs http://localhost:3123
//   prüft dann zusätzlich das ausgelieferte HTML von /speisekarte, /en und /menu.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lies = (d) => JSON.parse(fs.readFileSync(path.join(repo, 'app/winterkarte', d), 'utf8'));
const karte = lies('karte.json');
const al = lies('allergene.json');

let fehler = 0;
const pruefe = (ok, text) => {
  console.log((ok ? '  ok   ' : '  FEHLER ') + text);
  if (!ok) fehler++;
};
const g = (k) => al.gerichte[k];
const hat = (k, a) => !!g(k)?.enthaelt.includes(a);
const kann = (k, a) => !!g(k)?.kann.includes(a);

console.log('Fälle aus dem Auftrag');
pruefe(g('w-edamame-asian-style') && !hat('w-edamame-asian-style', 'D') && !kann('w-edamame-asian-style', 'D'), 'Edamame Asian Style ohne Fisch');
pruefe(hat('w-caesar-salad', 'D'), 'Caesar Salad mit Fisch');
pruefe(hat('w-spitzkohl-dunkel-geroestet', 'N'), 'Spitzkohl, dunkel geröstet mit Sesam');
pruefe(hat('w-sauce-bearnaise', 'A') && hat('w-sauce-bearnaise', 'F'), 'Sauce Béarnaise mit Gluten und Soja');

console.log('Regeln');
const KURZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L', 'M', 'N', 'O', 'P', 'R'];
const sortiert = (l) => l.every((a, i) => KURZ.includes(a) && (i === 0 || KURZ.indexOf(l[i - 1]) < KURZ.indexOf(a)));
const alle = Object.entries(al.gerichte);
pruefe(alle.every(([, v]) => sortiert(v.enthaelt) && sortiert(v.kann)), 'Kürzel gültig und in Reihenfolge der Liste');
pruefe(alle.every(([, v]) => !v.kann.some((a) => v.enthaelt.includes(a))), '„Kann enthalten“ wiederholt nichts aus „Enthält“');
pruefe(/^\d{2}\.\d{2}\.\d{4}$/.test(al.stand), `Stand als TT.MM.JJJJ (${al.stand})`);
// Fritteuse: French Fries mit Parmesan geht durch die Fritteuse → Gluten/Krebstiere unter „kann“
pruefe(kann('w-parmesan', 'A') && kann('w-parmesan', 'B'), 'Fritteuse ergänzt Gluten und Krebstiere unter „Kann enthalten“');

console.log('Ohne Saucen und Beilage (nur Filet, Steak, Dry Aged, Taste Your Filet)');
const ohne = (k) => g(k)?.ohne || [];
pruefe(['C', 'H'].every((a) => ohne('w-black-angus-galicien').includes(a)) && hat('w-black-angus-galicien', 'C'), 'Black Angus Galicien: Ei und Nüsse stehen unter „Enthält“ UND in der Ohne-Zeile');
pruefe(!ohne('w-black-angus-galicien').includes('G'), 'Black Angus Galicien: Milch (Garmethode) nicht in der Ohne-Zeile');
pruefe(ohne('w-rumpsteak-pommersches-simmentaler').length > 0 && ohne('w-black-angus-kotelett').length > 0 && ohne('gang:taste-your-filet-deluxe').length > 0, 'Steak, Dry Aged und Sharing-Gang Taste Your Filet haben eine Ohne-Zeile');
pruefe(['w-caesar-salad', 'w-hummer-roll', 'w-crispy-tuna', 'w-weisser-heilbutt-wildfanggarnele', 'gang:hummer-roll'].every((k) => !ohne(k).length), 'keine Ohne-Zeile bei Salat, Sushi, Fisch');
pruefe(alle.every(([, v]) => (v.ohne || []).every((a) => v.enthaelt.includes(a))), 'Ohne-Zeile nennt nur, was unter „Enthält“ steht');

console.log('Abdeckung: jedes sichtbare Gericht hat Daten oder „bitte frag unser Team“');
const OHNE_KNOPF = new Set(['badge']); // „Specials“: Hinweis, kein Gericht
let mitDaten = 0;
const fragen = [];
for (const s of karte.seiten) for (const r of s.rubriken) {
  if (['plus', 'hinweis', 'trenner'].includes(r.stil) || OHNE_KNOPF.has(r.stil)) continue;
  for (const it of r.items) {
    if (it.weg || !it.name) continue;
    const k = r.stil === 'gaenge'
      ? 'gang:' + it.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9²]+/g, ' ').trim().replace(/ /g, '-')
      : it.id;
    if (g(k)?.enthaelt.length) mitDaten++;
    else fragen.push(`${s.titel} · ${it.name}`);
  }
}
console.log(`  ${mitDaten} Gerichte mit Allergenen, ${fragen.length} mit „bitte frag unser Team“`);
for (const f of fragen) console.log('     – ' + f);
pruefe(mitDaten >= 95, 'mindestens 95 Gerichte mit Daten');
pruefe(al.ohneZuordnung.every((z) => /Specials/.test(z)), `ohne Zuordnung nur „Specials“ (${al.ohneZuordnung.length})`);

const basis = process.argv[2];
if (basis) {
  console.log('Ausgeliefertes HTML ' + basis);
  for (const [pfad, sprache] of [['/speisekarte', 'de'], ['/en', 'en'], ['/menu', 'en']]) {
    const html = await (await fetch(basis + pfad)).text();
    const details = (html.match(/<details class="allergene">/g) || []).length;
    const fragenHtml = (html.match(sprache === 'en' ? /Allergens: please ask our team/g : /Allergene: bitte frag unser Team/g) || []).length;
    const schalter = (html.match(/<button[^>]*data-allergene-schalter/g) || []).length;
    const stand = html.includes(al.stand) || (sprache === 'en' && /as of \d+ \w+ \d{4}/.test(html));
    // je Gericht-Kasten (.item, Filet-Zeile, Gang) genau ein Aufklapper — außer Plus-/Hinweiszeilen
    const items = (html.match(/<div class="item[ "]/g) || []).length;
    const filets = (html.match(/<div class="filet-name">/g) || []).length;
    const gaenge = (html.match(/<div class="course">/g) || []).length;
    pruefe(schalter === 1, `${pfad}: ein Schalter`);
    pruefe(stand, `${pfad}: Hinweis mit Stand`);
    pruefe(details > 80, `${pfad}: ${details} Aufklapper (${items} Gerichte-Kästen, ${filets} Filets, ${gaenge} Gänge, davon ${fragenHtml}× „frag unser Team“)`);
    pruefe(!/allergens\? Just ask us|Allergene\? Fragt uns gerne/.test(html), `${pfad}: alte Legende ersetzt`);
    const ohneZeilen = (html.match(/<p class="allergene-ohne">/g) || []).length;
    pruefe(ohneZeilen >= 15, `${pfad}: ${ohneZeilen} Ohne-Saucen-Zeilen`);
  }
}

console.log(fehler ? `\n${fehler} Fehler` : '\nalles grün');
process.exit(fehler ? 1 : 0);

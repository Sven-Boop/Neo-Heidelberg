// Holt die Gästekarte Winter 2026/27 (deutsch + englisch) aus den bearbeitbaren Karten
// und schreibt sie nach app/winterkarte/karte.json. Quelle: START-Daten in
//   ~/Desktop/Development/neo-winterkarte-gaeste/karte.html      (deutsch, _v:13 = verschickter Endstand 07.10.2026)
//   ~/Desktop/Development/neo-winterkarte-gaeste/karte-en.html   (englisch, aus en/bauen.py)
// Aufruf: node scripts/winterkarte-holen.mjs [ordner]
// Gestrichene Zeilen (weg:true) bleiben in der Datei, die Website zeigt sie nicht.
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const ordner = process.argv[2] || path.join(os.homedir(), 'Desktop/Development/neo-winterkarte-gaeste');
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function start(datei) {
  const html = fs.readFileSync(path.join(ordner, datei), 'utf8');
  const a = html.indexOf('const I=(');
  const b = html.indexOf('\nconst NOTIZEN');
  if (a < 0 || b < 0) throw new Error('START nicht gefunden in ' + datei);
  const ctx = {};
  vm.runInNewContext(html.slice(a, b).replace('const START=', 'START=') + '\n;this.START=START;', ctx);
  return ctx.START;
}

export function kennung(name) {
  return 'w-' + name.toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/²/g, '2')
    .replace(/[’'´`]/g, '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const de = start('karte.html');
const en = start('karte-en.html');
if (de._v !== 13) console.warn('Achtung: deutsche Karte hat _v:' + de._v + ' (erwartet 13)');

const vergeben = new Set();
const seiten = [];
de.seiten.forEach((s, si) => {
  if (s.typ !== 'karte') return;
  const se = en.seiten[si];
  const seite = { titel: s.titel || s.label || '', titel_en: se.titel || se.label || '', dunkel: !!s.dunkel, rubriken: [] };
  s.rubriken.forEach((r, ri) => {
    const re = se.rubriken[ri];
    const rub = { titel: r.titel, titel_en: re.titel, stil: r.stil, spalte: r.spalte, items: [] };
    if (r.intro) { rub.intro = r.intro; rub.intro_en = re.intro; }
    r.items.forEach((it, ii) => {
      const ie = re.items[ii];
      const o = { name: it.name, name_en: ie.name, beschr: it.beschr, beschr_en: ie.beschr, preis: it.preis, preis_en: ie.preis };
      if (it.nr) o.nr = it.nr;
      if (it.notiz) { o.notiz = it.notiz; o.notiz_en = ie.notiz; }
      if (it.weg) o.weg = true;
      // Kennung wie in der Küchen-App (w-<name>); doppelte Namen bekommen die Rubrik davor
      if (it.name && r.stil !== 'gaenge') {
        let k = kennung(it.name);
        // Dry Aged: Kotelett/T-Bone/Porterhouse gibt es je Rasse, deshalb immer mit Rasse
        if (vergeben.has(k) || s.titel.startsWith('Dry Aged')) k = kennung((r.titel || s.titel) + ' ' + it.name);
        vergeben.add(k);
        o.id = k;
      }
      rub.items.push(o);
    });
    seite.rubriken.push(rub);
  });
  seiten.push(seite);
});

const ziel = path.join(repo, 'app/winterkarte/karte.json');
fs.writeFileSync(ziel, JSON.stringify({
  _quelle: 'neo-winterkarte-gaeste/karte.html + karte-en.html, START _v:' + de._v + ' (Gästekarte Winter 2026/27). Nicht von Hand ändern: node scripts/winterkarte-holen.mjs',
  seiten,
}, null, 1) + '\n');
console.log('geschrieben', ziel, seiten.length, 'Seiten,', vergeben.size, 'Gerichte mit Kennung');

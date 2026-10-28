// Holt die Allergene der Winterkarte 2026/27 aus BLISS Service und schreibt sie nach
// app/winterkarte/allergene.json. Quelle:
//   ~/Desktop/Development/neo-dienstplan/lib/daten/karte.js  (KARTE, GERICHTE, KOMPONENTEN —
//                                                            erzeugt aus der Küchen-App neo-kueche)
//   ~/Desktop/Development/neo-dienstplan/lib/karte.js        (gerichtBild: Teller + alle Komponenten)
// Aufruf: node scripts/allergene-holen.mjs [ordner-bliss-service]
//
// Je Gericht der Website:
//   enthaelt = allergeneAlle (Teller ∪ alle Komponenten rekursiv), Kürzel A–R in Reihenfolge der Liste
//   kann     = Verdacht aus Zutatenwörtern (evtl) + bei gemeinsamer Fritteuse Gluten und Krebstiere,
//              jeweils ohne das, was schon unter „enthaelt“ steht
// Fehlt die Zuordnung oder ist enthaelt leer, zeigt die Website „bitte frag unser Team“.
//
// Zuordnung: Die Kennungen der Website (kennung(name), scripts/winterkarte-holen.mjs) weichen bei
// einigen Gerichten von denen der Küche ab (w-lachs ↔ w-maki-lachs). Beide Karten kommen aus derselben
// Gästekarte in derselben Reihenfolge, deshalb wird geordnet nach Namen abgeglichen: ein Zeiger läuft
// durch die Einträge des Service, genommen wird der nächste mit gleichem Namen in einem kleinen Fenster.
// Jede Website-Zeile ohne Gegenstück wird gemeldet. Idempotent: gleiche Quelle → gleiche Datei.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const ordner = process.argv[2] || path.join(os.homedir(), 'Desktop/Development/neo-dienstplan');
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FENSTER = 6;

const { KARTE, GERICHTE, KOMPONENTEN, KARTE_STAND } = await import(pathToFileURL(path.join(ordner, 'lib/daten/karte.js')).href);
const { gerichtBild, ALLERGEN_KURZ } = await import(pathToFileURL(path.join(ordner, 'lib/karte.js')).href);
const karte = JSON.parse(fs.readFileSync(path.join(repo, 'app/winterkarte/karte.json'), 'utf8'));

const normal = (s) => String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9²]+/g, ' ').trim();

// Schlüssel der Gänge des Sharing Menus (haben auf der Website keine id)
export const gangSchluessel = (name) => 'gang:' + normal(name).replace(/ /g, '-');

// Service-Einträge in Kartenreihenfolge
const service = [];
for (const teil of KARTE) for (const r of teil.rubriken) for (const e of r.eintraege) {
  if (e.id && e.name) service.push({ id: e.id, name: e.name, seite: teil.titel });
}

// Website-Zeilen in Kartenreihenfolge (nur sichtbare Gerichte; Plus- und Hinweiszeilen haben kein Gericht)
const zeilen = [];
for (const s of karte.seiten) for (const r of s.rubriken) {
  if (r.stil === 'plus' || r.stil === 'hinweis' || r.stil === 'trenner') continue;
  for (const it of r.items) {
    if (it.weg || !it.name) continue;
    const schluessel = r.stil === 'gaenge' ? gangSchluessel(it.name) : it.id;
    if (!schluessel) continue;
    zeilen.push({ schluessel, name: it.name, seite: s.titel, rubrik: r.titel, stil: r.stil });
  }
}

function bild(id) {
  const g = GERICHTE[id];
  if (!g) return null;
  const b = gerichtBild(g, KOMPONENTEN);
  const enthaelt = b.allergeneAlle;
  const kann = new Set(b.evtl.map((e) => e.kurz));
  if (b.fritteuse) { kann.add('A'); kann.add('B'); }
  for (const a of enthaelt) kann.delete(a);
  return {
    enthaelt,
    kann: [...kann].sort((x, y) => ALLERGEN_KURZ.indexOf(x) - ALLERGEN_KURZ.indexOf(y)),
  };
}

const gerichte = {};
const offen = [];
let zeiger = 0;
for (const z of zeilen) {
  let treffer = -1;
  for (let j = zeiger; j < Math.min(service.length, zeiger + FENSTER); j++) {
    if (normal(service[j].name) === normal(z.name)) { treffer = j; break; }
  }
  if (treffer < 0) {
    offen.push(`${z.seite} · ${z.rubrik || '–'} · ${z.name}`);
    continue;
  }
  zeiger = treffer + 1;
  const s = service[treffer];
  const b = bild(s.id);
  if (!b) { offen.push(`${z.seite} · ${z.name} (Service ${s.id} ohne Rezept)`); continue; }
  gerichte[z.schluessel] = { service: s.id, ...b };
}

// Stand: Datum des Küchen-Commits („ea929e7 28.10.2026 17:08 …“), sonst Tag des Imports
const datum = (KARTE_STAND.kuecheText || '').match(/\b(\d{2}\.\d{2}\.\d{4})\b/)?.[1]
  || (KARTE_STAND.erzeugt || '').split('-').reverse().join('.');

const ziel = path.join(repo, 'app/winterkarte/allergene.json');
fs.writeFileSync(ziel, JSON.stringify({
  _quelle: `BLISS Service lib/daten/karte.js (Küche ${KARTE_STAND.kueche}, Gästekarte Stand ${KARTE_STAND.druckkarte}) + lib/karte.js gerichtBild. Nicht von Hand ändern: node scripts/allergene-holen.mjs`,
  stand: datum,
  kueche: KARTE_STAND.kueche,
  gerichte,
  ohneZuordnung: offen,
}, null, 1) + '\n');

console.log('geschrieben', ziel, Object.keys(gerichte).length, 'Gerichte mit Allergenen, Stand', datum);
if (offen.length) {
  console.log('Ohne Zuordnung (Website zeigt „bitte frag unser Team“):');
  for (const o of offen) console.log('  -', o);
}

// Holt die NEO-Menüvorschläge aus dem Werkzeug „NEO Wintermenüs“ und schreibt app/menuvorschlaege.json.
//
// Quelle: der gemeinsame Stand nwm:stand in der Supabase-kv-Tabelle (nur lesend, Service-Role, serverseitig).
// Der Stand wird genauso aufbereitet wie im Werkzeug selbst: dessen migrieren() aus
// ../neo-wintermenues-online/index.html läuft über den gespeicherten Stand (Übernahme-Stufen, und solange
// niemand online etwas geändert hat, gilt START aus der Datei). So steht hier dasselbe wie online im Werkzeug.
//
// Übernommen: nur NEO-Menüs. Weggelassen: LAB-Vorschläge (lab-…), Silvester (eigenes Event, noch nicht
// freigegeben), gestrichene Menüs und gestrichene Gerichte. Interne Felder (eigen, zukauf, intern, beleg,
// vorjahr, vergleich) und Einkaufspreise kommen nicht in die Datei.
//
// Aufruf (im Repo neo-heidelberg):  node scripts/menues-holen.mjs
// Schlüssel: SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY aus der Umgebung oder aus
// ../neo-wintermenues-online/.env.local (anderer Pfad: NWM_ENV=/pfad/.env.local). Werden nie ausgegeben.
// In kv wird nichts geschrieben.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const REPO = join(dirname(fileURLToPath(import.meta.url)), '..');
const WERKZEUG = process.env.NWM_ORDNER || join(REPO, '..', 'neo-wintermenues-online');
const ZIEL = join(REPO, 'app', 'menuvorschlaege.json');

function envLesen() {
  const datei = process.env.NWM_ENV || join(WERKZEUG, '.env.local');
  const werte = {};
  if (existsSync(datei)) {
    for (const zeile of readFileSync(datei, 'utf8').split('\n')) {
      const m = zeile.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m) werte[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  const url = process.env.SUPABASE_URL || werte.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || werte.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error(`SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY fehlen (gesucht in ${datei})`);
  return { url: url.replace(/\/+$/, ''), key };
}

// START und migrieren() aus der Seite des Werkzeugs (in einer leeren VM ausgewertet)
function werkzeugLaden() {
  const html = readFileSync(join(WERKZEUG, 'index.html'), 'utf8');
  const a = html.indexOf('const G=(');
  const b = html.indexOf('\nconst ls=', a);
  const c = html.indexOf('function migrieren(');
  const d = html.indexOf('\nlet D=', c);
  if (a < 0 || b < 0 || c < 0 || d < 0) throw new Error('START oder migrieren() in index.html nicht gefunden');
  const code = `${html.slice(a, b)}\n${html.slice(c, d)}\nglobalThis.START=START;globalThis.migrieren=migrieren;`;
  const ctx = { structuredClone };
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { timeout: 2000 });
  return { START: ctx.START, migrieren: ctx.migrieren };
}

async function kvStand({ url, key }) {
  const r = await fetch(`${url}/rest/v1/kv?key=eq.${encodeURIComponent('nwm:stand')}&select=data,updated_at`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: 'no-store',
  });
  if (!r.ok) throw new Error(`kv nwm:stand: HTTP ${r.status}`);
  const zeilen = await r.json();
  const z = zeilen[0];
  return z ? { stand: z.data?.stand ?? null, rev: Number(z.data?.rev) || 0, ts: z.data?.ts || null } : { stand: null, rev: 0, ts: null };
}

// Titel wie im Werkzeug (titelText/fuge): „Winter“ + „tafel“ → „Wintertafel“, „Winter-“ + „Special“ → „Winter-Special“
function titelText(k) {
  const a = (k.t1 || '').trim();
  const b = (k.t2 || '').trim();
  const fuge = a.endsWith('-') || (b && b[0] === b[0].toLowerCase() && /[a-zäöü]/.test(b[0])) ? '' : ' ';
  return (a + fuge + b).trim();
}

const t = (s) => String(s ?? '').trim();

function menue(k) {
  const bloecke = [];
  for (const b of k.bloecke || []) {
    if (b.weg) continue;
    if (b.art === 'rubrik' && t(b.titel)) bloecke.push({ art: 'rubrik', titel: t(b.titel) });
    else if (b.art === 'notiz' && t(b.text)) bloecke.push({ art: 'notiz', text: t(b.text) });
    else if (b.art === 'gang' && (t(b.name) || t(b.sub))) {
      bloecke.push({
        art: 'gang',
        ...(b.oder ? { oder: true } : { nr: t(b.nr) }),
        name: t(b.name),
        beschreibung: t(b.sub),
        ...(t(b.preis) ? { preis: t(b.preis) } : {}),
      });
    }
  }
  return {
    id: k.id,
    titel: titelText(k),
    haus: t(k.haus),
    ort: t(k.ort),
    zeilen: [t(k.z1), t(k.z2)].filter(Boolean),
    preis: t(k.preis),
    preisZusatz: t(k.zusatz),
    option: t(k.option),
    bloecke,
  };
}

const { START, migrieren } = werkzeugLaden();
const kv = await kvStand(envLesen());
const stand = migrieren(kv.stand ? JSON.parse(JSON.stringify(kv.stand)) : null);

const menues = [];
const weggelassen = [];
for (const k of stand.karten) {
  const titel = titelText(k) + (/-veg$/.test(k.id || '') ? ' · vegetarisch' : '');
  if (/^lab-/.test(k.id || '')) weggelassen.push({ id: k.id, titel, grund: 'LAB-Vorschlag (Palatin), nicht NEO' });
  else if (/^silvester/.test(k.id || '')) weggelassen.push({ id: k.id, titel, grund: 'Silvester: eigenes Event, noch nicht freigegeben' });
  else if (k.weg) weggelassen.push({ id: k.id, titel, grund: 'im Werkzeug gestrichen' });
  else menues.push(menue(k));
}

const aus = {
  hinweis: 'Automatisch erzeugt von scripts/menues-holen.mjs aus nwm:stand – nicht von Hand ändern.',
  stand: stand._v,
  kvRev: kv.rev,
  kvGeaendert: kv.ts ? new Date(kv.ts).toISOString() : null,
  vorlageStand: START._v,
  menues,
  weggelassen,
};
writeFileSync(ZIEL, JSON.stringify(aus, null, 1) + '\n');

console.log(`nwm:stand rev ${kv.rev}${kv.ts ? ' vom ' + new Date(kv.ts).toISOString() : ' (leer)'} · aufbereitet auf Stand ${stand._v} (Vorlage ${START._v})${kv.stand && !kv.stand._bearbeitet ? ' · online unverändert → Vorlage' : ''}`);
for (const m of menues) console.log(`  ${m.id.padEnd(12)} ${m.titel.padEnd(22)} ${m.preis.padStart(6)} ${m.preisZusatz}`);
for (const w of weggelassen) console.log(`  – ${w.id.padEnd(12)} ${w.titel}: ${w.grund}`);
console.log(`→ ${ZIEL} (${menues.length} Menüs)`);

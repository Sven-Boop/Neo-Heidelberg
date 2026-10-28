// Speisekarte Winter 2026/27 als HTML – eine Quelle für /speisekarte (deutsch), /en (englisch,
// Unterseite #speisekarte) und /menu (englisch, Ziel des QR-Codes der gedruckten Winterkarte).
//   Inhalte:  app/winterkarte/karte.json  (aus der Gästekarte, node scripts/winterkarte-holen.mjs)
//   Fotos:    app/winterkarte/fotos.json  (Gericht → Bildnummer, python3 scripts/winterfotos.py)
//   Allergene: app/winterkarte/allergene.json (aus BLISS Service, node scripts/allergene-holen.mjs)
// Die Texte der Gerichte kommen unverändert aus der Gästekarte; nur das Preisformat folgt der
// Website (13,00 €). Kapitelköpfe und Einleitungen sind Website-Texte (stehen hier unten).
import karte from './karte.json';
import fotos from './fotos.json';
import allergene from './allergene.json';

const RESERVIEREN = 'https://reservation.gastronaut.ai/neo-heidelberg';


// Die 14 Allergene (LMIV Anhang II), Kürzel und Reihenfolge wie in BLISS Service / Küchen-App
const ALLERGEN_NAMEN = {
  A: ['Gluten', 'gluten'],
  B: ['Krebstiere', 'crustaceans'],
  C: ['Ei', 'egg'],
  D: ['Fisch', 'fish'],
  E: ['Erdnuss', 'peanuts'],
  F: ['Soja', 'soy'],
  G: ['Milch', 'milk'],
  H: ['Nüsse', 'nuts'],
  L: ['Sellerie', 'celery'],
  M: ['Senf', 'mustard'],
  N: ['Sesam', 'sesame'],
  O: ['Sulfite', 'sulphites'],
  P: ['Lupine', 'lupin'],
  R: ['Weichtiere', 'molluscs'],
};
const ALLERGEN_KURZ = Object.keys(ALLERGEN_NAMEN);
const MONATE_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
// „28.10.2026“ → „28 October 2026“
function standEn(stand) {
  const [t, m, j] = String(stand).split('.');
  return MONATE_EN[+m - 1] ? `${+t} ${MONATE_EN[+m - 1]} ${j}` : stand;
}

const T = {
  de: {
    lang: 'de',
    kapitel: 'Kapitel',
    legende: (stand) =>
      `Angaben nach unseren Rezepturen, Stand ${stand}. Spuren weiterer Allergene können wir in unserer Küche nicht ausschließen. Bei Allergien sprich bitte vor der Bestellung unser Service-Team an. Vegetarische und vegane Varianten? Frag uns gerne.`,
    allergene: 'Allergene',
    alleAllergene: 'Allergene anzeigen',
    enthaelt: 'Enthält',
    kann: 'Kann enthalten',
    fragen: 'Allergene: bitte frag unser Team',
    rasse: 'Rasse',
    dryAgedSub: 'Ab 600 g · Preis je 100 g',
    sharingH2: 'Vier Gänge. <em>Ein Abend.</em>',
    sharingLead:
      'Unser Sharing-Menü für zwei. Katsu Sando vom Wagyu Roastbeef als Auftakt, eine Hummer Roll als Zwischengang, zum Hauptgang das Taste Your Filet Deluxe — 4 × 100 g von allen vier Rassen. Und dann: Birne Helene.',
    sharingLabel: 'für 2 Personen',
    proPerson: '€ pro Person',
    download: {
      h3: 'Lieber als <em>PDF?</em>',
      p: 'Die komplette Winterkarte, die Getränkekarte und die englische Version — bequem zum Download, falls ihr was zum Mitnehmen braucht.',
      links: [
        ['/pdf/speisekarte.pdf', 'Speisekarte PDF'],
        ['/menu/', 'Menu English'],
        ['/pdf/getraenkekarte.pdf', 'Getränkekarte'],
      ],
    },
    chips: ['Sharing Menu', 'Starter', 'Sushi &amp; More', 'Rolls', 'Bowl', 'Maki', 'Main', 'Beef', 'Dry Aged', 'Sides', 'Sweets'],
  },
  en: {
    lang: 'en',
    kapitel: 'Chapter',
    legende: (stand) =>
      `Based on our recipes, as of ${standEn(stand)}. We cannot rule out traces of other allergens in our kitchen. If you have an allergy, please speak to our service team before ordering. Vegetarian or vegan options? Just ask us.`,
    allergene: 'Allergens',
    alleAllergene: 'Show allergens',
    enthaelt: 'Contains',
    kann: 'May contain',
    fragen: 'Allergens: please ask our team',
    rasse: 'Breed',
    dryAgedSub: 'From 600 g · price per 100 g',
    sharingH2: 'Four courses. <em>One evening.</em>',
    sharingLead:
      'Our sharing menu for two. Katsu sando of Wagyu roast beef to open, a Lobster Roll as an interlude, Taste Your Filet Deluxe as the main — 4 × 100 g of all four breeds. And then: Pear Belle Hélène.',
    sharingLabel: 'for 2 people',
    proPerson: '€ per person',
    download: {
      h3: 'Prefer a <em>PDF?</em>',
      p: 'The complete winter menu in English and German plus the drinks list — easy to download, in case you need something to take away.',
      links: [
        ['/pdf/menu-english.pdf', 'Menu PDF'],
        ['/pdf/speisekarte.pdf', 'Speisekarte (Deutsch)'],
        ['/pdf/getraenkekarte.pdf', 'Drinks List'],
      ],
    },
    chips: ['Sharing Menu', 'Starters', 'Sushi &amp; More', 'Rolls', 'Bowl', 'Maki', 'Main', 'Beef', 'Dry Aged', 'Sides', 'Sweets'],
  },
};

// Kapitel der Website: welche Seite / Rubriken der Gästekarte, Überschrift und Einleitung
const KAPITEL = [
  {
    id: 'starter', seite: 'Starters', nr: 'I',
    h2: { de: 'Starter &amp; <em>Appetizer.</em>', en: 'Starters &amp; <em>Appetizers.</em>' },
    intro: {
      de: 'Der Anfang von allem. Von galizischen Konserven über das Tatar vom Schwarzwälder Rind bis zum Carpaccio mit Wintertrüffel — die Bühne für den Abend.',
      en: 'The beginning of it all. From Galician conservas to Black Forest beef tartare to carpaccio with winter truffle — the stage for the evening.',
    },
  },
  {
    id: 'sushi', seite: 'Sushi & More', nr: 'II',
    h2: { de: 'Sushi &amp; <em>More.</em>', en: 'Sushi &amp; <em>More.</em>' },
    intro: {
      de: 'Californisches Sushi, wie wir es verstehen. Lachsforelle vom Forellenhof Lenz, Blue Fin Thunfisch, weißer Heilbutt — in Sashimi, Tataki und Ceviche.',
      en: 'Californian sushi as we understand it. Salmon trout from Forellenhof Lenz, Blue Fin tuna, white halibut — as sashimi, tataki and ceviche.',
    },
  },
  {
    id: 'rolls', seite: 'Sushi & More · Rolls', rubriken: ['Inside Out Rolls', 'Crispy Futomaki-Rolls', 'NEO Signature'], nr: 'III',
    h2: { de: 'Sushi <em>Rolls.</em>', en: 'Sushi <em>Rolls.</em>' },
    intro: {
      de: 'Handgerollt auf Bestellung. Inside-Out-Rolls und Crispy Futomaki — vom reinen Gemüse bis zur leicht abgeflämmten Signature-Rolle mit Japan Wagyu A4.',
      en: 'Hand-rolled to order. Inside-out rolls and crispy futomaki — from pure vegetable to the lightly torched signature roll with Japan Wagyu A4.',
    },
  },
  {
    id: 'bowls', seite: 'Sushi & More · Rolls', rubriken: ['Bowl'], nr: 'IV',
    h2: { de: 'Bowl<em>.</em>', en: 'Bowl<em>.</em>' },
    intro: {
      de: 'Sushi-Reis als Basis, das Beste aus See und Küche on top. Die schnellste Art, sich durchs halbe NEO zu essen.',
      en: 'Sushi rice as the base, the best of sea and kitchen on top. The fastest way to eat through half of NEO.',
    },
  },
  {
    id: 'maki', seite: 'Sushi & More · Rolls', rubriken: ['Maki'], nr: 'V',
    h2: { de: 'Maki<em>.</em>', en: 'Maki<em>.</em>' },
    intro: {
      de: 'Klassisch und reduziert, frisch gerollt. Die einfachste Art, sich durch die See zu probieren.',
      en: 'Classic and pared back, freshly rolled. The simplest way to taste your way through the sea.',
    },
  },
  {
    id: 'main-course', seite: 'Main', nr: 'VI',
    h2: { de: 'Main <em>Course.</em>', en: 'Main <em>Course.</em>' },
    intro: {
      de: 'Heilbutt und Lachsforelle, Hummer im Ramen, Schwein vom Duroc und vom galicischen Kastanienschwein — und für jeden eine vegetarische Antwort.',
      en: 'Halibut and salmon trout, lobster in ramen, Duroc and Galician chestnut-fed pork — and a vegetarian answer for everyone.',
    },
  },
  {
    id: 'beef', seite: 'Beef', nr: 'VII',
    // Website-Reihenfolge: erst alles zum Filet, dann die Steaks (in der Karte zwei Spalten nebeneinander)
    reihenfolge: ['Filet', 'Signature', '', 'Zu allen Filets', 'Steak', 'Zu allen Steaks'],
    h2: { de: 'Beef &amp; <em>Filet.</em>', en: 'Beef &amp; <em>Fillet.</em>' },
    intro: {
      de: 'Vier Rassen, drei Größen. Vom Black Angus über die toskanische Chianina und das Pommersche Simmentaler bis zum Wagyu — dazu Steaks und Japan Wagyu A4.',
      en: 'Four breeds, three sizes. From Black Angus to Tuscan Chianina and Pomeranian Simmental to Wagyu — plus steaks and Japan Wagyu A4.',
    },
  },
  {
    id: 'dry-aged', seite: 'Dry Aged & Bone', nr: 'VIII',
    h2: { de: 'Dry Aged <em>&amp; Bone.</em>', en: 'Dry Aged <em>&amp; Bone.</em>' },
    intro: {
      de: 'Trocken gereift am Knochen, drei bis vier Wochen im eigenen Humidor. Ab 600 g, Preis je 100 g.',
      en: 'Dry-aged on the bone, three to four weeks in our own humidor. From 600 g, price per 100 g.',
    },
    lead: { src: '/img/drya/humidor-detail.webp', de: 'Porterhouse-Cuts im Dry-Aged-Humidor des NEO', en: 'Porterhouse cuts in the NEO dry-aged humidor' },
  },
  {
    id: 'sides', seite: 'Side Dishes', nr: 'IX',
    h2: { de: 'Sides &amp; <em>Saucen.</em>', en: 'Sides &amp; <em>Sauces.</em>' },
    intro: {
      de: 'Fries mit Trüffel, cremiges Kartoffelgratin, Rosenkohl und Spitzkohl — und Saucen, die den Unterschied machen.',
      en: 'Fries with truffle, creamy potato gratin, Brussels sprouts and pointed cabbage — and sauces that make the difference.',
    },
  },
  {
    id: 'sweets', seite: 'Sweets', nr: 'X',
    h2: { de: 'Sweets &amp; <em>Desserts.</em>', en: 'Sweets &amp; <em>Desserts.</em>' },
    intro: {
      de: 'Der letzte Gang. Crème Brûlée, Birne Helene, Schokoladenkuchen mit flüssigem Kern — das süße Finale.',
      en: 'The final course. Crème brûlée, Pear Belle Hélène, chocolate cake with a molten centre — the sweet finale.',
    },
  },
];

const ANKER = ['#sharing', '#starter', '#sushi', '#rolls', '#bowls', '#maki', '#main-course', '#beef', '#dry-aged', '#sides', '#sweets'];

// ---------------------------------------------------------------------------------------------

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const feld = (o, k, lang) => (lang === 'en' ? o[k + '_en'] ?? o[k] : o[k]);

// „115 g · 13.00“ → „115 g · 13,00 €“, „100 g · 28.00   150 g · 36.00“ → „100 g · 28,00 € / 150 g · 36,00 €“
export function preis(s) {
  if (!s) return '';
  return s
    .split(/\s{3,}/)
    .map((teil) => teil.replace(/(\d+)\.(\d{2})(?!\d)/g, '$1,$2 €'))
    .join(' / ');
}

export function fotoFuer(id) {
  const f = id && fotos.gerichte[id];
  if (!f) return null;
  if (f.nr) return '/menu/w26-' + id.slice(2) + '.webp';
  return f.alt || null;
}

export function ortFoto(key) {
  if (!fotos.orte[key]) throw new Error('winterkarte: Ort-Foto fehlt: ' + key);
  return '/img/w26/' + key + '.webp';
}

function seite(titel) {
  const s = karte.seiten.find((x) => x.titel === titel);
  if (!s) throw new Error('winterkarte: Seite fehlt: ' + titel);
  return s;
}

// Schlüssel der Gänge des Sharing Menus (wie scripts/allergene-holen.mjs gangSchluessel)
const gangSchluessel = (name) =>
  'gang:' + String(name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ß/g, 'ss').replace(/[^a-z0-9²]+/g, ' ').trim().replace(/ /g, '-');

// Was der Gast zu einem Gericht liest. Mehrere Schlüssel (Dry Aged: Kotelett, T-Bone, Porterhouse
// einer Rasse in einer Zeile) werden vereinigt; fehlt einer, heißt es „bitte frag unser Team“.
export function allergenAngaben(schluessel) {
  const liste = [].concat(schluessel).map((k) => allergene.gerichte[k]);
  if (!liste.length || liste.some((g) => !g || !g.enthaelt.length)) return null;
  const enthaelt = new Set(liste.flatMap((g) => g.enthaelt));
  const kann = new Set(liste.flatMap((g) => g.kann).filter((a) => !enthaelt.has(a)));
  const sortiert = (m) => ALLERGEN_KURZ.filter((a) => m.has(a));
  return { enthaelt: sortiert(enthaelt), kann: sortiert(kann) };
}

export const allergenText = (kuerzel, lang) => kuerzel.map((a) => ALLERGEN_NAMEN[a][lang === 'en' ? 1 : 0]).join(', ');

// <details> je Gericht: geht ohne JavaScript, klappt nur dieses Gericht auf
export function allergenHtml(schluessel, lang, einzug = '        ') {
  const t = T[lang];
  const a = allergenAngaben(schluessel);
  const inhalt = a
    ? `<p><span class="allergene-art">${t.enthaelt}:</span> ${esc(allergenText(a.enthaelt, lang))}</p>${
        a.kann.length ? `<p><span class="allergene-art">${t.kann}:</span> ${esc(allergenText(a.kann, lang))}</p>` : ''
      }`
    : `<p>${t.fragen}</p>`;
  return `${einzug}<details class="allergene"><summary>${t.allergene}</summary><div class="allergene-text">${inhalt}</div></details>\n`;
}

function item(it, lang, x = {}) {
  const t = T[lang];
  const name = feld(it, 'name', lang);
  // x.allergene: Schlüssel (oder Liste), false = Zeile ohne eigenes Gericht; Standard die id
  const allergenSchluessel = x.allergene === undefined ? it.id : x.allergene;
  const bild = x.ohneBild ? null : fotoFuer(it.id);
  const sub = x.sub ?? feld(it, 'notiz', lang);
  const desc = x.desc ?? feld(it, 'beschr', lang);
  return `    <div class="item${bild ? '' : ' no-image'}">
${bild ? `      <img decoding="async" class="item-img" src="${bild}" alt="${esc(name)}" loading="lazy">\n` : ''}      <div class="item-text">
        <div class="item-head"><div class="item-name">${esc(x.name ?? name)}</div><div class="item-price">${esc(x.preis ?? preis(feld(it, 'preis', lang)))}</div></div>
${sub ? `        <div class="item-sub">${esc(sub)}</div>\n` : ''}${desc ? `        <div class="item-desc">${esc(desc)}</div>\n` : ''}${allergenSchluessel ? allergenHtml(allergenSchluessel, lang) : ''}      </div>
    </div>`;
}

const sichtbar = (r) => r.items.filter((i) => !i.weg);

function filetTabelle(r, lang) {
  const t = T[lang];
  const mitGroessen = sichtbar(r).filter((i) => (i.preis.match(/\d+ g ·/g) || []).length === 3);
  const rest = sichtbar(r).filter((i) => !mitGroessen.includes(i));
  const groessen = mitGroessen[0].preis.split(/\s{3,}/).map((p) => p.split(' · ')[0]);
  const zeilen = mitGroessen
    .map((i) => {
      const preise = i.preis.split(/\s{3,}/).map((p) => preis(p.split(' · ')[1]));
      const b = feld(i, 'beschr', lang);
      return `    <div class="filet-row">
      <div class="filet-cell"><div class="filet-name">${esc(feld(i, 'name', lang))}${b ? `<small>${esc(b)}</small>` : ''}</div>
${allergenHtml(i.id, lang)}      </div>
${preise.map((p) => `      <div class="filet-cell"><div class="filet-price"><strong>${p}</strong></div></div>`).join('\n')}
    </div>`;
    })
    .join('\n');
  return `  <div class="subcat">${esc(feld(r, 'titel', lang))}</div>
  <div class="filet-grid">
    <div class="filet-row filet-head">
      <div class="filet-cell">${t.rasse}</div>
${groessen.map((g) => `      <div class="filet-cell">${esc(g)}</div>`).join('\n')}
    </div>
${zeilen}
  </div>
${rest.length ? `  <div class="items">\n${rest.map((i) => item(i, lang)).join('\n')}\n  </div>\n` : ''}`;
}

function dryAgedRasse(r, lang) {
  const teile = sichtbar(r);
  const preisZeile =
    teile.map((i) => `${feld(i, 'name', lang)} ${(i.preis.match(/(\d+)\.(\d{2})$/) || []).slice(1).join(',')}`).join(' · ') + ' €';
  return item({ id: null, name: r.titel, name_en: r.titel_en }, lang, {
    allergene: teile.map((i) => i.id),
    preis: preisZeile,
    sub: feld(teile[0], 'beschr', lang),
    desc: feld(r, 'intro', lang),
  });
}

function rubrikenHtml(kap, lang) {
  const s = seite(kap.seite);
  let rubs = s.rubriken.filter((r) => !kap.rubriken || kap.rubriken.includes(r.titel));
  if (kap.reihenfolge) {
    const sortiert = kap.reihenfolge.map((titel) => rubs.find((r) => r.titel === titel));
    if (sortiert.some((r) => !r) || sortiert.length !== rubs.length) throw new Error('winterkarte: Reihenfolge passt nicht zur Karte: ' + kap.id);
    rubs = sortiert;
  }
  const t = T[lang];
  const teile = [];
  let gruppe = null; // offene <div class="items">
  const zu = () => {
    if (gruppe) teile.push(`  <div class="items">\n${gruppe.join('\n')}\n  </div>\n`);
    gruppe = null;
  };
  if (kap.id === 'dry-aged') {
    if (kap.lead) teile.push(`  <img decoding="async" class="item-img filet-lead dry-aged-lead" src="${kap.lead.src}" alt="${esc(kap.lead[lang])}" loading="lazy">\n`);
    teile.push(`  <div class="subcat">${t.dryAgedSub}</div>\n`);
    gruppe = rubs.filter((r) => r.stil === 'liste').map((r) => dryAgedRasse(r, lang));
    zu();
    return teile.join('');
  }
  let hinweis = '';
  for (const r of rubs) {
    const titel = feld(r, 'titel', lang);
    if (r.stil === 'trenner') continue;
    if (r.stil === 'hinweis') {
      hinweis = sichtbar(r).map((i) => feld(i, 'beschr', lang)).join(' ');
      continue;
    }
    if (r.titel === 'Filet') {
      zu();
      teile.push(filetTabelle(r, lang));
      continue;
    }
    if (r.stil === 'plus') {
      // „Zu allen Konserven“ usw. als Zeile ohne Bild in der vorigen Gruppe
      const it = sichtbar(r)[0];
      (gruppe ||= []).push(item({ id: null }, lang, { name: titel, preis: '', desc: feld(it, 'beschr', lang) }));
      continue;
    }
    if (r.stil === 'badge') {
      const it = sichtbar(r)[0];
      (gruppe ||= []).push(item(it, lang, { preis: '', allergene: false }));
      continue;
    }
    // Rubrik ohne Titel (z. B. Deluxe Hoch² unter Signature) hängt an der vorigen Gruppe
    if (titel) {
      zu();
      teile.push(`  <div class="subcat">${esc(titel)}</div>\n`);
      gruppe = [];
    }
    for (const it of sichtbar(r)) (gruppe ||= []).push(item(it, lang));
  }
  zu();
  if (hinweis) teile.push(`  <p class="menu-hinweis">${esc(hinweis)}</p>\n`);
  return teile.join('');
}

function kapitelHtml(kap, lang) {
  return `<section class="section" id="${kap.id}">
  <div class="section-head">
    <div>
      <div class="eyebrow">${T[lang].kapitel} ${kap.nr}</div>
      <h2>${kap.h2[lang]}</h2>
    </div>
    <p>${kap.intro[lang]}</p>
  </div>

${rubrikenHtml(kap, lang)}</section>
`;
}

// Sharing-Abschnitt (Speisekarte und Startseiten-Teaser)
export function sharingHtml(lang, { id = '', eyebrow, eyebrowTag = 'div', knopf, mitAllergenen = false }) {
  const t = T[lang];
  const s = seite('Sharing Menu');
  const gaenge = s.rubriken.find((r) => r.stil === 'gaenge').items;
  const preisItem = sichtbar(s.rubriken.find((r) => r.stil === 'liste'))[0];
  const betrag = (preisItem.preis.match(/(\d+)\.00$/) || [])[1];
  if (!betrag) throw new Error('winterkarte: Sharing-Preis nicht lesbar: ' + preisItem.preis);
  return `<section class="sharing"${id ? ` id="${id}"` : ''} data-lazy>
  <div class="sharing-inner">
    <${eyebrowTag} class="eyebrow">${eyebrow}</${eyebrowTag}>
    <h2>${t.sharingH2}</h2>
    <p class="lead">${t.sharingLead}</p>
    <div class="courses">
${gaenge.map((g) => `      <div class="course"><div class="course-num">${g.nr}</div><div class="course-name">${esc(feld(g, 'name', lang))}</div><div class="course-desc">${esc(feld(g, 'beschr', lang))}</div>${mitAllergenen ? allergenHtml(gangSchluessel(g.name), lang, '').trimEnd() : ''}</div>`).join('\n')}
    </div>
    <div class="sharing-price">
      <span class="label">${t.sharingLabel}</span>
      <span class="price">${betrag}<small>${t.proPerson}</small></span>
    </div>
    ${knopf}
  </div>
</section>
`;
}

const KNOPF = {
  de: `<a href="${RESERVIEREN}" target="_blank" rel="noopener" class="btn">Reservieren</a>`,
  en: `<a href="${RESERVIEREN}" target="_blank" rel="noopener" class="btn">Reserve</a>`,
};

// Die komplette Karte. cats: Kapitel-Leiste, download: PDF-Abschnitt am Ende.
export function karteHtml(lang, { cats = true, download = true, sharingEyebrow, sharingEyebrowTag = 'div', knopf = KNOPF[lang] } = {}) {
  const t = T[lang];
  const teile = [];
  if (cats) {
    teile.push(`<div class="cats">
  <div class="cats-scroll">
${t.chips.map((c, i) => `    <a href="${ANKER[i]}">${c}</a>`).join('\n')}
  </div>
</div>
`);
  }
  teile.push('\n<!-- SHARING -->\n');
  teile.push(sharingHtml(lang, { id: 'sharing', eyebrow: sharingEyebrow, eyebrowTag: sharingEyebrowTag, knopf, mitAllergenen: true }));
  // Hinweis + EIN Schalter für alle Allergene (Klick-Logik: app/Grundgeruest.js, ohne JS ausgeblendet)
  teile.push(`\n<div class="menu-legend"><p>${t.legende(allergene.stand)}</p><button type="button" class="allergene-schalter" aria-pressed="false" data-allergene-schalter>${t.alleAllergene}</button></div>\n`);
  for (const kap of KAPITEL) teile.push(kapitelHtml(kap, lang) + '\n');
  if (download) {
    const d = t.download;
    teile.push(`<!-- DOWNLOAD CTA -->
<section class="download-cta">
  <h3>${d.h3}</h3>
  <p>${d.p}</p>
  <div class="download-row">
${d.links.map(([h, l]) => `    <a href="${h}" target="_blank" rel="noopener" class="btn-outline">${l}</a>`).join('\n')}
  </div>
</section>
`);
  }
  return teile.join('');
}

export const KAPITEL_NAMEN = {
  de: ['Sharing Menu', 'Starter & Appetizer', 'Sushi & More', 'Sushi Rolls', 'Bowl', 'Maki', 'Main Course', 'Beef & Filet', 'Dry Aged & Bone', 'Sides & Saucen', 'Sweets & Desserts'],
  en: ['Sharing Menu', 'Starters & Appetizers', 'Sushi & More', 'Sushi Rolls', 'Bowl', 'Maki', 'Main Course', 'Beef & Fillet', 'Dry Aged & Bone', 'Sides & Sauces', 'Sweets & Desserts'],
};

const ersetze = (html, marke, inhalt) => {
  if (html.split(marke).length !== 2) throw new Error('winterkarte: Markierung fehlt oder doppelt: ' + marke);
  return html.replace(marke, () => inhalt);
};

// Startseiten-Teaser „Vier Gänge. Ein Abend.“ (Markierung <!--SHARING-TEASER--> in bodyHtml / bodyHtmlEn)
export function mitSharingTeaser(html, lang) {
  const knopf = `<a href="${RESERVIEREN}" target="_blank" rel="noopener" class="btn primary">${lang === 'en' ? 'Reserve now' : 'Jetzt reservieren'}</a>`;
  return ersetze(html, '<!--SHARING-TEASER-->', sharingHtml(lang, { eyebrow: 'Signature · Sharing Menu', knopf }));
}

// Komplette Karte (Markierung <!--WINTERKARTE--> in bodyHtml / bodyHtmlEn)
export function mitKarte(html, lang) {
  const inhalt =
    lang === 'en'
      ? karteHtml('en', { sharingEyebrow: 'Winter Menu 2026/27 · Sharing&nbsp;Menu' })
      : karteHtml('de', { sharingEyebrow: 'Speisekarte · Winter&nbsp;2026/27', sharingEyebrowTag: 'h1' });
  return ersetze(html, '<!--WINTERKARTE-->', inhalt);
}

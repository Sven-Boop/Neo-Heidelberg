// Anlass-Seiten für die Heidelberger Event-Suchen (Entwurf 17.10.2026, Zweig eventseiten):
// /eventlocation-heidelberg, /weihnachtsfeier, /firmenfeier.
// Jede Seite hat eigenes Server-HTML (kein Startseiten-Inhalt), Kopf und Fuß wie die übrige Seite,
// eine H1, FAQPage-, EventVenue- und BreadcrumbList-JSON-LD und das bestehende Anfrageformular
// (window.neoAnfrage → /api/anfrage) mit vorausgewähltem Anlass.
// Inhalte nur aus belegten Fakten (Website, Fakten-Mappe 17.10.2026). Nicht nennen: Winterkarte,
// Silvester, weitere Preise.
// Seit 17.10.2026 (Sven: „die neuen menü vorschläge können auch auf die seite neo“): Abschnitt
// „Menüvorschläge“ aus app/menuvorschlaege.json. Die Datei ist ein Abzug aus dem Werkzeug NEO Wintermenüs
// (kv nwm:stand) und wird nur mit `node scripts/menues-holen.mjs` erneuert, nie von Hand.
import { seitenHtml } from './seitenTeile';
import MENUES from './menuvorschlaege.json';

const BASIS = 'https://www.neo-heidelberg.de';
const TEL = '+49 (0) 6221 7239099';
const TEL_LINK = 'tel:+4962217239099';
const MAIL = 'info@neo-heidelberg.de';
const GUTSCHEIN =
  'https://www.gastroguide.de/api-v1/widget/voucher/?id=MjM2NjE4&amp;mode=widgetLayer&amp;font=TGF0bw==&amp;mainColor=AAC8DA&amp;value=0&amp;darkMode=0';

// Optionen genau wie im Startseiten-Formular (die Mail an info@ nennt den Anlass im Betreff)
const ANLAESSE = [
  'Firmenfeier / Firmen-Event',
  'Weihnachtsfeier',
  'Private Feier / Geburtstag',
  'Hochzeit',
  'Gruppe / größerer Tisch',
  'Sonstiges',
];

// Räume (Texte nah an der Website: Hochzeitsseite N° 01–03, Bar-Abschnitt, FAQ)
const RAEUME = {
  restaurant: {
    name: 'Das <em>Restaurant</em>',
    text: 'Der Hauptraum in der Halle: Sichtbeton, Stahlträger, offene Küche, der Dry-Aged-Humidor im Blick. Lange Tafeln fürs Dinner, danach Platz zum Tanzen. Das komplette Restaurant ist exklusiv buchbar.',
    bild: '/img/gallery/neo-b-08568.webp',
    alt: 'Lange Tafeln in der Halle des NEO',
  },
  bar: {
    name: 'Die <em>Bar</em>',
    text: 'Hauseigene Infusionen, klassische Signatures, saisonale Kreationen, dazu eine Weinkarte mit Tiefe. Die Bar ist exklusiv buchbar für private Events, Firmen-Apéros und After-Work und hat immer ein bisschen länger auf als die Küche.',
    bild: '/img/gallery/neo-b-08553.webp',
    alt: 'Bar-Lounge im NEO am Abend',
  },
  // Winterfoto aus dem Shooting „NEO - WINTERKARTE 26’“ (#412, app/winterkarte/fotos.json → orte.chalet-raum)
  chalet: {
    name: 'Das <em>Chalet</em>',
    zeit: 'Im Winter',
    text: 'Im Winter wird die Terrasse zum Chalet: Holz, Felle und warmes Licht, für Gruppen und Feiern bis zu 80 Gäste.',
    bild: '/img/w26/chalet-raum.webp',
    alt: 'Das Chalet des NEO im Winter',
  },
  garten: {
    name: 'Terrasse <em>&amp; Garten</em>',
    zeit: 'Mai bis September',
    text: 'Die grüne Oase im Zollhofgarten: Aperitif unter freiem Himmel, Gartenparty bis in den Abend, freie Trauung unter Bäumen. Terrasse und Garten sind auch exklusiv buchbar.',
    bild: '/img/gallery/garten-panorama.webp',
    alt: 'Der Garten des NEO im Zollhofgarten',
  },
};

const KUECHE = {
  eyebrow: 'Küche und Bar',
  h2: 'Steak, Sushi, <em>Infusionen.</em>',
  text: [
    'Unser Fleisch reift drei bis vier Wochen im eigenen Humidor, trocken und am Knochen: Angus, Chianina, Wagyu, Rubia Gallega. Daneben wird californisches Sushi von Hand gerollt, auf Bestellung.',
    'An der Bar gibt es hauseigene Infusionen, klassische Signatures und saisonale Kreationen. Vegetarisch und vegan geht selbstverständlich auch, bis hin zu rein pflanzlichen Gängen.',
    'Was davon zu eurem Abend passt, stellen wir mit euch zusammen. Küche, Bar, Service und Technik kommen aus dem Haus.',
  ],
  bilder: [
    { src: '/img/drya/humidor-detail.webp', alt: 'Porterhouse-Cuts im Dry-Aged-Humidor des NEO', w: 1500, h: 1125 },
    { src: '/img/Neo_Gerichte_by_SelinaGargiullo-00565.webp', alt: 'Sashimi-Platte aus der Sushi-Küche des NEO', w: 1500, h: 1000 },
  ],
};

// Gemeinsame Fragen (Antworten nah am FAQ der Startseite)
const F = {
  gaeste: {
    q: 'Wie viele Gäste passen ins NEO?',
    a: 'Bis 199 Gäste, innen und außen. Ihr könnt exklusiv die Terrasse mit Garten buchen, das komplette Restaurant oder das ganze Haus. Terrasse und Garten gibt es von Mai bis September.',
  },
  lage: {
    q: 'Wo liegt das NEO?',
    a: 'Am Zollhofgarten 2 in der Heidelberger Bahnstadt, in einer Halle im ehemaligen Güterbahnhof, nahe dem Hauptbahnhof.',
  },
  bar: {
    q: 'Können wir nur die Bar buchen?',
    a: 'Ja. Die Bar ist exklusiv buchbar für private Events, Firmen-Apéros und After-Work, auf Anfrage.',
  },
  essen: {
    q: 'Was gibt es zu essen?',
    a: 'Was zu eurem Anlass passt, aus der eigenen Küche: Dry-Aged-Steaks aus dem Humidor, handgerolltes Sushi und mehr. Für den Winter gibt es feste <a href="#menuevorschlaege">Menüvorschläge</a>, sonst stellen wir euch das Angebot zusammen.',
  },
  veggie: {
    q: 'Gibt es vegetarische und vegane Gerichte?',
    a: 'Selbstverständlich. Veggie Rolls, exotische Bowls, hausgemachte Tempura, saisonale Gemüse-Hauptgänge, auch rein pflanzlich.',
  },
  musik: {
    q: 'Gibt es Musik?',
    a: 'Ja, DJ oder Live-Band, ganz nach Wunsch.',
  },
  ansehen: {
    q: 'Können wir uns das NEO vorher ansehen?',
    a: `Gern, auf Termin. Schreibt uns über das Formular oder ruft an: <a href="${TEL_LINK}">06221 7239099</a>.`,
  },
  anfrage: {
    q: 'Wie läuft die Anfrage?',
    a: 'Erzählt uns kurz Anlass, Wunschdatum und ungefähre Gästezahl. Wir melden uns mit einem Vorschlag.',
  },
};

export const ANLASS_SEITEN = {
  eventlocation: {
    slug: 'eventlocation-heidelberg',
    id: 'page-eventlocation',
    navLabel: 'Eventlocation',
    title: 'Eventlocation Heidelberg · NEO in der Bahnstadt',
    description:
      'Eventlocation in Heidelberg für bis 199 Gäste: Halle im ehemaligen Güterbahnhof nahe dem Hauptbahnhof, Bar, Terrasse und Garten. Dry-Aged, Sushi, DJ.',
    eyebrow: 'Eventlocation · Bahnstadt · bis&nbsp;199&nbsp;Gäste',
    h1: 'Event&shy;location in <em>Heidelberg.</em>',
    heroBild: '/img/gallery/neo-b-08559.webp',
    heroPos: 'center 45%',
    lead: 'Eine Halle im ehemaligen Güterbahnhof der Bahnstadt, nahe dem Hauptbahnhof. Darin Restaurant und Bar, davor Terrasse und Garten im Zollhofgarten. Bis 199 Gäste, innen und außen.',
    intro: {
      eyebrow: 'Das Haus',
      h2: 'Das ganze NEO <em>für euch.</em>',
      text: [
        'Das NEO ist Bar und Restaurant in einer alten Industriehalle, seit 2016 in der Bahnstadt. Sichtbeton, Stahlträger, offene Küche, der Dry-Aged-Humidor im Blick. Kein klassisches Restaurant und kein Sushi-Laden, beides unter einem Dach.',
        'Ihr bucht, was zu eurem Anlass passt: exklusiv die Terrasse mit Garten, das komplette Restaurant oder das ganze Haus. Für den kleineren Rahmen gibt es die Bar exklusiv.',
      ],
    },
    raeume: ['restaurant', 'bar', 'chalet', 'garten'],
    raeumeH2: 'Drei Bereiche, <em>ein Haus.</em>',
    anlaesse: true,
    menues: 'kurz',
    faq: [F.gaeste, F.lage, F.bar, F.essen, F.musik, F.ansehen, F.anfrage],
    form: {
      anlass: 'Firmenfeier / Firmen-Event',
      quelle: 'Seite Eventlocation',
      h2: 'Erzählt uns, <em>was ihr vorhabt.</em>',
    },
    venueText:
      'Eventlocation in der Heidelberger Bahnstadt: Halle im ehemaligen Güterbahnhof nahe dem Hauptbahnhof mit Restaurant, Bar, Terrasse und Garten (Mai bis September). Bis 199 Gäste.',
    weiter: ['firmenfeier', 'weihnachtsfeier', 'hochzeit'],
  },

  weihnachtsfeier: {
    slug: 'weihnachtsfeier',
    id: 'page-weihnachtsfeier',
    navLabel: 'Weihnachtsfeier',
    title: 'Weihnachtsfeier Location Heidelberg · NEO Bahnstadt',
    description:
      'Weihnachtsfeier in Heidelberg im NEO: Halle im ehemaligen Güterbahnhof nahe dem Hauptbahnhof, bis 199 Gäste. Dry-Aged, Sushi, Bar mit eigenen Infusionen, DJ.',
    eyebrow: 'Weihnachtsfeier · Bahnstadt · bis&nbsp;199&nbsp;Gäste',
    h1: 'Weihnachts&shy;feier in <em>Heidelberg.</em>',
    heroBild: '/img/gallery/neo-b-08592.webp',
    heroPos: 'center 55%',
    lead: 'Eure Weihnachtsfeier in der Halle im ehemaligen Güterbahnhof, nahe dem Hauptbahnhof: Dinner an langen Tafeln, danach an die Bar, später legt der DJ auf. Bis 199 Gäste.',
    intro: {
      eyebrow: 'Dezember im NEO',
      h2: 'Ein Abend, <em>ein Haus.</em>',
      text: [
        'Gefeiert wird im Restaurant unter den Stahlträgern der Halle, mit offener Küche und dem Dry-Aged-Humidor im Blick, und an der Bar, die immer ein bisschen länger aufhat als die Küche.',
        'Ihr bucht, was zu eurem Team passt: die Bar exklusiv für den Apéro nach Feierabend, das komplette Restaurant oder das ganze Haus.',
        'Freie Termine im Dezember nennen wir euch auf Anfrage. Wunschdatum und ungefähre Gästezahl genügen.',
      ],
    },
    raeume: ['restaurant', 'bar', 'chalet'],
    raeumeH2: 'Restaurant <em>und Bar.</em>',
    menues: 'voll',
    faq: [
      {
        q: 'Wie viele Personen passen zur Weihnachtsfeier ins NEO?',
        a: 'Bis 199 Gäste. Ihr könnt die Bar exklusiv buchen, das komplette Restaurant oder das ganze Haus.',
      },
      {
        q: 'Welche Termine sind im Dezember noch frei?',
        a: 'Das sagen wir euch auf Anfrage. Schickt uns Wunschdatum und Gästezahl über das Formular, wir melden uns mit einem Vorschlag.',
      },
      F.essen,
      F.veggie,
      F.musik,
      {
        q: 'Gibt es Gutscheine als Geschenk fürs Team?',
        a: `Ja, <a href="${GUTSCHEIN}" target="_blank" rel="noopener">NEO-Gutscheine</a> per E-Mail in jeder Höhe, auch kurzfristig. Einlösbar auf alles im NEO: Essen, Drinks, Events.`,
      },
      F.lage,
    ],
    form: {
      anlass: 'Weihnachtsfeier',
      quelle: 'Seite Weihnachtsfeier',
      h2: 'Freie Termine <em>anfragen.</em>',
    },
    venueText:
      'Weihnachtsfeier-Location in der Heidelberger Bahnstadt: Restaurant und Bar in einer Halle im ehemaligen Güterbahnhof nahe dem Hauptbahnhof. Bis 199 Gäste.',
    weiter: ['firmenfeier', 'eventlocation', 'hochzeit'],
  },

  firmenfeier: {
    slug: 'firmenfeier',
    id: 'page-firmenfeier',
    navLabel: 'Firmenfeier',
    title: 'Firmenfeier Location Heidelberg · NEO Bahnstadt',
    description:
      'Firmenfeier in Heidelberg im NEO: bis 199 Gäste in Halle, Bar, Terrasse und Garten, nahe dem Hauptbahnhof. Dry-Aged, Sushi, Bar exklusiv für After-Work.',
    eyebrow: 'Firmenfeier · Bahnstadt · bis&nbsp;199&nbsp;Gäste',
    h1: 'Firmenfeier in <em>Heidelberg.</em>',
    heroBild: '/img/gallery/glasfassade.webp',
    heroPos: 'center 50%',
    lead: 'Das ganze NEO für euer Team: eine Halle im ehemaligen Güterbahnhof der Bahnstadt, nahe dem Hauptbahnhof. Bis 199 Gäste, innen und außen, von Mai bis September mit Terrasse und Garten.',
    intro: {
      eyebrow: 'Für Firmen',
      h2: 'Vom Apéro bis <em>zum ganzen Haus.</em>',
      text: [
        'Nicht jedes Firmen-Event braucht das ganze Haus. Für den Apéro nach Feierabend oder das After-Work bucht ihr die Bar exklusiv, mit hauseigenen Infusionen und einer Weinkarte mit Tiefe.',
        'Für die große Feier nehmt ihr das komplette Restaurant, von Mai bis September die Terrasse mit Garten, oder gleich das ganze NEO. DJ oder Live-Band gibt es nach Wunsch.',
        'Küche, Bar, Service und Technik kommen aus dem Haus.',
      ],
    },
    raeume: ['restaurant', 'bar', 'chalet', 'garten'],
    raeumeH2: 'Drei Bereiche, <em>ein Haus.</em>',
    menues: 'voll',
    faq: [
      F.gaeste,
      F.bar,
      {
        q: 'Können wir im Sommer draußen feiern?',
        a: 'Von Mai bis September gehören Terrasse und Garten im Zollhofgarten dazu, auf Wunsch auch exklusiv.',
      },
      F.essen,
      F.veggie,
      F.musik,
      F.lage,
    ],
    form: {
      anlass: 'Firmenfeier / Firmen-Event',
      quelle: 'Seite Firmenfeier',
      h2: 'Euer Firmen-Event <em>anfragen.</em>',
    },
    venueText:
      'Location für Firmenfeiern in der Heidelberger Bahnstadt: Halle im ehemaligen Güterbahnhof nahe dem Hauptbahnhof mit Restaurant, Bar, Terrasse und Garten (Mai bis September). Bis 199 Gäste.',
    weiter: ['weihnachtsfeier', 'eventlocation', 'hochzeit'],
  },
};

// Weiterführende Zeilen (auch /hochzeit, die nicht in ANLASS_SEITEN steht)
const ZEILEN = {
  eventlocation: { href: '/eventlocation-heidelberg', name: 'Eventlocation', text: 'Das ganze Haus im Überblick: Restaurant, Bar, Terrasse und Garten, bis 199 Gäste.' },
  firmenfeier: { href: '/firmenfeier', name: 'Firmenfeier', text: 'Das ganze NEO für euer Team, oder die Bar exklusiv für Apéro und After-Work.' },
  weihnachtsfeier: { href: '/weihnachtsfeier', name: 'Weihnachtsfeier', text: 'Dinner an langen Tafeln, danach an die Bar, später der DJ.' },
  hochzeit: { href: '/hochzeit', name: 'Hochzeit', text: 'Freie Trauung im Garten (Mai bis September), Hochzeitsmenü mit drei Gängen ab 52 € pro Person.' },
};

// Anlässe auf der Eventlocation-Seite: eigene Seiten oder Formular mit vorausgewähltem Anlass
const ANLASS_ZEILEN = [
  ZEILEN.firmenfeier,
  ZEILEN.weihnachtsfeier,
  ZEILEN.hochzeit,
  { href: '#anfrage', anlass: 'Private Feier / Geburtstag', name: 'Geburtstag &amp; private Feier', text: 'Vom runden Geburtstag bis zur großen Runde: erzählt uns, was ihr vorhabt.' },
  { href: '#anfrage', anlass: 'Firmenfeier / Firmen-Event', name: 'Apéro &amp; After-Work', text: 'Die Bar exklusiv, mit hauseigenen Infusionen.' },
  { href: '#anfrage', anlass: 'Gruppe / größerer Tisch', name: 'Gruppen', text: 'Der größere Tisch im Restaurant, ohne gleich das Haus zu buchen.' },
];

const ohneTags = (s) =>
  s.replace(/<[^>]*>/g, '').replace(/&shy;/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

function zeilenHtml(zeilen) {
  return zeilen
    .map(
      (z) =>
        `<li><a class="ev-zeile" href="${z.href}"${z.anlass ? ` data-anlass="${z.anlass}"` : ''}><span class="ev-zeile-name">${z.name}</span><span class="ev-zeile-text">${z.text}</span><span class="ev-zeile-pfeil" aria-hidden="true">→</span></a></li>`
    )
    .join('\n      ');
}

function formularHtml(s) {
  const optionen = ANLAESSE.map((a) => `<option value="${a}"${a === s.form.anlass ? ' selected' : ''}>${a}</option>`).join('');
  return `<section class="anfrage-form-section ev-anfrage" id="anfrage">
  <div class="af-intro">
    <div class="eyebrow">Anfrage</div>
    <h2>${s.form.h2}</h2>
    <p>Anlass, Wunschdatum und ungefähre Gästezahl genügen für den ersten Schritt. Wir melden uns mit einem Vorschlag.</p>
    <p class="af-alt">Lieber per E-Mail? <a href="mailto:${MAIL}?subject=${encodeURIComponent('Anfrage NEO Heidelberg – ' + s.navLabel)}">${MAIL}</a><br>Oder telefonisch: <a href="${TEL_LINK}">${TEL}</a></p>
  </div>
  <form class="af-form" id="anfrage-form" onsubmit="return window.neoAnfrage(event)">
      <div class="af-grid">
        <label class="af-field af-anlass"><span>Anlass</span><select name="anlass">${optionen}</select></label>
        <label class="af-field af-half"><span>Name *</span><input type="text" name="name" autocomplete="name" maxlength="120" placeholder="Vor- und Nachname" required></label>
        <label class="af-field af-half"><span>E-Mail *</span><input type="email" name="mail" autocomplete="email" maxlength="200" placeholder="name@beispiel.de" required></label>
        <label class="af-field af-third"><span>Telefon</span><input type="tel" name="telefon" autocomplete="tel" maxlength="60" placeholder="optional"></label>
        <label class="af-field af-third"><span>Wunschdatum</span><input type="date" name="datum"></label>
        <label class="af-field af-third"><span>Gäste</span><input type="number" name="gaeste" min="1" max="999" inputmode="numeric" placeholder="z. B. 40"></label>
        <label class="af-field af-full"><span>Nachricht</span><textarea name="nachricht" rows="4" maxlength="5000" placeholder="Was habt ihr vor? Uhrzeit, Budget, Wünsche …"></textarea></label>
      </div>
      <div class="af-honey" aria-hidden="true"><label>Bitte dieses Feld leer lassen<input type="text" name="_honey" tabindex="-1" autocomplete="off"></label></div>
      <input type="hidden" name="quelle" value="${s.form.quelle}">
      <input type="hidden" name="lang" value="de">
      <div class="af-foot">
        <button type="submit" class="btn primary af-submit">Anfrage senden</button>
        <p class="af-note">Eure Angaben nutzen wir nur, um die Anfrage zu bearbeiten. Mehr dazu in der <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
      </div>
      <div class="af-status" role="status" aria-live="polite"></div>
    </form>
</section>`;
}

function raeumeHtml(s) {
  const zeilen = s.raeume
    .map((k) => {
      const r = RAEUME[k];
      return `<article class="ev-raum">
      <figure class="ev-raum-bild"><img src="${r.bild}" alt="${r.alt}" width="1600" height="1200" loading="lazy" decoding="async"></figure>
      <div class="ev-raum-text">
        <h3>${r.name}</h3>
        ${r.zeit ? `<p class="ev-saison">${r.zeit}</p>` : ''}
        <p>${r.text}</p>
      </div>
    </article>`;
    })
    .join('\n    ');
  return `<section class="ev-abschnitt">
  <div class="ev-innen">
    <div class="ev-kopf">
      <div class="eyebrow">Räume</div>
      <h2 class="ev-h2">${s.raeumeH2}</h2>
    </div>
    ${zeilen}
  </div>
</section>`;
}

// ===== Menüvorschläge (Abzug aus dem Werkzeug NEO Wintermenüs, app/menuvorschlaege.json) =====
const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Alle Menüs in einer Gruppe, Reihenfolge wie im Werkzeug. Sven 19.10.2026: „die Menüs gibt es in jedem Raum,
// egal ob Chalet oder NEO“ – keine Trennung mehr nach Restaurant und Chalet.
const MENUE_GRUPPEN = [{ name: 'Im Restaurant und im Chalet', menues: MENUES.menues }].filter((g) => g.menues.length);
const menueWert = (m) => `${m.titel} (${[m.preis, m.preisZusatz].filter(Boolean).join(' ')})`;

function menueAnfrageLink(m, text = 'Dieses Menü anfragen') {
  return `<a href="#anfrage" class="ev-menue-anfrage" data-menue="${esc(menueWert(m))}" aria-label="${esc(text)}: ${esc(m.titel)}">${esc(text)}</a>`;
}

function preisHtml(m) {
  return `<span class="ev-menue-preis"><span class="ev-menue-betrag">${esc(m.preis)}</span>${m.preisZusatz ? `<span class="ev-menue-zusatz">${esc(m.preisZusatz)}</span>` : ''}</span>`;
}

function gaengeHtml(m) {
  return m.bloecke
    .map((b) => {
      if (b.art === 'rubrik') return `<li class="ev-gang-rubrik">${esc(b.titel)}</li>`;
      if (b.art === 'notiz') return `<li class="ev-gang-notiz">${esc(b.text)}</li>`;
      return `<li class="ev-gang${b.oder ? ' ev-gang-oder' : ''}"><span class="ev-gang-nr">${b.oder ? 'oder' : esc(b.nr)}</span><span class="ev-gang-text"><span class="ev-gang-name">${esc(b.name)}</span>${b.beschreibung ? `<span class="ev-gang-sub">${esc(b.beschreibung)}</span>` : ''}</span>${b.preis ? `<span class="ev-gang-preis">${esc(b.preis)}</span>` : ''}</li>`;
    })
    .join('');
}

function menueVollHtml(m, offen) {
  return `<details class="ev-menue" id="menue-${esc(m.id)}"${offen ? ' open' : ''}>
        <summary><span class="ev-menue-kopf"><h3 class="ev-menue-name">${esc(m.titel)}</h3>${m.zeilen.length ? `<span class="ev-menue-zeilen">${m.zeilen.map(esc).join(' · ')}</span>` : ''}</span>${preisHtml(m)}</summary>
        <div class="ev-menue-inhalt">
          <ol class="ev-gaenge">${gaengeHtml(m)}</ol>
          ${m.option ? `<p class="ev-menue-option">${esc(m.option)}</p>` : ''}
          ${menueAnfrageLink(m)}
        </div>
      </details>`;
}

function menueKurzHtml(m) {
  return `<li><a class="ev-menue-zeile" href="#anfrage" data-menue="${esc(menueWert(m))}" aria-label="Menü anfragen: ${esc(m.titel)}"><span class="ev-menue-kopf"><span class="ev-menue-name">${esc(m.titel)}</span>${m.zeilen.length ? `<span class="ev-menue-zeilen">${m.zeilen.map(esc).join(' · ')}</span>` : ''}</span>${preisHtml(m)}</a></li>`;
}

function menuesHtml(s) {
  if (!s.menues || !MENUE_GRUPPEN.length) return '';
  const voll = s.menues === 'voll';
  const gruppen = MENUE_GRUPPEN.map(
    (g, gi) => `<div class="ev-menue-gruppe">
      <p class="ev-menue-gruppe-name">${g.name}</p>
      ${voll ? g.menues.map((m, i) => menueVollHtml(m, gi === 0 && i === 0)).join('\n      ') : `<ul class="ev-menue-liste">${g.menues.map(menueKurzHtml).join('')}</ul>`}
    </div>`
  ).join('\n    ');
  return `
<section class="ev-abschnitt ev-menues" id="menuevorschlaege">
  <div class="ev-innen ev-zwei">
    <div class="ev-menues-links">
      <div class="eyebrow">Menüvorschläge · Winter 2026/27</div>
      <h2 class="ev-h2">Menüs für <em>eure Runde.</em></h2>
      <div class="ev-text">
        <p>${voll ? 'Fest zusammengestellt, Preise pro Person. Passt ein Menü, übernehmt es mit einem Klick in eure Anfrage.' : 'Für die Wintersaison gibt es feste Menüs, Preise pro Person. Antippen übernimmt das Menü in eure Anfrage.'}</p>
        ${voll ? '' : '<p class="ev-link"><a href="/weihnachtsfeier#menuevorschlaege">Alle Gänge ansehen</a></p>'}
      </div>
      <p class="ev-baukasten"><a href="/menue-baukasten" class="btn">Menü selbst zusammenstellen</a></p>
    </div>
    <div class="ev-menues-rechts">
    ${gruppen}
    </div>
  </div>
</section>`;
}

function inhaltHtml(s) {
  const fakten = [
    ['Gäste', 'bis 199, innen und außen'],
    ['Bereiche', s.raeume.includes('garten') ? 'Restaurant, Bar, Terrasse und Garten (Mai bis September)' : 'Restaurant und Bar'],
    ['Exklusiv', s.raeume.includes('garten') ? 'die Bar, die Terrasse mit Garten, das komplette Restaurant oder das ganze Haus' : 'die Bar, das komplette Restaurant oder das ganze Haus'],
    ['Küche', 'Dry-Aged-Steaks aus dem eigenen Humidor, handgerolltes Sushi'],
    ['Musik', 'DJ oder Live-Band nach Wunsch'],
    ['Lage', 'Zollhofgarten 2, 69115 Heidelberg · Bahnstadt, nahe dem Hauptbahnhof'],
  ];
  const weiter = s.weiter.map((k) => ZEILEN[k]);
  return `<div class="subpage active ev-seite" id="${s.id}">
<a href="/" class="back-link">← Zurück zur Startseite</a>
<header class="hero ev-hero">
  <div class="hero-bg" style="background-image:url('${s.heroBild}');background-position:${s.heroPos}"></div>
  <div class="hero-content">
    <nav class="ev-pfad" aria-label="Brotkrumen"><a href="/">NEO Heidelberg</a><span aria-hidden="true">/</span><span aria-current="page">${s.navLabel}</span></nav>
    <div class="eyebrow hero-eyebrow">${s.eyebrow}</div>
    <h1>${s.h1}</h1>
    <p class="ev-lead">${s.lead}</p>
    <div class="hero-ctas">
      <a href="#anfrage" class="btn primary">Anfrage stellen</a>
      ${s.menues && MENUE_GRUPPEN.length ? '<a href="#menuevorschlaege" class="btn">Menüvorschläge</a>' : ''}
      <a href="${TEL_LINK}" class="btn">06221 7239099</a>
    </div>
  </div>
  <a href="https://bliss-group.de" target="_blank" rel="noopener" class="hero-bliss">Ein Haus der BLISS&nbsp;Group</a>
</header>

<section class="ev-abschnitt">
  <div class="ev-innen ev-zwei">
    <div>
      <div class="eyebrow">${s.intro.eyebrow}</div>
      <h2 class="ev-h2">${s.intro.h2}</h2>
    </div>
    <div class="ev-text">
      ${s.intro.text.map((t) => `<p>${t}</p>`).join('\n      ')}
      <dl class="ev-fakten">
        ${fakten.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('\n        ')}
      </dl>
    </div>
  </div>
</section>

${raeumeHtml(s)}
${
  s.anlaesse
    ? `
<section class="ev-abschnitt">
  <div class="ev-innen ev-zwei">
    <div>
      <div class="eyebrow">Anlässe</div>
      <h2 class="ev-h2">Wofür <em>ihr kommt.</em></h2>
    </div>
    <div>
      <ul class="ev-liste">
      ${zeilenHtml(ANLASS_ZEILEN)}
      </ul>
      <p class="ev-notiz">Sonntags ab 16 Uhr ist Family Day: ihr esst in Ruhe, eure Kinder werden betreut (durch Grinsebacke, auf Anfrage).</p>
    </div>
  </div>
</section>
`
    : ''
}
<section class="ev-abschnitt">
  <div class="ev-innen ev-zwei">
    <div>
      <div class="eyebrow">${KUECHE.eyebrow}</div>
      <h2 class="ev-h2">${KUECHE.h2}</h2>
    </div>
    <div class="ev-text">
      ${KUECHE.text.map((t) => `<p>${t}</p>`).join('\n      ')}
      <p class="ev-link"><a href="/speisekarte">Zur Speisekarte</a>${s.menues ? '<a href="#menuevorschlaege">Zu den Menüvorschlägen</a>' : ''}</p>
    </div>
  </div>
  <div class="ev-bildpaar ev-innen">
    ${KUECHE.bilder.map((b) => `<figure><img src="${b.src}" alt="${b.alt}" width="${b.w}" height="${b.h}" loading="lazy" decoding="async"></figure>`).join('\n    ')}
  </div>
</section>
${menuesHtml(s)}

<section class="faq ev-faq">
  <div class="faq-head">
    <div class="eyebrow">Häufige Fragen</div>
    <h2>Gut zu <em>wissen.</em></h2>
    <p>Und wenn eure Frage fehlt: schreibt uns an <a href="mailto:${MAIL}">${MAIL}</a>.</p>
  </div>
  <div class="faq-list">
    ${s.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n    ')}
  </div>
</section>

${formularHtml(s)}

<section class="ev-abschnitt ev-weiter" aria-label="Weitere Anlässe">
  <div class="ev-innen ev-zwei">
    <div>
      <div class="eyebrow">Weitere Anlässe</div>
    </div>
    <ul class="ev-liste">
      ${zeilenHtml(weiter)}
    </ul>
  </div>
</section>
</div>
`;
}

export function anlassHtml(key) {
  return seitenHtml(inhaltHtml(ANLASS_SEITEN[key]));
}

export function anlassMetadata(key) {
  const s = ANLASS_SEITEN[key];
  const url = `${BASIS}/${s.slug}`;
  const bild = `${BASIS}/img/og-neo.jpg`;
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', locale: 'de_DE', siteName: 'NEO Bar & Restaurant', url, title: s.title, description: s.description, images: [{ url: bild, width: 1200, height: 630 }] },
    twitter: { card: 'summary_large_image', title: s.title, description: s.description, images: [bild] },
  };
}

const ADRESSE = {
  '@type': 'PostalAddress',
  streetAddress: 'Zollhofgarten 2',
  addressLocality: 'Heidelberg',
  postalCode: '69115',
  addressRegion: 'Baden-Württemberg',
  addressCountry: 'DE',
};

export function brotkrumenLd(name, pfad) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'NEO Heidelberg', item: `${BASIS}/` },
      { '@type': 'ListItem', position: 2, name, item: `${BASIS}${pfad}` },
    ],
  };
}

export function veranstaltungsortLd({ url, name, beschreibung, bilder, garten = true }) {
  const merkmale = ['Restaurant', 'Bar, exklusiv buchbar'];
  if (garten) merkmale.push('Terrasse und Garten (Mai bis September)');
  merkmale.push('DJ oder Live-Band nach Wunsch');
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    '@id': `${url}#ort`,
    name,
    description: beschreibung,
    url,
    image: bilder.map((b) => BASIS + b),
    telephone: '+4962217239099',
    email: MAIL,
    address: ADRESSE,
    geo: { '@type': 'GeoCoordinates', latitude: 49.4018, longitude: 8.6722 },
    hasMap: 'https://www.google.com/maps/place/?q=place_id:ChIJyxpN_9nAl0cREjZrk-L4pM4',
    maximumAttendeeCapacity: 199,
    amenityFeature: merkmale.map((m) => ({ '@type': 'LocationFeatureSpecification', name: m, value: true })),
    containedInPlace: { '@id': `${BASIS}/#restaurant` },
  };
}

export function anlassLd(key) {
  const s = ANLASS_SEITEN[key];
  const url = `${BASIS}/${s.slug}`;
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: ohneTags(f.a) } })),
  };
  const ort = veranstaltungsortLd({
    url,
    name: `NEO Bar & Restaurant · ${s.navLabel} Heidelberg`,
    beschreibung: s.venueText,
    bilder: [s.heroBild, ...s.raeume.map((k) => RAEUME[k].bild)],
    garten: s.raeume.includes('garten'),
  });
  return [ort, faq, brotkrumenLd(s.navLabel, `/${s.slug}`)].map((o) => JSON.stringify(o));
}

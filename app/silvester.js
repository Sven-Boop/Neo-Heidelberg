// Silvester 2026 „Paris meets San Sebastián“ (Entwurf 06.11.2026, Zweig silvester-2026, Sven: „ja, auch NEO“).
// Seiten: /silvester (deutsch) und /en/new-years-eve (englisch), dazu ein Hinweis auf beiden Startseiten
// (Markierung <!--SILVESTER-TEASER--> in app/bodyHtml.js und app/(en)/en/bodyHtmlEn.js).
//
// Menütexte WÖRTLICH aus Development/neo-wintermenues/silvester.html (const START, _v:17, Karten
// „silvester“ und „silvester-veg“), englisch aus weihnachtsmenues-en.html (gleiche Karten). Svens Texte,
// nicht umformulieren; bei Änderungen am Menü dort ändern und hier nachziehen.
// Nicht nennen: Anzahl der Plätze.
// Ohne Import aus seitenTeile.js (der Hinweis wird dort in die Startseite gesetzt, sonst Ring-Import);
// die ganzen Seiten setzt app/seitenTeile.js zusammen (silvesterHtml, silvesterHtmlEn).

const BASIS = 'https://www.neo-heidelberg.de';
// Gastronaut öffnet den 31.12. mit dem Silvester-Ticket (Zahlung vorab). Wie alle Reservierungslinks der
// Seite in neuem Tab (target _blank); das Einwilligungs-Skript zählt den Klick als Ereignis „reservierung“.
export const SILVESTER_BUCHEN = 'https://reservation.gastronaut.ai/neo-heidelberg?date=2026-12-31&occassion=silvester&guests=2';
// Sichtbare Buchen-Knöpfe mit Kennung „website“ (Links je Kanal im Werbepaket, Sven 06.11.2026: „mach alles“); Gastronaut öffnet damit genauso.
// Seit 07.11.2026 je Stelle und Sprache unterscheidbar: utm_medium startseite/silvesterseite, utm_content de/en.
const buchenHref = (t, wo) =>
  (SILVESTER_BUCHEN + `&utm_source=website&utm_medium=${wo}&utm_campaign=silvester2026&utm_content=${t.pfad === '/silvester' ? 'de' : 'en'}`).replace(/&/g, '&amp;');
const TEL = '+49 (0) 6221 7239099';
const TEL_LINK = 'tel:+4962217239099';
const MAIL = 'info@neo-heidelberg.de';
const HERO_BILD = '/img/w26/tafel.webp';
const ABEND_BILD = '/img/silvester/champagner.webp';

// ===== Menüs (Quelle siehe oben) =====
const MENUES = {
  de: [
    {
      id: 'silvester',
      label: 'Fleisch &amp; Fisch',
      bild: '/img/silvester/karte-fleisch-fisch.webp',
      hoehe: 1704,
      alt: 'Menükarte Silvester 2026 „Paris meets San Sebastián“, Fleisch und Fisch: zwei Snacks und fünf Gänge, 179 € pro Person ohne Getränke',
      gaenge: [
        ['Snack · Paris', 'Französische Zwiebelsuppe', 'überbackenes Comté-Brot'],
        ['Snack · San Sebastián', 'Croqueta vom Ibérico-Schinken', 'cremig gefüllt · Paprika-Mayonnaise'],
        ['I · Paris', 'Pâté en croûte von Perlhuhn und Gänseleber', 'Périgord-Trüffel · Frisée in Trüffelvinaigrette · eingelegte Cornichons'],
        ['II · San Sebastián', 'Riesengarnele, über Holzkohle gegrillt', 'Sud vom Ibérico-Speck · knuspriger Safranreis · gebrannte Aioli'],
        ['III · Paris', 'Weißer Heilbutt, in Nussbutter glasiert', 'Champagner-Beurre-blanc · geschmorter Lauch · Kaviar'],
        ['IV · San Sebastián', 'Zweierlei vom Rind', 'Filet vom Rubia-Gallega-Rind & Backe geschmort · Rioja-Jus · Püree von schwarzen Bohnen · geröstete Paprika · Kartoffel-Milhojas, hauchdünn geschichtet'],
        ['V · Paris', 'Tarte Tatin vom karamellisierten Apfel', 'Crème-fraîche-Eis · Haselnuss-Krokant'],
      ],
    },
    {
      id: 'silvester-veg',
      label: 'Vegetarisches Menü',
      bild: '/img/silvester/karte-vegetarisch.webp',
      hoehe: 1704,
      alt: 'Menükarte Silvester 2026 „Paris meets San Sebastián“, vegetarisch: zwei Snacks und fünf Gänge, 179 € pro Person ohne Getränke',
      gaenge: [
        ['Snack · Paris', 'Französische Zwiebelsuppe', 'überbackenes Bergkäse-Brot'],
        ['Snack · San Sebastián', 'Croqueta von Spinat', 'cremig gefüllt · Pinienkerne · Paprika-Mayonnaise'],
        ['I · Paris', 'Pâté en croûte von Waldpilzen und Maronen', 'Périgord-Trüffel · Frisée in Trüffelvinaigrette · eingelegte Cornichons'],
        ['II · San Sebastián', 'Artischocke, über Holzkohle gegrillt', 'Sud von geräucherter Paprika · knuspriger Safranreis · gebrannte Aioli'],
        ['III · Paris', 'Knollensellerie, in Nussbutter glasiert', 'Champagner-Beurre-blanc · geschmorter Lauch · Senfkaviar'],
        ['IV · San Sebastián', 'Zweierlei von der Aubergine', 'gegrillt & in Rioja geschmort · Röstgemüse-Jus · Püree von schwarzen Bohnen · geröstete Paprika · Kartoffel-Milhojas, hauchdünn geschichtet'],
        ['V · Paris', 'Tarte Tatin vom karamellisierten Apfel', 'Crème-fraîche-Eis · Haselnuss-Krokant'],
      ],
    },
  ],
  en: [
    {
      id: 'silvester',
      label: 'Meat &amp; Fish',
      bild: '/img/silvester/karte-fleisch-fisch.webp',
      hoehe: 1704,
      alt: 'Menu card New Year’s Eve 2026 “Paris meets San Sebastián” (in German), meat and fish: two snacks and five courses, €179 per person, drinks not included',
      gaenge: [
        ['Snack · Paris', 'French Onion Soup', 'bread gratinéed with Comté'],
        ['Snack · San Sebastián', 'Ibérico Ham Croqueta', 'creamy filling · paprika mayonnaise'],
        ['I · Paris', 'Pâté en Croûte of Guinea Fowl and Goose Liver', 'Périgord truffle · frisée in truffle vinaigrette · pickled cornichons'],
        ['II · San Sebastián', 'King Prawn, Charcoal-Grilled', 'Ibérico bacon broth · crispy saffron rice · burnt aioli'],
        ['III · Paris', 'White Halibut, Glazed in Brown Butter', 'champagne beurre blanc · braised leek · caviar'],
        ['IV · San Sebastián', 'Beef Two Ways', 'Rubia Gallega beef fillet & braised cheek · Rioja jus · black bean purée · roasted peppers · potato milhojas, wafer-thin layers'],
        ['V · Paris', 'Tarte Tatin of Caramelised Apple', 'crème fraîche ice cream · hazelnut brittle'],
      ],
    },
    {
      id: 'silvester-veg',
      label: 'Vegetarian Menu',
      bild: '/img/silvester/karte-vegetarisch.webp',
      hoehe: 1704,
      alt: 'Menu card New Year’s Eve 2026 “Paris meets San Sebastián” (in German), vegetarian: two snacks and five courses, €179 per person, drinks not included',
      gaenge: [
        ['Snack · Paris', 'French Onion Soup', 'bread gratinéed with mountain cheese'],
        ['Snack · San Sebastián', 'Spinach Croqueta', 'creamy filling · pine nuts · paprika mayonnaise'],
        ['I · Paris', 'Pâté en Croûte of Wild Mushrooms and Chestnuts', 'Périgord truffle · frisée in truffle vinaigrette · pickled cornichons'],
        ['II · San Sebastián', 'Artichoke, Charcoal-Grilled', 'smoked paprika broth · crispy saffron rice · burnt aioli'],
        ['III · Paris', 'Celeriac, Glazed in Brown Butter', 'champagne beurre blanc · braised leek · mustard caviar'],
        ['IV · San Sebastián', 'Aubergine Two Ways', 'grilled & braised in Rioja · roasted vegetable jus · black bean purée · roasted peppers · potato milhojas, wafer-thin layers'],
        ['V · Paris', 'Tarte Tatin of Caramelised Apple', 'crème fraîche ice cream · hazelnut brittle'],
      ],
    },
  ],
};

// ===== Weinbegleitung (10.11.2026, Sven) =====
// Karte aus Development/neo-wintermenues/silvester-wein.html („… Weinbegleitung Paris meets San Sebastián 10.11. 17.40 Uhr“),
// Weine von Daniel. Gilt für beide Menüs. In Gastronaut als Option beim Buchen dazubuchbar.
const WEIN = {
  de: {
    id: 'weinbegleitung',
    label: 'Die Weine',
    bild: '/img/silvester/karte-weinbegleitung.webp',
    hoehe: 1704,
    alt: 'Weinbegleitung Silvester 2026 „Paris meets San Sebastián“: sechs Gläser à 0,1 l zu den Gängen, 55 € pro Person',
    gaenge: [
      ['Snacks', 'Quartet Brut', 'Roederer Estate · Kalifornien'],
      ['I · Paris', 'Riesling Hendelberg', 'Spreitzer · Rheingau'],
      ['II · San Sebastián', 'Weißburgunder Muschelkalk', 'Dr. Wehrheim · Birkweiler, Pfalz'],
      ['III · Paris', 'Chardonnay', 'Tormaresca · Apulien'],
      ['IV · San Sebastián', 'Spätburgunder Goldberg', 'Wageck · Bissersheim, Pfalz'],
      ['V · Paris', 'Riesling Spätlese Oestricher Lenchen', 'Spreitzer · Rheingau'],
    ],
  },
  en: {
    id: 'weinbegleitung',
    label: 'The wines',
    bild: '/img/silvester/karte-weinbegleitung.webp',
    hoehe: 1704,
    alt: 'Wine pairing card New Year’s Eve 2026 “Paris meets San Sebastián” (in German): six glasses (0.1 l) matched to the courses, €55 per person',
    summary: 'Read the wine list in English',
    gaenge: [
      ['Snacks', 'Quartet Brut', 'Roederer Estate · California'],
      ['I · Paris', 'Riesling Hendelberg', 'Spreitzer · Rheingau'],
      ['II · San Sebastián', 'Weißburgunder Muschelkalk (Pinot Blanc)', 'Dr. Wehrheim · Birkweiler, Palatinate'],
      ['III · Paris', 'Chardonnay', 'Tormaresca · Apulia'],
      ['IV · San Sebastián', 'Spätburgunder Goldberg (Pinot Noir)', 'Wageck · Bissersheim, Palatinate'],
      ['V · Paris', 'Riesling Spätlese Oestricher Lenchen', 'Spreitzer · Rheingau'],
    ],
  },
};
const WEIN_PDF = '/pdf/neo-silvester-2026-weinbegleitung.pdf';

// ===== Seitentexte =====
const T = {
  de: {
    pfad: '/silvester',
    andere: '/en/new-years-eve',
    id: 'page-silvester',
    navLabel: 'Silvester',
    title: 'Silvester 2026 im NEO Heidelberg · Paris meets San Sebastián',
    description:
      'Silvester im NEO Heidelberg: Menü „Paris meets San Sebastián“ mit zwei Snacks und fünf Gängen, auch vegetarisch, 179 € pro Person ohne Getränke. Jetzt online buchen.',
    zurueck: '← Zurück zur Startseite',
    brot: 'Brotkrumen',
    datum: 'Donnerstag, 31. Dezember 2026',
    eyebrow: ['Silvester', 'Donnerstag, 31. Dezember 2026'],
    lead: 'Zwei Snacks und fünf Gänge, Fleisch und Fisch oder vegetarisch. Ab 18 Uhr geöffnet, um 19 Uhr servieren wir das Menü.',
    buchen: 'Jetzt buchen',
    zumMenue: 'Zum Menü',
    abendEyebrow: 'Der Abend',
    abendH2: 'Silvester <em>im NEO.</em>',
    abendText: [
      'Ab 18 Uhr ist das NEO geöffnet, um 19 Uhr servieren wir das Menü: zwei Snacks und fünf Gänge, im Wechsel aus Paris und San Sebastián.',
      'Fleisch und Fisch oder vegetarisch, beide Menüs zum gleichen Preis.',
    ],
    fakten: [
      ['Datum', 'Donnerstag, 31. Dezember 2026'],
      ['Ablauf', 'ab 18 Uhr geöffnet, um 19 Uhr servieren wir das Menü'],
      ['Menü', 'zwei Snacks und fünf Gänge, Fleisch und Fisch oder vegetarisch'],
      ['Preis', '179 € pro Person, ohne Getränke'],
      ['Weinbegleitung', 'auf Wunsch, sechs Gläser à 0,1 l, 55 € pro Person'],
      ['Buchung', 'online, bezahlt wird bei der Buchung'],
      ['Ort', 'Zollhofgarten 2, 69115 Heidelberg · Bahnstadt'],
    ],
    bildAlt: 'Champagner im Kühler, dahinter Gläser im NEO',
    menueEyebrow: 'Das Menü',
    menueH2: 'Zwei Snacks, <em>fünf Gänge.</em>',
    preis: '179 €',
    zusatz: 'pro Person · ohne Getränke',
    gruss: ['Bonne Année', '¡Feliz Año Nuevo!'],
    weinEyebrow: 'Weinbegleitung',
    weinH2: 'Sechs Gläser <em>zu den Gängen.</em>',
    weinText: 'Auf Wunsch mit Weinbegleitung: sechs Gläser à 0,1 l zu den Gängen, 55 € pro Person, bei der Buchung dazubuchbar.',
    weinPreis: '55 €',
    weinZusatz: 'pro Person · 0,1 l pro Glas',
    weinPdf: 'Weinbegleitung als PDF',
    faqEyebrow: 'Häufige Fragen',
    faqH2: 'Gut zu <em>wissen.</em>',
    faqText: `Und wenn eure Frage fehlt: schreibt uns an <a href="mailto:${MAIL}">${MAIL}</a>.`,
    faq: [
      { q: 'Wann beginnt der Silvesterabend im NEO?', a: 'Ab 18 Uhr ist geöffnet, um 19 Uhr servieren wir das Menü.' },
      { q: 'Bis wann geht der Abend?', a: 'Gegen 1 Uhr.' },
      { q: 'Was kostet das Silvestermenü?', a: '179 € pro Person, ohne Getränke.' },
      { q: 'Gibt es ein vegetarisches Menü?', a: 'Ja, mit zwei Snacks und fünf Gängen zum gleichen Preis wie das Menü mit Fleisch und Fisch.' },
      { q: 'Wie buche ich?', a: `Online über „Jetzt buchen“, bezahlt wird direkt bei der Buchung. Fragen beantworten wir unter <a href="${TEL_LINK}">06221 7239099</a>.` },
    ],
    schlussEyebrow: 'Buchung',
    schlussZeile: ['Donnerstag, 31. Dezember 2026', '179 € pro Person, ohne Getränke'],
    lang: 'de',
  },
  en: {
    pfad: '/en/new-years-eve',
    andere: '/silvester',
    id: 'page-silvester-en',
    navLabel: 'New Year’s Eve',
    title: 'New Year’s Eve 2026 at NEO Heidelberg · Paris meets San Sebastián',
    description:
      'New Year’s Eve at NEO Heidelberg: “Paris meets San Sebastián”, two snacks and five courses, also vegetarian, €179 per person, drinks not included. Book online now.',
    zurueck: '← Back to the homepage',
    brot: 'Breadcrumb',
    datum: 'Thursday, 31 December 2026',
    eyebrow: ['New Year’s Eve', 'Thursday, 31 December 2026'],
    lead: 'Two snacks and five courses, meat and fish or vegetarian. Doors open at 6 pm, the menu is served at 7 pm.',
    buchen: 'Book now',
    zumMenue: 'See the menu',
    abendEyebrow: 'The evening',
    abendH2: 'New Year’s Eve <em>at NEO.</em>',
    abendText: [
      'NEO opens at 6 pm and the menu is served at 7 pm: two snacks and five courses, alternating between Paris and San Sebastián.',
      'Meat and fish or vegetarian, both menus at the same price.',
    ],
    fakten: [
      ['Date', 'Thursday, 31 December 2026'],
      ['Timing', 'doors open at 6 pm, the menu is served at 7 pm'],
      ['Menu', 'two snacks and five courses, meat and fish or vegetarian'],
      ['Price', '€179 per person, drinks not included'],
      ['Wine pairing', 'on request, six glasses (0.1 l), €55 per person'],
      ['Booking', 'online, payment when booking'],
      ['Address', 'Zollhofgarten 2, 69115 Heidelberg · Bahnstadt'],
    ],
    bildAlt: 'Champagne on ice with glasses at NEO',
    menueEyebrow: 'The menu',
    menueH2: 'Two snacks, <em>five courses.</em>',
    preis: '€179',
    zusatz: 'per person · drinks not included',
    gruss: ['Bonne Année', '¡Feliz Año Nuevo!'],
    weinEyebrow: 'Wine pairing',
    weinH2: 'Six glasses <em>with the courses.</em>',
    weinText: 'Wine pairing on request: six glasses (0.1 l) matched to the courses, €55 per person, can be added when booking.',
    weinPreis: '€55',
    weinZusatz: 'per person · 0.1 l per glass',
    weinPdf: 'Wine pairing as PDF (German)',
    faqEyebrow: 'FAQ',
    faqH2: 'Good to <em>know.</em>',
    faqText: `Question not answered? Write to us at <a href="mailto:${MAIL}">${MAIL}</a>.`,
    faq: [
      { q: 'When does New Year’s Eve at NEO start?', a: 'Doors open at 6 pm, the menu is served at 7 pm.' },
      { q: 'When does the evening end?', a: 'Around 1 am.' },
      { q: 'How much is the New Year’s Eve menu?', a: '€179 per person, drinks not included.' },
      { q: 'Is there a vegetarian menu?', a: 'Yes, with two snacks and five courses at the same price as the meat and fish menu.' },
      { q: 'How do I book?', a: `Online via “Book now”, payment is taken when you book. For questions call us on <a href="${TEL_LINK}">+49 6221 7239099</a>.` },
    ],
    schlussEyebrow: 'Booking',
    schlussZeile: ['Thursday, 31 December 2026', '€179 per person, drinks not included'],
    lang: 'en',
  },
};

// ===== Satz-Helfer =====
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Wörter mit Bindestrich nie trennen, „Rubia Gallega“ zusammenhalten
const wort = (t) =>
  t
    .replace(/Rubia Gallega/g, 'Rubia Gallega')
    .split(' ')
    .map((w) => (w.includes('-') ? `<span class="nb">${w}</span>` : w))
    .join(' ');

// Nie ein „·“ am Zeilenende (Sven 05./06.11.2026, Vorlage tokyo-nights-menue/vorlage.html dInnen):
// Der Punkt gehört zum folgenden Teil. Bricht der Teil um, rutscht er mit an den Zeilenanfang und wird dort
// abgeschnitten (.sv-pk: overflow hidden, Teil mit margin-left -.8em). Kurze Teile brechen gar nicht,
// bei langen Teilen hängt der Punkt fest am ersten Wort. Nur für linksbündigen Text.
export function pk(text, { roh = false } = {}) {
  const teile = String(text ?? '').replace(/ /g, ' ').split(/\s+·\s+/);
  if (teile.length === 1 && !teile[0].trim()) return '';
  const sep = '<span class="sv-sep"><span class="sv-sp"> </span>·<span class="sv-sp"> </span></span>';
  return teile
    .map((t, i) => {
      const x = roh ? t : esc(t);
      const kurz = t.length <= 44;
      const kl = 'sv-tl' + (kurz ? ' sv-nw' : '') + (i ? ' sv-mit' : '');
      if (!i) return `<span class="${kl}">${kurz ? x : wort(x)}</span>`;
      if (kurz) return `<wbr><span class="${kl}">${sep}${x}</span>`;
      const w = wort(x);
      const leer = w.indexOf(' ');
      const kopf = leer < 0 ? w : w.slice(0, leer);
      const rest = leer < 0 ? '' : w.slice(leer);
      return `<wbr><span class="${kl}"><span class="sv-nw">${sep}${kopf}</span>${rest}</span>`;
    })
    .join('');
}

const STADT = (nr) => (/sebasti/i.test(nr) ? 'ss' : 'paris');

function titelHtml(tag, kl, lang) {
  const meets = '<span class="sv-meets">meets</span>';
  return `<${tag} class="${kl}"><span class="sv-paris">Paris</span> ${meets} <span class="sv-ss">San&nbsp;Sebastián</span>${
    tag === 'h1' ? `<span class="sv-vh"> ${lang === 'en' ? '· New Year’s Eve 2026 at NEO Heidelberg' : '· Silvester 2026 im NEO Heidelberg'}</span>` : ''
  }</${tag}>`;
}

function grussHtml(g) {
  return `<span class="sv-gruss sv-pk"><span class="sv-tl sv-nw sv-paris">${esc(g[0])}</span><wbr><span class="sv-tl sv-nw sv-mit sv-ss"><span class="sv-sep"><span class="sv-sp"> </span>·<span class="sv-sp"> </span></span>${esc(g[1])}</span></span>`;
}

function buchenKnopf(t, extra = '', wo = 'silvesterseite') {
  return `<a href="${buchenHref(t, wo)}" target="_blank" rel="noopener" class="btn primary${extra}">${t.buchen}</a>`;
}

// Seit 06.11.2026 ~11.10 (Sven: „da müssen die Karten rein, sieht doch net gut aus“): die fertigen Menükarten
// (Mittig-Fassung aus neo-wintermenues/silvester.html, 10.45 Uhr) als Bild, Antippen vergrößert (KARTEN_SKRIPT).
// Der Volltext bleibt im HTML: deutsch nur für Suchmaschinen und Screenreader (.sv-vh), englisch aufklappbar,
// weil die Karten deutsch sind.
function menueHtml(m, lang) {
  const zeilen = m.gaenge
    .map(([nr, name, sub]) => {
      const i = nr.indexOf(' · ');
      const n1 = i < 0 ? nr : nr.slice(0, i);
      const n2 = i < 0 ? '' : nr.slice(i + 3);
      return `<li class="sv-gang sv-${STADT(nr)}">
          <p class="sv-nr"><span class="sv-n1">${esc(n1)}</span>${n2 ? `<span class="sv-n2">${esc(n2)}</span>` : ''}</p>
          <div class="sv-gericht"><p class="sv-name">${esc(name)}</p><p class="sv-sub sv-pk">${pk(sub)}</p></div>
        </li>`;
    })
    .join('\n        ');
  const liste = `<ol class="sv-gaenge">
        ${zeilen}
      </ol>`;
  const text =
    lang === 'en'
      ? `<details class="sv-text-en"><summary>${m.summary || 'Read the menu in English'}</summary>
      ${liste}
      </details>`
      : `<div class="sv-vh">
      ${liste}
      </div>`;
  return `<div class="sv-menue" id="menue-${m.id}">
      <h3 class="sv-menue-label">${m.label}</h3>
      <button type="button" class="sv-karte" data-sv-gross>
        <img src="${m.bild}" alt="${esc(m.alt)}" width="1200" height="${m.hoehe}" loading="lazy" decoding="async">
        <span class="sv-vh">${lang === 'en' ? '(enlarge)' : '(vergrößern)'}</span>
      </button>
      ${text}
    </div>`;
}

// Vergrößern im selben Fenster: Overlay mit Schließen-Knopf, Esc oder Klick daneben schließt.
// Läuft als eigenes <script> in den page.js-Dateien (Inhalte aus dangerouslySetInnerHTML führen kein Skript aus).
export const KARTEN_SKRIPT = `(function(){
var EN=document.documentElement.lang==='en',ov,img,zu,vorher;
function bau(){ov=document.createElement('div');ov.className='sv-gross';ov.hidden=true;ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label',EN?'Menu card':'Menükarte');
ov.innerHTML='<button type="button" class="sv-gross-zu" aria-label="'+(EN?'Close':'Schließen')+'">×</button><img alt="">';
document.body.appendChild(ov);img=ov.querySelector('img');zu=ov.querySelector('.sv-gross-zu');
ov.addEventListener('click',function(e){if(e.target!==img)zumachen();});}
function aufmachen(b){if(!ov)bau();vorher=b;var i=b.querySelector('img');img.src=i.currentSrc||i.src;img.alt=i.alt;ov.hidden=false;document.documentElement.classList.add('sv-gross-offen');zu.focus();}
function zumachen(){if(!ov||ov.hidden)return;ov.hidden=true;document.documentElement.classList.remove('sv-gross-offen');if(vorher)vorher.focus();}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-sv-gross]');if(b){e.preventDefault();aufmachen(b);}});
document.addEventListener('keydown',function(e){if(!ov||ov.hidden)return;if(e.key==='Escape'){zumachen();}else if(e.key==='Tab'){e.preventDefault();zu.focus();}});
})();`;

const PDF = '/pdf/neo-silvester-2026-menuekarte.pdf';

function inhaltHtml(lang) {
  const t = T[lang];
  const home = lang === 'en' ? '/en' : '/';
  // Deutsch: .subpage wie die übrigen deutschen Unterseiten (Router im Seiten-Skript kennt page-silvester).
  // Englisch: ohne .subpage, sonst blendet der Hash-Router der englischen Seiten den Inhalt aus.
  const klasse = lang === 'en' ? 'ev-seite sv-seite' : 'subpage active ev-seite sv-seite';
  return `<div class="${klasse}" id="${t.id}">
<a href="${home}" class="back-link">${t.zurueck}</a>
<header class="hero ev-hero sv-hero">
  <div class="hero-bg" style="background-image:url('${HERO_BILD}');background-position:center 60%"></div>
  <div class="hero-content">
    <nav class="ev-pfad" aria-label="${t.brot}"><a href="${home}">NEO Heidelberg</a><span aria-hidden="true">/</span><span aria-current="page">${t.navLabel}</span></nav>
    <div class="eyebrow hero-eyebrow"><span class="sv-pk">${pk(t.eyebrow.join(' · '))}</span></div>
    ${titelHtml('h1', 'sv-titel sv-titel-gross', lang)}
    <p class="ev-lead">${t.lead}</p>
    <div class="hero-ctas">
      ${buchenKnopf(t)}
      <a href="#menue" class="btn">${t.zumMenue}</a>
    </div>
  </div>
  <a href="https://bliss-group.de" target="_blank" rel="noopener" class="hero-bliss">${lang === 'en' ? 'Part of the BLISS&nbsp;Group' : 'Ein Haus der BLISS&nbsp;Group'}</a>
</header>

<section class="ev-abschnitt">
  <div class="ev-innen ev-zwei">
    <div>
      <div class="eyebrow">${t.abendEyebrow}</div>
      <h2 class="ev-h2">${t.abendH2}</h2>
      <figure class="sv-abend-bild"><img src="${ABEND_BILD}" alt="${t.bildAlt}" width="1067" height="600" loading="lazy" decoding="async"></figure>
    </div>
    <div class="ev-text">
      ${t.abendText.map((p) => `<p>${p}</p>`).join('\n      ')}
      <dl class="ev-fakten">
        ${t.fakten.map(([k, v]) => `<div><dt>${k}</dt><dd class="sv-pk">${pk(v)}</dd></div>`).join('\n        ')}
      </dl>
      <div class="sv-ctas">${buchenKnopf(t)}</div>
    </div>
  </div>
</section>

<section class="ev-abschnitt sv-menues" id="menue">
  <div class="ev-innen">
    <div class="ev-kopf">
      <div class="eyebrow">${t.menueEyebrow}</div>
      <h2 class="ev-h2">${t.menueH2}</h2>
    </div>
    <div class="sv-menue-paar">
    ${MENUES[lang].map((m) => menueHtml(m, lang)).join('\n    ')}
    </div>
    <p class="ev-link sv-pdf"><a href="${PDF}">${lang === 'en' ? 'Menu card as PDF (German)' : 'Menükarte als PDF'}</a></p>
    <div class="sv-preis-block">
      <p class="sv-preis">${t.preis}</p>
      <p class="sv-zusatz sv-pk">${pk(t.zusatz)}</p>
      <p class="sv-gruss-zeile">${grussHtml(t.gruss)}</p>
      <div class="sv-ctas">${buchenKnopf(t)}</div>
    </div>
  </div>
</section>

<section class="ev-abschnitt sv-menues sv-wein" id="weinbegleitung">
  <div class="ev-innen">
    <div class="ev-kopf">
      <div class="eyebrow">${t.weinEyebrow}</div>
      <h2 class="ev-h2">${t.weinH2}</h2>
    </div>
    <div class="sv-menue-paar">
    ${menueHtml(WEIN[lang], lang)}
    <div class="sv-wein-text">
      <p class="sv-wein-satz">${t.weinText}</p>
      <div class="sv-preis-block">
        <p class="sv-preis">${t.weinPreis}</p>
        <p class="sv-zusatz sv-pk">${pk(t.weinZusatz)}</p>
        <div class="sv-ctas">${buchenKnopf(t)}</div>
      </div>
      <p class="ev-link sv-pdf"><a href="${WEIN_PDF}">${t.weinPdf}</a></p>
    </div>
    </div>
  </div>
</section>

<section class="faq ev-faq">
  <div class="faq-head">
    <div class="eyebrow">${t.faqEyebrow}</div>
    <h2>${t.faqH2}</h2>
    <p>${t.faqText}</p>
  </div>
  <div class="faq-list">
    ${t.faq.map((f) => `<details><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n    ')}
  </div>
</section>

<section class="ev-abschnitt sv-schluss">
  <div class="ev-innen">
    <div class="eyebrow">${t.schlussEyebrow}</div>
    <h2 class="ev-h2 sv-schluss-gruss">${grussHtml(t.gruss)}</h2>
    <p class="sv-schluss-zeile sv-pk">${pk(t.schlussZeile.join(' · '))}</p>
    <div class="sv-ctas">
      ${buchenKnopf(t)}
      <a href="${TEL_LINK}" class="btn">${lang === 'en' ? '+49 6221 7239099' : '06221 7239099'}</a>
    </div>
  </div>
</section>
</div>
`;
}

// ===== Inhalt der Seiten (Kopf und Fuß setzt app/seitenTeile.js dazu) =====
export const SILVESTER = { de: { inhalt: inhaltHtml('de'), andere: T.de.andere }, en: { inhalt: inhaltHtml('en'), andere: T.en.andere } };

export function silvesterMetadata(lang) {
  const t = T[lang];
  const url = BASIS + t.pfad;
  const bild = `${BASIS}/img/og-neo.jpg`;
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: url,
      languages: { 'de-DE': BASIS + T.de.pfad, en: BASIS + T.en.pfad, 'x-default': BASIS + T.de.pfad },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'en' ? 'en_GB' : 'de_DE',
      siteName: 'NEO Bar & Restaurant',
      url,
      title: t.title,
      description: t.description,
      images: [{ url: bild, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [bild] },
  };
}

const ohneTags = (s) => s.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

export function silvesterLd(lang) {
  const t = T[lang];
  const url = BASIS + t.pfad;
  const ereignis = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    '@id': `${url}#silvester`,
    name: lang === 'en' ? 'New Year’s Eve 2026 at NEO: Paris meets San Sebastián' : 'Silvester 2026 im NEO: Paris meets San Sebastián',
    description: t.lead,
    url,
    image: [BASIS + HERO_BILD, BASIS + ABEND_BILD],
    inLanguage: lang,
    startDate: '2026-12-31T19:00:00+01:00',
    doorTime: '2026-12-31T18:00:00+01:00',
    endDate: '2027-01-01T01:00:00+01:00',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Restaurant',
      '@id': `${BASIS}/#restaurant`,
      name: 'NEO Bar & Restaurant',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Zollhofgarten 2',
        addressLocality: 'Heidelberg',
        postalCode: '69115',
        addressRegion: 'Baden-Württemberg',
        addressCountry: 'DE',
      },
    },
    organizer: { '@type': 'Organization', name: 'NEO Bar & Restaurant', url: `${BASIS}/` },
    offers: {
      '@type': 'Offer',
      name: lang === 'en' ? 'New Year’s Eve menu (meat and fish or vegetarian)' : 'Silvestermenü (Fleisch und Fisch oder vegetarisch)',
      price: '179',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: SILVESTER_BUCHEN,
    },
  };
  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: ohneTags(f.a) } })),
  };
  const brot = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'NEO Heidelberg', item: lang === 'en' ? `${BASIS}/en` : `${BASIS}/` },
      { '@type': 'ListItem', position: 2, name: t.navLabel, item: url },
    ],
  };
  return [ereignis, faq, brot].map((o) => JSON.stringify(o));
}

// ===== Hinweis auf der Startseite (Markierung <!--SILVESTER-TEASER-->) =====
// Bild im Hinweis: Champagner-Foto. Die Menükarte statt des Fotos wurde am 06.11.2026 per Screenshot verglichen und verworfen
// (Titel stünde doppelt, auf dem Handy sehr lang; die Karten zeigt die Seite /silvester).
export function mitSilvesterTeaser(html, lang) {
  const t = T[lang];
  const marke = '<!--SILVESTER-TEASER-->';
  if (!html.includes(marke)) throw new Error('silvester: Markierung nicht gefunden: ' + marke);
  const text =
    lang === 'en'
      ? 'Two snacks and five courses, meat and fish or vegetarian. Doors open at 6 pm, the menu is served at 7 pm. €179 per person, drinks not included.'
      : 'Zwei Snacks und fünf Gänge, Fleisch und Fisch oder vegetarisch. Ab 18 Uhr geöffnet, um 19 Uhr servieren wir das Menü. 179 € pro Person, ohne Getränke.';
  const teaser = `<section class="ev-abschnitt sv-teaser" id="silvester-teaser">
  <div class="ev-innen sv-teaser-innen">
    <figure class="sv-teaser-bild"><img src="${ABEND_BILD}" alt="${t.bildAlt}" width="1067" height="600" loading="lazy" decoding="async"></figure>
    <div class="sv-teaser-text">
      <div class="eyebrow"><span class="sv-pk">${pk(t.eyebrow.join(' · '))}</span></div>
      ${titelHtml('h2', 'sv-titel sv-titel-teaser', lang)}
      <p class="sv-teaser-p">${text}</p>
      <div class="sv-ctas">
        ${buchenKnopf(t, '', 'startseite')}
        <a href="${t.pfad}" class="btn">${t.zumMenue}</a>
      </div>
    </div>
  </div>
</section>`;
  // Die runden Störer im Startbild (07.–09.11.2026) sind seit 09.11.2026 durch den wegdrückbaren Störer
  // aus app/stoerer.js ersetzt (Sven: „wirklich Störer mit Text zum Wegdrücken“), der Link kommt von silvesterStoererHref.
  return html.replace(marke, teaser);
}

// Buchungslink für den Störer (app/stoerer.js), Kennung utm_medium=stoerer wie beim früheren runden Störer
export const silvesterStoererHref = (lang) => buchenHref(T[lang] || T.de, 'stoerer');

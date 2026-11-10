// Störer auf der Startseite (Sven 09.11.2026: „Störer mittig auf HP machen und geiler“, „gerne auch das Video des Kalenders“).
// Mittiges Overlay über dem Startbild, nur auf / und /en (app/(de)/page.js, app/(en)/en/page.js), Unterseiten werben nicht.
// Bis 24.12.2026: BLISS Adventskalender groß mit Kalender-Film (stummer Loop) und „Das steckt drin“ (vier Höhepunkte mit Wert,
// „Alle 24 Erlebnisse ansehen“ klappt die ganze Liste nach Häusern auf), darunter ein eigener Silvester-Streifen
// mit Champagner-Bild, Schriftzug PARIS meets SAN SEBASTIÁN wie auf /silvester, Preis und Knopf (Sven 10.11.2026:
// „Kalender sehr gut, darunter aber Silvester schlecht, muss besser“; vorher nur eine graue Textzeile mit Link).
// 25.–31.12.2026: nur Silvester (Champagner-Bild). Danach nichts. Die Startseiten werden stündlich neu erzeugt (revalidate),
// das Skript prüft die Daten im Browser zusätzlich (Europe/Berlin).
// Erscheint 1 s nach dem Laden, nie zusammen mit dem Cookie-Hinweis (erst nach der Entscheidung dort).
// ×, Klick auf den dunklen Hintergrund, ESC oder ein Klick auf ein Angebot schließen; gemerkt 7 Tage (localStorage, Schlüssel unten).
// Der Film lädt erst, wenn der Störer erscheint (preload none, Quelle per Skript); bei prefers-reduced-motion oder
// „Daten sparen“ bleibt es beim Standbild (Poster). Auch das Silvester-Bild lädt erst beim Erscheinen (data-src).
// Trennpunkte „·“ mit pk(): nie am Zeilenrand.
import { pk, silvesterStoererHref } from './silvester';

export const ADVENT_BIS = '2026-12-24';
export const SILVESTER_BIS = '2026-12-31';
// v2 seit 09.11.2026: wer die frühere kleine Karte weggedrückt hat, sieht den mittigen Störer einmal
export const SCHLUESSEL = 'neo-stoerer-advent-2026-v2';
const ADVENT_ZIEL = 'https://adventskalender.bliss-group.de/?utm_source=neo-heidelberg&amp;utm_medium=stoerer';
// Gutschein-Zeile unter dem Kalender-Knopf (Sven 10.11.2026: „gutscheine … mit in den störer“), nur Deutsch
const GUTSCHEIN_ZIEL = 'https://www.gastroguide.de/api-v1/widget/voucher/?id=MjM2NjE4&amp;mode=widgetLayer&amp;font=TGF0bw==&amp;mainColor=AAC8DA&amp;value=0&amp;darkMode=0&amp;utm_source=neo-heidelberg&amp;utm_medium=stoerer-gutschein';
const VIDEO = {
  // v2: ab dem Türchen-Zoom geschnitten (ohne die Titeleinblendung des Films), neuer Name gegen alten Browser-Cache
  // v3 (10.11.2026, Sven: „schön wäre, dass die Musik geht beim Störer-Kalender“): dieselben Bilder mit der Filmmusik (Ton v9),
  // Quelle bliss-adventskalender/video/film-4x5.mp4 bzw. film-16x9.mp4 ab 6,4 s, 25,6 s, AAC 96 kbit/s
  hoch: '/video/stoerer-4x5-v3.mp4',
  quer: '/video/stoerer-16x9-v3.mp4',
  posterHoch: '/video/stoerer-4x5-v3-poster.webp',
  posterQuer: '/video/stoerer-16x9-v3-poster.webp',
};
const SILVESTER_BILD = '/img/silvester/champagner.webp';

// Was im Kalender steckt (Sven 10.11.2026: „beim Kalender muss man sehen, was alles dabei ist, muss präsenter werden“).
// Titel und Werte wörtlich aus https://adventskalender.bliss-group.de/api/tuer?liste=1 (Stand 10.11.2026, 24 Erlebnisse,
// Summe 1.249 € = Gegenwert). Ändert sich der Kalender, hier nachziehen. Englisch übersetzt.
// Einträge: [deutsch, englisch, Wert in €, Türchen 24?]
const INHALT = [
  { haus: 'NEO Heidelberg', e: [
    ['Das Chalet-Menü', 'The Chalet menu', 69],
    ['Das Say Cheese Menü', 'The Say Cheese menu', 65],
    ['Ein Abend im NEO', 'An evening at NEO', 60],
    ['Eine Flasche Wein', 'A bottle of wine', 50],
    ['Ein Extra-Gang vom Küchenchef', 'An extra course from the head chef', 25],
    ['Ein Dessert', 'A dessert', 20],
    ['Ein Glas Champagner für Silvester', 'A glass of champagne on New Year’s Eve', 20],
    ['Ein Glas Champagner', 'A glass of champagne', 15],
    ['Ein Glas vom Sommelier', 'A glass chosen by the sommelier', 14],
    ['Ein Cocktail und ein kleiner Snack', 'A cocktail and a small snack', 14],
  ] },
  { haus: 'Stories VIII', e: [['Ein Abend bei Stories VIII', 'An evening at Stories VIII', 175, true]] },
  { haus: 'Schloss Neckarbischofsheim', e: [
    ['Eine Nacht im Schloss für zwei', 'A night at the castle for two', 160],
    ['100 € Rabatt für deine Feier im Schloss', '€100 off your celebration at the castle', 100],
    ['Candlelight Dinner im Schloss', 'Candlelight dinner at the castle', 59],
  ] },
  { haus: 'SOUL Catering', e: [
    ['150 € Rabatt für das nächste Catering', '€150 off your next catering', 150],
    ['Kartoffelpuffer mit Räucherlachs', 'Potato pancakes with smoked salmon', 10],
    ['Eine Haxensemmel', 'A pork knuckle roll', 9],
    ['Ein hausgemachter Glühwein', 'A homemade mulled wine', 4],
  ] },
  { haus: 'l’ab Wiesloch', e: [
    ['Ein Platz beim Family Brunch', 'A seat at the Family Brunch', 49],
    ['Ein Platz beim Adventsbrunch', 'A seat at the Advent brunch', 45],
    ['50 % auf das Omakase Menü', '50% off the Omakase menu', 45],
  ] },
  { haus: 'Ghost Kitchen', e: [
    ['Die Signature-Box', 'The Signature Box', 49],
    ['Eine Sushi-Rolle', 'A sushi roll', 22],
    ['Eine Bowl', 'A bowl', 20],
  ] },
];
// Die Höhepunkte im Störer: vier immer (je ein Haus), die mit 1 am Ende nur in der dreispaltigen Fassung ab 1000 px (Rest hinter „Alle 24 ansehen“)
const HOEHEPUNKTE = {
  de: [['Ein Abend bei Stories VIII mit Tim Raue', 175], ['Eine Nacht im Schloss für zwei', 160], ['Das Chalet-Menü im NEO', 69], ['Eine Flasche Wein im NEO', 50, 1], ['Ein Platz beim Family Brunch im LAB', 49], ['Die Signature-Box der Ghost Kitchen', 49, 1]],
  en: [['An evening at Stories VIII with Tim Raue', 175], ['A night at the castle for two', 160], ['The Chalet menu at NEO', 69], ['A bottle of wine at NEO', 50, 1], ['A seat at the Family Brunch at l’ab', 49], ['The Ghost Kitchen Signature Box', 49, 1]],
};
const ANZAHL = INHALT.reduce((n, h) => n + h.e.length, 0);
const SUMME = INHALT.reduce((n, h) => n + h.e.reduce((m, x) => m + x[2], 0), 0);
if (ANZAHL !== 24 || SUMME !== 1249) throw new Error(`Störer: Kalenderinhalt passt nicht (${ANZAHL} Erlebnisse, ${SUMME} €)`);
const wert = (lang, n) => (lang === 'en' ? `€${n.toLocaleString('en-GB')}` : `${n.toLocaleString('de-DE')}&nbsp;€`);

// Kalendertag in Europe/Berlin als JJJJ-MM-TT (sv-SE liefert genau dieses Format)
export function berlinTag(jetzt = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(jetzt);
}

const TEXT = {
  de: {
    zu: 'Schließen',
    kicker: 'Adventskalender 2026',
    tonAn: 'Ton an', tonAus: 'Ton aus',
    titel: ['24 Momente aus', 'unseren Häusern.'],
    text: 'Vom 1. bis 24. Dezember jeden Tag ein Erlebnis per Mail, auch als Geschenk.',
    drin: 'Das steckt drin',
    alle: 'Alle 24 Erlebnisse ansehen',
    weniger: 'Liste schließen',
    t24: 'Türchen 24',
    zusammen: 'Zusammen 1.249 € · für 249 €',
    preis: '249 € · 1.249 € Gegenwert · 300 nummerierte Exemplare',
    knopf: 'Jetzt sichern',
    gutschein: 'Oder ein NEO-Gutschein in jeder Höhe&nbsp;→',
    svBandKicker: 'Silvester · 31. Dezember',
    svBandInfo: 'Zwei Snacks und fünf Gänge · 179 € pro Person',
    silvesterKnopf: 'Jetzt buchen',
    silvesterAria: 'Silvester 31. Dezember, Paris meets San Sebastián: jetzt buchen',
    svKicker: 'Silvester · 31.12.2026',
    svText: 'Zwei Snacks und fünf Gänge, Fleisch und Fisch oder vegetarisch. Ab 18 Uhr geöffnet, um 19 Uhr servieren wir das Menü. Auf Wunsch mit Weinbegleitung, 55&nbsp;€ pro&nbsp;Person.',
    svPreis: '179 € pro Person · ohne Getränke',
    svBildAlt: 'Champagner im Kühler, dahinter Gläser im NEO',
  },
  en: {
    zu: 'Close',
    kicker: 'Advent Calendar 2026',
    tonAn: 'Sound on', tonAus: 'Sound off',
    titel: ['24 moments from', 'our houses.'],
    text: 'One experience every day from 1 to 24 December by email, also as a gift.',
    drin: 'What’s inside',
    alle: 'See all 24 experiences',
    weniger: 'Close the list',
    t24: 'Door 24',
    zusammen: 'Worth €1,249 in total · for €249',
    preis: '€249 · worth €1,249 · 300 numbered editions',
    knopf: 'Get yours',
    svBandKicker: 'New Year’s Eve · 31 December',
    svBandInfo: 'Two snacks and five courses · €179 per person',
    silvesterKnopf: 'Book now',
    silvesterAria: 'New Year’s Eve, 31 December, Paris meets San Sebastián: book now',
    svKicker: 'New Year’s Eve · 31 Dec 2026',
    svText: 'Two snacks and five courses, meat and fish or vegetarian. Doors open at 6 pm, the menu is served at 7 pm. Wine pairing on request, €55 per&nbsp;person.',
    svPreis: '€179 per person · drinks not included',
    svBildAlt: 'Champagne on ice with glasses at NEO',
  },
};

const zuKnopf = (z) => `<button type="button" class="stoe-zu" data-stoe-zu aria-label="${z.zu}"><span aria-hidden="true">×</span></button>`;

function hoehepunkteHtml(lang) {
  return (HOEHEPUNKTE[lang] || HOEHEPUNKTE.de).map(([t, w, breit]) => `<li${breit ? ' class="stoe-nur-breit"' : ''}><span class="stoe-drin-t">${t}</span><span class="stoe-drin-w">${wert(lang, w)}</span></li>`).join('');
}

function alleHtml(z, lang) {
  const en = lang === 'en';
  return INHALT.map((h) => `<div class="stoe-haus"><p class="stoe-haus-name">${h.haus}</p><ul>${h.e
    .map(([de, eng, w, t24]) => `<li><span class="stoe-drin-t">${en ? eng : de}${t24 ? ` <em class="stoe-t24">${z.t24}</em>` : ''}</span><span class="stoe-drin-w">${wert(lang, w)}</span></li>`)
    .join('')}</ul></div>`).join('');
}

function adventKarte(z, svHref, lang) {
  return `<div class="stoe-karte stoe-karte-advent" data-art="advent" data-bis="${ADVENT_BIS}" role="dialog" aria-modal="true" aria-labelledby="stoe-titel-advent" tabindex="-1">
    ${zuKnopf(z)}
    <div class="stoe-medium"><video class="stoe-video" muted playsinline loop autoplay preload="none" aria-hidden="true" data-src-hoch="${VIDEO.hoch}" data-src-quer="${VIDEO.quer}" data-poster-hoch="${VIDEO.posterHoch}" data-poster-quer="${VIDEO.posterQuer}"></video><button type="button" class="stoe-ton" data-stoe-ton aria-pressed="false" data-an="${z.tonAn}" data-aus="${z.tonAus}" hidden><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path class="stoe-ton-laut" d="M3 9v6h4l5 4V5L7 9H3z" fill="currentColor"/><path class="stoe-ton-welle" d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path class="stoe-ton-strich" d="M15.5 9.5l5 5m0-5l-5 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span class="stoe-ton-text">${z.tonAn}</span></button></div>
    <div class="stoe-kopf">
      <p class="stoe-kicker">${z.kicker}</p>
      <h2 class="stoe-titel" id="stoe-titel-advent"><span class="stoe-z">${z.titel[0]}</span> <span class="stoe-z"><em>${z.titel[1]}</em></span></h2>
      <p class="stoe-text">${z.text}</p>
    </div>
    <div class="stoe-drin">
      <p class="stoe-drin-kopf">${z.drin}</p>
      <ul class="stoe-drin-liste">${hoehepunkteHtml(lang)}</ul>
      <button type="button" class="stoe-alle" data-stoe-alle aria-expanded="false" aria-controls="stoe-alle-liste" data-auf="${z.alle}" data-zu="${z.weniger}"><span class="stoe-alle-text">${z.alle}</span><span class="stoe-alle-pfeil" aria-hidden="true"></span></button>
    </div>
    <div class="stoe-kauf">
      <p class="stoe-preis sv-pk">${pk(z.preis)}</p>
      <a class="stoe-knopf stoe-knopf-rot" data-stoe-angebot href="${ADVENT_ZIEL}" target="_blank" rel="noopener">${z.knopf}</a>
      ${z.gutschein ? `<a class="stoe-gutschein" data-stoe-angebot href="${GUTSCHEIN_ZIEL}" target="_blank" rel="noopener">${z.gutschein}</a>` : ''}
    </div>
    <div class="stoe-alle-liste" id="stoe-alle-liste" hidden>
      ${alleHtml(z, lang)}
      <p class="stoe-summe sv-pk">${pk(z.zusammen)}</p>
    </div>
    <div class="stoe-sv">
      <div class="stoe-sv-medium"><img class="stoe-bild" data-src="${SILVESTER_BILD}" alt="" width="1067" height="600" decoding="async"></div>
      <div class="stoe-sv-inhalt">
        <p class="stoe-sv-kicker sv-pk">${pk(z.svBandKicker)}</p>
        <p class="stoe-sv-titel sv-titel"><span class="stoe-sv-z"><span class="sv-paris">Paris</span> <span class="sv-meets">meets</span></span> <span class="stoe-sv-z sv-ss">San&nbsp;Sebastián</span></p>
        <p class="stoe-sv-info sv-pk">${pk(z.svBandInfo)}</p>
        <a class="stoe-knopf stoe-knopf-sv" data-stoe-angebot href="${svHref}" target="_blank" rel="noopener" aria-label="${z.silvesterAria}">${z.silvesterKnopf}<span aria-hidden="true">→</span></a>
      </div>
    </div>
  </div>`;
}

function silvesterKarte(z, svHref) {
  return `<div class="stoe-karte stoe-karte-silvester" data-art="silvester" data-bis="${SILVESTER_BIS}" role="dialog" aria-modal="true" aria-labelledby="stoe-titel-silvester" tabindex="-1">
    ${zuKnopf(z)}
    <div class="stoe-medium"><img class="stoe-bild" data-src="${SILVESTER_BILD}" alt="${z.svBildAlt}" width="1067" height="600" decoding="async"></div>
    <div class="stoe-inhalt">
      <p class="stoe-kicker sv-pk">${pk(z.svKicker)}</p>
      <h2 class="stoe-titel stoe-titel-sv sv-titel" id="stoe-titel-silvester"><span class="stoe-z"><span class="sv-paris">Paris</span> <span class="sv-meets">meets</span></span> <span class="stoe-z sv-ss">San&nbsp;Sebastián</span></h2>
      <p class="stoe-text">${z.svText}</p>
      <p class="stoe-preis sv-pk">${pk(z.svPreis)}</p>
      <a class="stoe-knopf stoe-knopf-hell" data-stoe-angebot href="${svHref}" target="_blank" rel="noopener" aria-label="${z.silvesterAria}">${z.silvesterKnopf}</a>
    </div>
  </div>`;
}

// HTML des Störers; leer, wenn kein Angebot mehr gilt (nach dem 31.12.2026).
// Bis 24.12. stehen beide Karten im HTML: das Skript zeigt nach Mitternacht am 24.12. die Silvester-Karte,
// auch wenn die Seite noch aus der letzten Stunde stammt.
export function stoererHtml(lang, jetzt = new Date()) {
  const z = TEXT[lang] || TEXT.de;
  const svHref = silvesterStoererHref(lang === 'en' ? 'en' : 'de');
  const tag = berlinTag(jetzt);
  const karten = (tag <= ADVENT_BIS ? adventKarte(z, svHref, lang === 'en' ? 'en' : 'de') : '') + (tag <= SILVESTER_BIS ? silvesterKarte(z, svHref) : '');
  if (!karten) return '';
  return `<div class="stoe" id="neo-stoerer" data-schluessel="${SCHLUESSEL}" hidden>
  <div class="stoe-hg" data-stoe-zu></div>
  ${karten}
</div>`;
}

// Läuft direkt nach dem Störer-HTML (vor React).
export const STOERER_SKRIPT = `(function(){
var w=document.getElementById('neo-stoerer');if(!w)return;
var K=w.getAttribute('data-schluessel'),TAGE=7,html=document.documentElement,zeit=false,offen=false,weg=false,vorher=null;
function ls(f){try{return f(window.localStorage)}catch(e){return null}}
function raus(el){if(el&&el.parentNode)el.parentNode.removeChild(el)}
var tag;try{tag=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}catch(e){tag=new Date().toISOString().slice(0,10)}
var a=w.querySelector('[data-art="advent"]'),b=w.querySelector('[data-art="silvester"]');
if(a&&tag>a.getAttribute('data-bis')){raus(a);a=null}
if(b&&(a||tag>b.getAttribute('data-bis'))){raus(b);b=null}
var karte=a||b;if(!karte){raus(w);return}
var bis=+ls(function(s){return s.getItem(K)});if(bis&&Date.now()-bis<TAGE*864e5){raus(w);return}
function entschieden(){return !!ls(function(s){var e=JSON.parse(s.getItem('neo-consent')||'null');return e&&(e.wert==='ja'||e.wert==='nein')})}
var ruhig=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var spar=!!(navigator.connection&&navigator.connection.saveData);
var tonKnopf=karte.querySelector('[data-stoe-ton]');
function tonZeigen(v){if(!tonKnopf)return;tonKnopf.hidden=false;var an=!v.muted;tonKnopf.setAttribute('aria-pressed',an?'true':'false');tonKnopf.classList.toggle('stoe-ton-an',an);var t=tonKnopf.querySelector('.stoe-ton-text');if(t)t.textContent=tonKnopf.getAttribute(an?'data-aus':'data-an')}
function film(){var v=karte.querySelector('video');if(!v)return;var handy=!!(window.matchMedia&&matchMedia('(max-width: 899px)').matches);
v.poster=v.getAttribute(handy?'data-poster-quer':'data-poster-hoch');if(ruhig||spar)return;
v.src=v.getAttribute(handy?'data-src-quer':'data-src-hoch');
// Mit Musik starten (Sven 10.11.2026); verbietet der Browser Ton ohne Klick, läuft der Film stumm und der Knopf sagt „Ton an“
v.muted=false;v.volume=1;
function stumm(){v.muted=true;try{var q=v.play();if(q&&q.catch)q.catch(function(){})}catch(e){}tonZeigen(v)}
try{var p=v.play();if(p&&p.then)p.then(function(){tonZeigen(v)},stumm);else tonZeigen(v)}catch(e){stumm()}}
function ton(){var v=karte.querySelector('video');if(!v)return;v.muted=!v.muted;if(!v.muted){v.volume=1;try{var p=v.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}tonZeigen(v)}
function fokusbar(){var l=karte.querySelectorAll('a[href],button'),r=[],i;for(i=0;i<l.length;i++)if(l[i].offsetWidth||l[i].offsetHeight)r.push(l[i]);return r}
function zeigen(){offen=true;vorher=document.activeElement;w.hidden=false;html.classList.add('stoe-offen');var vv=karte.querySelector('video');if(vv&&vv.getAttribute('src')){try{var pp=vv.play();if(pp&&pp.catch)pp.catch(function(){})}catch(e){}}else film();var im=karte.querySelector('img[data-src]');if(im)im.src=im.getAttribute('data-src');void w.offsetWidth;w.classList.add('stoe-da');try{karte.focus({preventScroll:true})}catch(e){karte.focus()}}
function verstecken(){offen=false;w.classList.remove('stoe-da');w.hidden=true;html.classList.remove('stoe-offen');var v=karte.querySelector('video');if(v){try{v.pause()}catch(e){}}}
function pruefen(){if(weg)return;var darf=zeit&&entschieden()&&!html.classList.contains('einw-offen');if(darf&&!offen)zeigen();else if(!darf&&offen)verstecken()}
function zu(){if(weg||!offen)return;weg=true;offen=false;ls(function(s){s.setItem(K,String(Date.now()))});
var v=karte.querySelector('video');if(v){try{v.pause()}catch(e){}}
html.classList.remove('stoe-offen');w.classList.remove('stoe-da');w.classList.add('stoe-geht');
if(vorher&&vorher!==document.body&&vorher.focus&&document.contains(vorher)){try{vorher.focus({preventScroll:true})}catch(e){}}else if(w.contains(document.activeElement))document.activeElement.blur();
setTimeout(function(){w.hidden=true;raus(w)},ruhig?0:320)}
function alle(k){var l=document.getElementById(k.getAttribute('aria-controls'));if(!l)return;var auf=l.hidden;l.hidden=!auf;k.setAttribute('aria-expanded',auf?'true':'false');
var tx=k.querySelector('.stoe-alle-text');if(tx)tx.textContent=k.getAttribute(auf?'data-zu':'data-auf');
if(auf){var top=l.getBoundingClientRect().top-karte.getBoundingClientRect().top+karte.scrollTop-24;try{karte.scrollTo({top:top,behavior:ruhig?'auto':'smooth'})}catch(e){karte.scrollTop=top}}}
w.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;var k;if(t.closest('[data-stoe-zu]'))zu();else if(t.closest('[data-stoe-ton]'))ton();else if((k=t.closest('[data-stoe-alle]')))alle(k);else if(t.closest('[data-stoe-angebot]'))setTimeout(zu,0)});
document.addEventListener('keydown',function(e){if(!offen)return;
if(e.key==='Escape'||e.key==='Esc'){e.preventDefault();zu();return}
if(e.key!=='Tab')return;var f=fokusbar();if(!f.length){e.preventDefault();return}var i=f.indexOf(document.activeElement);
if(e.shiftKey){if(i<=0){e.preventDefault();f[f.length-1].focus()}}else if(i<0||i===f.length-1){e.preventDefault();f[0].focus()}});
window.addEventListener('neo-consent-change',function(){setTimeout(pruefen,600)});
if(window.MutationObserver)new MutationObserver(function(){if(!offen)setTimeout(pruefen,html.classList.contains('einw-offen')?0:600)}).observe(html,{attributes:true,attributeFilter:['class']});
setTimeout(function(){zeit=true;pruefen()},1000);
})();`;

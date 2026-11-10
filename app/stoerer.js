// Störer auf der Startseite (Sven 09.11.2026: „Störer mittig auf HP machen und geiler“, „gerne auch das Video des Kalenders“).
// Mittiges Overlay über dem Startbild, nur auf / und /en (app/(de)/page.js, app/(en)/en/page.js), Unterseiten werben nicht.
// Bis 24.12.2026: BLISS Adventskalender groß mit Kalender-Film (stummer Loop), darunter ein eigener Silvester-Streifen
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
const VIDEO = {
  // v2: ab dem Türchen-Zoom geschnitten (ohne die Titeleinblendung des Films), neuer Name gegen alten Browser-Cache
  hoch: '/video/stoerer-4x5-v2.mp4',
  quer: '/video/stoerer-16x9-v2.mp4',
  posterHoch: '/video/stoerer-4x5-v2-poster.webp',
  posterQuer: '/video/stoerer-16x9-v2-poster.webp',
};
const SILVESTER_BILD = '/img/silvester/champagner.webp';

// Kalendertag in Europe/Berlin als JJJJ-MM-TT (sv-SE liefert genau dieses Format)
export function berlinTag(jetzt = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(jetzt);
}

const TEXT = {
  de: {
    zu: 'Schließen',
    kicker: 'Adventskalender 2026',
    titel: ['24 Momente aus', 'unseren Häusern.'],
    text: 'Vom 1. bis 24. Dezember jeden Tag ein Erlebnis, digital per Mail, auch zum Verschenken.',
    preis: '249 € · 1.249 € Gegenwert · 300 nummerierte Exemplare',
    knopf: 'Jetzt sichern',
    svBandKicker: 'Silvester · 31. Dezember',
    svBandInfo: 'Zwei Snacks und fünf Gänge · 179 € pro Person',
    silvesterKnopf: 'Jetzt buchen',
    silvesterAria: 'Silvester 31. Dezember, Paris meets San Sebastián: jetzt buchen',
    svKicker: 'Silvester · 31.12.2026',
    svText: 'Zwei Snacks und fünf Gänge, Fleisch und Fisch oder vegetarisch. Ab 18 Uhr geöffnet, um 19 Uhr servieren wir das Menü.',
    svPreis: '179 € pro Person · ohne Getränke',
    svBildAlt: 'Champagner im Kühler, dahinter Gläser im NEO',
  },
  en: {
    zu: 'Close',
    kicker: 'Advent Calendar 2026',
    titel: ['24 moments from', 'our houses.'],
    text: 'One experience every day from 1 to 24 December, delivered by email, also as a gift.',
    preis: '€249 · worth €1,249 · 300 numbered editions',
    knopf: 'Get yours',
    svBandKicker: 'New Year’s Eve · 31 December',
    svBandInfo: 'Two snacks and five courses · €179 per person',
    silvesterKnopf: 'Book now',
    silvesterAria: 'New Year’s Eve, 31 December, Paris meets San Sebastián: book now',
    svKicker: 'New Year’s Eve · 31 Dec 2026',
    svText: 'Two snacks and five courses, meat and fish or vegetarian. Doors open at 6 pm, the menu is served at 7 pm.',
    svPreis: '€179 per person · drinks not included',
    svBildAlt: 'Champagne on ice with glasses at NEO',
  },
};

const zuKnopf = (z) => `<button type="button" class="stoe-zu" data-stoe-zu aria-label="${z.zu}"><span aria-hidden="true">×</span></button>`;

function adventKarte(z, svHref) {
  return `<div class="stoe-karte stoe-karte-advent" data-art="advent" data-bis="${ADVENT_BIS}" role="dialog" aria-modal="true" aria-labelledby="stoe-titel-advent" tabindex="-1">
    ${zuKnopf(z)}
    <div class="stoe-medium"><video class="stoe-video" muted playsinline loop autoplay preload="none" aria-hidden="true" data-src-hoch="${VIDEO.hoch}" data-src-quer="${VIDEO.quer}" data-poster-hoch="${VIDEO.posterHoch}" data-poster-quer="${VIDEO.posterQuer}"></video></div>
    <div class="stoe-inhalt">
      <p class="stoe-kicker">${z.kicker}</p>
      <h2 class="stoe-titel" id="stoe-titel-advent"><span class="stoe-z">${z.titel[0]}</span> <span class="stoe-z"><em>${z.titel[1]}</em></span></h2>
      <p class="stoe-text">${z.text}</p>
      <p class="stoe-preis sv-pk">${pk(z.preis)}</p>
      <a class="stoe-knopf stoe-knopf-rot" data-stoe-angebot href="${ADVENT_ZIEL}" target="_blank" rel="noopener">${z.knopf}</a>
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
  const karten = (tag <= ADVENT_BIS ? adventKarte(z, svHref) : '') + (tag <= SILVESTER_BIS ? silvesterKarte(z, svHref) : '');
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
function film(){var v=karte.querySelector('video');if(!v)return;var handy=!!(window.matchMedia&&matchMedia('(max-width: 899px)').matches);
v.poster=v.getAttribute(handy?'data-poster-quer':'data-poster-hoch');if(ruhig||spar)return;
v.muted=true;v.src=v.getAttribute(handy?'data-src-quer':'data-src-hoch');try{var p=v.play();if(p&&p.catch)p.catch(function(){})}catch(e){}}
function fokusbar(){var l=karte.querySelectorAll('a[href],button'),r=[],i;for(i=0;i<l.length;i++)if(l[i].offsetWidth||l[i].offsetHeight)r.push(l[i]);return r}
function zeigen(){offen=true;vorher=document.activeElement;w.hidden=false;html.classList.add('stoe-offen');film();var im=karte.querySelector('img[data-src]');if(im)im.src=im.getAttribute('data-src');void w.offsetWidth;w.classList.add('stoe-da');try{karte.focus({preventScroll:true})}catch(e){karte.focus()}}
function verstecken(){offen=false;w.classList.remove('stoe-da');w.hidden=true;html.classList.remove('stoe-offen')}
function pruefen(){if(weg)return;var darf=zeit&&entschieden()&&!html.classList.contains('einw-offen');if(darf&&!offen)zeigen();else if(!darf&&offen)verstecken()}
function zu(){if(weg||!offen)return;weg=true;offen=false;ls(function(s){s.setItem(K,String(Date.now()))});
var v=karte.querySelector('video');if(v){try{v.pause()}catch(e){}}
html.classList.remove('stoe-offen');w.classList.remove('stoe-da');w.classList.add('stoe-geht');
if(vorher&&vorher!==document.body&&vorher.focus&&document.contains(vorher)){try{vorher.focus({preventScroll:true})}catch(e){}}else if(w.contains(document.activeElement))document.activeElement.blur();
setTimeout(function(){w.hidden=true;raus(w)},ruhig?0:320)}
w.addEventListener('click',function(e){var t=e.target;if(!t||!t.closest)return;if(t.closest('[data-stoe-zu]'))zu();else if(t.closest('[data-stoe-angebot]'))setTimeout(zu,0)});
document.addEventListener('keydown',function(e){if(!offen)return;
if(e.key==='Escape'||e.key==='Esc'){e.preventDefault();zu();return}
if(e.key!=='Tab')return;var f=fokusbar();if(!f.length){e.preventDefault();return}var i=f.indexOf(document.activeElement);
if(e.shiftKey){if(i<=0){e.preventDefault();f[f.length-1].focus()}}else if(i<0||i===f.length-1){e.preventDefault();f[0].focus()}});
window.addEventListener('neo-consent-change',function(){setTimeout(pruefen,600)});
if(window.MutationObserver)new MutationObserver(function(){if(!offen)setTimeout(pruefen,html.classList.contains('einw-offen')?0:600)}).observe(html,{attributes:true,attributeFilter:['class']});
setTimeout(function(){zeit=true;pruefen()},1000);
})();`;

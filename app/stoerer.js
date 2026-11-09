// Störer zum Wegdrücken (Sven 09.11.2026: „wirklich Störer mit Text zum Wegdrücken, mach's geil“).
// Ersetzt die beiden runden Aufkleber im Startbild. Eine Karte, zwei Angebote: oben groß der BLISS Adventskalender,
// darunter als schmale Zeile Silvester. Desktop (ab 900 px) rechts unten, Handy als Blatt von unten.
// Steht auf allen Seiten (app/Grundgeruest.js); die Root-Layouts werden stündlich neu erzeugt (revalidate),
// damit die Datumsprüfung hier auf dem Server greift. Das Skript prüft die Daten im Browser zusätzlich.
// Erscheint etwa 1,2 s nach dem Laden, aber nie über dem Cookie-Hinweis: erst nach der Entscheidung dort.
// × oder ESC schließt und merkt sich das 7 Tage (localStorage, Schlüssel unten).
// Silvester-Zeile zweizeilig gesetzt (Datum / Titel) statt mit „·“: so steht nie ein Trennpunkt am Zeilenrand.
import { silvesterStoererHref } from './silvester';

export const ADVENT_BIS = '2026-12-24';
export const SILVESTER_BIS = '2026-12-31';
export const SCHLUESSEL = 'neo-stoerer-advent-2026';
const ADVENT_ZIEL = 'https://adventskalender.bliss-group.de/?utm_source=neo-heidelberg&amp;utm_medium=stoerer';

// Kalendertag in Europe/Berlin als JJJJ-MM-TT (sv-SE liefert genau dieses Format)
export function berlinTag(jetzt = new Date()) {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit' }).format(jetzt);
}

const TEXT = {
  de: {
    region: 'Aktuelle Angebote',
    zu: 'Schließen',
    kicker: 'Adventskalender 2026',
    titel: '24 Momente aus unseren Häusern',
    text: 'Vom 1. bis 24. Dezember jeden Tag ein Erlebnis, digital per Mail, auch zum Verschenken. 249 €, 1.249 € Gegenwert, 300 nummerierte Exemplare.',
    knopf: 'Jetzt sichern',
    knopfAria: 'BLISS Adventskalender 2026 jetzt sichern (öffnet in neuem Tab)',
    bildAlt: 'Türchen des BLISS Adventskalenders 2026',
    silvester: 'Silvester 31.12.',
    silvesterKnopf: 'Jetzt buchen',
    silvesterAria: 'Silvester 31. Dezember, Paris meets San Sebastián: jetzt buchen (öffnet in neuem Tab)',
  },
  en: {
    region: 'Current offers',
    zu: 'Close',
    kicker: 'Advent Calendar 2026',
    titel: '24 moments from our houses',
    text: 'One experience every day from 1 to 24 December, delivered by email, also as a gift. €249, worth €1,249, 300 numbered editions.',
    knopf: 'Get yours',
    knopfAria: 'Get the BLISS Advent Calendar 2026 (opens in a new tab)',
    bildAlt: 'Doors of the BLISS Advent Calendar 2026',
    silvester: 'New Year’s Eve 31&nbsp;Dec',
    silvesterKnopf: 'Book now',
    silvesterAria: 'New Year’s Eve, 31 December, Paris meets San Sebastián: book now (opens in a new tab)',
  },
};

// HTML des Störers; leer, wenn kein Angebot mehr gilt (nach dem 31.12.2026)
export function stoererHtml(lang, jetzt = new Date()) {
  const z = TEXT[lang] || TEXT.de;
  const tag = berlinTag(jetzt);
  const advent = tag <= ADVENT_BIS;
  const silvester = tag <= SILVESTER_BIS;
  if (!advent && !silvester) return '';
  const adventHtml = advent
    ? `<div class="stoe-advent" data-bis="${ADVENT_BIS}">
    <div class="stoe-bild"><img src="/img/stoerer/adventskalender.webp" alt="${z.bildAlt}" width="240" height="344" loading="lazy" decoding="async"></div>
    <div class="stoe-inhalt">
      <p class="stoe-kicker">${z.kicker}</p>
      <p class="stoe-titel">${z.titel}</p>
      <p class="stoe-text">${z.text}</p>
      <a class="stoe-knopf stoe-knopf-rot" href="${ADVENT_ZIEL}" target="_blank" rel="noopener" aria-label="${z.knopfAria}">${z.knopf}</a>
    </div>
  </div>`
    : '';
  const silvesterHtml = silvester
    ? `<div class="stoe-silvester" data-bis="${SILVESTER_BIS}">
    <p class="stoe-sv-text"><span class="stoe-sv-a">${z.silvester}</span> <span class="stoe-sv-b"><span class="sv-paris">Paris</span> meets <span class="sv-ss">San&nbsp;Sebastián</span></span></p>
    <a class="stoe-knopf stoe-knopf-hell" href="${silvesterStoererHref(lang === 'en' ? 'en' : 'de')}" target="_blank" rel="noopener" aria-label="${z.silvesterAria}">${z.silvesterKnopf}</a>
  </div>`
    : '';
  return `<aside class="stoe${advent ? '' : ' stoe-nur-silvester'}" id="neo-stoerer" aria-label="${z.region}" data-schluessel="${SCHLUESSEL}" hidden>
  <button type="button" class="stoe-zu" aria-label="${z.zu}"><span aria-hidden="true">×</span></button>
  ${adventHtml}
  ${silvesterHtml}
</aside>`;
}

// Läuft direkt nach dem Störer-HTML (vor React). Zeigt den Störer frühestens 1,2 s nach dem Laden und nur, wenn
// keine Cookie-Frage offen ist (html.einw-offen aus app/Einwilligung.js, Entscheidung in localStorage „neo-consent“).
export const STOERER_SKRIPT = `(function(){
var w=document.getElementById('neo-stoerer');if(!w)return;
var K=w.getAttribute('data-schluessel'),TAGE=7,html=document.documentElement,zeit=false,offen=false,weg=false;
function ls(f){try{return f(window.localStorage)}catch(e){return null}}
var tag;try{tag=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date())}catch(e){tag=new Date().toISOString().slice(0,10)}
var teile=w.querySelectorAll('[data-bis]'),i;for(i=0;i<teile.length;i++)if(tag>teile[i].getAttribute('data-bis'))teile[i].parentNode.removeChild(teile[i]);
if(!w.querySelector('[data-bis]')){w.parentNode.removeChild(w);return}
if(!w.querySelector('.stoe-advent'))w.classList.add('stoe-nur-silvester');
var bis=+ls(function(s){return s.getItem(K)});if(bis&&Date.now()-bis<TAGE*864e5){w.parentNode.removeChild(w);return}
function entschieden(){return !!ls(function(s){var e=JSON.parse(s.getItem('neo-consent')||'null');return e&&(e.wert==='ja'||e.wert==='nein')})}
var ruhig=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
function pruefen(){if(weg)return;var darf=zeit&&entschieden()&&!html.classList.contains('einw-offen');
if(darf&&!offen){offen=true;w.hidden=false;void w.offsetWidth;w.classList.add('stoe-da')}
else if(!darf&&offen){offen=false;w.classList.remove('stoe-da');w.hidden=true}}
function zu(){if(weg)return;weg=true;ls(function(s){s.setItem(K,String(Date.now()))});
if(w.contains(document.activeElement))document.activeElement.blur();
w.classList.remove('stoe-da');w.classList.add('stoe-geht');setTimeout(function(){w.hidden=true;w.parentNode&&w.parentNode.removeChild(w)},ruhig?0:320)}
w.querySelector('.stoe-zu').addEventListener('click',zu);
document.addEventListener('keydown',function(e){if((e.key==='Escape'||e.key==='Esc')&&offen&&!weg&&!html.classList.contains('sv-gross-offen'))zu()});
window.addEventListener('neo-consent-change',function(){setTimeout(pruefen,600)});
if(window.MutationObserver)new MutationObserver(function(){setTimeout(pruefen,html.classList.contains('einw-offen')?0:600)}).observe(html,{attributes:true,attributeFilter:['class']});
setTimeout(function(){zeit=true;pruefen()},1200);
})();`;

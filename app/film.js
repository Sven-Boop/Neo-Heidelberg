// Der BLISS-Group-Film (Fahrt durch alle Häuser, 102 s, Hochformat 9:16, mit Musik), seit 28.11.2026 auf bliss-group.de.
// Sven 28.11.2026: „bei den anderen [Websites] schau wo es passen könnte“, dann „finde das schon geil, verstecken will ich das net“:
//   1. im Fuß jeder Seite der Textlink „Film ansehen“ direkt hinter „Ein Haus der BLISS Group ↗“ (Copyright-Zeile)
//   2. auf der Startseite im Abschnitt „Acht Welten, eine Familie“ nach „BLISS Group entdecken“ ein Film-Block:
//      Standbild im Hochformat mit rundem Abspielknopf, daneben Überschrift, Satz und Knopf „Film ansehen“ (am Handy untereinander)
// Klick auf Bild, Knopf oder Link öffnet den Film bildschirmfüllend auf Schwarz über der Seite (mit Ton von vorn, Bedienelemente,
// × und ESC schließen, Fokus zurück, Seite scrollt solange nicht). Das Video-Element entsteht erst beim Klick, das Standbild lädt lazy.
// Ohne JavaScript führen alle auf bliss-group.de/film (neuer Tab).
// bodyHtml.js bleibt unverändert: Link und Block setzt mitFilm() beim Bauen ein (seitenTeile.js, app/(en)/en/page.js),
// das Skript FILM_SKRIPT läuft im <head> aller Seiten (Grundgeruest.js) und arbeitet per Ereignis-Delegation.

// nach 24.12.2026 kommt Fassung v2 ohne Palais, dann hier umstellen
export const FILM = {
  hevc: 'https://bliss-group.de/video/bliss-film-v1-1080-hevc.mp4',
  h264: 'https://bliss-group.de/video/bliss-film-v1-720.mp4',
  poster: 'https://bliss-group.de/video/bliss-film-v1-poster.webp',
  seite: 'https://bliss-group.de/film',
};

// Satz mit Hausnamen: nur LAB und NEO, damit nach dem 24.12.2026 (Palais raus) hier nichts geändert werden muss
const TEXT = {
  de: {
    ansehen: 'Film ansehen',
    titel: 'Die BLISS Group in 100 Sekunden',
    satz: 'Einmal durch alle Häuser der BLISS Group, vom LAB in Wiesloch bis ins NEO.',
    abspielen: 'Film abspielen, mit Ton',
    zu: 'Schließen',
    label: 'Der BLISS-Group-Film: eine Fahrt durch alle Häuser, mit Musik',
  },
  en: {
    ansehen: 'Watch the film',
    titel: 'The BLISS Group in 100 seconds',
    satz: 'Once through all BLISS Group houses, from LAB in Wiesloch to NEO.',
    abspielen: 'Play the film, with sound',
    zu: 'Close',
    label: 'The BLISS Group film: a ride through all our houses, with music',
  },
};

const PLAY = '<span class="film-dreieck" aria-hidden="true"></span>';

const ATTR = `href="${FILM.seite}" target="_blank" rel="noopener" data-bliss-film aria-haspopup="dialog"`;

function link(t, klasse) {
  return `<a class="${klasse}" ${ATTR}>${PLAY}${t.ansehen}</a>`;
}

// Film-Block im BLISS-Abschnitt: Standbild (lazy) mit Abspielknopf, Überschrift, Satz, Knopf im NEO-Stil (.btn)
function block(t) {
  return `<div class="bliss-film-block" data-film-abschnitt>
    <a class="bliss-film-poster" ${ATTR} aria-label="${t.abspielen}">
      <img src="${FILM.poster}" width="720" height="1280" alt="" loading="lazy" decoding="async">
      <span class="bliss-film-play" aria-hidden="true"></span>
    </a>
    <div class="bliss-film-text">
      <h3>${t.titel}</h3>
      <p>${t.satz}</p>
      <a class="btn bliss-film-knopf" ${ATTR}>${t.ansehen}</a>
    </div>
  </div>`;
}

// Setzt die Links ein: Fuß (hinter dem „Ein Haus der BLISS Group“-Span) und, wo vorhanden, den BLISS-Abschnitt der Startseite.
// Jede Marke darf höchstens einmal vorkommen; mindestens eine muss gefunden werden, sonst bricht der Build ab.
export function mitFilm(html, sprache) {
  const t = TEXT[sprache === 'en' ? 'en' : 'de'];
  let neu = html;
  let treffer = 0;
  const einmal = (marke) => {
    const a = neu.indexOf(marke);
    if (a >= 0 && neu.indexOf(marke, a + 1) >= 0) throw new Error('film: Marke mehrfach gefunden: ' + marke);
    return a;
  };
  // 1. Fuß: <span class="nb foot-haus">Ein Haus der <a …>BLISS Group ↗</a></span>
  const f = einmal('<span class="nb foot-haus">');
  if (f >= 0) {
    const ende = neu.indexOf('</span>', f) + '</span>'.length;
    neu = neu.slice(0, ende) + ' ' + link(t, 'nb foot-film') + neu.slice(ende);
    treffer++;
  }
  // 2. Startseite: Block direkt nach <div class="bliss-cta">…</div> (Knopf „BLISS Group entdecken“ bleibt, wie er ist)
  const b = einmal('<div class="bliss-cta">');
  if (b >= 0) {
    const ende = neu.indexOf('</div>', b) + '</div>'.length;
    neu = neu.slice(0, ende) + '\n  ' + block(t) + neu.slice(ende);
    treffer++;
  }
  if (!treffer) throw new Error('film: weder Fuß noch BLISS-Abschnitt gefunden');
  return neu;
}

// Großmodus: entsteht beim ersten Klick auf [data-bliss-film] und bleibt danach (versteckt) in der Seite.
// HEVC zuerst (iPhone, Mac, die meisten Handys), sonst H.264 720p. Sprache aus <html lang>.
export const FILM_SKRIPT = `(function(){
var Q=${JSON.stringify(FILM)},T=${JSON.stringify({ de: { zu: TEXT.de.zu, label: TEXT.de.label }, en: { zu: TEXT.en.zu, label: TEXT.en.label } })};
var k=null,v=null,z=null,vorher=null,offen=false,html=document.documentElement;
function bauen(){var t=T[(html.lang||'de').slice(0,2)==='en'?'en':'de'];
k=document.createElement('div');k.className='bliss-kino';k.setAttribute('role','dialog');k.setAttribute('aria-modal','true');k.setAttribute('aria-label',t.label);k.setAttribute('data-bliss-kino','');k.hidden=true;
v=document.createElement('video');v.className='bliss-kino-video';v.controls=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.poster=Q.poster;v.setAttribute('aria-label',t.label);
var s1=document.createElement('source');s1.src=Q.hevc;s1.type='video/mp4; codecs="hvc1"';var s2=document.createElement('source');s2.src=Q.h264;s2.type='video/mp4';v.appendChild(s1);v.appendChild(s2);
z=document.createElement('button');z.type='button';z.className='bliss-kino-zu';z.setAttribute('aria-label',t.zu);z.setAttribute('data-bliss-kino-zu','');z.innerHTML='<span aria-hidden="true">×</span>';
k.appendChild(v);k.appendChild(z);document.body.appendChild(k);
k.addEventListener('click',function(e){if(e.target===k||(e.target.closest&&e.target.closest('.bliss-kino-zu')))zu()})}
function auf(opener){if(!k)bauen();vorher=opener||document.activeElement;k.hidden=false;html.classList.add('bliss-kino-offen');offen=true;void k.offsetWidth;k.classList.add('da');
try{v.currentTime=0}catch(e){}v.muted=false;v.volume=1;try{var p=v.play();if(p&&p.catch)p.catch(function(){})}catch(e){}
try{z.focus({preventScroll:true})}catch(e){z.focus()}}
function zu(){if(!offen)return;offen=false;try{v.pause()}catch(e){}
if(document.fullscreenElement&&document.exitFullscreen){try{document.exitFullscreen()}catch(e){}}
k.classList.remove('da');k.hidden=true;html.classList.remove('bliss-kino-offen');
var f=vorher;vorher=null;if(f&&f.focus&&document.contains(f)){try{f.focus({preventScroll:true})}catch(e){f.focus()}}}
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('[data-bliss-film]');
if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();auf(a)});
document.addEventListener('keydown',function(e){if(!offen||document.fullscreenElement||document.webkitFullscreenElement)return;
if(e.key==='Escape'||e.key==='Esc'){e.preventDefault();e.stopImmediatePropagation();zu();return}
if(e.key==='Tab'){e.preventDefault();(document.activeElement===z?v:z).focus()}},true);
})();`;

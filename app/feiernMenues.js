// Startseite, Abschnitt „Feiern im NEO“ (Entwurf 19.10.2026): Menüliste und „ab“-Preis kommen aus
// app/menuvorschlaege.json (Abzug aus dem Werkzeug NEO Wintermenüs, erneuern nur mit scripts/menues-holen.mjs).
// Im Seiten-HTML stehen Markierungen (<!--FEIERN-MENUES-->, <!--MENUE-AB-->, <!--FEIERN-SPALTE-->, <!--MENUE-SATZ-->).
import MENUES from './menuvorschlaege.json';

const esc = (x) => String(x ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const betrag = (p) => parseFloat(String(p).replace(/[^0-9,]/g, '').replace(',', '.')) || 0;
// Alle Menüs, günstigstes zuerst (Sven 19.10.2026: die Menüs gibt es in jedem Raum, egal ob Chalet oder NEO)
const RESTAURANT = (MENUES.menues || []).slice().sort((a, b) => betrag(a.preis) - betrag(b.preis));

function zeile(m) {
  return `<li><a class="ev-menue-zeile" href="/firmenfeier#menue-${esc(m.id)}"><span class="ev-menue-kopf"><span class="ev-menue-name">${esc(m.titel)}</span>${m.zeilen && m.zeilen.length ? `<span class="ev-menue-zeilen">${m.zeilen.map(esc).join(' · ')}</span>` : ''}</span><span class="ev-menue-preis"><span class="ev-menue-betrag">${esc(m.preis)}</span>${m.preisZusatz ? `<span class="ev-menue-zusatz">${esc(m.preisZusatz)}</span>` : ''}</span></a></li>`;
}

const zwischen = (name) => new RegExp(`<!--${name}-->[\\s\\S]*?<!--/${name}-->`, 'g');

export function mitFeiernMenues(html) {
  if (!RESTAURANT.length) return html.replace(zwischen('FEIERN-SPALTE'), '').replace(zwischen('MENUE-SATZ'), '');
  const ab = 'ab ' + esc(RESTAURANT[0].preis).replace(' ', '&nbsp;');
  return html
    .replace(zwischen('FEIERN-MENUES'), `<ul class="ev-menue-liste feiern-menues">${RESTAURANT.map(zeile).join('')}</ul>`)
    .replace(zwischen('MENUE-AB'), ab);
}

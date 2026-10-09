import { bodyHtml } from './bodyHtml';

// Seiten-HTML mit einer anderen aktiven Unterseite (für /speisekarte und /hochzeit).
// Das Startvideo lädt dort nicht automatisch mit; es startet erst, wenn die Startseite sichtbar wird.
export function subpageHtml(seite) {
  let h = bodyHtml;
  const ersetze = (alt, neu) => {
    if (!h.includes(alt)) throw new Error('subpageHtml: Markup nicht gefunden: ' + alt);
    h = h.replace(alt, neu);
  };
  ersetze('<div class="subpage active" id="page-home">', '<div class="subpage" id="page-home">');
  ersetze(`<div class="subpage" id="page-${seite}">`, `<div class="subpage active" id="page-${seite}">`);
  ersetze('autoplay muted loop playsinline preload="auto"', 'muted loop playsinline preload="none"');
  return h;
}

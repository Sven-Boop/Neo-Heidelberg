// Gemeinsame Häuser-Leiste der BLISS-Websites (wie l'ab, STORIES, SOUL; Sven 17.10.2026: „ja mach überall“).
// Reihenfolge fest; das eigene Haus (NEO) steht ohne Link da. Logos in public/img/haeuser, einfarbig
// in der hellen Fußfarbe (Weiß). w/h = Pixelmaß der Datei, hoehe = Logohöhe am Desktop in px
// (optisch abgeglichen: runde/hohe Marken größer, breite Wortmarken kleiner, Zelle immer 44 px).
// Die Leiste wird beim Bauen vor die Copyright-Zeile des Fußes gesetzt (seitenTeile.js für alle
// deutschen Seiten, app/(en)/en/page.js für Englisch); bodyHtml.js selbst bleibt unverändert.
// Bewusst kein <nav>: globals.css gestaltet das nackte nav-Element als feste Kopfleiste.
export const HAEUSER = [
  { name: 'NEO', href: 'https://www.neo-heidelberg.de', logo: '/img/haeuser/neo.png', w: 148, h: 148, hoehe: 42, eigenes: true },
  { name: 'Schloss Neckarbischofsheim', href: 'https://www.schloss-nbh.de', logo: '/img/haeuser/sn.png', w: 82, h: 149, hoehe: 42 },
  { name: "l'ab Wiesloch", href: 'https://www.lab-wiesloch.de', logo: '/img/haeuser/lab.png', w: 192, h: 105, hoehe: 30 },
  { name: 'SOUL Catering', href: 'https://soul.bliss-group.de', logo: '/img/haeuser/soul.png', w: 321, h: 138, hoehe: 28 },
  { name: 'BAM! Foodtruck', href: 'https://neo-foodtruck.de', logo: '/img/haeuser/bam.png', w: 247, h: 109, hoehe: 28 },
  { name: 'STORIES', href: 'https://www.stories-popup-kitchen.de', logo: '/img/haeuser/stories.png', w: 244, h: 81, hoehe: 32 },
  { name: 'Bliss Kids', href: 'https://www.bliss-kids.de', logo: '/img/haeuser/kids.png', w: 107, h: 132, hoehe: 44 },
  { name: 'BLISS Group', href: 'https://bliss-group.de', logo: '/img/haeuser/bliss.svg', w: 57, h: 56, hoehe: 36 },
];

const TITEL = { de: 'Die Häuser der BLISS Group', en: 'The Houses of BLISS Group' };

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function haeuserLeisteHtml(sprache) {
  const titel = TITEL[sprache];
  const punkte = HAEUSER.map((h) => {
    const bild = `<img src="${h.logo}" alt="${esc(h.name)}" width="${h.w}" height="${h.h}" loading="lazy" decoding="async">`;
    return h.eigenes
      ? `<li style="--lh:${h.hoehe}px"><span class="hl-logo" aria-current="page">${bild}</span></li>`
      : `<li style="--lh:${h.hoehe}px"><a class="hl-logo" href="${h.href}" target="_blank" rel="noopener">${bild}</a></li>`;
  }).join('');
  return `<div class="haeuser-leiste" role="navigation" aria-label="${titel}"><p class="hl-titel">${titel}</p><ul>${punkte}</ul></div>\n\n  `;
}

// Setzt die Leiste direkt vor die Copyright-Zeile (genau eine im Fuß, sonst bricht der Build ab)
export function mitHaeuserLeiste(html, sprache) {
  const marke = '<div class="foot-bottom">';
  const a = html.indexOf(marke);
  if (a < 0 || html.indexOf(marke, a + 1) >= 0) throw new Error('haeuser: Copyright-Zeile im Fuß nicht eindeutig gefunden');
  return html.slice(0, a) + haeuserLeisteHtml(sprache) + html.slice(a);
}

// Täglicher Kontroll-Lauf für neo-heidelberg.de (GitHub Actions, Playwright).
// Prüft: Startseite lädt, Anfrageformular ist klickbar und sendet wirklich (Kontroll-Anfrage mit
// _kontrolle=1 → /api/anfrage → Resend → NUR an sven@bliss-group.de), Hochzeits- und EN-Formular
// sind da, der Reservieren-Knopf ist mobil sichtbar, die API-Route antwortet.
// Schlägt etwas fehl → Exit 1 → GitHub schickt „All jobs have failed" an Sven.
// Zusätzlich: Bericht per Mail an sven@bliss-group.de über /api/kontrolle (Ausweis = GitHub-OIDC-Token).
//
// Lokal: SITE_URL=https://…vercel.app PW_CHANNEL=chrome node scripts/formular-check.cjs
let pw;
try { pw = require('playwright'); } catch { pw = require('playwright-core'); }
const { chromium } = pw;

const BASIS = (process.env.SITE_URL || 'https://neo-heidelberg.de').replace(/\/+$/, '');
const HEUTE = new Date().toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });
const fehler = [];
const protokoll = [];
const log = (...a) => { const z = new Date().toISOString().slice(11, 19) + ' ' + a.join(' '); protokoll.push(z); console.log(z); };
const pruefe = (ok, text) => { log(ok ? '✓' : '✗', text); if (!ok) fehler.push(text); };

// Alarm an Sven: über die Website (Resend-Key liegt dort), Ausweis = GitHub-OIDC-Token — kein Secret im Repo.
async function alarm(betreff, text) {
  try {
    const url = process.env.ACTIONS_ID_TOKEN_REQUEST_URL, tok = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
    if (!url || !tok) { console.log('kein OIDC-Token (läuft nicht in Actions) — Alarm nur im Log'); return; }
    const { value } = await fetch(`${url}&audience=neo-heidelberg-kontrolle`, { headers: { Authorization: `bearer ${tok}` } }).then((r) => r.json());
    const r = await fetch(`${BASIS}/api/kontrolle`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: value, betreff, text }) });
    console.log('Alarm-Mail:', r.status, await r.text().catch(() => ''));
  } catch (e) { console.log('Alarm-Mail fehlgeschlagen:', e.message); }
}

// Liegt an der Stelle des Elements wirklich das Element (oder eine unsichtbare Schicht darüber)?
async function trifft(page, selector) {
  const loc = page.locator(selector).first();
  if (!(await loc.count())) return false;
  await loc.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !!hit && (hit === el || el.contains(hit));
  }, selector);
}

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {}),
    args: ['--use-mock-keychain'],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const jsFehler = [];
  page.on('pageerror', (e) => jsFehler.push(e.message));

  // 1) Startseite: erreichbar, Formular da, klickbar, Tippen kommt an
  // 'load' statt 'networkidle': das Hero-Video streamt nach dem Laden weiter, „Netz ruhig“ käme evtl. nie
  const r = await page.goto(BASIS + '/', { waitUntil: 'load', timeout: 60000 });
  pruefe(r && r.ok(), `Startseite lädt (HTTP ${r && r.status()})`);
  await page.waitForTimeout(2500);
  const F = '#anfrage-form';
  const formDa = (await page.locator(F).count()) === 1;
  pruefe(formDa, 'Anfrageformular auf der Startseite vorhanden');
  if (formDa) {
    pruefe(await trifft(page, `${F} [name=name]`), 'Klick trifft das Namensfeld im Formular');
    await page.click(`${F} [name=name]`);
    await page.keyboard.type('abc');
    pruefe((await page.inputValue(`${F} [name=name]`)) === 'abc', 'Tippen im Formularfeld kommt an');

    // 2) Kontroll-Anfrage wirklich absenden (geht NUR an sven@bliss-group.de)
    await page.evaluate((sel) => { const f = document.querySelector(sel); const i = document.createElement('input'); i.type = 'hidden'; i.name = '_kontrolle'; i.value = '1'; f.appendChild(i); }, F);
    await page.fill(`${F} [name=name]`, 'Formular-Check Startseite');
    await page.fill(`${F} [name=mail]`, 'sven@bliss-group.de');
    await page.fill(`${F} [name=nachricht]`, `Automatischer Kontroll-Lauf ${HEUTE}. Kommt diese Mail täglich an, funktioniert das Formular. Kann gelöscht werden.`);
    const [antwort] = await Promise.all([
      page.waitForResponse((x) => x.url().includes('/api/anfrage') && x.request().method() === 'POST', { timeout: 20000 }).catch(() => null),
      page.click(`${F} .af-submit`),
    ]);
    const body = antwort ? await antwort.text().catch(() => '') : '';
    log('Antwort /api/anfrage:', antwort ? antwort.status() : 'keine', body.slice(0, 200));
    pruefe(!!antwort && antwort.status() === 200 && /"ok":true/.test(body), 'Formular: Versand über /api/anfrage (Resend) angenommen');
    await page.waitForTimeout(1200);
    const danke = await page.evaluate((sel) => { const s = document.querySelector(sel + ' .af-status'); return s && s.classList.contains('ok') && /Danke|Thank/.test(s.textContent) ? s.textContent : ''; }, F);
    pruefe(!!danke, `Formular: Danke-Meldung angezeigt${danke ? ` („${danke.slice(0, 40)}…“)` : ''}`);
  }

  // 3) Hochzeits-Unterseite: Formular vorhanden und klickbar
  await page.evaluate(() => { location.hash = 'hochzeit-anfrage'; });
  await page.waitForTimeout(1200);
  pruefe(await trifft(page, '#anfrage-form-hochzeit [name=name]'), 'Hochzeit: Formularfeld klickbar');

  // 4) Englische Seite: lädt, Formular vorhanden und klickbar
  const en = await page.goto(BASIS + '/en', { waitUntil: 'load', timeout: 60000 }).catch(() => null);
  pruefe(en && en.ok(), `/en lädt (HTTP ${en && en.status()})`);
  await page.waitForTimeout(2500);
  if (en && en.ok()) pruefe(await trifft(page, '#anfrage-form [name=name]'), '/en: Formularfeld klickbar');
  pruefe(jsFehler.length === 0, `Keine JS-Fehler (${jsFehler.length}${jsFehler.length ? ': ' + jsFehler.slice(0, 3).join(' | ') : ''})`);

  // 5) Mobil: Reservieren-Knopf in der Kopfzeile sichtbar
  const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await mob.goto(BASIS + '/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await mob.waitForTimeout(1500);
  const knopf = await mob.evaluate(() => {
    const a = document.querySelector('#nav .nav-cta');
    if (!a) return null;
    const r = a.getBoundingClientRect();
    const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return { sichtbar: r.width > 0 && r.height > 0 && r.top >= 0 && r.right <= window.innerWidth && !!hit && (hit === a || a.contains(hit)), h: Math.round(r.height) };
  });
  pruefe(!!knopf && knopf.sichtbar, `Mobil: Reservieren-Knopf sichtbar (${knopf ? knopf.h + ' px hoch' : 'fehlt'})`);

  // 6) API-Route antwortet — nur Erreichbarkeit, Honeypot verhindert jede Mail
  const api = await page.request.post(`${BASIS}/api/anfrage`, { multipart: { name: 'x', mail: 'x@x.de', _honey: 'bot' } }).catch(() => null);
  pruefe(api && api.status() === 200, `API-Route /api/anfrage erreichbar (HTTP ${api && api.status()})`);

  await browser.close();

  if (fehler.length) {
    const text = `Kontroll-Lauf neo-heidelberg.de vom ${HEUTE} (${BASIS}) — ${fehler.length} Problem(e):\n\n- ${fehler.join('\n- ')}\n\nDetails im GitHub-Actions-Log (Repo Sven-Boop/Neo-Heidelberg, Workflow „Formular-Check“).`;
    console.error('\n' + text);
    await alarm(`⚠️ neo-heidelberg.de: Formular/Seite kaputt (${fehler.length})`, text + '\n\nProtokoll:\n' + protokoll.join('\n'));
    process.exit(1);
  }
  log(`Alles in Ordnung — ${HEUTE} (${BASIS})`);
})().catch(async (e) => {
  console.error('Kontroll-Lauf abgebrochen:', e);
  await alarm('⚠️ neo-heidelberg.de: Kontroll-Lauf abgebrochen', `Fehler: ${(e && e.stack) || e}\n\nBisherige Prüfungen:\n${protokoll.join('\n')}`);
  process.exit(1);
});

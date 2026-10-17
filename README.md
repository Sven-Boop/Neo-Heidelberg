# NEO – Bar & Restaurant Heidelberg (Website)

Next.js-Projekt (App Router) der NEO-Website. Inhalt, CSS und Interaktionen (Hash-Router, Slider, Family-Day-Modal, Live-Öffnungsstatus) stammen 1:1 aus der finalen HTML-Version und laufen unverändert.

## Lokal starten

Voraussetzung: Node.js 18 oder neuer.

```bash
npm install
npm run dev
```

Dann im Browser: http://localhost:3000

## Auf GitHub laden

```bash
git init
git add .
git commit -m "NEO website"
git branch -M main
git remote add origin https://github.com/<DEIN-USER>/<REPO>.git
git push -u origin main
```

## Auf Vercel deployen

1. Auf https://vercel.com mit GitHub einloggen.
2. **Add New → Project** → das Repo importieren.
3. Vercel erkennt Next.js automatisch – keine Einstellungen nötig. **Deploy** klicken.
4. Fertig. Für die echte Domain neo-heidelberg.de unter **Settings → Domains** hinterlegen.

## Struktur

```
app/
  layout.js        – <html>, SEO-Metadaten, JSON-LD, Plausible-Analytics
  page.js          – Startseite (rendert den Seiteninhalt)
  globals.css      – komplettes Styling
  SiteScripts.js   – führt die Original-Skripte clientseitig aus
  bodyHtml.js      – Seiteninhalt (HTML)
  siteScripts.js   – gebündelte Interaktions-Skripte
  structuredData.js– JSON-LD
  icon.png         – Favicon
```

## Ändern

- **Texte/Inhalt:** `app/bodyHtml.js`
- **Styling:** `app/globals.css`
- **Slider-Folien:** im `SPECIALS`-Array in `app/siteScripts.js`
- **SEO/Meta:** `app/layout.js`

## Menüvorschläge auf den Anlass-Seiten (seit 17.10.2026)

/weihnachtsfeier und /firmenfeier zeigen den Abschnitt „Menüvorschläge“ (/eventlocation-heidelberg eine Kurzfassung, Sprungmarke `#menuevorschlaege`). Die Daten stehen in `app/menuvorschlaege.json`, einem Abzug aus dem Werkzeug „NEO Wintermenüs“ (Supabase kv `nwm:stand`, aufbereitet mit dessen `migrieren()`). Nur NEO-Menüs, ohne LAB-Vorschläge (`lab-…`), ohne Silvester, ohne gestrichene Menüs und Gerichte, ohne interne Felder. Die JSON-Datei nie von Hand ändern.

Nach Menüänderungen im Werkzeug den Abzug erneuern:

```bash
node scripts/menues-holen.mjs   # liest nwm:stand (nur lesend), schreibt app/menuvorschlaege.json
npx next build                  # bauen und prüfen
git add app/menuvorschlaege.json && git commit -m "Menüvorschläge: neuer Abzug aus nwm:stand" && git push   # Push = Deploy über Vercel
```

Das Skript braucht `../neo-wintermenues-online/index.html` und die Supabase-Werte aus `../neo-wintermenues-online/.env.local` (oder `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` in der Umgebung, anderer Pfad über `NWM_ENV`). Schlüssel nie ausgeben oder committen, kein `vercel env pull`. Auf der Seite gibt es keinen Link auf das Bearbeitungswerkzeug.

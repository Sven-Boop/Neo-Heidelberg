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

'use client';
import { useEffect } from 'react';

// Setzt das <html lang="…">-Attribut zur Laufzeit (das Root-Layout rendert lang="de").
// So bekommen die englischen Seiten korrekt lang="en" für Screenreader/SEO.
export default function SetLang({ lang }) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);
  return null;
}

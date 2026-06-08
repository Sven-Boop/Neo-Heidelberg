'use client';
import { useEffect } from 'react';
import { siteScripts } from './inlineScripts';

// Führt die Original-Inline-Skripte (Router, Slider, Modal, Status …) nach dem
// Mount EINMAL im globalen Scope aus – so funktionieren auch die Inline-onclicks.
export default function SiteScripts() {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (document.getElementById('__neo_inline_scripts')) return;
    const s = document.createElement('script');
    s.id = '__neo_inline_scripts';
    s.textContent = siteScripts;
    document.body.appendChild(s);
  }, []);
  return null;
}

import { notFound } from 'next/navigation';

// Catch-All: Mit zwei Root-Layouts (Routengruppen) greift not-found.js nur,
// wenn eine Route der Gruppe notFound() aufruft. Ohne diese Route käme für
// unbekannte Pfade die ungestylte Standard-404.
export default function CatchAll() {
  notFound();
}

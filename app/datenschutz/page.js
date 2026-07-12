import { datenschutzHtml } from './content';

export const metadata = {
  title: 'Datenschutz — NEO Bar & Restaurant Heidelberg',
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <main className="legal-page">
      <div className="legal-inner">
        <a href="/" className="legal-back">← Zurück zur Startseite</a>
        <div className="eyebrow">Rechtliches</div>
        <h1>Datenschutz</h1>
        <div
          className="legal-body"
          dangerouslySetInnerHTML={{ __html: datenschutzHtml }}
        />
      </div>
    </main>
  );
}

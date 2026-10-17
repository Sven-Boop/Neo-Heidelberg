'use client';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname() || '';
  const en = pathname.startsWith('/en');

  const t = en
    ? {
        h1a: 'Page not ',
        h1b: 'found.',
        p: "This page doesn't exist — but a table with us does. Zollhofgarten 2, Heidelberg.",
        cta: 'To homepage',
        home: '/en',
      }
    : {
        h1a: 'Seite nicht ',
        h1b: 'gefunden.',
        p: 'Diese Seite gibt es nicht — aber einen Tisch bei uns schon. Zollhofgarten 2, Heidelberg.',
        cta: 'Zur Startseite',
        home: '/',
      };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
        background: '#161b22',
        color: '#fff',
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: '#aac8da',
          marginBottom: 24,
        }}
      >
        NEO — Bar &amp; Restaurant
      </div>
      <h1 style={{ fontSize: 'clamp(40px, 8vw, 80px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 18, textTransform: 'uppercase' }}>
        {t.h1a}
        <em style={{ fontStyle: 'italic', color: '#aac8da' }}>{t.h1b}</em>
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '46ch', lineHeight: 1.7, marginBottom: 36 }}>
        {t.p}
      </p>
      <a
        href={t.home}
        style={{
          padding: '16px 32px',
          background: '#aac8da',
          color: '#0a0f14',
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
      >
        {t.cta}
      </a>
    </div>
  );
}

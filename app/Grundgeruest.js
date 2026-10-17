// Gemeinsames Grundgerüst der beiden Root-Layouts (app/(de)/layout.js mit
// lang="de" und app/(en)/layout.js mit lang="en"). Seit 17.10.2026 gibt es zwei
// Root-Layouts, damit /en schon im Server-HTML lang="en" trägt (vorher stellte
// erst SetLang im Browser um).
import './globals.css';
import { Lato } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Einwilligung } from './Einwilligung';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const VIEWPORT = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#161b22',
};

// Lazy-Hintergrundbilder (läuft im <head>, noch vor React und unabhängig vom JS-Bundle):
// setzt .js am <html> — die CSS-Regel in globals.css hält data-lazy-Hintergründe dann zurück —
// und gibt jedes Bild (bzw. data-poster beim 10-Jahre-Video) erst frei, wenn die Stelle bis auf
// ~900 px an den Viewport herankommt. So lädt beim Start fast nur das Hero-Standbild.
const lazyBilder = `(function(){var d=document.documentElement;d.classList.add('js');
function an(el){el.classList.add('lz-in');var p=el.getAttribute('data-poster');if(p){el.setAttribute('poster',p);el.removeAttribute('data-poster');}}
function los(){var els=document.querySelectorAll('[data-lazy],[data-poster]');var i;
if(!('IntersectionObserver' in window)){for(i=0;i<els.length;i++)an(els[i]);return;}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){an(e.target);io.unobserve(e.target);}});},{rootMargin:'900px 0px'});
for(i=0;i<els.length;i++)io.observe(els[i]);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',los);else los();})();`;

export function Grundgeruest({ lang, children }) {
  return (
    <html lang={lang} className={lato.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/video/neo-hero-poster.webp" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: lazyBilder }} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <Einwilligung />
      </body>
    </html>
  );
}

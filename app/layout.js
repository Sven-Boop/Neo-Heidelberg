import './globals.css';
import { Lato } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

export const metadata = {
  metadataBase: new URL('https://www.neo-heidelberg.de'),
  title: 'NEO \u2014 Bar & Restaurant Heidelberg | Dry-Aged \u00b7 Sushi \u00b7 Bar',
  description:
    'Seit 2016 in der Bahnstadt: Dry-Aged aus dem Humidor, Californisches Sushi, eigene Bar. NEO Heidelberg \u2014 Feed your soul.',
  keywords: [
    'Neo Heidelberg', 'Restaurant Heidelberg', 'Bar Heidelberg', 'Dry Aged Steak',
    'Sushi Heidelberg', 'Hochzeit Heidelberg', 'Bahnstadt Restaurant', 'Zollhofgarten',
  ],
  authors: [{ name: 'NEO Bar & Restaurant Heidelberg' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.neo-heidelberg.de/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'NEO Bar & Restaurant',
    url: 'https://www.neo-heidelberg.de/',
    title: 'NEO \u2014 Bar & Restaurant Heidelberg',
    description: 'Seit 2016 in der Bahnstadt. Dry-Aged, Californisches Sushi, eigene Bar. Feed your soul.',
    images: [{ url: 'https://www.neo-heidelberg.de/img/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEO \u2014 Bar & Restaurant Heidelberg',
    description: 'Dry-Aged \u00b7 Sushi \u00b7 Bar \u00b7 Feed your soul.',
    images: ['https://www.neo-heidelberg.de/img/og-image.jpg'],
  },
};

export const viewport = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={lato.variable} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/video/neo-hero-poster.webp" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: lazyBilder }} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import { bodyHtml } from './bodyHtml';
import SiteScripts from './SiteScripts';
import { structuredData } from './structuredData';

export const metadata = {
  alternates: {
    canonical: 'https://www.neo-heidelberg.de/',
    languages: {
      'de-DE': 'https://www.neo-heidelberg.de/',
      'en': 'https://www.neo-heidelberg.de/en',
    },
  },
};

export default function Home() {
  return (
    <>
      {structuredData.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SiteScripts />
    </>
  );
}

import { bodyHtml } from './bodyHtml';
import SiteScripts from './SiteScripts';

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
      <div id="app-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SiteScripts />
    </>
  );
}

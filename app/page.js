import { bodyHtml } from './bodyHtml';
import SiteScripts from './SiteScripts';

export default function Home() {
  return (
    <>
      <div id="app-root" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <SiteScripts />
    </>
  );
}

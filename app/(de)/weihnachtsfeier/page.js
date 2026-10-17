import { anlassHtml, anlassMetadata, anlassLd } from '../../anlassSeiten';
import SiteScripts from '../../SiteScripts';

export const metadata = anlassMetadata('weihnachtsfeier');

const html = anlassHtml('weihnachtsfeier');
const ld = anlassLd('weihnachtsfeier');

export default function Seite() {
  return (
    <>
      {ld.map((json, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
      ))}
      <div id="app-root" dangerouslySetInnerHTML={{ __html: html }} />
      <SiteScripts />
    </>
  );
}

import SetLang from '../../SetLang';

export const metadata = {
  title: 'Legal Notice — NEO Bar & Restaurant Heidelberg',
  robots: { index: false },
  alternates: { canonical: 'https://www.neo-heidelberg.de/en/impressum' },
};

export default function ImpressumEN() {
  return (
    <main className="legal-page">
      <SetLang lang="en" />
      <div className="legal-inner">
        <a href="/en" className="legal-back">← Back to homepage</a>
        <div className="eyebrow">Legal</div>
        <h1>Legal Notice</h1>

        <p style={{ opacity: 0.7 }}>
          This is an English courtesy translation. The legally binding version is the{' '}
          <a href="/impressum/">German Impressum</a>.
        </p>

        <h2>Information pursuant to § 5 DDG</h2>
        <p>
          NEO – Gastronomie GmbH<br />
          Zollhofgarten 2<br />
          69115 Heidelberg<br />
          Germany
        </p>

        <h2>Represented by</h2>
        <p>
          Daniel Marquardt (Managing Director)<br />
          Sven Günther (Managing Director)<br />
          Swen Schmidt (Managing Director)<br />
          Jens Schmidt (Managing Director)
        </p>

        <h2>Contact</h2>
        <p>
          Phone: <a href="tel:+4962214050660">06221 4050660</a><br />
          Email: <a href="mailto:info@neo-heidelberg.de">info@neo-heidelberg.de</a>
        </p>

        <h2>Register entry</h2>
        <p>
          Register: Commercial Register (Handelsregister)<br />
          Registering court: Mannheim<br />
          Registration number: HRB 721728
        </p>

        <h2>VAT ID</h2>
        <p>DE300169324</p>

        <h2>Liability for links</h2>
        <p>
          Our website contains links to external third-party websites over whose content we
          have no influence. We therefore cannot accept any liability for this third-party
          content. The respective provider or operator of the linked pages is always
          responsible for their content. The linked pages were checked for possible legal
          violations at the time of linking. Illegal content was not identifiable at the time
          of linking. However, permanent monitoring of the content of the linked pages is not
          reasonable without concrete evidence of a legal violation. Upon becoming aware of
          any legal violations, we will remove such links immediately.
        </p>

        <h2>Liability for content</h2>
        <p>
          The content of our pages was created with the greatest care. However, we cannot
          guarantee the accuracy, completeness or timeliness of the content. As a service
          provider, we are responsible for our own content on these pages in accordance with
          general law pursuant to § 5 DDG. However, as a service provider we are not obliged
          to monitor transmitted or stored third-party information or to investigate
          circumstances that indicate illegal activity. Obligations to remove or block the use
          of information under general law remain unaffected. Liability in this respect,
          however, is only possible from the point in time at which we become aware of a
          concrete legal violation. Upon becoming aware of such legal violations, we will
          remove this content immediately.
        </p>

        <h2>Copyright</h2>
        <p>
          The content and works created by the site operators on these pages are subject to
          German copyright law. Reproduction, editing, distribution and any kind of use
          outside the limits of copyright require the written consent of the respective author
          or creator. Downloads and copies of this page are permitted for private,
          non-commercial use only. Insofar as the content on this page was not created by the
          operator, the copyrights of third parties are respected. In particular, third-party
          content is identified as such. Should you nevertheless become aware of a copyright
          infringement, please let us know. Upon becoming aware of any legal violations, we
          will remove such content immediately.
        </p>
      </div>
    </main>
  );
}

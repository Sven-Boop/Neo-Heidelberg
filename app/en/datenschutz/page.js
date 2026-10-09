import SetLang from '../../SetLang';

export const metadata = {
  title: 'Privacy Policy — NEO Bar & Restaurant Heidelberg',
  robots: { index: false },
  alternates: { canonical: 'https://www.neo-heidelberg.de/en/datenschutz' },
};

export default function DatenschutzEN() {
  return (
    <main className="legal-page">
      <SetLang lang="en" />
      <div className="legal-inner">
        <a href="/en" className="legal-back">← Back to homepage</a>
        <div className="eyebrow">Legal</div>
        <h1>Privacy Policy</h1>

        <p style={{ opacity: 0.7 }}>
          This is an English courtesy translation. The legally binding version is the{' '}
          <a href="/datenschutz/">German Datenschutzerklärung</a>.
        </p>

        <h2>1. Controller</h2>
        <p>
          The controller within the meaning of the General Data Protection Regulation (GDPR)
          is:<br />
          NEO – Gastronomie GmbH<br />
          Zollhofgarten 2 · 69115 Heidelberg<br />
          Email: <a href="mailto:info@neo-heidelberg.de">info@neo-heidelberg.de</a> ·
          Phone: 06221 7239099
        </p>

        <h2>2. General information on data processing</h2>
        <p>
          As a rule, we only process personal data of our visitors insofar as this is
          necessary to provide a functional website and to handle enquiries. This website uses{' '}
          <strong>no cookies</strong> for marketing or tracking purposes and does not integrate
          any advertising services. Transmission is always TLS-encrypted (https).
        </p>

        <h2>3. Hosting (Vercel)</h2>
        <p>
          This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
          USA (“Vercel”). When the website is accessed, Vercel processes technically necessary
          connection data (including IP address, date and time of access, page accessed,
          browser type) in order to deliver the website and ensure the security and stability
          of operation. The legal basis is our legitimate interest in the secure and efficient
          provision of the website (Art. 6(1)(f) GDPR). A data processing agreement is in place
          with Vercel; insofar as data is transferred to the USA, this is done on the basis of
          the EU Standard Contractual Clauses and the EU-US Data Privacy Framework. Server logs
          are automatically deleted by Vercel after a short time.
        </p>

        <h2>4. Reach measurement (Vercel Analytics &amp; Speed Insights)</h2>
        <p>
          To improve our offering, we use Vercel Analytics and Vercel Speed Insights. These
          services work <strong>without cookies</strong> and without cross-device tracking:
          aggregated, anonymised usage data is collected (e.g. page views, loading times,
          approximate region of origin, device type); the IP address is not stored permanently
          and visitors are not identified personally. The legal basis is our legitimate
          interest in the statistical evaluation and technical optimisation of the website
          (Art. 6(1)(f) GDPR).
        </p>

        <h2>5. Contact and event enquiries</h2>
        <p>
          If you write to us by email or use our enquiry form (e.g. for reservations, wedding,
          corporate, event or group enquiries), we process the data you provide (name, email
          address, and where applicable phone number, occasion, preferred date, number of guests
          and your message) exclusively to handle and respond
          to your enquiry. The legal basis is Art. 6(1)(b) GDPR (performance of pre-contractual
          measures) or Art. 6(1)(f) GDPR. Your data is deleted as soon as it is no longer
          required for processing and no statutory retention obligations conflict with this. We
          handle table reservations via our service provider Gastronaut; their privacy notice
          applies additionally.
        </p>
        <p>
          <strong>Enquiry form:</strong> the details from the form are passed via our server to the
          email delivery service Resend (Resend, Inc., USA) and delivered to us by email to
          info@neo-heidelberg.de and to the events team of the BLISS Group (sales@bliss-group.de),
          of which NEO is a part. The sole purpose is to handle and respond to your enquiry; the
          legal basis is Art. 6(1)(b) GDPR or Art. 6(1)(f) GDPR. Resend processes the data solely for
          delivery on our behalf under a data processing agreement; transfers to the USA are based
          on the EU Standard Contractual Clauses. The form data is not stored on the website itself.
          We delete enquiry emails once the enquiry has been fully handled and no statutory
          retention obligations apply; if a contract is concluded, the commercial and tax retention
          periods apply (up to six or ten years). A hidden extra field only serves to block
          automated spam submissions and contains no personal data.
        </p>

        <h2>6. Newsletter</h2>
        <p>
          To receive our newsletter, we process your email address on the basis of your consent
          (Art. 6(1)(a) GDPR). You can withdraw your consent at any time with effect for the
          future — via the unsubscribe link in the newsletter or informally to{' '}
          <a href="mailto:info@neo-heidelberg.de">info@neo-heidelberg.de</a>. After withdrawal,
          your email address is removed from the distribution list.
        </p>
        <p>
          Sign-up uses a double opt-in: your address is only added to the list after you click the
          link in the confirmation email. Sending and managing sign-ups is handled on our behalf by
          the email service Resend (Resend, Inc., USA) under a data processing agreement; transfers
          to the USA are based on the EU Standard Contractual Clauses.
        </p>

        <h2>7. External links and services</h2>
        <p>
          Our website links to external offerings (e.g. the Gastronaut reservation system, our
          Sushi 2 Go pick-up ordering page, Instagram, Facebook and Tripadvisor). When you click
          these links, you leave our website; the privacy policy of the respective provider
          then applies. Content from these providers is not embedded on our website.
        </p>

        <h2>8. Your rights</h2>
        <p>
          You have the following rights with regard to the personal data concerning you: the
          right to information (Art. 15 GDPR), rectification (Art. 16 GDPR), erasure (Art. 17
          GDPR), restriction of processing (Art. 18 GDPR), data portability (Art. 20 GDPR) and
          objection to processing based on Art. 6(1)(f) GDPR (Art. 21 GDPR). You can withdraw
          any consent given at any time. You also have the right to lodge a complaint with a
          data protection supervisory authority; the competent authority is the State
          Commissioner for Data Protection and Freedom of Information Baden-Württemberg,
          Lautenschlagerstraße 20, 70173 Stuttgart.
        </p>

        <h2>9. Currency of this policy</h2>
        <p>
          As of October 2026. We will adjust this privacy policy as soon as the data processing on
          this website changes.
        </p>
      </div>
    </main>
  );
}

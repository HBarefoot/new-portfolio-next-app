import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Astral Events Miami LLC d/b/a Barefoot Digital collects, uses, discloses, and safeguards personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6 py-20 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              <strong>Astral Events Miami LLC</strong>, a Florida limited liability company,
              doing business as <strong>Barefoot Digital</strong>
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Effective Date: June 28, 2026 &middot; Last Updated: June 28, 2026
            </p>
          </div>

          {/* Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none
                       prose-headings:scroll-mt-24
                       prose-a:text-blue-600 dark:prose-a:text-blue-400
                       prose-table:text-sm"
          >
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard
              personal information when you visit{' '}
              <a href="https://www.barefootdigital.dev">https://www.barefootdigital.dev</a>{' '}
              (the &ldquo;Website&rdquo;) or engage our services. By using the Website, you
              agree to the practices described here.
            </p>

            <h2>1. Who We Are</h2>
            <p>
              We are the operating business of Astral Events Miami LLC, doing business as
              Barefoot Digital, a technology consultancy providing AI-powered automation,
              custom AI/LLM workflows, full-stack engineering, and related advisory and
              training services.
            </p>
            <p>
              <strong>Controller / Contact:</strong>
            </p>
            <ul>
              <li>
                <strong>Entity:</strong> Astral Events Miami LLC d/b/a Barefoot Digital
              </li>
              <li>
                <strong>Mailing Address:</strong> 7901 4th Street N, Suite 300, St.
                Petersburg, FL 33702, United States
              </li>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a>
              </li>
            </ul>
            <p>
              For the purposes of the EU/UK GDPR, Astral Events Miami LLC is the
              &ldquo;controller&rdquo; of personal information processed through the Website.
              For the purposes of U.S. state privacy laws, we are the &ldquo;business&rdquo;
              that determines the purposes and means of processing.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>2.1 Information You Provide</h3>
            <ul>
              <li>
                <strong>Contact details:</strong> name, email address, phone number, and
                company name when you submit a form, request a consultation or audit, or
                download a resource.
              </li>
              <li>
                <strong>Communications:</strong> the contents of messages, inquiries, and
                feedback you send us.
              </li>
              <li>
                <strong>Business information:</strong> details you share about your workflows,
                systems, and automation needs.
              </li>
            </ul>
            <h3>2.2 Information Collected Automatically</h3>
            <ul>
              <li>
                <strong>Device and technical data:</strong> browser type, operating system,
                device identifiers, IP address, and approximate (city/region-level) location.
              </li>
              <li>
                <strong>Usage data:</strong> pages viewed, time on page, click activity, and
                referral source.
              </li>
            </ul>
            <h3>2.3 Interactive Demos</h3>
            <p>
              The Website may offer interactive demonstrations. Information you enter into a
              demo is processed only to generate the demo result for that session and is{' '}
              <strong>not stored or retained</strong> after the session ends. Demos are
              provided for evaluation only.
            </p>
            <h3>2.4 Cookies and Similar Technologies</h3>
            <p>
              We use cookies and similar technologies for site functionality, analytics, and
              advertising measurement. See <strong>Section 4</strong> for the specific tools,
              and <strong>Section 7</strong> for your choices.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use personal information to:</p>
            <ul>
              <li>
                respond to inquiries, schedule consultations, and provide and improve our
                services;
              </li>
              <li>
                send you resources or updates you request, and, with your consent or where
                permitted, relevant marketing communications (see Section 11);
              </li>
              <li>operate, secure, and analyze the performance of the Website;</li>
              <li>measure the effectiveness of our advertising; and</li>
              <li>comply with legal obligations and protect our legal rights.</li>
            </ul>
            <h3>3.1 AI Processing</h3>
            <p>
              Certain Website features and demos use the <strong>Anthropic (Claude)</strong>{' '}
              API to generate outputs. Information you submit to those features is processed
              solely to deliver the requested result and is{' '}
              <strong>
                not used to train Anthropic&rsquo;s or any third party&rsquo;s AI models
              </strong>{' '}
              under our commercial terms with Anthropic. AI outputs may contain errors and
              should be reviewed by a qualified human before reliance.
            </p>

            <h2>4. Cookies, Analytics, and Advertising</h2>
            <p>
              We use the following categories of technologies on the Website:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Category</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Google Tag Manager</td>
                  <td>Functional</td>
                  <td>Tag and script management</td>
                </tr>
                <tr>
                  <td>Cloudflare Analytics</td>
                  <td>Analytics</td>
                  <td>Privacy-friendly, aggregated performance metrics</td>
                </tr>
                <tr>
                  <td>Vercel Analytics</td>
                  <td>Analytics</td>
                  <td>Core Web Vitals and site performance</td>
                </tr>
                <tr>
                  <td>Meta Pixel</td>
                  <td>Advertising</td>
                  <td>Conversion measurement and ad delivery</td>
                </tr>
                <tr>
                  <td>LinkedIn Insight Tag</td>
                  <td>Advertising</td>
                  <td>B2B conversion measurement and ad delivery</td>
                </tr>
              </tbody>
            </table>
            <p>
              <strong>Important &mdash; advertising and &ldquo;sharing&rdquo;:</strong> The
              Meta Pixel and LinkedIn Insight Tag enable cross-context behavioral advertising.
              Under the California Consumer Privacy Act, as amended (CCPA/CPRA), this activity
              is treated as the <strong>&ldquo;sharing&rdquo;</strong> of personal information.{' '}
              <strong>We do not &ldquo;sell&rdquo; your personal information for money.</strong>{' '}
              You can opt out of this sharing &mdash; see Section 7.
            </p>
            <p>
              Where required (including for visitors in the EU/UK), non-essential cookies and
              advertising technologies are only set <strong>after you provide consent</strong>{' '}
              through our cookie banner. We honor recognized opt-out preference signals,
              including the <strong>Global Privacy Control (GPC)</strong>.
            </p>

            <h2>5. Service Providers and Subprocessors</h2>
            <p>
              We share personal information with the following service providers, who process
              it only to provide services to us and under contractual confidentiality and
              data-protection obligations:
            </p>
            <table>
              <thead>
                <tr>
                  <th>Provider</th>
                  <th>Role</th>
                  <th>Data Involved</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel</td>
                  <td>Hosting of the public Website</td>
                  <td>Site traffic and form data in transit</td>
                </tr>
                <tr>
                  <td>Railway</td>
                  <td>
                    Hosting of our backend and self-hosted applications (including our CRM and
                    automation tooling)
                  </td>
                  <td>Contact/lead data and application data</td>
                </tr>
                <tr>
                  <td>Cloudflare</td>
                  <td>CDN, security, and analytics</td>
                  <td>Traffic and technical data</td>
                </tr>
                <tr>
                  <td>Google (Google Workspace)</td>
                  <td>Business email and mailbox</td>
                  <td>Email content and contact details</td>
                </tr>
                <tr>
                  <td>Resend</td>
                  <td>Transactional email delivery</td>
                  <td>Email address and message content</td>
                </tr>
                <tr>
                  <td>Anthropic</td>
                  <td>AI features and interactive demos</td>
                  <td>Inputs you submit to AI features (transient; not retained)</td>
                </tr>
                <tr>
                  <td>Meta Platforms</td>
                  <td>Advertising measurement and delivery</td>
                  <td>Online identifiers and activity</td>
                </tr>
                <tr>
                  <td>LinkedIn</td>
                  <td>Advertising measurement and delivery</td>
                  <td>Online identifiers and professional/demographic data</td>
                </tr>
              </tbody>
            </table>
            <blockquote>
              <p>
                <strong>Note:</strong> Contact and lead information is stored in our{' '}
                <strong>self-hosted CRM running on Railway infrastructure</strong>, not a
                third-party CRM service.
              </p>
            </blockquote>
            <p>
              We may also disclose information where required by law, to enforce our
              agreements, or in connection with a merger, acquisition, or sale of assets.{' '}
              <strong>We do not sell your personal information.</strong>
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain personal information only as long as necessary for the purposes
              described above:
            </p>
            <ul>
              <li>
                <strong>Contact / lead data:</strong> up to 3 years from your last
                interaction, or until you request deletion.
              </li>
              <li>
                <strong>Communication records:</strong> up to 3 years, or longer where
                required for legal or accounting purposes.
              </li>
              <li>
                <strong>Analytics data:</strong> per each provider&rsquo;s default retention
                (typically up to 26 months).
              </li>
              <li>
                <strong>Demo inputs:</strong> not retained beyond the active session.
              </li>
            </ul>
            <p>
              We retain information longer only where required by law or for the
              establishment, exercise, or defense of legal claims.
            </p>

            <h2>7. Your Privacy Rights and Choices</h2>
            <h3>7.1 All Visitors</h3>
            <p>You may, at any time:</p>
            <ul>
              <li>request access to the personal information we hold about you;</li>
              <li>request correction of inaccurate information;</li>
              <li>request deletion of your information;</li>
              <li>opt out of marketing communications; and</li>
              <li>
                opt out of advertising cookies via our cookie banner or by enabling GPC in
                your browser.
              </li>
            </ul>
            <p>
              To exercise any right, email{' '}
              <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a> or write
              to the mailing address in Section 1. We will respond within the timeframe
              required by applicable law (generally within 30&ndash;45 days).
            </p>
            <h3>7.2 California Residents (CCPA/CPRA)</h3>
            <p>If you are a California resident, you have the right to:</p>
            <ul>
              <li>
                <strong>Know / access</strong> the categories and specific pieces of personal
                information we collect, the sources, the purposes, and the categories of
                recipients;
              </li>
              <li>
                <strong>Delete</strong> personal information we have collected, subject to
                legal exceptions;
              </li>
              <li>
                <strong>Correct</strong> inaccurate personal information;
              </li>
              <li>
                <strong>Opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo;</strong> of
                personal information. We do not sell personal information; we do
                &ldquo;share&rdquo; it for cross-context behavioral advertising as described
                in Section 4, and you may opt out;
              </li>
              <li>
                <strong>Limit the use of sensitive personal information</strong> (note: we do
                not use sensitive personal information for purposes that trigger this right);
                and
              </li>
              <li>
                <strong>Non-discrimination</strong> for exercising your rights.
              </li>
            </ul>
            <p>
              <strong>To opt out of sharing:</strong> use the cookie banner on the Website,
              enable Global Privacy Control, or email{' '}
              <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a> with the
              subject &ldquo;Do Not Sell or Share.&rdquo; You may use an authorized agent to
              submit requests. We will verify your request as required by law.
            </p>
            <h3>7.3 EU / UK Residents (GDPR / UK GDPR)</h3>
            <p>
              If you are in the European Economic Area or the United Kingdom, you have the
              right to access, rectify, erase, restrict, or object to processing of your
              personal information, the right to data portability, and the right to withdraw
              consent at any time (without affecting prior processing).
            </p>
            <p>
              <strong>Legal bases.</strong> We process personal information on the basis of:
              your <strong>consent</strong> (e.g., marketing, non-essential cookies); our{' '}
              <strong>legitimate interests</strong> (e.g., operating and securing the Website,
              responding to inquiries); the <strong>performance of a contract</strong>; and{' '}
              <strong>compliance with legal obligations</strong>.
            </p>
            <p>
              You also have the right to lodge a complaint with your local supervisory
              authority (in the UK, the Information Commissioner&rsquo;s Office).
            </p>

            <h2>8. How to Exercise Your Rights</h2>
            <p>
              <strong>By email:</strong>{' '}
              <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a> (subject
              line: &ldquo;Privacy Request&rdquo;)
            </p>
            <p>
              <strong>By mail:</strong>
              <br />
              Astral Events Miami LLC d/b/a Barefoot Digital
              <br />
              Attn: Privacy
              <br />
              7901 4th Street N, Suite 300
              <br />
              St. Petersburg, FL 33702, United States
            </p>
            <p>
              <strong>Process:</strong> We acknowledge requests promptly, may request
              information to verify your identity, and complete verified requests within the
              period required by applicable law. We will not discriminate against you for
              exercising your rights.
            </p>

            <h2>9. Data Security</h2>
            <p>
              We use industry-standard measures to protect personal information, including:
            </p>
            <ul>
              <li>
                <strong>Encryption</strong> of data in transit (TLS) and at rest;
              </li>
              <li>
                <strong>Access controls</strong>, including multi-factor authentication for
                administrative access;
              </li>
              <li>
                <strong>Secure infrastructure</strong> hosted with Vercel (public Website) and
                Railway (backend and self-hosted applications), with automated backups; and
              </li>
              <li>
                <strong>Network security and monitoring</strong> via Cloudflare.
              </li>
            </ul>
            <p>
              Our service providers maintain their own security and compliance programs. No
              method of transmission or storage is completely secure, and we cannot guarantee
              absolute security.
            </p>

            <h2>10. Children&rsquo;s Privacy</h2>
            <p>
              The Website and our services are directed to businesses and are not intended for
              individuals under <strong>16</strong>. We do not knowingly collect personal
              information from anyone under 16. If you believe a child has provided us personal
              information, contact us and we will delete it.
            </p>

            <h2>11. Marketing Communications</h2>
            <p>
              If you opt in to receive resources, newsletters, or other marketing emails, you
              may unsubscribe at any time using the link in any such email or by emailing{' '}
              <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a>. Marketing
              emails will identify us and include our mailing address, consistent with the
              CAN-SPAM Act. Transactional and service-related messages (for example, responses
              to your inquiries) are not marketing communications.
            </p>

            <h2>12. International Data Transfers</h2>
            <p>
              We are based in the United States, and personal information we process is stored
              and processed in the United States. If you access the Website from outside the
              United States, you understand your information will be transferred to and
              processed in the United States. Where required, we rely on appropriate
              safeguards (such as Standard Contractual Clauses) for international transfers.
            </p>

            <h2>13. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will post the updated
              version on this page with a revised &ldquo;Last Updated&rdquo; date and, for
              material changes, provide additional notice where required.
            </p>

            <h2>14. Contact Us</h2>
            <p>
              <strong>Astral Events Miami LLC d/b/a Barefoot Digital</strong>
              <br />
              Email:{' '}
              <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a>
              <br />
              Mail: 7901 4th Street N, Suite 300, St. Petersburg, FL 33702, United States
              <br />
              Website:{' '}
              <a href="https://www.barefootdigital.dev">https://www.barefootdigital.dev</a>
            </p>

            <hr />
            <p>
              <em>
                &copy; 2026 Astral Events Miami LLC d/b/a Barefoot Digital. All rights
                reserved.
              </em>
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}

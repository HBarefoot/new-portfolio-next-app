import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Astral Events Miami LLC d/b/a Barefoot Digital governing use of the Website and our services.',
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6 py-20 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              <strong>Astral Events Miami LLC</strong>, a Florida limited liability company,
              doing business as <strong>Barefoot Digital</strong>
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Effective Date: June 28, 2026
            </p>
          </div>

          {/* Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none
                       prose-headings:scroll-mt-24
                       prose-a:text-blue-600 dark:prose-a:text-blue-400
                       prose-table:text-sm"
          >
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using the Barefoot Digital website at{' '}
              <a href="https://www.barefootdigital.dev">https://www.barefootdigital.dev</a>{' '}
              (the &ldquo;Website&rdquo;) or engaging our services, you (&ldquo;you&rdquo; or
              &ldquo;Client&rdquo;) agree to be bound by these Terms of Service
              (&ldquo;Terms&rdquo;). If you do not agree, do not use the Website or our
              services.
            </p>
            <p>
              These Terms are entered into with{' '}
              <strong>
                Astral Events Miami LLC, a Florida limited liability company, doing business as
                Barefoot Digital.
              </strong>{' '}
              Barefoot Digital is a registered fictitious name of the company.
            </p>
            <p>
              <strong>Contact:</strong>
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

            <h2>2. Services</h2>
            <p>
              Barefoot Digital is a technology consultancy. Our services include, without
              limitation:
            </p>
            <ul>
              <li>
                <strong>AI Efficiency Audits:</strong> flat-fee diagnostics that identify
                automation opportunities and provide actionable recommendations;
              </li>
              <li>
                <strong>Custom AI / LLM Workflows:</strong> intelligent document processing,
                retrieval-augmented generation (RAG), AI agents, and related systems;
              </li>
              <li>
                <strong>Automation Engineering:</strong> workflow design, implementation, and
                integration (including n8n and similar platforms);
              </li>
              <li>
                <strong>Full-Stack Engineering:</strong> design and development of production
                applications and infrastructure;
              </li>
              <li>
                <strong>Advisory, Enablement, and Training:</strong> strategy, architecture
                review, and education relating to AI adoption.
              </li>
            </ul>
            <p>
              The specific scope, deliverables, fees, and timeline for any engagement are
              governed by a separate written agreement (such as a Master Services Agreement
              and/or Statement of Work). In the event of a conflict between these Terms and a
              signed engagement agreement, the signed agreement controls for that engagement.
            </p>
            <h3>2.1 Interactive Demos</h3>
            <p>
              The Website may include interactive demonstrations. Demos are provided{' '}
              <strong>&ldquo;as is&rdquo; for evaluation only</strong>, may not reflect
              production capabilities, carry no service-level commitment, and do not persist
              data entered into them. Features may change without notice.
            </p>

            <h2>3. Acceptable Use</h2>
            <p>You agree not to use the Website or our services to:</p>
            <ul>
              <li>violate any applicable law or regulation;</li>
              <li>infringe the intellectual property or other rights of any third party;</li>
              <li>transmit malware, viruses, or other harmful code;</li>
              <li>
                engage in unauthorized data collection, scraping, or access to systems or data
                you are not authorized to use;
              </li>
              <li>send spam or unsolicited commercial communications;</li>
              <li>
                harass, abuse, or harm others, or impersonate any person or entity; or
              </li>
              <li>
                interfere with the proper functioning or security of the Website or our
                services.
              </li>
            </ul>
            <p>
              <strong>AI usage guidelines.</strong> When using our AI-powered tools or demos,
              you agree not to submit the personal data of others without a lawful basis, not
              to attempt to extract proprietary prompts or configurations, and not to use
              outputs for illegal, harmful, or deceptive purposes. You understand AI outputs
              may contain errors and require human review.
            </p>

            <h2>4. Intellectual Property</h2>
            <h3>4.1 Our Property</h3>
            <p>
              All content on the Website &mdash; including text, graphics, logos, branding,
              code, documentation, workflow templates, automation patterns, blog posts, and
              educational materials &mdash; is owned by or licensed to Astral Events Miami LLC
              d/b/a Barefoot Digital and is protected by intellectual property laws. The
              &ldquo;Barefoot Digital&rdquo; name and logo are our trademarks.
            </p>
            <h3>4.2 Client Work Product</h3>
            <p>
              For custom engagements, and subject to full payment and the terms of the
              applicable engagement agreement:
            </p>
            <ul>
              <li>
                <strong>Client deliverables:</strong> upon full payment, you receive ownership
                of the custom code and workflows created specifically for your project;
              </li>
              <li>
                <strong>Retained rights:</strong> we retain all rights to our pre-existing
                materials, methodologies, generic and reusable components, tools, and know-how,
                and we retain a perpetual right to use the general skills, concepts, and
                techniques developed in the course of any engagement; and
              </li>
              <li>
                <strong>Portfolio rights:</strong> unless otherwise agreed in writing, we may
                identify you as a client and describe the engagement (without disclosing your
                confidential information) in our portfolio and marketing.
              </li>
            </ul>
            <h3>4.3 Open-Source Components</h3>
            <p>
              Deliverables may incorporate open-source software, which remains subject to its
              own license (e.g., MIT, Apache 2.0). Our own open-source projects (for example,{' '}
              <strong>Engram</strong>, distributed under the MIT License) are governed by their
              respective licenses, which control over these Terms with respect to that
              software.
            </p>

            <h2>5. Payment Terms</h2>
            <h3>5.1 Pricing</h3>
            <p>
              Prices are quoted in U.S. dollars unless otherwise stated. Quotes are valid for
              30 days unless otherwise specified. We may modify pricing with reasonable notice.
            </p>
            <h3>5.2 Payment Schedule</h3>
            <p>
              For project-based work, unless otherwise stated in the engagement agreement:
            </p>
            <ul>
              <li>
                <strong>Deposit:</strong> 50% due upon project commencement;
              </li>
              <li>
                <strong>Milestones:</strong> per the schedule in the applicable Statement of
                Work; and
              </li>
              <li>
                <strong>Final payment:</strong> balance due upon delivery.
              </li>
            </ul>
            <p>
              For retainer or ongoing services: monthly invoicing with <strong>Net 15</strong>{' '}
              payment terms.
            </p>
            <h3>5.3 Late Payments</h3>
            <p>
              Overdue balances accrue interest at the lesser of{' '}
              <strong>1.5% per month</strong> or the maximum rate permitted by law. We may
              suspend work on accounts more than 30 days past due, and reasonable collection
              costs may be added where recovery action is required.
            </p>
            <h3>5.4 Refunds and Expenses</h3>
            <p>
              Deposits are non-refundable once work commences. Refunds for unused amounts are
              at our discretion. Invoicing disputes must be raised in writing within 14 days of
              the invoice date. You agree to reimburse pre-approved, reasonable out-of-pocket
              expenses incurred in performing the services.
            </p>

            <h2>6. Disclaimers</h2>
            <h3>6.1 &ldquo;As Is&rdquo;</h3>
            <p>
              THE WEBSITE AND SERVICES ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
              AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
              NON-INFRINGEMENT. We do not guarantee uninterrupted or error-free operation.
            </p>
            <h3>6.2 AI Limitations</h3>
            <p>
              AI-generated content and automation outputs may contain errors, inaccuracies, or
              biases; should be reviewed by qualified humans before production use; and are not
              a substitute for professional advice (legal, financial, medical, or otherwise).
            </p>
            <h3>6.3 No Professional or Financial Advice</h3>
            <p>
              Our content, tools, demos, and deliverables are provided for informational and
              operational purposes and do not constitute legal, financial, investment, tax, or
              other professional advice. Nothing we provide is a recommendation to buy, sell,
              or hold any security or financial instrument. You are solely responsible for
              decisions made in reliance on our services and should consult a qualified
              professional.
            </p>
            <h3>6.4 Third-Party Services</h3>
            <p>
              Our services may integrate with third-party platforms (for example, Vercel,
              Railway, Cloudflare, Google, Anthropic, Meta, and LinkedIn). We are not
              responsible for the availability, terms, performance, or policies of third-party
              services.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR TOTAL LIABILITY FOR ALL CLAIMS
              ARISING FROM OR RELATING TO THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT
              EXCEED THE AMOUNTS YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT
              GIVING RISE TO THE CLAIM.
            </p>
            <p>
              WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
              PUNITIVE DAMAGES, OR FOR LOST PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES,
              EVEN IF ADVISED OF THE POSSIBILITY.
            </p>
            <p>
              Some jurisdictions do not allow certain limitations; in those cases, our
              liability is limited to the minimum extent permitted by law.
            </p>

            <h2>8. Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Astral Events Miami LLC d/b/a
              Barefoot Digital and its members, contractors, and affiliates from any claims,
              damages, losses, liabilities, and expenses (including reasonable attorneys&rsquo;
              fees) arising from your use of our services, your violation of these Terms, your
              infringement of any third-party rights, or your negligence or willful
              misconduct.
            </p>

            <h2>9. Confidentiality</h2>
            <p>
              Each party may receive confidential information of the other.{' '}
              <strong>We will protect your confidential business information</strong> and use
              it only to provide services, and not disclose it except as necessary to perform
              the services or as required by law. Likewise, you agree not to disclose our
              confidential information, including our proprietary methodologies, pricing,
              internal tools, and technical approaches. These obligations survive termination
              for <strong>3 years</strong>. A separate non-disclosure agreement, where signed,
              governs in addition to this Section.
            </p>

            <h2>10. Term and Termination</h2>
            <p>
              These Terms apply while you use the Website or our services and until terminated.
              You may stop using the Website at any time; for ongoing engagements, provide
              written notice per your engagement agreement. We may suspend or terminate access
              for violation of these Terms (effective immediately), for non-payment (after 30
              days&rsquo; notice), or for convenience on 30 days&rsquo; written notice. Upon
              termination, outstanding payments become due, we will provide reasonable
              transition assistance, and provisions that by their nature should survive
              (including IP, confidentiality, disclaimers, limitation of liability, and
              indemnification) will survive.
            </p>

            <h2>11. Dispute Resolution</h2>
            <h3>11.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the State of Florida, without regard to
              its conflict-of-law principles.
            </p>
            <h3>11.2 Informal Resolution</h3>
            <p>
              Before initiating formal proceedings, the parties agree to attempt to resolve any
              dispute in good faith through direct communication for at least 30 days.
            </p>
            <h3>11.3 Arbitration</h3>
            <p>
              Any dispute not resolved informally shall be settled by binding arbitration
              administered by the American Arbitration Association under its applicable rules,
              seated in <strong>Pinellas County, Florida</strong>. Judgment on the award may be
              entered in any court of competent jurisdiction.
            </p>
            <h3>11.4 Class Action Waiver</h3>
            <p>
              You agree to resolve disputes on an individual basis and waive any right to
              participate in a class or collective action.
            </p>
            <h3>11.5 Small Claims</h3>
            <p>Either party may bring a qualifying claim in small claims court.</p>
            <h3>11.6 Venue</h3>
            <p>
              To the extent any dispute proceeds in court, the exclusive venue shall be the
              state or federal courts located in <strong>Pinellas County, Florida</strong>, and
              the parties consent to personal jurisdiction there.
            </p>

            <h2>12. General Provisions</h2>
            <ul>
              <li>
                <strong>Entire Agreement.</strong> These Terms, together with our Privacy
                Policy and any signed engagement agreement, constitute the entire agreement
                regarding the subject matter.
              </li>
              <li>
                <strong>Severability.</strong> If any provision is unenforceable, the remaining
                provisions continue in effect.
              </li>
              <li>
                <strong>Waiver.</strong> Failure to enforce a right is not a waiver of future
                enforcement.
              </li>
              <li>
                <strong>Assignment.</strong> You may not assign these Terms without our
                consent; we may assign to a successor in connection with a merger, acquisition,
                or sale of assets.
              </li>
              <li>
                <strong>Subcontractors.</strong> We may engage subcontractors to perform
                services, provided they are bound by confidentiality obligations at least as
                protective as those in these Terms; we remain responsible for their
                performance.
              </li>
              <li>
                <strong>Force Majeure.</strong> Neither party is liable for delays caused by
                events beyond its reasonable control.
              </li>
              <li>
                <strong>Notices.</strong> Notices should be sent to{' '}
                <a href="mailto:info@barefootdigital.dev">info@barefootdigital.dev</a> or to
                the mailing address above.
              </li>
            </ul>

            <h2>13. Changes to These Terms</h2>
            <p>
              We may modify these Terms from time to time. Material changes will be
              communicated via the Website or email at least 30 days before taking effect where
              practicable. Continued use after changes take effect constitutes acceptance.
            </p>

            <h2>14. Contact</h2>
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

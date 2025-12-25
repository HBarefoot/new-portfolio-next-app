import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Henry Barefoot - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Last updated December 24, 2025
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This Privacy Notice for <strong>Henry Barefoot</strong> ("we," "us," or "our"), describes how and why we might access, collect, store, use, and/or share ("process") your personal information when you use our services ("Services"), including when you:
              </p>
              <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
                <li>Visit our website at <a href="https://next.henrybarefoot.com" className="text-blue-600 dark:text-blue-400 hover:underline">https://next.henrybarefoot.com</a> or any website of ours that links to this Privacy Notice</li>
                <li>Use HB LinkedIn Automation. Personal automation tool for scheduling LinkedIn posts</li>
                <li>Engage with us in other related ways, including any marketing or events</li>
              </ul>
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>.
              </p>
            </div>

            {/* Summary Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Summary of Key Points</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">What personal information do we process?</p>
                  <p>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Do we process any sensitive personal information?</p>
                  <p>We do not process sensitive personal information.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">Do we collect any information from third parties?</p>
                  <p>We do not collect any information from third parties.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                  <p className="font-semibold text-gray-900 dark:text-white mb-2">How do we keep your information safe?</p>
                  <p>We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</p>
                </div>
              </div>
            </section>

            {/* Table of Contents */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Table of Contents</h2>
              <nav className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <ol className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><a href="#section-1" className="text-blue-600 dark:text-blue-400 hover:underline">1. What Information Do We Collect?</a></li>
                  <li><a href="#section-2" className="text-blue-600 dark:text-blue-400 hover:underline">2. How Do We Process Your Information?</a></li>
                  <li><a href="#section-3" className="text-blue-600 dark:text-blue-400 hover:underline">3. When and With Whom Do We Share Your Personal Information?</a></li>
                  <li><a href="#section-4" className="text-blue-600 dark:text-blue-400 hover:underline">4. How Long Do We Keep Your Information?</a></li>
                  <li><a href="#section-5" className="text-blue-600 dark:text-blue-400 hover:underline">5. How Do We Keep Your Information Safe?</a></li>
                  <li><a href="#section-6" className="text-blue-600 dark:text-blue-400 hover:underline">6. Do We Collect Information from Minors?</a></li>
                  <li><a href="#section-7" className="text-blue-600 dark:text-blue-400 hover:underline">7. What Are Your Privacy Rights?</a></li>
                  <li><a href="#section-8" className="text-blue-600 dark:text-blue-400 hover:underline">8. Controls for Do-Not-Track Features</a></li>
                  <li><a href="#section-9" className="text-blue-600 dark:text-blue-400 hover:underline">9. Do United States Residents Have Specific Privacy Rights?</a></li>
                  <li><a href="#section-10" className="text-blue-600 dark:text-blue-400 hover:underline">10. Do We Make Updates to This Notice?</a></li>
                  <li><a href="#section-11" className="text-blue-600 dark:text-blue-400 hover:underline">11. How Can You Contact Us About This Notice?</a></li>
                  <li><a href="#section-12" className="text-blue-600 dark:text-blue-400 hover:underline">12. How Can You Review, Update, or Delete the Data We Collect From You?</a></li>
                </ol>
              </nav>
            </section>

            {/* Section 1 */}
            <section id="section-1" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">1. What Information Do We Collect?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We collect personal information that you provide to us.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Sensitive Information.</strong> We do not process sensitive information.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-2" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">2. How Do We Process Your Information?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We process your personal information for a variety of reasons, depending on how you interact with our Services, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li>To post testimonials. We post testimonials on our Services that may contain personal information.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="section-3" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">3. When and With Whom Do We Share Your Personal Information?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We may share information in specific situations described in this section and/or with the following third parties.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may need to share your personal information in the following situations:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="section-4" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">4. How Long Do We Keep Your Information?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We keep your information for as long as necessary to fulfill the purposes outlined in this Privacy Notice unless otherwise required by law.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
              </p>
            </section>

            {/* Section 5 */}
            <section id="section-5" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">5. How Do We Keep Your Information Safe?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We aim to protect your personal information through a system of organizational and technical security measures.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
              </p>
            </section>

            {/* Section 6 */}
            <section id="section-6" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">6. Do We Collect Information from Minors?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">We do not knowingly collect data from or market to children under 18 years of age.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under age 18, please contact us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>.
              </p>
            </section>

            {/* Section 7 */}
            <section id="section-7" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">7. What Are Your Privacy Rights?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">You may review, change, or terminate your account at any time, depending on your country, province, or state of residence.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <strong>Withdrawing your consent:</strong> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mt-4">
                If you have questions or comments about your privacy rights, you may email us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>.
              </p>
            </section>

            {/* Section 8 */}
            <section id="section-8" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">8. Controls for Do-Not-Track Features</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Notice.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                California law requires us to let you know how we respond to web browser DNT signals. Because there currently is not an industry or legal standard for recognizing or honoring DNT signals, we do not respond to them at this time.
              </p>
            </section>

            {/* Section 9 */}
            <section id="section-9" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">9. Do United States Residents Have Specific Privacy Rights?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">If you are a resident of California or other US states with privacy laws, you may have the right to request access to and receive details about the personal information we maintain about you and how we have processed it, correct inaccuracies, get a copy of, or delete your personal information.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We have not disclosed, sold, or shared any personal information to third parties for a business or commercial purpose in the preceding twelve (12) months. We will not sell or share personal information in the future belonging to website visitors, users, and other consumers.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Your Rights</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">You have rights under certain US state data protection laws. These rights include:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
                <li>Right to know whether or not we are processing your personal data</li>
                <li>Right to access your personal data</li>
                <li>Right to correct inaccuracies in your personal data</li>
                <li>Right to request the deletion of your personal data</li>
                <li>Right to obtain a copy of the personal data you previously shared with us</li>
                <li>Right to non-discrimination for exercising your rights</li>
              </ul>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">How to Exercise Your Rights</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To exercise these rights, you can contact us by emailing us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>, or by referring to the contact details at the bottom of this document.
              </p>
            </section>

            {/* Section 10 */}
            <section id="section-10" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">10. Do We Make Updates to This Notice?</h2>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border border-blue-200 dark:border-blue-800">
                <p className="font-semibold text-gray-900 dark:text-white mb-2">In Short:</p>
                <p className="text-gray-700 dark:text-gray-300">Yes, we will update this notice as necessary to stay compliant with relevant laws.</p>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Notice from time to time. The updated version will be indicated by an updated "Revised" date at the top of this Privacy Notice. If we make material changes to this Privacy Notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this Privacy Notice frequently to be informed of how we are protecting your information.
              </p>
            </section>

            {/* Section 11 */}
            <section id="section-11" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">11. How Can You Contact Us About This Notice?</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions or comments about this notice, you may email us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>{' '}
                or contact us by post at:
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Henry Barefoot</strong><br />
                  651 NW 82nd Ave<br />
                  Plantation, FL 33324<br />
                  United States
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section id="section-12" className="mb-12 scroll-mt-20">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">12. How Can You Review, Update, or Delete the Data We Collect From You?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please contact us at{' '}
                <a href="mailto:henrybarefoot1987@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                  henrybarefoot1987@gmail.com
                </a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

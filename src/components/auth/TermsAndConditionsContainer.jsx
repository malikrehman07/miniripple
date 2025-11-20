import React from "react";

const TermsAndConditionsContainer = () => {
  return (
    <div className="terms-container">
      <div className="terms-text">
        <h2 className="text-xl font-bold mb-4">
          MiniRipple — Legal Terms, Disclaimer, and Consent Agreement
        </h2>

        <p className="font-semibold">
          Effective Date: [Insert Date] | Last Updated: [Insert Date]
        </p>

        <hr className="my-4" />

        <h3 className="font-semibold text-lg">1. Acceptance of Terms</h3>
        <p>
          By accessing or using MiniRipple (the "Service", "Platform", or
          "Software") provided by MiniRipple, Inc. (“we”, “us”, “our”),
          available at{" "}
          <a
            href="https://miniripple.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            https://miniripple.com
          </a>
          , you (“you”, “your”, “Customer”, or “User”) agree to be bound by
          these Terms and Conditions, including our Privacy Policy and all
          related legal disclaimers herein. If you do not agree to these terms,
          you must not access or use our services.
        </p>

        <h3 className="font-semibold text-lg mt-4">2. Service Description</h3>
        <p>
          MiniRipple is a security and analytics platform that enables website
          owners to monitor, analyze, and control their web traffic. Our core
          services include but are not limited to:
        </p>
        <ul className="list-disc pl-6">
          <li>Real-time visitor analytics</li>
          <li>IP address logging and blocking</li>
          <li>VPN and proxy detection</li>
          <li>Country, browser, device, and OS tracking</li>
          <li>Bot and automation detection</li>
          <li>Auto-blocking rules</li>
          <li>Traffic source analysis</li>
          <li>Page-level tracking</li>
          <li>Log exports and integrations</li>
        </ul>
        <p>The Service is delivered via:</p>
        <ul className="list-disc pl-6">
          <li>JavaScript tracking scripts</li>
          <li>APIs and data interfaces</li>
          <li>Secure online dashboards</li>
          <li>Custom rules and automation</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">3. No Guarantee of Results</h3>
        <p>
          MiniRipple provides powerful tools to detect and mitigate suspicious
          activity. However, you understand and agree that:
        </p>
        <ul className="list-disc pl-6">
          <li>No service can guarantee 100% protection from bots, fraud, or cyber threats.</li>
          <li>VPN detection, IP geolocation, and device fingerprinting have inherent limitations.</li>
          <li>
            You use MiniRipple at your own risk and are solely responsible for actions taken
            based on its data.
          </li>
        </ul>
        <p>We do not warrant:</p>
        <ul className="list-disc pl-6">
          <li>That our analytics or alerts are error-free or complete.</li>
          <li>That every malicious visitor will be blocked.</li>
          <li>That our data or IP intelligence will always be accurate.</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">
          4. User Obligations and Responsibilities
        </h3>
        <p>You agree not to misuse the Service, including but not limited to:</p>
        <ul className="list-disc pl-6">
          <li>Attempting to reverse engineer or clone the platform.</li>
          <li>Using data obtained for illegal surveillance or harassment.</li>
          <li>Sharing your login or account with unauthorized parties.</li>
          <li>Interfering with the functionality, security, or performance of the platform.</li>
        </ul>
        <p>You are solely responsible for:</p>
        <ul className="list-disc pl-6">
          <li>Configuring blocking rules appropriately.</li>
          <li>Ensuring your use of MiniRipple complies with applicable laws and regulations.</li>
          <li>Informing your site visitors of tracking and analytics usage in your privacy policy.</li>
          <li>Complying with third-party platforms or ad network terms (e.g., Google Ads).</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">5. Data Collection & Consent</h3>
        <p>What Data We Process (on Your Behalf):</p>
        <ul className="list-disc pl-6">
          <li>IP address and geolocation</li>
          <li>Device type, OS, and browser version</li>
          <li>Referrer, URL path, session timing</li>
          <li>Potential VPN or proxy usage</li>
          <li>Clicks, scrolls, and repetitive actions</li>
        </ul>
        <p>Your Consent and Responsibility:</p>
        <ul className="list-disc pl-6">
          <li>
            You represent that you have lawful grounds (e.g., consent, legitimate interest)
            to collect this data from your visitors.
          </li>
          <li>You must update your own privacy policy to disclose MiniRipple’s tracking activity.</li>
          <li>
            MiniRipple acts as a data processor under GDPR and CCPA. You are the data controller.
            Data Processing Addendum (DPA) available on request at{" "}
            <a href="mailto:support@miniripple.com" className="text-blue-600">
              support@miniripple.com
            </a>.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">6. International Compliance</h3>
        <p>You acknowledge that:</p>
        <ul className="list-disc pl-6">
          <li>You are solely responsible for compliance with privacy laws (GDPR, CCPA, etc.).</li>
          <li>
            If you operate in the EU/EEA, you must obtain explicit consent before deploying
            the MiniRipple script.
          </li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">7. Security & Confidentiality</h3>
        <p>• We implement commercially reasonable security measures to protect all data.</p>
        <p>• Visitor IP logs and analytics data are encrypted at rest and in transit.</p>
        <p>• Access to your account and analytics data is restricted to you and those you authorize.</p>
        <p>• You agree not to attempt to breach or probe the security of the platform.</p>

        <h3 className="font-semibold text-lg mt-4">8. Account Terms</h3>
        <p>• You must be 18 or older to create an account.</p>
        <p>• You agree to provide accurate account information.</p>
        <p>• You may not share your credentials or impersonate another person.</p>
        <p>
          • You are responsible for activity occurring under your credentials. We may suspend or
          terminate accounts for abuse, suspected fraud, or violations of these terms.
        </p>

        <h3 className="font-semibold text-lg mt-4">
          9. Subscription, Billing, and Refund Policy
        </h3>
        <p>• $19.99/month or $210/year.</p>
        <p>• Charges are billed in advance through secure gateways.</p>
        <p>• Cancel anytime via your dashboard.</p>
        <p>• No refunds after 7 days unless required by law.</p>

        <h3 className="font-semibold text-lg mt-4">
          10. Service Limitations & Usage Restrictions
        </h3>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6">
          <li>Use MiniRipple to build a competing product.</li>
          <li>Abuse free trials.</li>
          <li>Use the Service for malicious traffic interception or illegal surveillance.</li>
          <li>Overload the platform with automated testing or scripted interactions.</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">11. Intellectual Property Rights</h3>
        <p>• All content, code, branding, and platform logic remain MiniRipple Inc. IP.</p>
        <p>• You get a limited, revocable license to use the Service for your site(s).</p>
        <p>• Do not replicate/resell/sublicense any part of the platform.</p>
        <p>• Feedback you submit becomes our property.</p>

        <h3 className="font-semibold text-lg mt-4">12. Third-Party Services</h3>
        <p>We may integrate with third-party services (e.g., Google Analytics, Stripe). We are not responsible for:</p>
        <ul className="list-disc pl-6">
          <li>Their availability or performance</li>
          <li>Data accuracy or delays</li>
          <li>Damages from third-party outages or API failures</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">13. Indemnification</h3>
        <p>You will indemnify and hold harmless MiniRipple and its affiliates against claims arising from:</p>
        <ul className="list-disc pl-6">
          <li>Your misuse of the platform</li>
          <li>Your breach of these terms</li>
          <li>Your failure to comply with privacy laws</li>
          <li>Your visitor data collection or blocking decisions</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">14. Limitation of Liability</h3>
        <p>To the fullest extent permitted by law:</p>
        <ul className="list-disc pl-6">
          <li>No indirect, special, incidental, or consequential damages.</li>
          <li>Our total liability is limited to fees paid in the previous six (6) months.</li>
        </ul>

        <h3 className="font-semibold text-lg mt-4">15. Termination and Suspension</h3>
        <p>We may suspend or terminate your account if you breach these terms, commit fraud, or fail to pay.</p>
        <p>Upon termination: access is revoked; data may be deleted; outstanding balances remain due.</p>

        <h3 className="font-semibold text-lg mt-4">16. Modifications to Terms</h3>
        <p>We may update terms; continued use after notice indicates acceptance.</p>

        <h3 className="font-semibold text-lg mt-4">17. Governing Law</h3>
        <p>
          These Terms are governed by the laws of [Insert Jurisdiction]. Actions must be filed in
          [Insert County/State].
        </p>

        <h3 className="font-semibold text-lg mt-4">18. Severability</h3>
        <p>If any part is unlawful or unenforceable, the rest remains in effect.</p>

        <h3 className="font-semibold text-lg mt-4">19. Contact Information</h3>
        <p>
          Email:{" "}
          <a href="mailto:support@miniripple.com" className="text-blue-600">
            support@miniripple.com
          </a>
        </p>
        <p>
          Website:{" "}
          <a
            href="https://miniripple.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600"
          >
            https://miniripple.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsContainer;

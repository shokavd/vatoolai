import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Privacy Policy — Clarity AI" };

export default function PrivacyPage() {
  return (
    <StaticPageLayout
      title="Privacy Policy"
      subtitle="Your privacy is important to us. Here's exactly what we do — and don't do — with your data."
      lastUpdated="28 April 2026"
    >
      <h2>Who we are</h2>
      <p>
        Clarity AI is operated by Shoka van Dooren, registered in the Netherlands (KvK registration in progress).
        Contact: <a href="mailto:shokavdooren@gmail.com">shokavdooren@gmail.com</a>
        <br />
        For all privacy-related requests, please use this email address.
      </p>

      <h2>What data we collect</h2>
      <p>
        We collect as little as possible. Here is a complete picture:
      </p>

      <h3>Text you paste into the tool</h3>
      <p>
        When you submit text for processing, it is sent securely to Anthropic&apos;s Claude API to generate your output.
        The text is processed in real time and <strong>immediately discarded</strong> — we do not store, log, or retain
        any text you submit. We do not train any AI models on your content.
      </p>

      <h3>Local storage (your browser only)</h3>
      <p>
        We store a small amount of data locally in your browser. This data never leaves your device and is never sent to our servers:
      </p>
      <ul>
        <li><strong>clarity_ai_locale</strong> — your preferred language</li>
        <li><strong>clarity_ai_pro</strong> — whether you have an active Pro subscription</li>
        <li><strong>clarity_ai_usage_[date]</strong> — daily usage count for the free tier</li>
        <li><strong>clarity_ai_history</strong> — your last 5 (free) or 20 (Pro) results</li>
        <li><strong>clarity_ai_consent</strong> — your cookie consent preference</li>
      </ul>

      <h3>Payment data</h3>
      <p>
        Pro subscriptions are handled by <strong>Stripe</strong>. When you pay, you are redirected to Stripe&apos;s secure
        checkout. We never see or store your card details. Stripe may collect your name, email, billing address,
        and payment method — see <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a> for details.
      </p>

      <h2>Third-party services</h2>
      <p>We use two third-party services:</p>
      <ul>
        <li><strong>Anthropic</strong> — processes the text you submit to generate AI output. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic&apos;s Privacy Policy</a>.</li>
        <li><strong>Stripe</strong> — handles payment processing for Pro subscriptions. See <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</li>
      </ul>
      <p>We do not use Google Analytics, Facebook Pixel, or any other tracking or advertising technology.</p>

      <h2>Cookies and tracking</h2>
      <p>
        We use <strong>no tracking or advertising cookies</strong>. We use browser localStorage (not cookies) to store
        your preferences locally. Stripe may set session cookies during the checkout process. See our{" "}
        <a href="/cookies">Cookie Policy</a> for the full details.
      </p>

      <h2>Your rights under GDPR</h2>
      <p>
        If you are in the European Economic Area (EEA), you have the following rights:
      </p>
      <ul>
        <li><strong>Right of access</strong> — request a copy of any personal data we hold about you</li>
        <li><strong>Right to erasure</strong> — request that we delete your personal data</li>
        <li><strong>Right to portability</strong> — receive your data in a machine-readable format</li>
        <li><strong>Right to object</strong> — object to how we process your data</li>
        <li><strong>Right to withdraw consent</strong> — withdraw consent at any time</li>
      </ul>
      <p>
        Because we store almost no personal data, most requests will be resolved immediately. To exercise any right,
        email <a href="mailto:shokavdooren@gmail.com">shokavdooren@gmail.com</a>. We will respond within 30 days.
      </p>
      <p>
        You also have the right to lodge a complaint with the Dutch data protection authority:{" "}
        <a href="https://autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">Autoriteit Persoonsgegevens</a>.
      </p>

      <h2>Data security</h2>
      <p>
        All data in transit is encrypted via HTTPS/TLS. Your text is sent to Anthropic over an encrypted connection.
        Local storage data is stored only on your device.
      </p>

      <h2>Children</h2>
      <p>
        Clarity AI is not directed at children under the age of 16. We do not knowingly collect data from minors.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the service evolves. The &quot;Last updated&quot; date at the top of this page reflects
        the most recent revision. Continued use of the service after changes constitutes acceptance.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email <a href="mailto:shokavdooren@gmail.com">shokavdooren@gmail.com</a>.
      </p>
    </StaticPageLayout>
  );
}

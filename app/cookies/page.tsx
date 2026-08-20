import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Cookie Policy — Tidify AI", alternates: { canonical: "https://www.tidifyai.com/cookies" } };

export default function CookiesPage() {
  return (
    <StaticPageLayout
      title="Cookie Policy"
      subtitle="A plain-English explanation of what we store and why."
      lastUpdated="28 April 2026"
    >
      <h2>The short version</h2>
      <p>
        We use <strong>no advertising or tracking cookies</strong>. We use browser&nbsp;localStorage to store a handful
        of small preferences — language, Pro status, and usage count — entirely on your own device.
        Stripe may set a session cookie when you check out.
      </p>

      <h2>What is localStorage?</h2>
      <p>
        localStorage is similar to cookies but slightly different — data is stored directly in your browser and
        is never automatically sent to a server. Unlike cookies, localStorage items cannot be used to track you
        across websites.
      </p>

      <h2>What we store in localStorage</h2>

      <h3>tidify_ai_consent</h3>
      <p>
        <strong>Purpose:</strong> stores your cookie/consent choice (&quot;all&quot; or &quot;necessary&quot;).<br />
        <strong>Duration:</strong> until you clear your browser data.<br />
        <strong>Category:</strong> Strictly necessary
      </p>

      <h3>tidify_ai_locale</h3>
      <p>
        <strong>Purpose:</strong> remembers your chosen language so the site displays correctly next visit.<br />
        <strong>Duration:</strong> until you clear your browser data.<br />
        <strong>Category:</strong> Functional
      </p>

      <h3>tidify_ai_pro</h3>
      <p>
        <strong>Purpose:</strong> stores whether you have an active Pro subscription so the tool unlocks Pro features.<br />
        <strong>Duration:</strong> until you clear your browser data or log out.<br />
        <strong>Category:</strong> Strictly necessary (for Pro users)
      </p>

      <h3>tidify_ai_usage_[YYYY-MM-DD]</h3>
      <p>
        <strong>Purpose:</strong> tracks how many requests you have made today to enforce the 3-per-day free limit.
        Each day creates a new key; old keys are inert and can be cleared.<br />
        <strong>Duration:</strong> functionally expires each day (new key per date).<br />
        <strong>Category:</strong> Strictly necessary
      </p>

      <h3>tidify_ai_history</h3>
      <p>
        <strong>Purpose:</strong> stores your last 5 (free) or 20 (Pro) results so you can revisit them.<br />
        <strong>Duration:</strong> until you clear history in the tool or clear browser data.<br />
        <strong>Category:</strong> Functional
      </p>

      <h2>Third-party: Stripe</h2>
      <p>
        When you click &quot;Get Pro Access&quot;, you are redirected to Stripe&apos;s checkout page hosted on stripe.com.
        Stripe may set cookies on their domain for fraud prevention and session management.
        These cookies are set by Stripe, not by us, and are governed by{" "}
        <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.
      </p>

      <h2>No analytics, no advertising</h2>
      <p>
        We do not use Google Analytics, Facebook Pixel, Hotjar, or any similar tools. We do not serve advertising.
        No third party can track your behaviour through our website.
      </p>

      <h2>Managing your preferences</h2>
      <p>
        You can clear all localStorage data at any time through your browser settings
        (usually under Settings → Privacy → Clear browsing data → Cookies and site data).
        This will reset your language preference and usage count, and will remove your Pro status
        from this device (your subscription itself will remain active on Stripe).
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we introduce new storage items or third-party services, we will update this page and show the cookie
        banner again. The &quot;Last updated&quot; date at the top reflects the most recent revision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Use our <a href="/contact">contact form</a>.
      </p>
    </StaticPageLayout>
  );
}

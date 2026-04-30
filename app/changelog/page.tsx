import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Changelog — Tidify AI" };

const ENTRIES = [
  {
    date: "April 2026",
    version: "v1.3",
    changes: [
      "Added 5 new languages: Italian, Polish, Turkish, Japanese, Chinese Simplified (11 total)",
      "Full i18n — every part of the site now translates including the tool UI",
      "New multi-column footer with Product, Resources, and Legal sections",
      "Cookie consent banner (GDPR compliant)",
      "Legal pages: Privacy Policy, Terms of Service, Cookie Policy",
      "Dark theme for the tool section — consistent with the rest of the site",
      "Replaced placeholder testimonials with a review submission CTA",
    ],
  },
  {
    date: "March 2026",
    version: "v1.2",
    changes: [
      "Added 6 language switcher (EN, NL, ES, FR, DE, PT)",
      "Social Media mode: choose platform (LinkedIn, Instagram, X, Facebook, TikTok, Pinterest, YouTube, Threads, Newsletter)",
      "Free users can switch platforms one at a time; Pro users can multi-select",
      "Pro subscription via Stripe with automatic tax (VAT) calculation",
      "Success page to verify payment and activate Pro in browser",
      "Result history: last 5 results (free), last 20 (Pro)",
      "3 variations per request (Pro)",
    ],
  },
  {
    date: "February 2026",
    version: "v1.1",
    changes: [
      "Added 6 new modes: Invoice/Proposal, Meeting Agenda, Performance Review, Legal Simplifier, Custom (Pro)",
      "Tone selector: Professional, Casual, Friendly, Direct, Creative",
      "Output language selector (10 languages)",
      "Character limit raised to 15,000 for Pro users",
      "Copy to clipboard on all outputs",
    ],
  },
  {
    date: "January 2026",
    version: "v1.0",
    changes: [
      "Initial launch of Tidify AI",
      "5 core modes: Meeting Notes, Brain Dump, Email Reply, Cover Letter, Text Cleanup",
      "Free tier: 3 uses per day, no account needed",
      "Powered by Claude AI (Anthropic)",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <StaticPageLayout
      title="Changelog"
      subtitle="Everything that's been added, changed, or fixed."
    >
      <div className="not-prose mt-8 space-y-10">
        {ENTRIES.map((entry) => (
          <div key={entry.version} className="relative pl-5 border-l border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{entry.date}</span>
              <span className="text-xs bg-white/8 text-slate-400 px-2 py-0.5 rounded font-mono">{entry.version}</span>
            </div>
            <ul className="space-y-2">
              {entry.changes.map((change, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-teal-500 mt-0.5 shrink-0">+</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StaticPageLayout>
  );
}

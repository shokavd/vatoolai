import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Roadmap — Tidify AI" };

const IN_PROGRESS = [
  { emoji: "🔐", title: "Account system", desc: "Sign in with magic link. Pro status linked to your account — works across all your devices, not just the browser you paid in." },
];

const PLANNED = [
  { emoji: "📂", title: "File upload", desc: "Upload .txt, .docx, or .pdf files instead of pasting. No more character count headaches." },
  { emoji: "📊", title: "Report Generator mode", desc: "Turn raw data, bullet points, or notes into a fully formatted business report with sections, headers, and executive summary." },
  { emoji: "📑", title: "Contract Summary mode", desc: "Upload or paste any contract or NDA — get a plain-language breakdown of the key clauses, obligations, and risks." },
  { emoji: "🌐", title: "Translate mode", desc: "Translate any text into any of 10 supported languages while preserving tone and formatting." },
  { emoji: "💾", title: "Saved templates", desc: "Save your favourite custom instructions as reusable templates. One click instead of retyping." },
  { emoji: "📬", title: "Email digest", desc: "Opt-in weekly summary of new modes, tips, and feature releases." },
];

const CONSIDERING = [
  "Team / workspace plan",
  "Browser extension for instant text processing anywhere",
  "API access for developers",
  "Zapier / Make integration",
  "Slack bot",
];

export default function RoadmapPage() {
  return (
    <StaticPageLayout
      title="Roadmap"
      subtitle="What we're building next. Priorities may shift based on feedback."
    >
      <p>
        Have an idea or want to vote on what gets built?{" "}
        <a href="/contact">Contact us</a> — we read every message.
      </p>

      <h2>In progress</h2>
      <div className="not-prose grid grid-cols-1 gap-4 mt-4 mb-8">
        {IN_PROGRESS.map((item) => (
          <div key={item.title} className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">In progress</span>
            </div>
            <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Planned features</h2>
      <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        {PLANNED.map((item) => (
          <div key={item.title} className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
            <span className="text-2xl block mb-3">{item.emoji}</span>
            <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Also considering</h2>
      <ul>
        {CONSIDERING.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <div className="not-prose mt-10 p-5 bg-amber-400/10 border border-amber-400/20 rounded-xl">
        <p className="text-sm font-semibold text-amber-300 mb-1">Shape what gets built</p>
        <p className="text-sm text-slate-400 mb-3">
          Your feedback directly influences what we prioritise. Tell us what you need.
        </p>
        <a
          href="/contact"
          className="inline-block text-sm font-medium bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg hover:bg-amber-300 transition-colors"
        >
          Send feedback →
        </a>
      </div>
    </StaticPageLayout>
  );
}

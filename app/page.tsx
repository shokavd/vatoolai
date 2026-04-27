"use client";

import Header from "./components/Header";
import ClarityTool from "./components/ClarityTool";
import CheckoutButton from "./components/CheckoutButton";
import { useTranslation } from "./lib/TranslationContext";

const MODE_CARDS = [
  { icon: "📋", key: "meeting_notes", label: "Meeting Notes", desc: "Clean summary, action items, and a follow-up email — from raw notes." },
  { icon: "🧠", key: "brain_dump", label: "Brain Dump", desc: "Organized plan with priorities from a wall of scattered ideas." },
  { icon: "✉️", key: "email_reply", label: "Email Reply", desc: "Professional reply ready to copy-paste from any email." },
  { icon: "📄", key: "cover_letter", label: "Cover Letter", desc: "Tailored, compelling cover letter from any job description." },
  { icon: "✨", key: "cleanup", label: "Text Cleanup", desc: "Grammar, flow, structure — your voice stays intact." },
  { icon: "📱", key: "social_media", label: "Social Media", desc: "Ready-to-post content for any platform from any topic." },
  { icon: "💼", key: "invoice", label: "Invoice / Proposal", desc: "Professional project proposal or invoice outline in seconds." },
  { icon: "🗓️", key: "agenda", label: "Meeting Agenda", desc: "Structured, timed agenda ready to share with attendees." },
  { icon: "⭐", key: "review", label: "Performance Review", desc: "Professional review or self-assessment in HR language." },
  { icon: "⚖️", key: "legal", label: "Legal Simplifier", desc: "Plain-English summary of any contract or legal text." },
  { icon: "🛠️", key: "custom", label: "Custom (Pro)", desc: "Write your own instruction — Clarity AI follows it exactly." },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 text-center overflow-hidden hero-grid">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-indigo-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            {t.hero.badge}
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {t.hero.headline}
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tool"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all shadow-xl shadow-indigo-500/30 w-full sm:w-auto text-center"
            >
              {t.hero.cta}
            </a>
            <a
              href="#how-it-works"
              className="border border-white/10 text-slate-300 font-medium text-lg px-8 py-4 rounded-xl hover:bg-white/5 transition-all w-full sm:w-auto text-center"
            >
              {t.nav.howItWorks} ↓
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-4">{t.hero.ctaSub}</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6 bg-slate-900/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{t.howItWorks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-7 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-indigo-600/50 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t.modes.title}</h2>
          <p className="text-center text-slate-400 mb-14 text-lg">{t.modes.sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODE_CARDS.map((item) => (
              <div
                key={item.key}
                className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-6 transition-all cursor-default"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 transition-all" />
                <div className="relative">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-semibold text-white mb-2">{item.label}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
            <div className="group bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">🚀</span>
              <h3 className="font-semibold text-slate-400 mb-2">{t.modes.more}</h3>
              <p className="text-sm text-slate-500">{t.modes.moreDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool */}
      <section id="tool" className="py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-3">{t.tool.title}</h2>
          <p className="text-center text-gray-500 mb-10 text-lg">{t.tool.sub}</p>
          <ClarityTool />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-slate-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">{t.pricing.title}</h2>
          <p className="text-center text-slate-400 mb-14 text-lg">{t.pricing.sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8">
              <div className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-2">{t.pricing.free.label}</div>
              <div className="text-5xl font-bold text-white mb-1">€0</div>
              <div className="text-sm text-slate-500 mb-8">{t.pricing.free.period}</div>
              <ul className="space-y-3 mb-8">
                {t.pricing.free.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <svg className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#tool" className="block text-center border border-white/10 text-slate-300 font-medium py-3 rounded-xl hover:bg-white/5 transition-colors">
                {t.pricing.free.cta}
              </a>
            </div>

            {/* Pro */}
            <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/40 rounded-2xl p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg">
                {t.pricing.pro.badge}
              </div>
              <div className="text-sm font-semibold text-indigo-400 uppercase tracking-wide mb-2">{t.pricing.pro.label}</div>
              <div className="text-5xl font-bold text-white mb-1">€9</div>
              <div className="text-sm text-slate-400 mb-8">{t.pricing.pro.period}</div>
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                    <svg className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-4 sm:px-6 text-center bg-slate-950">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {t.footer.copy}
        </p>
      </footer>
    </div>
  );
}

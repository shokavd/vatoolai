"use client";

import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClarityTool from "./components/ClarityTool";
import CheckoutButton from "./components/CheckoutButton";
import { useTranslation } from "./lib/TranslationContext";

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/8 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/3 transition-colors"
      >
        <span className="font-medium text-white text-sm sm:text-base">{q}</span>
        <span className={`text-teal-400 text-lg transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-4 text-sm text-slate-400 leading-relaxed border-t border-white/5">
          <div className="pt-3">{a}</div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#070d14] text-white">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 sm:px-6 text-center overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0 hero-grid opacity-40 pointer-events-none" />
        {/* Glow orbs */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 left-1/3 w-48 h-48 bg-cyan-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/3 w-48 h-48 bg-teal-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            {t.hero.badge}
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold leading-tight mb-6 tracking-tight">
            {t.hero.headline}
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
              {t.hero.headlineAccent}
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.hero.sub}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#tool"
              className="bg-amber-400 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20 w-full sm:w-auto text-center"
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

      {/* Stats bar */}
      <div className="border-y border-white/5 bg-white/[0.02] py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { value: "11", label: t.stats.modes },
            { value: "10", label: t.stats.languages },
            { value: "9", label: "Social platforms" },
            { value: "€0", label: t.stats.free },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-teal-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16">{t.howItWorks.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-slate-950 text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-shadow">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden sm:block absolute top-7 left-[calc(50%+3.5rem)] w-[calc(100%-7rem)] h-px bg-gradient-to-r from-teal-500/40 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-24 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t.personas.title}</h2>
          <p className="text-center text-slate-400 mb-14 text-lg max-w-2xl mx-auto">{t.personas.sub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.personas.items.map((item) => (
              <div key={item.title} className="group bg-white/[0.03] hover:bg-teal-500/5 border border-white/8 hover:border-teal-500/30 rounded-2xl p-6 transition-all">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
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
            {t.modeCards.map((item) => (
              <div key={item.label} className="group bg-white/[0.03] hover:bg-teal-500/5 border border-white/8 hover:border-teal-500/30 rounded-2xl p-6 transition-all cursor-default">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="font-semibold text-white mb-2">{item.label}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
            <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-2xl p-6">
              <span className="text-3xl mb-3 block">🚀</span>
              <h3 className="font-semibold text-slate-500 mb-2">{t.modes.more}</h3>
              <p className="text-sm text-slate-600">{t.modes.moreDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Share your experience */}
      <section className="py-16 px-4 sm:px-6 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-3xl mb-4">⭐</div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">{t.testimonialSubmit.title}</h2>
          <p className="text-slate-400 mb-8">{t.testimonialSubmit.sub}</p>
          <a
            href="https://g.page/r/clarity-ai-review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
          >
            {t.testimonialSubmit.cta}
          </a>
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
      <section id="pricing" className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">{t.pricing.title}</h2>
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
                    <svg className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <div className="relative bg-gradient-to-br from-teal-500/15 to-cyan-500/10 border border-teal-500/40 rounded-2xl p-8">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                {t.pricing.pro.badge}
              </div>
              <div className="text-sm font-semibold text-teal-400 uppercase tracking-wide mb-2">{t.pricing.pro.label}</div>
              <div className="text-5xl font-bold text-white mb-1">€9</div>
              <div className="text-sm text-slate-400 mb-8">{t.pricing.pro.period}</div>
              <ul className="space-y-3 mb-8">
                {t.pricing.pro.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                    <svg className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Trust badges */}
      <div className="border-t border-white/5 py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          {[
            { icon: "🔒", label: t.trust.noStorage },
            { icon: "🤖", label: t.trust.poweredBy },
            { icon: "✕", label: t.trust.cancelAnytime },
            { icon: "📱", label: t.trust.allDevices },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <section className="py-24 px-4 sm:px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-14">{t.faq.title}</h2>
          <div className="space-y-3">
            {t.faq.items.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/5 border border-teal-500/20 rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.hero.headline}
              <br />
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                {t.hero.headlineAccent}
              </span>
            </h2>
            <p className="text-slate-400 mb-8">{t.hero.ctaSub}</p>
            <a
              href="#tool"
              className="inline-block bg-amber-400 text-slate-950 font-bold text-lg px-8 py-4 rounded-xl hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
            >
              {t.hero.cta}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

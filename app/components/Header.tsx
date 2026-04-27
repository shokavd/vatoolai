"use client";

import { useTranslation } from "../lib/TranslationContext";
import { type Locale } from "../lib/translations";

const LOCALES: { id: Locale; label: string; flag: string }[] = [
  { id: "en", label: "EN", flag: "🇬🇧" },
  { id: "nl", label: "NL", flag: "🇳🇱" },
  { id: "es", label: "ES", flag: "🇪🇸" },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Clarity AI
          </span>
        </div>
        <nav className="flex items-center gap-5">
          <a href="#how-it-works" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors">
            {t.nav.howItWorks}
          </a>
          <a href="#pricing" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors">
            {t.nav.pricing}
          </a>

          {/* Language switcher */}
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
            {LOCALES.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setLocale(loc.id)}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-all ${
                  locale === loc.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.label}</span>
              </button>
            ))}
          </div>

          <a
            href="#tool"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-500/25"
          >
            {t.nav.tryFree}
          </a>
        </nav>
      </div>
    </header>
  );
}

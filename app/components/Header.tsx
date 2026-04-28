"use client";

import { useState } from "react";
import { useTranslation } from "../lib/TranslationContext";
import { useAuth } from "../lib/AuthContext";
import { type Locale } from "../lib/translations";
import AuthModal from "./AuthModal";

const LOCALES: { id: Locale; flag: string; label: string }[] = [
  { id: "en", flag: "🇬🇧", label: "EN" },
  { id: "nl", flag: "🇳🇱", label: "NL" },
  { id: "es", flag: "🇪🇸", label: "ES" },
  { id: "fr", flag: "🇫🇷", label: "FR" },
  { id: "de", flag: "🇩🇪", label: "DE" },
  { id: "pt", flag: "🇵🇹", label: "PT" },
  { id: "it", flag: "🇮🇹", label: "IT" },
  { id: "pl", flag: "🇵🇱", label: "PL" },
  { id: "tr", flag: "🇹🇷", label: "TR" },
  { id: "ja", flag: "🇯🇵", label: "JA" },
  { id: "zh", flag: "🇨🇳", label: "ZH" },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const { user, isProUser } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-teal-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Clarity AI
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <a href="#how-it-works" className="hidden sm:block text-sm text-slate-400 hover:text-teal-400 transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#pricing" className="hidden sm:block text-sm text-slate-400 hover:text-teal-400 transition-colors">
              {t.nav.pricing}
            </a>

            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-white/5 rounded-lg p-1 border border-white/8">
              {LOCALES.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setLocale(loc.id)}
                  title={loc.flag}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    locale === loc.id
                      ? "bg-teal-500 text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>

            {/* Auth button */}
            <button
              onClick={() => setShowAuth(true)}
              className={`hidden sm:flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
                user
                  ? "border-teal-500/30 text-teal-400 hover:bg-teal-500/10"
                  : "border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {user ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                  <span className="max-w-[120px] truncate">{user.email}</span>
                  {isProUser && <span className="text-xs bg-teal-500/20 text-teal-400 px-1 rounded">Pro</span>}
                </>
              ) : (
                "Sign in"
              )}
            </button>

            <a
              href="#tool"
              className="bg-amber-400 text-slate-950 text-sm font-bold px-4 py-2 rounded-lg hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20"
            >
              {t.nav.tryFree}
            </a>
          </nav>
        </div>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}

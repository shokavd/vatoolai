"use client";

import { useState, useEffect, useRef } from "react";
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
  const [showLangMenu, setShowLangMenu] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setShowAuth(true);
    document.addEventListener("open-auth-modal", handler);
    return () => document.removeEventListener("open-auth-modal", handler);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocale = LOCALES.find((l) => l.id === locale) || LOCALES[0];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-teal-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Tidify AI
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <a href="#how-it-works" className="hidden sm:block text-sm text-slate-400 hover:text-teal-400 transition-colors">
              {t.nav.howItWorks}
            </a>
            <a href="#pricing" className="hidden sm:block text-sm text-slate-400 hover:text-teal-400 transition-colors">
              {t.nav.pricing}
            </a>

            {/* Language switcher — compact dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/8 text-xs font-medium text-slate-300 hover:text-white transition-colors"
              >
                <span>{currentLocale.flag}</span>
                <span className="hidden sm:inline">{currentLocale.label}</span>
                <span className="text-slate-500 text-[10px] ml-0.5">▾</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1.5 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden py-1 min-w-[130px]">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => { setLocale(loc.id); setShowLangMenu(false); }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs transition-colors ${
                        locale === loc.id
                          ? "text-teal-400 bg-teal-500/10 font-medium"
                          : "text-slate-300 hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      <span>{loc.flag}</span>
                      <span>{loc.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth button */}
            <button
              onClick={() => setShowAuth(true)}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border transition-all ${
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("clarity_ai_consent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("clarity_ai_consent", "all");
    setVisible(false);
  }

  function necessary() {
    localStorage.setItem("clarity_ai_consent", "necessary");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-1">🍪 We use cookies</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            We use a small number of essential cookies to keep the tool working — like remembering your language preference and Pro status. No tracking or advertising cookies.{" "}
            <Link href="/cookies" className="text-teal-400 hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={necessary}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-slate-400 border border-white/10 rounded-lg hover:border-white/20 hover:text-slate-200 transition-all"
          >
            Necessary only
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold bg-teal-500 text-slate-950 rounded-lg hover:bg-teal-400 transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

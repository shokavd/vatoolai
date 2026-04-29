"use client";

import { useState, useEffect } from "react";

export type BrandVoice = {
  name: string;
  company: string;
  industry: string;
  audience: string;
  styleNotes: string;
};

const EMPTY: BrandVoice = { name: "", company: "", industry: "", audience: "", styleNotes: "" };
const STORAGE_KEY = "clarity_ai_brand_voice";

export function loadBrandVoice(): BrandVoice {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY;
  } catch {
    return EMPTY;
  }
}

type Props = { onClose: () => void };

export default function BrandVoicePanel({ onClose }: Props) {
  const [form, setForm] = useState<BrandVoice>(EMPTY);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(loadBrandVoice());
  }, []);

  function set(key: keyof BrandVoice, val: string) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  }

  function handleClear() {
    localStorage.removeItem(STORAGE_KEY);
    setForm(EMPTY);
  }

  const hasContent = Object.values(form).some((v) => v.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors text-lg leading-none">×</button>

        <h2 className="text-lg font-semibold text-white mb-1">Brand Voice</h2>
        <p className="text-sm text-slate-400 mb-6">
          Set this once and every output will automatically reflect your brand. Leave blank to skip.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Your name</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Jane Smith"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Company / brand</label>
              <input
                value={form.company}
                onChange={(e) => set("company", e.target.value)}
                placeholder="Acme Inc."
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Industry</label>
            <input
              value={form.industry}
              onChange={(e) => set("industry", e.target.value)}
              placeholder="e.g. SaaS, Healthcare, E-commerce, Consulting..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Target audience</label>
            <input
              value={form.audience}
              onChange={(e) => set("audience", e.target.value)}
              placeholder="e.g. Small business owners, HR managers, startup founders..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Writing style notes</label>
            <textarea
              value={form.styleNotes}
              onChange={(e) => set("styleNotes", e.target.value)}
              rows={3}
              placeholder="e.g. We avoid jargon, use short sentences, always end emails with a clear next step..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSave}
            className="flex-1 bg-teal-500 text-slate-950 font-semibold py-2.5 rounded-xl hover:bg-teal-400 transition-colors text-sm"
          >
            {saved ? "Saved ✓" : "Save brand voice"}
          </button>
          {hasContent && (
            <button
              onClick={handleClear}
              className="px-4 border border-white/10 text-slate-400 rounded-xl text-sm hover:bg-white/5 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

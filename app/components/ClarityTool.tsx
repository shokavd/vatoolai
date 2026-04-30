"use client";

import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MODES, TONES, LANGUAGES, PLATFORMS } from "./tool/modes";
import { getHistory, saveToHistory, clearHistory, formatTimeAgo, type HistoryItem } from "./tool/history";
import { useTranslation } from "../lib/TranslationContext";
import { useAuth } from "../lib/AuthContext";
import BrandVoicePanel, { loadBrandVoice } from "./BrandVoicePanel";

const FREE_LIMIT = 3;
const FREE_UPLOAD_LIMIT = 1;
const FREE_MAX_CHARS = 5000;
const PRO_MAX_CHARS = 15000;

function getTodayKey() {
  return `clarity_ai_usage_${new Date().toISOString().slice(0, 10)}`;
}

function getUsageCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(getTodayKey()) || "0", 10);
}

function incrementUsage(): number {
  const newCount = getUsageCount() + 1;
  localStorage.setItem(getTodayKey(), String(newCount));
  return newCount;
}

function getUploadKey() {
  return `clarity_ai_uploads_${new Date().toISOString().slice(0, 10)}`;
}

function getUploadCount(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(getUploadKey()) || "0", 10);
}

function incrementUploadCount(): number {
  const newCount = getUploadCount() + 1;
  localStorage.setItem(getUploadKey(), String(newCount));
  return newCount;
}

function OutputBlock({ text, copyLabel, copiedLabel, proUser, onUpgrade, onDownloadPdf, onDownloadDocx, onDownloadMd }: {
  text: string;
  copyLabel: string;
  copiedLabel: string;
  proUser: boolean;
  onUpgrade: () => void;
  onDownloadPdf: () => void;
  onDownloadDocx: () => void;
  onDownloadMd: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showExports, setShowExports] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mb-4">
      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-5 prose prose-invert prose-sm max-w-none text-slate-200 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-white/20 [&_th]:bg-slate-800 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-white/15 [&_td]:p-2 [&_a]:text-teal-400 [&_code]:bg-slate-800 [&_code]:px-1 [&_code]:rounded">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
      <div className="mt-2 flex items-center gap-4 flex-wrap">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied ? (
            <><span className="text-teal-400">✓</span><span className="text-teal-400">{copiedLabel}</span></>
          ) : (
            <><span>📋</span><span>{copyLabel}</span></>
          )}
        </button>

        {proUser ? (
          <div className="relative">
            <button
              onClick={() => setShowExports(!showExports)}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              <span>⬇️</span><span>Export</span><span>{showExports ? "▴" : "▾"}</span>
            </button>
            {showExports && (
              <div className="absolute left-0 top-6 bg-slate-800 border border-white/10 rounded-xl shadow-xl z-10 min-w-[140px] overflow-hidden">
                {[
                  { label: "PDF (.pdf)", action: onDownloadPdf },
                  { label: "Word (.docx)", action: onDownloadDocx },
                  { label: "Markdown (.md)", action: onDownloadMd },
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    onClick={() => { action(); setShowExports(false); }}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-white/[0.08] transition-colors"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onUpgrade}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-400 transition-colors"
          >
            <span>⬇️</span>
            <span>Export</span>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1 py-0.5 rounded ml-0.5">Pro</span>
          </button>
        )}
      </div>
    </div>
  );
}

function HistoryPanel({ history, onSelect, onClear, ui }: {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
  ui: { noHistory: string; recentResults: string; clearAll: string };
}) {
  if (history.length === 0) {
    return <p className="text-sm text-slate-500 text-center py-6">{ui.noHistory}</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-slate-200 text-sm">{ui.recentResults}</h3>
        <button onClick={onClear} className="text-xs text-red-400 hover:text-red-300 transition-colors">{ui.clearAll}</button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left bg-white/[0.04] hover:bg-indigo-500/10 border border-white/8 hover:border-indigo-500/30 rounded-lg p-3 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-indigo-400">{item.modeLabel}</span>
              <span className="text-xs text-slate-500">{formatTimeAgo(item.timestamp)}</span>
            </div>
            <p className="text-xs text-slate-400 truncate">{item.inputPreview}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ClarityTool() {
  const { t } = useTranslation();
  const { user, isProUser } = useAuth();
  const ui = t.toolUI;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedMode, setSelectedMode] = useState(MODES[0]);
  const [input, setInput] = useState("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [tone, setTone] = useState("professional");
  const [language, setLanguage] = useState("English");
  const [output, setOutput] = useState("");
  const [outputVariations, setOutputVariations] = useState<string[]>([]);
  const [activeVariation, setActiveVariation] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [generateVariations, setGenerateVariations] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin"]);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [showBrandVoice, setShowBrandVoice] = useState(false);
  const [brandVoiceSet, setBrandVoiceSet] = useState(false);

  // Refinement state
  const [refinementInput, setRefinementInput] = useState("");
  const [refining, setRefining] = useState(false);

  // File upload state
  const [fileLoading, setFileLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadCount, setUploadCount] = useState(0);

  const proUser = isProUser;

  useEffect(() => {
    setUsageCount(getUsageCount());
    setUploadCount(getUploadCount());
    setHistory(getHistory());
    const bv = loadBrandVoice();
    setBrandVoiceSet(Object.values(bv).some((v) => v.trim().length > 0));
  }, []);

  const maxChars = proUser ? PRO_MAX_CHARS : FREE_MAX_CHARS;
  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const isLimitReached = !proUser && usageCount >= FREE_LIMIT;
  const currentOutput = outputVariations.length > 0 ? outputVariations[activeVariation] : output;

  async function handleProcess() {
    if (!input.trim() || isLimitReached) return;
    if (selectedMode.id === "custom" && !customInstruction.trim()) {
      setError(ui.customInstructionError);
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");
    setOutputVariations([]);
    setRefinementInput("");

    try {
      const brandVoice = loadBrandVoice();
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          mode: selectedMode.id,
          tone,
          language,
          customInstruction: customInstruction.trim(),
          variations: generateVariations,
          isPro: proUser,
          platforms: selectedMode.id === "social_media" ? selectedPlatforms : undefined,
          brandVoice: Object.values(brandVoice).some((v) => v.trim()) ? brandVoice : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || ui.networkError);
        return;
      }

      const newCount = incrementUsage();
      setUsageCount(newCount);

      if (data.variations) {
        setOutputVariations(data.variations);
        setActiveVariation(0);
        saveToHistory({ mode: selectedMode.id, modeLabel: selectedMode.label, inputPreview: input.slice(0, 80), output: data.variations[0], tone, language }, proUser);
      } else {
        setOutput(data.result);
        saveToHistory({ mode: selectedMode.id, modeLabel: selectedMode.label, inputPreview: input.slice(0, 80), output: data.result, tone, language }, proUser);
      }

      setHistory(getHistory());
    } catch {
      setError(ui.networkError);
    } finally {
      setLoading(false);
    }
  }

  async function handleRefine() {
    if (!refinementInput.trim() || !currentOutput) return;
    setRefining(true);
    setError("");

    try {
      const brandVoice = loadBrandVoice();
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: input.trim(),
          mode: selectedMode.id,
          tone,
          language,
          customInstruction: customInstruction.trim(),
          isPro: proUser,
          platforms: selectedMode.id === "social_media" ? selectedPlatforms : undefined,
          previousOutput: currentOutput,
          refinement: refinementInput.trim(),
          brandVoice: Object.values(brandVoice).some((v) => v.trim()) ? brandVoice : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error || ui.networkError); return; }

      if (outputVariations.length > 0) {
        const updated = [...outputVariations];
        updated[activeVariation] = data.result;
        setOutputVariations(updated);
      } else {
        setOutput(data.result);
      }
      setRefinementInput("");
    } catch {
      setError(ui.networkError);
    } finally {
      setRefining(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!proUser && getUploadCount() >= FREE_UPLOAD_LIMIT) {
      setError("You've used your 1 free upload today. Upgrade to Pro for unlimited file uploads.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setFileLoading(true);
    setFileName(file.name);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/extract-text", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Could not read file."); return; }
      setInput(data.text.slice(0, maxChars));
      if (!proUser) {
        const newCount = incrementUploadCount();
        setUploadCount(newCount);
      }
    } catch {
      setError("Could not read file. Please try again.");
    } finally {
      setFileLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleDownloadMd(text: string) {
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clarity-ai-${selectedMode.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadDocx(text: string) {
    const { Document, Packer, Paragraph, TextRun, HeadingLevel } = await import("docx");

    const lines = text.split("\n");
    const children = [];

    for (const line of lines) {
      if (line.startsWith("## ")) {
        children.push(new Paragraph({ text: line.slice(3), heading: HeadingLevel.HEADING_2 }));
      } else if (line.startsWith("# ")) {
        children.push(new Paragraph({ text: line.slice(2), heading: HeadingLevel.HEADING_1 }));
      } else if (line.startsWith("### ")) {
        children.push(new Paragraph({ text: line.slice(4), heading: HeadingLevel.HEADING_3 }));
      } else if (line.startsWith("- ") || line.startsWith("• ")) {
        children.push(new Paragraph({ text: line.slice(2), bullet: { level: 0 } }));
      } else if (/^\d+\. /.test(line)) {
        children.push(new Paragraph({ text: line.replace(/^\d+\. /, "") }));
      } else if (line.trim() === "") {
        children.push(new Paragraph({ text: "" }));
      } else {
        const parts = line.split(/\*\*(.+?)\*\*/);
        const runs = parts.map((part, i) =>
          new TextRun({ text: part, bold: i % 2 === 1 })
        );
        children.push(new Paragraph({ children: runs }));
      }
    }

    const doc = new Document({ sections: [{ children }] });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clarity-ai-${selectedMode.id}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDownloadPdf(text: string) {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const lineHeight = 7;
    let y = margin;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);

    // Strip markdown and split into lines
    const plain = text
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1")
      .replace(/#{1,6} /g, "")
      .replace(/\|/g, " | ")
      .replace(/^[-*] /gm, "• ");

    const lines = doc.splitTextToSize(plain, pageWidth);
    for (const line of lines) {
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }

    doc.save(`clarity-ai-${selectedMode.id}.pdf`);
  }

  async function handleCheckout() {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    await startCheckout();
  }

  async function startCheckout() {
    setCheckoutLoading(true);
    setShowSignInPrompt(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user?.id }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(ui.checkoutError);
    } catch {
      setError(ui.checkoutError);
    } finally {
      setCheckoutLoading(false);
    }
  }

  function handleModeChange(mode: typeof MODES[0]) {
    if (mode.proOnly && !proUser) return;
    setSelectedMode(mode);
    setOutput("");
    setOutputVariations([]);
    setRefinementInput("");
    setError("");
  }

  function handleHistorySelect(item: HistoryItem) {
    const mode = MODES.find(m => m.id === item.mode);
    if (mode) setSelectedMode(mode);
    setOutput(item.output);
    setOutputVariations([]);
    setRefinementInput("");
    setTone(item.tone);
    setLanguage(item.language);
    setShowHistory(false);
  }

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  const uploadLimitReached = !proUser && uploadCount >= FREE_UPLOAD_LIMIT;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Pro badge */}
      {proUser && (
        <div className="flex items-center gap-2.5 mb-5 px-4 py-2.5 bg-teal-500/10 border border-teal-500/20 rounded-xl">
          <span className="text-teal-400 font-bold text-sm">✦ Pro</span>
          <span className="text-slate-400 text-xs">Unlimited uses · All 20 modes · File upload · Exports · Brand voice · Refinement</span>
        </div>
      )}

      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode)}
            title={mode.proOnly && !proUser ? ui.proOnly : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedMode.id === mode.id
                ? "bg-indigo-600 text-white shadow-sm shadow-indigo-500/20"
                : mode.proOnly && !proUser
                ? "bg-white/[0.04] text-slate-600 cursor-not-allowed"
                : "bg-white/[0.06] text-slate-300 hover:bg-white/[0.10] hover:text-white"
            }`}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
            {mode.proOnly && !proUser && (
              <span className="text-xs bg-indigo-500/20 text-indigo-400 px-1 rounded ml-0.5">Pro</span>
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-400 mb-4">{selectedMode.description}</p>

      {/* Custom instruction field */}
      {selectedMode.id === "custom" && (
        <textarea
          value={customInstruction}
          onChange={(e) => setCustomInstruction(e.target.value)}
          placeholder={ui.customInstructionPlaceholder}
          rows={3}
          className="w-full rounded-xl border border-indigo-500/30 bg-indigo-500/[0.08] p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-3"
        />
      )}

      {/* Platform selector — social media mode only */}
      {selectedMode.id === "social_media" && (
        <div className="mb-4 p-4 bg-white/[0.04] rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-slate-300">
              {ui.choosePlatforms}
              {!proUser && (
                <span className="ml-2 text-xs text-slate-500">
                  {ui.freePlatformNote} ·{" "}
                  <button onClick={handleCheckout} className="text-indigo-400 underline hover:no-underline">
                    {ui.proForMultiple}
                  </button>
                </span>
              )}
            </p>
            {proUser && (
              <button
                onClick={() => setSelectedPlatforms(PLATFORMS.map(p => p.id))}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                {ui.selectAll}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              return (
                <button
                  key={platform.id}
                  title={platform.hint}
                  onClick={() => {
                    if (!proUser) { setSelectedPlatforms([platform.id]); return; }
                    setSelectedPlatforms(prev =>
                      prev.includes(platform.id)
                        ? prev.length === 1 ? prev : prev.filter(p => p !== platform.id)
                        : [...prev, platform.id]
                    );
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white/[0.05] text-slate-300 border-white/10 hover:border-indigo-400/50"
                  }`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.label}</span>
                </button>
              );
            })}
          </div>
          {!proUser && (
            <p className="text-xs text-slate-500 mt-2">{ui.proSocialHint}</p>
          )}
        </div>
      )}

      {/* Tone + Language + Brand voice row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">{ui.tone}</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="text-sm border border-white/10 rounded-lg px-2 py-1 text-slate-200 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TONES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">{ui.outputLanguage}</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-white/10 rounded-lg px-2 py-1 text-slate-200 bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => { if (!proUser) { handleCheckout(); return; } setShowBrandVoice(true); }}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
            proUser && brandVoiceSet
              ? "border-teal-500/30 text-teal-400 bg-teal-500/10"
              : proUser
              ? "border-white/10 text-slate-500 hover:text-slate-300 hover:border-white/20"
              : "border-white/10 text-slate-600 hover:text-indigo-400 hover:border-indigo-400/30 cursor-pointer"
          }`}
        >
          <span>🎨</span>
          <span>{proUser && brandVoiceSet ? "Brand voice on" : "Brand voice"}</span>
          {!proUser && <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-1 rounded">Pro</span>}
        </button>
      </div>

      {/* File upload + Input */}
      <div className="relative mb-1">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={selectedMode.placeholder}
          rows={proUser ? 14 : 8}
          maxLength={maxChars}
          className="w-full rounded-xl border border-white/10 p-4 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-slate-900/60"
        />
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          {fileLoading ? (
            <span className="text-xs text-slate-500">Reading file…</span>
          ) : (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.pdf,.docx,.csv,.xlsx,.xls,.jpg,.jpeg,.png,.webp"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => { if (uploadLimitReached) { setError("You've used your 1 free upload today. Upgrade to Pro for unlimited file uploads."); return; } fileInputRef.current?.click(); }}
                className={`flex items-center gap-1 text-xs bg-white/[0.05] border border-white/10 rounded-lg px-2.5 py-1.5 transition-colors ${uploadLimitReached ? "text-slate-600 cursor-not-allowed" : "text-slate-500 hover:text-slate-300"}`}
                title={uploadLimitReached ? "Upgrade to Pro for unlimited uploads" : "Upload file"}
              >
                <span>📎</span>
                <span>{fileName ? fileName.slice(0, 20) + (fileName.length > 20 ? "…" : "") : uploadLimitReached ? "Upload used (Pro for more)" : "Upload file"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-1 mb-3">
        <span className="text-xs text-slate-600">
          {input.length.toLocaleString()} / {maxChars.toLocaleString()}
          {!proUser && (
            <span className="text-indigo-400 ml-1">
              · <button onClick={handleCheckout} className="underline hover:no-underline">{ui.goProCharLimit}</button>
            </span>
          )}
        </span>
        {proUser ? (
          <span className="text-xs text-teal-400 font-medium">{ui.proUnlimited}</span>
        ) : !isLimitReached ? (
          <span className="text-xs text-slate-500">
            {ui.usesRemaining.replace("{n}", String(remaining))}
          </span>
        ) : null}
      </div>

      {/* Variations toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setGenerateVariations(!generateVariations)}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all ${
            generateVariations
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white/[0.05] text-slate-400 border-white/10 hover:border-indigo-400/50"
          }`}
        >
          <span>{generateVariations ? "✓" : "+"}</span>
          <span>{ui.generateVariations.replace(" →", "")}</span>
        </button>
        <span className="text-xs text-slate-500">{ui.variationsHint}</span>
      </div>

      {/* Action or Upgrade */}
      {isLimitReached ? (
        <div className="bg-indigo-500/[0.08] border border-indigo-500/30 rounded-xl p-5 text-center mb-6">
          <p className="font-semibold text-indigo-300 mb-1">{ui.limitTitle}</p>
          <p className="text-sm text-indigo-400 mb-4">{ui.limitDesc}</p>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="inline-block bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-500 transition-colors disabled:opacity-50"
          >
            {checkoutLoading ? ui.redirecting : ui.getProAccess}
          </button>
        </div>
      ) : (
        <button
          onClick={handleProcess}
          disabled={loading || !input.trim()}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {generateVariations ? ui.generatingVariations : ui.clarifying}
            </>
          ) : (
            generateVariations ? ui.generateVariations : ui.clarify
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-500/[0.08] border border-red-500/30 rounded-xl p-4 text-sm text-red-400">{error}</div>
      )}

      {/* Output — variations */}
      {outputVariations.length > 0 && (
        <div className="mt-6">
          <div className="flex gap-2 mb-4">
            {outputVariations.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveVariation(i)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeVariation === i
                    ? "bg-indigo-600 text-white"
                    : "bg-white/[0.06] text-slate-400 hover:bg-white/[0.10]"
                }`}
              >
                {ui.variation} {i + 1}
              </button>
            ))}
          </div>
          <OutputBlock
            text={outputVariations[activeVariation]}
            copyLabel={ui.copy}
            copiedLabel={ui.copied}
            proUser={proUser}
            onUpgrade={handleCheckout}
            onDownloadPdf={() => handleDownloadPdf(outputVariations[activeVariation])}
            onDownloadDocx={() => handleDownloadDocx(outputVariations[activeVariation])}
            onDownloadMd={() => handleDownloadMd(outputVariations[activeVariation])}
          />
        </div>
      )}

      {/* Output — single */}
      {output && !outputVariations.length && (
        <div className="mt-6">
          <h3 className="font-semibold text-slate-200 mb-3">{ui.result}</h3>
          <OutputBlock
            text={output}
            copyLabel={ui.copy}
            copiedLabel={ui.copied}
            proUser={proUser}
            onUpgrade={handleCheckout}
            onDownloadPdf={() => handleDownloadPdf(output)}
            onDownloadDocx={() => handleDownloadDocx(output)}
            onDownloadMd={() => handleDownloadMd(output)}
          />
        </div>
      )}

      {/* Refinement box — Pro only */}
      {currentOutput && (
        proUser ? (
          <div className="mt-4 p-4 bg-white/[0.03] border border-white/8 rounded-xl">
            <p className="text-xs font-medium text-slate-400 mb-2">Refine this output</p>
            <div className="flex gap-2">
              <input
                value={refinementInput}
                onChange={(e) => setRefinementInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleRefine(); } }}
                placeholder='e.g. "Make it shorter", "Add a section about pricing", "More formal tone"'
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleRefine}
                disabled={refining || !refinementInput.trim()}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-500 disabled:opacity-50 transition-colors"
              >
                {refining ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : "Refine →"}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 p-4 bg-white/[0.03] border border-white/8 rounded-xl flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium text-slate-400">Refine this output</p>
              <p className="text-xs text-slate-600 mt-0.5">Iterate with follow-up instructions — Pro feature</p>
            </div>
            <button
              onClick={handleCheckout}
              className="shrink-0 text-xs bg-indigo-600 text-white font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Upgrade to Pro →
            </button>
          </div>
        )
      )}

      {/* Sign-in prompt before checkout */}
      {showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={() => setShowSignInPrompt(false)}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-white mb-2">Sign in before upgrading</h2>
            <p className="text-sm text-slate-400 mb-6">
              Signing in links your Pro subscription to your account so it works on any device — not just this browser.
            </p>
            <div className="space-y-3">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setShowSignInPrompt(false); document.dispatchEvent(new CustomEvent("open-auth-modal")); }}
                className="block w-full text-center bg-teal-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-teal-400 transition-colors text-sm"
              >
                Sign in first →
              </a>
              <button
                onClick={startCheckout}
                disabled={checkoutLoading}
                className="w-full border border-white/10 text-slate-400 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-colors disabled:opacity-50"
              >
                {checkoutLoading ? "Redirecting…" : "Continue without account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brand voice panel */}
      {showBrandVoice && (
        <BrandVoicePanel
          onClose={() => {
            setShowBrandVoice(false);
            const bv = loadBrandVoice();
            setBrandVoiceSet(Object.values(bv).some((v) => v.trim().length > 0));
          }}
        />
      )}

      {/* History */}
      <div className="mt-8 border-t border-white/5 pt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
        >
          <span>{showHistory ? "▾" : "▸"}</span>
          <span>{ui.history} ({history.length}{proUser ? "/20" : "/5"})</span>
          {!proUser && <span className="text-xs text-indigo-400">{ui.proGets20}</span>}
        </button>
        {showHistory && (
          <div className="mt-4">
            <HistoryPanel
              history={history}
              onSelect={handleHistorySelect}
              onClear={handleClearHistory}
              ui={{ noHistory: ui.noHistory, recentResults: ui.recentResults, clearAll: ui.clearAll }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

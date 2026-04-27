"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { MODES, TONES, LANGUAGES, PLATFORMS } from "./tool/modes";
import { getHistory, saveToHistory, clearHistory, formatTimeAgo, type HistoryItem } from "./tool/history";

const FREE_LIMIT = 3;
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

function isPro(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("clarity_ai_pro") === "true";
}

function OutputBlock({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <div className="mb-4">
      {label && <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wide mb-2">{label}</p>}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 prose prose-sm max-w-none text-gray-800 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-gray-300 [&_td]:p-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
      <button
        onClick={handleCopy}
        className="mt-2 flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 transition-colors"
      >
        {copied ? (
          <><span className="text-green-500">✓</span><span className="text-green-600">Copied!</span></>
        ) : (
          <><span>📋</span><span>Copy</span></>
        )}
      </button>
    </div>
  );
}

function HistoryPanel({ history, onSelect, onClear }: {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}) {
  if (history.length === 0) {
    return <p className="text-sm text-gray-400 text-center py-6">No history yet. Your results will appear here.</p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900 text-sm">Recent results</h3>
        <button onClick={onClear} className="text-xs text-red-400 hover:text-red-600 transition-colors">Clear all</button>
      </div>
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg p-3 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-indigo-600">{item.modeLabel}</span>
              <span className="text-xs text-gray-400">{formatTimeAgo(item.timestamp)}</span>
            </div>
            <p className="text-xs text-gray-600 truncate">{item.inputPreview}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ClarityTool() {
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
  const [proUser, setProUser] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [generateVariations, setGenerateVariations] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["linkedin"]);

  useEffect(() => {
    setUsageCount(getUsageCount());
    const pro = isPro();
    setProUser(pro);
    setHistory(getHistory());
  }, []);

  const maxChars = proUser ? PRO_MAX_CHARS : FREE_MAX_CHARS;
  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const isLimitReached = !proUser && usageCount >= FREE_LIMIT;

  async function handleProcess() {
    if (!input.trim() || isLimitReached) return;
    if (selectedMode.id === "custom" && !customInstruction.trim()) {
      setError("Please enter your custom instruction.");
      return;
    }

    setLoading(true);
    setError("");
    setOutput("");
    setOutputVariations([]);

    try {
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
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      const newCount = incrementUsage();
      setUsageCount(newCount);

      if (data.variations) {
        setOutputVariations(data.variations);
        setActiveVariation(0);
        saveToHistory({
          mode: selectedMode.id,
          modeLabel: selectedMode.label,
          inputPreview: input.slice(0, 80),
          output: data.variations[0],
          tone,
          language,
        }, proUser);
      } else {
        setOutput(data.result);
        saveToHistory({
          mode: selectedMode.id,
          modeLabel: selectedMode.label,
          inputPreview: input.slice(0, 80),
          output: data.result,
          tone,
          language,
        }, proUser);
      }

      setHistory(getHistory());
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckout() {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError("Could not start checkout. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  function handleModeChange(mode: typeof MODES[0]) {
    if (mode.proOnly && !proUser) return;
    setSelectedMode(mode);
    setOutput("");
    setOutputVariations([]);
    setError("");
  }

  function handleHistorySelect(item: HistoryItem) {
    const mode = MODES.find(m => m.id === item.mode);
    if (mode) setSelectedMode(mode);
    setOutput(item.output);
    setOutputVariations([]);
    setTone(item.tone);
    setLanguage(item.language);
    setShowHistory(false);
  }

  function handleClearHistory() {
    clearHistory();
    setHistory([]);
  }

  const currentOutput = outputVariations.length > 0 ? outputVariations[activeVariation] : output;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode)}
            title={mode.proOnly && !proUser ? "Pro only" : undefined}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all relative ${
              selectedMode.id === mode.id
                ? "bg-indigo-600 text-white shadow-sm"
                : mode.proOnly && !proUser
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
            {mode.proOnly && !proUser && (
              <span className="text-xs bg-indigo-100 text-indigo-600 px-1 rounded ml-0.5">Pro</span>
            )}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">{selectedMode.description}</p>

      {/* Custom instruction field */}
      {selectedMode.id === "custom" && (
        <textarea
          value={customInstruction}
          onChange={(e) => setCustomInstruction(e.target.value)}
          placeholder="Write your instruction here. E.g. 'Summarize this into 5 bullet points for a 10-year-old' or 'Rewrite this as a formal business letter'..."
          rows={3}
          className="w-full rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none mb-3"
        />
      )}

      {/* Platform selector — social media mode only */}
      {selectedMode.id === "social_media" && (
        <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700">
              Choose platforms
              {!proUser && <span className="ml-2 text-xs text-gray-400">(free: pick 1 · <button onClick={handleCheckout} className="text-indigo-500 underline hover:no-underline">Pro for all</button>)</span>}
            </p>
            {proUser && (
              <button
                onClick={() => setSelectedPlatforms(PLATFORMS.map(p => p.id))}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Select all
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => {
              const isSelected = selectedPlatforms.includes(platform.id);
              const isLocked = platform.proOnly && !proUser;
              const isDisabled = !proUser && !isSelected && selectedPlatforms.length >= 1;

              return (
                <button
                  key={platform.id}
                  title={isLocked ? "Pro only" : platform.hint}
                  disabled={isLocked || isDisabled}
                  onClick={() => {
                    if (isLocked || isDisabled) return;
                    if (!proUser) {
                      setSelectedPlatforms([platform.id]);
                      return;
                    }
                    setSelectedPlatforms(prev =>
                      prev.includes(platform.id)
                        ? prev.filter(p => p !== platform.id)
                        : [...prev, platform.id]
                    );
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    isLocked
                      ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                      : isDisabled
                      ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed"
                      : isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
                  }`}
                >
                  <span>{platform.icon}</span>
                  <span>{platform.label}</span>
                  {isLocked && <span className="text-xs bg-indigo-100 text-indigo-500 px-1 rounded">Pro</span>}
                </button>
              );
            })}
          </div>
          {!proUser && (
            <p className="text-xs text-gray-400 mt-2">
              Upgrade to Pro to generate for multiple platforms at once + unlock Facebook, TikTok, Pinterest, YouTube, Threads & Newsletter
            </p>
          )}
        </div>
      )}

      {/* Tone + Language selectors */}
      <div className="flex flex-wrap gap-3 mb-3">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {TONES.map((t) => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-500 font-medium">Output language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={selectedMode.placeholder}
        rows={8}
        maxLength={maxChars}
        className="w-full rounded-xl border border-gray-200 p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white"
      />

      <div className="flex items-center justify-between mt-1 mb-3">
        <span className="text-xs text-gray-400">
          {input.length.toLocaleString()} / {maxChars.toLocaleString()} characters
          {!proUser && <span className="text-indigo-500 ml-1">· <button onClick={handleCheckout} className="underline hover:no-underline">Go Pro for 15,000</button></span>}
        </span>
        {proUser ? (
          <span className="text-xs text-indigo-600 font-medium">✦ Pro — unlimited uses</span>
        ) : !isLimitReached ? (
          <span className="text-xs text-gray-400">{remaining} free {remaining === 1 ? "use" : "uses"} remaining today</span>
        ) : null}
      </div>

      {/* Variations toggle */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setGenerateVariations(!generateVariations)}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border transition-all ${
            generateVariations
              ? "bg-indigo-600 text-white border-indigo-600"
              : "bg-white text-gray-600 border-gray-200 hover:border-indigo-300"
          }`}
        >
          <span>{generateVariations ? "✓" : "+"}</span>
          <span>Generate 3 variations</span>
        </button>
        <span className="text-xs text-gray-400">Pick your favourite version</span>
      </div>

      {/* Action or Upgrade */}
      {isLimitReached ? (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center mb-6">
          <p className="font-semibold text-indigo-900 mb-1">You&apos;ve used your 3 free uses today</p>
          <p className="text-sm text-indigo-700 mb-4">Upgrade to Pro for unlimited uses, 11 modes, custom instructions, and 15,000 character input — just €9/month</p>
          <button
            onClick={handleCheckout}
            disabled={checkoutLoading}
            className="inline-block bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {checkoutLoading ? "Redirecting..." : "Get Pro Access →"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleProcess}
          disabled={loading || !input.trim()}
          className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              {generateVariations ? "Generating 3 variations..." : "Clarifying..."}
            </>
          ) : (
            generateVariations ? "Generate 3 variations →" : "Clarify →"
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">{error}</div>
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
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Variation {i + 1}
              </button>
            ))}
          </div>
          <OutputBlock text={outputVariations[activeVariation]} />
        </div>
      )}

      {/* Output — single */}
      {output && !outputVariations.length && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Result</h3>
          <OutputBlock text={output} />
        </div>
      )}

      {/* History */}
      <div className="mt-8 border-t border-gray-100 pt-6">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
        >
          <span>{showHistory ? "▾" : "▸"}</span>
          <span>History ({history.length}{proUser ? "/20" : "/5"})</span>
          {!proUser && <span className="text-xs text-indigo-500">Pro gets 20</span>}
        </button>
        {showHistory && (
          <div className="mt-4">
            <HistoryPanel
              history={history}
              onSelect={handleHistorySelect}
              onClear={handleClearHistory}
            />
          </div>
        )}
      </div>
    </div>
  );
}

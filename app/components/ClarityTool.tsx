"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MODES = [
  {
    id: "meeting_notes",
    label: "Meeting Notes",
    icon: "📋",
    placeholder:
      "Paste your raw meeting notes here — bullet points, voice transcript, scribbles, anything...",
    description: "Get a clean summary, action items table, and a follow-up email draft",
  },
  {
    id: "brain_dump",
    label: "Brain Dump",
    icon: "🧠",
    placeholder:
      "Dump all your thoughts, ideas, and plans here without worrying about structure...",
    description: "Turn scattered ideas into an organized plan with prioritized next steps",
  },
  {
    id: "email_reply",
    label: "Email Reply",
    icon: "✉️",
    placeholder: "Paste the email you received and need to reply to...",
    description: "Get a professional reply ready to copy-paste",
  },
  {
    id: "cover_letter",
    label: "Cover Letter",
    icon: "📄",
    placeholder: "Paste the job description or job posting here...",
    description: "Get a compelling cover letter tailored to the role",
  },
  {
    id: "cleanup",
    label: "Text Cleanup",
    icon: "✨",
    placeholder:
      "Paste any messy, rough, or unformatted text you want to clean up...",
    description: "Fix grammar, improve flow, and add structure — your voice stays intact",
  },
];

const FREE_LIMIT = 3;

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

export default function ClarityTool() {
  const [selectedMode, setSelectedMode] = useState(MODES[0]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    setUsageCount(getUsageCount());
  }, []);

  const remaining = Math.max(0, FREE_LIMIT - usageCount);
  const isLimitReached = usageCount >= FREE_LIMIT;

  async function handleProcess() {
    if (!input.trim() || isLimitReached) return;

    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), mode: selectedMode.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      const newCount = incrementUsage();
      setUsageCount(newCount);
      setOutput(data.result);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleModeChange(mode: (typeof MODES)[0]) {
    setSelectedMode(mode);
    setOutput("");
    setError("");
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-4">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedMode.id === mode.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{mode.icon}</span>
            <span>{mode.label}</span>
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-3">{selectedMode.description}</p>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={selectedMode.placeholder}
        rows={8}
        maxLength={5000}
        className="w-full rounded-xl border border-gray-200 p-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none bg-white"
      />
      <div className="flex items-center justify-between mt-1 mb-4">
        <span className="text-xs text-gray-400">{input.length} / 5,000 characters</span>
        {!isLimitReached && (
          <span className="text-xs text-gray-400">
            {remaining} free {remaining === 1 ? "use" : "uses"} remaining today
          </span>
        )}
      </div>

      {/* Action or Upgrade */}
      {isLimitReached ? (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 text-center mb-6">
          <p className="font-semibold text-indigo-900 mb-1">
            You&apos;ve used your 3 free uses today
          </p>
          <p className="text-sm text-indigo-700 mb-4">
            Upgrade to Pro for unlimited uses — just €9/month
          </p>
          <a
            href="mailto:shokavdooren@gmail.com?subject=Clarity AI Pro — I want to upgrade"
            className="inline-block bg-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Pro Access →
          </a>
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
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Clarifying...
            </>
          ) : (
            "Clarify →"
          )}
        </button>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Result</h3>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            >
              {copied ? (
                <>
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 prose prose-sm max-w-none text-gray-800 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-gray-300 [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-gray-300 [&_td]:p-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{output}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

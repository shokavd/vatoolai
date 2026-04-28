"use client";

import { useState } from "react";
import StaticPageLayout from "../components/StaticPageLayout";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Clarity AI — ${name}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <StaticPageLayout
      title="Contact"
      subtitle="Have a question, idea, or issue? We read every message and reply promptly."
    >
      {status === "sent" ? (
        <div className="not-prose mt-8 text-center py-16 border border-dashed border-teal-500/20 rounded-2xl">
          <div className="text-4xl mb-4">✉️</div>
          <h2 className="text-lg font-semibold text-white mb-2">Message sent!</h2>
          <p className="text-slate-400 text-sm max-w-xs mx-auto">
            Thank you for reaching out. We&apos;ll get back to you as soon as possible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="not-prose mt-8 space-y-5 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Your name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Your email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Message</label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              placeholder="Tell us what's on your mind..."
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            />
          </div>
          {status === "error" && (
            <p className="text-sm text-red-400">
              Something went wrong. Please try again in a moment.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-teal-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-teal-400 disabled:opacity-50 transition-colors"
          >
            {status === "sending" ? "Sending…" : "Send message →"}
          </button>
        </form>
      )}
    </StaticPageLayout>
  );
}

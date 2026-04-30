"use client";

import { useState } from "react";
import { useAuth } from "../lib/AuthContext";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export default function AuthModal({ onClose }: Props) {
  const { signInWithEmail, user, isProUser, signOut } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);

  async function handleManageSubscription() {
    if (!user) return;
    setPortalLoading(true);
    try {
      const res = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        alert(data.error || "Could not open billing portal.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const result = await signInWithEmail(email);
    if (result.error) {
      setErrorMsg(result.error);
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors text-lg leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {user ? (
          /* Signed in state */
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-4">
              <span className="text-teal-400 text-lg">✓</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-1">Signed in</h2>
            <p className="text-sm text-slate-400 mb-1 break-all">{user.email}</p>
            {isProUser && (
              <span className="inline-block text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full mb-6">Pro</span>
            )}
            {!isProUser && <div className="mb-6" />}
            <div className="space-y-3">
              {isProUser && (
                <button
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  className="w-full bg-teal-500/10 border border-teal-500/30 text-teal-400 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-500/20 disabled:opacity-50 transition-colors"
                >
                  {portalLoading ? "Opening…" : "Manage subscription →"}
                </button>
              )}
              <button
                onClick={async () => { await signOut(); onClose(); }}
                className="w-full border border-white/10 text-slate-300 py-2.5 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : status === "sent" ? (
          /* Magic link sent */
          <div className="text-center">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-lg font-semibold text-white mb-2">Check your email</h2>
            <p className="text-sm text-slate-400">
              We&apos;ve sent a sign-in link to <span className="text-white">{email}</span>.
              Click the link to sign in — no password needed.
            </p>
          </div>
        ) : (
          /* Sign in form */
          <>
            <h2 className="text-lg font-semibold text-white mb-1">Sign in to Tidify AI</h2>
            <p className="text-sm text-slate-400 mb-6">
              Enter your email and we&apos;ll send you a magic link. No password needed.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              {status === "error" && (
                <p className="text-xs text-red-400">{errorMsg || "Something went wrong. Try again."}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-teal-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-teal-400 disabled:opacity-50 transition-colors text-sm"
              >
                {status === "sending" ? "Sending…" : "Send magic link →"}
              </button>
            </form>
            <p className="text-xs text-slate-600 mt-4 text-center">
              Signing in links your Pro subscription to your account so it works on any device.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

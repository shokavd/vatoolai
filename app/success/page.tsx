"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAuth } from "../lib/AuthContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const { user, refreshProStatus } = useAuth();

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then(async (data) => {
        if (data.customerId) {
          localStorage.setItem("clarity_ai_pro", "true");
          localStorage.setItem("clarity_ai_customer_id", data.customerId);
          await refreshProStatus();
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-6" />
        <p className="text-slate-400 text-sm">Verifying your payment…</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="text-4xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-slate-400 mb-6 text-sm">
          Your payment may have gone through. Contact us with your payment receipt and we&apos;ll activate your Pro access.
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-500 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:bg-teal-400 transition-colors text-sm"
        >
          Contact support →
        </a>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-5xl mb-6">🎉</div>
      <h1 className="text-3xl font-bold text-white mb-3">You&apos;re now Pro!</h1>
      <p className="text-slate-400 mb-2 text-sm">
        Unlimited uses, all modes, no daily limits — ever.
      </p>

      {user ? (
        <p className="text-sm text-teal-400 mb-8">
          Your Pro status is linked to <span className="font-medium">{user.email}</span> and will work on any device.
        </p>
      ) : (
        <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4 mb-8 text-left max-w-sm mx-auto">
          <p className="text-sm font-semibold text-white mb-1">Save your Pro status across devices</p>
          <p className="text-sm text-slate-400 mb-3">
            Sign in to link your subscription to an account. Otherwise Pro is stored in this browser only.
          </p>
          <a
            href="/"
            className="inline-block text-sm font-medium bg-white/[0.08] text-slate-200 px-4 py-2 rounded-lg hover:bg-white/[0.12] transition-colors"
          >
            Sign in on the home page →
          </a>
        </div>
      )}

      <a
        href="/#tool"
        className="inline-block bg-teal-500 text-slate-950 font-semibold px-8 py-3 rounded-xl hover:bg-teal-400 transition-colors"
      >
        Start using Clarity AI →
      </a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Clarity AI
          </span>
        </div>
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }

    fetch(`/api/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.customerId) {
          localStorage.setItem("clarity_ai_pro", "true");
          localStorage.setItem("clarity_ai_customer_id", data.customerId);
          setStatus("success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  if (status === "loading") {
    return (
      <div className="text-center">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-gray-600">Verifying your payment...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
        <p className="text-gray-500 mb-6">
          Your payment may have gone through. Email us and we&apos;ll sort it out.
        </p>
        <a
          href="mailto:shokavdooren@gmail.com?subject=Clarity AI Pro — payment issue"
          className="inline-block bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Contact support
        </a>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-5xl mb-4">🎉</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        You&apos;re now Pro!
      </h1>
      <p className="text-gray-500 mb-2">
        Unlimited uses, all modes, no daily limits — ever.
      </p>
      <p className="text-sm text-gray-400 mb-8">
        Your Pro status is saved in this browser. If you switch devices, email us.
      </p>
      <a
        href="/#tool"
        className="inline-block bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Start using Clarity AI →
      </a>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-xl font-bold text-gray-900">Clarity AI</span>
        </div>
        <Suspense fallback={
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
          </div>
        }>
          <SuccessContent />
        </Suspense>
      </div>
    </div>
  );
}

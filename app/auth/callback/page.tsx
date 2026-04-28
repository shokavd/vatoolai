"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    if (!supabase) {
      setStatus("error");
      return;
    }

    // Supabase handles the token automatically from the URL hash/params.
    // We just need to wait for the session to be established.
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data.session) {
        // Give it a moment — the session may be in flight
        setTimeout(async () => {
          const { data: retryData } = await supabase!.auth.getSession();
          if (retryData.session) {
            setStatus("success");
            setTimeout(() => router.replace("/"), 1500);
          } else {
            setStatus("error");
          }
        }, 1000);
      } else {
        setStatus("success");
        setTimeout(() => router.replace("/"), 1500);
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full mx-auto mb-6" />
            <h1 className="text-xl font-semibold text-white mb-2">Signing you in…</h1>
            <p className="text-sm text-slate-400">Just a moment.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center mx-auto mb-6">
              <span className="text-teal-400 text-3xl">✓</span>
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">You&apos;re signed in!</h1>
            <p className="text-sm text-slate-400">Taking you back to Clarity AI…</p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="text-4xl mb-6">⚠️</div>
            <h1 className="text-xl font-semibold text-white mb-2">Sign-in link expired</h1>
            <p className="text-sm text-slate-400 mb-6">
              Magic links expire after 1 hour. Please request a new one.
            </p>
            <a
              href="/"
              className="inline-block bg-teal-500 text-slate-950 font-semibold px-6 py-3 rounded-xl hover:bg-teal-400 transition-colors text-sm"
            >
              Back to Clarity AI
            </a>
          </>
        )}
      </div>
    </div>
  );
}

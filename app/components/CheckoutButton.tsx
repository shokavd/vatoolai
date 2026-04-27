"use client";

import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="w-full block text-center bg-amber-400 text-slate-950 font-bold py-3 rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-50 shadow-lg shadow-amber-400/20"
    >
      {loading ? "Redirecting..." : "Get Pro Access →"}
    </button>
  );
}

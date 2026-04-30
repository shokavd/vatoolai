"use client";

import Link from "next/link";

export default function StaticPageLayout({
  title,
  subtitle,
  lastUpdated,
  children,
}: {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070d14] text-white">
      {/* Nav */}
      <header className="border-b border-white/5 px-4 sm:px-6 h-16 flex items-center">
        <div className="max-w-3xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="text-lg font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Tidify AI
          </Link>
          <Link href="/" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h1>
            {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
            {lastUpdated && <p className="text-xs text-slate-600 mt-3">Last updated: {lastUpdated}</p>}
          </div>
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none [&_h2]:text-white [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-slate-200 [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:text-slate-400 [&_p]:leading-relaxed [&_ul]:text-slate-400 [&_li]:mb-1 [&_a]:text-teal-400 [&_strong]:text-slate-200 [&_hr]:border-white/10">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 sm:px-6 text-center">
        <p className="text-xs text-slate-700">© {new Date().getFullYear()} Tidify AI · tidifyai.com</p>
      </footer>
    </div>
  );
}

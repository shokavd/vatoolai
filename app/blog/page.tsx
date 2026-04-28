import StaticPageLayout from "../components/StaticPageLayout";
import { ARTICLES } from "./articles";
import Link from "next/link";

export const metadata = { title: "Blog — Clarity AI" };

export default function BlogPage() {
  return (
    <StaticPageLayout
      title="Blog"
      subtitle="Tips, productivity techniques, and ideas on getting more done with AI."
    >
      <div className="not-prose mt-8 space-y-4">
        {ARTICLES.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block group bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:border-teal-500/30 hover:bg-white/[0.05] transition-all"
          >
            <div className="flex items-center gap-3 mb-2 text-xs text-slate-500">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
            <h2 className="text-base font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">{article.excerpt}</p>
            <span className="inline-block mt-3 text-xs text-teal-500 group-hover:text-teal-400 transition-colors">
              Read article →
            </span>
          </Link>
        ))}
      </div>
    </StaticPageLayout>
  );
}

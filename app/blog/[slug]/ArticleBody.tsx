"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ArticleBody({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-sm max-w-none prose-headings:text-slate-200 prose-p:text-slate-400 prose-strong:text-slate-200 prose-li:text-slate-400 prose-a:text-teal-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-hr:border-white/10 prose-blockquote:border-teal-500/50 prose-blockquote:text-slate-400 [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-white/20 [&_th]:bg-slate-800 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-white/15 [&_td]:p-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}

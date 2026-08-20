import { notFound } from "next/navigation";
import { ARTICLES, getArticle } from "../articles";
import StaticPageLayout from "../../components/StaticPageLayout";
import type { Metadata } from "next";
import ArticleBody from "./ArticleBody";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Tidify AI Blog`,
    description: article.excerpt,
    alternates: { canonical: `https://www.tidifyai.com/blog/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <StaticPageLayout title={article.title} subtitle={article.excerpt}>
      <div className="flex items-center gap-3 not-prose mb-6 text-sm text-slate-500">
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
      <ArticleBody content={article.content} />
    </StaticPageLayout>
  );
}

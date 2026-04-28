import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Blog — Clarity AI" };

export default function BlogPage() {
  return (
    <StaticPageLayout
      title="Blog"
      subtitle="Tips, updates, and ideas on getting more done with AI."
    >
      <div className="not-prose mt-8 text-center py-20 border border-dashed border-white/10 rounded-2xl">
        <div className="text-4xl mb-4">✍️</div>
        <h2 className="text-lg font-semibold text-white mb-2">Coming soon</h2>
        <p className="text-slate-400 text-sm max-w-sm mx-auto">
          We&apos;re working on articles about productivity, AI writing tips, and how to get the most out of each Clarity AI mode.
        </p>
        <p className="text-slate-500 text-xs mt-4">
          Want to be notified when we publish?{" "}
          <a href="mailto:shokavdooren@gmail.com" className="text-teal-400 hover:underline">
            Drop us your email
          </a>
        </p>
      </div>
    </StaticPageLayout>
  );
}

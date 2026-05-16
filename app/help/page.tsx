import StaticPageLayout from "../components/StaticPageLayout";

export const metadata = { title: "Help Center — Tidify AI", alternates: { canonical: "https://www.tidifyai.com/help" } };

const FAQ = [
  { q: "Is Tidify AI really free?", a: "Yes — 3 uses per day, forever. No credit card or account needed. Just paste your text and go." },
  { q: "How do I upgrade to Pro?", a: "Click 'Get Pro Access' anywhere on the site or inside the tool. You'll be taken to a secure Stripe checkout. After payment, Pro is activated instantly in your browser." },
  { q: "I paid but the tool still shows free. What do I do?", a: "This can happen if you use a different browser or device. Sign in to your Tidify AI account to sync your Pro status across all devices. If you don't have an account yet, use our contact form with your payment receipt and we'll sort it out." },
  { q: "How do I cancel my Pro subscription?", a: "Use our contact form to request cancellation. You can also contact Stripe support directly. Your access continues until the end of your current billing period." },
  { q: "Is my text private?", a: "Yes. Your text is sent to Anthropic's Claude AI to generate output and immediately discarded. We do not store, log, or train on your content. See our Privacy Policy for details." },
  { q: "What languages can I get output in?", a: "You can choose output in 10 languages: English, Dutch, Spanish, French, German, Portuguese, Italian, Polish, Arabic, and Mandarin Chinese. The output language selector is in the tool." },
  { q: "What are the 20 modes?", a: "Free (15): Meeting Notes, Brain Dump, Email Reply, Cover Letter, Text Cleanup, Social Media, Invoice / Proposal, Meeting Agenda, Performance Review, Legal Simplifier, LinkedIn Bio, Job Description, STAR Story, Product Description, and Complaint Letter. Pro-only (5): Cold Email Sequence, Press Release, Blog Outline, Interview Prep, and Custom." },
  { q: "What is the character limit?", a: "Free users can submit up to 5,000 characters. Pro users can submit up to 30,000 characters per request." },
  { q: "What is the Social Media mode?", a: "It takes any topic, idea, or content and generates ready-to-post text for the platform you choose — LinkedIn, Instagram, X/Twitter, Facebook, TikTok, Pinterest, YouTube, Threads, or Newsletter. Free users can choose one platform at a time; Pro users can select multiple and generate all posts at once." },
  { q: "What are 3 variations?", a: "Pro users can toggle 'Generate 3 variations' before submitting. This runs 3 parallel AI requests with slightly different styles so you can pick the version that fits best." },
  { q: "Does Tidify AI work on mobile?", a: "Yes — it works in any modern browser on any device. No app download needed." },
  { q: "The limit says I've used 3 today but I only used it once. Why?", a: "The usage counter tracks successful requests in your browser's local storage. Hard-refreshing (Cmd+Shift+R / Ctrl+Shift+R) or clearing site data will reset it. The counter resets automatically every day at midnight." },
  { q: "I found a bug. How do I report it?", a: "Use our contact form and include a description of the issue, what browser/device you're on, and any steps to reproduce it. Screenshots are very helpful." },
];

export default function HelpPage() {
  return (
    <StaticPageLayout
      title="Help Center"
      subtitle="Answers to the most common questions about Tidify AI."
    >
      <p>
        Can&apos;t find what you&apos;re looking for?{" "}
        <a href="/contact">Contact us</a> and we&apos;ll get back to you.
      </p>

      <div className="mt-8 space-y-6 not-prose">
        {FAQ.map((item, i) => (
          <div key={i} className="border border-white/8 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-2">{item.q}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-teal-500/10 border border-teal-500/20 rounded-2xl not-prose">
        <p className="text-sm font-semibold text-teal-300 mb-1">Still need help?</p>
        <p className="text-sm text-slate-400 mb-4">We&apos;re a small team and we read every message.</p>
        <a
          href="/contact"
          className="inline-block text-sm font-medium bg-teal-500 text-slate-950 px-5 py-2.5 rounded-lg hover:bg-teal-400 transition-colors"
        >
          Contact support →
        </a>
      </div>
    </StaticPageLayout>
  );
}

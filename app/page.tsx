import Header from "./components/Header";
import ClarityTool from "./components/ClarityTool";
import CheckoutButton from "./components/CheckoutButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
            Free to try — no sign-up needed
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Turn any messy text
            <br />
            <span className="text-indigo-600">into something useful</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl mx-auto">
            Paste meeting notes, a brain dump, an email, or any rough text.
            Clarity AI structures it, summarizes it, and tells you what to do next.
          </p>
          <a
            href="#tool"
            className="inline-block bg-indigo-600 text-white font-semibold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Try it free →
          </a>
          <p className="text-sm text-gray-400 mt-4">3 free uses per day. No account needed.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Paste your text",
                desc: "Drop in anything — meeting notes, an email, a wall of ideas, a rough draft. No formatting needed.",
              },
              {
                step: "2",
                title: "Pick a mode",
                desc: "Choose what you need: Meeting Notes, Brain Dump, Email Reply, Cover Letter, or Text Cleanup.",
              },
              {
                step: "3",
                title: "Get your result",
                desc: "Clarity AI returns a structured, ready-to-use output in seconds. Copy it and you&apos;re done.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes / Features */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Five modes. One tool.
          </h2>
          <p className="text-center text-gray-500 mb-12">
            Works for professionals, students, freelancers, and anyone who deals with text.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "📋",
                title: "Meeting Notes",
                desc: "Raw notes in, clean summary out — with action items table and a ready-to-send follow-up email.",
              },
              {
                icon: "🧠",
                title: "Brain Dump",
                desc: "Dump your thoughts without worrying about structure. Get back an organized plan with priorities.",
              },
              {
                icon: "✉️",
                title: "Email Reply",
                desc: "Paste an email you received. Get back a professional reply you can send immediately.",
              },
              {
                icon: "📄",
                title: "Cover Letter",
                desc: "Paste a job description. Get a tailored, compelling cover letter in 3 paragraphs.",
              },
              {
                icon: "✨",
                title: "Text Cleanup",
                desc: "Fix grammar, improve clarity, and add structure — while keeping your original voice.",
              },
              {
                icon: "🚀",
                title: "More coming",
                desc: "Report generation, contract summaries, social media captions, and more — coming soon.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Tool */}
      <section id="tool" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Try it now
          </h2>
          <p className="text-center text-gray-500 mb-10">
            No sign-up needed. 3 free uses today.
          </p>
          <ClarityTool />
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-3">
            Simple pricing
          </h2>
          <p className="text-center text-gray-500 mb-12">Start free. Upgrade when you need more.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Free */}
            <div className="border border-gray-200 rounded-2xl p-8">
              <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Free
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">€0</div>
              <div className="text-sm text-gray-400 mb-6">forever</div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {[
                  "3 uses per day",
                  "All 5 modes",
                  "No account needed",
                  "Copy to clipboard",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-green-500 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#tool"
                className="block text-center border border-gray-300 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Start for free
              </a>
            </div>

            {/* Pro */}
            <div className="border-2 border-indigo-600 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Most popular
              </div>
              <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide mb-2">
                Pro
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-1">€9</div>
              <div className="text-sm text-gray-400 mb-6">per month</div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {[
                  "Unlimited uses",
                  "All 5 modes",
                  "Priority processing",
                  "New modes as they launch",
                  "Email support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 text-indigo-600 shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <CheckoutButton />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-4 sm:px-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Clarity AI · vatoolai.com
        </p>
      </footer>
    </div>
  );
}

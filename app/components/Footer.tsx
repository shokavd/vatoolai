"use client";

import { useTranslation } from "../lib/TranslationContext";

const PRODUCT_LINKS = [
  { key: "features" as const, href: "#how-it-works" },
  { key: "pricing" as const, href: "#pricing" },
  { key: "faq" as const, href: "#faq" },
  { key: "allModes" as const, href: "#tool" },
];

const RESOURCE_LINKS = [
  { key: "helpCenter" as const, href: "#faq" },
  { key: "blog" as const, href: "#" },
  { key: "changelog" as const, href: "#" },
  { key: "roadmap" as const, href: "#" },
];

const LEGAL_LINKS = [
  { key: "privacy" as const, href: "/privacy" },
  { key: "terms" as const, href: "/terms" },
  { key: "cookies" as const, href: "/cookies" },
];

const SOCIAL_LINKS = [
  { label: "X / Twitter", href: "https://x.com/vatoolai", icon: "𝕏" },
  { label: "LinkedIn", href: "https://linkedin.com/company/vatoolai", icon: "in" },
  { label: "Email", href: "mailto:shokavdooren@gmail.com", icon: "✉" },
];

export default function Footer() {
  const { t } = useTranslation();
  const f = t.footer;

  return (
    <footer className="border-t border-white/5 bg-slate-950 pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Clarity AI
            </span>
            <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-xs">{f.tagline}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{f.product.title}</h4>
            <ul className="space-y-2.5">
              {PRODUCT_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
                    {f.product[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{f.resources.title}</h4>
            <ul className="space-y-2.5">
              {RESOURCE_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
                    {f.resources[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{f.legal.title}</h4>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map(({ key, href }) => (
                <li key={key}>
                  <a href={href} className="text-sm text-slate-500 hover:text-teal-400 transition-colors">
                    {f.legal[key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">{f.connect.title}</h4>
            <ul className="space-y-2.5">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-400 transition-colors"
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span className="text-xs font-bold w-5 text-center">{link.icon}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {f.copy}
          </p>
          <p className="text-xs text-slate-700">
            Powered by Claude AI · Made with ♥ in Veracruz
          </p>
        </div>
      </div>
    </footer>
  );
}

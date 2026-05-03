import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { TranslationProvider } from "./lib/TranslationContext";
import { AuthProvider } from "./lib/AuthContext";
import CookieBanner from "./components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tidify AI — Turn Chaos Into Clarity",
  description: "Tidify AI turns messy text into structured, actionable output in seconds. 20 AI writing modes — meeting notes, emails, cover letters, social posts, and more. Free to start.",
  keywords: ["AI writing tool", "text cleanup", "meeting notes AI", "cover letter generator", "email reply AI", "social media content"],
  authors: [{ name: "Tidify AI", url: "https://tidifyai.com" }],
  metadataBase: new URL("https://tidifyai.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tidify AI — Turn Chaos Into Clarity",
    description: "Paste any messy text. Get back something useful. 20 AI-powered writing modes for professionals.",
    url: "https://tidifyai.com",
    siteName: "Tidify AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tidify AI — Turn Chaos Into Clarity",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tidify AI — Turn Chaos Into Clarity",
    description: "Paste any messy text. Get back something useful. 20 AI-powered writing modes.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-SC30DLRG2Y" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SC30DLRG2Y');
        `}</Script>
        <TranslationProvider>
          <AuthProvider>
            {children}
            <CookieBanner />
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact — Tidify AI",
  alternates: {
    canonical: "https://www.tidifyai.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

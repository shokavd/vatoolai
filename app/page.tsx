import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://tidifyai.com",
  },
};

export default function Home() {
  return <HomeContent />;
}

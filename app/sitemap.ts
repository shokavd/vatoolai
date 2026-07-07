import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tidifyai.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/blog/how-to-turn-meeting-notes-into-action`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/brain-dump-to-plan`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/writing-better-cover-letters-with-ai`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/blog/ai-writing-tips-for-better-emails`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/changelog`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}

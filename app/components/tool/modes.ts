export type Mode = {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  description: string;
  proOnly?: boolean;
};

export const MODES: Mode[] = [
  {
    id: "meeting_notes",
    label: "Meeting Notes",
    icon: "📋",
    placeholder: "Paste your raw meeting notes — bullet points, voice transcript, scribbles, anything...",
    description: "Clean summary, action items table, and a follow-up email draft",
  },
  {
    id: "brain_dump",
    label: "Brain Dump",
    icon: "🧠",
    placeholder: "Dump all your thoughts, ideas, and plans here without worrying about structure...",
    description: "Turn scattered ideas into an organized plan with prioritized next steps",
  },
  {
    id: "email_reply",
    label: "Email Reply",
    icon: "✉️",
    placeholder: "Paste the email you received and need to reply to...",
    description: "A professional reply ready to copy-paste",
  },
  {
    id: "cover_letter",
    label: "Cover Letter",
    icon: "📄",
    placeholder: "Paste the job description or job posting here...",
    description: "A compelling cover letter tailored to the role",
  },
  {
    id: "cleanup",
    label: "Text Cleanup",
    icon: "✨",
    placeholder: "Paste any messy, rough, or unformatted text you want to clean up...",
    description: "Fix grammar, improve flow, add structure — your voice stays intact",
  },
  {
    id: "social_media",
    label: "Social Media",
    icon: "📱",
    placeholder: "Paste any content, idea, or topic — we'll turn it into posts for LinkedIn, Instagram, and X/Twitter...",
    description: "Get ready-to-post content for LinkedIn, Instagram, and X/Twitter",
  },
  {
    id: "invoice_proposal",
    label: "Invoice / Proposal",
    icon: "💼",
    placeholder: "Describe the project, client, deliverables, timeline, and your rate...",
    description: "Generate a professional project proposal or invoice outline",
  },
  {
    id: "meeting_agenda",
    label: "Meeting Agenda",
    icon: "🗓️",
    placeholder: "List your meeting topics, goals, attendees, and how long you have...",
    description: "A structured, timed agenda ready to share with attendees",
  },
  {
    id: "performance_review",
    label: "Performance Review",
    icon: "⭐",
    placeholder: "Describe your (or a team member's) work, achievements, and areas of growth over the review period...",
    description: "A professional performance review or self-assessment",
  },
  {
    id: "legal_simplifier",
    label: "Legal Simplifier",
    icon: "⚖️",
    placeholder: "Paste any legal text, contract clause, terms & conditions, or policy...",
    description: "Get a plain-English summary of what it actually means",
  },
  {
    id: "custom",
    label: "Custom",
    icon: "🛠️",
    placeholder: "Paste your content here...",
    description: "Write your own instruction — Clarity AI follows it exactly",
    proOnly: true,
  },
];

export const TONES = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "friendly", label: "Friendly" },
  { id: "direct", label: "Direct" },
  { id: "creative", label: "Creative" },
];

export const LANGUAGES = [
  { id: "English", label: "English" },
  { id: "Dutch", label: "Nederlands" },
  { id: "Spanish", label: "Español" },
  { id: "French", label: "Français" },
  { id: "German", label: "Deutsch" },
  { id: "Portuguese", label: "Português" },
  { id: "Italian", label: "Italiano" },
  { id: "Polish", label: "Polski" },
  { id: "Arabic", label: "العربية" },
  { id: "Mandarin Chinese", label: "中文" },
];

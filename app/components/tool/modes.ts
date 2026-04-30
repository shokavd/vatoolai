export type Mode = {
  id: string;
  label: string;
  icon: string;
  placeholder: string;
  description: string;
  proOnly?: boolean;
};

export const MODES: Mode[] = [
  // --- Original modes ---
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
    placeholder: "Paste any content, idea, or topic and we'll turn it into platform-ready posts...",
    description: "Generate ready-to-post content for any social media platform",
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

  // --- New modes ---
  {
    id: "linkedin_bio",
    label: "LinkedIn Bio",
    icon: "🔗",
    placeholder: "Paste your current LinkedIn bio or describe your role, experience, and what you want to be known for...",
    description: "A compelling LinkedIn About section that gets you noticed",
  },
  {
    id: "cold_email",
    label: "Cold Email",
    icon: "📬",
    placeholder: "Describe who you're emailing, what you're offering, and what you want them to do...",
    description: "A 3-part cold email sequence that gets replies",
    proOnly: true,
  },
  {
    id: "job_description",
    label: "Job Description",
    icon: "📝",
    placeholder: "Describe the role, responsibilities, required skills, and your company...",
    description: "A clear, attractive job posting that draws the right candidates",
  },
  {
    id: "star_story",
    label: "STAR Story",
    icon: "🌟",
    placeholder: "Describe a situation or achievement you want to turn into an interview answer...",
    description: "Turn any experience into a powerful interview answer using the STAR format",
  },
  {
    id: "press_release",
    label: "Press Release",
    icon: "📰",
    placeholder: "Describe what you're announcing — product launch, partnership, milestone, event...",
    description: "A professional press release ready to send to journalists",
    proOnly: true,
  },
  {
    id: "product_description",
    label: "Product Description",
    icon: "🛍️",
    placeholder: "Describe your product — what it is, who it's for, key features, and benefits...",
    description: "Persuasive product copy that converts browsers into buyers",
  },
  {
    id: "complaint_letter",
    label: "Complaint Letter",
    icon: "📮",
    placeholder: "Describe the situation — what happened, who it involves, and what outcome you want...",
    description: "A firm, professional complaint letter that gets results",
  },
  {
    id: "blog_outline",
    label: "Blog Outline",
    icon: "📖",
    placeholder: "Describe your blog topic, target audience, and the main points you want to cover...",
    description: "A structured blog post outline with headings, subpoints, and intro/outro hooks",
    proOnly: true,
  },
  {
    id: "interview_prep",
    label: "Interview Prep",
    icon: "🎯",
    placeholder: "Paste the job description and your relevant experience. Include any specific areas you're worried about...",
    description: "Likely interview questions + tailored answers based on the role",
    proOnly: true,
  },
  {
    id: "custom",
    label: "Custom",
    icon: "🛠️",
    placeholder: "Paste your content here...",
    description: "Write your own instruction — Tidify AI follows it exactly",
    proOnly: true,
  },
];

export type Platform = {
  id: string;
  label: string;
  icon: string;
  proOnly?: boolean;
  hint: string;
};

export const PLATFORMS: Platform[] = [
  { id: "linkedin", label: "LinkedIn", icon: "💼", hint: "Professional, 150-200 words, ends with a question or CTA" },
  { id: "instagram", label: "Instagram", icon: "📸", hint: "Engaging, 50-80 words + 5 hashtags" },
  { id: "twitter", label: "X / Twitter", icon: "🐦", hint: "Punchy, under 280 characters" },
  { id: "facebook", label: "Facebook", icon: "👥", hint: "Conversational, 40-80 words, encourages comments" },
  { id: "tiktok", label: "TikTok", icon: "🎵", hint: "Hook in first line, casual, 3-5 hashtags" },
  { id: "pinterest", label: "Pinterest", icon: "📌", hint: "Descriptive, keyword-rich, 100-150 words" },
  { id: "youtube", label: "YouTube", icon: "▶️", hint: "Video description, 150-200 words + timestamps placeholder" },
  { id: "threads", label: "Threads", icon: "🧵", hint: "Casual and conversational, 150-300 characters" },
  { id: "newsletter", label: "Newsletter", icon: "📧", hint: "Intro paragraph, warm and personal, 80-120 words" },
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

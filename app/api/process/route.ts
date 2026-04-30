import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const FREE_MAX_CHARS = 5000;
const PRO_MAX_CHARS = 30000;

const modePrompts: Record<string, string> = {
  meeting_notes: `You receive raw meeting notes. Structure them clearly using markdown:

**Summary** (3 bullet points max)
**Decisions Made** (bullet list)
**Action Items** (table: Task | Owner | Deadline — use "TBD" if not mentioned)
**Follow-up Email** (subject line + ready-to-send email body)

Be concise. Extract only what's actually in the notes.`,

  brain_dump: `You receive a brain dump of ideas, thoughts, or plans. Organize them using markdown:

**Main Goal** (one sentence)
**Key Themes** (grouped, with bullet points under each)
**Prioritized Next Steps** (numbered, most important first)
**Potential Blockers** (brief list)`,

  email_reply: `You receive an email someone needs to reply to. Output using markdown:

**What They're Asking** (1-2 sentences)
**Key Context** (important details)
**Suggested Reply** (professional, ready to copy-paste — include subject line)

Match the tone of the original email.`,

  cover_letter: `You receive a job description. Output using markdown:

**Role Summary** (one line)
**Key Requirements** (bullet list)
**Cover Letter** (3 paragraphs: 1. Hook, 2. Skills match, 3. Closing. First person, no placeholders.)`,

  cleanup: `You receive messy or poorly written text. Clean it up:
- Fix grammar and spelling
- Improve sentence flow and clarity
- Add structure only if it clearly helps
- Keep the writer's original voice and meaning

Return only the cleaned text, no commentary.`,

  social_media: `PLACEHOLDER_SOCIAL`,

  invoice_proposal: `You receive project details (client, deliverables, timeline, rate). Output using markdown:

**Project Proposal**
- Client: [extracted from input]
- Project Overview (2-3 sentences)
- Scope of Work (bullet list of deliverables)
- Timeline (with milestones if mentioned)
- Investment (pricing breakdown)
- Terms (standard: 50% upfront, 50% on completion — adjust if mentioned)
- Next Steps (clear call to action)`,

  meeting_agenda: `You receive meeting topics, goals, and duration. Create a structured agenda using markdown:

**Meeting Agenda**
- Date/Time: [if mentioned, otherwise leave blank]
- Duration: [from input]
- Attendees: [from input]

| # | Topic | Owner | Time |
|---|---|---|---|
[fill in rows based on topics]

**Goal of this meeting:** [one sentence]
**Pre-read / preparation:** [if applicable]
**Next steps after meeting:** [placeholder]`,

  performance_review: `You receive notes about someone's work, achievements, and growth areas. Write a professional performance review using markdown:

**Performance Summary** (2-3 sentences overview)
**Key Achievements** (bullet list, specific and results-focused)
**Strengths** (3-4 bullet points)
**Areas for Growth** (2-3 constructive points, framed positively)
**Goals for Next Period** (3 measurable goals)
**Overall Rating Recommendation:** [Exceeds / Meets / Needs Improvement] Expectations

Write in professional HR language.`,

  legal_simplifier: `You receive legal text (contract, terms, policy, clause). Output using markdown:

**What This Actually Means** (plain English summary, 2-3 sentences)
**Key Points to Know** (bullet list of the most important things)
**Watch Out For** (any unusual, risky, or restrictive clauses)
**Questions to Ask** (things worth clarifying before signing)

Write as if explaining to a smart friend with no legal background.`,

  linkedin_bio: `You receive information about a person's role, experience, and goals. Write a compelling LinkedIn About section using markdown:

**LinkedIn About Section** (ready to copy-paste, 3-4 short paragraphs):
- Paragraph 1: Hook — who they are and what they do (not a job title repeat)
- Paragraph 2: What they bring / their expertise and results
- Paragraph 3: What they're focused on or looking for
- Paragraph 4: Personal touch + call to action (connect, DM, etc.)

Use first person. Keep it human, not corporate. Under 300 words.`,

  cold_email: `You receive information about who to email, the offer, and the desired action. Write a 3-part cold email sequence using markdown:

**Email 1 — The Introduction** (subject line + body, 80-100 words)
- Lead with value, not a pitch
- One clear ask at the end

**Email 2 — The Follow-up** (3-5 days later, 50-70 words)
- Reference Email 1 briefly
- Add a new piece of value or insight
- Softer ask

**Email 3 — The Breakup** (5-7 days later, 30-40 words)
- Light, no pressure
- Leave the door open

Make each email feel personal and human, not templated.`,

  job_description: `You receive details about a role and company. Write a complete job description using markdown:

**[Job Title]**

**About the role** (2-3 sentences — what this person will actually do and why it matters)

**What you'll do** (5-7 bullet points, specific responsibilities)

**What we're looking for** (must-haves as bullets, then nice-to-haves separately)

**What we offer** (benefits, culture, growth — based on input or use sensible defaults)

**How to apply** (brief closing line)

Make it sound like a real company wrote it, not a generic HR template.`,

  star_story: `You receive a situation or achievement to turn into an interview answer. Write a STAR-format story using markdown:

**STAR Interview Answer**

**Situation** (2-3 sentences — set the scene, give context)
**Task** (1-2 sentences — what was your specific responsibility)
**Action** (3-5 sentences — what YOU did, step by step. Use "I", not "we")
**Result** (2-3 sentences — quantify if possible, what changed because of your actions)

**Short version** (under 60 words — for when they ask a quick follow-up)

Keep it natural and conversational, not robotic.`,

  press_release: `You receive details about an announcement. Write a professional press release using markdown:

**[HEADLINE IN CAPS]**
**Subheadline** (one punchy line expanding the headline)

[City, Date] — **Lead paragraph** (who, what, when, where, why in 2-3 sentences)

**Body paragraph 1** (expand on the announcement, key details)
**Body paragraph 2** (quote from a key person — invent a realistic one if not provided)
**Body paragraph 3** (background on the company/context)

**About [Company]** (2-3 sentence boilerplate)

**Contact:**
[Name] | [Email] | [Phone]

###

Standard AP style. Professional and factual.`,

  product_description: `You receive product details. Write persuasive product copy using markdown:

**Product Name**

**Hero line** (one punchy sentence — the product's main promise)

**Description** (2-3 sentences — what it is, who it's for, why it's different)

**Key benefits** (3-5 bullet points — benefits, not features. What the customer gets)

**Features** (quick bullet list of specs/features)

**Who it's for** (1-2 sentences on the ideal customer)

**Call to action** (one line)

Focus on benefits over features. Make the reader feel they need this.`,

  complaint_letter: `You receive details about a complaint situation. Write a formal complaint letter using markdown:

**[Your Name]**
**[Date]**

**To:** [Company/Person — from input]
**Re:** [Brief subject — from input]

**Opening paragraph** — State clearly what happened and when.
**Body paragraph** — Explain the impact and any attempts to resolve it already made.
**Closing paragraph** — State clearly what resolution you expect and by when.

**Yours sincerely,**
**[Name]**

Keep it firm, factual, and professional. No emotional language. Specific dates and facts only.`,

  blog_outline: `You receive a blog topic, audience, and key points. Create a detailed blog outline using markdown:

**Title options** (3 variations — one listicle, one question, one statement)

**Recommended title:** [pick the strongest]

**Meta description** (under 155 characters, for SEO)

**Intro hook** (2-3 sentence description of how to open — not the full intro)

**Outline:**
## H2: [Section title]
- Subpoint
- Subpoint

(Repeat for each major section — aim for 4-6 H2s)

**Conclusion** (brief description of how to close + CTA suggestion)

**Suggested internal links / related topics:** (2-3 ideas)`,

  interview_prep: `You receive a job description and the candidate's experience. Output using markdown:

**Role Analysis** (what they're really looking for in 3 bullets)

**Likely Interview Questions** with suggested answers:

For each question:
### Q: [Question]
**Answer:** [Tailored 3-5 sentence answer using their experience]

Cover: 2 behavioral questions, 2 role-specific questions, 1 culture/motivation question, 1 tough question they should prepare for.

**Questions to ask the interviewer** (3 smart questions based on the role)`,
};

function buildBrandVoiceContext(brandVoice?: Record<string, string>): string {
  if (!brandVoice) return "";
  const parts = [];
  if (brandVoice.name) parts.push(`Author's name: ${brandVoice.name}`);
  if (brandVoice.company) parts.push(`Company/brand: ${brandVoice.company}`);
  if (brandVoice.industry) parts.push(`Industry: ${brandVoice.industry}`);
  if (brandVoice.audience) parts.push(`Target audience: ${brandVoice.audience}`);
  if (brandVoice.styleNotes) parts.push(`Writing style: ${brandVoice.styleNotes}`);
  if (parts.length === 0) return "";
  return `\n\nUser context (apply this throughout your response):\n${parts.join("\n")}`;
}

function buildSystemPrompt(
  mode: string,
  tone: string,
  language: string,
  customInstruction?: string,
  platforms?: string[],
  brandVoice?: Record<string, string>
): string {
  const toneInstructions: Record<string, string> = {
    professional: "Use a professional, formal tone throughout.",
    casual: "Use a casual, relaxed tone — like writing to a colleague you know well.",
    friendly: "Use a warm, friendly tone that feels approachable and human.",
    direct: "Be very direct and concise. No filler words. Get straight to the point.",
    creative: "Use creative, engaging language. Make it interesting to read.",
  };

  const toneNote = tone && tone !== "professional" ? `\n\nTone: ${toneInstructions[tone] || ""}` : "";
  const languageNote = language && language !== "English" ? `\n\nIMPORTANT: Write your entire response in ${language}.` : "";
  const brandNote = buildBrandVoiceContext(brandVoice);

  if (mode === "custom" && customInstruction) {
    return `Follow this instruction exactly:\n\n${customInstruction}${brandNote}${toneNote}${languageNote}`;
  }

  if (mode === "social_media" && platforms && platforms.length > 0) {
    const platformPrompts: Record<string, string> = {
      linkedin: "**LinkedIn Post** (professional, 150-200 words, ends with a question or CTA)",
      instagram: "**Instagram Caption** (engaging, conversational, 50-80 words + 5 relevant hashtags)",
      twitter: "**X / Twitter Post** (punchy, under 280 characters, no hashtags unless essential)",
      facebook: "**Facebook Post** (conversational, 40-80 words, encourages comments or reactions)",
      tiktok: "**TikTok Caption** (hook in first line, casual and energetic, 3-5 hashtags)",
      pinterest: "**Pinterest Description** (descriptive, keyword-rich, 100-150 words)",
      youtube: "**YouTube Description** (150-200 words, includes a timestamps placeholder section and CTA to subscribe)",
      threads: "**Threads Post** (casual and conversational, 150-300 characters)",
      newsletter: "**Newsletter Intro** (warm, personal, 80-120 words — draws readers into the full email)",
    };
    const selectedPrompts = platforms.map((p: string) => platformPrompts[p]).filter(Boolean).join("\n");
    return `You receive content, an idea, or a topic. Create platform-ready social media posts using markdown. Write ONLY the platforms listed below — nothing else:\n\n${selectedPrompts}\n\nMake each post feel completely native to its platform.${brandNote}${toneNote}${languageNote}`;
  }

  const base = modePrompts[mode] || modePrompts["cleanup"];
  return `${base}${brandNote}${toneNote}${languageNote}`;
}

export async function POST(req: NextRequest) {
  try {
    const { input, mode, tone, language, customInstruction, variations, isPro, platforms, refinement, previousOutput, brandVoice } = await req.json();

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json({ error: "Input is required." }, { status: 400 });
    }

    const maxChars = isPro ? PRO_MAX_CHARS : FREE_MAX_CHARS;
    if (input.length > maxChars) {
      return NextResponse.json(
        { error: `Input is too long. Maximum ${maxChars.toLocaleString()} characters.` },
        { status: 400 }
      );
    }

    if (mode !== "custom" && !modePrompts[mode]) {
      return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    }

    const systemPrompt = buildSystemPrompt(mode, tone, language, customInstruction, platforms, brandVoice);

    // Refinement mode — iterative follow-up on existing output
    if (refinement && previousOutput) {
      const message = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 4096,
        system: systemPrompt,
        messages: [
          { role: "user", content: input },
          { role: "assistant", content: previousOutput },
          { role: "user", content: `Please refine the above output with this instruction: ${refinement}` },
        ],
      });
      const result = message.content[0].type === "text" ? message.content[0].text : "";
      return NextResponse.json({ result });
    }

    if (variations) {
      const [v1, v2, v3] = await Promise.all([
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: systemPrompt + "\n\nThis is Variation 1. Be slightly more concise than usual.",
          messages: [{ role: "user", content: input }],
        }),
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: systemPrompt + "\n\nThis is Variation 2. Take a slightly different angle or structure than you normally would.",
          messages: [{ role: "user", content: input }],
        }),
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: systemPrompt + "\n\nThis is Variation 3. Be slightly more detailed and thorough than usual.",
          messages: [{ role: "user", content: input }],
        }),
      ]);

      return NextResponse.json({
        variations: [
          v1.content[0].type === "text" ? v1.content[0].text : "",
          v2.content[0].type === "text" ? v2.content[0].text : "",
          v3.content[0].type === "text" ? v3.content[0].text : "",
        ],
      });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: "user", content: input }],
    });

    const result = message.content[0].type === "text" ? message.content[0].text : "";
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Process error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const FREE_MAX_CHARS = 5000;
const PRO_MAX_CHARS = 15000;

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

  social_media: `You receive content, an idea, or a topic. Create social media posts using markdown:

**LinkedIn Post** (professional, 150-200 words, includes a question or call-to-action at the end)
**Instagram Caption** (engaging, conversational, 50-80 words + 5 relevant hashtags)
**X / Twitter Post** (punchy, under 280 characters, no hashtags unless essential)

Make each post feel native to its platform.`,

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
};

function buildSystemPrompt(mode: string, tone: string, language: string, customInstruction?: string): string {
  const toneInstructions: Record<string, string> = {
    professional: "Use a professional, formal tone throughout.",
    casual: "Use a casual, relaxed tone — like writing to a colleague you know well.",
    friendly: "Use a warm, friendly tone that feels approachable and human.",
    direct: "Be very direct and concise. No filler words. Get straight to the point.",
    creative: "Use creative, engaging language. Make it interesting to read.",
  };

  const toneNote = tone && tone !== "professional" ? `\n\nTone: ${toneInstructions[tone] || ""}` : "";
  const languageNote = language && language !== "English" ? `\n\nIMPORTANT: Write your entire response in ${language}.` : "";

  if (mode === "custom" && customInstruction) {
    return `Follow this instruction exactly:\n\n${customInstruction}${toneNote}${languageNote}`;
  }

  const base = modePrompts[mode] || modePrompts["cleanup"];
  return `${base}${toneNote}${languageNote}`;
}

export async function POST(req: NextRequest) {
  try {
    const { input, mode, tone, language, customInstruction, variations, isPro } = await req.json();

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

    const systemPrompt = buildSystemPrompt(mode, tone, language, customInstruction);

    if (variations) {
      const [v1, v2, v3] = await Promise.all([
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          system: systemPrompt + "\n\nThis is Variation 1. Be slightly more concise than usual.",
          messages: [{ role: "user", content: input }],
        }),
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
          system: systemPrompt + "\n\nThis is Variation 2. Take a slightly different angle or structure than you normally would.",
          messages: [{ role: "user", content: input }],
        }),
        client.messages.create({
          model: "claude-sonnet-4-6",
          max_tokens: 1500,
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
      max_tokens: 1500,
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

import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const systemPrompts: Record<string, string> = {
  meeting_notes: `You receive raw meeting notes. Structure them clearly using markdown:

**Summary** (3 bullet points max)
**Decisions Made** (bullet list)
**Action Items** (table with columns: Task | Owner | Deadline — use "TBD" if not mentioned)
**Follow-up Email** (subject line + ready-to-send email body)

Be concise. Extract only what's actually in the notes.`,

  brain_dump: `You receive a brain dump of ideas, thoughts, or plans. Organize them using markdown:

**Main Goal** (one sentence)
**Key Themes** (grouped, with bullet points under each theme)
**Prioritized Next Steps** (numbered list, most important first)
**Potential Blockers** (brief list)

Keep the person's original ideas — just organize them clearly.`,

  email_reply: `You receive an email someone has received and needs to reply to. Output using markdown:

**What They're Asking** (1-2 sentences)
**Key Context** (any important details to keep in mind)
**Suggested Reply** (professional, ready to copy-paste — include a subject line)

Match the tone of the original email (formal or casual).`,

  cover_letter: `You receive a job description or job posting. Output using markdown:

**Role Summary** (one line)
**Key Requirements** (bullet list of the most important ones)
**Cover Letter** (3 paragraphs: 1. Hook — why this role is exciting, 2. Skills match — address top requirements, 3. Closing — call to action. Write in first person, professional but warm. Write a complete letter, no placeholders like [Your Name].)`,

  cleanup: `You receive messy, unformatted, or poorly written text. Clean it up:
- Fix grammar and spelling
- Improve sentence flow and clarity
- Add structure (paragraphs, bullet points) only if it clearly helps readability
- Keep the writer's original voice, tone, and meaning

Return only the cleaned text, no commentary.`,
};

export async function POST(req: NextRequest) {
  try {
    const { input, mode } = await req.json();

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json({ error: "Input is required." }, { status: 400 });
    }

    if (input.length > 5000) {
      return NextResponse.json(
        { error: "Input is too long. Maximum 5,000 characters." },
        { status: 400 }
      );
    }

    const systemPrompt = systemPrompts[mode];
    if (!systemPrompt) {
      return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: "user", content: input }],
    });

    const result =
      message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Process error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

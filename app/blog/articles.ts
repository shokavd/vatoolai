export type Article = {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
};

export const ARTICLES: Article[] = [
  {
    slug: "how-to-turn-meeting-notes-into-action",
    title: "How to Turn Messy Meeting Notes Into Actionable Summaries",
    date: "April 22, 2026",
    readTime: "4 min read",
    excerpt:
      "Most meeting notes are a graveyard of half-sentences and unclear next steps. Here's how to transform them into something your team will actually act on.",
    content: `
## The problem with meeting notes

You leave a meeting, open your notes, and see a wall of bullet points that made perfect sense in the room but are now cryptic. "Talk to marketing" — about what? "Fix the thing" — which thing?

The average knowledge worker spends around 31 hours per month in meetings. If the output of those meetings doesn't translate into clear action, that time is largely wasted.

## What a good meeting summary looks like

A useful summary has four parts:

1. **A brief context line** — What was this meeting about, in one sentence?
2. **Key decisions made** — Not discussion points. Actual decisions that were reached.
3. **Action items** — Who does what, by when. No owner = no accountability.
4. **Follow-up email** — Ready to copy-paste and send to all attendees.

## Using AI to do the heavy lifting

This is where Tidify AI's Meeting Notes mode shines. You paste your raw notes — even if they're chaotic, filled with typos, or stream-of-consciousness — and the AI structures them into the four components above.

The key insight: you don't need perfect input. The messier your notes, the more value the AI adds. Its job is to extract signal from noise.

**Tips for better output:**

- Include names when you know them ("Tom said he'd handle the API docs")
- Add any dates or deadlines mentioned, even informally ("by end of week")
- Include the meeting topic at the top of your paste — it gives the AI context

## A before/after example

**Before (raw notes):**
> kickoff call - sarah + dev team - product launch timeline - need landing page by may - tom owns design - backend api still wfh - maybe delay? sarah says no - marketing needs 2 weeks lead - budget tbd - followup next tuesday

**After (Tidify AI output):**

**Summary:** Product launch kickoff — team aligned on May deadline, outstanding questions on backend API readiness and budget.

**Decisions:** Launch date stands at May despite backend uncertainty. Marketing needs 2 weeks lead time before launch.

**Action items:**
| Task | Owner | Deadline |
|---|---|---|
| Landing page design | Tom | TBD (before marketing lead time) |
| Clarify backend API status | Dev team | ASAP |
| Confirm budget | TBD | Before next Tuesday |

**Next meeting:** Tuesday

---

The difference in clarity is significant — and it took about 10 seconds.

## Making it a habit

The best time to use Meeting Notes mode is immediately after a meeting, while context is still fresh. Paste your notes, review the output (AI can miss nuance), and send the follow-up email within the hour. Your team will notice.
    `.trim(),
  },
  {
    slug: "brain-dump-to-plan",
    title: "The Brain Dump Method: From Mental Chaos to a Real Plan",
    date: "April 15, 2026",
    readTime: "5 min read",
    excerpt:
      "A brain dump is one of the most underrated productivity techniques. The problem: most people don't know what to do with it after. Here's the process.",
    content: `
## Why brain dumps work

When you have too many things competing for space in your head, nothing gets done well. The cognitive load of keeping track of ideas, worries, tasks, and half-baked plans uses mental energy that should go toward actual work.

A brain dump is simple: you get everything out of your head and onto paper (or screen). No filtering, no organising, no judgement. Just dump.

The result looks like chaos. That's fine — that's the point. The chaos was always there; you just made it visible.

## The problem: what do you do with it?

Most productivity advice stops here. "Do a brain dump!" Great. Now you have a page of unconnected thoughts. Now what?

This is where most people give up, because organising a brain dump manually is mentally exhausting. You have to read each item, decide what category it belongs to, figure out priority, identify what's actually actionable vs. what's just anxiety…

It's a lot. So people don't. The brain dump sits in a note, never looked at again.

## Let AI do the sorting

Tidify AI's Brain Dump mode is built exactly for this. You paste your raw, unfiltered brain dump and it extracts:

- **Main Goal** — What is this really about? What's the underlying thing you're trying to achieve?
- **Key Themes** — Groups of related ideas or concerns
- **Prioritised Next Steps** — Numbered, actionable, in order
- **Potential Blockers** — Things that could get in the way that you should think about now

## How to do a good brain dump

Set a timer for 10 minutes. Write without stopping. Include:

- Tasks you need to do
- Things you're worried about
- Ideas you don't want to forget
- Decisions you're avoiding
- Questions you need answers to
- Stuff that's been nagging at you

Don't organise as you go. Don't re-read. Don't delete. Just write.

When the timer goes off, stop. Paste it all into Tidify AI.

## After the AI processes it

Review the output. The AI is very good at identifying the core goal and grouping themes, but occasionally miscategorises something or misses a nuance. Take 2 minutes to adjust.

Then: pick the top next step from the list and do it. Not the whole list. Just the first one.

The goal of a brain dump isn't to solve everything at once. It's to convert anxiety into a plan you can act on, one step at a time.

## A practical tip

Do a brain dump at the start of each workday, before you open email or Slack. It takes 10 minutes to dump and 30 seconds to process with AI. You start the day with clarity instead of reacting to everything that hits you.

It sounds small. The difference in focus is significant.
    `.trim(),
  },
  {
    slug: "writing-better-cover-letters-with-ai",
    title: "How to Write a Cover Letter That Doesn't Sound Like Everyone Else's",
    date: "April 8, 2026",
    readTime: "6 min read",
    excerpt:
      "Most cover letters are ignored because they're generic. Here's how to use AI to write one that actually reflects the job — and you.",
    content: `
## Why most cover letters fail

Recruiters spend an average of 7 seconds on a CV. Cover letters get even less attention — unless they say something interesting in the first sentence.

Most cover letters look like this:

> "I am writing to express my interest in the [role] position at [company]. I believe my experience in [vague field] makes me an ideal candidate…"

This tells the reader nothing. It could have been written by anyone, for any job, at any company. The recruiter has read it a hundred times this week alone.

The reason this happens isn't that candidates are bad writers. It's that they don't know where to start, so they fall back on templates. Templates are safe. Templates are also ignored.

## What actually works

A good cover letter does three things:

1. **Opens with a specific hook** — a concrete reason you want this role at this company (not "I've always been passionate about…")
2. **Connects your experience to their requirements** — not a list of your achievements, but a translation: here's what you've done, here's why it matters for what they need
3. **Closes with confidence** — a clear, direct statement of intent, not hedging

## Using AI as a starting point

Tidify AI's Cover Letter mode works differently from most AI writing tools. Instead of generating a generic letter, it:

1. Reads the job description you paste
2. Extracts the key requirements and what the company is actually looking for
3. Writes a three-paragraph letter structured around hook, skills match, and closing

The output is a strong draft. Your job is to personalise it.

## How to personalise the AI output

The AI draft will be solid structurally but it won't know your personal stories. After you get the draft:

**Replace the generic hook** with something specific. Do you know someone at the company? Have you used their product and have a specific opinion on it? Did a particular project you worked on directly connect to what they're building?

**Add one specific anecdote** in the second paragraph. "Led a team" is generic. "Led a 4-person team through a rebrand in 6 weeks with a 30% budget cut, delivered on time" is specific and memorable.

**Keep the closing** — the AI tends to write clean closings. Don't overthink it.

## The format

Keep it to three short paragraphs. No longer than half a page. Bullet points are fine if the job description is very requirements-heavy.

Subject line (if emailing): "[Role] application — [Your Name]". Clean, no creativity needed here.

## One more thing

Read the job description twice before pasting it into Tidify AI. The AI will miss nuance you'd catch — for example, if the company mentions a specific tool or methodology they use, make sure the cover letter addresses it explicitly.

The best use of AI in job applications isn't to automate the process — it's to get past the blank page faster so you can focus on the parts that actually require you.
    `.trim(),
  },
  {
    slug: "ai-writing-tips-for-better-emails",
    title: "5 Ways AI Makes You a Better Email Writer (Not Just a Faster One)",
    date: "April 1, 2026",
    readTime: "4 min read",
    excerpt:
      "Speed is the obvious benefit of AI-assisted writing. But there are subtler improvements — in tone, clarity, and structure — that matter more in professional contexts.",
    content: `
## The speed trap

Most people use AI for email to go faster. They paste a draft, ask AI to improve it, get back something longer and more formal, and send it.

This works, but it misses the more interesting benefits. Here are five ways AI can actually make your emails better — not just faster.

## 1. Force you to clarify what you're asking for

Before you can paste an email into AI for improvement, you have to have some idea of what you want. This forces a moment of intentionality that many emails skip.

When you use Tidify AI's Email Reply mode, you paste the email you received and the AI extracts: what they're actually asking, the key context, and a suggested reply. Reading that extraction often shows you that the email was more complex than you realised — or simpler.

## 2. Catch tone mismatches

When you're frustrated, tired, or rushed, your emails can read as curt or passive-aggressive even when you don't intend them to. AI is useful for tone-checking: paste your draft and ask for a "professional" or "friendly" version. The difference often reveals something about your original tone you didn't notice.

The tone selector in Tidify AI (Professional, Casual, Friendly, Direct, Creative) is particularly useful for this. Pick a tone that matches the relationship and the stakes.

## 3. Reduce the cognitive load of complex replies

Some emails require you to address multiple points, disagree diplomatically, and still move things forward. These are genuinely difficult to write. AI is good at holding multiple constraints simultaneously — address the complaint, maintain the relationship, propose a next step — and structuring them into a coherent email.

This is different from asking AI to "improve" a draft. It's using AI to think through a complex reply with you.

## 4. Strip out unnecessary hedging

Professional emails often accumulate hedges: "I was just wondering if maybe…", "It might be worth considering…", "Sorry to bother you but…". These soften the message in ways that undermine your authority.

When AI rewrites for a "Direct" tone, it strips these out. You can then add back the ones that are genuinely useful for the relationship and remove the ones that were just nervous filler.

## 5. Translate between registers

If you're writing to someone in a different industry, country, or communication style, AI can help you calibrate. Legal language can be simplified. An overly casual email to a senior stakeholder can be professionalised. A very formal reply to a client can be made warmer.

## A note on authenticity

AI-written emails can feel sterile if you send them unchanged. The best practice: use AI to get a solid structure and tone, then read it aloud to yourself. Anything that doesn't sound like you, rewrite it in your words.

The goal is emails that are clear, appropriately toned, and sound like a better version of you — not a robot imitating a professional.
    `.trim(),
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

// Home, Helios section (docs/decisions/helios.md). A headline, then a Helios conversation; the four use
// cases are the controls that switch it. Every number is an illustration built from the same made-up
// account as "Follow one lead" (src/content/prospect-demo.ts: five creatives, Constance, Marcus Reyes),
// so the story agrees across the page. Not client data.
export const helios = {
  headline: "AI that answers any question about your business",
  uses: [
    {
      lead: "Weekly reports",
      rest: "sent to Slack every Monday.",
      question: "Send me last week's numbers.",
      answer: "Here's last week across all five ads. Calls held steady and cash came from fewer, better closes.",
      kind: "report",
      sources: "Meta Ads · Dialer · Stripe",
    },
    {
      lead: "New ad scripts",
      rest: "written from your sales calls.",
      question: "Write a new hook from this week's sales calls.",
      answer: "Twelve prospects said some version of the same thing on their calls. Here's a hook in their words:",
      kind: "script",
      sources: "Fathom · 31 calls",
    },
    {
      lead: "Ad audits",
      rest: "that show what to scale and what to cut.",
      question: "Which ad should I scale, and which should I cut?",
      answer: "Scale Spring VSL · Hook 3. Its calls cost more, but they close and pay. Offer · Hook 5 books cheap calls that don't.",
      kind: "audit",
      sources: "Meta Ads · Dialer · Stripe",
    },
    {
      lead: "Rep coaching",
      rest: "built from each rep’s own calls.",
      question: "How can Marcus close more?",
      answer: "Marcus handles partner objections well, but he parks contract questions until after the pitch. Ask about terms earlier.",
      kind: "coaching",
      sources: "Fathom · Marcus Reyes, 18 calls",
    },
  ],
  // Not shown for now (removed 18 Nov); kept for later.
  trust: "Nothing changes until a person approves it.",
} as const;

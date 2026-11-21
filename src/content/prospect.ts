// Home, "Follow one prospect" section (docs/decisions/prospect.md). Cut down from
// gofunnel-website-copy.md (Home, Section 3) to one headline and one or two lines per step; the visuals
// carry the detail.
// Everything inside the visuals (the prospect, ads, amounts) is an illustration, not a client claim.
// The one real number is the 9.3 Event Match Quality score.
export const prospect = {
  headline: "Follow one lead from ad to cash",
  body: "Most tools stop tracking at the form. GoFunnel follows the same person through the sales call and every payment after it.",
  // Secondary button under the section intro (restored 18 Nov). The /attribution page doesn't exist yet.
  cta: { label: "See Fingerprinting Attribution", href: "/attribution" },
  steps: [
    {
      title: "Every visit lands on one person",
      text: "Every click, on every device, joins one record.",
    },
    {
      title: "Down to the exact creative",
      text: "The exact ad they saw, ranked by the cash it made.",
    },
    {
      title: "Every signal in between",
      text: "Page time, video views and replies, all on one timeline.",
    },
    {
      title: "What was said on the call",
      text: "AI flags objections and buying signals on every call.",
    },
    {
      title: "The money, back to the creative",
      text: "Every payment is credited to the ad that started it.",
    },
    {
      title: "Meta learns who your buyers are",
      text: "Meta gets your real buyers, so it finds more of them.",
    },
    {
      title: "See what is actually working",
      text: "Cheap calls or closed deals? Now you can tell.",
    },
  ],
};

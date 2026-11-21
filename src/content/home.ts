// Home page copy. Source: gofunnel-website-copy.md (Home), shortened with emil-unslop-writing.
// Button labels are fixed by the copy doc's button label set.

// Hero (docs/decisions/hero.md): the headline, in two lines, one line saying what GoFunnel does, Book a Call.
// The user, 22 Nov: the headline carries "we walk the whole path with you"; the line says what the product is.
export const hero = {
  headline: ["We walk the whole path", "with you."],
  line: "GoFunnel tracks every lead from the ad they saw to the money they paid, and calls them before anyone else does.",
  primary: { label: "Book a Call", href: "/book-a-call" },
  journeyLead: "One record per person,",
  journeyRest: "from the creative they saw to what they have paid you since.",
};

export const journey = [
  { step: "Creative", note: "Hook, body and CTA" },
  { step: "Ad", note: "Campaign down to the creative" },
  { step: "Visit", note: "Tracked on your own domain" },
  { step: "Lead", note: "One person, every device" },
  { step: "Call", note: "Objections and buying signals" },
  { step: "Sale", note: "Matched back to the ad" },
  { step: "Lifetime value", note: "Every payment after" },
];

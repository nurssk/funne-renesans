// Demo data for the Follow one lead interfaces (docs/decisions/prospect.md): one made-up lead, followed from
// the first ad to a year of payments. Not a real client. Deliberately hard content: long names, long ad names.
export const lead = {
  name: "Constance Waverly-Ashford",
  email: "constance@waverlyashford-coaching.co",
  initials: "CW",
  identifiedAgo: "6 days ago",
};

export type Visit = {
  id: string;
  device: "iPhone" | "MacBook Air" | "iPad";
  source: string;
  detail: string;
  channel: "Paid" | "Organic" | "AI assistant";
  when: string;
  date: string;
  place: string;
  icon: "megaphone" | "instagram" | "sparkles" | "play" | "search";
};

export const visits: Visit[] = [
  { id: "a81f", device: "iPhone", source: "Meta Ads", detail: "Spring VSL · Hook 3 · “Your calendar is full of tire-kickers”", channel: "Paid", when: "21d ago", date: "Oct 28, 2026", place: "Austin, TX", icon: "megaphone" },
  { id: "a81f", device: "iPhone", source: "Instagram story", detail: "Smart Link /story-0412", channel: "Organic", when: "14d ago", date: "Nov 4, 2026", place: "Austin, TX", icon: "instagram" },
  { id: "3c02", device: "MacBook Air", source: "ChatGPT", detail: "Answer linked to /pricing", channel: "AI assistant", when: "9d ago", date: "Nov 9, 2026", place: "Austin, TX", icon: "sparkles" },
  { id: "77e9", device: "iPad", source: "YouTube", detail: "How we fixed our show rate", channel: "Organic", when: "7d ago", date: "Nov 11, 2026", place: "Round Rock, TX", icon: "play" },
  { id: "3c02", device: "MacBook Air", source: "Google search", detail: "“gofunnel reviews”", channel: "Organic", when: "6d ago", date: "Nov 12, 2026", place: "Austin, TX", icon: "search" },
];

export const optIn = { source: "Form submitted", detail: "Apply now · email and phone given", when: "6d ago", date: "Nov 12, 2026" };

// Step 02: made-up creatives in one ad account. The one Constance saw is first by cash but not by calls.
export type Creative = {
  id: string;
  name: string;
  hook: string;
  hookType: string;
  framework: string;
  cta: string;
  style: string;
  spend: number;
  calls: number;
  closes: number;
  cash: number;
  hers?: boolean;
  still?: string; // a frame from the creative (placeholder footage, see docs/decisions/prospect.md)
  video?: string; // only the creative that plays
};

export const creatives: Creative[] = [
  { id: "c1", name: "Spring VSL · Hook 3", hook: "Your calendar is full of people who will never buy.", hookType: "Pain", framework: "PAS", cta: "“Book a call”", style: "Talking head", spend: 4210, calls: 31, closes: 6, cash: 38400, hers: true, still: "/creatives/spring-vsl.jpg", video: "/creatives/spring-vsl.mp4" },
  { id: "c2", name: "Case study · Hook 2", hook: "From 4 to 19 closes a month in one quarter.", hookType: "Proof", framework: "Before / after", cta: "“See how”", style: "Screen recording", spend: 3120, calls: 18, closes: 5, cash: 31250, still: "/creatives/case-study.jpg" },
  { id: "c3", name: "Founder story · Hook 1", hook: "I almost quit in year two. This is what changed.", hookType: "Story", framework: "Hero’s journey", cta: "“Book a call”", style: "Talking head", spend: 5880, calls: 44, closes: 4, cash: 26900, still: "/creatives/founder-story.jpg" },
  { id: "c4", name: "Offer · Hook 5", hook: "Free funnel audit, this week only.", hookType: "Offer", framework: "AIDA", cta: "“Claim yours”", style: "UGC", spend: 6430, calls: 52, closes: 2, cash: 9800 },
  { id: "c5", name: "UGC · Hook 4", hook: "What nobody tells you about Meta ads.", hookType: "Bold claim", framework: "PAS", cta: "“Book a call”", style: "UGC", spend: 2090, calls: 12, closes: 1, cash: 4700 },
];

export const money = (n: number) => "$" + n.toLocaleString("en-US");

// One timeline for steps 03 to 07: opt-in Thu Nov 12, call booked for Mon Nov 16, no-show, rebooked by the
// Automated dialer, showed Tue Nov 17 (38 min with the closer) and paid on the call. All made up.
export const closer = { name: "Marcus Reyes", initials: "MR" };

// Step 03: every signal between the opt-in and the call, oldest first.
export type SignalKind = "page" | "video" | "booking" | "text" | "webinar" | "noshow" | "dialer" | "call";
export type Signal = {
  kind: SignalKind;
  day: string;
  time: string;
  title: string;
  detail: string;
  tag?: { tone: "accent" | "negative" | "positive"; label: string };
};

export const signals: Signal[] = [
  { kind: "page", day: "Nov 12", time: "2:16 PM", title: "Read the Apply page", detail: "4m 12s on page · scrolled 92%" },
  { kind: "video", day: "Nov 12", time: "2:21 PM", title: "Watched the VSL", detail: "18:40 of 24:00 · 78% watched" },
  { kind: "booking", day: "Nov 12", time: "2:25 PM", title: "Booked a call", detail: "Mon Nov 16, 11:00 AM with Marcus", tag: { tone: "accent", label: "Booked" } },
  { kind: "text", day: "Nov 12", time: "2:31 PM", title: "Replied to the confirmation", detail: "“Yes, see you Monday”" },
  { kind: "webinar", day: "Nov 13", time: "7:00 PM", title: "Attended the webinar", detail: "52 of 60 min, live" },
  { kind: "noshow", day: "Nov 16", time: "11:10 AM", title: "Missed the call", detail: "Marked no-show after 10 min", tag: { tone: "negative", label: "No-show" } },
  { kind: "dialer", day: "Nov 16", time: "11:20 AM", title: "Called back by the dialer", detail: "Connected in 10 min · rebooked", tag: { tone: "accent", label: "Rebooked" } },
  { kind: "call", day: "Nov 17", time: "2:00 PM", title: "Joined the sales call", detail: "38 min with Marcus Reyes", tag: { tone: "positive", label: "Showed" } },
];

// Step 04: what call intelligence read from that call.
export const call = {
  title: "Strategy call",
  date: "Nov 17, 2026",
  minutes: 38,
  recorder: "Fathom",
  dealProbability: 78,
  qualified: "3 of 4",
  repScore: "8.4",
};

export type MomentKind = "pain" | "aspiration" | "objection" | "signal";
export type Moment = {
  at: string;
  kind: MomentKind;
  quote: string; // the prospect, in her own words
  reply?: string; // the closer's answer, for objections
  outcome?: "handled" | "missed";
};

export const moments: Moment[] = [
  { at: "4:48", kind: "pain", quote: "We spend about $40k a month on Meta and I can’t tell which ads close." },
  { at: "13:02", kind: "aspiration", quote: "I want to put $100k a month into ads and know it comes back." },
  { at: "26:05", kind: "objection", quote: "I’d need to talk to my business partner first.", reply: "Fair. What would he need to see to say yes?", outcome: "handled" },
  { at: "29:40", kind: "objection", quote: "Is it month to month? We got burned on an annual contract.", reply: "Let’s come back to that after the walkthrough.", outcome: "missed" },
  { at: "34:18", kind: "signal", quote: "Can we start before the end of the month?" },
];

// Step 05: her payments over the first year. Failed attempts never arrived, so they don't count.
export type PaymentStatus = "Paid" | "Refunded" | "Failed";
export type Payment = {
  date: string;
  item: string;
  brief: string; // phones
  processor: "Stripe" | "Mercury" | "PayPal";
  amount: number;
  status: PaymentStatus;
};

export const payments: Payment[] = [
  { date: "Nov 17, 2026", item: "Core program", brief: "Core program", processor: "Stripe", amount: 4800, status: "Paid" },
  { date: "Nov 29, 2026", item: "Order bump · Templates", brief: "Templates bump", processor: "Stripe", amount: 400, status: "Paid" },
  { date: "Jan 20, 2027", item: "Inner Circle ascension", brief: "Inner Circle", processor: "Mercury", amount: 9600, status: "Paid" },
  { date: "May 25, 2027", item: "Annual renewal", brief: "Renewal", processor: "Stripe", amount: 1200, status: "Failed" },
  { date: "May 26, 2027", item: "Annual renewal", brief: "Renewal", processor: "PayPal", amount: 1200, status: "Paid" },
  { date: "Jun 6, 2027", item: "Refund · Templates", brief: "Refund", processor: "Stripe", amount: -400, status: "Refunded" },
];

export const lifetime = payments.filter((p) => p.status !== "Failed").reduce((s, p) => s + p.amount, 0); // 15,600

// Step 06: the Purchase event sent to Meta, and where in the journey each piece of match data came from.
// 9.3 is GoFunnel's approved Event Match Quality figure; everything else is illustration.
export const emq = "9.3";
export const purchaseSent = { at: "Nov 17, 3:12 PM", route: "Payment received" };

export type MatchKey = { key: string; from: string };
export const matchKeys: MatchKey[] = [
  { key: "Email", from: "Form, Nov 12" },
  { key: "Phone", from: "Form, Nov 12" },
  { key: "First and last name", from: "Form, Nov 12" },
  { key: "City, state and ZIP", from: "Visits, Austin, TX 78704" },
  { key: "IP address and browser", from: "6 visits on 3 devices" },
  { key: "Meta click ID", from: "Spring VSL · Hook 3, Oct 28" },
  { key: "External ID", from: "GoFunnel lead record" },
];

export const usd = (n: number) => (n < 0 ? "−$" : "$") + Math.abs(n).toLocaleString("en-US");

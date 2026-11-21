// Home, Dialing Infrastructure section (docs/decisions/dialing.md). Cut down from gofunnel-website-copy.md
// (Home, Section 4) to one headline and five short grid cells, plus the two approved proof points.
export const dialing = {
  headline: "A dialer that calls every new lead in seconds",
  // Not shown for now (removed 18 Nov); approved proof points, kept for later.
  stats: [
    { value: "34s", label: "average speed to lead across 83 active calling clients" },
    { value: "23–27%", label: "connection rate across the platform" },
  ],
  // Grid cells: a dark lead phrase that runs on in grey. `art` is the crop of the demo painting.
  cells: [
    { lead: "Instant dialing", rest: "for every new lead, the moment it lands.", art: "20% 30%" },
    { lead: "Follow-ups", rest: "that queue themselves on your schedule.", art: "80% 60%" },
    { lead: "Waterfall dialing", rest: "that keeps every rep on a live call.", art: "10% 80%" },
    { lead: "Local numbers", rest: "on our own carrier network, so people pick up.", art: "55% 20%" },
    { lead: "Live transfers", rest: "routed by your rules and logged in your CRM.", art: "90% 40%" },
  ],
};

# Home hero, decided from /proto/hero (17 Nov 2026)

## Direction: Centered, on conversion.ai's design system

- Centered serif headline, one CTA pair, a hairline, then a wide pastel field with one white card carrying the 7-step journey (Creative to Lifetime value).
- No product UI in the hero.
- No eyebrow chips above the headline (the three product names were removed).
- Pastel field: Claude Monet, *Waterloo Bridge, Sunlight Effect* (1903, public domain, Art Institute of Chicago), blurred 28px with saturate 1.15.
- Update: the pastel field and journey card were removed from the hero for now at the user's request. The hero is headline, description and Book a Call only. The journey data stays in `src/content/home.ts` and the painting in `public/art/` for later.

## System (taken from conversion.ai, in GoFunnel teal)

- Canvas `#faf9f7`, flat (update, 18 Nov: the fade to `#fdfcfb` at the bottom was removed so the hero matches every other section); ink `#1a1a19`; muted `#6b6a66`; hairlines `#e3e2de`.
- Hairline frame (1280px max) around content; rules between blocks.
- Header: full-width bar with a hairline underneath, logo left, links centered, Log in + Book a Call on the right. A floating pill header was tried and reverted by the user.
- Primary button: glossy teal pill (gradient on `#357884`, inset white glow), 14px, +0.025em tracking, two sizes after conversion.ai (update, 18 Nov; was 36px everywhere): `.btn` 34px tall with 16px sides in the nav, `.btn-lg` 42px tall with 20px sides for page CTAs (hero, dialer header, footer). No arrow.
- Secondary button: white pill with a hairline border.
- Type: Feature Display (headlines) + Aeonik Pro (descriptions and UI), matching joindex.com. Both paid; wired with fallbacks to Newsreader and Geist until licensed or trial files are added (docs/fonts.md).
- Intro motion plays once per session (`sessionStorage` key `gf-intro`).

## Copy

- Headline: "The operating system for profitable growth" (was "The Operating System for Profitable Marketing and Sales Teams"; asked for 6 words max, 2 lines, keeping "operating system"). Rejected: "Every customer, from ad to cash".
- One button only: Book a Call, no arrow. "See How It Works" removed by the user to keep it simple.
- Description: "Know which ads bring in buyers, and call every new lead before anyone else does." (update, 18 Nov: was "See which ads bring in buyers, call new leads in seconds, and let AI find the leaks."; the AI clause went with the Helios section, and the line now matches the two product sections below the hero).
- Button label "Book a Call" is fixed by the copy doc.

## Rejected

- Round 1 (before conversion.ai was named as the reference):
  - Gallery: full-bleed Monet with white type on it. Felt like an art site more than infrastructure.
  - Editorial: serif headline beside a Hubert Robert plate.
  - Panorama: one painting cut into 7 journey panels.
- Round 2 (conversion.ai system):
  - Split: copy left, unblurred Monet right. The user preferred Centered.
  - Products: three bento cards with proof numbers (9.3 EMQ, 34s, 50+). Busier, and spends proof numbers in the first screen.
- Eyebrow chips with the three product names: removed by the user.

## Open

- Real app login URL for "Log in".
- Real nav dropdowns (Products mega menu, Solutions, Resources).

## Update, 18 Nov: demo framed like conversion.ai

- The hero visual slot (16:9, empty, white at 60%) now fills the frame between its two vertical hairlines, with no rounded corners and no border of its own. Two hairlines run the full width of the screen along its top and bottom edges, so every line touches the demo's edges. On phones it runs edge to edge.
- The customer logos sit under the bottom hairline (48px from it), inset like conversion.ai's logo row.

# Hero visual: the Command Center (18 Nov 2026)

- `src/components/home/hero-demo.tsx`, in the framed slot under the hero (hairlines above and below, frame edges at the sides), fading in with the once-per-session intro.
- The product itself, after the dashboard Loom: a GoFunnel app window on a soft grainy field (`BgFrame` seed 51: powder blue top-left, sea-glass top-right, peach and lilac along the bottom), 64px in from the sides and 56px down, bleeding off the bottom edge like conversion.ai's hero demo, with a deep layered shadow.
- Window: sidebar (GoFunnel mark, workspace "Northline Coaching", Command Center selected, Marketing, Leads, Dialer, Calls, Payments, Helios); top bar (Command Center, Last 30 days · Oct 19 – Nov 17, Ask Helios); four KPI cards (Ad spend $21,730, Cash collected $111,050 ↑18%, Return on cash 5.1×, Speed to lead 34s); cash collected by day (brand/500 line over a brand/200 fill, no gridlines); Dialer, live (Constance calling, a booking, a $4,800 payment, a redial); creatives ranked by cash (the five from prospect-demo.ts, with spend, calls, closes, cash, cash per $1). Every number is the same made-up account as the sections below.
- Sizing: built at a fixed 1280 × 720 and scaled to the slot's width (ResizeObserver), so it reads the same at every desktop size. Below 640px the slot is 4:3 and the scale stops at 0.5, so phones see a cropped, readable window (sidebar, KPIs, chart) instead of a tiny full one.
- Static apart from the intro fade. Marked as an image with a descriptive label for screen readers; not selectable.

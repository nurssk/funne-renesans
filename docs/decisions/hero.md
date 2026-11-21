# Home hero: "Connect", cloud style (21 Nov 2026, current)

Replaces the Centered hero and the Command Center demo below (client feedback: not a fan of the above the
fold; likes classical art with product as the stage, custom visuals over product shots; reference: a painted
cloud sky).

- Painting: John Constable, *Cloud Study*, about 1822, public domain (Wikimedia Commons, `John Constable -
  Cloud Study - Google Art Project.jpg`). A soft pale-blue sky with a low bank of cloud.
- Cropped to 1920 x 914 (the clear sky above the cloud bank) and lightened a little: levels 40-232, gamma 0.86,
  saturation x1.18, blacks lifted 5%. Baked into `public/art/hero-clouds.jpg`; not a CSS filter.
- Full window: the sky runs edge to edge and is as tall as the viewport under the nav (100svh minus the 65px
  header), no frame, no rounding. (The framed slot between the hairlines was tried first.)
- Everything inside the sky, centred in the clear blue: the headline (H1) "The ad they saw. / The money they
  paid." and Book a Call. No description line (removed by the user) and no band under the picture.
- Motion: the sky drifts very slowly (scale 1.04 to 1.1 and a small pan, 60s, transform only). Still under
  reduced motion. A livelier sky (two cloud layers sliding past each other, a breathing sun glow, a lean
  toward the cursor) was tried and removed by the user.
- At the foot of the hero (`hero-journey.tsx`): the seven steps of one record, Creative to Lifetime value,
  painted like a route on an old map, straight on the clouds (no panel; a white card was tried and removed).
  A small ink diamond at each waypoint, a roman numeral above it, its name in serif below.
- It paints itself, on a loop (about 13s): the hand runs the road left to right, each mark fills and its name
  turns to ink as the brush passes, an italic serif line under the road reads that step's note; the finished
  road holds, a second hand with a cloth travels back and wipes the paint off, rests, starts again. Replaced the hover and tap
  version. One rAF loop, two attributes a frame, only while on screen; reduced motion shows the finished road.
- The line is brushwork, not a vector hairline (the user: clean lines stood out): a soft ink body, a
  bristle-streak pattern, a thin stroke wandering off it, revealed through one mask. No SVG filters.
- The hand that paints it: cut out of Sofonisba Anguissola's *Self-Portrait at the Easel* (1556, Łańcut
  Castle; public domain, CC0 photo on Wikimedia Commons) along its own contour: the brush from tip to handle,
  the fingers, the back of the hand, the lace cuff. Lightened a touch, with a thin torn paper edge (white
  core, jagged) and a soft shadow baked in (`public/art/hero-hand.png`, 552 x 528, brush tip at 74, 123). The
  contour was traced by hand on a gridded enlargement (54 points), not keyed by colour. The tip of the brush
  rides the head of the stroke, the hand leans a few degrees with the slope of the road and sits above the
  marks. Tried first and rejected by the user: a drawn brush with no hand, a rectangular torn scrap.
- The hand that wipes it off: a second cut-out, from Michele Tosini's *Portrait of a Lady* (about 1555, Art
  Institute of Chicago, public domain, artic.edu/artworks/111639), her hand with a crumpled white
  handkerchief and a ring, mirrored so the wrist is on the right like the first hand, traced the same way
  (`public/art/hero-hand-cloth.png`, 552 x 405, cloth at 131, 196). It takes over from the brush hand just
  before the wipe (a 320ms crossfade), travels back along the road rocking a few degrees as if rubbing, and
  hands back at the end of the rest.
- Clickable: each waypoint is a button. Click one and a hand goes there instead of following the loop: if the
  paint is past it, the cloth hand wipes the road back to it; if the paint has not reached it, the brush hand
  paints on up to it. The road stays there for six seconds, then the loop carries on from that point. The
  loop is a chain of moves and waits on its own clock (it pauses off screen and resumes where it was). Under
  reduced motion a click just shows the road up to that waypoint.
- Looked at and dropped for the hand: Renaissance writing manuals and emblem books (no hand with a pen on
  Commons), Girolamo da Carpi's Saint Luke (hand too small), Catharina van Hemessen's 1548 self-portrait (the
  brush tip sits on the very edge of the picture).
- Direction for the whole site from here: Renaissance. Painted skies, ink and sepia line work, serif and
  italic labels, roman numerals, map and engraving motifs instead of UI cards.
- Rejected on the way (21 Nov): live event feed, journey line, three floating layers, Monet in an arch,
  Michelangelo's Creation of Adam (too well known; tried full bleed, with cards, through a torn paper hole),
  Perugino's Christ and the Woman of Samaria with the headline in its sky (read as a picture stuck on the page,
  not part of the design), Bartolomeo di Giovanni, Jacopo del Sellaio.
- `hero-demo.tsx` (the Command Center) is no longer on the page; kept in the repo in case it returns lower down.

---

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

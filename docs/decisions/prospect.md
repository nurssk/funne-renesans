# Follow one prospect, decided from /proto/prospect (18 Nov 2026, two rounds)

The home section for Fingerprinting Attribution. It follows one made-up prospect through seven steps,
from the first ad to a year of payments.

## Direction: Stage

- Component: `src/components/home/follow-prospect.tsx`, visuals in `src/components/home/prospect-visuals.tsx`, copy in `src/content/prospect.ts`. On the home page it sits between the customer logos and integrations.
- Header, centered (update, 18 Nov: the "Fingerprinting Attribution" eyebrow was removed): serif headline "Follow one lead from ad to cash" (update, 18 Nov: was "Follow one prospect from the first ad to a year of payments") (32px, 44px from 640px), one line of body (17px ink-2).
- Desktop (1024px and up): one wide stage (max 920px, 20px corners, hairline border, white at 60%) is pinned in the middle of the screen while the section scrolls. The step's visual is shown in it at 108% scale. Under the stage: a counter "03 / 07" with a progress line, then the step's title (22px medium) and one or two lines (16px ink-2).
  - Scroll drives it: seven invisible markers, 70vh each, sit behind the pinned stage. The step whose marker crosses the middle of the screen is shown. The scroll area is 7 × 70vh + 30vh tall.
  - Visuals crossfade over 200ms ease-out; none with reduced motion. The progress line moves with the step.
- Phones and tablets: no pinning. Each step is its visual, then its number, title and text, stacked.
- No button for now (update, 18 Nov: the "See Fingerprinting Attribution" button was removed until the /attribution page exists; its label and link stay in `src/content/prospect.ts`).

## Copy

- Update, 18 Nov: every step description cut to one short line (about 50 characters) so it fits one or two lines on a phone.

- Cut from about 2,000 words in the copy doc (Home, Section 3) to one headline and one or two lines per step, so the visuals carry the detail.
- The seven steps: every visit lands on one person · down to the exact creative · every signal in between · what was said on the call · the money, back to the creative · Meta learns who your buyers are · see what is actually working.

## Visuals

- Update (18 Nov): the visuals are taken out for now so the foundations can be worked on; the stages are empty. The code stays in `prospect-visuals.tsx`, not imported.

- Seven code-built cards, one per step, all about one made-up prospect (Danielle Okafor-Brennan): visits joined to her record; the ad split into hook, body and CTA; her timeline from landing to showing up; a tagged call transcript; payments adding up to $15,600 lifetime spend; events sent to Meta with Event Match Quality 9.3; Creative A against Creative B.
- Everything in them is an illustration except 9.3 EMQ, the one approved proof point.
- White cards (14px corners, ring plus soft shadow), 13px text, tabular numbers. Teal only for system states (identified, sent, current); green and orange only for good and bad signals.

## Rejected

Round 1 (layout):
- Tabs: a clickable list of the steps beside one visual. Compact, but most visitors would only see the first one or two steps.
- Timeline: every step's text and visual down one rail. Nothing hidden, but long and evenly weighted, so it read like a list.
- Sticky (the round-1 pick, then the round-2 baseline): steps scrolling on the left beside a pinned visual. The user preferred Stage's bigger, centered visual.

Round 2 (riffs on Sticky):
- Index: a pinned, clickable list of the steps with a progress line, text and visuals scrolling together. Less of a guided story.
- Record: the pinned panel as the prospect's record, ticking off each step. Busiest panel, smaller visuals.
- Canvas: Sticky mirrored, with the visual on the pastel Monet-style art. Louder than the rest of the page, and the art is a demo image.

## Open

- The scroll length per step (70vh) and the 108% visual scale are first values, never put on sliders.

# Step 01 interface, decided from /proto/step1 (18 Nov 2026)

First of the product interfaces, built on the new GoFunnel design system (gofunnel-design-system.vercel.app).

## Direction: Table

- Component: `src/components/home/step-touchpoints.tsx`, data in `src/content/prospect-demo.ts`. Design-system tokens in `src/styles/gofunnel-ds.css`, scoped to `.gf-ds` so they don't touch the marketing site's own tokens.
- The app's data table (Lead list / Pipeline Attribution), on its own with no page header (the step caption says what it shows). Columns Date ↓ · Touchpoint · Channel · Device · Location; Device and Location drop below 768px. 40px rows, ruled columns and rows, caption text (12/16) in content/secondary, header on background/surface, neutral reference tags for the channel (Paid, Organic, AI assistant). The opt-in row is selected (background/accent-subtle) with an Identified tag, the only teal.
- One made-up lead, Constance Waverly-Ashford, five visits on three devices, then the opt-in.
- The stage behind it is background/surface (grey/100) with the site's hairline and 20px corners.

## Motion

- When step 01 becomes the active step, the five touchpoint rows arrive one after another: opacity 0 → 1 and 6px up, 260ms, cubic-bezier(0.23, 1, 0.32, 1), 50ms apart. Then the opt-in row arrives and, 270ms later, turns accent-subtle (320ms) while its Identified tag fades and scales in from 0.96 (200ms). The visits join into one person on screen.
- When another step becomes active, everything resets with no transition, so it plays again on the way back.
- Nothing plays on page load: the stage stays empty until the reader reaches the section.
- Reduced motion: no transitions at all. Phones show the table at rest, without the sequence.

## Rejected

- Record: the design system's list card, one row per visit. Read well on phones, but the joining was only told in its last row.
- Merge: three anonymous-visitor cards with lines converging into one record. Showed the idea, but read as a diagram rather than the product, and the lines only worked on desktop.

## Open

- STK Bureau Sans files are not available yet; the table falls back to Aeonik Pro. The design system's icon set is not supplied either.

# Step 02 interface, decided from /proto/step2 (18 Nov 2026)

## Direction: Grid

- Component: `src/components/home/step-creatives.tsx`, data in `src/content/prospect-demo.ts` (`creatives`).
- The app's creative grid (as in the Meta Ads screen): three ad cards side by side, two on phones. Each card is a design-system card (radius/large, border/default, 8px padding): a dark neutral 4:5 video frame (grey/800) with a play button and the hook as a caption on a grey/950 scrim, the creative's name, tags, then Spend / Calls / Cash in caption text (Calls drops on phones).
- The creative Constance saw (Spring VSL · Hook 3) carries the accent tag "Constance saw this" and a 2px border/focus outline, plus the positive "↑ Top by cash" tag (green with an arrow, never colour alone). The others carry a neutral hook-type tag.
- Made-up account: Spring VSL · Hook 3 is first by cash ($38,400) but not by calls; Founder story has more calls (44) and less cash, which step 07 builds on.
- No motion yet.

## Rejected

- Detail: one creative up close with a hook / body / CTA timeline, its tags and three KPI cards. Showed the breakdown best but was the busiest and long on phones.
- Ranking: the data table of five creatives sorted by cash. Clear, but a second table straight after step 01, and no creative visible.

## Also changed

- The design-system helper classes in `src/styles/gofunnel-ds.css` now sit in Tailwind's components layer, so utilities such as `hidden` and text sizes can override them (a tag meant to hide on phones was still showing).

# Steps 03 to 07 interfaces, decided from /proto/step3 to /proto/step7 (18 Nov 2026)

Prototyped in parallel, three variants each. All on the GoFunnel design system, data in `src/content/prospect-demo.ts`.

## One timeline

- Constance opts in Thu Nov 12, books a call for Mon Nov 16, no-shows, is called back by the Automated dialer and rebooked, shows Tue Nov 17 (38 min with closer Marcus Reyes, recorded by Fathom) and pays $4,800 on the call. The prototypes had disagreed (call on Nov 14 or Nov 17, 38 or 47 min); every step now uses this one.
- Later payments: Nov 29 order bump $400, Jan 20 Inner Circle $9,600 (Mercury wire), May 25 renewal failed then May 26 paid by PayPal $1,200, Jun 6 refund −$400. Lifetime $15,600.

## Picks

- 03 Feed (`step-signals.tsx`): the lead timeline, one column, oldest first. Ten signals on a rail of neutral icons, days split by hairlines; colour only for No-show (red ✕), Showed (green ✓) and stages (teal).
- 04 Insights (`step-call.tsx`): the call header (Fathom tag), three scores (deal probability 78%, qualified 3 of 4, rep score 8.4 / 10), then five flagged moments as 54px rows, her quote first, the closer's reply for objections, Handled / Missed / Buying signal tags.
- 05 Ledger (`step-payments.tsx`): the Payment Logs table. Date ↓, Payment, Processor, Plan, Amount, Status, Closer; "Credited to Spring VSL · Hook 3 · Meta Ads" in the header, lifetime value in the footer. Columns drop below 1024px and 768px; phones keep Payment, Amount, Status.
- 06 Match (`step-match.tsx`): the Purchase event as sent to Meta (value, time, route, also sent to Google Ads, TikTok, Snapchat), Event Match Quality 9.3 / 10 (the only real number), and the seven pieces of match data with where in the journey each came from.
- 07 Verdict (`step-verdict.tsx`): Offer · Hook 5 (A) against Spring VSL · Hook 3 (B). Cost per call makes A the winner; under the rule "Ad dashboards stop here", close rate and cash make B the winner. Helios says it in one line. Numbers come from `creatives`, so they match step 02.

## Motion

- Step 07 only: when it becomes active, the rule, the close-rate row, the cash row and the Helios line arrive one by one (opacity and 6px up, 260ms, cubic-bezier(0.23, 1, 0.32, 1), at 300 / 420 / 480 / 620ms). It resets with no transition when another step is active. Phones and reduced motion show the end state.
- Steps 03 to 06 have no motion yet.

## Stage fit

- The stage is min(520px, 58vh), and its padding is now 24px (was 32px). Each interface sits in a small `Fit` wrapper in `follow-prospect.tsx` that scales it down (never up) when it is taller than the stage, so on a short laptop screen nothing spills past the stage edge. At 1440×900 nothing scales.
- `.tag-negative` was added to `src/styles/gofunnel-ds.css` (red-200 / red-500), the pair for failed, refunded, missed and negative deltas, always with an icon.

## Rejected

- 03 Lanes (days across, a row per signal type): literal "one timeline", but the third ruled grid in a row. 03 Scorecard (totals, stage path, form answers, texts): lost the exact times and was the furthest from the app.
- 04 Call page (video tiles, phase bar, transcript): the real screen, but busiest and only one flag visible. 04 Talk track (speaking lanes with pinned flags): distinctive, but the speaking bars were decoration and the flags too small to tap.
- 05 Curve (KPI cards and a lifetime-value curve): leaned on an invented "4.2× reported by Meta" figure and dropped processors and closers. 05 Credit (payments with an arrow into the ad card): most parts on screen, repeated step 02's video frame.
- 06 Routes (the conversion-route rule builder): showed the "you decide what Meta learns" idea best, but busiest and without 9.3. 06 Log (events-sent table with a held-back row): another table, and lost the reason on phones.
- 07 Flip (table that re-sorts from cost per call to cash): the point was missed by anyone who looked away during the flip. 07 Leak (funnel conversion per step): showed where A leaks, but busiest and tall on phones.

## Open

- Steps 03 and 06 are tall on phones (about 780px and 810px). Fine in a stacked list, but worth trimming if the phone section feels long.
- The held-back lead from step 06 Routes and Log is not shown anywhere now; the "we leave junk leads out" point lives only in the step caption.

# Polish pass on steps 02 to 05 (18 Nov 2026)

- 02: the hook caption on the video frames is gone (frames are a dark tile with a centred play button). "Constance saw this" and "↑ Top by cash" now sit on one line on desktop (card text padding 4px → 2px gave the room); on phones the cards are too narrow and the two tags wrap. Creative names wrap on phones instead of truncating.
- 03: eight signals instead of ten (the form answers and the pre-call page are gone, details shortened so nothing truncates). Each event is a two-line row: title (with its tag) over the detail, a 32px round icon holder on a hairline rail, date over time on the right. Replaces the single-line log with a blank date column.
- 04: every moment row ends on its timestamp (▶ 4:48), so the right edge is one column. Outcome tags (Handled, Missed, Buying signal) only where there is an outcome; pain points and aspirations no longer repeat their kind as a tag. On phones quotes wrap and the outcome tag moves under the quote.
- 05: Plan and Closer columns removed (mostly "-" or repeats); the closer moved to the header ("Closed by Marcus Reyes") beside the lead's initials, the credited creative on the right. Columns: Date ↓, Payment, Processor, Amount, Status. The failed attempt's amount is struck through. Phones keep Payment, Amount, Status.
- Still no motion on 02 to 06, on purpose, until the polish is settled.

# Step 02 videos (18 Nov 2026)

- Constance's creative (Spring VSL · Hook 3) is now the middle card; on phones, where two cards show, it comes first.
- The frames hold real footage. Her card plays `public/creatives/spring-vsl.mp4` (480px H.264, no audio, 4.8s loop of the talking-to-camera part only, 0.26 MB) with `spring-vsl.jpg` as its poster. The other two cards are still images (`case-study.jpg`, `founder-story.jpg`, 480px), not videos: they never play, so a frame is all they need. All four files total about 0.4 MB.
- UI polish (same concept): the big white play buttons over the faces are gone; every frame has a small duration chip bottom-left (▶ 0:45 on a grey/950 60% scrim), as an ad library shows video. Card padding 8 → 6px with the frame at radius/small (6px), so the corners sit concentric with the card's 12px. The divider between the tags and the numbers is gone (spacing separates them), and Spend / Calls / Cash values went from caption to body size so the numbers read first. Card text sits 4px in from the frame edge.
- Only her creative plays: muted, looped, inline, and only while step 02 is the active step and the frame is on screen (IntersectionObserver). It pauses on every other step. Reduced motion: nothing plays, the poster shows.
- **Placeholder footage.** The three clips are AI reels from higgsfield.ai's homepage (replaced the earlier everygen.ai clips). They are another company's showcase content: get permission or replace them with GoFunnel's own creatives before this ships. Source files stay out of the repo; only the trimmed clip and stills are in `public/creatives/`.

# Unslop pass on steps 06 and 07 (18 Nov 2026)

- 06 Match, three cards into one. Header: Purchase, her name, "Sent to Meta" (accent, the system state). Three numbers in a ruled row: Value $4,800, Sent 3:12 PM (Nov 17), Event Match Quality 9.3 / 10 (scored by Meta). Then a two-column table: Match data · From her journey. Removed: the icon holder on every match row, the grey check on every row (it said nothing), the progress bar under 9.3, the "Also to Google Ads, TikTok, Snapchat" tags (the step is about Meta).
- 07 Verdict, same comparison with less on it. Rows are grouped by where the number comes from: "From the ad platform" (cost per call) and "Only in GoFunnel" (close rate, cash collected), as surface group rows. That replaces the marketing line "Ad dashboards stop here…" with the product's own structure. One green outcome tag per row, on the winner only (↓ 9% cheaper on A; ↑ 5.0× and ↑ 3.9× on B), instead of six mirrored deltas with red on the losers. Removed: the A / B letter badges, the sparkle icon in front of Helios (Helios is a caption label over its one line), the empty surface header cell.
- Helios copy: "Offer · Hook 5 books cheap calls that don't close. Move budget to Spring VSL · Hook 3."
- Phones: labels shorten (Match, By Meta), names and match sources wrap instead of truncating.
- 07: the empty top-left header cell now holds the date range the comparison covers ("Last 30 days", Oct 19 – Nov 17), as the app's tables do. Hidden on phones, where that column folds away.
- Depth (experiment, 18 Nov): her card comes forward, scale 1.05, on top, lifted by a soft layered shadow (0 1px 2px / 0 12px 32px -8px, grey at 6% and 22%). The other two step back: scale 0.9, blur 2px, slid 40px in under her edges, not clickable. Phones: all three share one grid cell, hers centred at 66% width in front, the other two (56%) peeking out on either side. Static for now; no motion on the depth.

# Step 01 channel colours (18 Nov 2026)

- Each channel tag takes one of the design system's tag pairs so the column reads at a glance: Paid green (positive pair), Organic amber (attention pair), AI assistant teal (accent pair). This bends the design system's rule that green is only for outcomes; it's a marketing visual, and only five colour families exist (brand, green, amber, red, grey).
- Identified is now a solid tag (brand/600 with grey/50 text and a ✓), new `.tag-solid` in `src/styles/gofunnel-ds.css`. The subtle accent tag blended into the accent-subtle row, so its text looked out of line with the boxed tags above it. `.tag-attention` (amber pair) was added there too.

# Motion and backgrounds for steps 03 to 07 (18 Nov 2026)

## Motion (one contract for all steps)

- Enter, when the step becomes active: parts arrive in reading order, opacity 0 → 1 and 6px up, 260ms, cubic-bezier(0.23, 1, 0.32, 1), 40–50ms apart, done within about 700ms. One moment per step, landing last with scale 0.96 → 1: 03 the timeline tags after their rows; 04 the Handled / Missed / Buying signal tags; 05 the Lifetime value footer; 06 the "Sent to Meta" tag; 07 the two green winner tags (after a short pause before the "Only in GoFunnel" rows).
- Exit, when another step becomes active: everything fades out together, 150ms, cubic-bezier(0.4, 0, 1, 1), no movement, no stagger; the 6px offset and 0.96 scale reset only after the fade, so it plays again next time.
- Phones (`animate={false}`) and reduced motion (`.gf-ds [data-anim]`): the finished state, no motion. Steps 01 and 02 keep their own motion (01 still resets with no exit fade).

## Backgrounds

- Every step sits on its own grainy colour field, the look of conversion.ai's platform cards and elevenlabs.io's feature cards. `src/components/home/backgrounds/`: `bg-frame.tsx` (fills the stage or phone slot, lays one shared SVG fractal-noise grain over the colour, soft-light at 22%), `bg-01.tsx` to `bg-07.tsx` (layered radial and linear gradients, static, no blur, no images), `index.ts` (`stepBackgrounds`). Wired in `follow-prospect.tsx`: each stage layer renders its background behind the interface, so it crossfades with the step; the stage now clips with overflow-hidden.
- Palettes: 01 cool sky blue, 02 warm peach and apricot, 03 misty blue-teal, 04 dusk slate to indigo (the darkest), 05 warm sunset orange and red with a blue-violet edge, 06 blush pink and lilac, 07 GoFunnel teal.
- On phones the slot's 12px padding shows only a thin band of each background around the card.
- Effects pass (ElevenLabs look): `bg-frame.tsx` now bends every background with an SVG warp (fractal noise 0.0025 / 0.005, displacement 230, blur 10; colour layer oversized 15% so edges never show) and a sheen layer inside the warp (repeating 118° light and shadow bands, soft-light) so the colour flows as ribbons, not ellipses. Each step passes its own `seed`, so the ribbons run differently. Grain is coarser and contrast-boosted (fractal noise 0.62, 3 octaves, linear slope 2.2) at 28% overlay; the earlier, finer grain rendered as a flat grey veil. All static, so the filter renders once. Pale palettes (01, 03, 06) show the ribbons softly; the saturated ones (04, 05, 07) show them most.
- Drift: the warped colour layer moves on a 28s loop, back and forth (translate ±2.5% / ±1.5%, scale 1.02 → 1.07, rotate ±0.8°, ease-in-out cubic-bezier(0.45, 0, 0.55, 1)), `.gf-drift` in `gofunnel-ds.css`. Transform only, so the SVG warp renders once and the compositor moves it. Each step starts at its own point in the loop (negative delay from its seed). Off under reduced motion.
- Button restored (18 Nov): "See Fingerprinting Attribution" (secondary, `/attribution`), centred under the section intro, the same pattern as the Integrations section. The `/attribution` page doesn't exist yet, so the link 404s for now.
- Section end spacing (18 Nov): the pinned frame is a full screen tall with its content centred, which left half the spare height as an empty gap under the last caption (bigger on tall screens). The tall container now has a negative bottom margin of that spare space minus 96px, so the gap from the last caption to the dialer section's line is 96px at any screen height (checked at 900 and 1200 tall). The container and its sticky frame are click-through (pointer-events none) so the overlap never blocks the dialer header.
- Section start spacing (18 Nov): the same spare space sat above the first frame (the stage centred in a full-screen frame), leaving roughly 140–250px between the intro button and the stage. The tall container now also has a negative top margin, so the stage starts 64px under the button at any screen height (checked at 900 and 1200 tall); once scrolled it still pins alone in the middle of the screen, and the steps still switch in order.

# One stage (22 Nov 2026, branch renaissance-accent)

Asked for by the user: redo the dialer block; chose "one big stage".

- `src/components/home/dialing.tsx`: the header with Book a Call, then one wide stage (480px tall at desktop,
  edge to edge of the frame) on its painted field showing one capability's live visual at 1.4x (CSS zoom; 1.2x
  on tablets, 1x on phones), then the five capabilities as a row of tabs: a roman numeral in serif italic, the
  lead phrase, the rest in grey. Replaces the grid of two wide and three narrow cells with arrow links.
- The row plays on its own: the selected tab's ink rule fills along its top over 6s, then the next capability
  takes over, looping. Hovering the stage or the row pauses it; a click picks a capability and restarts its 6s.
  It runs only while the section is at least 35% on screen. The visual is remounted on each change, so its own
  loop starts from the top, and fades in (280ms). Reduced motion: a full rule and no auto-advance.
- The per-cell "learn more" arrows are gone; Book a Call stays in the header.

---

# Dialing Infrastructure, decided from /proto/dialing (18 Nov 2026, three rounds)

The home section for the dialer, between Follow one prospect and integrations.

## Direction: Platform (after conversion.ai's "Core platform" section)

Round 3 replaced the Rail picked in round 2 (kept below under Rejected).

- Component: `src/components/home/dialing.tsx`, copy in `src/content/dialing.ts`.
- Header: serif headline "A dialer that calls every new lead in seconds" (32px, 44px from 640px, on one line from 1024px) on the left (update, 18 Nov: the eyebrow and the body line were removed, and the headline, once "Call every new lead in seconds", now names the product so it reads without them); the Book a Call button (`btn btn-primary`, same link as the hero) on the right, aligned to the bottom of the text. Stacked on phones.
- Grid: the cells share hairlines and run edge to edge of the frame. Six columns from 1024px: the first two cells span three each, the last three span two each (two wide cells, then three). Two columns from 640px, one on phones.
- Each cell: a title of one or two lines (18px, 20px from 1024px), a dark lead phrase in medium weight that runs on in grey (ink-3), with a 32px round arrow link at the top right (to /dialing-infrastructure, not built yet). Under it, a picture area to the cell edges: 340px tall in the wide cells, 280px in the others (300 and 260 below 1024px).
- Pictures (18 Nov): each cell shows a product UI card on its own grainy colour field, like conversion.ai's platform grid, built on the GoFunnel design system and the shared `BgFrame` (warp, drift, grain) from the Follow one lead backgrounds. Files in `src/components/home/dial-visuals/` (`index.ts` maps them to the cells in order). Cards bleed off the bottom edge to feel large.
  - Instant dialing (powder blue): a live call card for Constance, a seconds log since her form came in (form 0s, HubSpot contact 1s, assigned 2s, dialing from a local 512 number 3s), and on desktop a side column with the approved figures (34s speed to lead across 83 clients, 23–27% connection rate). The timer ticks in view and the tag turns Calling → Connected at 0:07.
  - Follow-ups (apricot): a no-answer follow-up schedule (Call · No answer → Wait 10 min · Done → Redial · Calling → Text · Queued → outside business hours → Thu 9:00 AM call · Scheduled), business hours in the header. Rows rise in when the cell enters view.
  - Waterfall dialing (periwinkle and lilac): one waterfall for Marcus Reyes; each lead's ring bar starts a beat after the last, Constance connects (teal), the others show No answer, Voicemail skipped, Released, Queued. Bars draw in when in view.
  - Local numbers (sea-mist green): caller ID card calling Constance from a local (512) number on the GoFunnel carrier, Spam-free, then a number pool by area code tagged Healthy. A ring pulse on the Calling dot.
  - Live transfers (sand and rose): a live transfer for Constance, then the routing rule matched (Budget ≥ $10k → Closers), Marcus Reyes accepting, the call logged in HubSpot, and a recording strip. The timer ticks while on screen.
  - All motion is transform/opacity and off under reduced motion. The old `art` crops in `src/content/dialing.ts` are no longer used.
- 96px of canvas under the grid before the next section.

## Copy

- Cells: **Instant dialing** for every new lead, the moment it lands · **Follow-ups** that queue themselves on your schedule · **Waterfall dialing** that keeps every rep on a live call · **Local numbers** on our own carrier network, so people pick up · **Live transfers** routed by your rules and logged in your CRM.
- The "calling takes too much work" problem step is dropped: it describes the problem, not a capability, and five cells fill the two-then-three grid.
- The approved proof points (34s speed to lead across 83 active calling clients, 23–27% connection rate) are not shown for now; they stay in the content file.

## Rejected

Round 1:
- Ledger: pinned header with big stats beside numbered text rows, no visuals.
- Zigzag: a large slot per step, alternating sides. The longest option.
- Grid: six equal cards in a 3 × 2 grid. Read like a standard feature grid.

Round 2 (riffs on Grid):
- Bento: cards of two widths. Wide cards need wide visuals.
- Framed: cells sharing hairlines edge to edge, empty slots inside each cell.
- Feature: one wide slot for the whole dialer, then six text cells.
- Rail (the round-2 pick, live until round 3): the six steps in one horizontal row that snaps card by card, with arrow buttons beside the headline. Replaced by Platform, which shows every capability at once and matches the conversion.ai look the site follows.

## Polish pass on the cell visuals (18 Nov 2026)

All five cards now share one anatomy: centred, `min(100% - 56px, 480px)` in wide cells and 340px in narrow ones (100% - 40px on phones), 28px from the top of the picture area, bleeding off the bottom edge only; `.card` plus one shadow (0 1px 2px / 0 12px 32px -8px, grey at 6% and 18%); a 52px header (optional 32px round icon, title over one caption, at most one tag); at most four 44px rows; no icon on every row; at most two tags in a body; one focal point; body and caption type only.

- Instant dialing: four plain log rows with second offsets (form 0s, HubSpot contact 1s, assigned to Marcus 2s, dialing from a local 512 number 3s); the header tag ticks "Calling 0:04 → 0:07" then turns "Connected" once per view. The side column of stats is gone (a 34s average next to a 3s log read as cherry-picked).
- Follow-ups: four rows (Call, Redial in 10 min, Text, Call at opening Thu 9:00 AM), business hours in the header tag; the running step is the only highlighted row with the only body tag (Calling, with a ring pulse); other states are quiet text.
- Waterfall dialing: "Marcus Reyes · Rang 3 new leads at once", four rows; Constance is the only primary name with the only tag (Connected); the rest read No answer, Dropped, Up next. The ring bars and motion are gone.
- Local numbers: her number and the caller ID in one tabular column, with only the two "512" area codes in accent so the match is the focal point; Carrier and a "Not flagged" spam label below. The number pool table is gone.
- Live transfers: a rule card (If budget over $10k, Route to Closers, Closer Marcus Reyes · Accepted, Logged to HubSpot) under a ticking transfer timer; icons and per-line tags are gone.

## Loops (18 Nov 2026)

Each cell's card plays its own story on a loop of about 7–8s: build up, hold the finished card (~2.5–3s) so it can be read, quiet reset (changed parts fade out in 150–200ms), repeat. Shared rules: runs only while the cell is at least 40% on screen (IntersectionObserver) and the tab is visible, otherwise it rests on the finished card and restarts from the top when it comes back; reduced motion shows the finished card with no loop; transform and opacity only, entrances 220–280ms cubic-bezier(0.23, 1, 0.32, 1), on-screen moves 300–400ms cubic-bezier(0.77, 0, 0.175, 1), tags land with scale 0.96 → 1; swapped values share one grid cell, so nothing shifts layout. The server render is the finished card.

- Instant dialing: the four log rows land about 0.8s apart, each offset rolling up into place (0s, 1s, 2s, 3s); the tag lands "Calling 0:01", ticks to 0:02, then hands over to "Connected"; hold 2.5s.
- Follow-ups: one surface highlight slides down the schedule a row at a time; each row it leaves settles into its quiet done state (No answer, Sent) and the next row's accent tag lands (Calling, Sending, Scheduled); hold 3.2s.
- Waterfall dialing: all three leads show "Ringing" with a small phone glyph shaking out of phase; Constance's Connected tag lands, then Owen settles to No answer, Priya to Dropped, and Janet slides in as Up next; hold 3s.
- Local numbers: the caller ID starts as (800) 555-0148, its area code rolls like an odometer digit by digit to (512), both 512s cross-fade to accent together as the match, then "Not flagged" lands; hold 3s, roll back.
- Live transfers: the routing rule resolves row by row like a rule engine, then Marcus's Accepted tag lands while the transfer timer runs.

- Header spacing (18 Nov): 80px from the section line to the headline on desktop (was 128px), 64px on phones (was 96px).

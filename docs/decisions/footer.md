# Site footer, round 2, decided from /proto/footer-conversion (18 Nov 2026)

## Direction: Potential (after conversion.ai's footer)

This replaces the Wordmark footer and its Spotlight logo below. Component: `src/components/site-footer.tsx`.

- Top row: the positioning line as a one-line headline, "The infrastructure layer to scale profitably" (Feature Display serif, 26px, 32px from 640px, line height 1.15, ink), and a Book a Call button (`btn btn-primary`, same link as the hero) on the right, vertically centred. Update (18 Nov): "backed by data" was cut and the size lowered from 40px so it fits on one line. Stacked on phones. A hairline under the row (32px below the headline, 48px above the links) separates it from the link groups.
  - No logo in the footer: the nav has it and the watermark symbol closes the page. Update (18 Nov): the lockup sat beside the line first; the user removed it and made the line the headline.
  - Update (18 Nov): the user asked for the button back. This row is the Book a Call section: the separate CTA section once planned above the footer is dropped. Footer closed.
- Five link groups in one row: Products, Solutions, Resources, Company, Legal. Titles are 14px medium in ink; links are 14px ink-2, darkening to ink on hover over 150ms. Each group is as wide as its longest link, and labels never wrap from 640px up.
  - Update (18 Nov): the brand block first shared the row with the groups from 1280px, then sat stacked above them, then became the headline row with a divider.
  - 1024px and up: the five groups spread across the frame in one row (40px minimum gap).
  - 640 to 1023px: 3 groups per row. Phones: 2 per row, and links may wrap.
- A hairline, then the copyright (13px ink-3). Privacy and Terms live only in the Legal group, not repeated here.
- Watermark: the GoFunnel symbol (the `SYMBOL` path, viewBox `80.5 80.5 184.8 160`, which is the symbol's real bounds). Width `clamp(280px, 40vw, 560px)`, centered, inside a box `clamp(200px, 26vw, 380px)` tall that crops it at the page end. Fill is a vertical gradient of ink: 7.5% at the top, 4% at 40%, 0 at 72%. Decorative: `aria-hidden`, no pointer events, not selectable.
- No compliance badges or social icons; GoFunnel has none to show yet.

## Rejected, round 2

- Current (Wordmark plus Spotlight logo): the user picked Potential over it.
- Potential on a raised white card with a soft shadow, after a second reference: the user wanted only the logo fade from that reference, not the card.
- Flat watermark (ink at 4.5%, hard crop): it read as a grey block; the fade replaced it.

# Site footer, decided from /proto/footer (18 Nov 2026)

## Direction: Wordmark

- Inside the hairline frame, on the light canvas.
- Update (18 Nov): the positioning line and Book a Call button were removed. The call to action gets its own section above the footer instead.
- Five link columns (Products, Solutions, Resources, Company, Legal), 13px grey titles, 14px links. Columns size to their longest link with a 56px gap (64px at 3 columns) so labels never touch. From 1024px the five columns spread across the frame. On phones the links can wrap in 2 columns.
- Then the copyright line, then the GoFunnel lockup set full width as the last thing on the page (decorative, hidden from screen readers). Its treatment is in "Footer logo" below.

## Content

- From the copy doc's footer, minus the top line and Book a Call button (moved to a dedicated CTA section) and the "Book a Call" link in Company (that section covers it).

## Rejected

- Columns: the brand block and five columns split by hairlines. Safe but forgettable.
- Dark: the same structure on near-black. Too hard a break from the warm light page.

# Footer logo, decided from /proto/footer-logo (18 Nov 2026, two rounds)

## Direction: Outline with a cursor spotlight

- Component: `src/components/footer-logo.tsx` (inline SVG, paths in `footer-logo-paths.ts`), styles under `.footer-logo` in `globals.css`. `site-footer.tsx` renders it where the `<Image src="/brand/lockup.svg">` was. The nav still uses `/brand/lockup.svg`.
- Base (round 1, Outline): the lockup drawn as a 1px line with no fill, same place as before (inside the text column, 24px under the copyright, 8px above the page end). Line colour: ink mixed 34% into canvas in oklch. The line stays 1px at every width (`vector-effect: non-scaling-stroke`).
- Spotlight (round 2): a teal copy of the logo lies exactly over the outline and is masked to a soft circle that follows the cursor, so only the letters under the cursor fill.
  - Teal: the Book a Call button's gradient, top to bottom across the whole logo: `#3f8793` 0%, `#357884` (teal-600) 55%, `#2c6a74` 100%. Fill plus a matching 1px stroke, so no grey edge shows around lit letters.
  - Radius: 0.85 x the logo's height, never under 64px (about 171px at 1440 wide).
  - Falloff from centre to edge (mask opacity): 100% at 0, 94% at 18%, 78% at 36%, 52% at 54%, 26% at 70%, 9% at 85%, 0 at 100%.
  - Fade in 160ms ease-out when the cursor comes within one radius of the logo; fade out 360ms ease-out when it leaves. The light fades where it stands and does not travel home.
  - Tracking: `pointermove` and `pointerleave` on the `<footer>` only (nothing runs while the cursor is elsewhere), read once per frame with `requestAnimationFrame`. The light chases the cursor on a spring: stiffness 260, damping 32 (about critical, no bounce). On arrival it starts under the cursor. Mouse and pen only, and only on `(hover: hover) and (pointer: fine)`.
- Touch (`hover: none` or `pointer: coarse`) and reduced motion: no light and no tracking. The symbol alone is filled with the same teal gradient and the name stays outlined, so the logo looks finished without a cursor.
- ViewBox fix: `lockup.svg`'s box (`80 80 976 161`) has 16 empty units right of the "l", so the old footer logo stopped about 21px short of the text column's right edge at 1440. The footer logo uses `80 80 960 161`, trimmed to the artwork. The brand file itself is unchanged.

## Rejected, round 1 (what the logo is)

The user picked Outline. The line after each name is its cost as noted in the prototype, not a quote.

- Current: solid ink lockup in the text column. A heavy black block at the end of a light, hairline page.
- Cropped: lockup edge to edge of the frame, bottom 20% cut by the page end. Too loud for the calm style, and it shaves the letters.
- Symbol: no wordmark, the symbol alone at the bottom right beside the copyright. Loses the name at large size.
- Reveal: solid lockup pinned to the screen bottom while the links lift off it. Keeps the heavy solid logo and is barely visible on a phone.

## Rejected, round 2 (motion on the Outline)

The user picked Spotlight ("love spotlight variant"). Costs as noted in the prototype.

- Outline, plain: no motion and no teal. Picked in round 1, but it felt unfinished.
- Sweep: teal symbol at rest; hovering wipes the teal gradient across the name (620ms) and leaving drains it back (280ms). One on/off state: it ignores where the cursor is, and a fully teal logo is a lot of teal.
- Draw: the outline draws itself once when it first reaches the screen (about 1.6s). One moment, then the same plain outline; nothing to do with the cursor.
- Letters: each of the nine shapes lifts up to 8px and tints teal by how close the cursor is. More playful than the rest of the site.

## Open

- Light radius, fade times and spring were never put on sliders; they are first values that the user approved by eye.

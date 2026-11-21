# Customer logos: ink on torn scraps (22 Nov 2026)

Follows the site's Renaissance direction (docs/decisions/hero.md). Replaces the row of soft grey tiles with
each mark in its own brand colour.

- Eight scraps torn from paintings already used or considered for the hero, one per logo, in this order:
  sky, rose drapery, teal drapery and the stone well from Perugino's *Christ and the Woman of Samaria* (Art
  Institute of Chicago); floor tiles from Bartolomeo di Giovanni's *Scenes from the Life of Saint John the
  Baptist* (Art Institute of Chicago); John Constable's *Cloud Study*; Pierre-Henri de Valenciennes's *Study
  of Clouds over the Roman Campagna* (National Gallery of Art); the green ground of Michele Tosini's
  *Portrait of a Lady* (Art Institute of Chicago). All public domain.
- Each scrap is lifted to a pale key (gamma toward a mean luminance of 0.70) so dark ink reads on all eight,
  and has a torn edge, white paper core and soft shadow baked in (`public/art/scraps/*.webp`, 416 x 268,
  13 to 24 KB each).
- The marks are the same invented ones, now all in one ink (`#2b241d`), multiplied onto the paint, no brand
  colours. Each scrap sits a degree or two off square.
- The line above is serif italic.
- The customers are still mock (see the note at the top of `customer-logos.tsx`).
- The user offered an image generator for this; none is available here, so the scraps are real paintings.
- Hover (22 Nov, the user: "edges change and the angle too"): the scrap is picked up: it lifts 6px, swings to the
  opposite tilt (1.6x its resting angle, the other way), bends in 3D (rotateX 7deg, rotateY -9deg, perspective
  600px) so its torn edges shift and catch the light, scales to 1.05 and its shadow deepens; 420ms out, back on
  leave. Fine pointers only; no transition under reduced motion. Styles under `.scrap` in `globals.css`.
- The torn edge itself changes on hover (the user): each scrap has a second picture, `public/art/scraps/*-b.webp`,
  the same painted patch (taken from inside the first tear, scaled back up) torn again with a different seed;
  it crossfades in over 320ms as the scrap is picked up, and back on leave.
- Bigger, in one row, inside the frame (the user): from 768px the eight scraps run in a single row that fills the
  frame (16px side padding, 8px gaps), about 150px each at 1440; the marks scale with them. A row breaking out of
  the frame to the full window was tried and reverted (it ran past the frame lines and got cut at the edges). Below 768px: two rows of four, then four rows of two on phones. (Two rows of four on desktop
  was tried in between and reverted.)

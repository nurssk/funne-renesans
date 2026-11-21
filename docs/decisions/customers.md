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

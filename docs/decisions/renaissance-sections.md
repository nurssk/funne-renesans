# The rest of the page in the Renaissance style (22 Nov 2026, branch renaissance-accent)

Asked for by the user: bring the remaining sections into the hero's style.

- Product fields are paintings now. Every grainy colour field the product cards sit on (the seven "Follow one
  lead" steps, the five dialer cells, Helios) was re-made from a real painting, cropped to a calm part, softly
  blurred (6 to 14px) and lifted toward the page canvas so the cards read, with fine grain:
  `public/backgrounds/*.webp`, same names and sizes as before, so nothing in the code changed for them.
  - Skies: Constable's Cloud Study (bg-01, instant), Valenciennes's Study of Clouds over the Roman Campagna
    (bg-02, bg-05, waterfall, transfers).
  - Perugino, Christ and the Woman of Samaria (bg-03, bg-07); Perugino, The Baptism of Christ (bg-04,
    follow-ups); Michele Tosini, Portrait of a Lady, its green ground (bg-06, local-numbers); Sofonisba
    Anguissola, Self-Portrait at the Easel, its dark olive ground (helios). All public domain.
  - The old soft gradient fields are in git history (commit 404a945).
- "Follow one lead" steps are numbered in roman numerals, serif italic (I · VII), like the journey path.
- Footer: Dimash's version's footer with two angels cut out of Perugino's Baptism of Christ (no paper rim) on the
  same painting blurred under a deep teal wash, light text; the industries list left out (they stay in the nav).
  Files taken from commit 6358e14 on `dimash-v2`: `angel-standing.webp`, `angel-kneeling.webp`,
  `footer-field.jpg`, `site-footer.tsx`.
- Integrations (asked for later): the two icon rows sit on a painted sky (bg-02, Valenciennes clouds) edge to edge of the frame between hairlines; the headline and "See All Integrations" stay on the paper below.
- Dialer, Local numbers: its field is now the light cloud field (copy of bg-01) instead of the dark Tosini green.
- Not changed: the nav.

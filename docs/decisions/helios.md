# Helios, decided from /proto/helios (18 Nov 2026, two rounds)

The home section for Helios, the AI, between the dialer section and integrations.

## Direction: Statement

- Component: `src/components/home/helios.tsx`, copy in `src/content/helios.ts`.
- Typography only, no visuals. A serif headline, "AI that answers any question about your business", 32px on phones, 44px from 640px (the same as the other section headlines), on one line from 1024px. Update, 18 Nov: made smaller, from 56px. No eyebrow and no description.
- The four use cases as lines of text (18px, 22px from 640px; update, 18 Nov: from 24/32px, with tighter rows), each a dark lead phrase running on in grey (ink-3), split by hairlines: **Weekly reports** sent to Slack every Monday · **New ad scripts** written from your sales calls · **Ad audits** that show what to scale and what to cut · **Rep coaching** built from each rep's own calls.
- Ends with the list, no button. Update, 18 Nov: the Book a Call button was removed, and the trust line "Nothing changes until a person approves it." was removed for now; it stays in `src/content/helios.ts`.

## Copy

- Cut from about 700 words in the copy doc (Home, Section 5) to a headline, four short use cases and one trust line, written to be read in a glance.
- Left for the Helios page: data sources, output formats, specialized agents, memory, "each product feeds the others" and "one place you own".

## Rejected

Round 1 (the user disliked all three):
- Ask: example questions as chips, a big slot for a chat demo, four use-case cards with slots.
- Split: header on the left, the use cases as a 2 × 2 grid of text cards.
- Layers: Helios over the two products over the data foundation, as stacked bands, then the use cases as rows.

Round 2:
- Platform: the dialer section's hairline grid, use cases as 2 × 2 cells with picture areas. Too close to the dialer section right above it.
- Dark: the one dark band on the page. Breaks the calm light page, like the rejected dark footer.
- Statement was picked: fastest to read and nothing to design later. Its cost: no visuals, and the large headline competes with the hero (lowered from 76px to 56px to fit one line).

- Top edge (18 Nov): no top border and no top padding. The section follows the dialer grid directly, so the line under the grid is the only divider and the 96px under it (the dialer's bottom space) is the gap to this headline.

# Remake: Product (18 Nov 2026, replaces Statement)

The user didn't like the typography-only Statement. Remade with the marketing-pages rules: show the actual product, motion only on input.

- Headline unchanged (serif, 32 / 44px, one line from 1024px), no description, no button.
- The product, framed edge to edge like the hero demo (hairlines above and below): a Helios conversation card (600px max, the design system's card with a deeper lifted shadow) on a dark teal-ink grainy field (`BgFrame` seed 41: deep teal base, a cream bloom top-left, teal glow right, a warm amber pool bottom-right). Card: Helios header (GoFunnel symbol, "Reads your ads, calls and payments"), the question as a grey bubble on the right, Helios's answer with the artifact it made in a small card and its sources in tertiary, then a composer ("Ask Helios about your business").
- The four use cases sit under the visual as a hairline row (4 columns from 1024px, 2 from 640px) and are the controls: clicking one swaps the conversation. Selected: the lead goes from ink-2 to ink and a 2px ink rule scales in along the top (200ms). Default: Ad audits, which continues the story "Follow one lead" ends on.
- Conversations (numbers match the five creatives in prospect-demo.ts): Weekly reports → last week's Spend $21,730, Calls 157, Closes 18, Cash $111,050; New ad scripts → a pain hook in the prospects' words; Ad audits → Scale Spring VSL · Hook 3 ($9.12 per $1), Cut Offer · Hook 5 ($1.52 per $1); Rep coaching → partner objections handled 4 of 5, contract questions parked 3 of 3.
- Motion only on click: all four answers share one grid cell (no layout shift) and crossfade, 220ms in with a 4px rise (cubic-bezier(0.23, 1, 0.32, 1)), 120ms out. No scroll-triggered motion. Reduced motion: instant swap.
- 96px of canvas under the row; the Integrations section below lost its top border and top padding (the same double-line fix as above the Helios headline).
- Use-case cells polish (18 Nov): the selected cell keeps the 2px ink rule drawn in along its top, and steps its text up a tone (lead ink, rest ink-2); on hover an unselected cell's lead darkens to ink. No background tints (a white 70% tint made the selected cell pop out of the flat hairline row like a raised card); neutral focus ring (2px ink, inset); text 18px at every width so all four fit two lines. Rejected: a 32px round arrow control per cell, like the dialer cells; it read as a heavy black button in every cell.
- Headline centred (18 Nov), on one line from 1024px, balanced over two or three lines below.

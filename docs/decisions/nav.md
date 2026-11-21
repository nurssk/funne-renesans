# Nav dropdowns, decided from /proto/nav (17 Nov 2026)

## Direction: Compact, styled after conversion.ai's menus

- Each menu drops a panel from its own trigger, 6px below the nav line, scaling from top left. The first icon lines up with the trigger's label.
- Glass rim: 22px radius, 6px padding, white at 45% with backdrop blur and a white inner edge, around a solid canvas card (16px radius, 8px padding).
- Rows: 18px Lucide icon (1.5 stroke), 14.5px title, 13.5px grey description, 8px hover radius, hover fill gray (ink at 5%). Columns 300px (248px below 1280px wide), grey 13px sans group labels (link to the product page where there is one).
- Products: Fingerprinting Attribution (7), Dialing Infrastructure (6), AI (Helios). Solutions: 7 industries, titles only until the industry copy exists. Resources: Blog, Funnel calculator.
- Sentence case for every item; product names and acronyms keep capitals.
- History: a text-only, serif-label version (unslop pass) came before this; the user asked for icons, descriptions and a glass border like conversion.ai.

## Placement, decided from /proto/nav-placement (17 Nov 2026)

- Anchored: each panel opens under its own menu item, left edges lined up (panel at left: -14px, 18px below the trigger, scaling from top left). No change to the live nav.
- Rejected:
  - Centered on the item: the wide Products panel nearly touched the left screen edge and would overflow on smaller laptops.
  - Page center: Resources opened far from its trigger; weak link between menu and panel.
  - Shared spot (all panels at the start of the links): Solutions and Resources opened to the left of their triggers and felt detached.

## Previously chosen: Sheet

- Products, Solutions and Resources open a full-width panel attached to the nav's bottom hairline.
- Inside: the page frame (1280px) split into a fixed 4-column grid with hairlines between columns. No floating card.
- Each column: small grey group label (links to the product page where there is one), then rows of 17px Lucide icon + 15px title + 13.5px grey description.
- Products: Fingerprinting Attribution (7 items), Dialing Infrastructure (6), AI (Helios), and the 4th column carries "All three run on one data layer…" in the serif.
- Solutions: 7 industries in 2 columns, titles only (industry page copy isn't written yet). Resources: Blog and Funnel Calculator.
- No visual panel for now (conversion.ai has one on the right).

## Behavior

- Hover opens (mouse only), click toggles, Escape closes and returns focus to the trigger, click outside closes.
- Moving from one open menu to another swaps instantly, no second entrance.
- Panels stay in the DOM when closed (`inert` + `visibility: hidden`) so links are crawlable and not tabbable.
- Motion: enter 180ms `cubic-bezier(0.32, 0.72, 0, 1)` from `translateY(-4px) scale(0.985)`, exit 120ms ease-in. None with reduced motion.

## Rejected

- Tray (closest copy of conversion.ai): wide floating card under the nav. Covered most of the hero.
- Sheet: picked first, then replaced by Compact at the user's request.

## Open

- Mobile menu (copy doc 1.2) is not built yet.
- Solutions descriptions once the industry copy exists.

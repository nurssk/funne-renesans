import type { ReactNode } from "react";

// MOCK CUSTOMERS. Every name and mark here is invented as a placeholder.
// The handoff forbids real client names or logos without written approval, so replace
// this list only with approved clients (ask Daniel for names, logo files and case studies).
// Layout: one short line, then eight logos in one row (4 x 2 on tablets, 2 x 4 on phones), each mark painted
// in ink on a scrap torn from a painting. The invented brand colours below are no longer shown. No case-study links until
// there are real case studies.

type Customer = { name: string; color: string; mark: ReactNode };

const ink = "currentColor";

const customers: Customer[] = [
  {
    name: "Fernway",
    color: "#2f7d4f",
    mark: (
      <span className="flex items-center gap-2 text-[22px] font-semibold tracking-[-0.03em]">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden><path d="M11 2c5 3 7 8 4 14-1.6 3-4.4 4-4 4C7 18 4 14 5 9c.7-3.3 3-5.6 6-7Z" fill={ink} /><path d="M11 6v14" stroke="#faf9f7" strokeWidth="1.4" /></svg>
        fernway
      </span>
    ),
  },
  {
    name: "Quillon",
    color: "#5b4bd6",
    mark: <span className="font-mono text-[20px] tracking-[0.02em]">quillon</span>,
  },
  {
    name: "Tidewell",
    color: "#1f6fb2",
    mark: (
      <span className="flex items-center gap-2 text-[21px] font-extrabold tracking-[-0.02em]">
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="11" fill={ink} /><path d="M4 12c2.7-2 5.3-2 8 0s5.3 2 8 0M5 16c2.3-1.6 4.7-1.6 7 0s4.7 1.6 7 0" stroke="#faf9f7" strokeWidth="1.6" fill="none" /></svg>
        Tidewell
      </span>
    ),
  },
  {
    name: "Arbor Lane",
    color: "#b4532a",
    mark: (
      <span className="flex items-center gap-2.5 text-[20px] font-medium">
        <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden fill="none" stroke={ink} strokeWidth="1.8"><path d="M2 18 10 3l8 15M16 18 24 3l8 15" /></svg>
        Arbor Lane
      </span>
    ),
  },
  {
    name: "Brightmoor Coaching",
    color: "#c58a0c",
    mark: (
      <span className="flex items-center gap-2 text-[20px] font-semibold tracking-[-0.01em]">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden fill={ink}><rect x="2" y="12" width="3" height="6" /><rect x="7" y="8" width="3" height="10" /><rect x="12" y="4" width="3" height="14" /><rect x="17" y="1" width="2" height="17" /></svg>
        Brightmoor
      </span>
    ),
  },
  {
    name: "Calder & Pine",
    color: "#2e5d4b",
    mark: (
      <span className="flex items-center gap-1.5 text-[22px] tracking-[-0.01em]">
        <svg width="14" height="18" viewBox="0 0 14 18" aria-hidden fill={ink}><path d="M7 0 14 10H9l3 4H8v4H6v-4H2l3-4H0Z" /></svg>
        <span className="font-serif">Calder &amp; Pine</span>
      </span>
    ),
  },
  {
    name: "Velloria",
    color: "#c2357a",
    mark: <span className="text-[23px] font-medium tracking-[-0.04em]">velloria<span className="opacity-60">.</span></span>,
  },
  {
    name: "Ostra Capital",
    color: "#1d2b53",
    mark: <span className="font-serif text-[26px] tracking-[-0.02em]">OSTRA</span>,
  },
];

// Each mark is painted in ink on a scrap torn from a Renaissance painting (docs/decisions/hero.md, the site's
// direction): sky, rose and teal drapery and the stone well from Perugino's Christ and the Woman of Samaria,
// floor tiles from Bartolomeo di Giovanni, Constable's and Valenciennes's skies, the green ground of Tosini's
// Portrait of a Lady. Lightened to a pale key so the ink reads; torn edge, paper core and shadow baked in
// (public/art/scraps/*.webp, 416 x 268). Each sits a degree or two off square, as if laid down by hand.
// Hover (fine pointers): the scrap is picked up, it lifts, swings the other way a few degrees and bends in 3D so
// its torn edges catch the light differently, and the torn edge itself changes: a second picture of the same
// scrap with a different tear (*-b.webp) crossfades in. The shadow deepens. Styles in globals.css (.scrap).
const scraps = ["sky", "rose", "teal", "stone", "tiles", "cloud", "azure", "green"];
const tilt = [-1.6, 1.2, -0.8, 1.8, -1.3, 0.9, -1.9, 1.4];

export function CustomerLogos() {
  return (
    <section aria-labelledby="customers-title" className="overflow-x-clip bg-canvas">
      <div className="frame px-3 pb-20 pt-10 sm:px-6 md:px-4 lg:pb-24 lg:pt-12">
        <h2 id="customers-title" className="text-balance text-center font-serif text-[19px] italic leading-[1.5] text-ink">
          Trusted by teams that sell through ads and sales calls
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4 sm:gap-x-6 sm:gap-y-8 md:grid-cols-8 md:gap-x-2 md:gap-y-0">
          {customers.map((c, i) => (
            <li
              key={c.name}
              className="scrap relative flex aspect-[416/268] items-center justify-center text-[#2b241d]"
              style={{ ["--tilt" as string]: `${tilt[i % tilt.length]}deg`, ["--lift" as string]: `${-tilt[i % tilt.length] * 1.6}deg` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/art/scraps/${scraps[i % scraps.length]}.webp`}
                alt=""
                aria-hidden
                loading="lazy"
                width={416}
                height={268}
                className="scrap-a absolute inset-0 size-full"
              />
              {/* The same scrap torn again, a different edge: it fades in as the scrap is picked up. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/art/scraps/${scraps[i % scraps.length]}-b.webp`}
                alt=""
                aria-hidden
                loading="lazy"
                width={416}
                height={268}
                className="scrap-b absolute inset-0 size-full"
              />
              <span className="sr-only">{c.name}</span>
              <span aria-hidden className="relative flex scale-[0.74] items-center whitespace-nowrap opacity-90 mix-blend-multiply sm:scale-[0.85] md:scale-[0.48] lg:scale-[0.6] xl:scale-[0.72]">
                {c.mark}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

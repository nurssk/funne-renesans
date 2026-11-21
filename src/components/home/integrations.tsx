import Image from "next/image";
import Link from "next/link";
import { integrations, type IntegrationTile } from "@/content/integrations";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Integrations, after joindex.com: two rows of app-icon tiles with the GoFunnel tile in the middle of the
// lower row, then the headline and a link to the full list. The tile rows fade at both ends
// (mask), so on narrow screens the outer tiles are cut softly instead of wrapping. The bottom padding
// is room for the GoFunnel icon's shadow: the mask clips anything outside the box, which would cut the
// shadow off in a straight line.
// Renaissance pass (docs/decisions/renaissance-sections.md): the two rows sit on a painted sky (bg-02,
// Valenciennes' clouds, drifting like the other fields), edge to edge of the frame between hairlines, so the
// tools read as hung in the same sky as the hero; the headline and link stay on the paper below.
export function Integrations() {
  const { headline, cta, top, bottomLeft, bottomRight } = integrations;

  return (
    <section aria-labelledby="integrations-title" className="bg-canvas">
      <div className="frame pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div className="relative overflow-hidden border-y border-line px-6 py-14 sm:py-20 lg:px-10">
        <BgFrame seed={17} src="/backgrounds/bg-02.webp">
          {null}
        </BgFrame>
        <div className="relative mx-auto max-w-[1120px] overflow-hidden px-1 pb-6 pt-2 [mask-image:linear-gradient(90deg,transparent,#000_14%,#000_86%,transparent)]">
          <ul aria-label="Some of the tools GoFunnel connects to" className="flex flex-col items-center gap-4 sm:gap-5">
            <li className="flex shrink-0 justify-center gap-4 sm:gap-6">
              {top.map((t) => (
                <Tile key={t.name} {...t} />
              ))}
            </li>
            <li className="flex shrink-0 items-start justify-center gap-4 sm:gap-6">
              {bottomLeft.map((t) => (
                <Tile key={t.name} {...t} />
              ))}
              <GoFunnelTile />
              {bottomRight.map((t) => (
                <Tile key={t.name} {...t} />
              ))}
            </li>
          </ul>
        </div>
        </div>

        <div className="mt-14 flex flex-col items-center px-6 text-center lg:mt-16 lg:px-10">
          <h2
            id="integrations-title"
            className="max-w-[20ch] text-balance font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px]"
          >
            {headline}
          </h2>
          <Link href={cta.href} className="btn btn-secondary mt-8">
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}

// One tile: the tool's own app icon, clipped to the iOS corner shape, with a hairline edge and a soft
// shadow. The name is the image's alt text, not shown on screen.
function Tile({ name, icon }: IntegrationTile) {
  return (
    <span className="shrink-0">
      <span className="block size-11 overflow-hidden rounded-[23%] shadow-[0_0_0_1px_rgba(26,26,25,0.06),0_1px_2px_rgba(26,26,25,0.06),0_10px_18px_-10px_rgba(26,26,25,0.22)] sm:size-14">
        <Image src={icon} alt={name} width={56} height={56} className="size-full" />
      </span>
    </span>
  );
}

// The GoFunnel tile: the dark iOS app icon from the design system (public/brand/app-icon-ios-dark.png),
// larger and sitting lower in the bottom row. The PNG carries its own corner shape and rim, so it isn't
// clipped or ringed again; the shadow is a drop-shadow that follows that shape instead of a box.
function GoFunnelTile() {
  return (
    <span className="mx-1 mt-3 block size-[72px] shrink-0 sm:mx-2 sm:mt-4 sm:size-[88px]">
      <Image
        src="/brand/app-icon-ios-dark.png"
        alt="GoFunnel"
        width={88}
        height={88}
        className="size-full"
        style={{
          filter:
            "drop-shadow(0 1px 1px rgba(26,26,25,0.16)) drop-shadow(0 4px 8px rgba(26,26,25,0.12)) drop-shadow(0 14px 22px rgba(26,26,25,0.16))",
        }}
      />
    </span>
  );
}

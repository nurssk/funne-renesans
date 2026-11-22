import Link from "next/link";
import { hero } from "@/content/home";
import { HeroJourney } from "@/components/home/hero-journey";

// Home hero, "Connect" in the cloud style (docs/decisions/hero.md). A painted sky, John Constable's Cloud
// Study (about 1822, public domain, Wikimedia Commons / Google Art Project), cropped to the slot and lightened
// a little, edge to edge and as tall as the window under the nav (100svh minus the 65px header), no frame,
// no rounding. Everything sits inside the sky, centred in the clear
// blue above the cloud bank: the headline, "We walk the whole path with you.", and the button (the line
// under the headline was removed by the user). The sky drifts
// very slowly (transform only, 60s there and back; still under reduced motion). The Command Center demo that
// sat under the sky was removed by the user; the customer logos follow.

const CSS = `
@keyframes gf-sky { from { transform: scale(1.04) translate3d(-1%, 0, 0); } to { transform: scale(1.1) translate3d(1.5%, -1%, 0); } }
.gf-sky { animation: gf-sky 60s ease-in-out infinite alternate; will-change: transform; }
@media (prefers-reduced-motion: reduce) { .gf-sky { animation: none; } }
`;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-canvas">
      <style>{CSS}</style>
      <div className="border-b border-line">
        <div>
          <div className="relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/art/hero-clouds.jpg" alt="" aria-hidden className="gf-sky absolute inset-0 size-full max-w-none object-cover" />
            <div className="relative flex min-h-[calc(100svh-65px)] flex-col items-center px-6 pb-64 pt-[12svh] text-center">
              <h1
                id="hero-title"
                className="intro-rise font-serif text-[44px] leading-[1.02] tracking-[-0.015em] text-ink sm:text-[64px] md:text-[80px] lg:text-[clamp(92px,7.4vw,128px)]"
              >
                {hero.headline[0]}
                <br />
                {hero.headline[1]}
              </h1>
              <div className="intro-rise mt-10" style={{ ["--delay" as string]: "80ms" }}>
                <Link href={hero.primary.href} className="btn btn-lg btn-primary">
                  {hero.primary.label}
                </Link>
              </div>
            </div>
            <HeroJourney />
          </div>
        </div>
      </div>

    </section>
  );
}

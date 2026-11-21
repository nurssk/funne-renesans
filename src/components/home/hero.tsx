import Link from "next/link";
import { hero } from "@/content/home";
import { HeroDemo } from "@/components/home/hero-demo";

// Home hero, "Centered" direction (docs/decisions/hero.md): centered serif headline,
// description and one button, then the product (the Command Center) in a 16:9 slot framed by the page's
// hairlines.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-canvas">
      <div className="frame">
        <div className="px-6 pb-16 pt-20 text-center lg:pb-20 lg:pt-28">
          <h1
            id="hero-title"
            className="intro-rise mx-auto max-w-[18ch] text-balance font-serif text-[48px] leading-[1.06] tracking-[-0.01em] sm:text-[64px] lg:text-[76px]"
          >
            {hero.headline}
          </h1>
          <p
            className="intro-rise mx-auto mt-6 max-w-[44ch] text-pretty text-[17px] leading-[1.5] text-ink-2 sm:text-[19px]"
            style={{ ["--delay" as string]: "80ms" }}
          >
            {hero.description}
          </p>
          <div className="intro-rise mt-8 flex flex-wrap justify-center gap-2.5" style={{ ["--delay" as string]: "160ms" }}>
            <Link href={hero.primary.href} className="btn btn-primary">
              {hero.primary.label}
            </Link>
          </div>
        </div>
      </div>

      {/* The product, framed like conversion.ai's demo: it fills the frame between its two vertical
          hairlines, and two full-width hairlines run along its top and bottom edges. */}
      <div className="border-y border-line">
        <div className="frame">
          <div className="intro-fade" style={{ ["--delay" as string]: "200ms" }}>
            <HeroDemo />
          </div>
        </div>
      </div>
    </section>
  );
}

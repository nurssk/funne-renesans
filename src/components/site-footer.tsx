import Link from "next/link";
import { footer } from "@/content/footer";
import { hero } from "@/content/home";
import { SYMBOL } from "@/components/footer-logo-paths";

// Site footer, "Potential" direction (docs/decisions/footer.md), after conversion.ai: a top row with the
// positioning line as a headline and Book a Call, a hairline, the five link groups in a single row, the copyright under
// a hairline, then the GoFunnel symbol as a large watermark that fades out toward the page end.
export function SiteFooter() {
  return (
    <footer className="bg-canvas">
      <div className="frame border-t border-line px-6 pt-20 lg:px-10">
        {/* Top row: the positioning line as a headline, and Book a Call. Side by side from 1024px. */}
        <div className="flex flex-col items-start gap-8 border-b border-line pb-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-balance font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[32px]">
            The infrastructure layer to scale profitably
          </p>
          <Link href={hero.primary.href} className="btn btn-primary shrink-0">
            {hero.primary.label}
          </Link>
        </div>

        {/* From 1024px the five groups share one row and spread across the frame. Groups size to their
            longest link, so labels never touch. */}
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-[repeat(3,max-content)] sm:gap-x-14 lg:grid-cols-[repeat(5,max-content)] lg:justify-between lg:gap-x-10">
            {footer.columns.map((c) => (
              <nav key={c.title} aria-label={c.title} className="min-w-0">
                <h2 className="text-[14px] font-medium text-ink">{c.title}</h2>
                <ul className="mt-3 flex flex-col">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="block py-1.5 text-[14px] leading-[1.4] text-ink-2 transition-colors duration-150 hover:text-ink sm:whitespace-nowrap"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-20 border-t border-line py-6 text-[13px] text-ink-3">{footer.copyright}</p>

        {/* Watermark: the GoFunnel symbol, fading from light grey to nothing toward the page end. */}
        <div aria-hidden className="pointer-events-none relative h-[clamp(200px,26vw,380px)] select-none overflow-hidden">
          <svg
            viewBox="80.5 80.5 184.8 160"
            className="absolute left-1/2 top-[8%] h-auto w-[clamp(280px,40vw,560px)] -translate-x-1/2"
          >
            <defs>
              <linearGradient id="gf-watermark-fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a1a19" stopOpacity="0.075" />
                <stop offset="0.4" stopColor="#1a1a19" stopOpacity="0.04" />
                <stop offset="0.72" stopColor="#1a1a19" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path fillRule="evenodd" clipRule="evenodd" d={SYMBOL} fill="url(#gf-watermark-fade)" />
          </svg>
        </div>
      </div>
    </footer>
  );
}

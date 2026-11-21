import Link from "next/link";
import { footer } from "@/content/footer";
import { hero } from "@/content/home";

// Site footer, "Potential" direction (docs/decisions/footer.md), after conversion.ai: a top row with the
// positioning line as a headline and Book a Call, a hairline, the five link groups in a single row, the copyright under
// a hairline. The large watermark symbol under it was removed and the spacing tightened (client: the footer
// was unnecessarily massive).
export function SiteFooter() {
  return (
    <footer className="bg-canvas">
      <div className="frame border-t border-line px-6 pt-14 lg:px-10">
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
        <div className="mt-10">
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

        <p className="mt-12 border-t border-line py-6 text-[13px] text-ink-3">{footer.copyright}</p>

      </div>
    </footer>
  );
}

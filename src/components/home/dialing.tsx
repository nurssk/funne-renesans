import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { dialing } from "@/content/dialing";
import { hero } from "@/content/home";
import { dialVisuals } from "@/components/home/dial-visuals";

// Dialing Infrastructure, "Platform" direction after conversion.ai's Core platform section
// (docs/decisions/dialing.md). Header with Book a Call on the right, then a hairline grid edge to edge of
// the frame: two wide cells, then three. Each cell: a lead phrase that runs on in grey, an arrow link, and
// a picture area holding that capability's visual (src/components/home/dial-visuals/): a product UI card
// on a grainy colour field.
export function Dialing() {
  const { headline, cells } = dialing;

  return (
    <section aria-labelledby="dialing-title" className="bg-canvas">
      <div className="frame border-t border-line">
        <div className="flex flex-col gap-8 px-6 pb-14 pt-16 sm:flex-row sm:items-end sm:justify-between lg:px-10 lg:pb-16 lg:pt-20">
          <div className="max-w-[640px] lg:max-w-none">
            <h2
              id="dialing-title"
              className="text-balance font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:whitespace-nowrap"
            >
              {headline}
            </h2>
          </div>
          <Link href={hero.primary.href} className="btn btn-primary btn-lg shrink-0 self-start sm:self-auto">
            {hero.primary.label}
          </Link>
        </div>

        <ul className="-mr-px grid border-t border-line sm:grid-cols-2 lg:grid-cols-6">
          {cells.map((c, i) => {
            const wide = i < 2;
            const Visual = dialVisuals[i];
            return (
              <li key={c.lead} className={`flex flex-col border-b border-r border-line ${wide ? "lg:col-span-3" : "lg:col-span-2"}`}>
                <div className="flex items-start justify-between gap-6 p-6 lg:px-8 lg:py-7">
                  <h3 className="max-w-[30ch] text-pretty text-[18px] leading-[1.35] tracking-[-0.01em] lg:text-[20px]">
                    <span className="font-medium text-ink">{c.lead}</span> <span className="text-ink-3">{c.rest}</span>
                  </h3>
                  <Link
                    href="/dialing-infrastructure"
                    aria-label={`${c.lead}: learn more`}
                    className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink-2 transition-colors duration-150 ease-out hover:text-ink"
                  >
                    <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                  </Link>
                </div>
                <div
                  aria-hidden
                  className={`mt-auto overflow-hidden border-t border-line ${wide ? "h-[300px] lg:h-[340px]" : "h-[260px] lg:h-[280px]"}`}
                >
                  {Visual && <Visual />}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="h-16 lg:h-24" />
      </div>
    </section>
  );
}

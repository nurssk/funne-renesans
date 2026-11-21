import Link from "next/link";
import { footer } from "@/content/footer";
import { hero } from "@/content/home";

// Site footer (docs/decisions/footer.md). Compact. The ground is the same painting the angels come from,
// Perugino's Baptism of Christ, blurred into its own light and colour under a deep teal wash that is dense on the
// left for the text and thin on the right, with a warm light where the angels stand
// (public/art/footer-field.jpg, 2400 x 760), so they stand in their own world. Light text on the left; on the right, the same kind of cut-outs as the hero's hands, from another painting: the two angels
// from Perugino's Baptism of Christ (1500-05, a predella panel, Art Institute of Chicago, public domain), each
// cut along its own contour with a soft shadow and no paper edge (public/art/angel-standing.webp 685 x 1075,
// angel-kneeling.webp 607 x 769), standing a little apart and overlapping like a collage. Phones: the angels
// sit under the text.
const groups = footer.columns.filter((c) => c.title !== "Solutions");

export function SiteFooter() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#11262a] text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/art/footer-field.jpg"
        alt=""
        aria-hidden
        loading="lazy"
        width={2400}
        height={760}
        className="pointer-events-none absolute inset-0 -z-10 size-full max-w-none select-none object-cover object-right"
      />
      <div className="frame relative border-x-white/10 px-6 pt-12 lg:px-10 lg:pt-14">
        <div className="relative z-10 lg:max-w-[64%]">
          <div className="flex flex-col items-start gap-6 border-b border-white/15 pb-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-balance font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-white sm:text-[30px]">
              The infrastructure layer to scale profitably
            </p>
            <Link href={hero.primary.href} className="btn btn-primary shrink-0">
              {hero.primary.label}
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
            {groups.map((c) => (
              <nav key={c.title} aria-label={c.title} className="min-w-0">
                <h2 className="text-[13px] font-medium text-white">{c.title}</h2>
                <ul className="mt-2.5 flex flex-col">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="block py-1 text-[13px] leading-[1.35] text-white/65 transition-colors duration-150 hover:text-white">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <p className="mt-10 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-white/15 py-6 text-[12.5px] text-white/50">
            <span>{footer.copyright}</span>
            <span>
              Angels: Perugino, <i>The Baptism of Christ</i>, c. 1500
            </span>
          </p>
        </div>

        {/* The angels: the standing one behind, the kneeling one in front and to its left. */}
        <div aria-hidden className="pointer-events-none relative mx-auto -mt-2 h-[340px] w-[330px] select-none lg:absolute lg:bottom-0 lg:right-[2%] lg:mt-0 lg:h-[350px] lg:w-[min(360px,30%)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/angel-standing.webp"
            alt=""
            loading="lazy"
            width={685}
            height={1075}
            className="absolute bottom-[-3%] right-0 h-[100%] w-auto max-w-none rotate-[2deg]"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/art/angel-kneeling.webp"
            alt=""
            loading="lazy"
            width={607}
            height={769}
            className="absolute bottom-[-4%] left-0 h-[68%] w-auto max-w-none -rotate-[3deg]"
          />
        </div>
      </div>
    </footer>
  );
}

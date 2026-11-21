import Link from "next/link";
import type { Menu } from "@/content/nav";

// Nav dropdown (docs/decisions/nav.md), after conversion.ai's menus:
// a glass rim (translucent, blurred, white inner edge) wrapping a solid card.
// Rows: icon, title, short description. Geometry: rim radius 22 − rim padding 6 = card 16;
// card 16 − card padding 8 = row 8. The panel sits at left: -14px so the first icon lines up
// with the trigger's label: 6 rim + 8 card + 12 row padding = 26 = 12 trigger padding + 14.
export function NavDropdown({ menu }: { menu: Menu }) {
  return (
    <div className="rounded-[22px] bg-white/45 p-1.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_0_0_1px_rgba(26,26,25,0.06),0_24px_48px_-20px_rgba(26,26,25,0.28)] backdrop-blur-xl backdrop-saturate-150">
      <div className="rounded-[16px] bg-canvas-2 p-2 shadow-[0_0_0_1px_rgba(26,26,25,0.07)]">
        <div className="flex gap-2">
          {menu.groups.map((g) => (
            <div key={g.label} className="w-[248px] min-w-0 xl:w-[300px]">
              {g.href ? (
                <Link href={g.href} className="block w-fit px-3 pb-2 pt-3 text-[13px] text-ink-3 transition-colors duration-150 hover:text-ink">
                  {g.label}
                </Link>
              ) : (
                <p className="px-3 pb-2 pt-3 text-[13px] text-ink-3">{g.label}</p>
              )}
              <ul>
                {g.items.map((it) => (
                  <li key={it.title}>
                    <Link
                      href={it.href}
                      className={`flex gap-3 rounded-[8px] px-3 py-2 transition-colors duration-150 hover:bg-ink/[0.05] focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ink/40 ${it.desc ? "items-start" : "items-center"}`}
                    >
                      <it.icon aria-hidden size={18} strokeWidth={1.5} className={`shrink-0 text-ink-2 ${it.desc ? "mt-[2px]" : ""}`} />
                      <span className="min-w-0">
                        <span className="block text-[14.5px] leading-[1.35] text-ink">{it.title}</span>
                        {it.desc && <span className="mt-0.5 block text-[13.5px] leading-[1.4] text-ink-3">{it.desc}</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

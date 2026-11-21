"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { dialing } from "@/content/dialing";
import { hero } from "@/content/home";
import { dialVisuals } from "@/components/home/dial-visuals";

// Dialing Infrastructure (docs/decisions/dialing.md), "one stage": the header with Book a Call, then one wide
// stage on its painted field showing a single capability's live visual at a larger size, and under it the five
// capabilities as a row of tabs (roman numeral, lead phrase, the rest in grey). The row plays on its own: the
// selected tab's ink rule fills along its top over TURN ms, then the next capability takes over; hovering the
// stage or the row pauses it, a click picks one and restarts its time. The visual is remounted on every change
// so its own loop starts from the top, and fades in. Reduced motion: no auto-advance.

const ROMAN = ["I", "II", "III", "IV", "V"];

export function Dialing() {
  const { headline, cells } = dialing;
  const [current, setCurrent] = useState(0);
  const [round, setRound] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = visible && !hovered;
  const pick = (i: number) => {
    setCurrent(i);
    setRound((r) => r + 1);
  };
  const next = () => pick((current + 1) % cells.length);
  const hold = {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(true);
    },
    onPointerLeave: () => setHovered(false),
  };
  const Visual = dialVisuals[current];

  return (
    <section ref={section} aria-labelledby="dialing-title" className="bg-canvas">
      <div className="frame border-t border-line">
        <div className="flex flex-col gap-8 px-6 pb-12 pt-16 sm:flex-row sm:items-end sm:justify-between lg:px-10 lg:pb-14 lg:pt-20">
          <h2
            id="dialing-title"
            className="max-w-[640px] text-balance font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:max-w-none lg:whitespace-nowrap"
          >
            {headline}
          </h2>
          <Link href={hero.primary.href} className="btn btn-primary btn-lg shrink-0 self-start sm:self-auto">
            {hero.primary.label}
          </Link>
        </div>

        {/* The stage: one capability, live, larger. */}
        <div {...hold} aria-hidden className="relative h-[340px] overflow-hidden border-t border-line sm:h-[420px] lg:h-[480px]">
          <div key={`${current}-${round}`} className="dial-stage-in absolute inset-0 [zoom:1] sm:[zoom:1.2] lg:[zoom:1.4]">
            {Visual && <Visual />}
          </div>
        </div>

        {/* The five capabilities: the controls. */}
        <div {...hold} role="group" aria-label="Show the dialer doing" className="-mr-px grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {cells.map((c, i) => {
            const on = i === current;
            return (
              <button
                key={c.lead}
                type="button"
                aria-pressed={on}
                onClick={() => pick(i)}
                className={`group relative cursor-pointer border-b border-r border-line p-5 text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink lg:px-6 lg:py-6 ${
                  on ? "bg-ink/[0.025]" : "hover:bg-ink/[0.02]"
                }`}
              >
                <span aria-hidden className="absolute inset-x-0 -top-px h-0.5 bg-ink/[0.07]" />
                {on && (
                  <span
                    key={`${current}-${round}`}
                    aria-hidden
                    onAnimationEnd={next}
                    className="dial-progress absolute inset-x-0 -top-px h-0.5 bg-ink"
                    style={{ animationPlayState: running ? "running" : "paused" }}
                  />
                )}
                <span className={`block font-serif text-[15px] italic tracking-[0.08em] transition-colors duration-150 ${on ? "text-ink" : "text-ink-3 group-hover:text-ink-2"}`}>
                  {ROMAN[i]}
                </span>
                <span className="mt-2 block text-pretty text-[16px] leading-[1.35] tracking-[-0.01em] lg:text-[17px]">
                  <span className={`font-medium transition-colors duration-150 ${on ? "text-ink" : "text-ink-2 group-hover:text-ink"}`}>{c.lead}</span>{" "}
                  <span className={`transition-colors duration-150 ${on ? "text-ink-2" : "text-ink-3"}`}>{c.rest}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-16 lg:h-24" />
      </div>
    </section>
  );
}

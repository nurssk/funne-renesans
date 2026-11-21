"use client";
import { useEffect, useRef } from "react";
import { ArrowUp, Play } from "lucide-react";
import { creatives, money, type Creative } from "@/content/prospect-demo";

// Step 02 interface, "Grid" direction (docs/decisions/prospect.md): the app's creative grid on the GoFunnel
// design system (render inside a .gf-ds element). Three ad cards, the one this lead saw in the middle,
// outlined, tagged and in front; the other two sit behind it. Only her creative plays: muted, looped,
// and only while the step is active and on screen. The other two hold a still frame. Every frame carries
// its length in a small chip, the way an ad library shows video. Reduced motion: nothing plays.

const [hers, ...rest] = [...creatives.slice(0, 3)].sort((a, b) => Number(!!b.hers) - Number(!!a.hers));
const order = [rest[0], hers, rest[1]]; // hers in the centre
const length: Record<string, string> = { c1: "0:45", c2: "0:50", c3: "1:07" };

function Frame({ c, playing }: { c: Creative; playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Play only while the step is active, the frame is on screen and motion is allowed.
  useEffect(() => {
    const video = ref.current;
    if (!video || !c.video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!playing || reduce) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    io.observe(video);
    return () => {
      io.disconnect();
      video.pause();
    };
  }, [playing, c.video]);

  return (
    // Card radius 12 minus 6px padding: the frame's corners sit concentric with the card's.
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-small)] bg-[var(--color-grey-800)]">
      {c.video ? (
        <video
          ref={ref}
          src={c.video}
          poster={c.still}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        c.still && (
          // eslint-disable-next-line @next/next/no-img-element -- a 480px still, already sized for this card
          <img src={c.still} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        )
      )}
      <span className="caption absolute bottom-1.5 left-1.5 flex h-5 items-center gap-1 rounded-[var(--radius-xsmall)] bg-[var(--color-grey-950)]/60 px-1.5 tabular-nums text-[var(--color-content-inverse)]">
        <Play aria-hidden className="size-2.5 fill-current" strokeWidth={0} />
        {length[c.id]}
      </span>
    </div>
  );
}

// Depth: her card comes forward (a touch larger, on top, lifted by a soft layered shadow); the other two
// step back (smaller, slid in under her edges, slightly blurred). Wider screens: three columns, the side
// cards slide toward her. Phones: all three share one grid cell, hers centred in front and the other two
// peeking out on either side.
const CELL = "col-start-1 row-start-1 sm:col-start-auto sm:row-start-auto";
const FRONT =
  "relative z-10 w-[66%] scale-[1.05] outline outline-2 -outline-offset-1 outline-[var(--color-border-focus)] shadow-[0_1px_2px_rgba(10,10,10,0.06),0_12px_32px_-8px_rgba(10,10,10,0.22)] sm:w-auto";
const BACK = "pointer-events-none relative z-0 w-[56%] scale-[0.9] blur-[2px] select-none sm:w-auto";
const BACK_LEFT = "justify-self-start sm:justify-self-auto sm:translate-x-10";
const BACK_RIGHT = "justify-self-end sm:justify-self-auto sm:-translate-x-10";

export function StepCreatives({ active }: { active: boolean; animate?: boolean }) {
  return (
    <ul className="grid w-full max-w-[760px] grid-cols-1 items-center justify-items-center sm:grid-cols-3 sm:justify-items-stretch sm:gap-3">
      {order.map((c, i) => (
        <li
          key={c.id}
          className={`card overflow-hidden p-1.5 ${CELL} ${c.hers ? FRONT : `${BACK} ${i === 0 ? BACK_LEFT : BACK_RIGHT}`}`}
        >
          <Frame c={c} playing={active} />
          <div className="px-1 pb-1.5 pt-3">
            <div className="c-primary sm:truncate">{c.name}</div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {c.hers ? (
                <>
                  <span className="tag tag-accent">Constance saw this</span>
                  <span className="tag tag-positive">
                    <ArrowUp aria-hidden className="size-3" strokeWidth={2} />
                    Top by cash
                  </span>
                </>
              ) : (
                <span className="tag tag-neutral">{c.hookType} hook</span>
              )}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {[
                ["Spend", money(c.spend)],
                ["Calls", String(c.calls)],
                ["Cash", money(c.cash)],
              ].map(([k, v]) => (
                <div key={k} className={`min-w-0 ${k === "Calls" ? "hidden sm:block" : ""}`}>
                  <dt className="caption c-secondary">{k}</dt>
                  <dd className="truncate tabular-nums c-primary">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </li>
      ))}
    </ul>
  );
}

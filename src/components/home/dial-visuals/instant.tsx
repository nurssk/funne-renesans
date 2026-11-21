"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { PhoneCall, PhoneOutgoing } from "lucide-react";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Dialer cell 1, "Instant dialing for every new lead, the moment it lands." One live call card on a cool sky
// field: the lead the dialer is ringing right now, and under it the seconds between her form landing and
// the first dial. The call tag is the only coloured element, so it is the focal point.
// Motion, the seconds count (one story loop, ~7.8s): the log builds itself, four rows landing 800ms apart,
// each offset rolling up into place as its row lands; then the tag lands on "Calling 0:01", ticks to 0:02
// and flips to Connected. The finished card holds 2.5s, its rows and tag fade out (180ms) and it starts over.
// Runs only while the cell is at least 40% on screen and the tab is visible; otherwise it rests on the
// finished card and restarts from the top when it comes back. Reduced motion: the finished card, no loop.

const steps = [
  { label: "Form submitted", at: "0s" },
  { label: "Contact created in HubSpot", at: "1s" },
  { label: "Assigned to Marcus Reyes", at: "2s" },
  { label: "Dialing from a local 512 number", at: "3s" },
];

// 0 = no tag yet, 1 = Calling, 2 = Connected
type Frame = { rows: number; tag: 0 | 1 | 2; secs: number; fading: boolean };

const DONE: Frame = { rows: 4, tag: 2, secs: 2, fading: false };
const BLANK: Frame = { rows: 0, tag: 0, secs: 1, fading: false };

// One cycle, as [ms from cycle start, frame]. The cycle restarts at CYCLE, which fades the finished card.
const TIMELINE: [number, Frame][] = [
  [0, { ...DONE, fading: true }],
  [220, BLANK],
  [400, { ...BLANK, rows: 1 }],
  [1200, { ...BLANK, rows: 2 }],
  [2000, { ...BLANK, rows: 3 }],
  [2800, { ...BLANK, rows: 4 }],
  [3500, { rows: 4, tag: 1, secs: 1, fading: false }],
  [4500, { rows: 4, tag: 1, secs: 2, fading: false }],
  [5300, DONE],
];
const CYCLE = 7800;

const ENTER = "cubic-bezier(0.23, 1, 0.32, 1)";
const EXIT = "cubic-bezier(0.4, 0, 1, 1)";

function useSecondsLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<Frame>(DONE);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timers: number[] = [];
    let inView = false;
    let running = false;

    const clear = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };
    const cycle = () => {
      clear();
      for (const [at, f] of TIMELINE) timers.push(window.setTimeout(() => setFrame(f), at));
      timers.push(window.setTimeout(cycle, CYCLE));
    };
    const sync = () => {
      const shouldRun = inView && document.visibilityState === "visible";
      if (shouldRun === running) return;
      running = shouldRun;
      clear();
      if (shouldRun) cycle();
      else setFrame(DONE);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      clear();
    };
  }, []);

  return { ref, frame };
}

// A transient element is shown (enter), fading out with the finished card (exit), or waiting off stage
// (no transition, so it can be put back at its start offset invisibly).
function reveal(shown: boolean, fading: boolean, from: string, delay = 0): CSSProperties {
  if (fading) return { opacity: 0, transition: `opacity 180ms ${EXIT}` };
  if (shown)
    return {
      opacity: 1,
      transform: "none",
      transition: `opacity 240ms ${ENTER} ${delay}ms, transform 240ms ${ENTER} ${delay}ms`,
    };
  return { opacity: 0, transform: from, transition: "none" };
}

export function DialInstant() {
  const { ref, frame } = useSecondsLoop();
  const { rows, tag, secs, fading } = frame;

  return (
    <div ref={ref} className="gf-ds @container relative size-full select-none overflow-hidden">
      <BgFrame seed={11}>
        {/* Base: powder blue, lighter at the top left */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #d6e6f2 0%, #a9c8e0 48%, #8fb3cf 100%)" }}
        />
        {/* Dusty steel blue pooled along the right edge */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(42% 95% at 106% 58%, rgba(74,106,138,0.9) 0%, rgba(104,136,166,0.55) 45%, rgba(140,170,196,0) 100%)",
          }}
        />
        {/* Near-white glow behind the card's top left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 46% at 16% 6%, rgba(250,251,250,0.85) 0%, rgba(232,241,248,0.45) 45%, rgba(220,234,245,0) 100%)",
          }}
        />
        {/* A faint warm floor so the field sits on the page's canvas */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 30% 108%, rgba(244,240,232,0.7) 0%, rgba(236,234,228,0.3) 50%, rgba(236,234,228,0) 100%)",
          }}
        />
      </BgFrame>

      {/* Centred, 28px from the top, running on past the bottom edge. */}
      <div
        className="card absolute inset-x-0 top-[28px] -bottom-4 mx-auto w-[calc(100%-40px)] overflow-hidden sm:w-[min(calc(100%-56px),480px)]"
        style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.18)" }}
      >
        {/* The call */}
        <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
          <span className="hidden size-8 shrink-0 items-center justify-center rounded-full surface c-secondary @lg:flex">
            <PhoneOutgoing aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap c-primary">Constance Waverly-Ashford</div>
            <div className="caption whitespace-nowrap c-secondary">(512) 555-0147, Austin, TX</div>
          </div>
          {/* Both tags share one grid cell, right aligned, so the swap never moves the name. */}
          <span className="grid shrink-0 justify-items-end">
            <span
              data-anim
              className="tag tag-accent tabular-nums [grid-area:1/1] origin-right"
              style={
                tag === 2
                  ? { opacity: 0, transition: `opacity 150ms ${EXIT}` }
                  : reveal(tag === 1, fading, "scale(0.96)")
              }
            >
              Calling 0:0{secs}
            </span>
            <span
              data-anim
              className="tag tag-positive tabular-nums [grid-area:1/1] origin-right"
              style={reveal(tag === 2, fading, "scale(0.96)", 60)}
            >
              <PhoneCall aria-hidden className="size-3" strokeWidth={2} />
              Connected
            </span>
          </span>
        </div>

        {/* The seconds since her form landed */}
        <ul>
          {steps.map((s, i) => (
            <li key={s.at} className="flex h-11 items-center justify-between gap-4 border-b hairline px-4 last:border-b-0">
              <span data-anim className="whitespace-nowrap c-primary" style={reveal(i < rows, fading, "translateY(4px)")}>
                {s.label}
              </span>
              {/* The offset rolls up into its slot, clipped, a beat after its label. */}
              <span data-anim className="w-8 shrink-0 overflow-hidden text-right tabular-nums c-tertiary" style={reveal(i < rows, fading, "none")}>
                <span data-anim className="block" style={reveal(i < rows, fading, "translateY(100%)", 60)}>
                  {s.at}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

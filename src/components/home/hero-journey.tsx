"use client";
import { useEffect, useRef, useState } from "react";
import { journey } from "@/content/home";

// The path between the two halves of the headline (docs/decisions/hero.md), painted like a route on an old
// map, straight on the clouds. A hand cut out of a Renaissance painting along its own contour (the brush,
// the fingers, the lace cuff, with a thin torn paper edge) paints the road from left to right, Creative to Lifetime value; each
// waypoint's mark fills and its name turns to ink as the brush passes, and the italic line underneath reads
// that step's note. The finished road holds, then a second cut-out hand, holding a white cloth, travels back
// along the road and wipes the paint off, rests, and the first hand starts again (about 13s a cycle).
// Click a waypoint and a hand goes there instead: the cloth wipes the road back to it, or the brush paints on
// up to it; it stays for six seconds, then the loop carries on from that point.
// The line is brushwork, not a vector hairline: a soft ink body, a bristle-streak pattern on top and a thin
// offset stroke that wanders off it, all revealed through one mask whose dash offset is the animation. No SVG
// filters. One rAF loop writes two attributes a frame; it runs only while the road is on screen and the tab
// is visible. Reduced motion: the finished road, no hand.

const W = 1000;
const H = 150;
const INK = "#2b241d";
const SEPIA = "#6b5a48";
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII"];

// The road: a lead-in, the seven waypoints (alternating high and low), a lead-out.
const ys = [96, 44, 92, 40, 90, 46, 88];
const nodes = ys.map((y, i) => ({ x: 70 + i * ((W - 140) / 6), y }));
const pts = [{ x: 8, y: 70 }, ...nodes, { x: W - 8, y: 58 }];

type P = { x: number; y: number };
const r = (n: number) => Math.round(n * 10) / 10;

// Catmull-Rom through the points, as cubic Béziers.
function curve(points: P[]) {
  const segs = points.slice(0, -1).map((p1, i) => {
    const p0 = points[i - 1] ?? p1;
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    return {
      p1,
      c1: { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 },
      c2: { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 },
      p2,
    };
  });
  const d =
    `M${r(points[0].x)} ${r(points[0].y)}` +
    segs.map((s) => `C${r(s.c1.x)} ${r(s.c1.y)} ${r(s.c2.x)} ${r(s.c2.y)} ${r(s.p2.x)} ${r(s.p2.y)}`).join("");
  return { segs, d };
}
const road = curve(pts);
const D = road.d;

// How far along the road each waypoint is (0..1), by sampling the curve. Rounded: the server and the browser
// disagree in the 15th decimal, which breaks hydration.
const at = (a: P, b: P, c: P, d: P, t: number): P => {
  const u = 1 - t;
  return {
    x: u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x,
    y: u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y,
  };
};
const lengths = road.segs.map((s) => {
  let len = 0;
  let prev = s.p1;
  for (let k = 1; k <= 24; k++) {
    const p = at(s.p1, s.c1, s.c2, s.p2, k / 24);
    len += Math.hypot(p.x - prev.x, p.y - prev.y);
    prev = p;
  }
  return len;
});
const total = lengths.reduce((a, b) => a + b, 0);
const progress = nodes.map((_, i) => Math.round((lengths.slice(0, i + 1).reduce((a, b) => a + b, 0) / total) * 1e4) / 1e4);

// A fixed pseudo-random sequence (integers only, so server and browser agree).
function lcg(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

// A second stroke that wanders a hair off the road, like a brush that was not held perfectly still.
const wander = (() => {
  const rnd = lcg(11);
  return curve(pts.map((p, i) => (i === 0 || i === pts.length - 1 ? p : { x: p.x + (rnd() - 0.5) * 5, y: p.y + (rnd() - 0.5) * 3.2 }))).d;
})();

// Bristle streaks: short horizontal dashes of ink with gaps, tiled along the stroke.
const TILE_W = 64;
const TILE_H = 8;
const streaks = (() => {
  const rnd = lcg(5);
  return Array.from({ length: 26 }, () => ({
    x: Math.round(rnd() * TILE_W),
    y: Math.round(rnd() * (TILE_H - 1) * 10) / 10,
    w: Math.round(6 + rnd() * 22),
    h: Math.round((0.5 + rnd() * 0.9) * 10) / 10,
    o: Math.round((0.35 + rnd() * 0.6) * 100) / 100,
  }));
})();

// The hand, cut out along its contour (public/art/hero-hand.png, 552 x 528, brush tip at 74, 123), in road units.
const HAND_SCALE = 190 / 552;
const HAND = { w: 190, h: Math.round(528 * HAND_SCALE * 10) / 10, tipX: Math.round(74 * HAND_SCALE * 10) / 10, tipY: Math.round(123 * HAND_SCALE * 10) / 10 };
// The other hand, holding a cloth (public/art/hero-hand-cloth.png, 552 x 405); the cloth and fingertips, at
// 131, 196, are what wipes.
const CLOTH = { w: 190, h: Math.round(405 * HAND_SCALE * 10) / 10, tipX: Math.round(131 * HAND_SCALE * 10) / 10, tipY: Math.round(196 * HAND_SCALE * 10) / 10 };

// One cycle: paint, hold, wipe, rest.
const PAINT = 6400;
const HOLD = 2600;
const WIPE = 2600;
const REST = 1100;
const IDLE = 6000; // how long the road stays where a click sent it before the loop carries on
const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const glow = "[text-shadow:0_0_14px_rgba(250,249,247,0.95),0_0_4px_rgba(250,249,247,0.8)]";

export function HeroJourney() {
  const last = journey.length - 1;
  const root = useRef<HTMLDivElement>(null);
  const reveal = useRef<SVGPathElement>(null);
  const brush = useRef<SVGGElement>(null);
  const cloth = useRef<SVGGElement>(null);
  const goTo = useRef<((i: number) => void) | null>(null);
  // How many waypoints the paint has reached: -1 none, 6 all. Server render and reduced motion: all.
  const [reached, setReached] = useState(last);

  useEffect(() => {
    const el = root.current;
    const path = reveal.current;
    const tip = brush.current;
    const rag = cloth.current;
    if (!el || !path || !tip || !rag) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = path.getTotalLength();
    let raf = 0;
    let prev = 0;
    let clock = 0; // runs only while the road is on screen, so pauses do not skip the story
    let shown = last;
    let onScreen = false;

    // The story is a chain of moves (the paint runs to a point) and waits. On its own it loops paint, hold,
    // wipe, rest. A click on a waypoint cuts in: the paint runs or is wiped to that waypoint, stays there for
    // IDLE, and the loop picks up from where it stands.
    let p = 0;
    let tool: "brush" | "cloth" = "brush";
    let move: { from: number; to: number; start: number; dur: number } | null = null;
    let waitUntil = 0;
    let swap: { at: number; tool: "brush" | "cloth" } | null = null; // change hands a moment before a wait ends
    let phase = 0; // what the loop does next: 0 paint, 1 hold, 2 wipe, 3 rest
    let manual = false;

    const go = (to: number, full: number) => {
      const dist = Math.abs(to - p);
      if (dist < 0.002) return false;
      tool = to > p ? "brush" : "cloth";
      swap = null;
      move = { from: p, to, start: clock, dur: Math.max(520, full * dist) };
      return true;
    };
    const advance = () => {
      // Run loop phases until one of them takes time.
      for (let guard = 0; guard < 4; guard++) {
        const now = phase;
        phase = (phase + 1) % 4;
        if (now === 0 && go(1, PAINT)) return;
        if (now === 1) {
          waitUntil = clock + HOLD;
          swap = { at: waitUntil - 350, tool: "cloth" };
          return;
        }
        if (now === 2 && go(0, WIPE)) return;
        if (now === 3) {
          waitUntil = clock + REST;
          swap = { at: waitUntil - 450, tool: "brush" };
          return;
        }
      }
    };
    goTo.current = (i: number) => {
      manual = true;
      waitUntil = 0;
      if (!go(progress[i], progress[i] > p ? PAINT : WIPE)) {
        // already there: just stay a while
        move = null;
        waitUntil = clock + IDLE;
        phase = 0;
        manual = false;
      }
    };

    const frame = (now: number) => {
      clock += prev ? Math.min(50, now - prev) : 0;
      prev = now;
      if (move) {
        const k = Math.min(1, (clock - move.start) / move.dur);
        p = move.from + (move.to - move.from) * ease(k);
        if (k >= 1) {
          move = null;
          if (manual) {
            manual = false;
            waitUntil = clock + IDLE;
            phase = 0; // then paint on from here
          } else advance();
        }
      } else {
        if (swap && clock >= swap.at) {
          tool = swap.tool;
          swap = null;
        }
        if (clock >= waitUntil) advance();
      }

      path.setAttribute("stroke-dashoffset", (1 - p).toFixed(4));
      const pt = path.getPointAtLength(p * length);
      // The hand leans a little with the slope of the road, like a wrist following the stroke.
      const ahead = path.getPointAtLength(Math.min(length, p * length + 8));
      const behind = path.getPointAtLength(Math.max(0, p * length - 8));
      const lean = Math.max(-9, Math.min(9, (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI * 0.3));
      tip.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)}) rotate(${lean.toFixed(1)})`);
      // The cloth rubs as it goes: a small, quick rock on top of the lean.
      const rub = move && tool === "cloth" ? Math.sin(clock / 70) * 3.5 : 0;
      rag.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${(pt.y + rub * 0.5).toFixed(1)}) rotate(${(lean + rub).toFixed(1)})`);
      // One hand at a time; the opacity transition on each makes the hand-over a short crossfade.
      tip.style.opacity = tool === "brush" ? "1" : "0";
      rag.style.opacity = tool === "cloth" ? "1" : "0";
      let n = -1;
      for (let i = 0; i < progress.length; i++) if (p >= progress[i] - 0.004) n = i;
      if (n !== shown) {
        shown = n;
        setReached(n);
      }
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      const run = onScreen && document.visibilityState === "visible";
      if (run && !raf) {
        prev = 0;
        raf = requestAnimationFrame(frame);
      }
      if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(raf);
      goTo.current = null;
    };
  }, [last]);

  // A click on a waypoint. With the loop running it sends a hand there; under reduced motion (no loop, no
  // hands) the road simply shows up to that waypoint.
  const pick = (i: number) => {
    if (goTo.current) return goTo.current(i);
    reveal.current?.setAttribute("stroke-dashoffset", (1 - progress[i]).toFixed(4));
    setReached(i);
  };

  const step = journey[Math.max(reached, 0)];

  return (
    <div ref={root} className="pointer-events-none absolute inset-x-4 bottom-7 mx-auto max-w-[1080px] select-none">
      <div className="relative" style={{ aspectRatio: `${W} / ${H}` }}>
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" fill="none">
          <defs>
            <pattern id="gf-bristle" width={TILE_W} height={TILE_H} patternUnits="userSpaceOnUse">
              {streaks.map((s, i) => (
                <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.h / 2} fill={INK} opacity={s.o} />
              ))}
              {/* the same streaks again one tile to the left, so they wrap across the seam */}
              {streaks.map((s, i) => (
                <rect key={`w${i}`} x={s.x - TILE_W} y={s.y} width={s.w} height={s.h} rx={s.h / 2} fill={INK} opacity={s.o} />
              ))}
            </pattern>
            <mask id="gf-road-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <path ref={reveal} d={D} pathLength={1} stroke="#fff" strokeWidth="16" strokeLinecap="round" strokeDasharray="1" strokeDashoffset="0" />
            </mask>
          </defs>

          {/* The road ahead: a faint dotted guide. */}
          <path d={D} stroke={SEPIA} strokeWidth="1.4" strokeLinecap="round" strokeDasharray="0.1 8" opacity="0.5" />

          {/* The painted road. */}
          <g mask="url(#gf-road-reveal)">
            <path d={D} stroke={INK} strokeWidth="3.2" strokeLinecap="round" opacity="0.32" />
            <path d={D} stroke="url(#gf-bristle)" strokeWidth="4.2" strokeLinecap="round" />
            <path d={wander} stroke={INK} strokeWidth="0.9" strokeLinecap="round" opacity="0.55" />
          </g>

        </svg>

        <ol aria-label="From the ad they saw to the money they paid" className="absolute inset-0">
          {journey.map((s, i) => {
            const passed = i <= reached;
            const current = i === reached;
            return (
              <li
                key={s.step}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(nodes[i].x / W) * 100}%`, top: `${(nodes[i].y / H) * 100}%` }}
              >
                <button
                  type="button"
                  aria-label={`${s.step}: ${s.note}`}
                  onClick={() => pick(i)}
                  className="group pointer-events-auto relative flex size-11 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-teal-700"
                >
                <span
                  aria-hidden
                  className={`absolute bottom-full font-serif text-[12px] tracking-[0.12em] transition-colors duration-300 sm:text-[13px] ${glow}`}
                  style={{ color: passed ? INK : SEPIA }}
                >
                  {NUMERALS[i]}
                </span>
                {/* The mark: a small ink diamond; hollow until the paint reaches it, ringed while it is the newest. */}
                <span
                  aria-hidden
                  className={`size-[11px] rotate-45 border-[1.5px] transition-[background-color,box-shadow,scale] duration-300 group-hover:scale-150 ${
                    current ? "scale-125 shadow-[0_0_0_4px_rgba(250,249,247,0.9),0_0_0_5.5px_rgba(43,36,29,0.8)]" : ""
                  }`}
                  style={{ borderColor: INK, backgroundColor: passed ? INK : "#faf9f7" }}
                />
                <span
                  aria-hidden
                  className={`absolute top-full hidden whitespace-nowrap font-serif text-[17px] leading-none transition-colors duration-300 sm:block ${glow} ${
                    current ? "italic" : ""
                  }`}
                  style={{ color: passed ? INK : SEPIA }}
                >
                  {s.step}
                </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* The hand rides above the marks and their names. */}
        <svg aria-hidden viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
          {/* The hand: cut out of Sofonisba Anguissola's Self-Portrait at the Easel (1556), the tip of her brush
              at the origin. */}
          <g ref={brush} style={{ opacity: 0, transition: "opacity 320ms ease-out" }}>
            <image href="/art/hero-hand.png" x={-HAND.tipX} y={-HAND.tipY} width={HAND.w} height={HAND.h} />
          </g>
          {/* The hand that wipes: cut out of Michele Tosini's Portrait of a Lady (about 1555), mirrored, a white
              handkerchief in its fingers. */}
          <g ref={cloth} style={{ opacity: 0, transition: "opacity 320ms ease-out" }}>
            <image href="/art/hero-hand-cloth.png" x={-CLOTH.tipX} y={-CLOTH.tipY} width={CLOTH.w} height={CLOTH.h} />
          </g>
        </svg>
      </div>
      <p
        aria-hidden
        className={`mt-5 text-center font-serif text-[17px] italic leading-[1.35] transition-opacity duration-300 sm:mt-7 sm:text-[19px] ${glow} ${
          reached < 0 ? "opacity-0" : "opacity-100"
        }`}
        style={{ color: INK }}
      >
        <span className="not-italic sm:hidden">{step.step}. </span>
        {step.note}
      </p>
    </div>
  );
}

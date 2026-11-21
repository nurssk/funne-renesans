"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { MapPin, ShieldCheck } from "lucide-react";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";
import { lead } from "@/content/prospect-demo";

// Dialer cell visual, "Local numbers on our own carrier network, so people pick up."
// One caller ID card: Constance is a new lead in Austin, and the dialer rings her from a 512 number on
// GoFunnel's own carrier. Her number and the caller ID sit in one right-aligned tabular column so the two
// area codes line up; those two "512"s are the only accent-coloured text, which makes the match the focal
// point. The card bleeds off the bottom edge of the picture area. The header icon shows only when the cell is
// at least 400px wide, so the full name never has to truncate.
// Colour field: sea-mist green into pale teal, warped and grained by BgFrame.
// Motion, the number goes local (one story loop, ~7s): the caller ID starts on a generic (800) number; its
// area code rolls like an odometer to (512); the moment it lands both 512s light up together as the match,
// then "Not flagged" lands. The finished card holds 3s, the accents and tag fade out (180ms), the area code
// rolls back to (800) and it starts over. Runs only while the cell is at least 40% on screen and the tab is
// visible; otherwise it rests on the finished card and restarts from the top when it comes back. Reduced
// motion: the finished card, no loop.
// Illustration data only; numbers use the 555 fictional range.

const SHADOW = "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.18)";
const ACCENT = "var(--color-content-accent)";
const EASE_IN = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";

// generic: (800), no accents, no tag. roll: area code rolls to (512). match: both 512s light up.
// done: "Not flagged" lands (the resting frame). fade: accents and tag fade out before the roll back.
type Phase = "generic" | "roll" | "match" | "done" | "fade";
const NEXT: Record<Phase, [next: Phase, holdMs: number]> = {
  done: ["fade", 3000],
  fade: ["generic", 220],
  generic: ["roll", 2600],
  roll: ["match", 500],
  match: ["done", 420],
};
// On coming into view the card is already on its finished frame; hold it briefly, then start the cycle.
const FIRST_HOLD = 1200;

const FROM_AREA = "800";
const TO_AREA = "512";

// Accent highlight as a cross-fade of two stacked copies (opacity only, no colour transition).
function Lit({ on, children }: { on: boolean; children: ReactNode }) {
  const t = on ? `opacity 260ms ${EASE_IN}` : "opacity 180ms ease-in";
  return (
    <span className="relative inline-block">
      <span data-anim style={{ opacity: on ? 0 : 1, transition: t }}>
        {children}
      </span>
      <span data-anim aria-hidden className="absolute inset-0" style={{ color: ACCENT, opacity: on ? 1 : 0, transition: t }}>
        {children}
      </span>
    </span>
  );
}

// One odometer column: the old digit slides up and out while the new one slides up from below, clipped to
// the line. An invisible in-flow digit holds the width (tabular-nums), so nothing around it moves.
function Digit({ from, to, local, lit, i }: { from: string; to: string; local: boolean; lit: boolean; i: number }) {
  const move: CSSProperties = { transition: `transform 380ms ${EASE_MOVE} ${i * 50}ms`, willChange: "transform" };
  return (
    <span className="relative inline-block" style={{ clipPath: "inset(0 -2px)" }}>
      <span className="invisible">{to}</span>
      <span data-anim className="absolute inset-0" style={{ ...move, transform: local ? "translateY(-100%)" : "translateY(0)" }}>
        {from}
      </span>
      <span data-anim className="absolute inset-0" style={{ ...move, transform: local ? "translateY(0)" : "translateY(100%)" }}>
        <Lit on={lit}>{to}</Lit>
      </span>
    </span>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li className="flex h-11 items-center justify-between gap-4 border-b hairline px-4">
      <span className="whitespace-nowrap c-secondary">{label}</span>
      {children}
    </li>
  );
}

function Field() {
  return (
    <BgFrame seed={23} src="/backgrounds/local-numbers.webp">
      {/* Base: sea-mist green into pale teal, top-left to bottom-right */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(150deg, #cfe5d8 0%, #b6dad2 50%, #98c6c2 100%)" }} />
      {/* Pale teal bloom, top right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 60% at 94% 6%, rgba(138,198,202,0.95) 0%, rgba(150,202,202,0.5) 45%, rgba(160,206,204,0) 100%)",
        }}
      />
      {/* Mist green pool, bottom left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 58% at 4% 96%, rgba(178,214,190,0.95) 0%, rgba(190,220,200,0.45) 50%, rgba(190,220,200,0) 100%)",
        }}
      />
      {/* Deeper brand-teal shade along the bottom right, for depth under the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(44% 50% at 90% 104%, rgba(93,155,163,0.55) 0%, rgba(93,155,163,0.2) 50%, rgba(93,155,163,0) 100%)",
        }}
      />
      {/* Soft light behind the card's header */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 36% at 40% 34%, rgba(244,249,245,0.7) 0%, rgba(240,247,243,0.25) 55%, rgba(240,247,243,0) 100%)",
        }}
      />
    </BgFrame>
  );
}

export function DialLocalNumbers() {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("done");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let running = false;
    let inView = false;

    const go = (p: Phase) => {
      setPhase(p);
      const [next, hold] = NEXT[p];
      timer = window.setTimeout(() => go(next), hold);
    };
    const start = () => {
      running = true;
      timer = window.setTimeout(() => go("fade"), FIRST_HOLD);
    };
    const stop = () => {
      running = false;
      window.clearTimeout(timer);
      setPhase("done");
    };
    const sync = () => {
      const should = inView && !document.hidden && !reduce.matches;
      if (should && !running) start();
      else if (!should && running) stop();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio >= 0.4;
        sync();
      },
      { threshold: [0, 0.4] },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, []);

  const local = phase !== "generic";
  const lit = phase === "match" || phase === "done";
  const tag = phase === "done";

  return (
    <div ref={ref} className="gf-ds @container relative size-full select-none overflow-hidden">
      <Field />

      {/* Card: centred, 28px from the top, bleeds off the bottom edge (its bottom border sits below the fold). */}
      <div
        className="card absolute -bottom-2 left-1/2 top-7 w-[calc(100%_-_40px)] -translate-x-1/2 overflow-hidden sm:w-[min(calc(100%_-_56px),340px)]"
        style={{ boxShadow: SHADOW }}
      >
        {/* Who is being called */}
        <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
          <span className="icon-holder hidden size-8 rounded-full @min-[400px]:flex">
            <MapPin aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap c-primary">{lead.name}</div>
            <div className="caption whitespace-nowrap c-secondary">New lead in Austin, TX</div>
          </div>
          <span className="tag tag-accent">
            <span className="size-1.5 rounded-full bg-current" />
            Calling
          </span>
        </div>

        <ul>
          <Row label="Her number">
            <span className="whitespace-nowrap tabular-nums c-secondary">
              (<Lit on={lit}>512</Lit>) 555-0193
            </span>
          </Row>
          <Row label="Caller ID">
            <span className="whitespace-nowrap tabular-nums c-primary">
              (
              {TO_AREA.split("").map((d, i) => (
                <Digit key={i} from={FROM_AREA[i]} to={d} local={local} lit={lit} i={i} />
              ))}
              ) 555-0148
            </span>
          </Row>
          <Row label="Carrier">
            <span className="whitespace-nowrap c-primary">GoFunnel network</span>
          </Row>
          <Row label="Spam label">
            <span
              data-anim
              className="tag tag-positive"
              style={{
                opacity: tag ? 1 : 0,
                transform: tag ? "scale(1)" : "scale(0.96)",
                transformOrigin: "right center",
                transition: tag
                  ? `opacity 260ms ${EASE_IN}, transform 260ms ${EASE_IN}`
                  : "opacity 160ms ease-in, transform 160ms ease-in",
              }}
            >
              <ShieldCheck aria-hidden className="size-3" strokeWidth={2} />
              Not flagged
            </span>
          </Row>
        </ul>
      </div>
    </div>
  );
}

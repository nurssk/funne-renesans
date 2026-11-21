"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Phone, PhoneCall, PhoneOutgoing } from "lucide-react";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Dialer cell 3, "Waterfall dialing that keeps every rep on a live call." One rep, three new leads rung at
// the same time: the first to pick up (Constance) goes straight to Marcus, the other two lines are dropped,
// and the next lead already waits. The focal point is the one Connected row, the only colour in the card
// and the only name in primary text. Shared card anatomy with the other four dialer cells: centred card,
// 52px header, 44px rows, bleeding off the bottom of the picture area.
// Motion, "many ring, one connects" (about 7.9s a cycle, only while the cell is on screen and the tab is
// visible): the three lead rows ring together (a small phone glyph shakes in each, out of phase), Constance
// picks up and her Connected tag lands, Owen settles to No answer, Priya to Dropped, then Janet slides in as
// the next line. Hold ~3s, fade the changed parts out, repeat. Transform and opacity only; every swapping
// value is stacked in one grid cell so nothing reflows. The resting frame (server render, reduced motion,
// off screen) is the finished state.
// The card floats on a lilac and periwinkle field. Illustration data only; the cast is the site's made-up one.

// Steps: 0 cleared, 1 all three ringing, 2 Constance connected, 3 Owen no answer, 4 Priya dropped,
// 5 Janet up next (finished, the resting frame). Each entry is how long the step holds before the next.
const DONE = 5;
const HOLD = [260, 3000, 700, 350, 550, 3000];

const ENTER = "cubic-bezier(0.23, 1, 0.32, 1)";
const EXIT = "cubic-bezier(0.55, 0, 1, 0.45)";

const RING_CSS = `
@keyframes gf-wf-ring {
  0%, 36%, 100% { transform: rotate(0deg); }
  6% { transform: rotate(-14deg); }
  12% { transform: rotate(12deg); }
  18% { transform: rotate(-10deg); }
  24% { transform: rotate(8deg); }
  30% { transform: rotate(-4deg); }
}
.gf-wf-ring { animation: gf-wf-ring 1.3s linear infinite; transform-origin: 50% 60%; }
@media (prefers-reduced-motion: reduce) { .gf-wf-ring { animation: none; } }
`;

// One layer of a stacked slot. On: fades in (and settles from `from`), optionally after `delay` so a swap
// overlaps the outgoing layer's exit. Off: a quicker, quieter fade.
function layer(on: boolean, from = "none", delay = 0): CSSProperties {
  return on
    ? {
        opacity: 1,
        transform: "none",
        transition: `opacity 240ms ${ENTER} ${delay}ms, transform 240ms ${ENTER} ${delay}ms`,
      }
    : {
        opacity: 0,
        transform: from,
        transition: `opacity 160ms ${EXIT}, transform 160ms ${EXIT}`,
      };
}

// Children share one grid cell, so the slot is always as wide as its widest layer.
function Stack({ children, end }: { children: ReactNode; end?: boolean }) {
  return (
    <span className={`grid shrink-0 [&>*]:[grid-area:1/1] ${end ? "justify-items-end" : ""}`}>{children}</span>
  );
}

function Ringing({ on, live, phase }: { on: boolean; live: boolean; phase: number }) {
  return (
    <span className="caption flex items-center gap-1 c-tertiary" style={layer(on, "none", 0)}>
      <Phone
        aria-hidden
        className={`size-3 ${live ? "gf-wf-ring" : ""}`}
        strokeWidth={2}
        style={{ animationDelay: `${-phase * 0.43}s` }}
      />
      Ringing
    </span>
  );
}

function Status({ on, children }: { on: boolean; children: ReactNode }) {
  return (
    <span className="caption c-tertiary" style={layer(on, "none", 100)}>
      {children}
    </span>
  );
}

const rowClass = "flex h-11 items-center justify-between gap-3 border-b hairline px-4";

function useLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(DONE);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | undefined;
    let inView = false;
    let running = false;

    const run = (s: number) => {
      setStep(s);
      timer = window.setTimeout(() => run(s === DONE ? 0 : s + 1), HOLD[s]);
    };
    const start = () => {
      if (running || !inView || document.hidden) return;
      running = true;
      setLive(true);
      run(0);
    };
    const stop = () => {
      window.clearTimeout(timer);
      running = false;
      setLive(false);
      setStep(DONE);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.4 },
    );
    const onVisibility = () => (document.hidden ? stop() : start());

    io.observe(el);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.clearTimeout(timer);
    };
  }, []);

  return { ref, step, live };
}

export function DialWaterfall() {
  const { ref, step, live } = useLoop();
  const connected = step >= 2;

  return (
    <div ref={ref} className="gf-ds relative isolate size-full select-none overflow-hidden">
      <style>{RING_CSS}</style>
      <BgFrame seed={19} src="/backgrounds/waterfall.webp">
        {/* Base: pale periwinkle into soft lilac, top-left to bottom-right */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg, #dfe2f4 0%, #e3ddf1 48%, #d9d1ec 100%)" }}
        />
        {/* Periwinkle pool: top right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 60% at 96% 6%, rgba(170,184,234,0.9) 0%, rgba(184,194,236,0.45) 48%, rgba(190,198,236,0) 100%)",
          }}
        />
        {/* Lilac bloom: bottom left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 58% at 4% 96%, rgba(196,176,226,0.9) 0%, rgba(206,190,230,0.45) 50%, rgba(210,196,232,0) 100%)",
          }}
        />
        {/* Warm haze: a touch of the canvas cream at the top left, so the field sits with the page */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 45% at 8% 4%, rgba(246,241,236,0.85) 0%, rgba(244,238,236,0.35) 50%, rgba(244,238,236,0) 100%)",
          }}
        />
        {/* Calm centre: soft light behind the card */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(46% 42% at 52% 58%, rgba(246,244,252,0.7) 0%, rgba(240,238,250,0.3) 55%, rgba(240,238,250,0) 100%)",
          }}
        />
      </BgFrame>

      {/* Top edge 28px down, bottom edge past the picture area so its border never shows. */}
      <div
        className="card absolute -bottom-2 left-1/2 top-7 w-[calc(100%-40px)] -translate-x-1/2 overflow-hidden sm:w-[min(calc(100%-56px),340px)]"
        style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.18)" }}
      >
        <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-full c-secondary"
            style={{ background: "var(--color-background-surface)" }}
          >
            <PhoneOutgoing aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
          <div className="min-w-0">
            <div className="c-primary">Marcus Reyes</div>
            <span className="caption grid c-secondary [&>*]:[grid-area:1/1]">
              <span style={layer(!connected)}>Ringing 3 new leads at once</span>
              <span style={layer(connected, "none", 100)}>Rang 3 new leads at once</span>
            </span>
          </div>
        </div>

        <ul>
          <li className={rowClass}>
            <span className="c-secondary">Owen Castellanos</span>
            <Stack end>
              <Ringing on={step === 1 || step === 2} live={live} phase={0} />
              <Status on={step >= 3}>No answer</Status>
            </Stack>
          </li>

          <li className={rowClass}>
            <span className="grid [&>*]:[grid-area:1/1]">
              <span className="c-secondary" style={layer(!connected)}>
                Constance Waverly-Ashford
              </span>
              <span className="c-primary" style={layer(connected)}>
                Constance Waverly-Ashford
              </span>
            </span>
            <Stack end>
              <Ringing on={step === 1} live={live} phase={1} />
              <span
                className="tag tag-positive"
                style={{ ...layer(connected, "scale(0.96)", 80), transformOrigin: "right center", willChange: "transform" }}
              >
                <PhoneCall aria-hidden className="size-3" strokeWidth={2} />
                Connected
              </span>
            </Stack>
          </li>

          <li className={rowClass}>
            <span className="c-secondary">Priya Raman</span>
            <Stack end>
              <Ringing on={step >= 1 && step <= 3} live={live} phase={2} />
              <Status on={step >= 4}>Dropped</Status>
            </Stack>
          </li>

          <li className={`${rowClass} last:border-b-0`}>
            <span
              className="flex w-full items-center justify-between gap-3"
              style={{
                ...(step >= DONE
                  ? {
                      opacity: 1,
                      transform: "none",
                      transition: `opacity 280ms ${ENTER}, transform 280ms ${ENTER}`,
                    }
                  : { opacity: 0, transform: "translateY(6px)", transition: `opacity 200ms ${EXIT}, transform 200ms ${EXIT}` }),
              }}
            >
              <span className="c-secondary">Janet Oyelaran</span>
              <span className="caption shrink-0 c-tertiary">Up next</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

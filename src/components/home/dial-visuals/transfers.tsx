"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Check, PhoneForwarded } from "lucide-react";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Dialer cell, "Live transfers routed by your rules and logged in your CRM." One live transfer card on a
// warm sand and soft rose field (BgFrame adds the warp, drift and grain). The header is the call with
// Constance and its running time; the body is the handoff as four labelled rows, read top to bottom: the
// routing rule (if, route), the closer who took it, the CRM it was logged in. Marcus accepting is the focal point,
// the only colour on the card. The card bleeds off the picture's bottom edge.
// Motion, "the rule runs": the card evaluates top to bottom like a rule engine. A faint row cursor steps down
// the four rows; on each one the value fades up into place, then the cursor leaves and Marcus's "Accepted" tag
// lands as the payoff while the transfer timer counts in the header. Hold, quiet fade, repeat (about 7.5s).
// Runs only while the cell is on screen and the tab is visible; otherwise it rests on the finished card, which
// is also the screenshot and reduced-motion frame. Transform and opacity only, no layout shift. Illustration data only.

const START = 2 * 60 + 47; // 2:47 into the call

// Steps of one cycle. 0 is the reset (values hidden); 1..8 alternate "cursor on row r" (odd) and "row r
// resolved" (even); 9 the cursor leaves; 10 the tag lands, which is also the finished, resting frame.
const FINAL = 10;
// [delay before this step in ms, step]. Build ~4.5s, hold 3s, reset ~0.45s.
const CYCLE: [number, number][] = [
  [450, 1], [400, 2],
  [550, 3], [400, 4],
  [550, 5], [400, 6],
  [550, 7], [400, 8],
  [500, 9], [300, 10],
  [3000, 0],
];
const HOLD_BEFORE_FIRST_RUN = 1200; // on (re)entry the finished card is read first, then the rule runs

const ENTER = "cubic-bezier(0.23, 1, 0.32, 1)";
const MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
const EXIT = "cubic-bezier(0.4, 0, 1, 1)";

function useRuleLoop() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(FINAL);
  const [seconds, setSeconds] = useState(START);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timeout: number | undefined;
    let tick: number | undefined;
    let onScreen = false;
    let running = false;

    const stop = () => {
      window.clearTimeout(timeout);
      window.clearInterval(tick);
      running = false;
      setStep(FINAL);
      setSeconds(START);
    };

    const run = (i: number) => {
      const [delay, next] = CYCLE[i];
      timeout = window.setTimeout(() => {
        if (next === 0) window.clearInterval(tick);
        if (next === 1) {
          setSeconds(START);
          window.clearInterval(tick);
          tick = window.setInterval(() => setSeconds((s) => s + 1), 1000);
        }
        setStep(next);
        run((i + 1) % CYCLE.length);
      }, delay);
    };

    const sync = () => {
      const should = onScreen && document.visibilityState === "visible";
      if (should && !running) {
        running = true;
        // Rest on the finished card, then reset and start the cycle from the top.
        timeout = window.setTimeout(() => {
          setStep(0);
          run(0);
        }, HOLD_BEFORE_FIRST_RUN);
      } else if (!should && running) {
        stop();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      window.clearTimeout(timeout);
      window.clearInterval(tick);
    };
  }, []);

  return {
    ref,
    step,
    time: `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`,
  };
}

// Enter: fade up 4px, 260ms. Exit: a quieter 180ms fade.
function reveal(shown: boolean, from = "translateY(4px)"): CSSProperties {
  return {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : from,
    transition: shown
      ? `opacity 260ms ${ENTER}, transform 260ms ${ENTER}`
      : `opacity 180ms ${EXIT}, transform 180ms ${EXIT}`,
  };
}

function Field() {
  return (
    <BgFrame seed={23} src="/backgrounds/transfers.webp">
      {/* Base: warm sand drifting into soft rose, top-left to bottom-right */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, #efe2cf 0%, #ead3c3 48%, #e3bdb4 100%)" }}
      />
      {/* Rose bloom low on the left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52% 62% at 4% 96%, rgba(214,150,148,0.85) 0%, rgba(222,170,162,0.45) 45%, rgba(226,180,170,0) 100%)",
        }}
      />
      {/* Pale sand light: top right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(56% 58% at 96% 2%, rgba(250,240,224,0.95) 0%, rgba(244,226,204,0.5) 48%, rgba(240,220,196,0) 100%)",
        }}
      />
      {/* Dusty clay pool: bottom right, a little depth under the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(44% 50% at 94% 100%, rgba(186,120,108,0.55) 0%, rgba(196,136,122,0.25) 50%, rgba(196,136,122,0) 100%)",
        }}
      />
      {/* Calm centre: soft cream behind the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 44% at 50% 46%, rgba(250,244,236,0.6) 0%, rgba(246,234,222,0.25) 55%, rgba(246,234,222,0) 100%)",
        }}
      />
    </BgFrame>
  );
}


// One row of the handoff: the label on the left, the value (and at most one tag) on the right. The value is
// always laid out, so revealing it never shifts the row; only its opacity and transform change.
function Row({ label, shown, children }: { label: string; shown: boolean; children: ReactNode }) {
  return (
    <li className="flex h-11 items-center justify-between gap-3 border-b hairline px-4 last:border-b-0">
      <span className="shrink-0 c-secondary">{label}</span>
      <span className="flex items-center gap-2 whitespace-nowrap c-primary" style={reveal(shown)}>
        {children}
      </span>
    </li>
  );
}

const ROW_H = 44;

export function DialTransfers() {
  const { ref, step, time } = useRuleLoop();
  const resolved = (row: number) => step >= 2 * row + 2;
  const cursorOn = step >= 1 && step <= 8;
  // At the reset the hidden cursor slides back to the top, so it never visibly travels upward.
  const cursorRow = step === 0 ? 0 : cursorOn ? Math.floor((step - 1) / 2) : 3;
  const tagShown = step >= FINAL;
  const running = step !== FINAL;

  return (
    <div ref={ref} className="gf-ds relative isolate size-full select-none overflow-hidden">
      <Field />

      <div
        className="card absolute inset-x-0 top-7 -bottom-4 mx-auto w-[min(100%_-_40px,340px)] overflow-hidden sm:w-[min(100%_-_56px,340px)]"
        style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.18)" }}
      >
        {/* The live call being handed off */}
        <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
          <span className="surface flex size-8 shrink-0 items-center justify-center rounded-full c-secondary">
            <PhoneForwarded aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="whitespace-nowrap c-primary">Constance Waverly-Ashford</div>
            <div className="caption whitespace-nowrap c-secondary">Live transfer</div>
          </div>
          <span
            className="shrink-0 tabular-nums c-secondary"
            style={{
              opacity: step === 0 ? 0 : 1,
              transition: step === 0 ? `opacity 180ms ${EXIT}` : `opacity 240ms ${ENTER}`,
            }}
          >
            {time}
          </span>
        </div>

        {/* The handoff, top to bottom. The cursor sits behind the rows (z -1 inside this isolated box). */}
        <div className="relative isolate">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10"
            style={{
              height: ROW_H,
              background: "var(--color-background-surface-alpha)",
              opacity: cursorOn ? 0.55 : 0,
              transform: `translateY(${cursorRow * ROW_H}px)`,
              transition: `transform 360ms ${MOVE}, opacity ${cursorOn ? `240ms ${ENTER}` : `180ms ${EXIT}`}`,
              willChange: running ? "transform, opacity" : undefined,
            }}
          />
          <ol>
            <Row label="If" shown={resolved(0)}>Budget over $10k</Row>
            <Row label="Route to" shown={resolved(1)}>Closers</Row>
            <Row label="Closer" shown={resolved(2)}>
              Marcus Reyes
              <span
                className="tag tag-positive"
                style={{
                  opacity: tagShown ? 1 : 0,
                  transform: tagShown ? "none" : "scale(0.96)",
                  transformOrigin: "left center",
                  transition: tagShown
                    ? `opacity 260ms ${ENTER}, transform 260ms ${ENTER}`
                    : `opacity 180ms ${EXIT}, transform 180ms ${EXIT}`,
                }}
              >
                <Check aria-hidden className="size-3" strokeWidth={2} />
                Accepted
              </span>
            </Row>
            <Row label="Logged to" shown={resolved(3)}>HubSpot</Row>
          </ol>
        </div>
      </div>
    </div>
  );
}

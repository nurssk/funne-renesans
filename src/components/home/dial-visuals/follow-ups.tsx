"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ListRestart } from "lucide-react";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Dialer cell "Follow-ups that queue themselves on your schedule.": one lead's no-answer cadence as a
// schedule card on a warm peach field. Four steps: the first call went unanswered, the redial ten minutes
// later went unanswered too, a text went out, and the next call waits for business hours to open tomorrow.
// The hours sit in the header tag, so "on your schedule" reads without a divider. The card runs off the
// bottom of the picture. One focal point: the only highlighted row carries the only coloured tag.
// Motion (the cadence advances): the "current step" highlight slides down the schedule one row at a time.
// Call is Calling, then settles to No answer as the highlight slides to the redial, which shows Calling;
// then the text (Sending, settles to Sent); then the call at opening lands as Scheduled. Hold, quiet fade
// reset, repeat. Runs only on screen with the tab visible. The resting frame (SSR, reduced motion, paused)
// is the finished state: highlight on "Call at opening", tag Scheduled.

type Step = { label: string; when: string; pending: string; current: string; done: string };

const steps: Step[] = [
  { label: "Call", when: "2:14 PM", pending: "Queued", current: "Calling", done: "No answer" },
  { label: "Redial in 10 min", when: "2:24 PM", pending: "Queued", current: "Calling", done: "No answer" },
  { label: "Text", when: "2:25 PM", pending: "Queued", current: "Sending", done: "Sent" },
  { label: "Call at opening", when: "Thu 9:00 AM", pending: "Queued", current: "Scheduled", done: "Scheduled" },
];

const LAST = steps.length - 1;
const ROW = 44; // h-11; each row's 1px top border sits inside its 44px

// Step | When | Status: fixed right-aligned columns so times and states line up row to row.
const COLS = "grid grid-cols-[minmax(0,1fr)_84px_76px] items-center gap-x-3 px-4";

const ENTER = "cubic-bezier(0.23, 1, 0.32, 1)";
const MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
const EXIT = "cubic-bezier(0.55, 0, 1, 0.45)";

// Timeline (ms). One cycle ≈ 7.3s: fade the finished state out, show step 1 calling, advance three
// times, hold the finished state.
const T = {
  lead: 400, // on (re)start, let the finished frame sit a beat before the reset fade
  fadeOut: 220, // the 180ms fade must be fully out before the invisible snap
  settle: 60, // gap between the invisible snap to step 1 and the fade back in
  first: 1300, // step 1 "Calling" on screen
  step: 1250, // between advances
  hold: 3200, // finished state, readable
};

type Loop = { phase: number; hidden: boolean; instant: boolean };
const FINISHED: Loop = { phase: LAST, hidden: false, instant: false };

type RowState = "pending" | "current" | "done";
const rowState = (i: number, phase: number): RowState => (i < phase ? "done" : i === phase ? "current" : "pending");

// A layer that is either shown or not. Entering: opacity (+ optional 0.96 → 1 scale), 240ms ease-out,
// after `delay`. Leaving: 160ms, no delay, quieter.
function layer(on: boolean, instant: boolean, opts: { delay?: number; scale?: boolean } = {}): CSSProperties {
  const { delay = 0, scale = false } = opts;
  const props = scale ? ["opacity", "transform"] : ["opacity"];
  return {
    opacity: on ? 1 : 0,
    transform: scale ? (on ? "scale(1)" : "scale(0.96)") : undefined,
    transformOrigin: "right center",
    transition: instant
      ? "none"
      : props.map((p) => (on ? `${p} 240ms ${ENTER} ${delay}ms` : `${p} 160ms ${EXIT}`)).join(", "),
  };
}

// The same text in two tones, stacked in one grid cell so the cell never changes size; cross-fades to
// the quiet tone when the step is done.
function Tone({ text, done, base, quiet, className = "" }: { text: string; done: boolean; base: string; quiet: string; className?: string }) {
  return (
    <span className={`grid ${className}`}>
      <span className={`[grid-area:1/1] ${base}`} style={layer(!done, false)} aria-hidden={done}>
        {text}
      </span>
      <span className={`[grid-area:1/1] ${quiet}`} style={layer(done, false, { delay: 80 })} aria-hidden={!done}>
        {text}
      </span>
    </span>
  );
}

function Status({ step, state, instant }: { step: Step; state: RowState; instant: boolean }) {
  return (
    <span className="grid justify-items-end">
      <span className="caption c-tertiary [grid-area:1/1]" style={layer(state === "pending", instant)} aria-hidden={state !== "pending"}>
        {step.pending}
      </span>
      {/* the tag lands after the highlight has slid into the row */}
      <span
        className="tag tag-accent [grid-area:1/1]"
        style={{ ...layer(state === "current", instant, { delay: 280, scale: true }), willChange: "transform, opacity" }}
        aria-hidden={state !== "current"}
      >
        {step.current === "Calling" && <span aria-hidden className="size-1.5 rounded-full bg-current" />}
        {step.current}
      </span>
      <span className="caption c-tertiary [grid-area:1/1]" style={layer(state === "done", instant, { delay: 120 })} aria-hidden={state !== "done"}>
        {step.done}
      </span>
    </span>
  );
}

function useCadence() {
  const ref = useRef<HTMLDivElement>(null);
  const [loop, setLoop] = useState<Loop>(FINISHED);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let timers: number[] = [];
    let running = false;
    let inView = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const clear = () => {
      timers.forEach((t) => window.clearTimeout(t));
      timers = [];
    };

    const cycle = (lead: number) => {
      clear();
      let t = lead;
      at(t, () => setLoop((s) => ({ ...s, hidden: true, instant: false })));
      t += T.fadeOut;
      at(t, () => setLoop({ phase: 0, hidden: true, instant: true }));
      t += T.settle;
      at(t, () => setLoop({ phase: 0, hidden: false, instant: false }));
      t += T.first;
      for (let p = 1; p <= LAST; p++) {
        const phase = p;
        at(t, () => setLoop({ phase, hidden: false, instant: false }));
        if (p < LAST) t += T.step;
      }
      t += T.hold;
      at(t, () => cycle(0));
    };

    const sync = () => {
      const active = inView && document.visibilityState === "visible" && !reduce.matches;
      if (active && !running) {
        running = true;
        cycle(T.lead);
      } else if (!active && running) {
        running = false;
        clear();
        setLoop(FINISHED);
      }
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
    reduce.addEventListener("change", sync);
    return () => {
      clear();
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return { ref, loop };
}

function Field() {
  return (
    <BgFrame seed={21}>
      {/* Base: apricot into warm peach, top-left to bottom-right */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, #f7cfa8 0%, #f2b285 48%, #e99a6c 100%)" }}
      />
      {/* Cream light: a wide bloom from the top left */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 8% 0%, rgba(255,246,232,0.95) 0%, rgba(253,232,208,0.55) 45%, rgba(250,220,190,0) 100%)",
        }}
      />
      {/* Deeper apricot pool: bottom right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 96% 100%, rgba(222,128,82,0.85) 0%, rgba(232,146,100,0.4) 50%, rgba(232,146,100,0) 100%)",
        }}
      />
      {/* Soft rose warmth along the left edge, low down */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(35% 60% at -4% 85%, rgba(232,150,128,0.6) 0%, rgba(236,164,136,0.25) 55%, rgba(236,164,136,0) 100%)",
        }}
      />
      {/* Calm centre: cream behind the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 55%, rgba(255,240,222,0.55) 0%, rgba(252,226,200,0.2) 55%, rgba(252,226,200,0) 100%)",
        }}
      />
    </BgFrame>
  );
}

export function DialFollowUps() {
  const { ref, loop } = useCadence();
  const { phase, hidden, instant } = loop;
  const fade = (on: boolean) => (on ? `opacity 240ms ${ENTER}` : `opacity 180ms ${EXIT}`);

  return (
    <div ref={ref} className="gf-ds relative size-full select-none overflow-hidden">
      <Field />
      {/* Centred, 28px from the top, bleeding off the bottom edge so its bottom border never shows. */}
      <div
        className="card @container absolute inset-x-0 top-7 -bottom-4 mx-auto w-[calc(100%-40px)] overflow-hidden sm:w-[min(calc(100%-56px),480px)]"
        style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 12px 32px -8px rgba(10,10,10,0.18)" }}
      >
        <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
          <span className="icon-holder hidden size-8 rounded-full @md:flex">
            <ListRestart aria-hidden className="size-4" strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1 whitespace-nowrap">
            <div className="c-primary">No-answer follow-up</div>
            <div className="caption c-secondary">Constance Waverly-Ashford</div>
          </div>
          <span className="tag tag-neutral tabular-nums">
            <span className="@md:hidden">9–6 CT</span>
            <span className="hidden @md:inline">9 AM–6 PM CT</span>
          </span>
        </div>

        <div className="relative isolate">
          {/* The current-step highlight: one surface that slides row to row, behind the rows. */}
          <div
            aria-hidden
            className="surface pointer-events-none absolute inset-x-0 top-0 h-11"
            style={{
              transform: `translateY(${phase * ROW}px)`,
              opacity: hidden ? 0 : 1,
              transition: instant ? "none" : `transform 360ms ${MOVE}, ${fade(!hidden)}`,
              willChange: "transform, opacity",
            }}
          />
          <ul>
            {steps.map((s, i) => {
              const state = rowState(i, phase);
              const done = state === "done";
              return (
                <li key={s.label} className={`${COLS} relative h-11 whitespace-nowrap border-t hairline first:border-t-0`}>
                  <Tone text={s.label} done={done} base="c-primary" quiet="c-secondary" className="min-w-0" />
                  <Tone text={s.when} done={done} base="c-secondary" quiet="c-tertiary" className="justify-items-end tabular-nums" />
                  <span className="flex justify-end" style={{ opacity: hidden ? 0 : 1, transition: fade(!hidden) }}>
                    <Status step={s} state={state} instant={instant} />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

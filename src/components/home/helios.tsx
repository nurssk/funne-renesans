"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Check, CornerDownLeft, MousePointerClick, X } from "lucide-react";
import { helios } from "@/content/helios";
import { SYMBOL } from "@/components/footer-logo-paths";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Helios (docs/decisions/helios.md). The serif headline, then a painted landscape (bg-04, the Baptism's tree
// and hills) edge to edge of the frame. On it, two product cards of the same size side by side: left, "Try
// asking", four questions as clear buttons (bordered rows, an arrow that turns solid on the open one), and
// right the chat. The user found the earlier list unclear and the cards uneven. Right, the live demo as in Dimash's version (asked for by the user): one Helios
// conversation in the product's own card (question, answer, what Helios made, sources, the ask field). The
// index plays on its own: every 7s the next question is asked, a thin ink rule filling down the open entry;
// hover or off screen pauses; a click asks that question and restarts its time. The answers share one grid
// cell (no layout shift) and crossfade, 220ms in, 120ms out. Reduced motion: no auto-advance, instant swap.
// Every number is the same made-up account as "Follow one lead". Not client data.

type Use = (typeof helios.uses)[number];

const SHADOW = { boxShadow: "0 1px 2px rgba(10,10,10,0.08), 0 24px 48px -16px rgba(10,10,10,0.35)" };

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

function Mark() {
  return (
    <span className="icon-holder size-8 rounded-full c-primary">
      <svg aria-hidden viewBox="80.5 80.5 184.8 160" className="h-3.5 w-4">
        <path fillRule="evenodd" clipRule="evenodd" d={SYMBOL} fill="currentColor" />
      </svg>
    </span>
  );
}

function Outcome({ good, children }: { good: boolean; children: React.ReactNode }) {
  const Icon = good ? ArrowUp : ArrowDown;
  return (
    <span className={`tag ${good ? "tag-positive" : "tag-negative"}`}>
      <Icon aria-hidden className="size-3" strokeWidth={2} />
      {children}
    </span>
  );
}

// What Helios hands back, per use case. Numbers agree with the creatives in "Follow one lead".
function Artifact({ kind }: { kind: Use["kind"] }) {
  const row = "flex h-11 items-center justify-between gap-3 px-3";
  if (kind === "report")
    return (
      <dl className="grid grid-cols-2 sm:grid-cols-4">
        {[
          ["Spend", "$21,730"],
          ["Calls", "157"],
          ["Closes", "18"],
          ["Cash", "$111,050"],
        ].map(([k, v], i) => (
          <div key={k} className={`px-3 py-2.5 ${i % 2 ? "border-l hairline" : ""} ${i > 1 ? "border-t hairline sm:border-t-0" : ""} ${i === 2 ? "sm:border-l" : ""}`}>
            <dt className="caption c-secondary">{k}</dt>
            <dd className="mt-0.5 tabular-nums c-primary">{v}</dd>
          </div>
        ))}
      </dl>
    );
  if (kind === "script")
    return (
      <div className="px-3 py-3">
        <p className="text-pretty c-primary">“Half the calls on your calendar never show up. The ones that do were never going to buy.”</p>
        <p className="caption mt-1.5 c-secondary">Pain hook · for a talking-head VSL</p>
      </div>
    );
  if (kind === "audit")
    return (
      <ul>
        <li className={`${row} border-b hairline`}>
          <span className="truncate c-primary">Spring VSL · Hook 3</span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="caption tabular-nums c-secondary">$9.12 per $1</span>
            <Outcome good>Scale</Outcome>
          </span>
        </li>
        <li className={row}>
          <span className="truncate c-primary">Offer · Hook 5</span>
          <span className="flex shrink-0 items-center gap-3">
            <span className="caption tabular-nums c-secondary">$1.52 per $1</span>
            <Outcome good={false}>Cut</Outcome>
          </span>
        </li>
      </ul>
    );
  return (
    <ul>
      <li className={`${row} border-b hairline`}>
        <span className="truncate c-primary">Partner objections</span>
        <span className="tag tag-positive">
          <Check aria-hidden className="size-3" strokeWidth={2} />
          Handled 4 of 5
        </span>
      </li>
      <li className={row}>
        <span className="truncate c-primary">Contract questions</span>
        <span className="tag tag-negative">
          <X aria-hidden className="size-3" strokeWidth={2} />
          Parked 3 of 3
        </span>
      </li>
    </ul>
  );
}

function Conversation({ use, shown }: { use: Use; shown: boolean }) {
  return (
    <div
      aria-hidden={!shown}
      className="col-start-1 row-start-1 flex flex-col gap-4 motion-reduce:transition-none"
      style={{
        opacity: shown ? 1 : 0,
        translate: shown ? "0 0" : "0 4px",
        transitionProperty: "opacity, translate",
        transitionDuration: shown ? "220ms" : "120ms",
        transitionTimingFunction: shown ? EASE : "cubic-bezier(0.4, 0, 1, 1)",
        transitionDelay: shown ? "60ms" : "0ms",
        pointerEvents: shown ? "auto" : "none",
      }}
    >
      <p className="ml-auto max-w-[85%] rounded-[12px] rounded-br-[4px] bg-[var(--color-background-surface)] px-3 py-2 c-primary">
        {use.question}
      </p>
      <div className="flex gap-3">
        <Mark />
        <div className="min-w-0 flex-1">
          <p className="text-pretty c-primary">{use.answer}</p>
          <div className="card mt-3 overflow-hidden">
            <Artifact kind={use.kind} />
          </div>
          <p className="caption mt-2 c-tertiary">From {use.sources}</p>
        </div>
      </div>
    </div>
  );
}


export function Helios() {
  const { headline, uses } = helios;
  const [current, setCurrent] = useState(2); // Ad audits: the story "Follow one lead" ends on
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
  const next = () => pick((current + 1) % uses.length);

  return (
    <section ref={section} aria-labelledby="helios-title" className="bg-canvas">
      <div className="frame px-6 pb-12 lg:px-10 lg:pb-16">
        <h2
          id="helios-title"
          className="mx-auto max-w-[18ch] text-balance text-center font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px] lg:max-w-none lg:whitespace-nowrap"
        >
          {headline}
        </h2>
      </div>

      <div className="border-y border-line">
        <div className="frame">
        <div
          className="relative overflow-hidden"
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <BgFrame seed={41} src="/backgrounds/bg-04.webp">
            {null}
          </BgFrame>
          <div className="relative grid grid-cols-1 gap-4 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:items-stretch lg:gap-6 lg:px-12 lg:py-16">
            {/* The controls: four questions to ask, each a clear button with an arrow pointing at the chat. */}
            <div className="gf-ds flex min-w-0">
              <div role="group" aria-label="Ask Helios a question" className="card flex w-full flex-col overflow-hidden" style={SHADOW}>
                <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
                  <span className="icon-holder size-8 rounded-full c-primary">
                    <MousePointerClick aria-hidden className="size-3.5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate c-primary">Try asking</div>
                    <div className="caption truncate c-secondary">Click a question to see Helios answer it</div>
                  </div>
                </div>
                <ul className="flex flex-1 flex-col gap-2 p-3">
                  {uses.map((u, i) => {
                    const on = i === current;
                    return (
                      <li key={u.lead} className="flex flex-1">
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => pick(i)}
                          className={`group relative flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-[10px] border px-3 py-3 text-left transition-[border-color,background-color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
                            on ? "border-ink/15 bg-[var(--color-background-surface)]" : "hairline hover:border-ink/15"
                          }`}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-pretty c-primary lg:truncate">{u.question}</span>
                            <span className="caption mt-0.5 block truncate c-secondary">{u.lead}</span>
                          </span>
                          <span
                            className={`icon-holder size-7 shrink-0 rounded-full transition-[background-color,color,translate] duration-150 ${
                              on ? "bg-ink text-white" : "c-secondary group-hover:translate-x-0.5"
                            }`}
                          >
                            <ArrowRight aria-hidden className="size-3.5" strokeWidth={1.75} />
                          </span>
                          {/* How long until Helios takes the next question: a thin rule filling along the foot. */}
                          {on && (
                            <span
                              key={`${current}-${round}`}
                              aria-hidden
                              onAnimationEnd={next}
                              className="helios-turn absolute inset-x-0 bottom-0 h-0.5 bg-ink/70"
                              style={{ animationPlayState: running ? "running" : "paused" }}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* The live demo: one Helios conversation, in the product's own card, as tall as the questions. */}
            <div className="gf-ds flex min-w-0">
            <div className="card relative flex w-full flex-col overflow-hidden" style={SHADOW}>
              <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
                <Mark />
                <div className="min-w-0 flex-1">
                  <div className="truncate c-primary">Helios</div>
                  <div className="caption truncate c-secondary">Reads your ads, calls and payments</div>
                </div>
              </div>
              <div aria-live="polite" className="grid flex-1 content-start p-4 sm:p-5">
                {uses.map((u, i) => (
                  <Conversation key={u.lead} use={u} shown={i === current} />
                ))}
              </div>
              <div className="border-t hairline p-3">
                <div className="flex h-10 items-center justify-between gap-3 rounded-[8px] border hairline bg-[var(--color-background-system)] pl-3 pr-1.5">
                  <span className="truncate c-tertiary">Ask Helios about your business</span>
                  <span className="icon-holder size-7 rounded-[6px]">
                    <CornerDownLeft aria-hidden className="size-3.5" strokeWidth={1.75} />
                  </span>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="frame h-16 lg:h-24" />
    </section>
  );
}

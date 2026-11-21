"use client";
import { useState } from "react";
import { ArrowDown, ArrowUp, Check, CornerDownLeft, X } from "lucide-react";
import { helios } from "@/content/helios";
import { SYMBOL } from "@/components/footer-logo-paths";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Helios (docs/decisions/helios.md): show the product. A serif headline, then one Helios conversation on a
// grainy colour field, framed edge to edge like the hero demo. The four use cases sit under it as a
// hairline row and are the controls: picking one swaps the conversation (question, answer, the artifact
// Helios made, its sources). The selected cell's text steps up a tone and a 2px ink rule draws in along
// its top; cells never change background, so the row stays flat. Motion only on input: the answers share one grid
// cell (no layout shift) and crossfade, 220ms in, 120ms out; colours change over 150ms. Reduced motion:
// instant swap.

type Use = (typeof helios.uses)[number];

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

  return (
    <section aria-labelledby="helios-title" className="bg-canvas">
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
          {/* The product: a Helios conversation on its own grainy field. */}
          <div className="gf-ds relative overflow-hidden px-4 py-12 sm:px-8 lg:py-16">
            <BgFrame seed={41} src="/backgrounds/helios.webp">
              <div className="absolute inset-0" style={{ background: "linear-gradient(165deg, #3d5d63 0%, #2a444a 45%, #1e3035 100%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(60% 55% at 18% 12%, rgba(244, 228, 198, 0.55) 0%, rgba(244, 228, 198, 0) 70%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(55% 60% at 88% 30%, rgba(96, 164, 170, 0.55) 0%, rgba(96, 164, 170, 0) 70%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 75% 100%, rgba(206, 146, 96, 0.38) 0%, rgba(206, 146, 96, 0) 70%)" }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(40% 45% at 50% 55%, rgba(40, 62, 68, 0.35) 0%, rgba(40, 62, 68, 0) 75%)" }} />
            </BgFrame>

            <div
              className="card relative mx-auto w-full max-w-[600px] overflow-hidden"
              style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.08), 0 24px 48px -16px rgba(10,10,10,0.35)" }}
            >
              <div className="flex h-[52px] items-center gap-3 border-b hairline px-4">
                <Mark />
                <div className="min-w-0 flex-1">
                  <div className="truncate c-primary">Helios</div>
                  <div className="caption truncate c-secondary">Reads your ads, calls and payments</div>
                </div>
              </div>
              <div aria-live="polite" className="grid p-4 sm:p-5">
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

      <div className="frame">
        {/* The four use cases, as the controls that switch the conversation. */}
        <div role="group" aria-label="Show Helios answering" className="-mr-px grid sm:grid-cols-2 lg:grid-cols-4">
          {uses.map((u, i) => {
            const on = i === current;
            return (
              <button
                key={u.lead}
                type="button"
                aria-pressed={on}
                onClick={() => setCurrent(i)}
                className="group relative border-b border-r border-line p-6 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink lg:px-8 lg:py-7"
              >
                {/* The selected cell's rule: 2px ink along its top edge, drawn from the left. */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -top-px h-0.5 origin-left bg-ink transition-transform duration-200 motion-reduce:transition-none"
                  style={{ transform: on ? "scaleX(1)" : "scaleX(0)", transitionTimingFunction: EASE }}
                />
                <span className="block text-pretty text-[18px] leading-[1.35] tracking-[-0.01em]">
                  <span className={`transition-colors duration-150 ease-out ${on ? "text-ink" : "text-ink-2 group-hover:text-ink"}`}>{u.lead}</span>{" "}
                  <span className={`transition-colors duration-150 ease-out ${on ? "text-ink-2" : "text-ink-3"}`}>{u.rest}</span>
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

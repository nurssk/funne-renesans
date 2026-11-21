"use client";
import { useEffect, useRef, useState } from "react";
import { helios } from "@/content/helios";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";

// Helios (docs/decisions/helios.md), "the report", Renaissance pass chosen by the user (22 Nov 2026):
// the serif headline, then a painted landscape (bg-04, the Baptism's tree and hills) edge to edge of the
// frame with one sheet of paper laid on it: Helios's answer written up as a short report. The owner's
// question is its serif title, the answer is the body, what Helios made is a ledger (serif figures,
// dotted leaders, verdicts in green and red ink), and it is signed with its sources. Beside the sheet (under
// it on phones) the four questions are an index, numbered I to IV; the pages turn on their own every 7s,
// a thin ink rule filling down the open entry, paused while hovered or off screen; a click opens that page
// and restarts its time. A new page rises in over 320ms. Reduced motion: no auto-turn, no rise.
// Every number is the same made-up account as "Follow one lead". Not client data.

type Use = (typeof helios.uses)[number];

const ROMAN = ["I", "II", "III", "IV"];
const SHEET_DATE = "Monday, 16 November";

function Leader() {
  return <span aria-hidden className="mx-2 min-w-3 flex-1 translate-y-[-4px] border-b border-dotted border-ink/25" />;
}

function Verdict({ good, children }: { good: boolean; children: React.ReactNode }) {
  return <span className={`font-serif italic ${good ? "text-[#3f7a4a]" : "text-[#a2443a]"}`}>{children}</span>;
}

// What Helios hands back, as a ledger on the sheet.
function Ledger({ kind }: { kind: Use["kind"] }) {
  const line = "flex items-baseline py-2.5 text-[14px] sm:text-[16px]";
  if (kind === "report")
    return (
      <dl className="grid grid-cols-2 gap-y-5 border-y border-ink/15 py-5 sm:grid-cols-4">
        {[
          ["Spend", "$21,730"],
          ["Calls", "157"],
          ["Closes", "18"],
          ["Cash", "$111,050"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="font-serif text-[13px] italic tracking-[0.04em] text-ink-3">{k}</dt>
            <dd className="mt-1 font-serif text-[26px] leading-none tabular-nums text-ink sm:text-[28px]">{v}</dd>
          </div>
        ))}
      </dl>
    );
  if (kind === "script")
    return (
      <blockquote className="border-l-2 border-ink/20 pl-5">
        <p className="text-pretty font-serif text-[22px] italic leading-[1.3] text-ink sm:text-[24px]">
          “Half the calls on your calendar never show up. The ones that do were never going to buy.”
        </p>
        <footer className="mt-2 text-[13px] text-ink-3">Pain hook · for a talking-head VSL</footer>
      </blockquote>
    );
  const rows =
    kind === "audit"
      ? [
          { label: "Spring VSL · Hook 3", figure: "$9.12 per $1", good: true, verdict: "scale" },
          { label: "Offer · Hook 5", figure: "$1.52 per $1", good: false, verdict: "cut" },
        ]
      : [
          { label: "Partner objections", figure: "4 of 5", good: true, verdict: "handled" },
          { label: "Contract questions", figure: "3 of 3", good: false, verdict: "parked" },
        ];
  return (
    <ul className="divide-y divide-ink/10 border-y border-ink/15">
      {rows.map((r) => (
        <li key={r.label} className={line}>
          <span className="whitespace-nowrap text-ink">{r.label}</span>
          <Leader />
          <span className="whitespace-nowrap tabular-nums text-ink-2">{r.figure}</span>
          <span className="ml-3 w-[52px] shrink-0 text-right sm:ml-4 sm:w-[64px]">
            <Verdict good={r.good}>{r.verdict}</Verdict>
          </span>
        </li>
      ))}
    </ul>
  );
}

function Sheet({ use, n }: { use: Use; n: number }) {
  return (
    <article
      className="relative w-full max-w-[600px] bg-[#fbf8f1] px-6 py-7 text-left shadow-[0_1px_2px_rgba(40,30,10,0.12),0_28px_56px_-24px_rgba(40,30,10,0.5)] sm:px-10 sm:py-10"
    >
      <header className="flex items-baseline justify-between gap-4 border-b border-ink/15 pb-3 text-[12px] uppercase tracking-[0.14em] text-ink-3">
        <span>Helios · Report {ROMAN[n]}</span>
        <span className="hidden sm:inline">{SHEET_DATE}</span>
      </header>
      <h3 className="mt-6 text-balance font-serif text-[26px] leading-[1.15] tracking-[-0.01em] text-ink sm:text-[32px]">{use.question}</h3>
      <p className="mt-4 text-pretty text-[16px] leading-[1.55] text-ink-2 sm:text-[17px]">{use.answer}</p>
      <div className="mt-6">
        <Ledger kind={use.kind} />
      </div>
      <footer className="mt-6 flex items-baseline justify-between gap-4 text-[13px] text-ink-3">
        <span className="font-serif text-[16px] italic text-ink-2">Helios</span>
        <span className="text-right">From {use.sources}</span>
      </footer>
    </article>
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
          <div className="relative grid items-center gap-8 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_minmax(0,600px)] lg:gap-12 lg:px-12 lg:py-16">
            {/* The page: one report, rising in when it turns. */}
            <div aria-live="polite" className="grid justify-items-center lg:order-2 lg:justify-items-end">
              <div key={`${current}-${round}`} className="helios-page w-full max-w-[600px]">
                <Sheet use={uses[current]} n={current} />
              </div>
            </div>

            {/* The index: the four questions, the controls. On paper too, so it reads over the painting. */}
            <div role="group" aria-label="Show Helios answering" className="bg-[#fbf8f1]/90 shadow-[0_18px_40px_-24px_rgba(40,30,10,0.45)] backdrop-blur-sm lg:order-1">
              <p className="border-b border-ink/10 px-5 py-3 text-[12px] uppercase tracking-[0.14em] text-ink-3">Ask Helios</p>
              <ul>
                {uses.map((u, i) => {
                  const on = i === current;
                  return (
                    <li key={u.lead} className="border-b border-ink/10 last:border-b-0">
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => pick(i)}
                        className="group relative flex w-full cursor-pointer gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink"
                      >
                        <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-ink/[0.07]" />
                        {on && (
                          <span
                            key={`${current}-${round}`}
                            aria-hidden
                            onAnimationEnd={next}
                            className="helios-turn absolute inset-y-0 left-0 w-0.5 bg-ink"
                            style={{ animationPlayState: running ? "running" : "paused" }}
                          />
                        )}
                        <span className={`w-6 shrink-0 font-serif text-[15px] italic tracking-[0.06em] ${on ? "text-ink" : "text-ink-3"}`}>{ROMAN[i]}</span>
                        <span className="min-w-0">
                          <span className={`block font-serif text-[18px] leading-[1.25] transition-colors duration-150 ${on ? "text-ink" : "text-ink-2 group-hover:text-ink"}`}>
                            {u.question}
                          </span>
                          <span className="mt-1 block text-[13.5px] leading-[1.4] text-ink-3">
                            {u.lead} {u.rest}
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="frame h-16 lg:h-24" />
    </section>
  );
}

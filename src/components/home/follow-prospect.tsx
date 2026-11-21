"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { prospect } from "@/content/prospect";
import { StepTouchpoints } from "@/components/home/step-touchpoints";
import { StepCreatives } from "@/components/home/step-creatives";
import { StepSignals } from "@/components/home/step-signals";
import { StepCall } from "@/components/home/step-call";
import { StepPayments } from "@/components/home/step-payments";
import { StepMatch } from "@/components/home/step-match";
import { StepVerdict } from "@/components/home/step-verdict";
import { stepBackgrounds } from "@/components/home/backgrounds";

// "Follow one prospect", the Fingerprinting Attribution section (docs/decisions/prospect.md). Seven steps
// down the page, each a visual and its caption. From 1024px they sit side by side and alternate sides; below
// that the visual sits above the caption. Nothing is pinned and the page scrolls freely: the client's
// feedback was that a pinned stage that swaps as you scroll hurts skimming. A step's interface plays its
// entrance once, the first time it is a third on screen. Interfaces are built on the GoFunnel design system
// (.gf-ds), one component per step.

const num = (i: number) => String(i + 1).padStart(2, "0");

// One interface per step, in order.
const interfaces: ((props: { active: boolean; animate?: boolean }) => React.ReactNode)[] = [
  StepTouchpoints,
  StepCreatives,
  StepSignals,
  StepCall,
  StepPayments,
  StepMatch,
  StepVerdict,
];

export function FollowProspect() {
  const { headline, body, cta, steps } = prospect;
  // Which steps have been on screen. Once seen, a step stays seen, so its entrance plays once.
  const [seen, setSeen] = useState<boolean[]>(() => steps.map(() => false));
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = Number((e.target as HTMLElement).dataset.index);
          setSeen((prev) => (prev[i] ? prev : prev.map((v, k) => v || k === i)));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 },
    );
    rows.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="prospect-title" className="bg-canvas">
      <div className="frame border-t border-line px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <h2
            id="prospect-title"
            className="text-balance font-serif text-[32px] leading-[1.1] tracking-[-0.01em] text-ink sm:text-[44px]"
          >
            {headline}
          </h2>
          <p className="mt-4 max-w-[48ch] text-pretty text-[17px] leading-[1.55] text-ink-2">{body}</p>
          <Link href={cta.href} className="btn btn-secondary mt-8">
            {cta.label}
          </Link>
        </div>

        <ol className="mt-14 flex flex-col gap-14 lg:mt-24 lg:gap-28">
          {steps.map((s, i) => {
            const Interface = interfaces[i];
            const Bg = stepBackgrounds[i];
            return (
              <li
                key={s.title}
                data-index={i}
                ref={(el) => {
                  rows.current[i] = el;
                }}
                className="lg:grid lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-center lg:gap-14"
              >
                {Interface ? (
                  <div
                    aria-hidden
                    className={`gf-ds stage relative overflow-hidden rounded-[20px] border border-line p-3 sm:p-6 ${i % 2 ? "lg:order-2" : ""}`}
                  >
                    {Bg && <Bg />}
                    <div className="relative">
                      <Interface active={seen[i]} />
                    </div>
                  </div>
                ) : (
                  <div aria-hidden className="gf-ds stage aspect-[4/3] rounded-[20px] border border-line" />
                )}
                <div className="mt-5 lg:mt-0">
                  <span className="block text-[13px] tabular-nums text-ink-3">
                    {num(i)} <span className="hidden lg:inline">/ {num(steps.length - 1)}</span>
                  </span>
                  <h3 className="mt-1 text-[20px] font-medium leading-[1.25] tracking-[-0.01em] text-ink lg:mt-2 lg:text-[26px]">{s.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-pretty text-[16px] leading-[1.55] text-ink-2 lg:mt-3 lg:text-[17px]">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

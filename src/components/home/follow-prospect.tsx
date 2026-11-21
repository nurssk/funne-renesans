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

// "Follow one prospect", the Fingerprinting Attribution section, "Stage" direction
// (docs/decisions/prospect.md). Desktop: one wide stage is pinned in the middle of the screen and the
// step's interface and caption swap as the section scrolls. Interfaces are built on the GoFunnel design
// system (.gf-ds), one component per step. Seven invisible markers (70vh each) sit
// behind the stage; the one crossing the middle of the screen picks the step. Until the reader reaches the
// first marker no step is active, so step 01's entrance plays when they arrive, not on page load.
// Below 1024px: steps stacked.
const STEP_VH = 70;

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

// Shrinks an interface to fit the stage when the screen is short (the stage is min(520px, 58vh)), so
// a tall one never spills past the stage's edges. Never scales up.
function Fit({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = box.current;
    const layer = el?.parentElement;
    if (!el || !layer) return;
    const measure = () => {
      const pad = parseFloat(getComputedStyle(layer).paddingTop) * 2;
      setScale(Math.min(1, (layer.clientHeight - pad) / el.offsetHeight));
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(layer);
    const id = requestAnimationFrame(measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);
  return (
    <div ref={box} className="relative flex w-full justify-center" style={scale < 1 ? { scale: String(scale) } : undefined}>
      {children}
    </div>
  );
}

export function FollowProspect() {
  const { headline, body, cta, steps } = prospect;
  const [active, setActive] = useState(-1);
  const shown = Math.max(active, 0);
  const markers = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    markers.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="prospect-title" className="bg-canvas">
      <div className="frame border-t border-line px-6 py-24 lg:px-10 lg:pb-0 lg:pt-32">
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

        {/* Desktop: the pinned stage. Screen readers get the stacked list below instead. */}
        {/* The pinned frame is a full screen tall with its content centred, so the last frame would leave
            half the spare height (more on tall screens) as empty space under the caption. The negative
            bottom margin pulls the next section up by that spare space minus 96px, so the gap after the
            last caption is always 96px. The spare area is empty and click-through. Content height =
            the stage, min(520px, 58vh), plus the caption block, about 92px. */}
        <div
          aria-hidden
          className="pointer-events-none relative hidden lg:block"
          style={{
            height: `${steps.length * STEP_VH + 30}vh`,
            // The same spare space sits above the first frame, so the stage starts 64px under the intro.
            marginTop: "calc(64px - (100vh - min(520px, 58vh) - 92px) / 2)",
            marginBottom: "calc(96px - (100vh - min(520px, 58vh) - 92px) / 2)",
          }}
        >
          <div className="pointer-events-none sticky top-0 flex h-screen flex-col items-center justify-center">
            {/* The stage: one layer per step, the active one shown (200ms crossfade). */}
            <div className="gf-ds stage relative h-[min(520px,58vh)] w-full max-w-[920px] overflow-hidden rounded-[20px] border border-line">
              {steps.map((s, i) => {
                const Interface = interfaces[i];
                const Bg = stepBackgrounds[i];
                return (
                  <div
                    key={s.title}
                    className={`absolute inset-0 flex items-center justify-center p-6 transition-[opacity,visibility] duration-200 ease-out motion-reduce:transition-none ${
                      active === i ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
                    }`}
                  >
                    {/* Each step sits on its own grainy colour field; it crossfades with the layer. */}
                    {Bg && <Bg />}
                    {Interface && (
                      <Fit>
                        <Interface active={active === i} />
                      </Fit>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="mt-8 grid w-full max-w-[920px] grid-cols-[168px_minmax(0,1fr)] gap-10">
              {/* Progress: the step number rolls (old one up and out, new one up from below, reversed when
                  scrolling back), and one segment per step fills from the left. Done segments stay faint,
                  the current one is solid. */}
              <div className="pt-1">
                <div className="flex items-center gap-1.5 text-[15px] leading-[1.25] tabular-nums">
                  <span className="relative inline-block h-[1.25em] w-[2ch] overflow-hidden font-medium text-ink">
                    {steps.map((s, i) => (
                      <span
                        key={s.title}
                        className={`absolute inset-0 transition-[translate] duration-[320ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
                          i < shown ? "-translate-y-full" : i > shown ? "translate-y-full" : "translate-y-0"
                        }`}
                      >
                        {num(i)}
                      </span>
                    ))}
                  </span>
                  <span className="text-ink-3">/ {num(steps.length - 1)}</span>
                </div>
                <div className="mt-3 flex gap-1">
                  {steps.map((s, i) => (
                    <span key={s.title} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ink/[0.08]">
                      <span
                        className={`block h-full origin-left rounded-full transition-[scale,background-color] duration-[320ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none ${
                          i < shown ? "scale-x-100 bg-ink/30" : i === shown ? "scale-x-100 bg-ink" : "scale-x-0 bg-ink"
                        }`}
                      />
                    </span>
                  ))}
                </div>
              </div>

              {/* Captions: all seven share one grid cell, so the box keeps the height of the longest and nothing
                  jumps. The outgoing one fades and drifts 8px away (120ms), the new one follows from the
                  other side (280ms, 90ms later). Direction follows the scroll. */}
              <div className="grid">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className={`[grid-area:1/1] motion-reduce:translate-y-0 motion-reduce:transition-none ${
                      i === shown
                        ? "translate-y-0 opacity-100 transition-[opacity,translate] delay-[90ms] duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                        : `${i < shown ? "-translate-y-2" : "translate-y-2"} opacity-0 transition-[opacity,translate] duration-[120ms] ease-[cubic-bezier(0.4,0,1,1)]`
                    }`}
                  >
                    <h3 className="text-[22px] font-medium leading-[1.25] tracking-[-0.01em] text-ink">{s.title}</h3>
                    <p className="mt-2 max-w-[60ch] text-pretty text-[16px] leading-[1.55] text-ink-2">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-[15vh]">
            {steps.map((s, i) => (
              <div
                key={s.title}
                data-index={i}
                ref={(el) => {
                  markers.current[i] = el;
                }}
                style={{ height: `${STEP_VH}vh` }}
              />
            ))}
          </div>
        </div>

        {/* Below 1024px (and for screen readers on every size): each step's visual, then its text. */}
        <ol className="mt-14 flex flex-col gap-14 lg:sr-only">
          {steps.map((s, i) => {
            const Interface = interfaces[i];
            const Bg = stepBackgrounds[i];
            return (
              <li key={s.title}>
                {Interface ? (
                  <div aria-hidden className="gf-ds stage relative overflow-hidden rounded-[20px] border border-line p-3 sm:p-6">
                    {Bg && <Bg />}
                    <div className="relative">
                      <Interface active animate={false} />
                    </div>
                  </div>
                ) : (
                  <div aria-hidden className="gf-ds stage aspect-[4/3] rounded-[20px] border border-line" />
                )}
                <span className="mt-5 block text-[13px] tabular-nums text-ink-3">{num(i)}</span>
                <h3 className="mt-1 text-[20px] font-medium leading-[1.25] text-ink">{s.title}</h3>
                <p className="mt-2 text-pretty text-[16px] leading-[1.55] text-ink-2">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

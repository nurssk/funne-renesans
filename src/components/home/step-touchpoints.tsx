import type { CSSProperties } from "react";
import { ArrowDown, Check } from "lucide-react";
import { optIn, visits, type Visit } from "@/content/prospect-demo";

// Step 01 interface, "Table" direction (docs/decisions/prospect.md): the app's data table built on the
// GoFunnel design system (classes from src/styles/gofunnel-ds.css; render inside a .gf-ds element).
// When `active` turns true the touchpoint rows arrive one by one, then the opt-in row turns Identified.
// When it turns false everything resets with no transition, so it plays again next time.
// `animate={false}` shows the end state with no motion (used on phones).

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

// Each channel keeps one colour from the design system's tag pairs, so the column reads at a glance.
const channelTag: Record<Visit["channel"], string> = {
  Paid: "tag-positive",
  Organic: "tag-attention",
  "AI assistant": "tag-accent",
};
const STAGGER = 50;
const ENTER = 260;
const JOIN_DELAY = visits.length * STAGGER + 270; // the opt-in row turns teal after it has arrived

function enter(on: boolean, delay: number, animate: boolean): CSSProperties {
  if (!animate) return {};
  return {
    opacity: on ? 1 : 0,
    translate: on ? "0 0" : "0 6px",
    transitionProperty: "opacity, translate",
    transitionDuration: on ? `${ENTER}ms` : "0ms",
    transitionTimingFunction: EASE,
    transitionDelay: on ? `${delay}ms` : "0ms",
  };
}

export function StepTouchpoints({ active, animate = true }: { active: boolean; animate?: boolean }) {
  const cell = "h-10 border-b border-r hairline px-3 align-middle";
  const joined = !animate || active;
  const optInDelay = visits.length * STAGGER;

  return (
    <div className="card w-full max-w-[760px] overflow-hidden">
      <table className="caption w-full table-fixed border-collapse text-left c-secondary">
        <colgroup>
          <col className="w-[104px]" />
          <col />
          <col className="w-[112px]" />
          <col className="hidden w-[108px] md:table-column" />
          <col className="hidden w-[118px] md:table-column" />
        </colgroup>
        <thead className="surface">
          <tr>
            <th className={`${cell} font-normal`}>
              Date <ArrowDown aria-label="sorted, oldest first" className="inline size-3" strokeWidth={1.75} />
            </th>
            <th className={`${cell} font-normal`}>Touchpoint</th>
            <th className={`${cell} font-normal`}>Channel</th>
            <th className={`${cell} hidden font-normal md:table-cell`}>Device</th>
            <th className={`${cell} hidden border-r-0 font-normal md:table-cell`}>Location</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v, i) => (
            <tr key={i} data-anim style={enter(active, i * STAGGER, animate)}>
              <td className={`${cell} tabular-nums`}>{v.date}</td>
              <td className={cell}>
                <div className="truncate">
                  {v.source} · {v.detail}
                </div>
              </td>
              <td className={cell}>
                <span className={`tag ${channelTag[v.channel]}`}>{v.channel}</span>
              </td>
              <td className={`${cell} hidden md:table-cell`}>
                <div className="truncate">{v.device}</div>
              </td>
              <td className={`${cell} hidden border-r-0 md:table-cell`}>
                <div className="truncate">{v.place}</div>
              </td>
            </tr>
          ))}
          <tr
            data-anim
            style={{
              ...enter(active, optInDelay, animate),
              backgroundColor: joined ? "var(--color-background-accent-subtle)" : "transparent",
              ...(animate && {
                transitionProperty: "opacity, translate, background-color",
                transitionDuration: active ? `${ENTER}ms, ${ENTER}ms, 320ms` : "0ms",
                transitionDelay: active ? `${optInDelay}ms, ${optInDelay}ms, ${JOIN_DELAY}ms` : "0ms",
              }),
            }}
          >
            <td className={`${cell} border-b-0 tabular-nums`}>{optIn.date}</td>
            <td className={`${cell} border-b-0`}>
              <div className="truncate">
                {optIn.source} · {optIn.detail}
              </div>
            </td>
            <td className={`${cell} border-b-0`}>
              <span
                data-anim
                className="tag tag-solid"
                style={
                  animate
                    ? {
                        opacity: active ? 1 : 0,
                        scale: active ? "1" : "0.96",
                        transitionProperty: "opacity, scale",
                        transitionDuration: active ? "200ms" : "0ms",
                        transitionTimingFunction: EASE,
                        transitionDelay: active ? `${JOIN_DELAY}ms` : "0ms",
                      }
                    : undefined
                }
              >
                <Check aria-hidden className="size-3" strokeWidth={2} />
                Identified
              </span>
            </td>
            <td className={`${cell} hidden border-b-0 md:table-cell`}>MacBook Air</td>
            <td className={`${cell} hidden border-b-0 border-r-0 md:table-cell`}>Austin, TX</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

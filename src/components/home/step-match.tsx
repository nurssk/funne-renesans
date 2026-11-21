import type { CSSProperties } from "react";
import { Check } from "lucide-react";
import { emq, lead, matchKeys, purchaseSent } from "@/content/prospect-demo";

// Step 06 interface, "Match" direction (docs/decisions/prospect.md): one Purchase event as GoFunnel sent it
// to Meta, on the GoFunnel design system (render inside a .gf-ds element). One card: the event, three
// numbers (value, when it was sent, Event Match Quality 9.3, the approved figure), then the match data it
// carried and where in her journey each piece came from.
// Motion: when `active` turns true the card fills in reading order (opacity + 6px rise, 260ms, strong
// ease-out, 40ms stagger): the event name, the three numbers, then the seven match rows top to bottom
// under a header that stays put, the data being gathered. The one moment: the "Sent to Meta" tag lands
// last (scale 0.96 to 1). All of it is done by ~660ms. When `active` turns false everything fades out
// together (150ms, ease-in, no movement, no stagger); the rise/scale resets only once it is invisible,
// ready to play again.
// `animate={false}` renders the end state with no inline transition styles (used on phones).

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";
const STAGGER = 40;
const ENTER = 260;
const LAND = 200;
const EXIT = 150;
const KPI_AT = STAGGER; // after the event name
const ROWS_AT = 4 * STAGGER; // after the three numbers (the table header stays put, like step 01's)
const TAG_AT = ROWS_AT + matchKeys.length * STAGGER; // once the last row is on its way

// Enter: opacity plus one transform property, staggered. Exit: opacity only, all at once; the transform
// snaps back to its hidden value after the fade, so nothing moves while leaving.
function motion(on: boolean, delay: number, animate: boolean, kind: "rise" | "land" = "rise"): CSSProperties {
  if (!animate) return {};
  const transform: CSSProperties =
    kind === "rise" ? { translate: on ? "0 0" : "0 6px" } : { scale: on ? "1" : "0.96" };
  return {
    opacity: on ? 1 : 0,
    ...transform,
    transitionProperty: `opacity, ${kind === "rise" ? "translate" : "scale"}`,
    transitionDuration: on ? `${kind === "rise" ? ENTER : LAND}ms` : `${EXIT}ms, 0ms`,
    transitionTimingFunction: on ? EASE_OUT : EASE_IN,
    transitionDelay: on ? `${delay}ms` : `0ms, ${EXIT}ms`,
  };
}

export function StepMatch({ active, animate = true }: { active: boolean; animate?: boolean }) {
  const cell = "h-10 border-b border-r hairline px-3 py-2 align-middle sm:px-4 sm:py-0";
  const [day, time] = purchaseSent.at.split(", ");
  const kpis = [
    { label: "Value", value: "$4,800", sub: "Paid in full" },
    { label: "Sent", value: time, sub: day },
    { label: "Event Match Quality", short: "Match", value: emq, of: " / 10", sub: "Scored by Meta", subShort: "By Meta" },
  ];

  return (
    <div className="card w-full max-w-[720px] overflow-hidden">
      <div className="flex h-[54px] items-center gap-3 border-b hairline px-3 sm:px-4">
        <div data-anim className="min-w-0 flex-1" style={motion(active, 0, animate)}>
          <div className="truncate c-primary">Purchase</div>
          <div className="caption truncate c-secondary">
            {lead.name}
            <span className="hidden sm:inline"> · {purchaseSent.route}</span>
          </div>
        </div>
        <span data-anim className="tag tag-accent" style={motion(active, TAG_AT, animate, "land")}>
          <Check aria-hidden className="size-3" strokeWidth={2} />
          Sent to Meta
        </span>
      </div>

      <dl className="grid grid-cols-3 border-b hairline">
        {kpis.map((k, i) => {
          // The cell's divider stays put; its label, number and note arrive together.
          const kpi = motion(active, KPI_AT + i * STAGGER, animate);
          return (
            <div key={k.label} className={`min-w-0 px-3 py-3 sm:px-4 ${i > 0 ? "border-l hairline" : ""}`}>
              <dt data-anim className="caption truncate c-secondary" style={kpi}>
                {k.short ? (
                  <>
                    <span className="sm:hidden">{k.short}</span>
                    <span className="hidden sm:inline">{k.label}</span>
                  </>
                ) : (
                  k.label
                )}
              </dt>
              <dd data-anim className="h1 mt-1 whitespace-nowrap tabular-nums c-primary" style={kpi}>
                {k.value}
                {k.of && <span className="c-tertiary">{k.of}</span>}
              </dd>
              <dd data-anim className="caption mt-0.5 truncate c-secondary" style={kpi}>
                {k.subShort ? (
                  <>
                    <span className="sm:hidden">{k.subShort}</span>
                    <span className="hidden sm:inline">{k.sub}</span>
                  </>
                ) : (
                  k.sub
                )}
              </dd>
            </div>
          );
        })}
      </dl>

      <table className="caption w-full table-fixed border-collapse text-left c-secondary">
        <colgroup>
          <col className="w-[44%]" />
          <col />
        </colgroup>
        <thead className="surface">
          <tr>
            <th className={`${cell} font-normal`}>Match data</th>
            <th className={`${cell} border-r-0 font-normal`}>From her journey</th>
          </tr>
        </thead>
        <tbody>
          {matchKeys.map((m, i) => {
            const last = i === matchKeys.length - 1 ? "border-b-0" : "";
            return (
              <tr key={m.key} data-anim style={motion(active, ROWS_AT + i * STAGGER, animate)}>
                <td className={`${cell} ${last}`}>
                  <div className="c-primary sm:truncate">{m.key}</div>
                </td>
                <td className={`${cell} ${last} border-r-0`}>
                  <div className="sm:truncate">{m.from}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

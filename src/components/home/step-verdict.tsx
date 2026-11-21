import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { creatives, money, type Creative } from "@/content/prospect-demo";

// Step 07 interface, "Verdict" direction (docs/decisions/prospect.md): two creatives side by side on the
// GoFunnel design system (render inside a .gf-ds element). Rows are grouped by where the number comes from:
// the ad platform has cost per call, and there Offer · Hook 5 wins; only GoFunnel has close rate and cash,
// and there Spring VSL · Hook 3 wins. One outcome tag per row, on the winner. Helios closes with the call to
// make. Numbers come from step 02's `creatives`, so the two steps agree.
// Motion. When `active` turns true the card arrives in reading order, each piece fading in and rising 6px
// (260ms, cubic-bezier(0.23, 1, 0.32, 1), 50ms apart): the creative header, "From the ad platform", Cost per
// call; then a short beat before "Only in GoFunnel", Close rate, Cash collected and the Helios line. The one
// moment comes last: the two green winner tags on Close rate and Cash land (scale 0.96 to 1), so the reader
// sees the ad platform's pick first and GoFunnel's winner settle in after. When `active` turns false
// everything fades out together (150ms, ease-in, no stagger), then snaps back to its start offset unseen, so
// it plays again next time. `animate={false}` renders the end state with no inline motion (phones). Reduced
// motion: .gf-ds [data-anim].

const cheap = creatives.find((c) => c.id === "c4") as Creative; // Offer · Hook 5: cheapest call, fewest closes
const good = creatives.find((c) => c.id === "c1") as Creative; // Spring VSL · Hook 3: dearer call, most cash

const usd = (n: number, digits = 0) =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const pct = (n: number) => (n * 100).toFixed(1) + "%";

const EASE_ENTER = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_EXIT = "cubic-bezier(0.4, 0, 1, 1)";
const ENTER = 260;
const EXIT = 150;
const STAGGER = 50;

// Entrance timeline (ms). The beat before "Only in GoFunnel" separates the two sources of truth.
const T = {
  header: 0,
  platformGroup: STAGGER,
  platformRow: STAGGER * 2,
  goFunnelGroup: STAGGER * 2 + 90,
  goFunnelRow: STAGGER * 3 + 90, // + i * STAGGER
  helios: STAGGER * 5 + 90,
  tags: STAGGER * 5 + 190, // the moment: lands as the last rows settle, done by ~700ms
};

// `from` is the hidden state: rows rise 6px, tags grow from 0.96. On exit only the opacity is seen; the
// offset snaps back after the fade so the next entrance starts from it.
function motion(
  on: boolean,
  delay: number,
  animate: boolean,
  from: "rise" | "land" = "rise",
): CSSProperties | undefined {
  if (!animate) return undefined;
  const prop = from === "rise" ? "translate" : "scale";
  const rest = from === "rise" ? "0 0" : "1";
  const hidden = from === "rise" ? "0 6px" : "0.96";
  return {
    opacity: on ? 1 : 0,
    [prop]: on ? rest : hidden,
    transitionProperty: `opacity, ${prop}`,
    transitionDuration: on ? `${ENTER}ms` : `${EXIT}ms, 0ms`,
    transitionTimingFunction: on ? EASE_ENTER : EASE_EXIT,
    transitionDelay: on ? `${delay}ms` : `0ms, ${EXIT}ms`,
  };
}

type Side = { value: string; caption: string; win?: ReactNode };
type Row = { label: string; a: Side; b: Side };

const costA = cheap.spend / cheap.calls;
const costB = good.spend / good.calls;
const rateA = cheap.closes / cheap.calls;
const rateB = good.closes / good.calls;

const platformRows: Row[] = [
  {
    label: "Cost per call",
    a: {
      value: usd(costA),
      caption: `${cheap.calls} calls on ${money(cheap.spend)}`,
      win: (
        <>
          <ArrowDown aria-hidden className="size-3" strokeWidth={2} />
          {Math.round((1 - costA / costB) * 100)}% cheaper
        </>
      ),
    },
    b: { value: usd(costB), caption: `${good.calls} calls on ${money(good.spend)}` },
  },
];

const goFunnelRows: Row[] = [
  {
    label: "Close rate",
    a: { value: pct(rateA), caption: `${cheap.closes} of ${cheap.calls} calls` },
    b: {
      value: pct(rateB),
      caption: `${good.closes} of ${good.calls} calls`,
      win: (
        <>
          <ArrowUp aria-hidden className="size-3" strokeWidth={2} />
          {(rateB / rateA).toFixed(1)}×
        </>
      ),
    },
  },
  {
    label: "Cash collected",
    a: { value: money(cheap.cash), caption: `${usd(cheap.cash / cheap.spend, 2)} per $1 spent` },
    b: {
      value: money(good.cash),
      caption: `${usd(good.cash / good.spend, 2)} per $1 spent`,
      win: (
        <>
          <ArrowUp aria-hidden className="size-3" strokeWidth={2} />
          {(good.cash / cheap.cash).toFixed(1)}×
        </>
      ),
    },
  },
];

const grid = "grid grid-cols-2 sm:grid-cols-[148px_minmax(0,1fr)_minmax(0,1fr)]";

function Value({ side, last, tagStyle }: { side: Side; last?: boolean; tagStyle?: CSSProperties }) {
  return (
    <div className={`min-w-0 px-3 pb-3 pt-1 sm:px-4 sm:pt-3 ${last ? "" : "border-r hairline"}`}>
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="h1 tabular-nums c-primary">{side.value}</span>
        {side.win && (
          <span data-anim={tagStyle ? "" : undefined} className="tag tag-positive" style={tagStyle}>
            {side.win}
          </span>
        )}
      </div>
      <div className="caption mt-0.5 truncate tabular-nums c-secondary">{side.caption}</div>
    </div>
  );
}

function Rows({
  rows,
  style,
  tagStyle,
}: {
  rows: Row[];
  style?: (i: number) => CSSProperties | undefined;
  tagStyle?: CSSProperties;
}) {
  return rows.map((r, i) => (
    <div key={r.label} data-anim className={`${grid} border-b hairline`} style={style?.(i)}>
      <div className="caption col-span-2 px-3 pt-3 c-secondary sm:col-span-1 sm:border-r sm:px-4 hairline">
        {r.label}
      </div>
      <Value side={r.a} tagStyle={tagStyle} />
      <Value side={r.b} last tagStyle={tagStyle} />
    </div>
  ));
}

function Group({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div data-anim className="caption surface border-b hairline px-3 py-1.5 c-secondary sm:px-4" style={style}>
      {children}
    </div>
  );
}

export function StepVerdict({ active, animate = true }: { active: boolean; animate?: boolean }) {
  return (
    <div className="card w-full max-w-[720px] overflow-hidden">
      <div data-anim className={`${grid} border-b hairline`} style={motion(active, T.header, animate)}>
        {/* The corner holds the date range the comparison covers, as the app's tables do. */}
        <div className="hidden min-w-0 border-r px-4 py-2.5 hairline sm:block">
          <div className="truncate c-primary">Last 30 days</div>
          <div className="caption truncate c-secondary">Oct 19 – Nov 17</div>
        </div>
        {[cheap, good].map((c, i) => (
          <div key={c.id} className={`min-w-0 px-3 py-2.5 sm:px-4 ${i === 0 ? "border-r hairline" : ""}`}>
            <div className="c-primary sm:truncate">{c.name}</div>
            <div className="caption c-secondary sm:truncate">
              {c.style} · {c.hookType.toLowerCase()} hook
            </div>
          </div>
        ))}
      </div>

      <Group style={motion(active, T.platformGroup, animate)}>From the ad platform</Group>
      <Rows rows={platformRows} style={() => motion(active, T.platformRow, animate)} />

      <Group style={motion(active, T.goFunnelGroup, animate)}>Only in GoFunnel</Group>
      <Rows
        rows={goFunnelRows}
        style={(i) => motion(active, T.goFunnelRow + i * STAGGER, animate)}
        tagStyle={motion(active, T.tags, animate, "land")}
      />

      <div data-anim className="px-3 py-3 sm:px-4" style={motion(active, T.helios, animate)}>
        <div className="caption c-secondary">Helios</div>
        <p className="text-pretty c-primary">
          {cheap.name} books cheap calls that don&rsquo;t close. Move budget to {good.name}.
        </p>
      </div>
    </div>
  );
}

import type { CSSProperties } from "react";
import { ArrowUp, Check, CircleAlert, Compass, Play, ShieldAlert, TrendingUp, Video, X, type LucideIcon } from "lucide-react";
import { call, closer, lead, moments, type Moment, type MomentKind } from "@/content/prospect-demo";

// Step 04 interface, "Insights" direction (docs/decisions/prospect.md): call intelligence's read of one
// call on the GoFunnel design system (render inside a .gf-ds element). Three scores, then every flagged
// moment in her own words; outcomes in green or red, always with an icon.
// When `active` turns true the card reads itself in: header, the three scores left to right, then the
// moment rows top to bottom (opacity + 6px rise, 260ms, 45ms stagger). Each outcome tag lands just after
// its row (opacity + scale 0.96 to 1, 200ms); the entrance ends by ~700ms. When `active` turns false
// everything fades out together (150ms, no movement, no stagger), then resets quietly for the next entrance.
// `animate={false}` shows the end state with no motion (used on phones).

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";
const ENTER = 260;
const TAG_ENTER = 200;
const EXIT = 150;
const STAGGER = 45;
const ROWS_START = 4 * STAGGER; // after the header and the three KPI cells
const TAG_LAG = 140; // an outcome tag lands once its row has mostly arrived

// Enter: fade plus a small move, delayed into reading order. Exit: fade only, all at once; the offset snaps
// back after the fade has finished, so nothing moves while leaving and the next entrance starts hidden.
function motion(on: boolean, delay: number, animate: boolean, move: "translate" | "scale"): CSSProperties {
  if (!animate) return {};
  const hidden = move === "translate" ? "0 6px" : "0.96";
  const shown = move === "translate" ? "0 0" : "1";
  return {
    opacity: on ? 1 : 0,
    [move]: on ? shown : hidden,
    transitionProperty: `opacity, ${move}`,
    transitionDuration: on ? `${move === "translate" ? ENTER : TAG_ENTER}ms` : `${EXIT}ms, 0ms`,
    transitionTimingFunction: on ? EASE_OUT : EASE_IN,
    transitionDelay: on ? `${delay}ms` : `0ms, ${EXIT}ms`,
  };
}

const kindIcon: Record<MomentKind, LucideIcon> = {
  pain: CircleAlert,
  aspiration: Compass,
  objection: ShieldAlert,
  signal: TrendingUp,
};

const kindLabel: Record<MomentKind, string> = {
  pain: "Pain point",
  aspiration: "Aspiration",
  objection: "Objection",
  signal: "Buying signal",
};

// Outcomes only, green or red and always with an icon. Pain points and aspirations carry no tag.
function outcome(m: Moment) {
  if (m.kind === "signal")
    return (
      <span className="tag tag-positive">
        <ArrowUp aria-hidden className="size-3" strokeWidth={2} />
        Buying signal
      </span>
    );
  if (m.outcome === "handled")
    return (
      <span className="tag tag-positive">
        <Check aria-hidden className="size-3" strokeWidth={2} />
        Handled
      </span>
    );
  if (m.outcome === "missed")
    return (
      <span className="tag tag-negative">
        <X aria-hidden className="size-3" strokeWidth={2} />
        Missed
      </span>
    );
  return null;
}

const kpis = [
  { label: "Deal probability", short: "Probability", value: `${call.dealProbability}%`, sub: "Partner joins the next call" },
  { label: "Qualified", value: call.qualified, sub: "Authority is shared" },
  { label: "Rep score", value: call.repScore, of: " / 10", sub: "Closer rubric" },
];

export function StepCall({ active, animate = true }: { active: boolean; animate?: boolean }) {
  return (
    <div className="card w-full max-w-[800px] overflow-hidden">
      <div
        data-anim
        style={motion(active, 0, animate, "translate")}
        className="flex h-[54px] items-center gap-3 border-b hairline px-3 sm:px-4"
      >
        <span className="icon-holder hidden sm:flex">
          <Video aria-hidden className="size-[18px]" strokeWidth={1.5} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate c-primary">
            {call.title} · {lead.name}
          </div>
          <div className="caption truncate c-secondary">
            {closer.name}, closer · {call.date} · {call.minutes} min
          </div>
        </div>
        <span className="tag tag-neutral">{call.recorder}</span>
      </div>
      <dl className="grid grid-cols-3 border-b hairline">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            data-anim
            style={motion(active, (i + 1) * STAGGER, animate, "translate")}
            className={`min-w-0 px-3 py-3 sm:px-4 ${i > 0 ? "border-l hairline" : ""}`}
          >
            <dt className="caption truncate c-secondary">
              {k.short ? (
                <>
                  <span className="sm:hidden">{k.short}</span>
                  <span className="hidden sm:inline">{k.label}</span>
                </>
              ) : (
                k.label
              )}
            </dt>
            <dd className="h1 mt-1 whitespace-nowrap tabular-nums c-primary">
              {k.value}
              {k.of && <span className="hidden c-tertiary sm:inline">{k.of}</span>}
            </dd>
            <dd className="caption mt-0.5 hidden truncate c-tertiary sm:block">{k.sub}</dd>
          </div>
        ))}
      </dl>
      <ul>
        {moments.map((m, i) => {
          const Icon = kindIcon[m.kind];
          const rowDelay = ROWS_START + i * STAGGER;
          const tag = motion(active, rowDelay + TAG_LAG, animate, "scale");
          return (
            <li
              key={m.at}
              data-anim
              style={motion(active, rowDelay, animate, "translate")}
              className={`flex min-h-[54px] items-center gap-3 px-3 py-2 sm:h-[54px] sm:px-4 sm:py-0 ${i < moments.length - 1 ? "border-b hairline" : ""}`}
            >
              <span className="icon-holder">
                <Icon aria-hidden className="size-[18px]" strokeWidth={1.5} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="c-primary sm:truncate">“{m.quote}”</div>
                <div className="caption truncate c-secondary">
                  {kindLabel[m.kind]}
                  {m.reply && (
                    <span className="hidden c-tertiary sm:inline">
                      {" "}
                      · {closer.name.split(" ")[0]}: “{m.reply}”
                    </span>
                  )}
                </div>
                {m.outcome && (
                  <div
                    data-anim
                    style={animate ? { ...tag, transformOrigin: "left center" } : undefined}
                    className="mt-1 flex sm:hidden"
                  >
                    {outcome(m)}
                  </div>
                )}
              </div>
              <span data-anim style={tag} className="hidden sm:inline-flex">
                {outcome(m)}
              </span>
              {/* Every row ends on its timestamp, so the right edge reads as one column. */}
              <span className="caption flex w-12 shrink-0 items-center justify-end gap-1 tabular-nums c-tertiary">
                <Play aria-hidden className="size-3 fill-current" strokeWidth={0} />
                {m.at}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

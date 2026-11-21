import type { ComponentType, CSSProperties } from "react";
import {
  CalendarCheck,
  Check,
  FileText,
  MessageSquareReply,
  MonitorPlay,
  PhoneCall,
  PhoneMissed,
  PhoneOutgoing,
  Video,
  X,
  type LucideProps,
} from "lucide-react";
import { lead, signals, type Signal, type SignalKind } from "@/content/prospect-demo";
import { SYMBOL } from "@/components/footer-logo-paths";

// Step 03 interface, "Feed" direction (docs/decisions/prospect.md): the app's lead timeline on the GoFunnel
// design system (render inside a .gf-ds element). Oldest first. Each event is a two-line row on a rail of
// neutral icon holders: what happened (primary), the detail (secondary), date over time on the right.
// Colour only for real signals: No-show red, Showed green, stages teal.
// Motion: when `active` turns true the header fades up first, then the eight rows arrive top to bottom
// down the rail (opacity + 6px rise, 260ms, 45ms stagger), and each coloured tag lands (opacity + scale
// 0.96 to 1, 200ms) 120ms after its row. Done by ~680ms. When `active` turns false everything fades out
// together in place (150ms, ease-in, no stagger), then snaps back to its hidden offset, ready to replay.
// `animate={false}` shows the end state with no transition styles (used on phones).

const icons: Record<SignalKind, ComponentType<LucideProps>> = {
  page: FileText,
  video: MonitorPlay,
  booking: CalendarCheck,
  text: MessageSquareReply,
  webinar: Video,
  noshow: PhoneMissed,
  dialer: PhoneOutgoing,
  call: PhoneCall,
};

const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
const EASE_IN = "cubic-bezier(0.4, 0, 1, 1)";
const ENTER = 260;
const EXIT = 150;
const STAGGER = 45;
const ROW_START = 40; // the header goes first
const TAG_AFTER = 120; // a tag lands once its row has mostly settled
const TAG_ENTER = 200;

// Enter: fade + move/scale in, delayed. Exit: fade only (150ms, no delay); the offset resets after it's invisible.
function motion(
  on: boolean,
  animate: boolean,
  delay: number,
  prop: "translate" | "scale",
  hidden: string,
  shown: string,
  duration = ENTER,
): CSSProperties | undefined {
  if (!animate) return undefined;
  return {
    opacity: on ? 1 : 0,
    [prop]: on ? shown : hidden,
    transitionProperty: `opacity, ${prop}`,
    transitionDuration: on ? `${duration}ms` : `${EXIT}ms, 0ms`,
    transitionTimingFunction: on ? EASE_OUT : EASE_IN,
    transitionDelay: on ? `${delay}ms` : `0ms, ${EXIT}ms`,
  };
}

function Tag({ tone, label, style }: NonNullable<Signal["tag"]> & { style?: CSSProperties }) {
  if (tone === "negative")
    return (
      <span data-anim className="tag tag-negative" style={style}>
        <X aria-hidden className="size-3" strokeWidth={2} />
        {label}
      </span>
    );
  if (tone === "positive")
    return (
      <span data-anim className="tag tag-positive" style={style}>
        <Check aria-hidden className="size-3" strokeWidth={2} />
        {label}
      </span>
    );
  return (
    <span data-anim className="tag tag-accent" style={style}>
      {label}
    </span>
  );
}

export function StepSignals({ active, animate = true }: { active: boolean; animate?: boolean }) {
  return (
    <div className="card w-full max-w-[720px] overflow-hidden">
      <div
        data-anim
        className="flex h-[54px] items-center gap-3 border-b hairline px-4"
        style={motion(active, animate, 0, "translate", "0 6px", "0 0")}
      >
        <span className="icon-holder size-8 rounded-full c-primary">
            <svg aria-hidden viewBox="80.5 80.5 184.8 160" className="h-3.5 w-4">
              <path fillRule="evenodd" clipRule="evenodd" d={SYMBOL} fill="currentColor" />
            </svg>
          </span>
        <div className="min-w-0 flex-1">
          <div className="truncate c-primary">{lead.name}</div>
          <div className="caption truncate c-secondary">{lead.email}</div>
        </div>
        <span className="caption hidden shrink-0 tabular-nums c-secondary sm:block">
          {signals.length} signals · Nov 12 – 17
        </span>
      </div>
      <ol className="px-4 py-2">
        {signals.map((s, i) => {
          const Icon = icons[s.kind];
          const last = i === signals.length - 1;
          const delay = ROW_START + i * STAGGER;
          return (
            <li
              key={i}
              data-anim
              className="grid grid-cols-[32px_minmax(0,1fr)_auto] gap-x-3"
              style={motion(active, animate, delay, "translate", "0 6px", "0 0")}
            >
              {/* The rail: a 32px icon holder, joined to the next one by a hairline. */}
              <span className="relative flex justify-center pt-1.5">
                {!last && (
                  <span aria-hidden className="absolute -bottom-1.5 top-[38px] w-px bg-[var(--color-border-default)]" />
                )}
                <span className="relative flex size-8 items-center justify-center rounded-full border hairline bg-[var(--color-background-surface)] c-secondary">
                  <Icon aria-hidden className="size-4" strokeWidth={1.5} />
                </span>
              </span>
              <div className="min-w-0 py-1.5">
                <div className="flex min-w-0 flex-wrap items-center gap-x-2 sm:flex-nowrap">
                  <span className="c-primary sm:truncate">{s.title}</span>
                  {s.tag && (
                    <Tag
                      {...s.tag}
                      style={motion(active, animate, delay + TAG_AFTER, "scale", "0.96", "1", TAG_ENTER)}
                    />
                  )}
                </div>
                <div className="caption c-secondary sm:truncate">{s.detail}</div>
              </div>
              {/* Date over time, matching the two lines beside it. */}
              <span className="caption flex flex-col items-end whitespace-nowrap pt-1.5 tabular-nums">
                <span className="leading-5 c-secondary">{s.day}</span>
                <span className="c-tertiary">{s.time}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

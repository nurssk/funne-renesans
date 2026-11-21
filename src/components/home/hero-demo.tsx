"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  CalendarDays,
  ChevronDown,
  CreditCard,
  LayoutGrid,
  Megaphone,
  Phone,
  PhoneCall,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SYMBOL } from "@/components/footer-logo-paths";
import { BgFrame } from "@/components/home/backgrounds/bg-frame";
import { creatives, money } from "@/content/prospect-demo";

// Hero visual (docs/decisions/hero.md): the product, not an illustration. The GoFunnel Command Center
// (after the dashboard Loom) as an app window on a grainy colour field, bleeding off the bottom edge like
// conversion.ai's hero demo. Built at a fixed 1280 × 720 design size on the GoFunnel design system and
// scaled to the slot's width, so it reads the same at every size; on phones the slot is taller (4:3) and
// the window is cropped at a readable scale instead of shrunk to nothing. Static; the slot fades in with
// the hero's once-per-session intro. Numbers are the same made-up account as the sections below.

const W = 1280;
const H = 720;

const totals = creatives.reduce(
  (t, c) => ({ spend: t.spend + c.spend, calls: t.calls + c.calls, closes: t.closes + c.closes, cash: t.cash + c.cash }),
  { spend: 0, calls: 0, closes: 0, cash: 0 },
);
const ranked = [...creatives].sort((a, b) => b.cash - a.cash);

// Cash collected per day over 30 days: a deterministic, gently rising series for the chart.
const days = Array.from({ length: 30 }, (_, i) => 2100 + i * 62 + Math.sin(i * 0.9) * 420 + Math.sin(i * 0.37 + 1) * 380);

function chartPaths(w: number, h: number) {
  const max = Math.max(...days) * 1.08;
  const min = Math.min(...days) * 0.7;
  const pts = days.map((v, i) => [(i / (days.length - 1)) * w, h - ((v - min) / (max - min)) * h] as const);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w} ${h} L0 ${h} Z`, last: pts[pts.length - 1] };
}

const nav: { icon: LucideIcon; label: string; on?: boolean }[] = [
  { icon: LayoutGrid, label: "Command Center", on: true },
  { icon: Megaphone, label: "Marketing" },
  { icon: Users, label: "Leads" },
  { icon: Phone, label: "Dialer" },
  { icon: PhoneCall, label: "Calls" },
  { icon: CreditCard, label: "Payments" },
];

function Symbol({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="80.5 80.5 184.8 160" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d={SYMBOL} fill="currentColor" />
    </svg>
  );
}

function Kpi({ label, value, note, up }: { label: string; value: string; note: string; up?: string }) {
  return (
    <div className="card px-4 py-3.5">
      <div className="caption c-secondary">{label}</div>
      <div className="mt-1 flex items-center gap-2">
        <span className="h1 tabular-nums c-primary">{value}</span>
        {up && (
          <span className="tag tag-positive">
            <ArrowUp aria-hidden className="size-3" strokeWidth={2} />
            {up}
          </span>
        )}
      </div>
      <div className="caption mt-1 c-tertiary">{note}</div>
    </div>
  );
}

function Window() {
  const chart = chartPaths(460, 132);
  const cell = "h-10 border-b border-r hairline px-4 align-middle";

  return (
    <div className="card flex h-full overflow-hidden" style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.06), 0 30px 60px -20px rgba(10,10,10,0.32)" }}>
      {/* Sidebar */}
      <aside className="surface flex w-[208px] shrink-0 flex-col border-r hairline px-3 py-4">
        <div className="flex items-center gap-2 px-2">
          <span className="flex size-7 items-center justify-center rounded-[8px] bg-[var(--color-grey-950)] text-[var(--color-content-inverse)]">
            <Symbol className="h-3 w-3.5" />
          </span>
          <span className="c-primary">GoFunnel</span>
        </div>
        <button type="button" tabIndex={-1} className="mt-4 flex h-9 items-center justify-between rounded-[8px] border hairline bg-[var(--color-background-system)] px-2.5 text-left">
          <span className="caption truncate c-primary">Northline Coaching</span>
          <ChevronDown aria-hidden className="size-3.5 c-tertiary" strokeWidth={1.5} />
        </button>
        <nav className="mt-4 flex flex-col gap-0.5">
          {nav.map(({ icon: Icon, label, on }) => (
            <span
              key={label}
              className={`flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 ${on ? "bg-[var(--color-background-system)] c-primary shadow-[0_0_0_1px_var(--color-border-default)]" : "c-secondary"}`}
            >
              <Icon aria-hidden className="size-4" strokeWidth={1.5} />
              {label}
            </span>
          ))}
          <span className="mt-3 flex h-9 items-center gap-2.5 rounded-[8px] px-2.5 c-secondary">
            <Symbol className="h-3 w-4" />
            Helios
          </span>
        </nav>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <header className="flex h-14 items-center justify-between border-b hairline px-6">
          <span className="c-primary">Command Center</span>
          <div className="flex items-center gap-2">
            <span className="flex h-8 items-center gap-2 rounded-[8px] border hairline px-2.5 caption c-secondary">
              <CalendarDays aria-hidden className="size-3.5" strokeWidth={1.5} />
              Last 30 days
              <span className="c-tertiary">Oct 19 – Nov 17</span>
            </span>
            <span className="flex h-8 items-center gap-2 rounded-[8px] border hairline bg-[var(--color-background-system)] px-2.5 caption c-primary">
              <Symbol className="h-2.5 w-3" />
              Ask Helios
            </span>
          </div>
        </header>

        <div className="flex flex-col gap-4 p-6">
          <div className="grid grid-cols-4 gap-4">
            <Kpi label="Ad spend" value={money(totals.spend)} note="5 creatives on Meta Ads" />
            <Kpi label="Cash collected" value={money(totals.cash)} note={`${totals.closes} closes from ${totals.calls} calls`} up="18%" />
            <Kpi label="Return on cash" value={`${(totals.cash / totals.spend).toFixed(1)}×`} note="Cash collected per $1 spent" />
            <Kpi label="Speed to lead" value="34s" note="Form to first call, average" />
          </div>

          <div className="grid grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-4">
            <div className="card px-4 pb-3 pt-3.5">
              <div className="flex items-center justify-between">
                <span className="caption c-secondary">Cash collected by day</span>
                <span className="caption tabular-nums c-tertiary">{money(Math.round(days[days.length - 1]))} yesterday</span>
              </div>
              <svg aria-hidden viewBox="0 0 460 132" className="mt-3 h-[132px] w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-cash" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-brand-200)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--color-brand-200)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={chart.area} fill="url(#hero-cash)" />
                <path d={chart.line} fill="none" stroke="var(--color-brand-500)" strokeWidth="1.75" vectorEffect="non-scaling-stroke" />
                <circle cx={chart.last[0]} cy={chart.last[1]} r="3.5" fill="var(--color-brand-600)" stroke="var(--color-background-system)" strokeWidth="2" />
              </svg>
              <div className="caption mt-2 flex justify-between c-tertiary">
                <span>Oct 19</span>
                <span>Nov 1</span>
                <span>Nov 17</span>
              </div>
            </div>

            <div className="card overflow-hidden">
              <div className="flex h-11 items-center justify-between border-b hairline px-4">
                <span className="caption c-secondary">Dialer, live</span>
                <span className="tag tag-accent">
                  <span className="size-1.5 rounded-full bg-current" />3 on calls
                </span>
              </div>
              {[
                ["Constance Waverly-Ashford", "Calling · 0:04", "accent"],
                ["Owen Castellanos", "Booked Thu 2:00 PM", ""],
                ["Priya Raman", "Paid $4,800", "positive"],
                ["Dale Whitcomb", "Redial in 10 min", ""],
              ].map(([name, state, tone], i) => (
                <div key={name} className={`flex h-11 items-center justify-between gap-3 px-4 ${i < 3 ? "border-b hairline" : ""}`}>
                  <span className="truncate c-primary">{name}</span>
                  {tone ? (
                    <span className={`tag ${tone === "positive" ? "tag-positive" : "tag-accent"}`}>{state}</span>
                  ) : (
                    <span className="caption shrink-0 c-tertiary">{state}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="flex h-11 items-center justify-between border-b hairline px-4">
              <span className="caption c-secondary">Creatives, ranked by cash collected</span>
              <span className="caption c-tertiary">Meta Ads</span>
            </div>
            <table className="caption w-full table-fixed border-collapse text-left c-secondary">
              <colgroup>
                <col />
                <col className="w-[120px]" />
                <col className="w-[100px]" />
                <col className="w-[100px]" />
                <col className="w-[130px]" />
                <col className="w-[120px]" />
              </colgroup>
              <thead className="surface">
                <tr>
                  {["Creative", "Spend", "Calls", "Closes", "Cash ↓", "Per $1"].map((h, i) => (
                    <th key={h} className={`${cell} font-normal ${i ? "text-right" : ""} ${i === 5 ? "border-r-0" : ""}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ranked.map((c) => (
                  <tr key={c.id}>
                    <td className={cell}>
                      <span className="c-primary">{c.name}</span>
                      <span className="c-tertiary"> · {c.hookType} hook</span>
                    </td>
                    <td className={`${cell} text-right tabular-nums`}>{money(c.spend)}</td>
                    <td className={`${cell} text-right tabular-nums`}>{c.calls}</td>
                    <td className={`${cell} text-right tabular-nums`}>{c.closes}</td>
                    <td className={`${cell} text-right tabular-nums c-primary`}>{money(c.cash)}</td>
                    <td className={`${cell} border-r-0 text-right tabular-nums`}>${(c.cash / c.spend).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroDemo() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Fit the 1280-wide design to the slot; never below 0.5 so phones crop a readable window instead.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(1, Math.max(0.5, el.clientWidth / W)));
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    const id = requestAnimationFrame(fit);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      ref={box}
      role="img"
      aria-label="The GoFunnel Command Center: ad spend, cash collected, return on cash and speed to lead, cash by day, the live dialer and creatives ranked by cash"
      className="gf-ds relative aspect-[4/3] w-full select-none overflow-hidden sm:aspect-[16/9]"
    >
      <BgFrame seed={51} src="/backgrounds/hero.webp">
        <div className="absolute inset-0" style={{ background: "linear-gradient(170deg, #e7eef3 0%, #eae6df 55%, #efdcc9 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(55% 60% at 12% 18%, rgba(178, 205, 226, 0.75) 0%, rgba(178, 205, 226, 0) 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 55% at 92% 22%, rgba(196, 222, 222, 0.7) 0%, rgba(196, 222, 222, 0) 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 55% at 85% 100%, rgba(238, 184, 150, 0.6) 0%, rgba(238, 184, 150, 0) 70%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 50% at 15% 100%, rgba(212, 190, 222, 0.5) 0%, rgba(212, 190, 222, 0) 70%)" }} />
      </BgFrame>

      {/* The window: 1152 wide, 64px in from each side and 56px down at full size, bleeding off the bottom. */}
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: `scale(${scale})` }}
      >
        <div className="absolute left-16 right-16 top-14" style={{ height: H }}>
          <Window />
        </div>
      </div>
    </div>
  );
}

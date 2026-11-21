import type { CSSProperties } from "react";
import { ArrowDown, Check, Undo2, X } from "lucide-react";
import { closer, creatives, lead, lifetime, payments, usd, type PaymentStatus } from "@/content/prospect-demo";
import { SYMBOL } from "@/components/footer-logo-paths";

// Step 05 interface, "Ledger" direction (docs/decisions/prospect.md): the app's Payment Logs table on the
// GoFunnel design system (render inside a .gf-ds element). Header: the lead and who closed her, and the
// creative every payment is credited to. Table: date, payment, processor, amount, status. Footer: lifetime
// value (failed attempts don't count). Date and processor drop on phones.
// Motion: the header and column headers are already there. When `active` turns true the six payment rows
// arrive top to bottom (opacity 0→1, translate 6px→0, 260ms, strong ease-out, 50ms apart), then after a
// short beat the Lifetime value footer lands last, the payoff (done by ~610ms). When it turns false every
// row fades out together in place (150ms, ease-in, no stagger), then drops back to 6px while invisible,
// ready to play again. `animate={false}` shows the end state with no motion (used on phones).

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const EXIT_EASE = "cubic-bezier(0.4, 0, 1, 1)";
const ENTER = 260;
const EXIT = 150;
const STAGGER = 50;
const FOOTER_DELAY = payments.length * STAGGER + 50; // a beat after the last row starts, so it reads as the sum

function enter(on: boolean, delay: number, animate: boolean): CSSProperties {
  if (!animate) return {};
  return {
    opacity: on ? 1 : 0,
    translate: on ? "0 0" : "0 6px",
    transitionProperty: "opacity, translate",
    transitionTimingFunction: on ? EASE : EXIT_EASE,
    // Exit: fade in place, then reset the offset once invisible (translate snaps after the fade).
    transitionDuration: on ? `${ENTER}ms` : `${EXIT}ms, 0ms`,
    transitionDelay: on ? `${delay}ms` : `0ms, ${EXIT}ms`,
  };
}

const creative = creatives.find((c) => c.hers)!;

function Status({ s }: { s: PaymentStatus }) {
  if (s === "Paid")
    return (
      <span className="tag tag-positive">
        <Check aria-hidden className="size-3" strokeWidth={2} />
        Paid
      </span>
    );
  const Icon = s === "Refunded" ? Undo2 : X;
  return (
    <span className="tag tag-negative">
      <Icon aria-hidden className="size-3" strokeWidth={2} />
      {s}
    </span>
  );
}

export function StepPayments({ active, animate = true }: { active: boolean; animate?: boolean }) {
  const cell = "h-10 border-b border-r hairline px-3 align-middle";

  return (
    <div className="card w-full max-w-[760px] overflow-hidden">
      <div className="flex min-h-[54px] flex-wrap items-center gap-x-6 gap-y-2 border-b hairline px-4 py-2">
        <div className="flex min-w-[200px] flex-1 items-center gap-3">
          <span className="icon-holder size-8 rounded-full c-primary">
            <svg aria-hidden viewBox="80.5 80.5 184.8 160" className="h-3.5 w-4">
              <path fillRule="evenodd" clipRule="evenodd" d={SYMBOL} fill="currentColor" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="truncate c-primary">{lead.name}</div>
            <div className="caption truncate c-secondary">Closed by {closer.name}</div>
          </div>
        </div>
        {/* One line, read left to right: "Credited to Spring VSL · Hook 3 [Meta Ads]", centred on the
            two-line block beside it. The tag drops on phones so the name fits. */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="caption shrink-0 c-secondary">Credited to</span>
          <span className="truncate c-primary">{creative.name}</span>
          <span className="tag tag-neutral hidden sm:inline-flex">Meta Ads</span>
        </div>
      </div>
      <table className="caption w-full table-fixed border-collapse text-left c-secondary">
        <colgroup>
          <col className="hidden w-[116px] sm:table-column" />
          <col />
          <col className="hidden w-[108px] sm:table-column" />
          <col className="w-[76px] sm:w-[96px]" />
          <col className="w-[108px] sm:w-[112px]" />
        </colgroup>
        <thead className="surface">
          <tr>
            <th className={`${cell} hidden font-normal sm:table-cell`}>
              Date <ArrowDown aria-label="sorted, oldest first" className="inline size-3" strokeWidth={1.75} />
            </th>
            <th className={`${cell} font-normal`}>Payment</th>
            <th className={`${cell} hidden font-normal sm:table-cell`}>Processor</th>
            <th className={`${cell} text-right font-normal`}>Amount</th>
            <th className={`${cell} border-r-0 font-normal`}>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p, i) => (
            <tr key={p.date + p.processor} data-anim style={enter(active, i * STAGGER, animate)}>
              <td className={`${cell} hidden whitespace-nowrap tabular-nums sm:table-cell`}>{p.date}</td>
              <td className={cell}>
                <div className="truncate c-primary">
                  <span className="sm:hidden">{p.brief}</span>
                  <span className="hidden sm:inline">{p.item}</span>
                </div>
              </td>
              <td className={`${cell} hidden sm:table-cell`}>
                <span className="tag tag-neutral">{p.processor}</span>
              </td>
              <td className={`${cell} text-right tabular-nums ${p.status === "Failed" ? "c-tertiary line-through" : "c-primary"}`}>
                {usd(p.amount)}
              </td>
              <td className={`${cell} border-r-0`}>
                <Status s={p.status} />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="surface">
          <tr data-anim style={enter(active, FOOTER_DELAY, animate)}>
            <td className={`${cell} hidden border-b-0 sm:table-cell`} />
            <td className={`${cell} border-b-0 c-primary`}>
              Lifetime value <span className="hidden c-secondary sm:inline">· first year</span>
            </td>
            <td className={`${cell} hidden border-b-0 sm:table-cell`} />
            <td className={`${cell} border-b-0 text-right tabular-nums c-primary`}>{usd(lifetime)}</td>
            <td className={`${cell} border-b-0 border-r-0`} />
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

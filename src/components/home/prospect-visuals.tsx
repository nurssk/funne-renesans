// The seven code-built product visuals for the "Follow one prospect" section, one per step
// (docs/decisions/prospect.md). They illustrate GoFunnel's record for one made-up prospect; they are not
// screenshots or client data.
import { Check, Laptop, Play, Smartphone, Tablet } from "lucide-react";
import type { ReactNode } from "react";

const NAME = "Danielle Okafor-Brennan";

// The light stage every visual sits on on phones (on desktop the section draws its own pinned stage).
export function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center rounded-[20px] border border-line bg-white/60 p-4 sm:p-6">{children}</div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`w-full max-w-[440px] rounded-[14px] bg-white text-[13px] text-ink shadow-[0_0_0_1px_rgba(26,26,25,0.06),0_1px_2px_rgba(26,26,25,0.05),0_12px_28px_-12px_rgba(26,26,25,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}

function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "teal" | "good" | "bad" }) {
  const tones = {
    neutral: "bg-ink/[0.05] text-ink-2",
    teal: "bg-teal-600/10 text-teal-700",
    good: "bg-[#1f8a4c]/10 text-[#1b6e3e]",
    bad: "bg-[#c2410c]/10 text-[#9a3412]",
  };
  return <span className={`inline-flex h-[22px] shrink-0 items-center rounded-full px-2 text-[11.5px] leading-none ${tones[tone]}`}>{children}</span>;
}

function CardHead({ title, meta }: { title: ReactNode; meta?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
      <div className="min-w-0 truncate font-medium">{title}</div>
      {meta && <div className="shrink-0 text-[12px] text-ink-3">{meta}</div>}
    </div>
  );
}

// 1. Touchpoints joined to one person
export function TouchpointsVisual() {
  const visits = [
    { icon: Smartphone, source: "Meta ad", detail: "Spring VSL · Hook 3", when: "21d ago", tag: "Paid" },
    { icon: Smartphone, source: "Instagram story", detail: "Smart Link /story-0412", when: "14d ago", tag: "Organic" },
    { icon: Laptop, source: "ChatGPT", detail: "Answer linked to /pricing", when: "9d ago", tag: "AI assistant" },
    { icon: Tablet, source: "YouTube", detail: "How we fixed our show rate", when: "6d ago", tag: "Organic" },
  ];
  return (
    <Card>
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-medium text-white">DO</span>
        <div className="min-w-0">
          <div className="truncate font-medium">{NAME}</div>
          <div className="truncate text-[12px] text-ink-3">5 visits · 3 devices · first seen 21 days ago</div>
        </div>
      </div>
      <ol className="px-4 py-2">
        {visits.map((v) => (
          <li key={v.source} className="flex items-center gap-3 py-2">
            <v.icon aria-hidden className="size-4 shrink-0 text-ink-3" strokeWidth={1.5} />
            <div className="min-w-0 flex-1">
              <div className="truncate">{v.source}</div>
              <div className="truncate text-[12px] text-ink-3">{v.detail}</div>
            </div>
            <Chip>{v.tag}</Chip>
            <span className="hidden w-[52px] shrink-0 text-right text-[12px] tabular-nums text-ink-3 sm:block">{v.when}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 border-t border-line py-2.5">
          <Check aria-hidden className="size-4 shrink-0 text-teal-600" strokeWidth={2} />
          <div className="min-w-0 flex-1 truncate">Opted in · all 4 earlier visits joined</div>
          <Chip tone="teal">Identified</Chip>
        </li>
      </ol>
    </Card>
  );
}

// 2. The creative, split into hook, body and CTA
export function CreativeVisual() {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative mx-auto aspect-[9/16] w-[118px] shrink-0 overflow-hidden rounded-[16px] bg-[linear-gradient(160deg,#f6d9c6_0%,#e9c7d3_45%,#bcd3dc_100%)] sm:mx-0">
          <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/80">
            <Play aria-hidden className="ml-0.5 size-4 fill-ink text-ink" />
          </span>
          <p className="absolute inset-x-2 bottom-2 rounded-md bg-ink/75 px-1.5 py-1 text-[10px] leading-[1.3] text-white">
            Your calendar is full of people who will never buy.
          </p>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] text-ink-3">Spring VSL · Hook 3 · Meta</div>
          <div className="mt-3 flex h-7 overflow-hidden rounded-md text-[11px]">
            <span className="flex w-[14%] items-center justify-center bg-ink text-white">Hook</span>
            <span className="flex flex-1 items-center justify-center bg-ink/[0.08] text-ink-2">Body</span>
            <span className="flex w-[22%] items-center justify-center bg-ink/[0.16] text-ink">CTA</span>
          </div>
          <div className="mt-1 flex justify-between text-[11px] tabular-nums text-ink-3">
            <span>0:00</span>
            <span>0:03</span>
            <span>0:41</span>
            <span>0:52</span>
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[12.5px]">
            <dt className="text-ink-3">Hook</dt>
            <dd>Pain hook</dd>
            <dt className="text-ink-3">Body</dt>
            <dd>Problem, agitate, solve</dd>
            <dt className="text-ink-3">CTA</dt>
            <dd>&ldquo;Book a call&rdquo;</dd>
            <dt className="text-ink-3">Style</dt>
            <dd>Talking head</dd>
          </dl>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
        {[
          ["Booked calls", "31"],
          ["Closed", "6"],
          ["Cash", "$38,400"],
        ].map(([k, v]) => (
          <div key={k}>
            <div className="text-[11.5px] text-ink-3">{k}</div>
            <div className="mt-0.5 text-[15px] font-medium tabular-nums">{v}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// 3. Signals between the click and the call
export function SignalsVisual() {
  const events = [
    { when: "Mon 9:14", what: "Landed from the Meta ad", detail: "4m 12s on page · scrolled 80%" },
    { when: "Mon 9:19", what: "Watched the VSL", detail: "", vsl: 75 },
    { when: "Mon 9:31", what: "Booked a call", detail: "Thursday, 2:00 PM" },
    { when: "Tue 8:02", what: "Opened the pre-call page", detail: "Read 3 of 4 resources" },
    { when: "Wed 6:40", what: "Replied to the reminder text", detail: "“See you Thursday”" },
  ];
  return (
    <Card>
      <CardHead title={NAME} meta="Timeline" />
      <ol className="relative px-4 py-3 before:absolute before:bottom-6 before:left-[22px] before:top-6 before:w-px before:bg-line">
        {events.map((e) => (
          <li key={e.what} className="relative flex gap-3 py-1.5">
            <span className="relative z-10 mt-[5px] size-[9px] shrink-0 rounded-full border-2 border-white bg-ink-3 ring-1 ring-line" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate">{e.what}</span>
                <span className="shrink-0 text-[11.5px] tabular-nums text-ink-3">{e.when}</span>
              </div>
              {e.vsl ? (
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
                    <span className="block h-full rounded-full bg-ink" style={{ width: `${e.vsl}%` }} />
                  </span>
                  <span className="text-[11.5px] tabular-nums text-ink-3">{e.vsl}%</span>
                </div>
              ) : (
                <div className="truncate text-[12px] text-ink-3">{e.detail}</div>
              )}
            </div>
          </li>
        ))}
        <li className="relative flex items-center gap-3 pt-2">
          <span className="relative z-10 size-[9px] shrink-0 rounded-full border-2 border-white bg-[#1f8a4c] ring-1 ring-[#1f8a4c]/30" />
          <span className="flex-1">Showed up for the call</span>
          <Chip tone="good">Show</Chip>
        </li>
      </ol>
    </Card>
  );
}

// 4. Call intelligence
export function CallVisual() {
  const lines = [
    { who: "Prospect", text: "We spend about $40k a month on Meta and I can’t tell which ads close.", tag: "Pain point" },
    { who: "Prospect", text: "I’d need to talk to my business partner first.", tag: "Objection" },
    { who: "Closer", text: "Fair. What would he need to see to say yes?", tag: "Handled well" },
    { who: "Prospect", text: "Can we start before the end of the month?", tag: "Buying signal" },
  ];
  return (
    <Card>
      <CardHead title="Closer call · 38 min" meta="Rep score 8.4 / 10" />
      <ul className="divide-y divide-line px-4">
        {lines.map((l) => (
          <li key={l.text} className="flex items-start gap-3 py-2.5">
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] text-ink-3">{l.who}</div>
              <p className="mt-0.5 leading-[1.4]">&ldquo;{l.text}&rdquo;</p>
            </div>
            <Chip tone={l.tag === "Objection" ? "bad" : l.tag === "Buying signal" ? "good" : "neutral"}>{l.tag}</Chip>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 border-t border-line px-4 py-3">
        <span className="text-[12px] text-ink-3">Qualified</span>
        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/[0.07]">
          <span className="block h-full w-[82%] rounded-full bg-ink" />
        </span>
        <span className="text-[12px] font-medium tabular-nums">82%</span>
      </div>
    </Card>
  );
}

// 5. Payments, lifetime spend, credited to the creative
export function MoneyVisual() {
  const payments = [
    { day: "Day 0", what: "Core program · paid in full", amount: "$4,800" },
    { day: "Day 12", what: "Order bump · templates", amount: "$400" },
    { day: "Day 64", what: "Ascension · Inner Circle", amount: "$9,600" },
    { day: "Day 190", what: "Renewal", amount: "$1,200" },
    { day: "Day 201", what: "Refund · templates", amount: "−$400", refund: true },
  ];
  return (
    <Card>
      <CardHead title={NAME} meta="Lifetime spend" />
      <div className="px-4 pt-3">
        <div className="text-[26px] font-medium leading-none tracking-[-0.01em] tabular-nums">$15,600</div>
      </div>
      <ul className="px-4 py-2">
        {payments.map((p) => (
          <li key={p.day} className="flex items-baseline gap-3 py-1.5">
            <span className="w-[52px] shrink-0 text-[12px] tabular-nums text-ink-3">{p.day}</span>
            <span className="min-w-0 flex-1 truncate">{p.what}</span>
            <span className={`shrink-0 tabular-nums ${p.refund ? "text-[#9a3412]" : ""}`}>{p.amount}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-line px-4 py-3 text-[12.5px]">
        <span className="text-ink-3">Credited to</span>
        <span className="truncate font-medium">Spring VSL · Hook 3</span>
        <Chip>Meta</Chip>
      </div>
    </Card>
  );
}

// 6. Pixel conditioning
export function PixelVisual() {
  const events = [
    { what: "Form fill", why: "Budget under $10k, didn’t qualify", sent: false },
    { what: "Qualified lead", why: "Budget over $10k · decision maker", sent: true },
    { what: "Booked call", why: "Thursday, 2:00 PM", sent: true },
    { what: "Showed", why: "Closer call, 82% qualified", sent: true },
    { what: "Purchase", why: "$4,800, real amount", sent: true },
  ];
  return (
    <Card>
      <CardHead title="Sent to Meta from the server" meta={NAME.split(" ")[0]} />
      <ul className="px-4 py-2">
        {events.map((e) => (
          <li key={e.what} className="flex items-center gap-3 py-2">
            <div className="min-w-0 flex-1">
              <div className={e.sent ? "" : "text-ink-3 line-through decoration-ink-3/60"}>{e.what}</div>
              <div className="truncate text-[12px] text-ink-3">{e.why}</div>
            </div>
            {e.sent ? <Chip tone="teal">Sent</Chip> : <Chip>Held back</Chip>}
          </li>
        ))}
      </ul>
      <div className="flex items-end justify-between gap-3 border-t border-line px-4 py-3">
        <div>
          <div className="text-[12px] text-ink-3">Event Match Quality</div>
          <div className="mt-1 text-[26px] font-medium leading-none tracking-[-0.01em] tabular-nums">
            9.3<span className="text-[14px] text-ink-3"> / 10</span>
          </div>
        </div>
        <div className="flex h-7 items-end gap-[3px]" aria-hidden>
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`w-[5px] rounded-full ${i < 9 ? "bg-ink" : "bg-ink/25"}`} style={{ height: `${10 + i * 2}px` }} />
          ))}
        </div>
      </div>
    </Card>
  );
}

// 7. Creative A versus Creative B
export function InsightVisual() {
  const rows = [
    { k: "Cost per call", a: "$42", b: "$96", win: "a" },
    { k: "Qualified on the call", a: "18%", b: "61%", win: "b" },
    { k: "Close rate", a: "3%", b: "24%", win: "b" },
    { k: "Cash collected", a: "$6,200", b: "$57,600", win: "b" },
    { k: "Lifetime spend per buyer", a: "$2,100", b: "$9,800", win: "b" },
  ];
  return (
    <Card>
      <div className="grid grid-cols-[minmax(0,1fr)_72px_72px] items-end gap-x-3 border-b border-line px-4 py-3 sm:grid-cols-[minmax(0,1fr)_88px_88px]">
        <span className="text-[12px] text-ink-3">Last 90 days</span>
        <span className="text-right font-medium">Creative A</span>
        <span className="text-right font-medium">Creative B</span>
      </div>
      <ul className="px-4 py-1">
        {rows.map((r) => (
          <li key={r.k} className="grid grid-cols-[minmax(0,1fr)_72px_72px] items-center gap-x-3 py-2 sm:grid-cols-[minmax(0,1fr)_88px_88px]">
            <span className="truncate text-ink-2">{r.k}</span>
            <span className={`text-right tabular-nums ${r.win === "a" ? "font-medium text-[#1b6e3e]" : "text-ink-3"}`}>{r.a}</span>
            <span className={`text-right tabular-nums ${r.win === "b" ? "font-medium text-[#1b6e3e]" : "text-ink-3"}`}>{r.b}</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line px-4 py-3 text-[12.5px]">
        <span className="font-medium">Scale B.</span> <span className="text-ink-2">A&rsquo;s cheap calls come from people who don&rsquo;t buy.</span>
      </div>
    </Card>
  );
}

export const visuals = [TouchpointsVisual, CreativeVisual, SignalsVisual, CallVisual, MoneyVisual, PixelVisual, InsightVisual];

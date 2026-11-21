// Navigation content. Items and links: gofunnel-website-copy.md, Global Section 1.1.
// Labels in sentence case; product names (Fingerprinting Attribution, Dialing Infrastructure, Helios)
// and acronyms (EMQ, LTV, SMS, B2B) keep their capitals. Descriptions written short (emil-unslop-writing).
// Solutions has no descriptions until the industry page copy exists. Decided in docs/decisions/nav.md.
import {
  ArrowLeftRight, AudioLines, Briefcase, Building2, Calculator, ChartLine, CircleDollarSign, Clapperboard,
  Crosshair, Fingerprint, GraduationCap, HeartPulse, Landmark, ListChecks, MessageSquare, Newspaper,
  PhoneCall, Route, Scale, ShieldCheck, Sun, Timer, Wrench, type LucideIcon,
} from "lucide-react";

export type Item = { title: string; desc?: string; href: string; icon: LucideIcon };
export type Group = { label: string; href?: string; items: Item[] };
export type Menu = { id: "products" | "solutions" | "resources"; label: string; groups: Group[] };

export const menus: Menu[] = [
  {
    id: "products",
    label: "Products",
    groups: [
      {
        label: "Fingerprinting Attribution",
        href: "/attribution",
        items: [
          { title: "Fingerprinting every touchpoint", desc: "Every visit joined to one person", href: "/attribution#fingerprinting", icon: Fingerprint },
          { title: "Pixel conditioning and EMQ", desc: "Teach Meta who your buyers are", href: "/attribution#pixel-conditioning", icon: Crosshair },
          { title: "Customer journey", desc: "One timeline, ad to payment", href: "/attribution#customer-journey", icon: Route },
          { title: "Creative analytics", desc: "Hook, body and CTA, judged on cash", href: "/attribution#creative-analytics", icon: Clapperboard },
          { title: "Call intelligence", desc: "Every sales call, scored", href: "/attribution#call-intelligence", icon: AudioLines },
          { title: "Metrics and analytics", desc: "One set of numbers for everyone", href: "/attribution#metrics", icon: ChartLine },
          { title: "Revenue and LTV", desc: "Every payment, back to the ad", href: "/attribution#revenue-ltv", icon: CircleDollarSign },
        ],
      },
      {
        label: "Dialing Infrastructure",
        href: "/dialing-infrastructure",
        items: [
          { title: "Lists", desc: "Lists that fill themselves", href: "/dialing-infrastructure#lists", icon: ListChecks },
          { title: "Speed to lead and follow-ups", desc: "First call in seconds", href: "/dialing-infrastructure#speed-to-lead", icon: Timer },
          { title: "Dialing modes", desc: "Click to dial, auto dial, adaptive", href: "/dialing-infrastructure#dialing-modes", icon: PhoneCall },
          { title: "Spam protection and private carrier", desc: "Local numbers that get answered", href: "/dialing-infrastructure#answer-rates", icon: ShieldCheck },
          { title: "Live transfers", desc: "Route answered calls your way", href: "/dialing-infrastructure#live-transfers", icon: ArrowLeftRight },
          { title: "SMS", desc: "Inbox, campaigns and automations", href: "/dialing-infrastructure#sms", icon: MessageSquare },
        ],
      },
      {
        label: "AI",
        items: [{ title: "Helios", desc: "Ask for a report, an ad audit or scripts", href: "/helios", icon: Sun }],
      },
    ],
  },
  {
    id: "solutions",
    label: "Solutions",
    groups: [
      {
        label: "By industry",
        items: [
          { title: "Home services", href: "/solutions/home-services", icon: Wrench },
          { title: "Real estate", href: "/solutions/real-estate", icon: Building2 },
          { title: "Financial services", href: "/solutions/financial-services", icon: Landmark },
          { title: "Health and wellness", href: "/solutions/health-and-wellness", icon: HeartPulse },
          { title: "Legal", href: "/solutions/legal", icon: Scale },
          { title: "Coaching and education", href: "/solutions/coaching-and-education", icon: GraduationCap },
          { title: "B2B and agencies", href: "/solutions/b2b-and-agencies", icon: Briefcase },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    groups: [
      {
        label: "Learn",
        items: [
          { title: "Blog", desc: "Articles from the GoFunnel team", href: "/blog", icon: Newspaper },
          { title: "Funnel calculator", desc: "What fixing one step is worth", href: "/calculator", icon: Calculator },
        ],
      },
    ],
  },
];

export const plainLinks = [
  { label: "Results", href: "/results" },
  { label: "Integrations", href: "/integrations" },
  { label: "Pricing", href: "/pricing" },
];

// Desktop order from the copy doc: Products, Solutions, Results, Integrations, Resources, Pricing.
export const order = ["products", "solutions", "Results", "Integrations", "resources", "Pricing"] as const;

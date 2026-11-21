"use client";
// Site header with Compact dropdowns for Products, Solutions and Resources (docs/decisions/nav.md).
// Hover opens (mouse only), click toggles, Escape closes and returns focus, click outside closes.
// Closed panels stay in the DOM (inert + hidden) so the links are crawlable but not tabbable.
// Mobile menu (copy doc 1.2) is not built yet.
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { menus, order, plainLinks, type Menu } from "@/content/nav";
import { NavDropdown } from "@/components/nav-dropdown";

export function SiteNav() {
  const [openId, setOpenId] = useState<Menu["id"] | null>(null);
  const [instant, setInstant] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const open = (id: Menu["id"]) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    // Moving from one open menu to another swaps instantly instead of replaying the entrance.
    setInstant(openId !== null && openId !== id);
    setOpenId(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setInstant(false);
      setOpenId(null);
    }, 140);
  };

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setInstant(false);
      setOpenId(null);
      triggerRefs.current[openId]?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setInstant(false);
        setOpenId(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId]);

  return (
    <header ref={headerRef} className="relative z-50 border-b border-line bg-canvas">
      <div className="mx-auto flex h-[64px] max-w-[1280px] items-center justify-between px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-12">
        <Link href="/" aria-label="GoFunnel. Back to the homepage." className="justify-self-start">
          <Image src="/brand/lockup.svg" alt="GoFunnel" width={116} height={19} priority className="h-[19px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {order.map((key) => {
            const menu = menus.find((m) => m.id === key);
            if (!menu) {
              const link = plainLinks.find((l) => l.label === key)!;
              return (
                <Link key={key} href={link.href} className="rounded-full px-3 py-2 text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink">
                  {link.label}
                </Link>
              );
            }
            const isOpen = openId === menu.id;
            return (
              <div key={key} className="relative">
              <button
                ref={(el) => {
                  triggerRefs.current[menu.id] = el;
                }}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`menu-${menu.id}`}
                onClick={() => (isOpen ? setOpenId(null) : open(menu.id))}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") open(menu.id); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") scheduleClose(); }}
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-[14px] transition-colors duration-150 hover:text-ink ${isOpen ? "text-ink" : "text-ink-2"}`}
              >
                {menu.label}
                <ChevronDown aria-hidden size={14} strokeWidth={1.75} className={`transition-transform duration-200 ease-out ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {/* The before: strip bridges the gap between trigger and panel so hover isn't lost. */}
              <div
                id={`menu-${menu.id}`}
                data-open={isOpen ? "" : undefined}
                data-instant={instant ? "" : undefined}
                inert={!isOpen}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") open(menu.id); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") scheduleClose(); }}
                style={{ transformOrigin: "top left" }}
                className="nav-panel absolute left-[-14px] top-[calc(100%+18px)] before:absolute before:inset-x-0 before:-top-[20px] before:h-[20px] before:content-['']"
              >
                <NavDropdown menu={menu} />
              </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          {/* TODO: real app login URL (copy doc says "the GoFunnel app login", no address given) */}
          <a href="/login" className="hidden text-[14px] text-ink-2 transition-colors duration-150 hover:text-ink sm:inline">Log in</a>
          <Link href="/book-a-call" className="btn btn-primary">Book a Call</Link>
        </div>
      </div>

    </header>
  );
}

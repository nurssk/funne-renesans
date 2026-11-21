"use client";
// The big GoFunnel logo that closes the footer (docs/decisions/footer.md, "Footer logo").
// A 1px grey outline of the lockup. On devices with a mouse, a soft teal light follows the cursor
// and fills the letters under it with the Book a Call button's gradient. On touch screens and with
// reduced motion there is no light; the symbol alone is filled teal. Styles: .footer-logo in globals.css.
// Decorative: the parent hides it from screen readers, the nav carries the accessible logo.
import { useEffect, useId, useRef } from "react";
import { LETTERS, SYMBOL } from "./footer-logo-paths";

// lockup.svg's own viewBox is 976 wide and leaves 16 empty units right of the "l".
// This one is trimmed to the artwork, so the logo ends flush with the text column.
const VIEW_BOX = "80 80 960 161";
const GLYPHS = [SYMBOL, ...LETTERS];

const RADIUS = 0.85; // light radius, as a share of the logo's height
const MIN_RADIUS = 64; // px, so the light stays usable in a narrow window
const STIFFNESS = 260; // spring pull toward the cursor
const DAMPING = 32; // about critical: the light follows with a little weight and never wobbles

export function FooterLogo() {
  const gradient = useId();
  const paint = `url(#${gradient})`;
  const box = useRef<HTMLDivElement>(null);
  const light = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = box.current;
    const lit = light.current;
    const footer = el?.closest("footer");
    if (!el || !lit || !footer) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let over = false; // cursor is over the footer
    let on = false; // light is showing
    let read = 0; // pending frame that reads the cursor position
    let sim = 0; // running spring frame
    let last = 0;
    let cx = 0;
    let cy = 0;
    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;
    let tx = 0;
    let ty = 0;
    let r = MIN_RADIUS;

    const draw = () => {
      // Eased stops, so the edge of the light is soft and does not band.
      const mask = `radial-gradient(circle ${r.toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px, #000 0%, rgb(0 0 0 / 0.94) 18%, rgb(0 0 0 / 0.78) 36%, rgb(0 0 0 / 0.52) 54%, rgb(0 0 0 / 0.26) 70%, rgb(0 0 0 / 0.09) 85%, transparent 100%)`;
      lit.style.setProperty("-webkit-mask-image", mask);
      lit.style.setProperty("mask-image", mask);
    };

    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      vx += (STIFFNESS * (tx - x) - DAMPING * vx) * dt;
      vy += (STIFFNESS * (ty - y) - DAMPING * vy) * dt;
      x += vx * dt;
      y += vy * dt;
      draw();
      const settled = Math.abs(tx - x) < 0.2 && Math.abs(ty - y) < 0.2 && Math.abs(vx) < 4 && Math.abs(vy) < 4;
      sim = settled ? 0 : requestAnimationFrame(step);
    };

    const off = () => {
      on = false;
      el.removeAttribute("data-on"); // CSS fades the light out where it stands
    };

    // Once per frame: where is the cursor relative to the logo?
    const locate = () => {
      read = 0;
      if (!over) return;
      const rect = el.getBoundingClientRect();
      const px = cx - rect.left;
      const py = cy - rect.top;
      r = Math.max(MIN_RADIUS, rect.height * RADIUS);
      // The light only wakes within one radius of the logo, not over the link columns.
      if (px < -r || px > rect.width + r || py < -r || py > rect.height + r) return off();
      tx = px;
      ty = py;
      if (!on) {
        // Arriving: start under the cursor instead of flying in from where the light last was.
        on = true;
        x = px;
        y = py;
        vx = vy = 0;
        draw();
        el.setAttribute("data-on", "");
      }
      if (!sim) {
        last = performance.now();
        sim = requestAnimationFrame(step);
      }
    };
    const schedule = () => {
      if (!read) read = requestAnimationFrame(locate);
    };

    const leave = () => {
      if (!over) return;
      over = false;
      cancelAnimationFrame(read);
      read = 0;
      window.removeEventListener("scroll", schedule);
      off();
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch" || !fine.matches || reduced.matches) return leave();
      cx = e.clientX;
      cy = e.clientY;
      if (!over) {
        over = true;
        // The logo moves under a still cursor while the page scrolls.
        window.addEventListener("scroll", schedule, { passive: true });
      }
      schedule();
    };

    // Both listeners sit on the footer, so nothing runs while the cursor is elsewhere on the page.
    footer.addEventListener("pointermove", move, { passive: true });
    footer.addEventListener("pointerleave", leave);
    return () => {
      leave();
      cancelAnimationFrame(sim);
      footer.removeEventListener("pointermove", move);
      footer.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={box} className="footer-logo">
      {/* The outline, plus the teal symbol used as the resting state on touch and with reduced motion. */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={VIEW_BOX} focusable="false" className="footer-logo-svg">
        <defs>
          {/* .btn-primary's gradient, top to bottom across the whole logo. */}
          <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="0" y2="241">
            <stop offset="0" stopColor="#3f8793" />
            <stop offset="0.55" style={{ stopColor: "var(--color-teal-600)" }} />
            <stop offset="1" stopColor="#2c6a74" />
          </linearGradient>
        </defs>
        <g className="footer-logo-line">
          {GLYPHS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
        <g className="footer-logo-ink footer-logo-rest" fill={paint} stroke={paint}>
          <path d={SYMBOL} fillRule="evenodd" clipRule="evenodd" />
        </g>
      </svg>
      {/* A teal copy laid exactly over the outline, masked to the light. */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={VIEW_BOX} focusable="false" className="footer-logo-svg footer-logo-light" ref={light}>
        <g className="footer-logo-ink" fill={paint} stroke={paint}>
          {GLYPHS.map((d, i) => (
            <path key={i} d={d} fillRule="evenodd" clipRule="evenodd" />
          ))}
        </g>
      </svg>
    </div>
  );
}

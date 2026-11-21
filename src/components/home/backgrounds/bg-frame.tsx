"use client";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

// Shared frame for the step backgrounds in "Follow one lead": fills its (relative, overflow-hidden) parent
// and turns the colour layers a step passes in into the liquid, grainy field of elevenlabs.io's feature
// cards:
//   1. Warp: an SVG filter (low-frequency fractal noise driving a displacement map, then a light blur)
//      bends the soft gradient washes into flowing ribbons, so it reads as poured colour, not ellipses.
//      The colour layer is oversized by 15% on every side so the warp never pulls an edge into view.
//      `seed` picks the noise, so each step's ribbons run differently.
//      A sheen layer of soft light and shadow bands sits inside the warp, so there is structure to bend.
//   2. Grain: a visible film grain on top (fine fractal noise, overlay blend).
// Baked: pass `src` (a /public/backgrounds/*.webp of the finished warped + grained layer, rendered from the
// children below) and the frame ships only that picture, drifting on a compositor-only transform. The live
// SVG filter is CPU-bound in Firefox-based browsers (Zen) and janky once many are mounted. With `src` the
// children are not rendered; they stay as the source to re-bake from.
// Motion: the warped layer drifts on a 28s loop (transform only), so the filter still renders once. Decorative: inert and hidden from screen readers. Browsers that skip
// the SVG filter fall back to the plain gradients.

// Coarse enough to read as film grain (not a grey veil) and contrast-boosted so it survives the overlay blend.
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/><feComponentTransfer><feFuncR type='linear' slope='2.2' intercept='-0.6'/><feFuncG type='linear' slope='2.2' intercept='-0.6'/><feFuncB type='linear' slope='2.2' intercept='-0.6'/></feComponentTransfer></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

const SHEEN =
  "repeating-linear-gradient(118deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 14%, rgba(255,255,255,0) 28%, rgba(0,0,0,0.4) 42%, rgba(255,255,255,0) 58%)";

export function BgFrame({ children, seed = 3, src }: { children: ReactNode; seed?: number; src?: string }) {
  // Drift only while on screen (the mobile list and the sr-only copies never are).
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const id = `warp-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const drift = { animationDelay: `-${(seed * 5) % 28}s`, animationPlayState: live ? ("running" as const) : ("paused" as const) };
  if (src) {
    return (
      <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
        <div className="gf-drift absolute -inset-[15%]" style={drift}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" decoding="async" draggable={false} className="size-full" />
        </div>
      </div>
    );
  }
  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 select-none overflow-hidden">
      <svg className="absolute size-0">
        <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.0025 0.005" numOctaves="2" seed={seed} result="flow" />
          <feDisplacementMap in="SourceGraphic" in2="flow" scale="230" xChannelSelector="R" yChannelSelector="B" />
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </svg>
      {/* Outer layer only moves (compositor); the inner one holds the SVG warp and never changes, so the
          browser rasterises the filter once instead of on every drift frame. */}
      <div
        className="gf-drift absolute -inset-[15%]"
        style={drift}
      >
        <div className="absolute inset-0" style={{ filter: `url(#${id})` }}>
          {children}
          {/* Sheen: soft light and shadow bands across the colour. Straight here; the warp bends them into
              the flowing ribbons, and soft-light keeps them in each step's own hue. */}
          <div className="absolute inset-0 mix-blend-soft-light" style={{ background: SHEEN }} />
        </div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.28] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "160px 160px" }}
      />
    </div>
  );
}

import { BgFrame } from "./bg-frame";

// Step 02: sunny apricot and soft peach mist, pale cream light pouring from the top, a rose blush in the lower-right corner.
export function Bg02() {
  return (
    <BgFrame seed={16}>
      {/* Base: cream at the top settling into warm apricot at the bottom */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, #fbf1e3 0%, #f8dfc4 55%, #f3cdb0 100%)" }}
      />
      {/* Apricot wash, upper left */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(60% 70% at 6% 22%, rgba(243,184,128,0.75) 0%, rgba(243,184,128,0) 70%)",
        }}
      />
      {/* Soft peach wash, right edge */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(55% 75% at 98% 38%, rgba(246,196,160,0.8) 0%, rgba(246,196,160,0) 72%)",
        }}
      />
      {/* Golden apricot pooling at the lower left */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(55% 55% at 12% 100%, rgba(240,178,120,0.6) 0%, rgba(240,178,120,0) 70%)",
        }}
      />
      {/* Rose blush, lower right corner */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(50% 55% at 92% 100%, rgba(232,160,158,0.7) 0%, rgba(232,160,158,0) 72%)",
        }}
      />
      {/* Pale cream light from the top */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(70% 55% at 50% -8%, rgba(255,250,238,0.95) 0%, rgba(255,248,234,0) 75%)",
        }}
      />
      {/* Calm centre behind the card: a gentle warm-cream bloom */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(38% 42% at 50% 52%, rgba(252,240,224,0.65) 0%, rgba(252,240,224,0) 100%)",
        }}
      />
    </BgFrame>
  );
}

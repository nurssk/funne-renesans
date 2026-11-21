import { BgFrame } from "./bg-frame";

// Step 07: brand-teal mist, deep teal pooling in the lower-left, sea-glass and pale aqua rising to a soft light bloom top-right.
export function Bg07() {
  return (
    <BgFrame seed={51}>
      {/* Base: pale aqua at the top fading to sea-glass, darker toward the lower-left. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(200deg, #e8f6f5 0%, #c6e8e4 36%, #8ccbc6 70%, #4f9aa2 100%)" }}
      />
      {/* Deep teal pooling in the lower-left corner. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 75% at 6% 104%, rgba(24, 88, 100, 0.95) 0%, rgba(43, 121, 133, 0.72) 38%, rgba(43, 121, 133, 0) 78%)",
        }}
      />
      {/* A second, lower teal wash along the bottom edge so it reads as a field, not a spot. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(85% 45% at 40% 112%, rgba(48, 136, 144, 0.55) 0%, rgba(48, 136, 144, 0) 70%)",
        }}
      />
      {/* Sea-glass wash on the right side. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 100% 70%, rgba(124, 200, 186, 0.75) 0%, rgba(124, 200, 186, 0) 70%)",
        }}
      />
      {/* Pale aqua across the top-left. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 12% 0%, rgba(214, 238, 238, 0.95) 0%, rgba(214, 238, 238, 0) 72%)",
        }}
      />
      {/* Light bloom high on the right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 48% at 80% 8%, rgba(255, 253, 248, 0.95) 0%, rgba(246, 251, 249, 0.55) 40%, rgba(246, 251, 249, 0) 75%)",
        }}
      />
      {/* Calm the centre behind the card: a soft, low-contrast veil. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 52% 46%, rgba(228, 244, 246, 0.5) 0%, rgba(228, 244, 246, 0) 100%)",
        }}
      />
    </BgFrame>
  );
}

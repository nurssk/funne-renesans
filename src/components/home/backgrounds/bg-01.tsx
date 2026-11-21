import { BgFrame } from "./bg-frame";

// Step 01: cool sky-blue haze, powder blue misting in from the top-left, a soft near-white bloom behind the centre, dusty steel blue pooling along the bottom.
export function Bg01() {
  return (
    <BgFrame seed={9} src="/backgrounds/bg-01.webp">
      {/* Base: pale powder blue at the top falling to a dusty blue-grey at the bottom. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(172deg, #d6e3ee 0%, #dbe5ec 38%, #b9cad8 72%, #93abbf 100%)" }}
      />
      {/* Powder blue wash, top-left corner. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 62% at 4% 0%, rgba(188,213,236,0.95) 0%, rgba(188,213,236,0.55) 38%, rgba(188,213,236,0) 72%)",
        }}
      />
      {/* Pale neutral haze top-right, so the light falls in from that corner. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 48% 42% at 96% 6%, rgba(236,236,236,0.6) 0%, rgba(236,236,236,0) 70%)",
        }}
      />
      {/* Steel blue pooling along the bottom edge. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 95% 48% at 42% 108%, rgba(118,146,170,0.9) 0%, rgba(118,146,170,0.5) 42%, rgba(118,146,170,0) 76%)",
        }}
      />
      {/* Deeper slate in the bottom-right corner. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 52% 50% at 100% 100%, rgba(98,126,152,0.7) 0%, rgba(98,126,152,0) 72%)",
        }}
      />
      {/* Cool mid-blue drift on the left flank. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 40% 55% at 0% 62%, rgba(160,186,208,0.55) 0%, rgba(160,186,208,0) 70%)",
        }}
      />
      {/* Soft near-white bloom behind the centre, kept calm so the card reads. */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 54% 46% at 52% 46%, rgba(238,244,248,0.7) 0%, rgba(238,244,248,0.35) 42%, rgba(238,244,248,0) 75%)",
        }}
      />
    </BgFrame>
  );
}

import { BgFrame } from "./bg-frame";

// Step 04 "Dusk": slate and grey-blue mist at the top sinking into deep indigo and navy, a faint violet streak on the diagonal.
export function Bg04() {
  return (
    <BgFrame seed={30}>
      {/* Base: top-to-bottom dusk ramp */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(176deg, #8898b0 0%, #6c7c9e 32%, #46517c 56%, #272d58 78%, #151935 100%)",
        }}
      />
      {/* Grey-blue haze across the top, with a soft light bloom upper left */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(60% 45% at 22% 0%, rgba(206,214,226,0.55) 0%, rgba(206,214,226,0) 100%)",
            "radial-gradient(55% 50% at 88% 6%, rgba(132,150,182,0.65) 0%, rgba(132,150,182,0) 100%)",
            "radial-gradient(70% 40% at 50% 18%, rgba(150,164,190,0.35) 0%, rgba(150,164,190,0) 100%)",
          ].join(", "),
        }}
      />
      {/* Faint violet streak running diagonally, bottom-left to upper-right */}
      <div
        className="absolute"
        style={{
          left: "-30%",
          top: "36%",
          width: "160%",
          height: "34%",
          transform: "rotate(-30deg)",
          background:
            "radial-gradient(closest-side, rgba(126,104,176,0.46) 0%, rgba(112,94,164,0.2) 55%, rgba(110,92,160,0) 100%)",
        }}
      />
      {/* Deep indigo and navy pooling at the bottom corners */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(65% 55% at 12% 100%, rgba(14,16,40,0.85) 0%, rgba(14,16,40,0) 100%)",
            "radial-gradient(60% 50% at 92% 96%, rgba(38,32,86,0.7) 0%, rgba(38,32,86,0) 100%)",
            "radial-gradient(50% 40% at 100% 60%, rgba(30,36,78,0.45) 0%, rgba(30,36,78,0) 100%)",
          ].join(", "),
        }}
      />
      {/* Calm the centre: an even mid-tone veil behind the card */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(42% 46% at 50% 50%, rgba(72,86,124,0.35) 0%, rgba(72,86,124,0) 100%)",
        }}
      />
    </BgFrame>
  );
}

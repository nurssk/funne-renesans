import { BgFrame } from "./bg-frame";

// Step 06: a gentle pink-and-lilac blush mesh, rose washes low-left and right, pale lilac upper-left and low-right, a soft white bloom near the top and a calmer centre.
export function Bg06() {
  return (
    <BgFrame seed={44} src="/backgrounds/bg-06.webp">
      {/* Base: warm blush drifting into pale lilac */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #efe3ee 0%, #f5e4e6 45%, #f1dde2 70%, #e9dfee 100%)" }}
      />
      {/* Pale lilac wash, upper left */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 70% at 8% 18%, rgba(214,200,234,0.85) 0%, rgba(214,200,234,0.35) 45%, rgba(214,200,234,0) 75%)",
        }}
      />
      {/* Rose wash, lower left */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 60% at 14% 96%, rgba(233,168,185,0.85) 0%, rgba(233,168,185,0.35) 45%, rgba(233,168,185,0) 78%)",
        }}
      />
      {/* Rose-pink wash, right edge */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 75% at 98% 42%, rgba(238,176,193,0.8) 0%, rgba(238,176,193,0.3) 48%, rgba(238,176,193,0) 78%)",
        }}
      />
      {/* Lilac wash, lower right */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 55% 55% at 84% 104%, rgba(200,186,228,0.8) 0%, rgba(200,186,228,0.3) 50%, rgba(200,186,228,0) 80%)",
        }}
      />
      {/* Calm centre: a faint warm off-white veil behind the card */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 48% 46% at 50% 54%, rgba(250,244,244,0.6) 0%, rgba(250,244,244,0.25) 55%, rgba(250,244,244,0) 100%)",
        }}
      />
      {/* Soft white bloom near the top */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 38% at 56% -4%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0) 80%)",
        }}
      />
    </BgFrame>
  );
}

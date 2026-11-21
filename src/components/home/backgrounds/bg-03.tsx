import { BgFrame } from "./bg-frame";

// Step 03: misty sea-blue/grey-teal field, bright haze in the upper middle, deeper blue-grey in the bottom-right corner.
export function Bg03() {
  return (
    <BgFrame seed={23} src="/backgrounds/bg-03.webp">
      {/* Base: pale sea mist at the top settling into grey-teal at the bottom. */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(172deg, #dbe8ed 0%, #cadde4 42%, #b2c9d1 100%)" }}
      />
      {/* Sea-mist blue wash, left side. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 70% at 4% 38%, rgba(164, 198, 220, 0.9) 0%, rgba(164, 198, 220, 0) 70%)",
        }}
      />
      {/* Grey-teal wash, upper right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 62% at 98% 12%, rgba(146, 186, 192, 0.85) 0%, rgba(146, 186, 192, 0) 70%)",
        }}
      />
      {/* Warm off-white mist, bottom left, tying the field to the canvas. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 6% 100%, rgba(232, 232, 224, 0.75) 0%, rgba(232, 232, 224, 0) 70%)",
        }}
      />
      {/* Deeper blue-grey pooling in the bottom-right corner. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 66% 68% at 100% 100%, rgba(108, 140, 158, 0.85) 0%, rgba(122, 152, 166, 0.45) 38%, rgba(122, 152, 166, 0) 72%)",
        }}
      />
      {/* Calm, even mist behind the card. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 42% at 50% 56%, rgba(226, 236, 239, 0.55) 0%, rgba(226, 236, 239, 0) 75%)",
        }}
      />
      {/* Light bloom: bright haze in the upper middle. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 52% 36% at 50% 6%, rgba(246, 250, 251, 0.82) 0%, rgba(240, 247, 249, 0.4) 40%, rgba(244, 249, 250, 0) 75%)",
        }}
      />
    </BgFrame>
  );
}

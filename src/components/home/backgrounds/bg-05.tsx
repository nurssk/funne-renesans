import { BgFrame } from "./bg-frame";

// Step 05: warm sunset mesh — ember red and burnt orange at the edges, gold bloom top right, a dusk blue-violet sliver along the left edge, softer peach behind the table.
export function Bg05() {
  return (
    <BgFrame seed={37} src="/backgrounds/bg-05.webp">
      {/* Base: burnt orange into ember red, top-left to bottom-right */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(150deg, #e0703a 0%, #d9582f 45%, #b8392a 100%)" }}
      />
      {/* Dusk sliver: cool blue-violet hugging the left edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(36% 85% at -6% 62%, rgba(66,72,152,0.95) 0%, rgba(116,82,152,0.62) 38%, rgba(196,88,112,0.22) 70%, rgba(210,90,100,0) 100%)",
        }}
      />
      {/* Gold bloom: top right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 60% at 92% 4%, rgba(246,196,92,0.95) 0%, rgba(240,166,70,0.55) 45%, rgba(240,150,60,0) 100%)",
        }}
      />
      {/* Deep red pool: bottom right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 55% at 88% 104%, rgba(150,34,36,0.9) 0%, rgba(170,44,38,0.45) 50%, rgba(170,44,38,0) 100%)",
        }}
      />
      {/* Calm centre: soft peach light behind the table */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(48% 46% at 54% 50%, rgba(248,196,160,0.55) 0%, rgba(240,170,130,0.25) 50%, rgba(240,160,120,0) 100%)",
        }}
      />
    </BgFrame>
  );
}

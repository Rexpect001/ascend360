import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ASCEND360 | Education Access, Poverty Reduction & Climate Action";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1F4788",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(76,175,80,0.18)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: 500,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }}
        />

        {/* SDG pills */}
        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
          {["SDG 4", "SDG 1", "SDG 13"].map((sdg) => (
            <div
              key={sdg}
              style={{
                background: "rgba(76,175,80,0.2)",
                border: "1px solid rgba(76,175,80,0.5)",
                color: "#7ED88A",
                borderRadius: 6,
                padding: "6px 14px",
                fontSize: 18,
                fontWeight: 700,
                fontFamily: "sans-serif",
              }}
            >
              {sdg}
            </div>
          ))}
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 800,
            color: "white",
            fontFamily: "sans-serif",
            letterSpacing: "-2px",
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          ASCEND<span style={{ color: "#4CAF50" }}>360</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            fontFamily: "sans-serif",
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: 700,
          }}
        >
          Education Access · Poverty Reduction · Climate Action
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            top: 64,
            right: 72,
            fontSize: 20,
            color: "rgba(255,255,255,0.4)",
            fontFamily: "sans-serif",
          }}
        >
          ascend360.org
        </div>
      </div>
    ),
    { ...size }
  );
}

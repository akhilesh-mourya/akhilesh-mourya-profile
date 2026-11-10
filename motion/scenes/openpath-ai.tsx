import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { reelFonts } from "../fonts";

export function OpenPathAIScene() {
  return (
    <OpenPathAIFrame />
  );
}

function OpenPathAIFrame() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 0.5 * fps], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#211A2B",
        color: "#F5F0F6",
        padding: 64,
        fontFamily: reelFonts.body,
        opacity,
      }}
    >
      <div style={{ color: "#D5B6E8", fontSize: 22 }}>
        OPENPATH AI / SALES ENABLEMENT
      </div>
      <div style={{ maxWidth: 720, marginTop: 120 }}>
        <h1
          style={{
            fontFamily: reelFonts.heading,
            fontSize: 76,
            fontWeight: 500,
            lineHeight: 1,
            margin: 0,
          }}
        >
          OpenPath AI
        </h1>
        <div
          style={{
            height: 3,
            width: 72,
            backgroundColor: "#D5B6E8",
            margin: "32px 0 24px",
          }}
        />
        <p style={{ color: "#D5B6E8", fontSize: 32, lineHeight: 1.25 }}>
          React interfaces for AI-powered sales workflows.
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          right: 64,
          bottom: 80,
          width: 430,
          height: 220,
          border: "1px solid #806B8C",
          padding: 24,
          display: "flex",
          alignItems: "flex-end",
          gap: 18,
        }}
      >
        {[90, 140, 112, 178, 150].map((height, index) => (
          <div
            key={index}
            style={{
              width: 54,
              height,
              backgroundColor: index === 3 ? "#D5B6E8" : "#806B8C",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
}

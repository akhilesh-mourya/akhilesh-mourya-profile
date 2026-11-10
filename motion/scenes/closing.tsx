import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { reelFonts } from "../fonts";
export function Closing() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#A4B5C4",
        color: "#10151C",
        fontFamily: reelFonts.body,
        padding: 80,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          opacity: interpolate(frame, [0, 0.45 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            fontFamily: reelFonts.heading,
            fontSize: 96,
            lineHeight: 1.05,
            letterSpacing: "-.04em",
            margin: 0,
          }}
        >
          Let’s talk about
          <br />
          your next product.
        </p>
        <p style={{ fontSize: 40, margin: "32px 0 0" }}>
          mouryaakhilesh62@gmail.com
        </p>
      </div>
      <p
        style={{
          position: "absolute",
          left: 80,
          bottom: 140,
          fontSize: 24,
          margin: 0,
        }}
      >
        Akhilesh Mourya · Mobile lead & full-stack engineer
      </p>
    </AbsoluteFill>
  );
}

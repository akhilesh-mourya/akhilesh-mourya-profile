import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { reelFonts } from "../fonts";
export function Introduction() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#650D2A",
        color: "#EDE9E7",
        padding: 80,
        justifyContent: "center",
        fontFamily: reelFonts.body,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 80,
          right: 80,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 24,
        }}
      >
        <span>Akhilesh Mourya</span>
        <span>Selected work</span>
      </div>
      <div
        style={{
          opacity: interpolate(frame, [0, 0.5 * fps], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0, 0.6 * fps],
            ["0px 24px", "0px 0px"],
            {
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: reelFonts.heading,
            fontSize: 112,
            fontWeight: 500,
            lineHeight: 1.02,
            letterSpacing: "-.04em",
          }}
        >
          A few things
          <br />
          I’ve helped ship.
        </p>
        <p style={{ margin: "30px 0 0", fontSize: 38, color: "#E4CED6" }}>
          Mobile products. Hands-on engineering.
        </p>
      </div>
    </AbsoluteFill>
  );
}

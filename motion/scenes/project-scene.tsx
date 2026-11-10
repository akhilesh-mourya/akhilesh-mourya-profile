import {
  AbsoluteFill,
  CanvasImage,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { reelFonts } from "../fonts";
type ProjectSceneProps = {
  name: string;
  role: string;
  contribution: string;
  caption: string;
  imageOne: string;
  imageTwo: string;
  panel: string;
};
export function ProjectScene({
  name,
  role,
  contribution,
  caption,
  imageOne,
  imageTwo,
  panel,
}: ProjectSceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#EDE9E7",
        color: "#10151C",
        fontFamily: reelFonts.body,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 64,
          right: 64,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#4D565F",
        }}
      >
        <span>Akhilesh Mourya / Selected work</span>
        <span>{caption}</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          top: 160,
          bottom: 100,
          width: 490,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: reelFonts.heading,
            fontSize: 76,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-.04em",
          }}
        >
          {name}
        </p>
        <div
          style={{
            height: 3,
            width: 72,
            backgroundColor: "#650D2A",
            marginTop: 32,
            marginBottom: 24,
          }}
        />
        <p
          style={{ margin: 0, fontSize: 32, lineHeight: 1.2, color: "#650D2A" }}
        >
          {role}
        </p>
        <p
          style={{
            margin: "24px 0 0",
            fontSize: 29,
            lineHeight: 1.4,
            color: "#4D565F",
            maxWidth: 450,
          }}
        >
          {contribution}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          inset: "115px 56px 80px auto",
          width: 590,
          backgroundColor: panel,
          display: "flex",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          padding: 28,
        }}
      >
        <CanvasImage
          src={staticFile(imageOne)}
          premountFor={fps}
          style={{
            width: 238,
            height: 423,
            objectFit: "contain",
            borderRadius: 6,
            translate: interpolate(
              frame,
              [0, 0.6 * fps],
              ["0px 22px", "0px 0px"],
              {
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />
        <CanvasImage
          src={staticFile(imageTwo)}
          premountFor={fps}
          style={{
            width: 238,
            height: 423,
            objectFit: "contain",
            borderRadius: 6,
            translate: interpolate(
              frame,
              [0, 0.7 * fps],
              ["0px 34px", "0px 0px"],
              {
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        />
      </div>
    </AbsoluteFill>
  );
}

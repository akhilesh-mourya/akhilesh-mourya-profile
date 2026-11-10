import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Introduction } from "./scenes/introduction";
import { NattyHattyScene } from "./scenes/natty-hatty";
import { AmoriScene } from "./scenes/amori";
import { SwiftSkuScene } from "./scenes/swiftsku";
import { ArzoooScene } from "./scenes/arzooo";
import { OpenPathAIScene } from "./scenes/openpath-ai";
import { Closing } from "./scenes/closing";

function SceneEntrance({ children }: { children: React.ReactNode }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

// Explicit overlapping sequences keep each scene editable in Studio. The transition
// package's ESM build embeds React 19 internals, so use core frame-driven fades to
// preserve compatibility with this application's React 18 without bundler shims.
export function PortfolioReel() {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#650D2A" }}>
      <Sequence
        name="Introduction"
        from={0}
        durationInFrames={2 * fps}
        premountFor={fps}
      >
        <Introduction />
      </Sequence>
      <Sequence
        name="Natty Hatty"
        from={1.5 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <NattyHattyScene />
        </SceneEntrance>
      </Sequence>
      <Sequence
        name="Amori"
        from={5 * fps}
        durationInFrames={3.5 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <AmoriScene />
        </SceneEntrance>
      </Sequence>
      <Sequence
        name="Arzooo"
        from={8 * fps}
        durationInFrames={3.5 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <ArzoooScene />
        </SceneEntrance>
      </Sequence>
      <Sequence
        name="OpenPath AI"
        from={10.5 * fps}
        durationInFrames={3.5 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <OpenPathAIScene />
        </SceneEntrance>
      </Sequence>
      <Sequence
        name="SwiftSku"
        from={13 * fps}
        durationInFrames={3.5 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <SwiftSkuScene />
        </SceneEntrance>
      </Sequence>
      <Sequence
        name="Contact"
        from={16 * fps}
        durationInFrames={4 * fps}
        premountFor={fps}
      >
        <SceneEntrance>
          <Closing />
        </SceneEntrance>
      </Sequence>
    </AbsoluteFill>
  );
}

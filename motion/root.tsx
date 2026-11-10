import { Composition, Folder } from "remotion";
import { PortfolioReel } from "./portfolio-reel";
import { Introduction } from "./scenes/introduction";
import { NattyHattyScene } from "./scenes/natty-hatty";
import { AmoriScene } from "./scenes/amori";
import { SwiftSkuScene } from "./scenes/swiftsku";
import { ArzoooScene } from "./scenes/arzooo";
import { OpenPathAIScene } from "./scenes/openpath-ai";
import { Closing } from "./scenes/closing";
export function RemotionRoot() {
  return (
    <>
      <Composition
        id="PortfolioReel"
        component={PortfolioReel}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
      <Folder name="Scenes">
        <Composition
          id="Introduction"
          component={Introduction}
          durationInFrames={60}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="NattyHatty"
          component={NattyHattyScene}
          durationInFrames={120}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="Amori"
          component={AmoriScene}
          durationInFrames={105}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="SwiftSku"
          component={SwiftSkuScene}
          durationInFrames={105}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="Arzooo"
          component={ArzoooScene}
          durationInFrames={105}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="OpenPathAI"
          component={OpenPathAIScene}
          durationInFrames={105}
          fps={30}
          width={1280}
          height={720}
        />
        <Composition
          id="Closing"
          component={Closing}
          durationInFrames={90}
          fps={30}
          width={1280}
          height={720}
        />
      </Folder>
    </>
  );
}

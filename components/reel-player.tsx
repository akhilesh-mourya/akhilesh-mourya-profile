"use client";
import { useEffect, useRef, type RefObject } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { PortfolioReel } from "@/motion/portfolio-reel";
export default function ReelPlayer({
  onClose,
  player,
  onFrame,
  controls = true,
  loop = false,
}: {
  onClose: () => void;
  player: RefObject<PlayerRef | null>;
  onFrame: (frame: number) => void;
  controls?: boolean;
  loop?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !document.hidden) {
          player.current?.play();
        } else {
          player.current?.pause();
        }
      },
      { threshold: 0.05 },
    );
    if (container.current) {
      observer.observe(container.current);
      requestAnimationFrame(() => {
        if (!document.hidden) player.current?.play();
      });
    }
    const autoplayRetry = window.setInterval(() => {
      if (!document.hidden && player.current?.isPlaying() === false) {
        player.current.play();
      }
    }, 250);
    const stopAutoplayRetry = window.setTimeout(() => {
      window.clearInterval(autoplayRetry);
    }, 3000);
    const onVisibility = () => {
      if (document.hidden) player.current?.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    const current = player.current;
    const onFrameUpdate = (event: { detail: { frame: number } }) =>
      onFrame(event.detail.frame);
    current?.addEventListener("frameupdate", onFrameUpdate);
    return () => {
      window.clearTimeout(stopAutoplayRetry);
      window.clearInterval(autoplayRetry);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      current?.removeEventListener("frameupdate", onFrameUpdate);
    };
  }, [player, onFrame]);
  return (
    <div
      ref={container}
      style={{ width: "100%", height: "100%" }}
      data-reel-player
    >
      <Player
        ref={player}
        component={PortfolioReel}
        durationInFrames={600}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        controls={controls}
        autoPlay
        loop={loop}
        initiallyMuted
        showVolumeControls={false}
        allowFullscreen
        clickToPlay
        spaceKeyToPlayOrPause
        alwaysShowControls
        style={{ width: "100%", height: "100%" }}
        aria-label="Fourteen-second project showcase"
        errorFallback={() => (
          <div className="showcase-error" role="alert">
            <p>
              The preview couldn’t load. You can still explore all the projects
              above.
            </p>
            <button type="button" onClick={onClose}>
              Return to project poster
            </button>
          </div>
        )}
      />
    </div>
  );
}

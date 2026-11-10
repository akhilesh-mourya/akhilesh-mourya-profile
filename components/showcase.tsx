"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Play, RotateCcw } from "lucide-react";
import type { PlayerRef } from "@remotion/player";

const ReelPlayer = dynamic(() => import("./reel-player"), {
  ssr: false,
  loading: () => (
    <div className="showcase-loading" role="status">
      Loading project preview…
    </div>
  ),
});

class ReelBoundary extends Component<
  { children: ReactNode; onClose: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="showcase-error" role="alert">
          <p>
            The preview is unavailable. The project details are still available
            above.
          </p>
          <button onClick={this.props.onClose} type="button">
            Return to project poster
          </button>
        </div>
      );
    return this.props.children;
  }
}

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeToMotion(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
export function Showcase({ embedded = false }: { embedded?: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeToMotion,
    () => window.matchMedia(motionQuery).matches,
    () => true,
  );
  const [frame, setFrame] = useState(0);
  const player = useRef<PlayerRef>(null);
  const posterButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (query.matches) setDismissed(true);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const close = () => {
    setDismissed(true);
    requestAnimationFrame(() => posterButton.current?.focus());
  };
  // The hero reel is an intentional product preview and should autoplay on
  // refresh; the standalone showcase still respects reduced-motion settings.
  const playing = embedded ? !dismissed : !reduced && !dismissed;
  return (
    <section
      className={`showcase-section${embedded ? " showcase-embedded" : ""}`}
      aria-labelledby={embedded ? undefined : "showcase-heading"}
    >
      <div className={`wrap showcase-layout${embedded ? " showcase-layout-embedded" : ""}`}>
        {!embedded && <div className="showcase-copy">
          <p className="eyebrow">A short project reel</p>
          <h2 id="showcase-heading">
            The work,
            <br />
            in a few frames.
          </h2>
          <p>
            Fourteen seconds. Three products. A quick look at the apps and the
            roles behind them.
          </p>
        </div>}
        <div>
          <div
            className="showcase-frame"
            style={{ "--focus": "#EDE9E7" } as React.CSSProperties}
          >
            {playing ? (
              <ReelBoundary onClose={close}>
                <ReelPlayer
                  onClose={close}
                  player={player}
                  onFrame={setFrame}
                  loop={embedded}
                />
              </ReelBoundary>
            ) : (
              <>
                <div className="reel-poster">
                  <div className="reel-poster-copy">
                    <span>Akhilesh Mourya / Selected work</span>
                    <strong>
                      Built for people.
                      <br />
                      Shipped with a team.
                    </strong>
                  </div>
                  <Image
                    src="/projects/natty-hatty-1.jpg"
                    alt="Natty Hatty app preview; the reel also features Amori and SwiftSku"
                    width={392}
                    height={696}
                    sizes="(max-width:599px) 100px, 160px"
                  />
                </div>
                {!reduced && (
                  <button
                    ref={posterButton}
                    className="play-reel"
                    type="button"
                    onClick={() => setDismissed(false)}
                  >
                    <Play size={15} aria-hidden="true" />
                    Play the reel <span>· 20 sec</span>
                  </button>
                )}
              </>
            )}
          </div>
          {/* {playing && (
            <div className="reel-seek">
              <label htmlFor="reel-position">Reel position</label>
              <input
                id="reel-position"
                type="range"
                min={0}
                max={419}
                step={1}
                value={frame}
                aria-valuetext={`${(frame / 30).toFixed(1)} of 14 seconds`}
                onChange={(event) => {
                  const nextFrame = Number(event.target.value);
                  setFrame(nextFrame);
                  player.current?.pause();
                  player.current?.seekTo(nextFrame);
                }}
              />
              <output htmlFor="reel-position">
                {Math.floor(frame / 30)} / 14s
              </output>
            </div>
          )} */}
          <div className="showcase-controls">
            <span>Natty Hatty · Amori · SwiftSku</span>
            {playing && (
              <button onClick={close} type="button">
                <RotateCcw size={14} aria-hidden="true" />
                Back to poster
              </button>
            )}
          </div>
          {reduced && (
            <p className="reduced-note">
              Static preview shown to respect your reduced-motion preference.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

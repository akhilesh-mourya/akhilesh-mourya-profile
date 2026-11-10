"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import type { PlayerRef } from "@remotion/player";

const ReelPlayer = dynamic(() => import("./reel-player"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export function HeroReel() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(motionQuery).matches,
    () => false,
  );
  const [dismissed, setDismissed] = useState(false);
  const player = useRef<PlayerRef>(null);
  const posterButton = useRef<HTMLButtonElement>(null);

  const playing = !reduced && !dismissed;
  const close = () => {
    setDismissed(true);
    requestAnimationFrame(() => posterButton.current?.focus());
  };

  return (
    <div className="hero-reel-shell" aria-label="Autoplaying project reel">
      <div className="showcase-frame hero-reel-frame">
        {playing ? (
          <ReelPlayer
            onClose={close}
            player={player}
            onFrame={() => {}}
            controls
            loop
          />
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
                Play the reel <span>· 20 sec</span>
              </button>
            )}
          </>
        )}
      </div>
      <div className="showcase-controls">
        <span>Natty Hatty · Amori · SwiftSku</span>
        {playing && (
          <button onClick={close} type="button">
            Back to poster
          </button>
        )}
      </div>
    </div>
  );
}

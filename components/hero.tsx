"use client";

import Image from "next/image";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import { HeroReel } from "./hero-reel";

export function Hero() {
  return (
    <section id="home" className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <div className="hero-byline">
          <Image src={profile.portrait} alt="" width={48} height={60} sizes="48px" />
          <p className="eyebrow">{profile.role}</p>
        </div>
        <h1 id="hero-heading">
          I build the app.
          <br />
          <span>And lead the team.</span>
        </h1>
        <p className="hero-description">
          I’m Akhilesh. For 13+ years, I’ve built iOS, Android, and web
          applications — and helped engineering teams take them from an idea to
          a release.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#work">
            View selected work <ArrowDownRight size={19} aria-hidden="true" />
          </a>
          <a className="text-link" href={`mailto:${profile.email}`}>
            Get in touch <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
        <p className="location-note">
          Indore, India <span aria-hidden="true">/</span> Open to remote
          opportunities
        </p>
      </div>
      <HeroReel />
    </section>
  );
}

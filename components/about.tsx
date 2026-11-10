import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { capabilities, profile } from "@/data/portfolio";
export function About() {
  return (
    <section
      id="about"
      className="about-section section-space"
      aria-labelledby="about-heading"
    >
      <div className="wrap">
        <div className="about-introduction">
          <div>
            <p className="eyebrow">A little background</p>
            <h2 id="about-heading">
              An engineer who stays
              <br className="desktop-break" /> close to the product.
            </h2>
            <figure className="profile-portrait">
              <Image
                src={profile.portrait}
                alt="Portrait of Akhilesh Mourya"
                width={1122}
                height={1402}
                sizes="(max-width:599px) 220px, 260px"
              />
              <figcaption>
                <strong>{profile.name}</strong>
                <span>{profile.location}</span>
              </figcaption>
            </figure>
          </div>
          <div className="about-copy">
            <p>
              I started with native mobile development in 2013. Since then, my
              work has grown to include cross-platform apps, web interfaces,
              backend integrations, and technical leadership.
            </p>
            <p>
              I like being involved in the details: reviewing a difficult
              implementation, working through an architecture decision, or
              getting a release ready with the team. Most of my experience sits
              where those responsibilities meet.
            </p>
            <a className="text-link" href={profile.resume} download>
              Read my resume <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="capabilities">
          {capabilities.map((item) => (
            <div className="capability" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <p className="capability-tools">{item.tools}</p>
            </div>
          ))}
        </div>
        <div className="personal-details">
          <p>
            <span>Education</span>B.E., Information Technology
            <br />
            Indira Gandhi Government Engineering College, 2012
          </p>
          <p>
            <span>Recognition</span>Shining Star of the Year, 2019
            <br />
            Systango Technology
          </p>
        </div>
      </div>
    </section>
  );
}

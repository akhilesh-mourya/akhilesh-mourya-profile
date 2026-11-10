import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/contact";
import { ImageGallery } from "@/components/image-gallery";
import { projects } from "@/data/portfolio";

const title = "Natty Hatty: leading a mobile product";
const description =
  "My work as Mobile Team Lead: technical planning, architecture, code reviews, integrations, and iOS and Android release readiness.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/case-studies/natty-hatty" },
  openGraph: {
    title,
    description,
    url: "/case-studies/natty-hatty",
    type: "article",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};
const responsibilities = [
  {
    title: "Technical planning and architecture",
    text: "I worked through requirements, technical design, and implementation planning with the team. My responsibilities included architecture discussions, feature implementation, and resolving platform issues across iOS and Android.",
  },
  {
    title: "Team guidance and code quality",
    text: "I reviewed code, mentored developers, and delegated implementation work. I also reviewed native iOS and Android changes when cross-platform features needed platform-specific work.",
  },
  {
    title: "Product integrations",
    text: "The work included REST API integration, authentication, push notifications, and third-party services. I coordinated with product, design, backend, and QA colleagues to bring the mobile experience together.",
  },
  {
    title: "Releases and maintenance",
    text: "I managed build configurations, release processes, and production deployment readiness. Debugging, performance work, and ongoing maintenance remained part of the role after a feature shipped.",
  },
];
export default function NattyHattyCaseStudy() {
  const project = projects[0];
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="case-study wrap">
        <Link href="/#work" className="text-link">
          <ArrowLeft size={17} aria-hidden="true" />
          Back to selected work
        </Link>
        <header className="case-study-intro">
          <p className="eyebrow">Natty Hatty / Youth sports</p>
          <h1>
            Leading the team.
            <br />
            <span>Building the mobile product.</span>
          </h1>
          <p className="case-study-deck">
            A closer look at my work taking a mobile application from technical
            planning through production delivery.
          </p>
        </header>
        <dl className="case-study-facts">
          <div>
            <dt>Role</dt>
            <dd>Mobile Team Lead / Senior React Native Developer</dd>
          </div>
          <div>
            <dt>Period</dt>
            <dd>November 2021 — October 2026</dd>
          </div>
          <div>
            <dt>Platforms</dt>
            <dd>iOS & Android</dd>
          </div>
          <div>
            <dt>Core tools</dt>
            <dd>React Native · TypeScript · Redux · Firebase</dd>
          </div>
        </dl>
        <ImageGallery
          images={project.images!}
          project="Natty Hatty"
          caption="Public product previews"
          className="case-study-gallery"
        />
        <section
          className="case-study-context"
          aria-labelledby="context-heading"
        >
          <h2 id="context-heading">The product and my role</h2>
          <div>
            <p>
              Natty Hatty is a youth sports application for families. My role
              combined hands-on development with responsibility for the mobile
              team, technical direction, and getting the iOS and Android
              applications ready for release.
            </p>
            <p>
              The public product previews show family accounts and program
              registration. My contributions covered the engineering and
              delivery work described here.
            </p>
          </div>
        </section>
        <section
          className="case-study-responsibilities"
          aria-labelledby="responsibilities-heading"
        >
          <h2 id="responsibilities-heading">What I was responsible for</h2>
          <div>
            {responsibilities.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          className="case-study-evidence"
          aria-labelledby="evidence-heading"
        >
          <h2 id="evidence-heading">The shipped product</h2>
          <p>
            The application is publicly listed for iOS and Android. These
            listings provide a way to explore the product independently.
          </p>
          <div className="project-destinations">
            {project.links!.map((link) => (
              <a
                key={link.href}
                className="text-link"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
        <p className="case-study-note">
          Role, dates, and responsibilities are based on my resume.
        </p>
        <Link href="/#contact" className="button button-primary">
          Discuss a similar project
          <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </main>
      <Footer />
    </>
  );
}

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/portfolio";
import Link from "next/link";
export function Contact() {
  return (
    <section
      id="contact"
      className="contact-section section-space"
      aria-labelledby="contact-heading"
    >
      <div className="wrap contact-content">
        <div>
          <p className="eyebrow">Let’s talk</p>
          <h2 id="contact-heading">
            Have a role or
            <br />a product in mind?
          </h2>
          <p>
            I’m open to remote opportunities and conversations about mobile,
            web, and AI-powered applications.
          </p>
        </div>
        <div className="contact-links">
          <a className="contact-email" href={`mailto:${profile.email}`}>
            <span>{profile.email}</span>
            <ArrowUpRight size={26} aria-hidden="true" />
          </a>
          <p>Email is the best place to start.</p>
          <div className="social-links">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.upwork} target="_blank" rel="noreferrer">
              Upwork <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <a href={profile.resume} download>
              Resume <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer wrap">
      <p>© {new Date().getFullYear()} Akhilesh Mourya</p>
      <p>Indore, India</p>
      <Link href="/#home">
        Back to top <ArrowUp size={15} aria-hidden="true" />
      </Link>
    </footer>
  );
}

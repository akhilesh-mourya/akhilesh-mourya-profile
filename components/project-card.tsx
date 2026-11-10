import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { ImageGallery } from "./image-gallery";
export function ProjectLink({ project }: { project: Project }) {
  return (
    <div className="project-destinations">
      {(
        project.links ?? [{ label: project.linkLabel, href: project.href }]
      ).map((link) => (
        <a
          className="text-link"
          href={link.href}
          key={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name}: ${link.label} (opens in a new tab)`}
        >
          {link.label}
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article
      id={project.slug}
      className={`project ${featured ? "project-featured" : ""}`}
      aria-labelledby={`${project.slug}-heading`}
    >
      {project.images && (
        <ImageGallery
          images={project.images}
          project={project.name}
          className={`art-${project.slug}`}
          caption={
            project.category.includes("iOS")
              ? "iOS & Android"
              : "Mobile application"
          }
        />
      )}
      <div className="project-story">
        <p className="project-category">{project.category}</p>
        <h3 id={`${project.slug}-heading`}>{project.name}</h3>
        <p className="project-summary">{project.summary}</p>
        <p className="project-description">{project.contribution}</p>
        <dl className="project-credit">
          <dt>My role</dt>
          <dd>{project.role}</dd>
        </dl>
        <p className="project-stack">{project.stack.join(" / ")}</p>
        {featured && (
          <Link
            className="case-study-link text-link"
            href="/case-studies/natty-hatty"
          >
            Read the case study <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        )}
        <ProjectLink project={project} />
      </div>
    </article>
  );
}

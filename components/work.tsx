import { ImageGallery } from "./image-gallery";
import { projects } from "@/data/portfolio";
import { ProjectCard, ProjectLink } from "./project-card";
export function Work() {
  return (
    <section
      id="work"
      className="work-section section-space wrap"
      aria-labelledby="work-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Products & contributions</p>
          <h2 id="work-heading">Selected work.</h2>
        </div>
        <p>A few of the applications I’ve helped build, lead, and maintain.</p>
      </div>
      <ProjectCard project={projects[0]} featured />
      <div className="project-pair">
        <ProjectCard project={projects[1]} />
        <ProjectCard project={projects[2]} />
      </div>
      <div className="further-work">
        <article
          id="arzooo"
          className="compact-project"
          aria-labelledby="arzooo-heading"
        >
          <div className="compact-project-body">
            <p className="project-category">{projects[3].category}</p>
            <h3 id="arzooo-heading">Arzooo</h3>
            <p>{projects[3].contribution}</p>
            <p className="project-role-line">{projects[3].role}</p>
            <ProjectLink project={projects[3]} />
          </div>
          <ImageGallery
            project="Arzooo"
            images={["/projects/arzooo-2.png"]}
            variant="compact"
          />
        </article>
        <article
          id="openpath-ai"
          className="compact-project openpath-project"
          aria-labelledby="openpath-heading"
        >
          <div className="compact-project-body">
            <p className="project-category">{projects[4].category}</p>
            <h3 id="openpath-heading">OpenPath AI</h3>
            <p>{projects[4].contribution}</p>
            <p className="project-role-line">{projects[4].role}</p>
            <ProjectLink project={projects[4]} />
          </div>
        </article>
      </div>
    </section>
  );
}

import { experience } from "@/data/portfolio";
export function Experience() {
  return (
    <section
      id="experience"
      className="experience-section section-space wrap"
      aria-labelledby="experience-heading"
    >
      <div className="experience-intro">
        <p className="eyebrow">Since 2013</p>
        <h2 id="experience-heading">
          Where I’ve
          <br />
          done the work.
        </h2>
        <p>
          From writing native mobile features to leading teams and making
          architecture decisions.
        </p>
      </div>
      <ol className="career-list">
        {experience.map((job) => (
          <li className="career-entry" key={job.company}>
            <div className="career-top">
              <h3>{job.company}</h3>
              <span>{job.dates}</span>
            </div>
            <p className="career-role">{job.role}</p>
            <p>{job.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types/portfolio";
import Reveal from "@/components/motion/Reveal";
import ProjectCarousel from "./ProjectCarousel";
import ProjectGallery from "./ProjectGallery";
export default function ProjectSection({
  project: p,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Reveal>
      <article
        className={`project-section ${p.featured ? "project-featured" : ""}`}
        id={p.id}
      >
        <div className="project-heading">
          <div>
            <p className="eyebrow">
              <span className="blue">{String(index + 1).padStart(2, "0")}</span>{" "}
              / {p.category}
            </p>
            <h3>
              {p.name}
              <span className="project-english">{p.englishName}</span>
            </h3>
            <p className="project-tagline">{p.description}</p>
          </div>
          {p.link && (
            <a
              className="round-link"
              href={p.link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.name} ${p.link.label}`}
            >
              <ArrowUpRight size={23} />
            </a>
          )}
        </div>
        <div className="project-meta">
          <div>
            <span className="meta-label">ROLE</span>
            <p>{p.role}</p>
          </div>
          <div>
            <span className="meta-label">PERIOD</span>
            <p className="mono">{p.period}</p>
          </div>
          <div className="project-stack">
            <span className="meta-label">TECH STACK</span>
            <div className="tags">
              {p.stack.length ? (
                p.stack.map((s) => <span key={s}>{s}</span>)
              ) : (
                <span>확인 예정</span>
              )}
            </div>
          </div>
        </div>
        <ProjectCarousel name={p.name} id={p.id} slides={p.slides} />
        {p.gallery?.length ? <ProjectGallery name={p.name} items={p.gallery} /> : null}
      </article>
    </Reveal>
  );
}

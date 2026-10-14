import { experiences } from "@/data/experiences";
import { ArrowDownRight } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <Reveal>
        <SectionHeading
          number="02"
          kicker="MY JOURNEY"
          title="Work Experience"
          // description="화면 너머의 흐름까지 이해하며, 다양한 서비스와 함께 성장해왔습니다."
        />
      </Reveal>
      <div className="timeline">
        {experiences.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.04}>
            <article
              className="experience-row"
              id={e.projectId ? `experience-${e.projectId}` : undefined}
            >
              <div className="experience-company">
                <span className="timeline-dot" />
                <h3>{e.company}</h3>
                <p className="mono">{e.period}</p>
              </div>
              <div className="experience-content">
                <p className="role">{e.role}</p>
                <p>{e.description}</p>
                <div className="tags">
                  {e.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <ul className="experience-details" aria-label={`${e.company} 주요 업무`}>
                  {e.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              {e.projectId && (
                <a
                  className="journey-link experience-project-link"
                  href={`#${e.projectId}`}
                  aria-label={`${e.company} 프로젝트 자세히 보기`}
                >
                  자세히 보기
                  <ArrowDownRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </a>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

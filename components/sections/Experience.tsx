import { experiences } from "@/data/experiences";
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
          description="화면 너머의 흐름까지 이해하며, 다양한 서비스와 함께 성장해왔습니다."
        />
      </Reveal>
      <div className="timeline">
        {experiences.map((e, i) => (
          <Reveal key={e.company} delay={i * 0.04}>
            <article className="experience-row">
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
                <details>
                  <summary>
                    주요 업무 살펴보기 <span aria-hidden="true">+</span>
                  </summary>
                  <ul>
                    {e.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </details>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

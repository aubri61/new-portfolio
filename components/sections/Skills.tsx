import { ArrowUpRight, GraduationCap } from "lucide-react";
import { skillGroups, education } from "@/data/skills";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <Reveal>
        <SectionHeading
          number="05"
          kicker="MY TOOLBOX"
          title="Skills & Education"
          description="주력 기술은 깊게, 제품을 만드는 데 필요한 기술은 넓게."
        />
      </Reveal>
      <div className="skills-grid">
        {skillGroups.map((g) => (
          <Reveal key={g.name}>
            <div className={`skill-group ${g.primary ? "primary" : ""}`}>
              <div className="skill-heading">
                <span className="mono">{g.number}</span>
                <h3>{g.name}</h3>
                <ArrowUpRight size={17} aria-hidden="true" />
              </div>
              <div className="skill-items">
                {g.items.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal>
        <div className="education">
          <div className="education-label">
            <GraduationCap size={23} strokeWidth={1.5} />
            <span className="eyebrow">EDUCATION</span>
          </div>
          <div>
            <h3>{education.school}</h3>
            <p>{education.major}</p>
            <p className="education-description">{education.description}</p>
          </div>
          <span className="mono">{education.period}</span>
        </div>
      </Reveal>
    </section>
  );
}

import { ArrowDown, ArrowUpRight, GitFork } from "lucide-react";
import { heroSkills } from "@/data/skills";
import { profile } from "@/data/profile";
import Reveal from "@/components/motion/Reveal";
export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <Reveal hero>
        <div className="hero-topline">
          <p className="eyebrow">
            <span className="status-dot" /> PRODUCT DEVELOPER
          </p>
          <span className="hero-location">BASED IN KOREA</span>
        </div>
      </Reveal>
      <Reveal hero delay={0.1}>
        <h1 id="hero-title">
          안녕하세요.
          <br />
          사용자 경험을 고민하는
          <br />
          <span className="blue">프로덕트 개발자</span>
          <br className="mobile-break" /> 박주언입니다
          <span className="blue">.</span>
        </h1>
      </Reveal>
      <Reveal hero delay={0.22}>
        <div className="hero-bottom">
          <div>
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-links">
              <div className="tags">
                {heroSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                <GitFork size={17} aria-hidden="true" /> GitHub{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
          <a
            className="hero-scroll"
            href="#projects"
            aria-label="프로젝트 살펴보기"
          >
            <ArrowDown size={28} strokeWidth={1.5} />
          </a>
        </div>
      </Reveal>
      <Reveal hero delay={0.3}>
        <div className="hero-footnote">
          <span>THOUGHTFUL INTERFACES. MEANINGFUL EXPERIENCES.</span>
          <a href="#projects">
            SCROLL TO EXPLORE <ArrowDown size={12} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

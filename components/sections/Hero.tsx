import { ArrowUpRight } from "lucide-react";
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
          {/* <span className="hero-location">BASED IN KOREA</span> */}
        </div>
      </Reveal>
      <Reveal hero delay={0.1}>
        <h1 id="hero-title">
          안녕하세요.
          <br />
          사용자 경험의 완성도를 높이는
          <br />
          <span className="blue">프로덕트 개발자</span>
          <br className="mobile-break" /> 박주언입니다
          <span className="blue">.</span>
        </h1>
      </Reveal>
      <Reveal hero delay={0.22}>
        <div className="hero-bottom">
          <div className="hero-copy">
            <p className="hero-description">{profile.intro}</p>
            <div className="hero-links">
              <div className="tags">
                {heroSkills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
          <a
            className="hero-github"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="박주언 GitHub 프로필 열기 (새 탭)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297a12 12 0 0 0-3.793 23.385c.6.111.82-.261.82-.577 0-.285-.011-1.04-.017-2.041-3.338.724-4.043-1.609-4.043-1.609-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.494.998.108-.776.419-1.305.762-1.605-2.665-.303-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.119 3.176.769.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.625-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576A12.001 12.001 0 0 0 12 .297Z" />
            </svg>
            <span>GitHub</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
      {/* <Reveal hero delay={0.3}>
        <div className="hero-footnote">
          <span>THOUGHTFUL INTERFACES. MEANINGFUL EXPERIENCES.</span>
          <a href="#projects">
            SCROLL TO EXPLORE <ArrowDown size={12} aria-hidden="true" />
          </a>
        </div>
      </Reveal> */}
    </section>
  );
}

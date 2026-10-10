import { ArrowUpRight } from "lucide-react";
export default function Header() {
  return (
    <header className="header">
      <a
        className="wordmark"
        href="#home"
        aria-label="박주언 포트폴리오 처음으로"
      >
        jueon<span className="blue">.</span>
      </a>
      <nav aria-label="주요 메뉴">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
      </nav>
      <a href="#contact" className="header-contact">
        Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </header>
  );
}

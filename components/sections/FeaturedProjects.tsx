import { projects } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ProjectSection from "@/components/projects/ProjectSection";
export default function FeaturedProjects() {
  return (
    <section className="section featured" id="projects">
      <Reveal>
        <SectionHeading
          number="03"
          kicker="SELECTED WORK"
          title="Featured Projects"
          description="무엇을 만들었는지, 그리고 어떻게 만들었는지. 서비스 안에 담긴 고민과 구현을 소개합니다."
        />
      </Reveal>
      {projects.map((p, i) => (
        <ProjectSection key={p.id} project={p} index={i} />
      ))}
    </section>
  );
}

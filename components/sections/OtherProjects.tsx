import Image from "next/image";
import { ArrowUpRight, Bell, Users, Scale } from "lucide-react";
import { otherProjects } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";
import SectionHeading from "./SectionHeading";
export default function OtherProjects() {
  const icons = [Bell, Users, Scale];
  return (
    <section className="section other-projects" id="other-projects">
      <Reveal>
        <SectionHeading
          number="04"
          kicker="EXPERIMENTS & SIDE PROJECTS"
          title="More Things I’ve Built"
          description="호기심에서 시작해, 직접 만들어보며 배운 것들."
        />
      </Reveal>
      <div className="other-grid">
        {otherProjects.map((p, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={p.name} delay={i * 0.04}>
              <article className="other-card">
                <div className={`other-image other-${i}`}>
                  {p.videoUrl ? (
                    <iframe
                      src={p.videoUrl}
                      title={`${p.name} 프로젝트 데모 영상`}
                      loading="lazy"
                      allow="encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  ) : p.image ? (
                    <Image
                      src={p.image}
                      alt={`${p.name} 실제 프로젝트 화면`}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 380px"
                      unoptimized={p.image.endsWith(".gif")}
                    />
                  ) : (
                    <div className="other-placeholder">
                      <Icon size={30} strokeWidth={1.3} />
                      <strong>{p.name}</strong>
                      <span>프로젝트 이미지 준비 중</span>
                    </div>
                  )}
                </div>
                <div className="other-copy">
                  <p className="eyebrow">{p.category}</p>
                  <div className="other-title">
                    <h3>{p.name}</h3>
                    {p.link && (
                      <a
                        href={p.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} ${p.link.label}`}
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                  <p className="other-period mono">{p.period}</p>
                  <p className="other-description">{p.description}</p>
                  {p.name === "Cluby" && (
                    <span className="content-pending">상세 내용 확인 중</span>
                  )}
                  <div className="tags">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

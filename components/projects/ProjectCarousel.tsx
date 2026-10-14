"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ImageIcon } from "lucide-react";
import type { ProjectSlide } from "@/types/portfolio";
import ArchitectureDiagram from "./ArchitectureDiagram";
import CodeSnippet from "./CodeSnippet";
export default function ProjectCarousel({
  slides,
  name,
  id,
}: {
  slides: ProjectSlide[];
  name: string;
  id: string;
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const start = useRef<{ x: number; y: number } | null>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const list = tabs.current;
    const active = list?.children[index];
    if (!list || !active) return;
    const bounds = list.getBoundingClientRect();
    const selected = active.getBoundingClientRect();
    if (selected.left < bounds.left || selected.right > bounds.right) {
      list.scrollTo({
        left: list.scrollLeft + selected.left - bounds.left - 16,
        behavior: reduced ? "instant" : "smooth",
      });
    }
  }, [index, reduced]);
  if (!slides.length) return null;
  const slide = slides[index];
  function go(next: number) {
    const clamped = Math.max(0, Math.min(slides.length - 1, next));
    if (clamped === index) return;
    setDirection(clamped > index ? 1 : -1);
    setIndex(clamped);
  }
  return (
    <div
      className="carousel"
      role="region"
      aria-roledescription="캐러셀"
      aria-label={`${name} 기술 소개`}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          go(index - 1);
        }
        if (e.key === "ArrowRight") {
          e.preventDefault();
          go(index + 1);
        }
      }}
    >
      <div ref={tabs} className="carousel-tabs" role="group" aria-label="슬라이드 선택">
        {slides.map((s, i) => (
          <button
            key={`${s.label}-${i}`}
            aria-current={i === index ? "step" : undefined}
            aria-controls={`${id}-slide`}
            onClick={() => go(i)}
            className={i === index ? "active" : ""}
          >
            <span className="mono">0{i + 1}</span>
            {s.label}
          </button>
        ))}
      </div>
      <div
        className="carousel-viewport"
        onTouchStart={(e) => {
          start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          if (!start.current) return;
          const dx = e.changedTouches[0].clientX - start.current.x;
          const dy = e.changedTouches[0].clientY - start.current.y;
          if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3)
            go(index + (dx < 0 ? 1 : -1));
          start.current = null;
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            id={`${id}-slide`}
            className={`slide ${slide.image ? "slide-with-image" : slide.diagram ? "slide-with-diagram" : ""}`}
            role="group"
            aria-roledescription="슬라이드"
            aria-label={`${index + 1} / ${slides.length}: ${slide.label}`}
            initial={{ opacity: 0, x: reduced ? 0 : direction * 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reduced ? 0 : direction * -20 }}
            transition={{ duration: reduced ? 0 : 0.4 }}
          >
            <div
              className="slide-copy"
              tabIndex={0}
              role="region"
              aria-label={`${name} ${slide.label} 설명`}
            >
              <p className="eyebrow blue">{slide.label.toUpperCase()}</p>
              <h4>{slide.title}</h4>
              <p>{slide.description}</p>
              <ul>
                {slide.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              {slide.note && <p className="slide-note">{slide.note}</p>}
            </div>
            <div
              className={`slide-visual ${id}`}
              tabIndex={0}
              role="region"
              aria-label={`${name} ${slide.label} 시각 자료`}
            >
              <div className="slide-visual-content">
                {slide.visualIntro && (
                  <p className="visual-intro">{slide.visualIntro}</p>
                )}
                {slide.image ? (
                  <div className="project-image">
                    <Image
                      src={slide.image}
                      alt={slide.imageAlt || `${name} 서비스 화면`}
                      fill
                      sizes="(max-width: 760px) 90vw, 750px"
                    />
                    <a
                      className="image-original"
                      href={slide.image}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      원본 크게 보기 ↗
                    </a>
                  </div>
                ) : slide.diagram ? (
                  <ArchitectureDiagram diagram={slide.diagram} />
                ) : slide.code ? (
                  <CodeSnippet {...slide.code} />
                ) : slide.kind === "media" ? (
                  <div className="image-placeholder">
                    <ImageIcon size={30} strokeWidth={1.2} />
                    <span className="placeholder-brand">
                      {name}
                      <span className="blue">.</span>
                    </span>
                    <p>
                      {id === "my-garage"
                        ? "PROJECT IN PROGRESS"
                        : "SCREENSHOT COMING SOON"}
                    </p>
                    <small>실제 프로젝트 이미지 준비 중</small>
                  </div>
                ) : (
                  <p className="visual-unavailable">
                    구체적인 기술 흐름 자료 확인 중
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="carousel-footer">
        <span className="mono" aria-live="polite" aria-atomic="true">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="muted">
            / {String(slides.length).padStart(2, "0")}
            <span className="carousel-current-label"> · {slide.label}</span>
          </span>
        </span>
        <div className="carousel-arrows">
          <button
            aria-label={`${name} 이전 슬라이드`}
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            aria-label={`${name} 다음 슬라이드`}
            disabled={index === slides.length - 1}
            onClick={() => go(index + 1)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import type { ProjectSlide } from "@/types/portfolio";
import styles from "./ProjectEvidence.module.css";

export default function ProjectEvidence({ slide }: { slide: ProjectSlide }) {
  if (slide.experience) {
    const { screens, metric } = slide.experience;
    return (
      <div className={styles.evidence}>
        <h5>모바일 대여 화면 · 실제 검증 캡처</h5>
        <div className={styles.screens}>
          {screens.map((screen) => (
            <figure className={styles.screen} key={screen.title}>
              <div className={styles.capture}><Image src={screen.image} alt={`My Garage ${screen.title}: ${screen.detail}`} fill sizes="(max-width: 760px) 40vw, 280px" /></div>
              <figcaption><strong>{screen.title}</strong><p>{screen.detail}</p><a href={screen.image} target="_blank" rel="noopener noreferrer">전체 화면 ↗</a></figcaption>
            </figure>
          ))}
        </div>
        <section className={styles.metric} aria-label={`${metric.label} 개선 기록`}>
          <h6>{metric.label}</h6>
          <div className={styles.comparison}>
            <div><span>BEFORE</span><strong>{metric.before}</strong></div>
            <span aria-hidden="true">→</span>
            <div><span>AFTER</span><strong>{metric.after}</strong></div>
          </div>
          <p>production · 390×844 · CPU 4× · API/지도 fixture · 3회 / 최초 3초</p>
          <small>실사용 Core Web Vitals가 아닌 로컬 측정</small>
          <div className={styles.sources}><a href="/projects/my-garage/cls-before.json" target="_blank" rel="noopener noreferrer">Before 원본 ↗</a><a href="/projects/my-garage/cls-after.json" target="_blank" rel="noopener noreferrer">After 원본 ↗</a></div>
        </section>
      </div>
    );
  }
  if (slide.verification) {
    return (
      <div className={styles.evidence}>
        <h5>대표 E2E · 사용자 간 공유와 접근 차단</h5>
        <ol className={styles.steps}>
          {slide.verification.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}</li>)}
        </ol>
        <table className={styles.results}>
          <caption>저장된 실행 기록 · 범위별 결과</caption>
          <thead><tr><th scope="col">영역 / 실행 조건</th><th scope="col">결과</th></tr></thead>
          <tbody>
            {slide.verification.results.map(({ area, result, scope }) => (
              <tr key={area}><th scope="row">{area}<small>{scope}</small></th><td>{result}</td></tr>
            ))}
          </tbody>
        </table>
        <p className={styles.footnote}>2026.10.09–10의 별도 실행 기록 · 합산 없음 · 서비스 테스트 재실행 없음</p>
      </div>
    );
  }
  return null;
}

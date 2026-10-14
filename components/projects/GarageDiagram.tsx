import type { ProjectSlide } from "@/types/portfolio";
import styles from "./GarageDiagram.module.css";

function Box({ title, detail, accent = false }: { title: string; detail: string; accent?: boolean }) {
  return <div className={`${styles.box} ${accent ? styles.accent : ""}`}><strong>{title}</strong><small>{detail}</small></div>;
}

export default function GarageDiagram({ variant }: { variant: NonNullable<ProjectSlide["garageVisual"]> }) {
  if (variant === "overview") return (
    <figure className={styles.diagram}>
      <figcaption>전체 시스템 · 실제 요청 경로</figcaption>
      <div className={styles.architecture}>
        <section className={styles.group}><h5>Client · Next.js / React</h5>
          <div className={styles.tiles}><Box title="차량 탐색·대여" detail="/renter · /bookings" /><Box title="소유자·계약·접근" detail="/owner · /contracts · /digital-key" /></div>
          <Box title="TanStack Query + Axios" detail="서버 상태 · 세션 쿠키 · CSRF" accent />
        </section>
        <section className={styles.group}><h5>Server · Spring Boot</h5>
          <Box title="Spring Security" detail="Session 인증 · CSRF 검증" />
          <Box title="Controller → SharingService" detail="계약 · 접근 권한 · 원격 제어" accent />
          <Box title="JPA → PostgreSQL" detail="Vehicle · Rental · Grant · Unlock" />
        </section>
      </div>
      <div className={styles.routes}>
        <p><b>REST →</b> Axios → Next API rewrite → Spring API</p>
        <p><b>← SSE</b> EventSource ← 전용 Route Handler ← SseEmitter</p>
      </div>
      <p className={styles.caption}>차량 잠금은 DB 상태 시뮬레이션 · REST 데이터와 SSE 알림 경로 분리</p>
    </figure>
  );
  if (variant === "authorization") return (
    <figure className={styles.diagram}>
      <figcaption>계약 기반 원격 제어 · 요청/승인 시퀀스</figcaption>
      <svg className={styles.sequence} viewBox="0 0 600 330" role="img" aria-label="대여자 요청, 서버 권한 검증, 소유자 알림과 승인, 서버 재검증 후 가상 잠금 상태 변경">
        <defs><marker id="garage-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" fill="currentColor" /></marker></defs>
        {[{x:90,name:"대여자"},{x:300,name:"Spring 서버"},{x:510,name:"소유자"}].map(({x,name}) => <g key={name}><rect x={x-70} y="5" width="140" height="34" rx="6" /><text x={x} y="27" textAnchor="middle">{name}</text><line className={styles.lifeline} x1={x} y1="40" x2={x} y2="322" /></g>)}
        <g className={styles.messages}>
          <line x1="90" y1="72" x2="296" y2="72" markerEnd="url(#garage-arrow)" /><text x="192" y="63" textAnchor="middle">① 잠금 해제 요청</text>
          <rect x="210" y="88" width="180" height="35" rx="5" /><text x="300" y="110" textAnchor="middle">② 대여자·권한 검증</text>
          <line className={styles.event} x1="300" y1="150" x2="506" y2="150" markerEnd="url(#garage-arrow)" /><text x="408" y="140" textAnchor="middle">③ 요청 저장 · SSE 알림</text>
          <line x1="510" y1="191" x2="304" y2="191" markerEnd="url(#garage-arrow)" /><text x="408" y="181" textAnchor="middle">④ 소유자 승인</text>
          <rect x="205" y="208" width="190" height="35" rx="5" /><text x="300" y="230" textAnchor="middle">⑤ 소유권·권한 재검증</text>
          <rect x="211" y="261" width="178" height="35" rx="5" /><text x="300" y="283" textAnchor="middle">⑥ DB → UNLOCKED</text>
        </g>
      </svg>
      <ol className={styles.mobileSequence} aria-label="원격 제어 시퀀스">
        {[
          ["대여자 → 서버", "잠금 해제 요청"],
          ["서버", "대여자·기간·회수 검증"],
          ["서버 → 소유자", "요청 저장 · SSE 알림"],
          ["소유자 → 서버", "요청 승인"],
          ["서버", "소유권·권한 재검증"],
          ["서버 → DB", "UNLOCKED 변경"],
        ].map(([actor, action], index) => <li key={action}><strong>0{index + 1} · {actor}</strong><span>{action}</span></li>)}
      </ol>
      <div className={styles.branches}><Box title="유효한 계약·권한" detail="요청 및 승인 처리" accent /><Box title="만료·회수·당사자 불일치" detail="서버에서 제어 차단" /></div>
      {/* <p className={styles.caption}>세션 인증 + CSRF → 실제 계약 관계 검증 · 선택적 PKI 증명은 별도 검증 경로</p> */}
    </figure>
  );
  if (variant === "sync") return (
    <figure className={`${styles.diagram} ${styles.syncDiagram}`}>
      <figcaption>Spring Boot에서 최신 UI까지 · 스트리밍 경로</figcaption>
      <div className={styles.syncGrid}>
        <section className={styles.group}>
          <h5>SERVER · Spring Boot</h5>
          <div className={styles.pair}><Box title="01 · Commit" detail="계약 변경 확정" /><span aria-hidden="true">→</span><Box title="02 · SSE" detail="커밋 후 당사자 알림" /></div>
        </section>
        <p className={styles.bridge}>↓ SSE 응답 청크</p>
        <section className={styles.proxy} aria-label="Next.js SSE Streaming Proxy">
          <h5>03 · Next.js Streaming Proxy</h5>
          <code>/api/notifications/stream</code>
          <p>ReadableStream · reader.read() → enqueue(chunk)</p>
          <div className={styles.proxyHeaders}><span>Accept-Encoding: identity</span><span>no-cache, no-transform</span><span>X-Accel-Buffering: no</span></div>
        </section>
        <p className={styles.bridge}>↓ 종료를 기다리지 않고 브라우저로 전달</p>
        <section className={styles.group}>
          <h5>CLIENT · 대여자 브라우저</h5>
          <div className={styles.pair}><Box title="04 · EventSource" detail="변경 이벤트 수신" /><span aria-hidden="true">→</span><Box title="05 · TanStack Query" detail="cancel → invalidate" /></div>
          <p className={styles.bridge}>↓ 캐시 무효화 후 최신 데이터 조회</p>
          <div className={styles.pair}><Box title="06 · REST" detail="서버 상태 재조회" /><span aria-hidden="true">→</span><Box title="07 · UI" detail="최신 계약·잠금 상태" /></div>
        </section>
      </div>
      <p className={styles.cacheResult}><b>캐시 최적화 검증</b> · 이벤트 3개 → 재조회 1회<br />동일 ID → 추가 조회 0회 · 50ms 병합 / ready·online 복구</p>
      {/* <p className={styles.caption}>2026.10.10 · production Chrome / API·SSE fixture · 프록시 지연 개선 수치 아님</p> */}
    </figure>
  );
  return (
    <figure className={styles.diagram}>
      <figcaption>동시 승인 · 차량별 잠금 전후</figcaption>
      <div className={styles.timeline}>
        <section><h5>Before · 잠금 없는 경쟁 상태 <small>문제 상황의 개념 비교</small></h5>
          <div className={styles.track}><b>A</b><span>겹침 없음 조회</span><span>승인 가능</span><span className={styles.risk}>중복 위험</span></div>
          <div className={styles.track}><b>B</b><span>겹침 없음 조회</span><span>승인 가능</span><span className={styles.risk}>중복 위험</span></div>
        </section>
        <section><h5>After · PESSIMISTIC_WRITE <small>현재 구현</small></h5>
          <div className={styles.track}><b>A</b><span className={styles.active}>잠금·재검사</span><span className={styles.active}>승인·커밋</span><span>잠금 해제</span></div>
          <div className={styles.track}><b>B</b><span className={styles.wait}>잠금 대기</span><span className={styles.wait}>잠금 대기</span><span className={styles.active}>재검사·409</span></div>
        </section>
      </div>
      <div className={styles.outcome}><b>승인 1건</b><span>충돌 1건 · CONTRACT_PENDING 1건</span></div>
      <p className={styles.caption}>시간 → · 동일 차량 / 겹치는 기간 · 잠금 획득 후 refresh 및 기간 검사</p>
    </figure>
  );
}

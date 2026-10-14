import type { ReactNode } from "react";
import type { ProjectSlide } from "@/types/portfolio";
import { nadaunLighthouse } from "@/data/nadaun";
import styles from "./NadaunDiagram.module.css";

function Card({ title, detail, accent = false }: { title: string; detail?: string; accent?: boolean }) {
  return <div className={`${styles.card} ${accent ? styles.accent : ""}`}><strong>{title}</strong>{detail && <small>{detail}</small>}</div>;
}
function Group({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.group}><h5>{title}</h5>{children}</section>;
}
function Arrow() { return <span className={styles.arrow} aria-hidden="true">↓</span>; }
function Route({ items }: { items: string[] }) {
  return <div className={styles.route}>{items.map((item,i)=><div className={styles.step} key={item}><Card title={item} />{i<items.length-1 && <span aria-hidden="true">→</span>}</div>)}</div>;
}
function Order({ items }: { items: string[] }) { return <div className={styles.order}>{items.map((item,i)=><span key={item}>{i+1}<b>{item}</b></span>)}</div>; }
function Scores() {
  return <section className={styles.measurement} aria-label="2026년 10월 10일 Desktop Lighthouse 과거 측정 기록">
    <div className={styles.scores}>{nadaunLighthouse.scores.map(score=><div key={score.label} className={styles.score}>
      <svg viewBox="0 0 80 80" role="img" aria-label={`${score.label} ${score.value}점`}><circle cx="40" cy="40" r="30" className={styles.track} /><circle cx="40" cy="40" r="30" className={styles.arc} strokeDasharray={`${score.value / 100 * 188.496} 188.496`} transform="rotate(-90 40 40)" /><text x="40" y="45" textAnchor="middle">{score.value}</text></svg><span>{score.label}</span>
    </div>)}</div>
    <div className={styles.metrics}><span>LCP <b>{nadaunLighthouse.lcp}</b></span><span>CLS <b>{nadaunLighthouse.cls}</b></span></div>
    <p className={styles.caption}>{nadaunLighthouse.date} · {nadaunLighthouse.environment} · Lighthouse {nadaunLighthouse.version}<br /><a href={nadaunLighthouse.url} target="_blank" rel="noopener noreferrer">nadaun.life</a> · 사용자 제공 과거 기록</p>
  </section>;
}
export default function NadaunDiagram({ variant }: { variant: NonNullable<ProjectSlide["nadaunVisual"]> }) {
  const titles = { overview:"모노레포 · 사용자·관리자와 API", operations:"빌드 검사·서버 배포 / 콘텐츠 동기화", workflow:"신청·입금 확인·승인 · 역할별 흐름", auth:"OAuth 계정 확인 → 서비스 JWT 인증", session:"동시 인증 실패 → 공유 갱신 → 재시도", admin:"큐레이션 정렬 · 선반영과 복구", performance:"이미지·렌더링 전략과 웹 품질 기록" };
  return <figure className={styles.diagram}><figcaption>{titles[variant]}</figcaption>
    {variant === "overview" && <>
      <div className={styles.repo}>pnpm Workspace · Turborepo</div>
      <div className={styles.architecture}>
        <Group title="WEB / ADMIN → API → DATABASE">
          <div className={styles.columns}><Card title="Next.js Web" detail="클래스·신청·마이페이지 / Query·Zustand" /><Card title="Next.js Admin" detail="콘텐츠·입금·승인 / DnD·Optimistic" /></div><Arrow />
          <Card title="NestJS API" detail="인증 · 신청·승인 · 관리자 로직" accent /><Arrow /><Route items={["Prisma ORM", "PostgreSQL"]} />
        </Group>
        <Group title="EXTERNAL / OPERATIONS"><div className={styles.stack}>
          <Card title="Google·Kakao" detail="Web → Provider → API 콜백" />
          <Card title="Notion API" detail="NestJS 스케줄러 → 콘텐츠 조회" />
          <Card title="GitHub Actions" detail="코드 검사·수동 서버 배포" />
          <Card title="EC2·PM2 / Slack" detail="Actions → 배포·결과 알림" />
        </div></Group>
      </div>
      <p className={styles.caption}>RN·Expo 앱 개발: 클래스·이벤트 탐색, 상세·신청 이력 화면</p>
    </>}
    {variant === "operations" && <>
      <Group title="WEB / ADMIN CI · PR·push 자동 실행"><Route items={["타입 검사", "ESLint", "앱 빌드"]} /></Group>
      <Group title="서버 배포 · 수동 시작 후 자동 처리"><Route items={["workflow_dispatch", "공유 패키지·Prisma 생성", "Nest 빌드"]} /><Arrow /><Route items={["EC2 전송", "PM2 재시작", "Slack 결과 알림"]} /><p className={styles.caption}>Prisma migrate deploy는 선택 실행 · 테스트 자동 단계 없음</p></Group>
      <Group title="콘텐츠 동기화 · NestJS Cron"><Route items={["스케줄 실행", "Notion API 조회", "DB 생성·수정"]} /><p className={styles.caption}>배포와 독립된 실행 흐름 · 삭제는 수동 처리</p></Group>
    </>}
    {variant === "workflow" && <>
      <div className={styles.lanes}><b>사용자 웹</b><b>NestJS API</b><b>관리자 웹</b></div>
      <div className={styles.sequence}>
        <div><Card title="클래스 신청 →" /><Card title="신청 생성" detail="입금 대기" /><span /></div>
        <div><Card title="계좌이체" detail="서비스 밖에서 입금" /><Card title="입금 확인·활성화" detail="상태·참여 인원 변경" accent /><Card title="← 입금 확인" /></div>
        <div><span /><Card title="입금 여부 재검사" detail="승인 처리" /><Card title="← 최종 승인" /></div>
        <div><Card title="신청 상태 표시" /><Card title="← 최신 데이터 응답" /><span /></div>
      </div>
      <p className={styles.caption}>입금 확인 시 신청 활성화 · 최종 승인은 별도 처리<br />Prisma $transaction: 입금 확인의 상태·인원 변경</p>
    </>}
    {variant === "auth" && <>
      <div className={styles.lanes}><b>사용자 웹</b><b>Google·Kakao</b><b>NestJS</b></div>
      <div className={styles.sequence}>
        <div><Card title="로그인 선택" /><Card title="동의·인가 코드 발급" /><span /></div>
        <div><span /><Card title="Provider 토큰·계정" /><Card title="코드 교환·계정 조회" accent /></div>
        <div><Card title="Access Token 수신" /><span /><Card title="회원 처리·JWT 발급" detail="Refresh Token → 운영 웹 쿠키" /></div>
        <div><Card title="Bearer API 요청 →" /><span /><Card title="JWT Guard" detail="서비스 API 인증" accent /></div>
      </div>
      <p className={styles.caption}>OAuth: 외부 계정 확인 · JWT: 서비스 API 인증</p>
    </>}
    {variant === "session" && <>
      <div className={styles.requests}>{["요청 A","요청 B","요청 C"].map(item=><Card title={item} detail="401 / 403" key={item} />)}</div><Arrow />
      <Group title="AXIOS 응답 인터셉터"><div className={styles.columns}><Card title="첫 요청" detail="refreshPromise 생성" accent /><Card title="나머지 요청" detail="동일 Promise 대기" /></div><Arrow /><Card title="하나의 토큰 갱신 작업" detail="새 Access Token 결과 공유" accent /></Group><Arrow />
      <div className={styles.requests}>{["요청 A 재시도","요청 B 재시도","요청 C 재시도"].map(item=><Card title={item} key={item} />)}</div>
      <div className={styles.columns}><Card title="finally" detail="공유 Promise 초기화" /><Card title="갱신 오류 처리" detail="clearAuth·인증 상태 초기화" /></div>
    </>}
    {variant === "admin" && <>
      <div className={styles.columns}>
        <Group title="BEFORE · 기존 순서"><Order items={["A","B","C"]} /></Group>
        <Group title="OPTIMISTIC · C를 위로 이동"><Order items={["C","A","B"]} /></Group>
      </div>
      <Group title="onMutate"><Route items={["진행 조회 취소", "이전 목록 백업", "캐시·UI 선반영"]} /></Group>
      <div className={styles.columns}>
        <Group title="성공 · onSuccess"><Order items={["C","A","B"]} /><p className={styles.caption}>서버 응답 반영 · invalidateQueries</p></Group>
        <Group title="실패 · onError"><Order items={["A","B","C"]} /><p className={styles.caption}>백업 캐시로 Rollback</p></Group>
      </div>
    </>}
    {variant === "performance" && <>
      <Group title="관리자 이미지 업로드"><Route items={["원본 이미지", "Web Worker 압축", "압축 파일 업로드"]} /></Group>
      <div className={styles.columns}><Card title="Server Component" detail="상세 데이터 조회·Metadata·JSON-LD" /><Card title="Client Component" detail="상태·이벤트·신청 인터랙션" /></div>
      <Scores />
    </>}
  </figure>;
}

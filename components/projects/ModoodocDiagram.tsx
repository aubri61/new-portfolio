import type { ReactNode } from "react";
import type { ProjectSlide } from "@/types/portfolio";
import styles from "./ModoodocDiagram.module.css";

function Card({ title, detail, accent = false }: { title: string; detail?: string; accent?: boolean }) {
  return <div className={`${styles.card} ${accent ? styles.accent : ""}`}><strong>{title}</strong>{detail && <small>{detail}</small>}</div>;
}
function Arrow({ down = false }: { down?: boolean }) {
  return <span className={styles.arrow} aria-hidden="true">{down ? "↓" : "→"}</span>;
}
function Group({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.group}><h5>{title}</h5>{children}</section>;
}
function Route({ items }: { items: string[] }) {
  return <div className={styles.route}>{items.map((item, i) => <div className={styles.step} key={item}><Card title={item} />{i < items.length - 1 && <Arrow />}</div>)}</div>;
}
export default function ModoodocDiagram({ variant }: { variant: NonNullable<ProjectSlide["modoodocVisual"]> }) {
  const titles = { overview: "병원 웹·관리자 웹·앱의 서비스 구조", migration: "모델 개편과 데이터 이전", performance: "상세 이미지 로딩 · Before / After", admin: "Django Admin · 조건 기반 조회", personalization: "실험 계측과 공유 상태" };
  return <figure className={styles.diagram}>
    <figcaption>{titles[variant]}<small>개념도</small></figcaption>
    {variant === "overview" && <div className={styles.overview}>
      <Group title="FRONTEND"><div className={styles.clients}>
        <Card title="병원 웹" detail="Django Templates · JavaScript · AJAX" />
        <Card title="관리자 웹" detail="Django Admin" />
        <Card title="RN App" detail="React Native · Redux" />
      </div></Group>
      <Arrow down />
      <Group title="BACKEND · Django / Python">
        <div className={styles.backendRoute}>
          <Card title="Views / API" detail="요청 처리" />
          <Arrow />
          <Card title="Models / ORM" detail="데이터 접근" />
        </div>
      </Group>
      <div className={styles.columns}>
        <div><Arrow down /><Group title="DATABASE"><Card title="PostgreSQL" /></Group></div>
        <div className={styles.experiment}><Group title="EXPERIMENT"><Card title="Hackle A/B 테스트" detail="웹·앱 ↔ 실험·이벤트 계측" /></Group></div>
      </div>
    </div>}
    {variant === "migration" && <>
      <div className={styles.columns}>
        <Group title="BEFORE · 관련 정보 관리"><div className={styles.stack}><Card title="데이터 카드 A" /><Card title="데이터 카드 B" /><Card title="데이터 카드 C" /></div><p className={styles.note}>실제 모델 수·관계와 무관한 예시</p></Group>
        <Group title="AFTER · 모델 관계 재설계"><div className={styles.stack}><Card title="공통 정보 분리" accent /><Card title="연결 관계 재구성" /><Card title="확장성을 고려한 관리" /></div></Group>
      </div>
      <Group title="MIGRATION"><Route items={["관계 설계", "대상 선별", "ORM 이전", "검증"]} /></Group>
    </>}
    {variant === "performance" && <>
      <div className={styles.columns}>
        <Group title="BEFORE · 초기 처리 부담"><Card title="상세 화면 진입" /><Arrow down /><Card title="초기 이미지 조회·로딩" /><Arrow down /><Card title="화면 표시 지연" /></Group>
        <Group title="AFTER · 필요한 이미지 먼저"><Card title="대표 이미지 조회" detail="UNION · 필드·건수 제한" accent /><Arrow down /><Card title="초기 화면 표시" /><Arrow down /><Card title="모달 선택 시 추가 요청" detail="On-Demand Loading · 전체 갤러리" accent /></Group>
      </div>
      <Group title="별도 경로 · 검색 목록"><div className={styles.columns}><Card title="Before" detail="병원별 연관 이미지 반복 조회" /><Card title="Prefetch" detail="연관 이미지 일괄 조회" accent /></div></Group>
    </>}
    {variant === "admin" && <>
      <Group title="관리자 입력"><Card title="필터 조건 선택" detail="Django Admin · SimpleListFilter" /></Group>
      <Arrow down />
      <Group title="서버 측 조회"><div className={styles.columns}><Card title="ORM 표현식" detail="선택한 조건 구성" /><Card title="QuerySet 필터링" detail="조건에 맞는 대상 조회" accent /></div></Group>
      <Arrow down />
      <Group title="목록과 업무 처리"><div className={styles.columns}><Card title="검수 목록 갱신" detail="조건에 맞는 데이터 표시" /><Card title="상세 확인·검수" detail="관련 정보와 관리 화면 연결" /></div></Group>
    </>}
    {variant === "personalization" && <div className={styles.columns}>
      <Group title="HACKLE · UI 실험"><Card title="사용자 진입" /><Arrow down /><Card title="실험 분기" accent /><Arrow down /><div className={styles.columns}><Card title="UI A" /><Card title="UI B" /></div><Arrow down /><Card title="행동 이벤트 계측" detail="화면 노출·클릭 관찰" /></Group>
      <Group title="REDUX · 홈 개인화"><div className={styles.stack}><Card title="최근 조회 병원" /><Card title="위치 정보" /></div><Arrow down /><Card title="Redux Store" detail="앱 컴포넌트의 공유 상태" accent /><Arrow down /><Card title="홈 UI" detail="상태에 따른 콘텐츠 구성" /></Group>
    </div>}
  </figure>;
}

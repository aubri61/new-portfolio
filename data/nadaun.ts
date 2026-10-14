import type { Project } from "@/types/portfolio";

// 소스 대조: docs/nadaun-source-audit.md. Lighthouse는 사용자 제공 과거 기록.
export const nadaunLighthouse = {
  scores: [{ label: "Performance", value: 95 }, { label: "Accessibility", value: 98 }, { label: "Best Practices", value: 73 }, { label: "SEO", value: 92 }],
  lcp: "1.6초", cls: "0", date: "2026.10.10 KST", environment: "Desktop", version: "13.4.0", url: "https://nadaun.life/",
};
export const nadaun: Project = {
  id: "nadaun", name: "나다운", englishName: "NADAUN", category: "SPORTS · WEB & ADMIN", featured: true,
  description: "클래스 탐색·신청부터 입금 확인·승인, 인증과 배포·운영까지 직접 개발했습니다.",
  role: "단독 풀스택 개발 / 사용자 웹·관리자 웹·API",
  period: "2025.10 — 2026.02",
  stack: ["Next.js", "TypeScript", "NestJS", "Prisma", "PostgreSQL", "TanStack Query", "Zustand", "Axios", "pnpm", "Turborepo", "GitHub Actions", "AWS EC2", "PM2"],
  link: { label: "서비스 방문", url: "https://nadaun.life/" },
  slides: [
    {
      kind: "overview", label: "Overview", title: "사용자 웹·관리자 웹·API까지, 서비스 End-to-End 개발",
      description: "스포츠 코칭 클래스 플랫폼 나다운의 사용자 웹·관리자 웹·백엔드 서버를 단독 개발했습니다. 클래스 탐색부터 신청, 입금 확인과 승인까지 주요 기능을 구현하고 인증·관리자 상태 처리와 배포·운영 환경을 구축했습니다.",
      points: ["Next.js 사용자 웹·관리자 웹 및 NestJS API 단독 개발", "클래스 탐색·신청·계좌이체 입금 확인·승인 로직", "OAuth 2.0·JWT 인증과 클라이언트 상태 동기화", "pnpm·Turborepo 모노레포 및 AWS 배포 환경", "관리자 Web Worker 이미지 처리·Notion 콘텐츠 동기화"],
      nadaunVisual: "overview",
    },
    {
      kind: "engineering", label: "CI/CD & Operations", title: "GitHub Actions 기반 배포 및 Notion 콘텐츠 동기화 자동화",
      description: "Web/Admin의 자동 빌드 검사와 서버 배포를 별도 워크플로로 구성했습니다. NestJS 스케줄러로 Notion 콘텐츠를 주기적으로 수집합니다.",
      caseStudy: { problem: "앱별 변경을 검사하고 서버 배포와 외부 콘텐츠 갱신을 반복 가능한 절차로 관리해야 했습니다.", solution: "pnpm·Turborepo 빌드와 Actions 배포를 구성하고 Notion API를 스케줄 작업에 연결했습니다.", result: "수동 실행 후 서버 배포·PM2 재시작·Slack 알림이 이어지고, 콘텐츠는 생성·수정 동기화됩니다." },
      points: ["Web/Admin CI: PR·push에 타입 검사·ESLint·빌드", "서버 배포: workflow_dispatch로 시작·마이그레이션은 선택 실행", "서버 빌드: 공유 패키지·Prisma Client 생성·Nest 빌드", "Notion 신규·수정 반영 · 삭제는 자동 동기화하지 않음"],
      nadaunVisual: "operations",
    },
    {
      kind: "engineering", label: "Service Workflow", title: "클래스 신청부터 입금 확인·승인까지, 핵심 비즈니스 로직 구현",
      description: "사용자 신청 화면에 필요한 API와 관리자 입금 확인·승인 로직을 NestJS에서 구현했습니다. 결제 방식은 계좌이체와 관리자의 입금 확인입니다.",
      caseStudy: { problem: "신청과 입금·승인 진행 상태를 사용자·관리자 화면에서 일관되게 다뤄야 했습니다.", solution: "신청 생성과 상태 변경 API를 Prisma 데이터 처리에 연결하고 양쪽 화면에 처리 결과를 반영했습니다.", result: "입금 대기로 신청을 생성하고, 입금 확인 시 신청을 활성화합니다. 최종 승인에서는 입금 여부를 다시 검사합니다." },
      points: ["동의 여부·기존 신청 확인 후 신청 데이터 생성", "입금 확인 시 상태·참여 인원 변경에 Prisma $transaction 적용", "신청 후 내 신청·클래스 신청 캐시 무효화"],
      nadaunVisual: "workflow",
    },
    {
      kind: "engineering", label: "Authentication", title: "OAuth 2.0 소셜 로그인과 JWT 기반 서비스 인증 구현",
      description: "Google·Kakao 계정 확인과 서비스 자체 API 인증을 구분했습니다. NestJS에서 소셜 사용자 정보를 조회하고 서비스용 토큰을 발급합니다.",
      caseStudy: { problem: "외부 계정 로그인 결과를 서비스 회원 처리와 보호된 API 인증에 연결해야 했습니다.", solution: "인가 코드를 provider 토큰으로 교환하고 사용자를 조회한 뒤 JWT Access/Refresh Token을 발급했습니다.", result: "소셜 로그인 이후 Bearer Access Token으로 API를 요청하고 Refresh Token으로 세션을 연장합니다." },
      points: ["Google·Kakao: Authorization Code Flow", "운영 웹 Refresh Token: HttpOnly·Secure·SameSite=None 쿠키", "Access Token: Zustand 상태·localStorage 호환 경로", "NestJS JWT Guard로 보호된 API 인증"],
      nadaunVisual: "auth",
    },
    {
      kind: "problem", label: "Session Stability", title: "Axios 인터셉터·Promise 공유 기반 중복 토큰 갱신 방지",
      description: "여러 API의 인증 실패를 Axios 응답 인터셉터에서 처리했습니다. 갱신 중인 요청들은 같은 Promise를 기다리도록 구성했습니다.",
      caseStudy: { problem: "Access Token 만료 시 동시 API 요청이 인증 실패를 반환하면 갱신 요청도 중복될 수 있었습니다.", solution: "첫 요청이 refreshPromise를 생성하고 나머지는 같은 결과를 기다린 뒤 새 토큰으로 원래 요청을 재시도합니다.", result: "진행 중인 갱신 작업을 공유하고 완료 시 Promise를 초기화합니다. 갱신 오류 처리에는 인증 상태 초기화를 연결했습니다." },
      points: ["사용자 웹 apiClient에서 401·403 응답 처리", "갱신 성공 시 Zustand·호환 저장소에 새 토큰 반영", "finally에서 공유 Promise 해제 · 실패 처리에서 clearAuth"],
      nadaunVisual: "session",
    },
    {
      kind: "engineering", label: "Admin UX", title: "Optimistic Update·Rollback 기반 관리자 상태 동기화",
      description: "관리자 큐레이션의 드래그 앤 드롭 정렬에 TanStack Query 캐시 갱신을 적용했습니다. 화면 반영과 서버 저장 결과를 함께 처리합니다.",
      caseStudy: { problem: "저장 응답을 기다리면 정렬 반영이 늦어지고, 실패하면 화면과 서버 순서가 달라질 수 있었습니다.", solution: "onMutate에서 조회를 취소하고 이전 목록을 백업한 뒤 캐시를 갱신합니다. onError에서는 백업으로 복구합니다.", result: "변경 순서를 즉시 표시하며, 실패하면 이전 순서로 돌아갑니다. 성공 시 서버 응답 반영과 재조회를 수행합니다." },
      points: ["DnD Kit · 큐레이션 목록 정렬", "cancelQueries·getQueryData·setQueryData", "onSuccess: 응답 데이터 반영·invalidateQueries"],
      nadaunVisual: "admin",
    },
    {
      kind: "engineering", label: "Performance & SEO", title: "Web Worker 이미지 최적화 및 Next.js SEO·렌더링 전략",
      description: "관리자 이미지 업로드의 압축 작업을 분리하고, 사용자 웹의 서버 콘텐츠와 클라이언트 인터랙션을 구분했습니다. 제공된 과거 Lighthouse 결과로 웹 품질을 함께 보여줍니다.",
      caseStudy: { problem: "업로드 이미지 처리 부담을 나누고 검색 엔진이 주요 콘텐츠를 인식할 수 있도록 구성해야 했습니다.", solution: "Worker 옵션을 사용한 이미지 압축과 Server/Client Component 분리, 메타데이터·검색 노출 설정을 적용했습니다.", result: "압축·렌더링 역할을 분리했습니다. 2026.10.10 Desktop Lighthouse 기록은 Performance 95·SEO 92입니다." },
      points: ["browser-image-compression · useWebWorker: true", "블로그 이미지 lazy loading · NestJS 외부 이미지 프록시", "동적 Metadata·Open Graph·Canonical·JSON-LD", "sitemap·robots · 클래스 상세 서버 조회와 Client UI"],
      nadaunVisual: "performance",
    },
  ],
  gallery: [{ title: "모바일 웹 · 클래스 상세", description: "클래스 안내·일정·코치 정보를 표시한 실제 사용자 웹 화면", image: "/projects/nadaun.png", alt: "나다운 모바일 웹 클래스 상세 실제 화면" }],
  todos: [],
};

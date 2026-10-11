import type { Experience } from "@/types/portfolio";
export const experiences: Experience[] = [
  {
    company: "소셜리액트",
    period: "2025.10 — 2026.02",
    role: "Product Developer",
    description:
      "스포츠 클래스·이벤트 플랫폼 나다운의 사용자 웹·관리자 웹과 API를 개발했습니다. 인증 갱신 동시성 제어, 관리자 상태 관리와 클라이언트 최적화부터 운영 자동화까지 담당했습니다.",
    stack: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "TanStack Query",
      "Prisma",
      "PostgreSQL",
      "AWS",
    ],
    details: [
      "pnpm·Turborepo 모노레포로 Next.js Web·Admin과 NestJS API 통합 관리",
      "클래스 탐색·신청·결제 및 사용자·관리자 기능 개발, Prisma 데이터 관리",
      "Google·Kakao OAuth 2.0 및 JWT Access/Refresh Token 인증·세션 유지 구현",
      "Axios 인터셉터의 refreshPromise 공유로 동시 401의 중복 토큰 갱신 방지 및 원래 요청 재시도",
      "TanStack Query Optimistic Update·Rollback으로 관리자 드래그 정렬 선반영과 실패 복원",
      "사용자 액션 후 관련 캐시 무효화와 서버 데이터 동기화",
      "Web Worker 이미지 압축, lazy loading·외부 이미지 프록시 및 Server/Client Component 역할 분리",
      "GitHub Actions·EC2·PM2·Slack 배포 운영 흐름 설계 (검증·마이그레이션 자동 실행 범위 확인 예정)",
      "Notion API 콘텐츠 동기화와 스케줄 기반 운영 자동화",
    ],
  },
  {
    company: "더로벨",
    period: "2023.01 — 2024.11",
    role: "Product Developer",
    description:
      "의료 AI 추론 서비스를 웹 사용자 경험으로 구현하고 다국어 인터페이스와 데이터 대시보드를 개발했습니다.",
    stack: ["Next.js", "TypeScript", "Zustand", "Python", "Docker"],
    details: [
      "i18n 기반 다국어 서비스 및 환자 대시보드 개발",
      "웹 입력부터 Python AI 추론 결과 표시까지 API·UI 연동",
      "생성형 AI 치과 진료 보조 및 ISO 문서 자동화 서비스",
      "녹내장·라섹 시술값 예측 AI 웹 서비스 개발",
      "Docker 및 Python 프레임워크로 AI 모델 적용",
      "Middleware 리다이렉팅 및 REST API 작성·연동",
    ],
  },
  {
    company: "바카티오",
    period: "2021.09 — 2022.04",
    role: "Product Developer · Co-Founder",
    description:
      "2,000개 이상의 여행 장소 데이터와 외부 예약 API를 연동해 맞춤형 모바일 탐색 서비스를 개발했습니다.",
    stack: ["React Native", "React", "Express", "MongoDB", "AWS"],
    details: [
      "React Native 앱 및 Express 서버 개발·배포",
      "2,000개 이상 장소 데이터와 사용자 조건 기반 탐색·추천",
      "FlatList·FastImage.preload 기반 목록·이미지 처리 개선 (서비스별 코드 대조 예정)",
      "React 관리자 페이지로 사용자·데이터 관리",
      "카카오 알림톡, 숙소·관광지 추천 및 숙소 크롤링",
      "숙소·렌트카 예약 API 연동, 지도 기반 일정 관리",
      "서비스 디자인 참여 및 AWS S3·EC2 운영",
    ],
  },
  {
    company: "모두닥",
    period: "2021.03 — 2021.09",
    role: "Product Developer · Intern",
    description:
      "의료 정보 플랫폼에서 홈 개인화, Hackle A/B 테스트, 병원 탐색·리뷰 개선 및 데이터 로딩 최적화에 참여했습니다.",
    stack: ["React", "React Native", "Django", "PostgreSQL"],
    details: [
      "PC 의사·병원 상세 페이지 디자인 및 리팩토링",
      "주변 병원 검색과 리뷰 업로드·조회 개선",
      "앱 메인 화면과 배너 개선",
      "Redux 최근 조회 기록·위치 정보 기반 홈 개인화",
      "Hackle 실험군 UI 분기와 PageView·Click 이벤트 계측",
      "HospitalImage·CustomerExtraImage Prefetch 조회 흐름 개선",
      "레거시 Django 코드 검토 및 API 수정",
      "데이터·시스템 구조 개선과 마이그레이션, 사용자 A/B 테스트 설계·구현",
    ],
  },
];

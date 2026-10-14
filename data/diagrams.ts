import type { FlowNode, FlowGraph, ProjectDiagram } from "@/types/portfolio";

const n = (
  id: string,
  label: string,
  detail = "",
  role: FlowNode["role"] = "process",
  emphasis = false,
): FlowNode => ({ id, label, detail, role, emphasis });
function chain(
  id: string,
  title: string,
  nodes: FlowNode[],
  options: Partial<FlowGraph> = {},
): FlowGraph {
  return {
    id,
    title,
    stages: nodes.map((node) => [node]),
    edges: nodes
      .slice(1)
      .map((node, i) => ({ from: nodes[i].id, to: node.id })),
    ...options,
  };
}

export const diagrams: Record<string, ProjectDiagram> = {
  monorepo: {
    title: "독립 앱과 공통 API의 요청 구조",
    graphs: [
      {
        id: "monorepo",
        title: "Web / Admin / Server",
        scope: "pnpm Workspace · Turborepo 빌드 관리",
        stages: [
          [
            n("web", "Next.js Web", "apps/web · 사용자", "client"),
            n("admin", "Next.js Admin", "apps/admin · 운영자", "client"),
          ],
          [
            n(
              "server",
              "NestJS Server",
              "apps/server · API 처리",
              "server",
              true,
            ),
          ],
          [n("prisma", "Prisma ORM", "데이터 접근", "process")],
          [n("postgres", "PostgreSQL", "서비스 데이터", "data")],
        ],
        edges: [
          { from: "web", to: "server", label: "NestJS API 요청" },
          { from: "admin", to: "server", label: "NestJS API 요청" },
          { from: "server", to: "prisma" },
          { from: "prisma", to: "postgres" },
        ],
      },
    ],
    caption:
      "Web과 Admin은 서버에 각각 요청 · 공유 패키지와 모바일 연결은 확인 후 추가",
  },
  nadaunAuth: {
    title: "소셜 로그인과 서비스 API 인증의 연결",
    graphs: [
      chain("nadaun-auth", "OAuth → JWT 인증", [
        n("login", "Google / Kakao 로그인", "사용자가 로그인 선택", "client"),
        n("code", "OAuth 인가 코드 발급", "Google · Kakao", "server"),
        n(
          "provider",
          "NestJS에서 사용자 정보 조회",
          "code → provider 토큰 → 사용자 정보",
          "server",
        ),
        n("member", "회원가입 / 로그인 처리", "서비스 회원 확인", "process"),
        n(
          "jwt",
          "JWT Access / Refresh Token 발급",
          "서비스 인증 · 세션 연장",
          "state",
          true,
        ),
        n(
          "web",
          "Access Token으로 API 호출",
          "Refresh Token은 세션 연장에 사용",
          "client",
        ),
      ]),
    ],
    caption: "OAuth는 외부 계정 로그인, JWT는 서비스 API 인증 · 제공 자료 기준",
  },
  nadaunRefresh: {
    title: "여러 401 응답을 하나의 토큰 갱신으로 처리",
    graphs: [
      {
        id: "nadaun-refresh",
        title: "Axios 인터셉터 · refreshPromise 공유",
        stages: [
          [
            n(
              "requests",
              "여러 API를 동시에 요청",
              "내 정보 · 클래스 · 북마크 예시",
              "client",
            ),
          ],
          [
            n(
              "expired",
              "Access Token 만료 → 401 응답",
              "Axios 응답 인터셉터",
              "state",
            ),
          ],
          [
            n(
              "first",
              "첫 요청이 토큰 갱신 실행",
              "refreshPromise 생성",
              "process",
              true,
            ),
            n(
              "others",
              "나머지 요청은 대기",
              "추가 갱신 요청 없이 같은 Promise 공유",
              "process",
            ),
          ],
          [
            n(
              "refresh",
              "공유 Promise에서 새 토큰 수신",
              "갱신 요청 중복 방지",
              "state",
              true,
            ),
          ],
          [
            n(
              "retry",
              "새 Access Token으로 원래 요청 재시도",
              "대기 중인 요청도 같은 결과 사용",
              "client",
            ),
          ],
        ],
        edges: [
          { from: "requests", to: "expired" },
          { from: "expired", to: "first" },
          { from: "expired", to: "others" },
          { from: "first", to: "refresh" },
          { from: "others", to: "refresh" },
          { from: "refresh", to: "retry" },
        ],
      },
    ],
    caption:
      "갱신 성공 경로 · 실패 시 로그아웃·재시도 제한은 실제 소스 확인 대상",
  },
  nadaunOptimistic: {
    title: "화면은 즉시 반응하고, 저장 실패는 복원",
    graphs: [
      {
        id: "nadaun-optimistic",
        title: "관리자 큐레이션 순서 변경",
        stages: [
          [n("drag", "드래그로 순서 변경", "관리자 콘텐츠 정렬", "client")],
          [n("backup", "이전 목록 상태 백업", "실패 시 되돌릴 기준", "state")],
          [
            n(
              "optimistic",
              "캐시와 화면 순서를 먼저 변경",
              "Optimistic Update · 서버 응답 전 반영",
              "state",
              true,
            ),
          ],
          [n("save", "서버에 정렬 저장 요청", "NestJS API", "server")],
          [
            n("success", "성공 → 변경 상태 유지", "저장 결과 반영", "state"),
            n(
              "rollback",
              "실패 → 이전 상태 복원",
              "Rollback · 백업한 목록 사용",
              "state",
              true,
            ),
          ],
          [
            n(
              "invalidate",
              "관련 캐시 무효화",
              "invalidateQueries · 최신 상태 재조회",
              "process",
              true,
            ),
          ],
          [
            n(
              "ui",
              "서버와 화면 상태 동기화",
              "오래된 목록 대신 최신 데이터",
              "client",
            ),
          ],
        ],
        edges: [
          { from: "drag", to: "backup" },
          { from: "backup", to: "optimistic" },
          { from: "optimistic", to: "save" },
          { from: "save", to: "success" },
          { from: "save", to: "rollback" },
          { from: "success", to: "invalidate" },
          { from: "rollback", to: "invalidate" },
          { from: "invalidate", to: "ui" },
        ],
      },
    ],
    caption:
      "TanStack Query 기반 흐름 · 무효화 시점·query key·mutation 콜백은 코드 대조 예정",
  },
  nadaunPerformance: {
    title: "업로드 처리와 렌더링의 역할 분리",
    layout: "compare",
    graphs: [
      chain("nadaun-worker", "이미지 업로드 · 별도 작업자", [
        n("image", "업로드할 이미지 선택", "브라우저", "client"),
        n(
          "worker",
          "Web Worker에서 이미지 압축",
          "메인 스레드 밖에서 처리",
          "process",
          true,
        ),
        n("compressed", "압축 결과 수신", "업로드할 파일 준비", "data"),
        n("upload", "압축 파일 업로드", "업로드 부담 완화", "server"),
      ]),
      {
        id: "nadaun-render",
        title: "Next.js App Router · 화면 역할",
        stages: [
          [
            n(
              "route",
              "페이지의 목적에 따라 분리",
              "검색 노출 · 사용자 조작",
              "process",
            ),
          ],
          [
            n(
              "server",
              "Server Component",
              "검색 노출용 콘텐츠 렌더링",
              "server",
              true,
            ),
            n(
              "client",
              "Client Component",
              "상태 · 이벤트 · 사용자 인터랙션",
              "client",
              true,
            ),
          ],
        ],
        edges: [
          { from: "route", to: "server" },
          { from: "route", to: "client" },
        ],
      },
    ],
    caption:
      "이미지 lazy loading·외부 이미지 프록시 병행 · 압축률·성능 개선율은 표시하지 않음",
  },
  nadaunOperations: {
    title: "배포 절차와 콘텐츠 운영 자동화",
    layout: "compare",
    graphs: [
      chain("nadaun-deploy", "CI/CD · 배포 운영 흐름", [
        n("trigger", "코드 반영 / 수동 실행", "배포 브랜치 · GitHub", "client"),
        n(
          "actions",
          "GitHub Actions",
          "checkout · Node.js / pnpm · 의존성 설치",
          "process",
          true,
        ),
        n(
          "build",
          "빌드·검증 및 파일 패키징",
          "타입 체크·테스트의 적용 범위 확인 예정",
          "process",
        ),
        n(
          "ec2",
          "SSH로 EC2에 배포 파일 전송",
          "서버에 최신 코드 반영",
          "server",
        ),
        n(
          "pm2",
          "PM2 reload / restart",
          "프로세스 재기동 · 실행 상태 확인",
          "process",
          true,
        ),
        n("slack", "Slack 배포 결과 알림", "성공 / 실패 확인", "measurement"),
      ]),
      chain("nadaun-notion", "콘텐츠 · 스케줄 기반 동기화", [
        n("schedule", "스케줄 실행", "반복 운영 작업", "process"),
        n("notion", "Notion API 콘텐츠 조회", "운영 콘텐츠 수집", "server"),
        n("sync", "서비스 콘텐츠 동기화", "운영 자동화", "process", true),
      ]),
    ],
    aside: {
      title: "조건부 배포 단계",
      description:
        "Prisma migrate deploy는 필요 시 연결하는 단계입니다. 첨부 자료의 ‘구상·포함 가능’ 표현을 반영하며, 워크플로 실행 여부·검증 단계·마이그레이션 자동 실행은 소스 확인 후 확정합니다.",
    },
    caption:
      "배포는 제공 자료의 운영 설계 흐름 · Notion 스케줄 및 동기화 대상은 코드 대조 예정",
  },
  frontendRequest: {
    title: "화면 역할과 요청·응답의 분리",
    graphs: [
      chain("frontend-request", "프론트엔드 데이터 흐름", [
        n("ui", "UI Component", "사용자 웹 / 관리자 웹", "client"),
        n(
          "layer",
          "Data / API Layer",
          "요청 구성 · 세부 추상화 검증 예정",
          "process",
          true,
        ),
        n("api", "NestJS API", "도메인 처리", "server"),
        n("response", "응답 데이터", "신청 · 결제 · 사용자", "data"),
        n(
          "state",
          "화면 상태 반영",
          "각 서비스 목적에 맞는 UI",
          "client",
          true,
        ),
      ]),
    ],
    caption: "Zustand의 상태 범위·캐시 전략은 실제 코드 확인 후 보강",
  },
  payment: {
    title: "신청과 결제 결과를 UI에 반영",
    graphs: [
      chain("payment", "신청·결제 상태 흐름", [
        n("apply", "신청 요청", "", "client"),
        n("created", "신청 상태 생성", "데이터 모델", "state", true),
        n("payment", "결제 진행", "", "process"),
        n("result", "결제 결과 반영", "서버 상태 갱신", "state", true),
        n("ui", "사용자 화면 상태 변경", "", "client"),
      ]),
    ],
    caption: "업무 흐름 레이블 · 승인·취소·환불 enum 및 전이는 미확인",
  },
  travelArchitecture: {
    title: "모바일·운영 웹과 외부 서비스 연결",
    graphs: [
      {
        id: "travel-architecture",
        title: "앱·관리자 웹의 공통 REST API",
        stages: [
          [
            n("app", "React Native App", "탐색 · 예약", "client"),
            n("admin", "관리자 웹", "React · 데이터 관리", "client"),
          ],
          [
            n(
              "express",
              "Express REST API",
              "Node.js · 서비스 처리",
              "server",
              true,
            ),
          ],
          [n("db", "MongoDB", "장소 · 예약 데이터", "data")],
        ],
        edges: [
          { from: "app", to: "express" },
          { from: "admin", to: "express" },
          { from: "express", to: "db" },
        ],
      },
      {
        id: "travel-integrations",
        title: "같은 Express API에서 외부 서비스로 분기",
        stages: [
          [n("express", "Express REST API", "외부 연동 요청", "server", true)],
          [
            n("booking", "숙소·렌터카 API", "외부 예약 서비스", "server"),
            n("kakao", "카카오 알림톡", "외부 메시지 연동", "server"),
          ],
        ],
        edges: [
          { from: "express", to: "booking" },
          { from: "express", to: "kakao" },
        ],
      },
    ],
    caption:
      "외부 예약·알림 요청은 Express API에서 직접 분기 · MongoDB를 거치지 않음",
  },
  mobilePerformance: {
    title: "목록 처리와 이미지 사전 로딩 비교",
    layout: "compare",
    graphs: [
      chain("mobile-before", "Before", [
        n("scroll", "ScrollView 중심 목록", "긴 목록 렌더링", "client"),
        n("images", "기존 이미지 로딩 방식", "상세 방식 검증 예정", "process"),
        n("targets", "기존 렌더 대상", "13개", "data"),
      ]),
      chain("mobile-after", "After", [
        n(
          "flatlist",
          "FlatList 기반 목록 처리",
          "필요 범위 중심",
          "client",
          true,
        ),
        n(
          "preload",
          "FastImage.preload()",
          "현재 · 다음 카드 이미지",
          "process",
          true,
        ),
        n("targets", "조정된 렌더 대상", "9개", "data"),
      ]),
    ],
    metric: {
      label: "상세 렌더 대상 수",
      before: "13개",
      after: "9개",
      note: "렌더 대상 수의 변화 · 로딩 속도 / FPS 개선율이 아님",
    },
    caption: "제공된 변경 이력 기준 · 서비스별 커밋 대조 예정",
  },
  places: {
    title: "장소 데이터에서 여행 일정까지",
    graphs: [
      chain("places", "사용자 조건 기반 장소 탐색", [
        n(
          "places",
          "2,000개 이상 장소 데이터",
          "장소 데이터 규모",
          "data",
          true,
        ),
        n(
          "discover",
          "사용자 조건 기반 탐색·추천",
          "알고리즘 상세 미확인",
          "process",
        ),
        n("display", "모바일 카드 / 지도 표시", "탐색 인터페이스", "client"),
        n("plan", "사용자 일정 관리", "선택한 장소 활용", "state", true),
      ]),
    ],
    caption: "2,000+는 장소 데이터 수 · MAU·사용자 수·추천 정확도가 아님",
  },
  aiArchitecture: {
    title: "웹 입력과 Python 추론 결과의 연결",
    graphs: [
      chain("ai-architecture", "AI 추론 아키텍처", [
        n("next", "Next.js UI", "입력 화면", "client"),
        n("request", "API 통신", "추론 요청", "process"),
        n(
          "python",
          "Python FastAPI / Flask",
          "추론 서버 · 제품별 구성 확인",
          "server",
          true,
        ),
        n("model", "AI 모델", "추론 처리", "process", true),
        n("response", "추론 결과 응답", "", "data"),
        n("result", "Next.js 결과 화면", "", "client"),
      ]),
    ],
    caption:
      "제품별 구성을 확인할 요약도 · 미확인 Node.js 중간 서버는 추가하지 않음",
  },
  aiExperience: {
    title: "입력부터 성공·오류까지의 UI 상태",
    graphs: [
      {
        id: "ai-experience",
        title: "추론 UI 상태 흐름",
        stages: [
          [n("input", "사용자 입력", "Form", "client")],
          [n("validation", "유효성 검사", "규칙은 소스 확인 예정", "process")],
          [n("request", "추론 요청", "비동기 요청", "process")],
          [n("loading", "Loading UI", "요청 대기 상태", "state", true)],
          [
            n("success", "추론 결과", "성공 상태", "data"),
            n("error", "오류 응답", "오류 상태", "state"),
          ],
          [n("result", "결과 화면", "결과 또는 오류 메시지", "client")],
        ],
        edges: [
          { from: "input", to: "validation" },
          { from: "validation", to: "request" },
          { from: "request", to: "loading" },
          { from: "loading", to: "success" },
          { from: "loading", to: "error" },
          { from: "success", to: "result" },
          { from: "error", to: "result" },
        ],
      },
    ],
    caption:
      "UI 상태 개념도 · 예외 처리 방식과 오류 유형은 제품별 코드 확인 필요",
  },
  aiSequence: {
    title: "클라이언트·추론 서버의 왕복 흐름",
    graphs: [
      chain("ai-sequence", "요청 → 처리 → 응답", [
        n("client", "클라이언트 · 입력 제출", "JavaScript / Next.js", "client"),
        n("api", "API · 추론 요청 전달", "연동 경로", "server"),
        n("python", "Python 모델 · 추론 수행", "의료 AI 모델", "process", true),
        n("response", "API · 결과 반환", "추론 응답", "server"),
        n("render", "클라이언트 · 결과 표시", "사용자 화면", "client", true),
      ]),
    ],
    caption:
      "연동 책임의 흐름 · 가상의 장애 사례나 성능 개선 결과는 포함하지 않음",
  },
};

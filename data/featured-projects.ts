import type { Project, ProjectSlide } from "@/types/portfolio";
import { diagrams } from "./diagrams";
import { modoodoc } from "./modoodoc";
import { nadaun } from "./nadaun";

function slide(
  kind: ProjectSlide["kind"],
  label: string,
  title: string,
  description: string,
  points: string[],
  diagram?: string,
  note?: string,
): ProjectSlide {
  return {
    kind,
    label,
    title,
    description,
    points,
    diagram: diagram ? diagrams[diagram] : undefined,
    note,
  };
}
// 콘텐츠 및 흐름은 사용자가 제공한 명세 기준입니다. 소스 확인 항목은 프로젝트별 TODO로 유지합니다.
export const projects: Project[] = [
  {
    id: "my-garage",
    name: "P2P 차량 공유 및 원격 제어 시뮬레이션",
    englishName: "P2P Car sharing and remote control simulation",
    category: "TOY PROJECT · PRODUCT DEVELOPMENT · SECURITY",
    description: "차량 탐색부터 계약·디지털 접근까지, 사용자 간 상태를 실시간으로 연결합니다.",
    role: "개인 프로젝트 / 제품 설계·개발",
    period: "2026.10 — 진행 중",
    stack: [
      "Next.js",
      "TypeScript",
      "TanStack Query",
      "Spring Boot",
      "Java",
      "Spring Security",
      "JPA",
      "PostgreSQL",
      "SSE",
      "Playwright",
    ],
    slides: [
      {
        ...slide("overview", "Overview", "차량 탐색부터 계약·접근 제어까지 하나의 흐름으로.",
          "개인 차량의 등록·탐색, 대여 신청과 양측 계약 동의, 소유자 승인 기반 원격 잠금 해제 시뮬레이션을 구현한 풀스택 서비스입니다.",
          ["Next.js·TanStack Query로 대여·계약 상태별 UI 구현", "세션·CSRF와 계약 기반 차량 접근 제어", "SSE 변경 알림과 REST 재조회로 사용자 화면 동기화", "차량별 DB 잠금으로 겹치는 기간의 중복 승인 방지"]),
        garageVisual: "overview",
      },
      {
        ...slide("engineering", "Authorization", "로그인 이후에도 계약과 접근 권한을 다시 검증.",
          "소유자·대여자는 화면 모드입니다. 서버는 실제 차량 소유권과 계약 관계로 제어 권한을 판단합니다.",
          ["HttpSession 인증 · 변경 요청에 CSRF 토큰 검증", "DigitalAccessGrant: 계약 완료 후 발급되는 기간 제한 차량 접근 권한", "이용 기간·회수 여부를 요청과 승인 시점에 재검증"]),
        caseStudy: { problem: "로그인한 사용자라도 다른 차량이나 만료된 계약을 제어하면 안 됩니다.", solution: "대여자 요청과 소유자 승인 각각에서 당사자·유효 권한을 확인합니다.", result: "실제 DB E2E 기록: 회수 후 403, 제3자 대여 승인 요청 404." },
        garageVisual: "authorization",
      },
      {
        ...slide("engineering", "Real-time Sync", "SSE 스트리밍 경로를 분리해 상태 변경을 화면까지 연결.",
          "서버의 변경 알림을 스트리밍으로 전달하고, 클라이언트는 REST 응답으로 화면 상태를 갱신합니다.",
          ["ReadableStream으로 reader.read() → enqueue(chunk)", "identity·no-transform·버퍼링 방지 헤더 적용", "세션 쿠키 전달 · 취소 시 upstream abort·reader 정리"]),
        caseStudy: { problem: "일반 rewrite의 SSE 압축으로 연결 시작 알림이 늦게 도착했습니다.", solution: "SSE만 전용 Route Handler로 분리해 응답을 모으지 않고 청크 단위로 전달합니다.", result: "프록시 단위 테스트에서 스트림 종료 전 첫 프레임 전달과 취소·연결 종료 처리를 검증했습니다." },
        garageVisual: "sync",
      },
      {
        ...slide("problem", "Concurrency", "같은 차량의 승인 요청을 잠금 안에서 직렬화.",
          "겹치는 기간의 두 요청을 동시에 승인해도 하나의 예약만 확정되도록 처리했습니다.",
          ["@Transactional · VehicleRepository.lockById", "PESSIMISTIC_WRITE 획득 후 엔티티 refresh", "최신 예약의 기간 겹침 검사 후 승인·커밋"]),
        caseStudy: { problem: "조회와 승인 사이에 다른 요청이 들어오면 두 요청 모두 예약 가능으로 판단할 수 있습니다.", solution: "차량 행 잠금으로 승인 처리를 직렬화하고 대기 요청이 최신 계약을 재검사합니다.", result: "두 스레드 검증: 1건 성공, 1건 RENTAL_CONFLICT, DB 예약 1건." },
        garageVisual: "concurrency",
      },
      {
        ...slide("engineering", "UX Optimization", "상태 안내는 명확하게, 모바일 화면 이동은 작게.",
          "대여·계약 상태에 맞는 다음 행동을 안내하고, 좁은 화면의 카드와 연결 상태 영역을 정리했습니다.",
          ["계약 동의·접근 권한에 따른 사용 가능 행동 표시", "모바일 차량 카드 1열 · 터치 영역·헤더 개선", "연결 상태를 고정된 다음 줄에 배치해 본문 이동 억제"]),
        caseStudy: { problem: "좁은 2열 카드와 연결 상태 문구 줄바꿈이 탐색을 방해하고 본문을 밀었습니다.", solution: "카드 공간을 확보하고 연결 상태 안내를 독립된 줄에 고정했습니다.", result: "로컬 /renter CLS 중앙값 0.25829 → 0.00237. 60개 화면 조합 가로 넘침 0." },
        experience: {
          screens: [
            { title: "Before", detail: "390px · 좁은 2열 차량 카드", image: "/projects/my-garage/renter-before.png" },
            { title: "After", detail: "390px · 1열 카드와 고정 상태 안내", image: "/projects/my-garage/renter-after.png" },
          ],
          metric: { label: "/renter · CLS 중앙값", before: "0.25829", after: "0.00237" },
        },
      },
      {
        ...slide("engineering", "Verification", "두 사용자 흐름과 실패 경계를 브라우저에서 검증.",
          "Playwright의 독립 브라우저 세션으로 공유·계약·제어 흐름을 확인하고, fixture 회귀는 별도 범위로 기록했습니다.",
          ["A·B의 계약·잠금 상태와 SSE 화면 갱신 확인", "권한 회수·제3자 접근·CSRF 누락 차단 assertion", "offline/online 복구와 새로고침 상태 복원 검증"]),
        caseStudy: { problem: "단일 화면 테스트만으로는 사용자 간 상태 일치와 접근 차단을 확인하기 어렵습니다.", solution: "실제 Spring·DB E2E와 DB 없는 fixture 회귀를 분리했습니다.", result: "대표 실제 DB 연동 시나리오 1건 통과. 아래 회귀 수치는 각 실행 기록이며 합산하지 않습니다." },
        verification: {
          steps: ["A 등록·공개 / B 신청", "A 승인 / 양측 계약 동의", "접근 권한 활성 / B 해제 요청", "A 승인 / B 잠금 상태 갱신", "offline 복구 / 새로고침", "권한 회수 / 403·404 차단"],
          results: [
            { area: "대표 실제 DB 연동 시나리오 1건", result: "1/1 통과", scope: "10.09 · Spring·PostgreSQL·Chrome" },
            { area: "Backend 회귀", result: "57 통과", scope: "10.09 · Gradle 전체 회귀" },
            { area: "프론트 단위", result: "11 통과", scope: "10.10 · DB 없음" },
            { area: "브라우저 회귀", result: "23 통과 / 6 제외", scope: "10.10 · API·지도 fixture" },
          ],
        },
      },
    ],
    todos: [],
  },
  nadaun,
  modoodoc,
  {
    id: "vacatio",
    name: "바카티오 / 휙",
    englishName: "VACATIO / HWIK",
    category: "TRAVEL · REACT NATIVE",
    description: "2,000+ 장소 데이터에서 출발하는 맞춤형 모바일 여행 탐색.",
    role: "공동 창업 / 모바일·API·운영 웹 개발",
    period: "2021.09 — 2022.04",
    stack: ["React Native", "React", "Express", "MongoDB", "FastImage", "AWS"],
    slides: [
      {
        ...slide(
          "overview",
          "Summary",
          "모바일 탐색·예약과 운영 시스템을 개발했습니다.",
          "여행 앱과 API·관리자 웹을 개발하고, 장소 탐색에서 일정 관리와 외부 예약까지 사용자 흐름을 연결했습니다.",
          [
            "아키텍처: React Native·관리자 웹 → Express → MongoDB",
            "모바일 최적화: FlatList·FastImage.preload로 목록·이미지 처리 개선",
            "장소 탐색: 2,000+ 데이터의 조건 기반 탐색·카드·지도 표시",
            "일정·예약: 지도 일정 관리와 숙소·렌터카 API 연동",
            "운영: 관리자 데이터 관리·카카오 알림톡·AWS 배포",
          ],
          "travelArchitecture",
        ),
        visualIntro:
          "모바일 여행 탐색 서비스. 앱과 관리자 웹이 Express API를 공유하고, 서버에서 MongoDB 및 외부 예약·알림톡 서비스로 연결했습니다.",
      },
      slide(
        "architecture",
        "Architecture",
        "모바일 탐색과 예약, 운영 기능을 하나로 연결하다.",
        "React Native 앱과 Express REST API, MongoDB를 연결하고 관리자 웹과 외부 예약 서비스를 연동했습니다. AWS 환경에 배포하고 카카오 알림톡을 연결했습니다.",
        [
          "모바일 앱·관리자 웹은 각각 Express API 호출",
          "MongoDB 데이터 관리",
          "Express에서 숙소·렌터카 API와 알림톡 연동",
          "관리자 React 구성은 기존 이력 기준",
        ],
        "travelArchitecture",
      ),
      slide(
        "engineering",
        "Engineering",
        "모바일 이미지 로딩과 리스트 렌더링을 최적화하다.",
        "이미지가 많은 여행 콘텐츠를 효율적으로 표시하기 위해 이미지 사전 로딩과 목록의 렌더링 범위를 개선했습니다.",
        [
          "ScrollView → FlatList 목록 처리",
          "FastImage.preload()로 현재·다음 카드 이미지 준비",
          "화면에 필요한 범위 중심의 렌더링",
          "상세 렌더 대상 13개 → 9개 변경",
        ],
        "mobilePerformance",
        "13→9는 렌더 대상 수 변화입니다. 로딩 속도나 FPS 개선율로 환산하지 않습니다.",
      ),
      slide(
        "problem",
        "Problem Solving",
        "검색과 탐색에서도 일관된 모바일 경험을 제공하다.",
        "사용자 조건에 맞는 장소 데이터를 카드와 지도에 표시하고 선택한 장소를 일정 관리로 연결했습니다. 탐색·이미지 로딩·비동기 표시 흐름을 개선했습니다.",
        [
          "사용자 조건 기반 탐색·추천",
          "모바일 카드 / 지도 표시",
          "일정 관리로 탐색 결과 연결",
          "검색·페이지네이션·행동 이벤트 세부 구현 확인 예정",
        ],
        "places",
        "추천 알고리즘, debounce·요청 취소·응답 순서 보장 방식은 임의로 추가하지 않습니다.",
      ),
      {
        ...slide(
          "media",
          "Gallery",
          "2,000개 이상의 장소 데이터로 개인화된 여행 경험을 제공하다.",
          "관광지와 숙소를 탐색하고 여행 조건에 맞는 장소를 발견하는 React Native 서비스를 개발했습니다. 장소 데이터를 활용한 탐색·추천에 지도 기반 일정 관리와 외부 예약 기능을 연결했습니다.",
          [
            "2,000개 이상 장소 데이터 활용",
            "사용자 조건·취향 기반 장소 탐색",
            "지도 기반 일정 관리",
            "숙소·렌터카 예약 API 연동",
          ],
        ),
        image: "/projects/vacatio.png",
        imageAlt: "기존 포트폴리오에 공개된 바카티오 모바일 앱 화면",
        note: "관련 서비스 경험을 함께 소개합니다. 서비스별 구현과 커밋 귀속은 대조 예정입니다.",
      },
    ],
    todos: [
      "바카티오·휙 명칭·기간·서비스별 구현 귀속 대조",
      "FastImage·FlatList 및 13→9 커밋 검증",
      "추천 알고리즘 상세·관리자 프레임워크 소스 대조",
      "Firebase PageView_PostDetail / SwipeLike / ApplyPlanStart·End 적용 확인",
    ],
  },
  // 더로벨은 요청에 따라 임시 제외합니다. 복원할 수 있도록 콘텐츠를 주석으로 보관합니다.
  /*
  {
    id: "therovel",
    name: "더로벨",
    englishName: "THEROVEL",
    category: "HEALTHCARE · AI WEB",
    description: "의료 AI 추론 모델을 실제 웹 사용자 경험으로 연결합니다.",
    role: "웹 UI / AI API 연동 / 다국어·대시보드 개발",
    period: "2023.01 — 2024.11",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "Flask",
      "Python",
      "Docker",
    ],
    slides: [
      slide(
        "overview",
        "Overview",
        "의료 AI 모델을 사용자가 활용할 수 있는 웹 서비스로.",
        "생성형 AI 치과 진료 보조, 환자 대시보드와 안과 시술값 예측 등 의료 도메인의 여러 제품을 개발했습니다. 추론 모델을 실제 사용자 인터페이스에 연결했습니다.",
        [
          "생성형 AI 치과 진료 보조",
          "치과 환자 데이터 대시보드",
          "녹내장·라섹 시술값 예측 서비스",
          "ISO 문서 자동화 AI·다국어 웹 UI",
        ],
        undefined,
        "실제 제품 화면은 확인 후 추가합니다.",
      ),
      slide(
        "architecture",
        "Architecture",
        "웹 애플리케이션과 Python 추론 서비스를 연결하다.",
        "JavaScript 웹 UI와 Python 추론 환경 사이에 API 통신을 구성했습니다. 입력 데이터를 전달하고 추론 결과를 사용자 화면에 표시했습니다.",
        [
          "Next.js 입력 UI와 API 통신",
          "FastAPI / Flask 기반 Python 추론 환경",
          "AI 모델 처리 결과를 UI로 전달",
          "제품별 실제 연동 경로는 코드 대조 예정",
        ],
        "aiArchitecture",
        "모든 AI 제품이 같은 구조였다고 단정하지 않습니다. Node.js 중간 서버는 확인 후 추가합니다.",
      ),
      slide(
        "engineering",
        "Engineering",
        "AI 추론 결과를 이해하기 쉬운 인터페이스로.",
        "사용자 입력과 비동기 요청, 로딩과 결과 표시를 하나의 경험으로 연결했습니다. 의료 데이터 화면과 i18n 다국어 인터페이스를 구현했습니다.",
        [
          "입력 → 요청 → 로딩 → 결과 / 오류의 UI 상태",
          "비동기 추론 결과와 의료 데이터 표시",
          "i18n 다국어 지원",
          "Middleware를 활용한 리다이렉팅",
        ],
        "aiExperience",
        "유효성 검사·예외 처리 방식은 제품별 소스 확인이 필요합니다.",
      ),
      slide(
        "problem",
        "Problem Solving",
        "서로 다른 기술 환경을 하나의 사용자 흐름으로.",
        "웹과 Python 기반 AI 추론 환경을 연동하고 사용자가 입력부터 결과 확인까지 진행할 수 있도록 인터페이스와 API 흐름을 구성했습니다.",
        [
          "Client의 입력·결과 표시 책임",
          "API의 요청·응답 연결",
          "Python 모델의 추론 처리 책임",
        ],
        "aiSequence",
        "구체적인 장애 원인이나 개선 성과가 확인되지 않아 가상의 트러블슈팅을 작성하지 않았습니다.",
      ),
    ],
    todos: [
      "실제 의료 AI 제품 화면",
      "제품별 API·Node.js 중간 계층·추론 서버 구성",
      "실제 유효성·오류 처리 구현",
      "구체적인 장애·문제 해결 사례와 측정 결과",
    ],
  },
  */
];

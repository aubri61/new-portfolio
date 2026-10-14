import type { Project } from "@/types/portfolio";

// 사용자 제공 경험 기준. 공개용 도식은 내부 구조를 재현하지 않습니다.
export const modoodoc: Project = {
  id: "modoodoc", name: "모두닥", englishName: "MODOODOC",
  category: "HEALTHCARE · WEB & MOBILE", featured: true,
  description: "병원 탐색·리뷰 기능부터 데이터 모델·이미지 조회·관리자 기능까지 개발했습니다.",
  role: "웹·앱 / Django 백엔드·관리자 기능 개발",
  period: "2021.03 — 2021.09",
  stack: ["Django", "Python", "Django ORM", "JavaScript", "AJAX", "React Native", "Redux", "Hackle"],
  slides: [
    {
      kind: "overview", label: "Overview",
      title: "사용자 화면부터 필요한 API 설계·구현까지, End-to-End 개발",
      description: "병원 정보·리뷰 플랫폼에서 Django 웹·백엔드와 React Native 앱을 개발했습니다. 병원·의사 상세, 주변 검색, 리뷰와 사진 갤러리를 구현하고 앱 홈·배너, 데이터 이전과 관리자 기능을 맡았습니다.",
      points: ["병원 상세·검색·리뷰 등 웹·앱 핵심 기능 개발", "병원 상세 페이지 이미지 로딩 지연 개선", "관리자 페이지 편의 기능 추가로 내부 워크플로우 개선", "Hackle A/B 테스트와 Redux 활용 홈 개인화"],
      modoodocVisual: "overview",
    },
    {
      kind: "engineering", label: "DB Migration",
      title: "데이터 모델 관계 재설계 및 Django ORM 마이그레이션",
      description: "서비스 확장을 고려해 Django 모델의 관계를 분석하고 공통 정보를 분리하는 구조를 제안했습니다. 새 구조에 맞춰 데이터 이전 로직을 작성했습니다.",
      caseStudy: {
        problem: "모델 변경 과정에서 기존 데이터의 연결 관계와 정보가 유지되도록 이전해야 했습니다.",
        solution: "Django ORM으로 이전 대상을 선별하고 중복 여부와 참조 관계를 확인하며 새 구조로 데이터를 이전했습니다.",
        result: "백업 데이터로 사전 검증한 뒤 운영에 반영하고 관련 기능의 정상 동작을 확인했습니다.",
      },
      points: ["데이터의 의미·생성 시점을 고려한 이전 처리", "운영 반영 후 주요 API와 연관 기능 확인"],
      modoodocVisual: "migration",
    },
    {
      kind: "problem", label: "Performance",
      title: "Django ORM 조회 최적화와 On-Demand Loading",
      description: "병원 상세 이미지 기능을 개발하며 로딩 지연을 분석했습니다. 서버의 조회 범위를 줄이고 추가 사진은 모달에서 필요한 시점에 불러오도록 구성했습니다.",
      caseStudy: {
        problem: "초기 진입 시 이미지 데이터 조회와 로딩으로 화면 표시가 지연됐습니다.",
        solution: "대표 이미지에 UNION·필드·건수 제한을 적용하고, 추가 이미지는 모달 기반 On-Demand Loading으로 분리했습니다.",
        result: "초기 이미지 로딩 지연을 줄이고 전체 사진은 사용자 선택 시점에 제공했습니다.",
      },
      points: ["별도 검색 목록: Prefetch로 연관 이미지 반복 조회 개선", "사진 모달·전체 갤러리의 추가 이미지 요청 구현"],
      modoodocVisual: "performance",
    },
    {
      kind: "engineering", label: "Admin",
      title: "동적 필터링 구현 및 관리자 검수 워크플로우 개선",
      description: "Django Admin의 조회 조건과 목록 표시를 커스터마이징했습니다. 관련 정보 확인과 상세 관리 화면 이동을 지원하는 편의 기능도 추가했습니다.",
      caseStudy: {
        problem: "검수 대상이 늘어날 때 필요한 데이터를 조건별로 조회하고 관리해야 했습니다.",
        solution: "SimpleListFilter와 ORM 표현식으로 선택 조건을 QuerySet에 반영하는 동적 필터를 구현했습니다.",
        result: "조건에 맞는 검수 목록 조회와 관리자 화면 탐색을 지원했습니다.",
      },
      points: ["목록에서 관련 정보 표시·상세 관리 화면 링크 제공", "필터 처리는 서버 측 Django 조회 로직으로 구성"],
      modoodocVisual: "admin",
    },
    {
      kind: "personalization", label: "Personalization",
      title: "Hackle A/B 테스트 및 Redux 기반 홈 개인화",
      description: "UI 변경에 대한 반응을 관찰하는 실험과 이용 기록을 홈에 반영하는 개인화 작업을 각각 수행했습니다.",
      sections: [
        { title: "Hackle · 실험과 행동 계측", caseStudy: {
          problem: "서로 다른 UI에 대한 사용자 반응을 관찰해야 했습니다.",
          solution: "실험 조건별 UI 분기와 화면 노출·클릭 이벤트를 연결했습니다.",
          result: "화면 변경 효과를 행동 이벤트로 관찰할 수 있게 했습니다.",
        } },
        { title: "Redux · 홈 개인화", caseStudy: {
          problem: "여러 앱 컴포넌트에서 최근 조회·위치 정보를 함께 사용해야 했습니다.",
          solution: "Redux Store로 공유 상태를 관리하고 홈 콘텐츠 구성에 반영했습니다.",
          result: "사용자 상태에 따라 홈 화면에 표시할 콘텐츠를 분기했습니다.",
        } },
      ],
      points: [], modoodocVisual: "personalization",
    },
  ],
  todos: [],
};

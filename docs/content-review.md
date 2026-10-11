# 콘텐츠 검토 항목

확인일: 2026-10-10 (Asia/Seoul)

## 출처

- 기존 경력·기간·역할·이미지: https://self-portfolio-drab.vercel.app/
- 신규 기술 상세: 사용자가 제공한 Featured Projects 고도화 문서 및 프로젝트 아키텍처·기술 흐름 명세. 나다운은 추가 제공된 인증·상태 관리·성능·운영 자동화 설명 자료로 개정.
- GitHub: https://github.com/aubri61
- 나다운: pnpm·Turborepo 앱/공유 구조, OAuth/JWT 토큰 보관·실패 처리, refreshPromise 공유와 재시도 제한, Query key·Optimistic Update·Rollback·무효화 시점, Web Worker 압축 및 이미지 프록시. GitHub Actions 자료의 구상·포함 가능 표현을 유지하고 실제 실행, 타입 체크·테스트·Prisma 마이그레이션 적용 범위는 워크플로 확인 필요. Notion 동기화 대상·스케줄·실패 처리도 코드 대조 대상.
- 바카티오/휙: 회사·서비스 관계와 서비스별 구현 귀속, 관리자 React/Next.js 대조. FastImage·FlatList 및 13→9 변경 커밋. 추천 알고리즘·검색·페이지네이션·Firebase 행동 이벤트 구현.
- 더로벨: 제품별 추론 구성과 API 연동 경로. Node.js 중간 계층 여부, 입력 검사·오류 처리의 실제 구현. 가상의 장애 사례를 작성하지 않음.
- My Garage: 실제 저장소, 지도/차량 탐색 이미지, 링크. 실제 계약 enum·당사자·기간·권한 회수 조건. 세션·CSRF·@Transactional·JPA Dirty Checking·PESSIMISTIC_WRITE 검증. SSE 전용 프록시 변경과 지연 원인, Playwright 범위. 수신 p50/p95 및 UI 상태 반영 시간은 측정 예정.

업무 흐름을 나타낸 한국어 레이블을 사용하며 확인되지 않은 enum 값, 상세 조건, 코드 스니펫을 생성하지 않습니다. 명세 기반 다이어그램을 실제 소스 검증 결과로 표시하지 않습니다.

## 그 밖의 항목

- 이메일: 확인되지 않아 `data/profile.ts`의 email은 null.
- 모두닥·더로벨·My Garage: 실제 서비스 이미지 미제공. 다른 프로젝트 이미지나 가짜 결과로 대체하지 않음.
- Cluby: 기존 상세 설명이 DreamIn과 중복되어 확인 필요.
- Spring Boot·Java·TanStack Query 등 My Garage 기술은 새 사용자 명세에 명시되어 프로젝트에 사용. 기존 Skills 섹션은 요청대로 변경하지 않음.
- 포모도로 타이머: 앞선 사용자 요청에 따라 제거 상태 유지.
- 배포 도메인 확정 후 canonical URL·metadataBase·sitemap·공유 이미지 보강.

프로젝트별 TODO: `data/featured-projects.ts`. 전체 구현 목록: `diagram-implementation.md`. 기존 텍스트 기록: `legacy-content.md`.

My Garage AI 활용 출처: 기존 Codex 개발 대화와 `my-garage/docs/IMPLEMENTATION_PLAN.md`의 Lovable·Stitch UI 이식 및 테스트 기록. AI 역할은 디자인 참고, 기존 컴포넌트/API 통합, 테스트·화면 검증과 수정으로 설명합니다. 이번 포트폴리오 수정에서 My Garage 테스트를 새로 실행하지 않았습니다.

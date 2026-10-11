# Featured Projects 다이어그램 구현

확인일: 2026-10-10 (Asia/Seoul)

현재 화면 순서: Work Experience → Featured Projects → Other Projects. Featured Projects는 My Garage → 모두닥 → 바카티오 / 휙 → 나다운 순서입니다. 더로벨 콘텐츠는 `data/featured-projects.ts`에서 주석으로 보관하며 화면에서는 제외합니다. 나다운을 추가 자료에 맞춰 7개 슬라이드로 개정했으며, 현재 활성 다이어그램은 16개입니다.

## 구현 목록

| 프로젝트 | 슬라이드 / 다이어그램 |
| --- | --- |
| 모두닥 | Personalization: 최근 조회·위치의 분기와 홈 콘텐츠 병합, 별도 Hackle 측정 레이어 |
| 모두닥 | A/B Testing: Experiment → Variation A/B → 각 UI → 행동 → Event Tracking |
| 모두닥 | Engineering: Django → HospitalListOptimizer → Prefetch → HospitalImage / CustomerExtraImage → 표시 데이터 |
| 모두닥 | Problem Solving: 상세 로딩 지연 관찰과 연관 조회 개선 접근의 개념 비교 |
| 나다운 | Architecture: pnpm Workspace의 독립 Web·Admin → NestJS → Prisma → PostgreSQL |
| 나다운 | Authentication: Google/Kakao OAuth → 회원 처리 → JWT 발급 → API 인증 |
| 나다운 | Session Stability: 동시 401 → 첫 요청/대기 요청 → 공유 refreshPromise → 재시도 |
| 나다운 | Admin UX: 백업 → 캐시 선반영 → 저장 성공/실패·Rollback → 무효화·UI 동기화 |
| 나다운 | Performance: Web Worker 이미지 압축과 Server/Client Component 역할 분리 |
| 나다운 | Operations: Actions→EC2→PM2→Slack 배포 설계와 Notion 스케줄 동기화 |
| 바카티오 / 휙 | Architecture: App·관리자 → Express → MongoDB, Express에서 예약·알림톡 분기 |
| 바카티오 / 휙 | Engineering: ScrollView·기존 로딩 ↔ FlatList·FastImage.preload, 13→9 렌더 대상 수 라벨 |
| 바카티오 / 휙 | Problem Solving: 2,000+ 장소 → 사용자 조건 탐색·추천 → 카드/지도 → 일정 |
| 더로벨 | Architecture: Next.js → API → Python FastAPI/Flask → AI → 응답 → UI |
| 더로벨 | Engineering: 입력·검증·요청·Loading → 결과/오류 → 화면 |
| 더로벨 | Problem Solving: Client → API → Python 추론 → API 응답 → Client 표시 |
| My Garage | Architecture: REST 요청 경로와 SSE 이벤트·Query 무효화 경로 분리 |
| My Garage | Engineering: 신청·승인·양측 동의·계약 확정·권한 생성·검증·접근 허용/거절 |
| My Garage | Problem Solving: 일반 프록시·버퍼링 ↔ 전용 스트리밍·청크·EventSource·Query·UI |

전체 도식 데이터에는 미사용·주석 보관 프로젝트의 도식도 남아 있습니다. 현재 화면은 4개 프로젝트, 20개 슬라이드 중 16개 기술 다이어그램으로 구성됩니다. Overview에는 실제 이미지가 있는 나다운·바카티오 화면을 유지했고 미제공 화면은 이미지 준비 중으로 표시합니다.

## 구조

- `types/portfolio.ts`: 노드, 역할, 강조, 연결, 그래프, 비교/REST·SSE 경로 타입.
- `data/diagrams.ts`: 시스템 역할과 연결의 단일 데이터 소스.
- `data/featured-projects.ts`: 프로젝트별 콘텐츠와 다이어그램 선택. 프로젝트별 독립 슬라이드 개수.
- `components/projects/ArchitectureDiagram.tsx`: HTML 노드와 SVG 방향 연결. 고정 이미지·장식 아이콘을 사용하지 않음.
- `components/projects/ProjectCarousel.tsx`: 기존 독립 상태·방향키·스와이프·모션 감소 유지. 5개 탭은 줄바꿈 가능.
- `app/globals.css`: 공통 도형·폰트, 의미 있는 블루 강조, 비교와 경로의 모바일 세로 배치.
- `scripts/validate-diagrams.mjs`: 노드 유일성, 연결 끝점, 방향, 분기·병합과 고립 노드, 슬라이드 도식 누락 검사.

텍스트는 HTML로 줄바꿈하므로 SVG를 통째로 축소해 모바일 글씨가 작아지는 문제를 피합니다. 연결은 인접 단계의 실제 노드 위치를 기준으로 그립니다. REST는 실선, SSE는 블루 점선이며 이벤트 데이터 재조회 단계는 명시적으로 표시합니다. 화면 읽기 도구에도 노드 간 연결을 제공합니다.

## 증거와 검증 범위

새 기술 상세는 사용자가 제공한 콘텐츠 고도화 문서와 추가 흐름 명세를 기반으로 구현했습니다. 기존 포트폴리오에서 확인한 경력 기간 및 실제 이미지를 유지합니다. 현재 세부 구현 저장소가 제공되지 않아 커밋·enum·권한 조건·실제 Prefetch/프록시 코드를 대조 완료했다고 표시하지 않습니다. 상세 TODO는 각 프로젝트 데이터와 `content-review.md`에 남깁니다.

자동 검증: `node scripts/validate-diagrams.mjs`, `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`.

## 검증 결과

- 구조 검사 통과: 16개 다이어그램, 21개 그래프, 99개 방향 연결, 5개 프로젝트의 기술 슬라이드 도식 누락 없음.
- TypeScript, ESLint 및 Next.js 프로덕션 빌드 통과.
- 브라우저: 1280px 데스크톱과 320px 모바일에서 16개 기술 슬라이드를 모두 전환하며 도식 표시 및 가로 넘침을 검사. 768px에서도 My Garage REST/SSE 배치 확인.
- 320px에서 페이지·슬라이드·노드의 가로 넘침 없음. Before/After 및 REST/SSE는 좁은 화면에서 세로로 배치.
- 마지막 시각 검토에서 SVG 확대에 따른 화살촉 왜곡을 수정. 독립적인 삼각형 화살촉으로 아래 방향을 명확히 표시.
- 검증은 포트폴리오 UI와 제공 명세에 대한 검증이며, 각 서비스 구현 저장소에 대한 코드 검증은 별도 TODO.

## 나다운 추가 자료 반영 검증

나다운은 Overview·Architecture·Authentication·Session Stability·Admin UX·Performance·Operations의 7개 슬라이드입니다. 서비스 이미지·기간·신청/결제 기능 및 독립 앱 아키텍처는 유지하고, 일반적인 API/결제 설명을 구체적인 인증·캐시·운영 사례로 교체했습니다. 소셜리액트 경력 설명과 주요 업무도 같은 기준으로 수정했습니다.

- 전체 보관 데이터 구조 검사: 21개 다이어그램, 28개 그래프, 130개 연결 통과. 활성 프로젝트 4개 순서 유지.
- TypeScript 포함 프로덕션 빌드 및 ESLint 통과.
- 브라우저에서 나다운 기술 슬라이드 6개를 1280px와 320px에서 모두 전환·검사. 페이지·슬라이드·노드 가로 넘침 없음.
- 토큰 갱신 분기·병합 도식 시각 확인, 소셜리액트 경력 문구 반영 확인.
- CI/CD 자료에 섞인 ‘구상·포함 가능’ 단계는 설계 및 확인 항목으로 구분. 실제 저장소 실행 결과·성능 개선 수치를 새로 만들어 표시하지 않음.


## 첫 장과 미디어 순서 개편

모든 프로젝트는 Summary에서 왼쪽에 주요 구현·후속 기술 주제 요약, 오른쪽에 짧은 서비스·구조 설명과 대표 다이어그램을 표시합니다. 기존 이미지는 마지막 Gallery에 보존하며 미제공 이미지도 마지막에서 준비 상태를 표시합니다. 나다운 CI/CD & Operations는 두 번째로 이동했습니다.

My Garage AI Workflow는 기존 「My Garage 디자인 통합」·「구현 변경 요청」 대화와 `/Users/jueon/Desktop/my-garage/docs/IMPLEMENTATION_PLAN.md`의 디자인 이식 및 검증 기록을 근거로 작성했습니다. Lovable·Stitch 디자인 기준→Codex 코드/API 통합→테스트·화면 확인→수정·재검증 흐름을 사용합니다. 당시 My Garage 검증 기록을 이번 실행 결과로 표시하지 않습니다.

이번 개편 검증: TypeScript 포함 프로덕션 빌드·ESLint·전체 도식 구조 검사 통과. 네 프로젝트 모두 Summary의 설명·도식과 마지막 Gallery 위치, 나다운 두 번째 CI/CD 탭 및 기존 이미지 보존을 브라우저에서 확인했습니다. 최종 브라우저 viewport 확인은 1280×720입니다. 이번 실행에서 viewport override가 실제 320px로 적용되지 않아 모바일 폭 재검증 완료로 기록하지 않습니다. 기존 모바일 배치 CSS는 유지합니다.

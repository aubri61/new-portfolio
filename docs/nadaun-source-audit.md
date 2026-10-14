# 나다운 7장 개편 — 소스 대조 및 검증 보고

2026-10-14. 저장소 `/Users/jueon/Desktop/socialiact/nadaun`, HEAD `427e1c29d`. 원본 서비스는 읽기만 했습니다. 포트폴리오 개편이며 서비스의 배포·운영 작업은 수행하지 않았습니다.

## 확인한 구현과 공개 문안

| 영역 | 읽은 파일 (저장소 상대 경로) | 확인 결과 |
| --- | --- | --- |
| 모노레포 | `pnpm-workspace.yaml`, `turbo.json`, 루트·각 앱 `package.json` | apps/*·packages/*, Next.js Web/Admin, NestJS, 공유 패키지. Prisma datasource PostgreSQL |
| 신청 | `apps/server/src/modules/classes/classes.service.ts`, Web `ClassApplicationForm.tsx`, Admin `applications/page.tsx` | 신청 시 입금 대기. 관리자 입금 확인→신청 활성화·참여 인원 변경. 최종 승인 시 입금 여부 검사. 계좌이체 방식이며 PG 없음 |
| 트랜잭션 | 위 `classes.service.ts`의 `confirmPayment`, `confirmApplications` | 실제 Prisma `$transaction` 존재. 입금 확인의 상태·인원 갱신 범위만 공개 문안에 명시. 전체 신청의 원자성·정원 경쟁 차단·DB 잠금은 주장하지 않음 |
| CI | `.github/workflows/check-build.yml`, `check-admin-build.yml` | 대상 PR·production/main push에 타입 검사·ESLint·앱 빌드. 테스트 자동 실행은 확인되지 않음 |
| 서버 배포 | `.github/workflows/deploy-server.yml` | workflow_dispatch로 수동 시작. 공유 패키지 build, prisma generate, nest build, 전송, PM2 startOrReload, Slack 결과 알림. migrate deploy는 입력 옵션이 true일 때만 실행 |
| 콘텐츠 | `apps/server/src/modules/blog/blog.scheduler.ts`, `blog.service.ts`, `app.module.ts` | NestJS Cron→Notion 조회→신규 생성·기존 수정. Notion에서 삭제된 글은 자동 삭제하지 않음. 별도 웹 lib/notion.ts도 있으나 스케줄 동기화 주체는 NestJS |
| OAuth | `apps/server/src/modules/auth/auth.controller.ts`, `auth.service.ts`, Web `SocialLoginButton.tsx` | Google/Kakao 인가 코드 발급은 provider, 코드 교환·사용자 조회는 NestJS. 회원 처리 후 서비스 JWT 발급. OAuth와 서비스 JWT를 구분 |
| 토큰 저장 | `auth/utils/cookie.utils.ts`, Web `api-client.ts`, `store/auth-store.ts` | 운영 웹 Refresh Token은 HttpOnly·Secure·SameSite=None 쿠키. Access Token은 Zustand 및 localStorage 호환 경로. 모든 토큰을 HttpOnly로 보관한다고 설명하지 않음. 개발 환경 처리와 모바일 처리는 별도 |
| 갱신 공유 | `apps/web/src/lib/api-client.ts` | 401·403 응답, 공유 refreshPromise, finally 초기화, 새 토큰으로 원 요청 재시도, 오류 처리 clearAuth 코드 확인 |
| 관리자 정렬 | `apps/admin/src/app/curations/page.tsx` | DnD Kit, onMutate cancelQueries→getQueryData 백업→setQueryData. onError Rollback. onSuccess 서버 응답 반영·invalidateQueries. 해당 mutation의 onSettled는 없음 |
| 이미지 압축 | `apps/admin/src/lib/image-compression.ts`, `app/classes/new/page.tsx` | 관리자 업로드에서 browser-image-compression의 useWebWorker:true 사용. JPEG 압축·허용 범위 내 원본 fallback. Worker만으로 공개 웹 점수 달성을 주장하지 않음 |
| 이미지 표시 | Web `app/blog/[id]/page.tsx`, Server `blog.controller.ts`, `blog.service.ts` | 블로그 이미지 lazy loading 및 NestJS 이미지 프록시 확인. 압축과 표시 경로를 구분 |
| 렌더링·SEO | Web `app/layout.tsx`, `app/classes/[id]/page.tsx`, `ClassDetailClient.tsx`, `app/events/[id]/page.tsx`, `app/sitemap.ts`, `app/robots.ts` | 상세 서버 데이터 조회·동적 Metadata·OG·Canonical·JSON-LD, Client UI 분리, 동적 sitemap·robots 확인. 전체 홈/목록이 Server Component라고 주장하지 않음 |
| RN·Expo | `apps/mobile/package.json`, `app/(tabs)/*`, `app/class/[id].tsx`, `app/(tabs)/user/applications.tsx` | 탐색·상세·신청 이력 등 앱 개발 파일 존재. 출시·스토어 등록 완료 근거는 미확인. Overview에 개발 범위만 별도 표시 |
| 실제 화면 | 기존 `public/projects/nadaun.png` | 모바일 웹 클래스 상세 캡처 1장. 별도 Service Screens 갤러리로 분리, 원본 확대 링크 제공. 가상 화면이나 관리자 캡처를 생성하지 않음 |

## Git 기여 근거

Git author 집계: aubri61 264개, aubri 47개. 사용자 제공 개발 경험 및 해당 작성자 커밋과 소스를 교차 대조했습니다. 작성자명만으로 동일인이나 단독 구현을 새로 증명했다는 의미는 아닙니다. 단독 개발 설명은 사용자 제공 경력 서술을 기준으로 합니다.

대표 파일의 마지막 변경:

- `classes.service.ts`, 클래스 상세 서버 page: `610503267`, aubri61.
- `blog.scheduler.ts`: `b31886fa8`, aubri61.
- `curations/page.tsx`: `8f0c0a2aa`, aubri61.
- `deploy-server.yml`: `fe78b79f7`, aubri61.
- Web `api-client.ts`: `2b73b4ab6`, aubri61.

## 최종 7장 제목

1. 사용자 웹·관리자 웹·API까지, 서비스 End-to-End 개발
2. GitHub Actions 기반 배포 및 Notion 콘텐츠 동기화 자동화
3. 클래스 신청부터 입금 확인·승인까지, 핵심 비즈니스 로직 구현
4. OAuth 2.0 소셜 로그인과 JWT 기반 서비스 인증 구현
5. Axios 인터셉터·Promise 공유 기반 중복 토큰 갱신 방지
6. Optimistic Update·Rollback 기반 관리자 상태 동기화
7. Web Worker 이미지 최적화 및 Next.js SEO·렌더링 전략

## Lighthouse 기록

사용자 제공 과거 측정값을 변경 없이 표시합니다. 2026-10-10 KST, https://nadaun.life/, Desktop, Lighthouse 13.4.0. Performance 95, Accessibility 98, Best Practices 73, SEO 92, LCP 1.6초, CLS 0.

원형 그래프는 실제 점수 비례 호 길이로 그립니다. 현재 사이트를 재측정하지 않았으며, 압축/SEO 변경의 전후 성과·개선율·검색 순위로 해석하지 않습니다. 원본 Lighthouse JSON/HTML 파일은 이번 첨부·조사 경로에서 확보하지 못해 ‘사용자 제공 과거 기록’으로 출처를 표시했습니다.

## 추가 확인 항목

- 갱신 실패의 실제 동작과 재시도 경계: 공유 Promise 코드는 확인했지만 `_retry` 등 상한·refresh 요청 제외 guard는 해당 apiClient에서 확인되지 않았습니다. 갱신 요청도 같은 apiClient를 사용하므로 refresh 401/403 재진입 시 공유 Promise를 자기 자신이 기다릴 가능성이 있습니다. 성공 경로와 오류 처리 코드 존재를 넘어 완전한 실패 복구·무한 재시도 방지를 주장하지 않습니다. 원본 수정은 요청 범위 밖이므로 수행하지 않았습니다.
- 워크플로 파일의 구성과 실제 과거 성공 실행 로그는 구분합니다. GitHub Actions 실행 기록·운영 환경 검증은 이번에 수행하지 않았습니다.
- RN/Expo 앱 출시 상태와 추가 관리자·탐색·신청 스크린샷은 별도 자료가 필요합니다. 현재는 개발 범위와 확보한 이미지 1장만 표시합니다.
- Lighthouse 원본 파일 추가 확보 시 사용자 제공 수치와 비교할 수 있습니다. 제공된 값을 임의 재측정 결과로 대체하지 않습니다.

## UI 변경 및 검증

Architecture는 Overview로 통합, Gallery는 하단 독립 갤러리로 분리했습니다. 기술 슬라이드는 7개이며 02 CI/CD & Operations를 유지합니다. 모든 지정 제목을 그대로 사용했고 Overview는 업무 불렛, 나머지는 Problem/Solution/Result를 사용합니다. 시퀀스·합류·순서 비교·원형 지표는 주제에 맞춰 구성하되 카드·글자·테두리·간격은 기존 디자인 언어를 따릅니다.

- TypeScript·ESLint 통과.
- 콘텐츠/도식 검사: 7개 탭 순서·사례 구성·실제 갤러리 파일·Lighthouse 값 확인 통과.
- Production Build·postbuild CSS 검사 통과.
- 브라우저 1280px 데스크톱 7장, 실제 390px 모바일 7장 가로 넘침 없음.
- 실제 320px에서도 7장 가로 넘침 없음. 이전 버튼 7→1, 다음 버튼 1→7 및 끝 버튼 비활성 확인. 갤러리 이미지 로드와 원본 링크 새 탭 열기 확인.
- My Garage·모두닥·다른 프로젝트 데이터·문구는 이번 요청에서 변경하지 않았습니다. 공유 렌더러에 Nadaun 시각화와 선택적 갤러리를 추가했고 CSS는 나다운에 한정했습니다.

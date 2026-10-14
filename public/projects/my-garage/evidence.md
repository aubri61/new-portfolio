# My Garage — 구현 및 검증 근거

포트폴리오의 구현 설명은 실제 My Garage 소스와 아래 검증 문서를 대조했습니다. 결과 수치는 2026-10-09~10의 저장된 실행 기록입니다. 포트폴리오 리뉴얼에서 My Garage 서비스 테스트를 다시 실행한 결과로 해석하지 않습니다.

## Overview

실제 경로:

- `frontend/next.config.ts`: `/api/:path*` → Spring Boot rewrite.
- `frontend/app/api/notifications/stream/route.ts`: SSE 전용 스트리밍 Route Handler. Cookie 전달, identity/no-transform, upstream 취소 처리.
- `frontend/features/sharing/use-sharing-events.ts`: EventSource → TanStack Query.
- `backend/src/main/java/com/mygarage/backend/global/config/SecurityConfig.java`: HttpSessionSecurityContextRepository, CookieCsrfTokenRepository.
- `backend/src/main/java/com/mygarage/backend/sharing/SharingService.java`: 클래스 수준 @Transactional, 계약·접근·가상 제어 처리.
- `docs/ARCHITECTURE.md`: REST/SSE 경로 및 PostgreSQL 도메인 구성.

차량 잠금은 DB의 LOCKED/UNLOCKED 시뮬레이션입니다. 실차 제어, 결제, 보험, 법적 전자서명을 구현했다고 표현하지 않습니다. 전체 그림은 공유 도메인 중심이며 선택적 PKI 및 OTA의 세부 경로를 모두 그린 그림은 아닙니다.

## Authorization

- `SharingService.consent`: 양측 동의 후 DigitalAccessGrant 생성.
- `SharingService.requestUnlock`: renter → reconcile → validGrant.
- `SharingService.decideUnlock`: owner → refresh → reconcile → validGrant → 잠금 상태 변경.
- `DigitalAccessGrant.active`: 시작/종료 시각 및 revokedAt 검증.
- `SecurityConfig`: Session 인증, CSRF, 인증 실패 401, 접근 실패 403.
- `frontend/tests/e2e/sharing-live.spec.ts`: 실제 Spring/PostgreSQL, A/B/C 독립 세션. 회수 이후 unlock 요청 403, 제3자 대여 승인 요청 404, CSRF 누락 403 assertion.
- 기록: `docs/VALIDATION.md` (2026-10-09), 실제 DB/Next/Spring 공유 Chrome 시연 1/1 통과.

선택적 PKI 설정에서 요청·승인 시 증명을 추가로 검증합니다. 포트폴리오 시퀀스는 기본 계약 권한 흐름을 확대합니다.

## Sync

Streaming Proxy 문제 해결:

- `docs/VALIDATION.md`와 `docs/MOBILE_AND_SSE_PERFORMANCE.md`: 일반 Next API rewrite의 SSE 압축으로 ready frame이 지연됐다는 당시 기록. `9c65e74`의 전용 Route Handler와 현재 소스를 대조.
- `frontend/app/api/notifications/stream/route.ts`: Cookie 전달, upstream `Accept-Encoding: identity`, `ReadableStream.pull`에서 reader.read 후 target.enqueue, 응답의 `no-cache, no-transform` 및 `X-Accel-Buffering: no`. 취소 시 AbortController와 reader.cancel. upstream 연결 종료는 EOF로 전달.
- `frontend/tests/sse-proxy.test.mjs`: upstream이 열린 상태의 첫 ready frame 전달, 쿠키·헤더, 취소 시 abort, 연결 오류 EOF, 401 보존 및 연결 실패 503 assertion. 2026-10-10 문서에 신규 proxy 단위 테스트 3개 통과 기록.
- 프록시 전달 방식과 종료 처리를 검증한 것이며, 수정 전후 전송 지연 ms·p50·p95는 측정되지 않았습니다. 캐시 fixture의 3 이벤트→1 REST GET 결과와 구분합니다.


- `NotificationService`: @TransactionalEventListener 기본 AFTER_COMMIT 단계. 당사자별 SseEmitter 알림.
- `use-sharing-events.ts`: lastEventId Set, 50ms pendingKeys 병합, cancelQueries 이후 invalidateQueries. ready/online 시 REST 상태 복구.
- `frontend/tests/e2e/mobile-responsive.spec.ts`: 연속 change 이벤트 3개 이후 `/api/rentals` GET 1회, 동일 ID 반복 이후 추가 GET 0회 확인.
- 기록: `docs/MOBILE_AND_SSE_PERFORMANCE.md` (2026-10-10). local production Chrome 및 API/SSE fixture 사용.

이 결과는 REST 재조회 횟수 검증입니다. 서버 전송 지연 p50/p95, SSE 속도 개선율, 영속 이벤트 replay의 증거가 아닙니다.

## Concurrency

- `VehicleRepository.lockById`: @Lock(PESSIMISTIC_WRITE).
- `SharingService`: @Transactional; 차량 잠금 이후 EntityManager.refresh. 승인 직전 reserved 계약의 기간 겹침 재검사. 충돌은 HTTP CONFLICT / RENTAL_CONFLICT.
- `SharingConcurrencyTests.competingApprovalsCommitAtMostOneReservation`: 같은 차량·겹치는 기간의 서로 다른 신청을 두 스레드에서 CountDownLatch로 동시에 승인. 결과 true/false 각 1건 및 CONTRACT_PENDING 1건 assertion.
- 실행 기록: `docs/VALIDATION.md` (2026-10-09), Java 21·실제 PostgreSQL backend 44건 통과에 동시성 테스트 포함. 이후 `docs/LOVABLE_INTEGRATION.md`의 backend 회귀 57건 통과 기록에도 동시성 포함.

Before는 잠금이 없을 때의 경쟁 상태 설명입니다. 실제 과거 제품이 중복 예약을 생성했다는 실행 결과나 측정값이 아닙니다.

## UX

원본 문서: `docs/MOBILE_AND_SSE_PERFORMANCE.md` (2026-10-10).

- 모바일 1열 카드: `frontend/features/sharing/components/renter-dashboard.css`.
- 연결 상태 독립 줄 배치, 헤더 44px 터치 영역, SessionBoundary 스켈레톤 및 반응형 레이아웃.
- 큰 CLS 이동을 제거한 변경은 연결 상태를 고정된 다음 줄에 배치한 것입니다. 스켈레톤만의 성과로 표현하지 않습니다.

측정 조건: macOS, Chrome 155.0.8059.39, Next.js 16.4.0 production build, 390×844, DPR 1, CPU 4배 감속, 네트워크 감속 없음, 새 브라우저 컨텍스트, 3회, 최초 3초 관찰. 동일한 두 차량·두 계약 API fixture 및 Kakao SDK fixture. PerformanceObserver로 비사용자 입력 layout-shift 수집.

/renter CLS 원본 3개 표본의 중앙값:
- Before: 0.2582936827874983 → 표시 0.25829.
- After: 0.0023668362855558222 → 표시 0.00237.

[Before 원본](cls-before.json) / [After 원본](cls-after.json) / [60개 화면 검사](viewports.json).

화면 검사: 10개 경로 × 320/360/390/768/1024/1440px. 60개 모두 scrollWidth ≤ width.

화면 이미지는 동일 검증 문서의 실제 UI 캡처이며 API/지도 fixture 환경입니다. 실제 지도 성공 캡처가 아닙니다. 전체 이미지: [Before](renter-before.png) / [After](renter-after.png).

실사용 Core Web Vitals, 실제 모바일 네트워크·기기, 실제 API·지도 성능 측정이 아닙니다. LCP 중앙값은 580ms → 680ms로 개선되지 않았으므로 개선 성과에서 제외합니다. Lighthouse 점수 및 INP 결과도 표시하지 않습니다.

## Verification

각 실행을 합산하지 않습니다. backend 회귀에는 공유 외에 인증·OTA·PKI 등도 포함됩니다.

| 실행 기록 | 조건 | 결과 |
|---|---|---|
| VALIDATION.md · 2026-10-09 | 실제 Spring·PostgreSQL·Chrome 공유 시연, A/B/C 세션 | 1/1 통과 |
| LOVABLE_INTEGRATION.md · 2026-10-09 | Gradle 전체 backend 회귀 | 57 통과, 실패/제외 0 |
| MOBILE_AND_SSE_PERFORMANCE.md · 2026-10-10 | 프론트 단위, DB 없음 | 11 통과 |
| MOBILE_AND_SSE_PERFORMANCE.md · 2026-10-10 | API·지도 fixture 기반 Chrome 회귀, DB 없음 | 23 통과 / 6 제외 |

6개 제외는 폐기된 데모 등록 시나리오입니다. 실제 공유 E2E는 `sharing-live.spec.ts`의 전체 시나리오를 요약했습니다. 등록·신청 일부 단계는 context.request API를 사용하고 승인·동의·해제 요청·화면 갱신 등은 브라우저 UI로 검증합니다. 모두를 마우스 클릭만으로 실행한 테스트라고 표현하지 않습니다.

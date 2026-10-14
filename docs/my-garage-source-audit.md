# My Garage 리뉴얼 소스 대조

서비스 코드는 읽기만 했으며 수정하지 않았습니다. 사용자에게 노출되는 실행 조건·근거는 `public/projects/my-garage/evidence.md`에 있습니다.

## 대조 파일 SHA-256

- `docs/ARCHITECTURE.md`: `a033522ca3f6a03dff2801b5f0fd1e330528245138aafe1cf2592e73128d88ac`
- `docs/VALIDATION.md`: `b2915e7e1f2a0ea77131891abe24e7bd5a4c1083dce231b9fd5187f2c7e62b1a`
- `docs/LOVABLE_INTEGRATION.md`: `0b7631613815796dae8011f27f99b9948ff544d5bd8417763acd837b39d01091`
- `docs/MOBILE_AND_SSE_PERFORMANCE.md`: `d391b2c3be901cb0a72f4aa6d131813f356001aaeccf834e54c4c2ff4886cd74`
- `backend/src/main/java/com/mygarage/backend/sharing/SharingService.java`: `b7035352b364aca99b575007267178394091054ab7d5c0d2c362fc95556da420`
- `backend/src/main/java/com/mygarage/backend/vehicle/VehicleRepository.java`: `12866dc2e1a74ee13b36423c57516cc6feb1cf6115b08702f603e3e4407bb4b2`
- `backend/src/main/java/com/mygarage/backend/sharing/NotificationService.java`: `73e5014d98fcdf556bf58289ff31a6f329e34c3673748e100be2086310fc64a2`
- `frontend/features/sharing/use-sharing-events.ts`: `988d9218c8472fed5b70810e7d5cce979d259ca14c38574a49315430450388bb`
- `frontend/tests/e2e/sharing-live.spec.ts`: `30b9a94ef102cd683b06ca99485ab33ea456cd2b78376fa1dbb0ce584af48e3f`
- `backend/src/test/java/com/mygarage/backend/sharing/SharingConcurrencyTests.java`: `e92fbe23e0be97a2315837dee7d5e291b59fa1805271205829430c94ac3f19ec`

## 추가하면 좋은 자료

- 실행 로그 및 Playwright HTML report의 공개용 사본: 현재 수치는 검증 문서 기록과 테스트 소스 assertion 기준입니다.
- 실제 지도 SDK 성공 화면 및 A/B 동시 화면 캡처: UX 이미지는 실제 UI의 API/지도 fixture 캡처입니다.
- 실사용 환경 CLS/INP/LCP 및 mutation→SSE→UI 지연: 기존 로컬 CLS를 넘어선 운영 성능 주장을 위해 필요합니다.

검증되지 않은 LCP 개선, Lighthouse 점수, 평균·p95 SSE 지연, 실차 제어 성과는 제외했습니다.

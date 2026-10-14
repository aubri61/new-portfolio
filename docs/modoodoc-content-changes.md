# 모두닥 외부 공개용 개편

2026-10-14. 사용자 제공 공개용 콘텐츠·다이어그램 명세를 반영했습니다. 실제 서비스 소스 분석 완료나 원본 아키텍처 검증을 주장하지 않습니다. 앞선 `modoodoc-review-draft.md`는 내부 검토 초안이며 이번 공개 문안을 대신하지 않습니다.

- 6개 탭: Overview / DB Migration / Performance / Admin / Personalization / Features.
- 각 장에 Introduction, Problem / Solution / Result와 핵심 기술을 배치했습니다.
- 기존 My Garage의 캐러셀·2단 레이아웃·파란 강조·이전/다음·모바일 배치를 재사용했습니다.
- 모든 그림은 개념도입니다. 실제 회사 테이블·모델·API·실험 설정을 표시하지 않습니다.
- DB 그림은 분산 정보와 리뷰 1개→복수 진료 항목의 개념 비교입니다. 실제 ERD가 아닙니다.
- 이미지 대표 조회(UNION·필드/건수 제한), 모달 On-Demand Loading, 검색 목록 Prefetch를 구분했습니다.
- 관리자와 기능 페이지는 실제 데이터 없는 추상 와이어프레임으로 구성했습니다.
- 실험·행동 관찰과 Redux 개인화를 독립된 영역으로 표시했습니다.
- 이전 상세에 있던 내부 식별자·API 경로를 포함하는 사용하지 않는 모두닥 도식 데이터는 제거했습니다.
- MAU·데이터 이전 건수·로딩 시간 수치는 공개 화면에서 제외했습니다. 경력 요약의 로딩 수치도 공개용 문장으로 변경했습니다.
- 회사 서비스·저장소는 수정하지 않았습니다. 배포하지 않았습니다.

검증:

- TypeScript `pnpm exec tsc --noEmit` 통과.
- ESLint `pnpm lint` 통과.
- Production Build `pnpm build` 및 postbuild CSS 검사 통과. 제한된 환경에서 멈춘 첫 빌드는 중단하고 정상 실행 환경에서 재검증했습니다.
- `node scripts/validate-diagrams.mjs` 통과. 새 콘텐츠 모듈과 시각화 유형을 지원하도록 기존 검증 스크립트를 갱신했습니다.
- 브라우저 1280×900 및 390×844에서 6장 전환·페이지/시각 자료 가로 넘침 없음.
- 320×800 성능 페이지 가로 넘침 없음.
- 데스크톱 DB 비교, 성능 요청 흐름과 모바일 기능 와이어프레임 육안 확인.
- 미리보기: `modoodoc-performance-preview.png`.

## 문장·시각화 재개선

같은 날 추가 요청에 따라 P2P 프로젝트의 짧은 소개·핵심 구현 구성을 기준으로 6장을 다시 수정했습니다.

- Overview는 Problem/Solution/Result를 제거하고 소개·핵심 담당 작업만 남겼습니다.
- DB·성능·관리자는 발견한 문제, 적용 기술, 실제 동작으로 문장을 구체화했습니다.
- 성능 그림은 초기 사진과 모달 로딩을 중심으로 압축하고 검색 목록 Prefetch를 작은 보조 카드로 분리했습니다.
- 관리자는 필터 변경과 QuerySet 처리 이후 목록 표시를 예시 UI로 구성했습니다.
- 개인화는 왼쪽 별도 설명 섹션과 오른쪽 두 열로 Hackle·Redux 사례를 분리했습니다.
- Features는 Problem/Solution/Result·사용자 여정·가상 서비스 화면을 없애고 5개 기능별 작업·기술 카드로 바꿨습니다.
- 모든 도식의 하단 담당 영역·교육용 설명·반복 각주를 제거했습니다. 개념도·예시 UI 구분은 제목 아래 짧게 표시합니다.
- 기존 성능 수치 공개 제외 방침을 유지했습니다.

재검증: TypeScript, ESLint, 도식·콘텐츠 검사, Production Build와 postbuild CSS 검사 통과. 1280×900 및 390×844에서 6장 모두 전환 확인, 페이지·시각 자료 가로 넘침 없음. Overview·개인화·Features 및 모바일 Features 육안 확인.

최신 Overview 미리보기: `modoodoc-overview-preview.png`. 앞선 성능 미리보기는 첫 개편 당시 화면입니다.

## Overview 담당 범위 정리

사용자 최종 문구로 소개와 불렛 4줄을 교체했습니다. 기능 개발·80% 로딩 개선·관리자 워크플로우·Hackle/Redux 개인화를 표시합니다. 80%는 사용자가 지정한 기존 경험 표현이며 이번 작업의 재측정 수치가 아닙니다. 이전 공개용 수치 제외 문안보다 이번 Overview 문구 요청을 우선 반영했습니다.

오른쪽은 Frontend/Admin 3카드, Django Backend와 강조 4카드, Data/Experiment 2카드로 재구성했습니다. 개념도이며 실제 서버·SDK 호출 경로를 재현하지 않습니다. TypeScript·ESLint·콘텐츠 검사 통과, 데스크톱·390px 모바일 가로 넘침 없음. 최신 미리보기는 `modoodoc-overview-preview.png`입니다.

## 최종 명세 반영

최신 콘텐츠·제거 항목·수치 검토·검증 결과는 `modoodoc-final-review.md`를 기준으로 합니다. 앞선 1:N·80% 공개 문안은 최종 요청에 따라 제거했습니다.

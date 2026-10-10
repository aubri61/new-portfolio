# 박주언 풀스택 개발자 포트폴리오

Next.js App Router · React · TypeScript · Tailwind CSS · Motion · Lucide React로 만든 한국어 원페이지 포트폴리오입니다. 페이지와 콘텐츠 섹션은 서버 컴포넌트이고, 애니메이션 및 프로젝트 캐러셀에만 클라이언트 로직을 사용합니다.

## 실행과 검증

```sh
pnpm install
pnpm dev
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

`http://localhost:3000`에서 확인합니다. Vercel에 연결하면 기본 Next.js 설정으로 배포할 수 있습니다. 페이지는 빌드 시 정적으로 생성되며 로컬 이미지는 `next/image`로 최적화합니다. 별도 서버·DB·인증·환경변수는 없습니다.

## 콘텐츠 수정

- `data/profile.ts`: 소개와 GitHub, 이메일. 확인되지 않은 이메일은 `null`이며 입력하면 연락 링크가 표시됩니다.
- `data/experiences.ts`: 경력 요약과 펼쳐보기 업무 목록.
- `data/projects.ts`: 프로젝트 데이터 진입점과 기타 프로젝트.
- `data/featured-projects.ts`: 대표 프로젝트의 독립 슬라이드와 콘텐츠.
- `data/diagrams.ts`: 역할·노드·연결·비교 다이어그램 데이터.
- `data/skills.ts`: 기존 스킬 전체 목록, 첫 화면 대표 스킬, 기술 분야와 학력.
- `types/portfolio.ts`: 콘텐츠 타입.
- `app/globals.css`: 디자인 토큰, 한글 폰트, 반응형 스타일.
- `components/projects/ArchitectureDiagram.tsx`: 데이터 기반 기술 구성 다이어그램.
- `components/projects/CodeSnippet.tsx`: 검증된 코드가 있을 때 슬라이드의 `code` 필드로 표시합니다.

캐러셀은 자동 재생 없이 버튼·방향키·터치 스와이프로 이동합니다. 각 캐러셀의 상태는 독립적입니다. 시스템의 모션 감소 설정을 지원하며 JavaScript 비활성화 상태에서도 정적 소개와 첫 슬라이드를 볼 수 있습니다.

## 콘텐츠 출처와 후속 작업

기존 포트폴리오: https://self-portfolio-drab.vercel.app/

디자인 참고: https://dribbble.com/shots/16815627-Portfolio

확인되지 않은 수치와 기술 구현은 작성하지 않았습니다. 요약 이전의 기존 텍스트는 `docs/legacy-content.md`에 보관했습니다. 프로젝트별 TODO는 `data/projects.ts`에 있으며 전체 검토 항목은 `docs/content-review.md`에 정리했습니다.

프로젝트 이미지: 기존 포트폴리오의 나다운, 바카티오, Momi 실제 자료. DreamIn·Cluby·LawBot은 기존 YouTube 데모를 표시합니다. 없는 이미지는 준비 중임을 표시합니다. 한글 폰트는 자체 호스팅하는 Pretendard 1.3.9(SIL OFL 1.1)입니다.

## 다이어그램 검증

```sh
node scripts/validate-diagrams.mjs
```

구현한 16개 다이어그램과 검증 범위는 `docs/diagram-implementation.md`에 정리했습니다. 신규 기술 상세는 사용자 제공 명세 기준이며 소스 검증 필요 항목은 TODO로 유지합니다.

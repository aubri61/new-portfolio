import type { OtherProject } from "@/types/portfolio";
export { projects } from "./featured-projects";

export const otherProjects: OtherProject[] = [
  {
    name: "DreamIn",
    videoUrl: "https://www.youtube-nocookie.com/embed/eCEYWUdpOiU",
    category: "MOBILE · PERSONAL",
    period: "2023.05 — 2023.10",
    description:
      "기획부터 앱스토어 배포까지 직접 만든 동기부여 알람 앱. 소셜 로그인, 사진 검색·업로드와 기기 알람을 구현했습니다.",
    stack: ["React Native", "TypeScript", "Express", "MongoDB"],
    todo: "실제 앱 이미지 추가",
  },
  {
    name: "Momi",
    category: "WEB · AI",
    period: "2025.05",
    description:
      "Google AI SDK로 만든 친구 같은 AI 챗봇. next-intl을 활용해 다국어 환경을 지원합니다.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Google AI SDK"],
    image: "/projects/momi.png",
    link: { label: "Live demo", url: "https://ai-friend-chat.vercel.app/" },
  },
  {
    name: "Cluby",
    videoUrl: "https://www.youtube-nocookie.com/embed/3O2NNsjSsw0",
    category: "MOBILE · STUDY",
    period: "2020.10 — 2020.12",
    description:
      "스터디 매칭 서비스. 기존 사이트에서 프로젝트명과 기간을 확인했으며 상세 소개는 재정리 중입니다.",
    stack: ["React Native", "TypeScript", "Express", "MongoDB"],
    todo: "기존 설명·업무 목록이 DreamIn과 중복되어 확인 필요",
  },
  {
    name: "LawBot",
    videoUrl: "https://www.youtube-nocookie.com/embed/iHc02hxnq-M",
    category: "MOBILE · AI",
    period: "2019.05 — 2019.10",
    description:
      "소장을 업로드하면 유사 판례를 제공하는 AI 법률 도우미. OCR API와 앱 UI를 구현했으며 한이음 ICT 공모전 장려상을 수상했습니다.",
    stack: ["React Native", "JavaScript", "MongoDB", "Figma"],
    todo: "실제 앱 이미지 추가",
  },
];

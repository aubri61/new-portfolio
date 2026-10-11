import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "박주언 — 프로덕트 개발자",
  description:
    "사용자 경험과 기술적 완성도를 고민하는 프로덕트 개발자 박주언의 포트폴리오. 웹·모바일 서비스 개발, 아키텍처 설계와 문제 해결 경험을 소개합니다.",
  keywords: [
    "박주언",
    "프로덕트 개발자",
    "React",
    "Next.js",
    "포트폴리오",
    "React Native",
  ],
  authors: [{ name: "박주언" }],
  openGraph: {
    title: "박주언 — 프로덕트 개발자",
    description: "사용자 경험을 고민하고, 더 나은 서비스를 만듭니다.",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "박주언 — 프로덕트 개발자",
    description: "웹과 모바일, 화면 너머의 흐름까지.",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import OtherProjects from "@/components/sections/OtherProjects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        본문으로 건너뛰기
      </a>
      <div className="site-shell">
        <Header />
        <main id="main">
          <Hero />
          <Experience />
          <FeaturedProjects />
          <OtherProjects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

import { ArrowUpRight, GitFork, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import Reveal from "@/components/motion/Reveal";
export default function Contact() {
  return (
    <section id="contact" className="contact">
      <Reveal>
        <p className="eyebrow">
          <span className="blue">06</span> / WHAT’S NEXT?
        </p>
        <div className="contact-main">
          <div>
            <h2>
              함께 만들 다음 경험<span className="blue">.</span>
            </h2>
            <p>좋은 제품과 새로운 기회에 대한 이야기를 기다립니다.</p>
          </div>
          <ArrowUpRight
            className="contact-decoration"
            size={66}
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
        <div className="contact-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitFork size={19} aria-hidden="true" />
            <span>
              GitHub <small>@aubri61</small>
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          {profile.email && (
            <a href={`mailto:${profile.email}`}>
              <Mail size={19} aria-hidden="true" />
              <span>
                Email <small>{profile.email}</small>
              </span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}

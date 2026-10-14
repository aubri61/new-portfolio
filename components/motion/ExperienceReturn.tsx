"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

type ReturnTarget = { id: string; company: string };

export default function ExperienceReturn() {
  const [target, setTarget] = useState<ReturnTarget | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a.experience-project-link");
      const row = link?.closest<HTMLElement>(".experience-row");
      if (!row?.id || event.defaultPrevented) return;
      setVisible(false);
      setTarget({ id: row.id, company: row.querySelector("h3")?.textContent ?? "회사" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!target) return;
    let departed = false;
    function update() {
      const row = document.getElementById(target!.id);
      const below = !!row && row.getBoundingClientRect().bottom <= 0;
      if (departed && !below) {
        setTarget(null);
        setVisible(false);
        return;
      }
      departed ||= below;
      setVisible(below);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [target]);

  if (!target || !visible) return null;

  return (
    <a
      className="experience-return-floating"
      href={`#${target.id}`}
      aria-label={`${target.company} 경력으로 돌아가기`}
      onClick={() => {
        setTarget(null);
        setVisible(false);
      }}
    >
      <ArrowUp size={19} strokeWidth={1.7} aria-hidden="true" />
      경력으로 돌아가기
    </a>
  );
}

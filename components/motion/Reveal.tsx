"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  hero = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  hero?: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      data-reveal
      initial={reduced ? false : { opacity: 0, y: 20 }}
      {...(hero
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 } })}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        duration: reduced ? 0 : 0.6,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

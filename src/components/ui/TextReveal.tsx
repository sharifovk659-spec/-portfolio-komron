"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  className?: string;
  highlightLast?: boolean;
}

export default function TextReveal({
  text,
  className = "",
  highlightLast = false,
}: TextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { reducedMotion } = useMotionPrefs();
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const spans = el.querySelectorAll(".reveal-word");
    gsap.fromTo(
      spans,
      { opacity: 0, y: 30, rotateX: -40 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      }
    );
  }, [reducedMotion, text]);

  return (
    <h2
      ref={ref}
      className={`font-display ${className}`}
      style={{ perspective: "800px" }}
    >
      {words.map((word, i) => {
        const isLast = highlightLast && i === words.length - 1;
        return (
          <span
            key={i}
            className={`reveal-word inline-block ${isLast ? "gradient-text glow-text" : ""}`}
            style={{ transformStyle: "preserve-3d" }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        );
      })}
    </h2>
  );
}

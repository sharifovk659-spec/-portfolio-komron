"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, reducedMotion } = useMotionPrefs();

  useEffect(() => {
    if (isMobile || reducedMotion || !containerRef.current) return;

    const orbs = containerRef.current.querySelectorAll(".orb");
    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-60, 60)`,
        y: `random(-60, 60)`,
        duration: `random(12, 20)`,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.8,
      });
    });

    return () => gsap.killTweensOf(orbs);
  }, [isMobile, reducedMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-dark-950" />
      <div className="noise-overlay absolute inset-0" />

      <div
        className="orb absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full opacity-30 blur-[100px] md:opacity-40 md:blur-[140px]"
        style={{ background: "radial-gradient(circle, #00d4ff 0%, transparent 65%)" }}
      />
      <div
        className="orb absolute top-1/4 -right-48 hidden h-[600px] w-[600px] rounded-full opacity-25 blur-[130px] md:block md:opacity-30 md:blur-[150px]"
        style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 65%)" }}
      />
      <div
        className="orb absolute -bottom-32 left-1/4 h-[450px] w-[450px] rounded-full opacity-25 blur-[100px] md:opacity-35 md:blur-[130px]"
        style={{ background: "radial-gradient(circle, #00fff5 0%, transparent 65%)" }}
      />

      <div
        className="absolute inset-0 opacity-[0.02] md:opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050508_75%)]" />
    </div>
  );
}

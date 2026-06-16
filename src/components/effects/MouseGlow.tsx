"use client";

import { useEffect, useRef } from "react";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";

const SIZE = 72;
const HALF = SIZE / 2;

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const { enableDesktopFX } = useMotionPrefs();

  useEffect(() => {
    if (!enableDesktopFX || !glowRef.current) return;

    const glow = glowRef.current;
    let x = -9999;
    let y = -9999;
    let targetX = -9999;
    let targetY = -9999;
    let frameId = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      glow.style.opacity = "1";
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    const animate = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      glow.style.transform = `translate3d(${x - HALF}px, ${y - HALF}px, 0)`;
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(frameId);
    };
  }, [enableDesktopFX]);

  if (!enableDesktopFX) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] will-change-transform"
      style={{
        width: SIZE,
        height: SIZE,
        opacity: 0,
        transition: "opacity 0.25s ease",
      }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.12) 0%, rgba(0,255,245,0.05) 45%, transparent 70%)",
          boxShadow: "0 0 18px rgba(0,212,255,0.15), 0 0 32px rgba(168,85,247,0.06)",
        }}
      />
      <div
        className="absolute inset-[28%] rounded-full border border-white/10"
        style={{
          boxShadow: "inset 0 0 8px rgba(0,212,255,0.08)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/40"
        style={{ boxShadow: "0 0 6px rgba(0,255,245,0.5)" }}
      />
    </div>
  );
}

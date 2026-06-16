"use client";

import { useMotionPrefs } from "@/hooks/useMotionPrefs";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiFramer,
} from "react-icons/si";

const icons = [
  { Icon: SiReact, color: "#61DAFB", top: "15%", left: "8%", delay: "0s", duration: "7s" },
  { Icon: SiNextdotjs, color: "#fff", top: "25%", right: "10%", delay: "1s", duration: "8s" },
  { Icon: SiTypescript, color: "#3178C6", top: "60%", left: "5%", delay: "2s", duration: "9s" },
  { Icon: SiTailwindcss, color: "#06B6D4", top: "70%", right: "8%", delay: "0.5s", duration: "7.5s" },
  { Icon: SiNodedotjs, color: "#339933", top: "40%", left: "12%", delay: "1.5s", duration: "8.5s" },
  { Icon: SiFramer, color: "#0055FF", top: "50%", right: "12%", delay: "2.5s", duration: "7s" },
];

export default function FloatingTechIcons() {
  const { isMobile, reducedMotion } = useMotionPrefs();

  if (isMobile || reducedMotion) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map(({ Icon, color, top, left, right, delay, duration }, i) => (
        <div
          key={i}
          className="float-icon absolute flex h-10 w-10 items-center justify-center rounded-xl opacity-20 sm:h-12 sm:w-12 sm:opacity-25"
          style={{
            top,
            left,
            right,
            animationDelay: delay,
            ["--float-duration" as string]: duration,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: `0 0 20px ${color}22`,
          }}
        >
          <Icon size={22} style={{ color }} />
        </div>
      ))}
    </div>
  );
}

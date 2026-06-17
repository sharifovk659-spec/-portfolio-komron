"use client";

import Image from "next/image";
import { SiPhp, SiJavascript, SiMysql, SiReact } from "react-icons/si";
import { personalInfo } from "@/lib/data";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";

const ORBIT_DURATION = 28;

const orbitSkills = [
  { label: "PHP 8", Icon: SiPhp, color: "#8892BF", angle: 0 },
  { label: "JavaScript", Icon: SiJavascript, color: "#F7DF1E", angle: 90 },
  { label: "MySQL", Icon: SiMysql, color: "#4479A1", angle: 180 },
  { label: "React", Icon: SiReact, color: "#61DAFB", angle: 270 },
] as const;

const skillTags = ["PHP 8", "MySQL", "JavaScript", "HTML / CSS", "UI/UX"];

export default function ProfileOrbitCard() {
  const { reducedMotion, isMobile } = useMotionPrefs();
  const animate = !reducedMotion;
  const orbitRadius = isMobile ? 100 : 132;
  const photoSize = isMobile ? "h-[120px] w-[120px]" : "h-[148px] w-[148px] sm:h-[160px] sm:w-[160px]";

  return (
    <div className="profile-orbit-card relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl p-6 sm:max-w-md sm:p-8">
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-neon-blue/[0.06] via-transparent to-neon-purple/[0.04]" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-neon-blue/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-24 w-24 rounded-full bg-neon-purple/15 blur-2xl" />

      <div className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[300px]">
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 300 300"
        >
          <circle
            cx="150"
            cy="150"
            r={orbitRadius}
            fill="none"
            stroke="rgba(0, 212, 255, 0.18)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          <circle
            cx="150"
            cy="150"
            r={orbitRadius - 28}
            fill="none"
            stroke="rgba(0, 212, 255, 0.08)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
          {[0, 90, 180, 270].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x = 150 + Math.cos(rad) * orbitRadius;
            const y = 150 + Math.sin(rad) * orbitRadius;
            return <circle key={deg} cx={x} cy={y} r="3" fill="rgba(0, 212, 255, 0.5)" />;
          })}
        </svg>

        <div
          className={`absolute inset-0 ${animate ? "profile-orbit-ring" : ""}`}
          style={animate ? { animationDuration: `${ORBIT_DURATION}s` } : undefined}
        >
          {orbitSkills.map(({ label, Icon, color, angle }) => (
            <div
              key={label}
              className="absolute top-1/2 left-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateY(-${orbitRadius}px)` }}
            >
              <div
                className={`flex -translate-x-1/2 ${animate ? "profile-orbit-counter" : ""}`}
                style={animate ? { animationDuration: `${ORBIT_DURATION}s` } : undefined}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-neon-blue/30 sm:h-14 sm:w-14"
                  style={{
                    background: "rgba(10, 15, 30, 0.85)",
                    boxShadow: `0 0 20px ${color}33, 0 0 40px rgba(0, 212, 255, 0.12)`,
                  }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`relative overflow-hidden rounded-full ${photoSize}`}
            style={{
              boxShadow:
                "0 0 0 3px rgba(0, 212, 255, 0.5), 0 0 30px rgba(0, 212, 255, 0.35), 0 0 60px rgba(0, 212, 255, 0.15)",
            }}
          >
            <Image
              src={personalInfo.profilePhoto}
              alt={personalInfo.name}
              fill
              className="object-cover object-top"
              sizes="160px"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="relative mt-6 text-center">
        <h3 className="font-display text-xl font-bold text-white sm:text-2xl">{personalInfo.name}</h3>
        <p className="mt-1 text-sm font-medium text-neon-cyan sm:text-base">{personalInfo.title}</p>
      </div>

      <div className="relative mt-5 flex flex-wrap justify-center gap-2">
        {skillTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/75 sm:text-xs"
            style={{ background: "rgba(255, 255, 255, 0.04)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_rgba(0,255,245,0.8)]" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

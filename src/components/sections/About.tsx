"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { SiPhp, SiJavascript, SiMysql, SiReact } from "react-icons/si";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

const orbitApps = [
  {
    id: "mysql",
    Icon: SiMysql,
    color: "#4479A1",
    position: "absolute -top-3 -left-3",
    iconSize: 50,
    duration: 18,
  },
  {
    id: "php",
    Icon: SiPhp,
    color: "#8892BF",
    position: "absolute -top-3 -right-3",
    iconSize: 52,
    duration: 20,
  },
  {
    id: "js",
    Icon: SiJavascript,
    color: "#F7DF1E",
    position: "absolute -bottom-3 -left-3",
    iconSize: 50,
    duration: 15,
  },
  {
    id: "react",
    Icon: SiReact,
    color: "#61DAFB",
    position: "absolute -bottom-3 -right-3",
    iconSize: 52,
    duration: 22,
  },
] as const;

export default function About() {
  const { t } = useLanguage();
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        x: -80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(contentRef.current, {
        scrollTrigger: { trigger: contentRef.current, start: "top 80%" },
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  const p1 = t.about.p1.replace("{name}", personalInfo.name);

  return (
    <SectionWrapper id="about" glow="blue" className="relative">
      <SectionHeading subtitle={t.about.subtitle} title={t.about.title} description={t.about.description} />

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div ref={imageRef} className="relative mx-auto w-full max-w-md lg:mx-0">
          <div className="gradient-border glow-blue relative aspect-square overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/25 via-dark-700 to-neon-purple/25" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div
                className="relative h-[186px] w-[186px] overflow-hidden rounded-full sm:h-[218px] sm:w-[218px]"
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
                  sizes="(max-width: 640px) 186px, 218px"
                  priority
                  unoptimized
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />
          </div>

          {orbitApps.map(({ id, Icon, color, position, iconSize, duration }) => (
            <div
              key={id}
              className={`${position} flex h-[68px] w-[68px] items-center justify-center rounded-full border-2 border-dashed border-neon-blue/50 bg-dark-900/90`}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration, repeat: Infinity, ease: "linear" }}
                className="flex items-center justify-center"
              >
                <Icon size={iconSize} style={{ color }} />
              </motion.div>
            </div>
          ))}
        </div>

        <div ref={contentRef} className="space-y-6">
          <p className="text-lg leading-relaxed text-white/75">{p1}</p>
          <p className="leading-relaxed text-white/55">{t.about.p2}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: HiLocationMarker, text: personalInfo.location },
              { icon: HiMail, text: personalInfo.email },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2.5 rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-white/60"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <Icon className="text-neon-cyan" size={18} />
                {text}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 sm:gap-4">
            {t.about.traits.map((trait, i) => (
              <GlassCard key={trait} delay={i * 0.1} className="!p-4 text-center">
                <span className="text-sm font-medium text-white/85">{trait}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

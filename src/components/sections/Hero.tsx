"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { HiArrowDown, HiDownload } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { personalInfo } from "@/lib/data";
import { useLenisScroll } from "@/components/layout/SmoothScroll";
import { useLanguage } from "@/hooks/useLanguage";
import FloatingTechIcons from "@/components/effects/FloatingTechIcons";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Hero() {
  const { scrollTo } = useLenisScroll();
  const { t } = useLanguage();
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;
    const chars = title.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { opacity: 0, y: 50, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.03, ease: "back.out(1.7)", delay: 0.5 }
    );
  }, []);

  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center section-padding pt-24 sm:pt-32">
      <FloatingTechIcons />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neon-blue/5 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-white/75"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(20px)",
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t.hero.availability}
        </motion.div>

        <h1 ref={titleRef} className="font-display text-3xl font-bold tracking-tight sm:text-6xl lg:text-8xl" style={{ perspective: "1000px" }}>
          {personalInfo.name.split("").map((char, i) => (
            <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.2 }} className="mt-5 font-display text-xl font-medium gradient-text sm:text-2xl lg:text-3xl">
          {t.personal.title}
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.4 }} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">
          {t.personal.tagline}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.6 }} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton onClick={() => scrollTo("#projects")} className="btn-premium px-8 py-4">
            {t.hero.viewWork}
          </MagneticButton>
          <MagneticButton href="#" className="btn-ghost flex items-center gap-2 px-8 py-4">
            <HiDownload size={18} />
            {t.hero.downloadCv}
          </MagneticButton>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} className="mt-10 flex items-center justify-center gap-4">
          {[personalInfo.social.github, personalInfo.social.linkedin].map((href, i) => {
            const Icon = i === 0 ? FaGithub : FaLinkedin;
            return (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="premium-card flex h-12 w-12 items-center justify-center !p-0 text-white/60 hover:text-neon-cyan">
                <Icon size={20} />
              </a>
            );
          })}
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={() => scrollTo("#stats")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 4 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-white/10 text-white/40 backdrop-blur-xl hover:text-neon-blue"
        aria-label={t.hero.scrollDown}
      >
        <HiArrowDown size={20} />
      </motion.button>
    </section>
  );
}

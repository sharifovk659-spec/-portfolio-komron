"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { workProcess } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

export default function WorkProcess() {
  const { t } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-line", { scrollTrigger: { trigger: timelineRef.current, start: "top 75%", end: "bottom 60%", scrub: 1 }, scaleX: 0, transformOrigin: "left" });
      timelineRef.current?.querySelectorAll(".process-step").forEach((step, i) => {
        gsap.from(step, { scrollTrigger: { trigger: step, start: "top 85%", once: true }, opacity: 0, y: 50, duration: 0.8, delay: i * 0.1, ease: "power3.out" });
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="process" glow="blue" className="relative">
      <SectionHeading subtitle={t.process.subtitle} title={t.process.title} description={t.process.description} />

      <div ref={timelineRef} className="relative">
        <div className="process-line absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple lg:block" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {workProcess.map((step) => {
            const pt = t.process[step.tKey];
            return (
              <motion.div key={step.id} className="process-step premium-card p-6 sm:p-7" whileHover={{ y: -6 }}>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl font-display text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)", boxShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
                  {step.step}
                </div>
                <h3 className="font-display text-lg font-semibold">{pt.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{pt.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

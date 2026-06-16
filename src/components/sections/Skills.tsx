"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { skills } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll(".skill-bar").forEach((bar) => {
        const width = bar.getAttribute("data-width");
        gsap.fromTo(bar, { width: "0%" }, {
          width: `${width}%`, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: bar, start: "top 90%", once: true },
        });
      });
      sectionRef.current?.querySelectorAll(".skill-row").forEach((row) => {
        const label = row.querySelector(".skill-percent");
        const target = Number(row.querySelector(".skill-bar")?.getAttribute("data-width") ?? 0);
        if (!label) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target, duration: 1.4, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true },
          onUpdate: () => { label.textContent = `${Math.round(counter.val)}%`; },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="skills" glow="purple" className="relative">
      <SectionHeading subtitle={t.skills.subtitle} title={t.skills.title} description={t.skills.description} />

      <div ref={sectionRef} className="grid gap-5 sm:gap-6 md:grid-cols-3">
        {skills.map((group, groupIndex) => (
          <GlassCard key={group.categoryKey} delay={groupIndex * 0.15}>
            <h3 className="mb-6 font-display text-lg font-semibold gradient-text">{t.skills[group.categoryKey]}</h3>
            <div className="space-y-5">
              {group.items.map((skill) => (
                <div key={skill.name} className="skill-row">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-white/85">{skill.name}</span>
                    <span className="skill-percent font-medium text-neon-cyan">0%</span>
                  </div>
                  <div className="relative h-2.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="skill-bar absolute inset-y-0 left-0 rounded-full" data-width={skill.level} style={{ width: "0%", background: "linear-gradient(90deg, #00d4ff, #00fff5, #a855f7)", boxShadow: "0 0 14px rgba(0,212,255,0.45)" }} />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

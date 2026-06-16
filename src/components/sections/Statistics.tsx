"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      personalInfo.stats.forEach((stat, i) => {
        const el = sectionRef.current?.querySelector(`[data-stat="${i}"]`);
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          onUpdate: () => { el.textContent = String(Math.round(counter.val)); },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper id="stats" glow="cyan" className="relative">
      <SectionHeading subtitle={t.stats.subtitle} title={t.stats.title} description={t.stats.description} />

      <div ref={sectionRef} className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {personalInfo.stats.map((stat, i) => (
          <motion.div key={stat.key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="premium-card group p-6 text-center sm:p-8">
            <p className="font-display text-4xl font-bold gradient-text sm:text-5xl">
              <span data-stat={i}>0</span>{stat.suffix}
            </p>
            <p className="mt-3 text-sm text-white/50 group-hover:text-white/70">{t.stats[stat.key]}</p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

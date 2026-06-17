"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiLocationMarker, HiMail, HiLightningBolt, HiUserGroup, HiSearch } from "react-icons/hi";
import { FaBullseye } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import ProfileOrbitCard from "@/components/ui/ProfileOrbitCard";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

const traitIcons = [FaBullseye, HiUserGroup, HiLightningBolt, HiSearch];

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
        <div ref={imageRef} className="flex justify-center lg:justify-start">
          <ProfileOrbitCard />
        </div>

        <div ref={contentRef} className="space-y-6">
          <p className="text-lg leading-relaxed text-white/75">{p1}</p>
          <p className="leading-relaxed text-white/55">{t.about.p2}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: HiLocationMarker, text: t.personal.location },
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
            {t.about.traits.map((trait, i) => {
              const Icon = traitIcons[i];
              return (
                <GlassCard key={trait} delay={i * 0.1} className="!p-4">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Icon className="text-neon-cyan" size={20} />
                    <span className="text-sm font-medium text-white/85">{trait}</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

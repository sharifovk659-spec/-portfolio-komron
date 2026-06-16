"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionWrapper from "@/components/ui/SectionWrapper";
import GlassCard from "@/components/ui/GlassCard";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const [photoReady, setPhotoReady] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setShowPhoto(true);
    img.onerror = () => setShowPhoto(false);
    img.src = personalInfo.profilePhoto;
    setPhotoReady(true);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, { scrollTrigger: { trigger: imageRef.current, start: "top 80%" }, x: -80, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(contentRef.current, { scrollTrigger: { trigger: contentRef.current, start: "top 80%" }, x: 80, opacity: 0, duration: 1, ease: "power3.out" });
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
            {photoReady && showPhoto ? (
              <Image
                src={personalInfo.profilePhoto}
                alt={personalInfo.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 400px"
                priority
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/25 via-dark-700 to-neon-purple/25" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-7xl font-bold gradient-text opacity-60 sm:text-8xl">KS</span>
                </div>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-transparent to-transparent" />
          </div>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-5 -right-5 h-24 w-24 rounded-full border border-dashed border-neon-blue/40" />
          <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -bottom-5 -left-5 h-16 w-16 rounded-full border border-dashed border-neon-purple/40" />
        </div>

        <div ref={contentRef} className="space-y-6">
          <p className="text-lg leading-relaxed text-white/75">{p1}</p>
          <p className="leading-relaxed text-white/55">{t.about.p2}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: HiLocationMarker, text: t.personal.location },
              { icon: HiMail, text: personalInfo.email },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 rounded-2xl border border-white/10 px-4 py-2.5 text-sm text-white/60" style={{ background: "rgba(255,255,255,0.03)" }}>
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

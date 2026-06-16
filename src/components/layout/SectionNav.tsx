"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { sectionNavLinks } from "@/lib/data";
import { useLenisScroll } from "@/components/layout/SmoothScroll";
import { useLanguage } from "@/hooks/useLanguage";

export default function SectionNav() {
  const { scrollTo } = useLenisScroll();
  const { t } = useLanguage();
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = sectionNavLinks.map((l) => document.querySelector(l.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach((s) => observer.observe(s!));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-3 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex xl:right-6"
    >
      {sectionNavLinks.map((link, i) => {
        const isActive = active === link.href;
        return (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            aria-label={`Section ${i + 1}`}
            title={t.sectionNav[link.key]}
            className="group flex items-center gap-2"
          >
            <span
              className={`text-xs font-medium transition-all ${
                isActive ? "text-neon-cyan opacity-100" : "text-white/0 opacity-0 group-hover:text-white/60 group-hover:opacity-100"
              }`}
            >
              {t.sectionNav[link.key]}
            </span>
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
                boxShadow: isActive ? "0 0 12px rgba(0,255,245,0.8)" : "0 0 0px transparent",
              }}
              className={`block h-2 w-2 rounded-full ${isActive ? "bg-neon-cyan" : "bg-white/25 group-hover:bg-neon-blue/60"}`}
            />
          </button>
        );
      })}
    </nav>
  );
}

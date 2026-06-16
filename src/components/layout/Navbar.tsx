"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { personalInfo } from "@/lib/data";
import { useLenisScroll } from "@/components/layout/SmoothScroll";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";

export default function Navbar() {
  const { scrollTo } = useLenisScroll();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    scrollTo(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 left-0 z-50 py-3 transition-all duration-500 sm:py-4"
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(5,5,8,0.97), rgba(5,5,8,0.9))"
          : "linear-gradient(180deg, rgba(5,5,8,0.6), transparent)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group flex shrink-0 items-center gap-2.5"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white transition-transform group-hover:scale-110"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #a855f7)",
              boxShadow: "0 4px 16px rgba(0,212,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
            }}
          >
            KS
          </span>
          <span className="hidden font-display text-lg font-semibold sm:block">
            {personalInfo.name.split(" ")[0]}
            <span className="gradient-text">.</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="btn-premium px-4 py-2.5 text-sm"
          >
            {t.nav.hireMe}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

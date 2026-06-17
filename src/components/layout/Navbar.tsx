"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLenisScroll } from "@/components/layout/SmoothScroll";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import BrandMark from "@/components/ui/BrandMark";

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
      className="fixed top-0 right-0 left-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8"
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-5 sm:py-3"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(12,14,28,0.95), rgba(8,10,22,0.98))"
            : "linear-gradient(135deg, rgba(12,14,28,0.88), rgba(8,10,22,0.92))",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          boxShadow: scrolled
            ? "0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,212,255,0.06)"
            : "0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#home");
          }}
          className="group shrink-0 transition-transform group-hover:scale-[1.02]"
        >
          <BrandMark size="md" />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
            className="btn-premium shrink-0 rounded-full px-4 py-2 text-xs font-semibold sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="hidden min-[420px]:inline">{t.nav.hireMe}</span>
            <span className="min-[420px]:hidden">{t.nav.hireMeShort}</span>
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "@/components/layout/SmoothScroll";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import BrandMark from "@/components/ui/BrandMark";

export default function Navbar() {
  const { scrollTo, subscribeScroll } = useLenisScroll();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    return subscribeScroll((scrollY) => {
      setScrolled(scrollY > 50);

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) {
        setVisible(true);
        lastScrollY.current = scrollY;
        return;
      }

      if (scrollY < 80) {
        setVisible(true);
      } else if (scrollY > lastScrollY.current + 8) {
        setVisible(false);
      } else if (scrollY < lastScrollY.current - 8) {
        setVisible(true);
      }

      lastScrollY.current = scrollY;
    });
  }, [subscribeScroll]);

  const handleNavClick = (href: string) => {
    scrollTo(href);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: visible ? 0 : "-120%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 left-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-2xl px-2.5 py-2 transition-all duration-500 sm:gap-3 sm:px-5 sm:py-3"
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
          className="group min-w-0 transition-transform group-hover:scale-[1.02]"
        >
          <BrandMark size="sm" showText={false} className="sm:hidden" />
          <BrandMark size="md" className="hidden sm:flex" />
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
        </div>
      </nav>
    </motion.header>
  );
}

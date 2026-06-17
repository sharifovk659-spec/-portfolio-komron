"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function Preloader() {
  const { locale } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // Medium and smooth loading speed (not too fast, not too slow).
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) return 100;
        if (prev >= 85) return prev + 0.8;
        if (prev >= 60) return prev + 1.6;
        return prev + 2.8;
      });
    }, 90);
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 650);
    }, 3200);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    gsap.timeline()
      .fromTo(".preloader-ring", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "power3.out" })
      .fromTo(".preloader-logo-box", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5");
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div exit={{ opacity: 0 }} transition={{ duration: 0.7 }} className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]">
          <div className="noise-overlay absolute inset-0" />
          <div className="preloader-ring absolute h-36 w-36 rounded-full border border-neon-blue/20 sm:h-44 sm:w-44" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute h-40 w-40 rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-purple sm:h-48 sm:w-48"
          />

          <div className="preloader-logo-box relative flex flex-col items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white sm:h-14 sm:w-14 sm:text-xl"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #a855f7)",
                boxShadow: "0 4px 24px rgba(0,212,255,0.4), inset 0 1px 0 rgba(255,255,255,0.25)",
              }}
              aria-hidden
            >
              {"</>"}
            </span>
            <p className="font-display text-xl font-semibold sm:text-2xl">
              <span className="text-white">{personalInfo.brandName}</span>
              <span className="gradient-text">{personalInfo.brandSuffix}</span>
            </p>
          </div>

          <p className="mt-7 text-[11px] tracking-[0.28em] text-white/40 uppercase sm:mt-9">
            {locale === "en" ? "Loading experience..." : "Loading..."}
          </p>
          <div className="mt-4 h-0.5 w-52 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="mt-2 font-mono text-[11px] text-neon-cyan/70">{Math.min(Math.round(progress), 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

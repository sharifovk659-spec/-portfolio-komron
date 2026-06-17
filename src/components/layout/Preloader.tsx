"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/hooks/useLanguage";
import BrandMark from "@/components/ui/BrandMark";

const RING_RADIUS = 92;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function Preloader() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const interval = setInterval(
      () => setProgress((prev) => Math.min(prev + Math.random() * 10 + 3, 100)),
      100
    );
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = "";
      }, 600);
    }, 2800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!loading) return;
    gsap.timeline()
      .fromTo(".preloader-ring-svg", { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: "power3.out" })
      .fromTo(".preloader-logo-box", { scale: 0.6, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.5")
      .fromTo(".preloader-status", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
  }, [loading]);

  const strokeOffset = RING_CIRCUMFERENCE - (Math.min(progress, 100) / 100) * RING_CIRCUMFERENCE;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050508]"
        >
          <div className="noise-overlay absolute inset-0" />

          <div className="relative flex flex-col items-center">
            <svg
              className="preloader-ring-svg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              width={RING_RADIUS * 2 + 24}
              height={RING_RADIUS * 2 + 24}
              viewBox={`0 0 ${RING_RADIUS * 2 + 24} ${RING_RADIUS * 2 + 24}`}
              aria-hidden
            >
              <defs>
                <linearGradient id="preloader-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#00fff5" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
              <circle
                cx={(RING_RADIUS * 2 + 24) / 2}
                cy={(RING_RADIUS * 2 + 24) / 2}
                r={RING_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="2"
              />
              <circle
                cx={(RING_RADIUS * 2 + 24) / 2}
                cy={(RING_RADIUS * 2 + 24) / 2}
                r={RING_RADIUS}
                fill="none"
                stroke="url(#preloader-ring-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={strokeOffset}
                transform={`rotate(-90 ${(RING_RADIUS * 2 + 24) / 2} ${(RING_RADIUS * 2 + 24) / 2})`}
                style={{ transition: "stroke-dashoffset 0.15s ease-out" }}
              />
            </svg>

            <div className="preloader-logo-box relative flex flex-col items-center px-6 py-10 sm:px-8 sm:py-12">
              <BrandMark size="xl" layout="stacked" />
            </div>
          </div>

          <p className="preloader-status mt-2 text-sm tracking-wide text-white/40 sm:text-base">
            {t.preloader.loadingExperience}
          </p>

          <div className="mt-8 h-1 w-56 overflow-hidden rounded-full bg-white/10 sm:w-72">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.15 }}
            />
          </div>
          <p className="mt-3 font-mono text-sm font-medium text-neon-cyan sm:text-base">
            {Math.min(Math.round(progress), 100)}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/hooks/useLanguage";
import Logo from "@/components/ui/Logo";

export default function Preloader() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => setProgress((prev) => Math.min(prev + Math.random() * 12 + 4, 100)), 100);
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => { setLoading(false); document.body.style.overflow = ""; }, 700);
    }, 2400);
    return () => { clearInterval(interval); clearTimeout(timer); document.body.style.overflow = ""; };
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
          <div className="preloader-ring absolute h-44 w-44 rounded-full border border-neon-blue/20 sm:h-52 sm:w-52" />
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} className="absolute h-48 w-48 rounded-full border-2 border-transparent border-t-neon-cyan border-r-neon-purple sm:h-56 sm:w-56" />
          <div className="preloader-logo-box relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl sm:h-32 sm:w-32" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))", border: "1px solid rgba(255,255,255,0.15)", boxShadow: "0 0 60px rgba(0,212,255,0.35)" }}>
            <Logo size={96} priority className="h-full w-full" />
          </div>
          <p className="mt-10 text-xs tracking-[0.4em] text-white/35 uppercase">{t.preloader.loading}</p>
          <div className="mt-5 h-0.5 w-52 overflow-hidden rounded-full bg-white/10 sm:w-64">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple" animate={{ width: `${Math.min(progress, 100)}%` }} />
          </div>
          <p className="mt-2 font-mono text-[10px] text-neon-cyan/50">{Math.min(Math.round(progress), 100)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

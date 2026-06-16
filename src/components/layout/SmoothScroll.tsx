"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  scrollTo: (target: string, offset?: number) => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  return (
    ctx ?? {
      scrollTo: (target: string) => {
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      },
    }
  );
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback((target: string, offset = -80) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset, duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}

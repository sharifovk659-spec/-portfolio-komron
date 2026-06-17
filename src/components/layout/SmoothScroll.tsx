"use client";

import { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface LenisContextValue {
  scrollTo: (target: string, offset?: number) => void;
  subscribeScroll: (listener: (scrollY: number) => void) => () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

const fallbackScroll: LenisContextValue = {
  scrollTo: (target: string) => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  },
  subscribeScroll: (listener) => {
    const onScroll = () => listener(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  },
};

export function useLenisScroll() {
  const ctx = useContext(LenisContext);
  return ctx ?? fallbackScroll;
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollListeners = useRef(new Set<(scrollY: number) => void>());

  const subscribeScroll = useCallback((listener: (scrollY: number) => void) => {
    scrollListeners.current.add(listener);
    listener(window.scrollY);
    return () => scrollListeners.current.delete(listener);
  }, []);

  const notifyScroll = useCallback((scrollY: number) => {
    scrollListeners.current.forEach((listener) => listener(scrollY));
  }, []);

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

    if (isMobile || reducedMotion) {
      const onScroll = () => notifyScroll(window.scrollY);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;
    lenis.on("scroll", (event) => {
      ScrollTrigger.update();
      notifyScroll(event.scroll);
    });

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
  }, [notifyScroll]);

  return <LenisContext.Provider value={{ scrollTo, subscribeScroll }}>{children}</LenisContext.Provider>;
}

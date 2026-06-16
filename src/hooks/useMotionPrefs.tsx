"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface MotionPrefs {
  reducedMotion: boolean;
  isMobile: boolean;
  isTouch: boolean;
  enableDesktopFX: boolean;
}

const defaults: MotionPrefs = {
  reducedMotion: false,
  isMobile: false,
  isTouch: false,
  enableDesktopFX: false,
};

const MotionContext = createContext<MotionPrefs>(defaults);

export function MotionProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<MotionPrefs>(defaults);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const update = () => {
      const isMobile = mqMobile.matches;
      const reducedMotion = mqReduced.matches;
      setPrefs({
        reducedMotion,
        isMobile,
        isTouch,
        enableDesktopFX: !isMobile && !reducedMotion && !isTouch,
      });
    };

    update();
    mqMobile.addEventListener("change", update);
    mqReduced.addEventListener("change", update);
    return () => {
      mqMobile.removeEventListener("change", update);
      mqReduced.removeEventListener("change", update);
    };
  }, []);

  return <MotionContext.Provider value={prefs}>{children}</MotionContext.Provider>;
}

export function useMotionPrefs() {
  return useContext(MotionContext);
}

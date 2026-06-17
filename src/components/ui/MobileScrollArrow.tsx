"use client";

import { useEffect, useState } from "react";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { useLenisScroll } from "@/components/layout/SmoothScroll";

export default function MobileScrollArrow() {
  const { scrollTo, subscribeScroll } = useLenisScroll();
  const [atBottom, setAtBottom] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const checkPosition = (scrollY: number) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      setAtBottom(scrollY >= maxScroll - 100);
    };

    checkPosition(window.scrollY);
    return subscribeScroll(checkPosition);
  }, [isMobile, subscribeScroll]);

  if (!isMobile) return null;

  return (
    <button
      type="button"
      onClick={() => scrollTo(atBottom ? "#home" : "#contact")}
      aria-label={atBottom ? "Scroll to top" : "Scroll down"}
      className="fixed right-4 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur-xl transition-colors hover:border-neon-blue/40 hover:text-neon-cyan"
      style={{
        background: "rgba(10, 12, 24, 0.9)",
        boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {atBottom ? <HiArrowUp size={22} /> : <HiArrowDown size={22} />}
    </button>
  );
}

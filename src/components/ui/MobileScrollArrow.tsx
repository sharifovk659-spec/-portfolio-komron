"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    <motion.button
      type="button"
      onClick={() => scrollTo(atBottom ? "#home" : "#contact")}
      aria-label={atBottom ? "Scroll to top" : "Scroll down"}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: atBottom ? [0, -6, 0] : [0, 6, 0],
      }}
      transition={{
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
        y: { repeat: Infinity, duration: 1.8, ease: "easeInOut" },
      }}
      whileTap={{ scale: 0.92 }}
      className="fixed right-4 bottom-24 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 backdrop-blur-xl transition-colors hover:border-neon-blue/40 hover:text-neon-cyan"
      style={{
        background: "rgba(10, 12, 24, 0.9)",
        boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={atBottom ? "up" : "down"}
          initial={{ opacity: 0, rotate: atBottom ? -90 : 90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: atBottom ? 90 : -90 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {atBottom ? <HiArrowUp size={22} /> : <HiArrowDown size={22} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

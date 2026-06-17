"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "@/components/layout/SmoothScroll";

type ArrowDirection = "up" | "down";

const SIZE = 44;
const CX = 22;
const CY = 22;
const CIRCLE_R = 20;

const ARROW_PATH = {
  down: `M ${CX} 14 L ${CX} 26 L ${CX - 6} 21 L ${CX} 26 L ${CX + 6} 21`,
  up: `M ${CX} 30 L ${CX} 18 L ${CX - 6} 23 L ${CX} 18 L ${CX + 6} 23`,
} as const;

function ScrollArrowGraphic({ direction }: { direction: ArrowDirection }) {
  const path = ARROW_PATH[direction];

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden
      className="overflow-visible"
    >
      <circle
        cx={CX}
        cy={CY}
        r={CIRCLE_R}
        fill="rgba(10, 12, 24, 0.92)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />

      <path
        d={path}
        stroke="white"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.2}
      />

      <motion.path
        d={path}
        stroke="white"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: [0, 1, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function MobileScrollArrow() {
  const { scrollTo, subscribeScroll } = useLenisScroll();
  const [arrowDir, setArrowDir] = useState<ArrowDirection>("down");
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    lastScrollY.current = window.scrollY;

    const checkPosition = (scrollY: number) => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0,
      );
      const atBottom = scrollY >= maxScroll - 80;
      const atTop = scrollY <= 40;

      if (atBottom) {
        setArrowDir("up");
      } else if (atTop) {
        setArrowDir("down");
      } else if (scrollY > lastScrollY.current + 6) {
        setArrowDir("down");
      } else if (scrollY < lastScrollY.current - 6) {
        setArrowDir("up");
      }

      lastScrollY.current = scrollY;
    };

    checkPosition(window.scrollY);
    return subscribeScroll(checkPosition);
  }, [isMobile, subscribeScroll]);

  if (!isMobile) return null;

  const isUp = arrowDir === "up";

  return (
    <motion.button
      type="button"
      onClick={() => scrollTo(isUp ? "#home" : "#contact")}
      aria-label={isUp ? "Scroll to top" : "Scroll down"}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.92 }}
      className="fixed right-3 bottom-24 z-40 flex items-center justify-center"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        filter: "drop-shadow(0 0 14px rgba(0, 212, 255, 0.12))",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={arrowDir}
          initial={{ opacity: 0, y: isUp ? 4 : -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isUp ? -4 : 4 }}
          transition={{ duration: 0.2 }}
        >
          <ScrollArrowGraphic direction={arrowDir} />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

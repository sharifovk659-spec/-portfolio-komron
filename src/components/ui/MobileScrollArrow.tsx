"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "@/components/layout/SmoothScroll";

type ArrowDirection = "up" | "down";

const SIZE = 44;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 20;

function ScrollArrowGraphic({ direction }: { direction: ArrowDirection }) {
  const isUp = direction === "up";
  const arrowY1 = isUp ? CY - 5 : CY + 5;
  const arrowY2 = isUp ? CY + 5 : CY - 5;

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
        r={R}
        fill="rgba(10, 12, 24, 0.92)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1.5}
      />

      <motion.circle
        cx={CX}
        cy={CY}
        r={R}
        fill="none"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        transform={`rotate(-90 ${CX} ${CY})`}
        initial={{ pathLength: 0.08, opacity: 0.25 }}
        animate={{
          pathLength: [0.08, 1, 0.08],
          opacity: [0.25, 0.95, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.8,
          ease: "easeInOut",
        }}
      />

      <path
        d={`M ${CX} ${arrowY1} L ${CX} ${arrowY2} M ${CX - 5} ${CY} L ${CX} ${arrowY1} L ${CX + 5} ${CY}`}
        stroke="white"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity={0.85}
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <ScrollArrowGraphic direction={arrowDir} />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

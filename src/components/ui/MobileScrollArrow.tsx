"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "@/components/layout/SmoothScroll";

type ArrowDirection = "up" | "down";

const SEGMENT_COUNT = 6;
const SEGMENT_H = 4;
const SEGMENT_GAP = 4;
const STEM_HEIGHT = SEGMENT_COUNT * (SEGMENT_H + SEGMENT_GAP) - SEGMENT_GAP;
const CIRCLE_R = 20;
const CX = 22;
const GAP = 6;

function StemSegments({ direction }: { direction: ArrowDirection }) {
  const isUp = direction === "up";

  return (
    <>
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => {
        const order = isUp ? SEGMENT_COUNT - 1 - i : i;
        const y = order * (SEGMENT_H + SEGMENT_GAP);

        return (
          <motion.rect
            key={i}
            x={CX - 1}
            y={y}
            width={2}
            height={SEGMENT_H}
            rx={1}
            fill="white"
            animate={{ opacity: [0.15, 0.9, 0.15] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              delay: i * 0.13,
            }}
          />
        );
      })}
    </>
  );
}

function ScrollArrowGraphic({ direction }: { direction: ArrowDirection }) {
  const isUp = direction === "up";
  const circleCy = isUp ? CIRCLE_R + 2 : STEM_HEIGHT + GAP + CIRCLE_R + 2;
  const stemY = isUp ? circleCy + CIRCLE_R + GAP : 0;
  const totalH = isUp
    ? circleCy + CIRCLE_R + GAP + STEM_HEIGHT
    : STEM_HEIGHT + GAP + CIRCLE_R * 2 + 4;

  const arrowY1 = isUp ? circleCy - 5 : circleCy + 5;
  const arrowY2 = isUp ? circleCy + 5 : circleCy - 5;
  const wingY = circleCy;

  return (
    <svg
      width={44}
      height={totalH}
      viewBox={`0 0 44 ${totalH}`}
      aria-hidden
      className="overflow-visible"
    >
      <g transform={`translate(0 ${stemY})`}>
        <StemSegments direction={direction} />
      </g>

      <circle
        cx={CX}
        cy={circleCy}
        r={CIRCLE_R}
        fill="rgba(10, 12, 24, 0.92)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth={1}
      />

      <path
        d={
          isUp
            ? `M ${CX} ${arrowY1} L ${CX} ${arrowY2} M ${CX - 5} ${wingY} L ${CX} ${arrowY1} L ${CX + 5} ${wingY}`
            : `M ${CX} ${arrowY1} L ${CX} ${arrowY2} M ${CX - 5} ${wingY} L ${CX} ${arrowY1} L ${CX + 5} ${wingY}`
        }
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
      className="fixed right-3 bottom-24 z-40 flex items-center justify-center rounded-full transition-colors"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        filter: "drop-shadow(0 0 14px rgba(0, 212, 255, 0.12))",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={arrowDir}
          initial={{ opacity: 0, y: isUp ? 6 : -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isUp ? -6 : 6 }}
          transition={{ duration: 0.22 }}
        >
          <ScrollArrowGraphic direction={arrowDir} />
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

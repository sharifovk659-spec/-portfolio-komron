"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  glow?: "blue" | "purple" | "cyan" | "none";
}

const glowColors = {
  blue: "from-neon-blue/10 via-transparent to-transparent",
  purple: "from-transparent via-neon-purple/10 to-transparent",
  cyan: "from-neon-cyan/8 via-neon-blue/5 to-neon-purple/8",
  none: "",
};

export default function SectionWrapper({
  id,
  children,
  className = "",
  glow = "none",
}: SectionWrapperProps) {
  return (
    <section id={id} className={`relative section-padding ${className}`}>
      {glow !== "none" && (
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${glowColors[glow]}`}
          aria-hidden
        />
      )}

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="premium-section section-inner"
      >
        {children}
      </motion.div>
    </section>
  );
}

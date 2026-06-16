"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/ui/TextReveal";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
}

export default function SectionHeading({ subtitle, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center sm:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-blue/30 px-5 py-2 text-xs font-semibold tracking-[0.2em] text-neon-cyan uppercase"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(168,85,247,0.08))",
          boxShadow: "0 0 20px rgba(0,212,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00fff5]" />
        {subtitle}
      </motion.span>

      <TextReveal
        text={title}
        className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        highlightLast
      />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-5 max-w-2xl text-base text-white/55 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}

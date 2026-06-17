"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { personalInfo } from "@/lib/data";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${personalInfo.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="whatsapp-float fixed right-4 bottom-5 z-50 sm:right-8 sm:bottom-8"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <span className="whatsapp-float-ring" aria-hidden />
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="whatsapp-float-btn flex h-12 w-12 items-center justify-center rounded-full sm:h-16 sm:w-16"
      >
        <FaWhatsapp className="text-2xl text-white sm:text-4xl" />
      </motion.span>
    </a>
  );
}

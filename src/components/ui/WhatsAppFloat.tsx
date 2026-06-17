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
      className="whatsapp-float fixed bottom-6 left-1/2 z-50 -translate-x-1/2 sm:bottom-8 sm:left-auto sm:translate-x-0 sm:right-8"
    >
      <span className="whatsapp-float-ring" aria-hidden />
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="whatsapp-float-btn flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
      >
        <FaWhatsapp className="text-3xl text-white sm:text-4xl" />
      </motion.span>
    </a>
  );
}

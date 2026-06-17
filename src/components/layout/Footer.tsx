"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import BrandMark from "@/components/ui/BrandMark";

const socialIcons = [
  { href: personalInfo.social.github, icon: FaGithub, label: "GitHub" },
  { href: personalInfo.social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
  { href: personalInfo.social.instagram, icon: FaInstagram, label: "Instagram" },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative mt-8 border-t border-white/[0.06]"
      style={{ background: "linear-gradient(180deg, rgba(15,15,24,0.8), rgba(5,5,8,1))" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <BrandMark size="sm" />
          <div className="flex items-center justify-center gap-3">
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                className="premium-card flex h-11 w-11 items-center justify-center !p-0 text-white/55 hover:text-neon-cyan"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
          <p className="text-sm text-white/45">
            © {new Date().getFullYear()} {personalInfo.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

"use client";

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
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center sm:px-6 sm:py-12 lg:px-8">
        <BrandMark size="sm" />

        <div className="flex items-center gap-3">
          {socialIcons.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-social-icon flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <p className="text-xs text-white/40 sm:text-sm">
          © {new Date().getFullYear()} {personalInfo.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { locales } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all ${
            locale === code
              ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]"
              : "text-white/50 hover:text-white/80"
          }`}
          aria-label={`Switch to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

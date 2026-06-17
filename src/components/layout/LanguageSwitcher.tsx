"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { locales } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 p-1 sm:gap-1 sm:p-1.5"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {locales.map(({ code, label }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all sm:px-3.5 sm:text-sm ${
              active
                ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_14px_rgba(0,212,255,0.35)]"
                : "text-white/45 hover:text-white/75"
            }`}
            aria-label={`Switch to ${label}`}
            aria-current={active ? "true" : undefined}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

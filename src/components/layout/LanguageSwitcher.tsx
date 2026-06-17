"use client";

import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useLanguage } from "@/hooks/useLanguage";
import { locales, type Locale } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = locales.find((item) => item.code === locale) ?? locales[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple px-3 py-2 text-xs font-bold tracking-wide text-white shadow-[0_0_14px_rgba(0,212,255,0.35)] transition-all sm:px-3.5 sm:text-sm"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {active.label}
        <HiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={14} />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 z-50 mt-2 min-w-[88px] overflow-hidden rounded-xl border border-white/10 p-1 shadow-xl"
          style={{ background: "rgba(10, 12, 24, 0.98)" }}
          role="listbox"
        >
          {locales
            .filter((item) => item.code !== locale)
            .map(({ code, label }) => (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={false}
                onClick={() => handleSelect(code)}
                className="block w-full rounded-lg px-3 py-2 text-left text-xs font-bold tracking-wide text-white/60 transition-colors hover:bg-white/5 hover:text-white sm:text-sm"
              >
                {label}
              </button>
            ))}
        </div>
      )}
    </div>
  );
}

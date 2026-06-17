"use client";

import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useLanguage } from "@/hooks/useLanguage";
import { locales, type Locale } from "@/lib/i18n/translations";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active = locales.find((item) => item.code === locale) ?? locales[0];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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

  const buttonClass = (isActive: boolean) =>
    `rounded-lg px-3 py-2 text-xs font-bold tracking-wide transition-all sm:px-3.5 sm:text-sm ${
      isActive
        ? "bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-[0_0_14px_rgba(0,212,255,0.35)]"
        : "text-white/45 hover:bg-white/5 hover:text-white/75"
    }`;

  if (isDesktop) {
    return (
      <div ref={rootRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className={`${buttonClass(true)} flex items-center gap-1.5`}
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

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/10 p-1 sm:gap-1 sm:p-1.5"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => handleSelect(code)}
          className={buttonClass(locale === code)}
          aria-label={`Switch to ${label}`}
          aria-current={locale === code ? "true" : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

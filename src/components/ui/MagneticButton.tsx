"use client";

import { useRef, ReactNode, MouseEvent, CSSProperties } from "react";
import { useMotionPrefs } from "@/hooks/useMotionPrefs";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

function useMagnetic() {
  const ref = useRef<HTMLElement>(null);
  const { enableDesktopFX } = useMotionPrefs();

  const onMove = (e: MouseEvent) => {
    if (!enableDesktopFX || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return { ref, onMove, onLeave, enableDesktopFX };
}

export default function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
  type = "button",
  disabled,
}: MagneticProps) {
  const { ref, onMove, onLeave } = useMagnetic();
  const cls = `magnetic-btn will-change-transform ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={cls}
        style={style}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </button>
  );
}

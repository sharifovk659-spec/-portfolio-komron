import { personalInfo } from "@/lib/data";

type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
};

const sizes = {
  sm: {
    box: "h-9 w-9",
    icon: "text-sm",
    text: "text-base",
    gap: "gap-2",
  },
  md: {
    box: "h-10 w-10 sm:h-11 sm:w-11",
    icon: "text-base sm:text-lg",
    text: "text-lg sm:text-xl",
    gap: "gap-2.5 sm:gap-3",
  },
  lg: {
    box: "h-12 w-12 sm:h-14 sm:w-14",
    icon: "text-xl sm:text-2xl",
    text: "text-xl sm:text-2xl",
    gap: "gap-3",
  },
};

export default function BrandMark({ size = "md", showText = true, className = "" }: BrandMarkProps) {
  const s = sizes[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      <span
        className={`flex ${s.box} shrink-0 items-center justify-center rounded-lg font-bold text-white ${s.icon}`}
        style={{
          background: "linear-gradient(135deg, #00d4ff, #a855f7)",
          boxShadow: "0 4px 18px rgba(0,212,255,0.35), inset 0 1px 0 rgba(255,255,255,0.25)",
        }}
        aria-hidden
      >
        {"</>"}
      </span>
      {showText && (
        <span className={`font-display font-semibold whitespace-nowrap ${s.text}`}>
          <span className="text-white">{personalInfo.brandName}</span>
          <span className="gradient-text">{personalInfo.brandSuffix}</span>
        </span>
      )}
    </div>
  );
}

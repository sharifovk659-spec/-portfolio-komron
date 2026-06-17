import Image from "next/image";
import { personalInfo } from "@/lib/data";

type LogoProps = {
  size?: number;
  variant?: "icon" | "full";
  className?: string;
  priority?: boolean;
};

export default function Logo({
  size = 40,
  variant = "icon",
  className = "",
  priority = false,
}: LogoProps) {
  if (variant === "full") {
    return (
      <Image
        src={personalInfo.logo}
        alt={`${personalInfo.brandName}${personalInfo.brandSuffix}`}
        width={160}
        height={44}
        priority={priority}
        className={`h-8 w-auto object-contain sm:h-10 ${className}`}
      />
    );
  }

  return (
    <Image
      src={personalInfo.logo}
      alt={`${personalInfo.name} logo`}
      width={size}
      height={size}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}

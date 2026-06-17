import Image from "next/image";
import { personalInfo } from "@/lib/data";

type LogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function Logo({ size = 40, className = "", priority = false }: LogoProps) {
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

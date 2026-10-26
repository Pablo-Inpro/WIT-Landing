import Image from "next/image";

import { siteConfig } from "@/config/site";

type WitLogoProps = {
  variant?: "full" | "mark";
  tone?: "light" | "gold" | "color";
  className?: string;
  priority?: boolean;
};

const sources = {
  full: {
    light: siteConfig.brand.logoLight,
    color: siteConfig.brand.logoColor,
    gold: siteConfig.brand.appGold,
  },
  mark: {
    light: siteConfig.brand.markGold,
    color: siteConfig.brand.markGold,
    gold: siteConfig.brand.markGold,
  },
} as const;

export function WitLogo({
  variant = "full",
  tone = "light",
  className = "",
  priority = false,
}: WitLogoProps) {
  const src = sources[variant][tone];
  const size =
    variant === "mark"
      ? { width: 64, height: 64 }
      : { width: 280, height: 96 };

  return (
    <Image
      src={src}
      alt="WIT"
      width={size.width}
      height={size.height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}

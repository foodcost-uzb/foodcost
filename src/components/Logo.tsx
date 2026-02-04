"use client";

import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon" | "horizontal" | "dark";
}

export default function Logo({ className = "", size = "md", variant = "horizontal" }: LogoProps) {
  // Horizontal logo sizes (for header)
  const horizontalSizes = {
    sm: { width: 180, height: 53 },
    md: { width: 220, height: 64 },
    lg: { width: 280, height: 82 },
  };

  // Square logo sizes (full logo with text below)
  const fullSizes = {
    sm: { width: 120, height: 120 },
    md: { width: 160, height: 160 },
    lg: { width: 200, height: 200 },
  };

  // Icon only sizes
  const iconSizes = {
    sm: { width: 40, height: 40 },
    md: { width: 56, height: 56 },
    lg: { width: 72, height: 72 },
  };

  // Dark background logo (for footer)
  const darkSizes = {
    sm: { width: 100, height: 100 },
    md: { width: 140, height: 140 },
    lg: { width: 180, height: 180 },
  };

  if (variant === "icon") {
    const { width, height } = iconSizes[size];
    return (
      <Image
        src="/logo-icon.svg"
        alt="Food Cost"
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  if (variant === "dark") {
    const { width, height } = darkSizes[size];
    return (
      <Image
        src="/logo-dark.svg"
        alt="Food Cost - Управленческий учёт"
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  if (variant === "full") {
    const { width, height } = fullSizes[size];
    return (
      <Image
        src="/logo-full.svg"
        alt="Food Cost - Управленческий учёт"
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  // Default: horizontal logo
  const { width, height } = horizontalSizes[size];
  return (
    <Image
      src="/logo-horizontal.svg"
      alt="Food Cost - Управленческий учёт для ресторанов"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

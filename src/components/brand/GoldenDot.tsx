"use client";

import { forwardRef } from "react";

type GoldenDotProps = {
  className?: string;
  /** Match the logo mark’s gold point (~8–10px) */
  size?: number;
};

/**
 * Narrative connector — same visual language as the logo’s gold point.
 * Does not alter the official logo geometry.
 */
export const GoldenDot = forwardRef<HTMLDivElement, GoldenDotProps>(
  function GoldenDot({ className = "", size = 9 }, ref) {
    return (
      <div
        ref={ref}
        data-golden-dot
        className={`pointer-events-none absolute z-30 rounded-full ${className}`}
        style={{
          width: size,
          height: size,
          background: "#C0A153",
          boxShadow: "0 0 8px color-mix(in srgb, #C0A153 40%, transparent)",
        }}
        aria-hidden="true"
      />
    );
  },
);

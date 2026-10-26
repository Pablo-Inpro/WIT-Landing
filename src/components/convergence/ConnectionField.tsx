"use client";

import { forwardRef, useId } from "react";

type ConnectionFieldProps = {
  className?: string;
};

/**
 * Four Bézier paths — `d` attributes updated from ConvergenceStage
 * based on live panel/logo positions.
 */
export const ConnectionField = forwardRef<SVGSVGElement, ConnectionFieldProps>(
  function ConnectionField({ className = "" }, ref) {
    const uid = useId().replace(/:/g, "");

    return (
      <svg
        ref={ref}
        className={`pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-visible ${className}`}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        data-conv-connections
      >
        <defs>
          <linearGradient id={`cg-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C0A153" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#C0A153" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C0A153" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {[0, 1, 2, 3].map((index) => (
          <g key={index} data-conv-link-group={index}>
            <path
              data-conv-line={index}
              d="M 20 20 C 35 35, 45 45, 50 50"
              fill="none"
              stroke={`url(#cg-${uid})`}
              strokeWidth="0.4"
              strokeLinecap="round"
              opacity="0.55"
            />
            <circle
              data-conv-pulse={index}
              r="0.85"
              fill="#F5F4F0"
              opacity="0"
            />
          </g>
        ))}
      </svg>
    );
  },
);

"use client";

import {
  useRef,
  type HTMLAttributes,
  type ReactNode,
  type MouseEvent,
} from "react";

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  strength?: number;
};

/** Soft magnetic pull toward the cursor — disabled on coarse pointers. */
export function Magnetic({
  children,
  strength = 0.25,
  className = "",
  ...rest
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div
      ref={ref}
      className={`transition-micro inline-block will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {children}
    </div>
  );
}

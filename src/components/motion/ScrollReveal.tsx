"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getGsap } from "@/lib/gsap";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds after trigger */
  delay?: number;
  y?: number;
};

/**
 * Fade + rise on scroll via GSAP ScrollTrigger.
 * For one-off microinteractions, prefer CSS classes in animations.css.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

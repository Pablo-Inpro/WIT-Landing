"use client";

import { useRef } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { getGsap } from "@/lib/gsap";

type GsapSetup = () => void;

/**
 * Scoped GSAP context: animations created inside are reverted on unmount.
 * Attach the returned ref to the DOM root that scopes selectors/triggers.
 */
export function useGsapContext(
  setup: GsapSetup,
  deps: ReadonlyArray<unknown> = [],
) {
  const scopeRef = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const root = scopeRef.current;
    if (!root) return;

    const { gsap } = getGsap();
    const ctx = gsap.context(setup, root);

    return () => {
      ctx.revert();
    };
  }, deps);

  return scopeRef;
}

"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

import type { NucleusCategory } from "./nucleusGraph";
import { SceneCanvas } from "./SceneCanvas";

const NucleusCore = dynamic(
  () => import("./NucleusCore").then((mod) => mod.NucleusCore),
  { ssr: false },
);

type NucleusSceneProps = {
  className?: string;
  activeCategory: NucleusCategory | null;
};

export function NucleusScene({
  className = "",
  activeCategory,
}: NucleusSceneProps) {
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isCoarse = useMediaQuery("(pointer: coarse)");
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.08, rootMargin: "10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (isCoarse || reducedMotion) return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      setPointer({ x, y });
    },
    [isCoarse, reducedMotion],
  );

  const onPointerLeave = useCallback(() => {
    setPointer({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      data-nucleus-canvas
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <SceneCanvas
        className="aspect-square h-auto w-full max-h-[min(52vh,420px)] min-h-[220px] bg-transparent sm:max-h-[min(60vh,480px)] sm:min-h-[280px] md:max-h-[min(72vh,560px)] md:min-h-[420px] lg:min-h-[500px]"
        cameraPosition={[0, 0.15, isMobile ? 7.6 : 6.4]}
        fov={42}
        frameloop={visible ? "always" : "never"}
      >
        <NucleusCore
          activeCategory={activeCategory}
          reducedMotion={reducedMotion}
          simplified={isMobile}
          pointerInfluence={pointer}
        />
      </SceneCanvas>
    </div>
  );
}

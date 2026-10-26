"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";
import { Suspense } from "react";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  /** Pause render loop when false (offscreen). */
  frameloop?: "always" | "demand" | "never";
};

/**
 * Thin R3F wrapper. Transparent by default for page-atmosphere blending.
 */
export function SceneCanvas({
  children,
  className,
  cameraPosition = [0, 0, 5],
  fov = 45,
  frameloop = "always",
}: SceneCanvasProps) {
  return (
    <div className={`${className} bg-transparent`} style={{ background: "transparent" }}>
      <Canvas
        dpr={[1, 1.5]}
        frameloop={frameloop}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
        }}
        camera={{ position: cameraPosition, fov }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
        style={{ background: "transparent", backgroundColor: "transparent" }}
        className="!bg-transparent"
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

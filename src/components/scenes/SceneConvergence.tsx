"use client";

import { ConvergenceStage } from "@/components/convergence/ConvergenceStage";

import { SceneShell } from "./SceneShell";

export function SceneConvergence() {
  return (
    <SceneShell
      id="convergencia"
      className="relative z-10 overflow-hidden"
      aria-labelledby="conv-title"
    >
      <div className="container-page relative py-4">
        <ConvergenceStage />
      </div>
    </SceneShell>
  );
}

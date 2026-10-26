"use client";

import dynamic from "next/dynamic";

import { CtaLink } from "@/components/ui/CtaLink";
import { getProduct } from "@/config/products";

import { SceneShell } from "./SceneShell";

const NucleusScene = dynamic(
  () =>
    import("@/components/three/NucleusScene").then((mod) => mod.NucleusScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square max-h-[min(52vh,420px)] min-h-[220px] w-full items-center justify-center bg-transparent sm:min-h-[280px] md:max-h-[min(72vh,560px)] md:min-h-[420px]">
        <div className="size-28 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,#C0A153_35%,transparent)_0%,transparent_70%)] opacity-50 sm:size-40" />
      </div>
    ),
  },
);

const product = getProduct("info-nucleus");

export function SceneNucleus() {
  return (
    <SceneShell id={product.sceneId} aria-labelledby="nucleus-title">
      <div className="container-page grid items-center gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 xl:gap-10">
        <div data-nucleus-copy className="min-w-0">
          <p className="text-eyebrow text-gold">{product.name}</p>
          <h2
            id="nucleus-title"
            className="mt-4 font-display text-scene font-semibold text-ivory"
          >
            {product.subtitle}
          </h2>
          <p className="mt-5 max-w-md text-muted">{product.longDescription}</p>

          <div className="mt-6">
            <CtaLink product={product} />
          </div>
        </div>

        <NucleusScene
          className="w-full justify-self-center bg-transparent lg:justify-self-end"
          activeCategory={null}
        />
      </div>
    </SceneShell>
  );
}

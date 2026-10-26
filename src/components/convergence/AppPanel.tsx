"use client";

import type { ProductConfig } from "@/config/products";

import { PanelDemo } from "./panelDemos";

type AppPanelProps = {
  product: ProductConfig;
  index: number;
  className?: string;
};

export function AppPanel({ product, index, className = "" }: AppPanelProps) {
  return (
    <a
      href={`#${product.sceneId}`}
      className={`block w-[12.5rem] overflow-hidden rounded-xl border border-border/55 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--wit-bg-elevated)_88%,transparent),color-mix(in_srgb,var(--wit-bg)_92%,transparent))] p-3 shadow-[0_20px_50px_rgb(0_0_0_/_0.35),inset_0_1px_0_color-mix(in_srgb,var(--wit-ivory)_8%,transparent)] backdrop-blur-md transition-micro hover:border-gold/45 lg:w-[13.5rem] lg:p-3.5 ${className}`}
    >
      <div className="mb-2.5 overflow-hidden rounded-lg border border-border/35 bg-deep/55">
        <PanelDemo productId={product.id} />
      </div>
      <p className="text-label text-gold">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className="mt-1 font-display text-sm text-ivory lg:text-[0.95rem]">
        {product.name}
      </p>
    </a>
  );
}

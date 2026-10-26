"use client";

import { CallDemo } from "@/components/demos/CallDemo";
import { CtaLink } from "@/components/ui/CtaLink";
import { getProduct } from "@/config/products";

import { SceneShell } from "./SceneShell";

const product = getProduct("voice-receptor");

export function SceneVoice() {
  return (
    <SceneShell id={product.sceneId} aria-labelledby="voice-title">
      <div className="container-page grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div data-voice-copy className="min-w-0">
          <p className="text-eyebrow text-gold">{product.name}</p>
          <h2
            id="voice-title"
            className="mt-4 font-display text-scene font-semibold text-ivory"
          >
            {product.subtitle}
          </h2>
          <p className="mt-5 max-w-md text-sub text-muted">
            {product.shortDescription}
          </p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            {product.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-gold" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CtaLink product={product} />
          </div>
        </div>

        <div data-voice-demo>
          <CallDemo className="w-full" />
        </div>
      </div>
    </SceneShell>
  );
}

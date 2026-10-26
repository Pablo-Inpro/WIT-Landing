"use client";

import { DocumentDemo } from "@/components/demos/DocumentDemo";
import { CtaLink } from "@/components/ui/CtaLink";
import { getProduct } from "@/config/products";

import { SceneShell } from "./SceneShell";

const product = getProduct("document-studio");

export function SceneDocument() {
  return (
    <SceneShell id={product.sceneId} aria-labelledby="doc-title">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center" data-doc-copy>
          <p className="text-eyebrow text-gold">{product.name}</p>
          <h2
            id="doc-title"
            className="mt-4 font-display text-scene font-semibold text-ivory"
          >
            Menos trabajo manual.
            <span className="mt-2 block text-muted">Más tiempo para gestionar.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <DocumentDemo />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <CtaLink product={product} />
        </div>
      </div>
    </SceneShell>
  );
}

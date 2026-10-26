"use client";

import { DocumentDemo } from "@/components/demos/DocumentDemo";
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
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted sm:mt-5 sm:text-base">
            {product.shortDescription}
          </p>
        </div>

        <div className="mt-6 md:mt-16">
          <DocumentDemo />
        </div>
      </div>
    </SceneShell>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";

import type { ProductConfig } from "@/config/products";

import { Button } from "./Button";

type CtaLinkProps = {
  product: ProductConfig;
  className?: string;
};

/**
 * Uses product.url when available; otherwise scrolls to the product scene.
 * Never invents outbound destinations.
 */
export function CtaLink({ product, className = "" }: CtaLinkProps) {
  if (product.url) {
    return (
      <Button
        as="a"
        href={product.url}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        className={className}
      >
        {product.ctaLabel}
        <ArrowUpRight className="size-4" aria-hidden />
      </Button>
    );
  }

  return (
    <Button as="a" href={`#${product.sceneId}`} variant="secondary" className={className}>
      {product.ctaLabel}
    </Button>
  );
}

"use client";

import type { ProductConfig } from "@/config/products";

type EcosystemMapProps = {
  products: readonly ProductConfig[];
  className?: string;
  onSelect?: (sceneId: string) => void;
};

const positions = [
  { x: 50, y: 18 },
  { x: 82, y: 50 },
  { x: 50, y: 82 },
  { x: 18, y: 50 },
];

export function EcosystemMap({
  products,
  className = "",
  onSelect,
}: EcosystemMapProps) {
  return (
    <div className={`relative aspect-square w-full max-w-lg ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C0A153" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#C0A153" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="18" fill="url(#eco-core)" data-eco-glow />
        {positions.map((pos, index) => (
          <line
            key={index}
            x1="50"
            y1="50"
            x2={pos.x}
            y2={pos.y}
            stroke="#C0A153"
            strokeWidth="0.35"
            strokeOpacity="0.45"
            data-eco-line
          />
        ))}
        <circle
          cx="50"
          cy="50"
          r="3.2"
          fill="#C0A153"
          data-eco-core
          className="drop-shadow-[0_0_8px_#C0A153]"
        />
      </svg>

      {products.map((product, index) => {
        const pos = positions[index];
        if (!pos) return null;
        return (
          <button
            key={product.id}
            type="button"
            data-eco-module
            data-product={product.id}
            className="transition-micro absolute flex w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col items-start rounded-lg border border-border/70 bg-elevated/80 px-3 py-2.5 text-left backdrop-blur-sm hover:border-gold/40 hover:bg-elevated md:w-[38%] md:px-4 md:py-3"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => onSelect?.(product.sceneId)}
            onMouseMove={(event) => {
              const el = event.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              el.style.transform = `translate(-50%, -50%) translate(${x * 6}px, ${y * 6}px)`;
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = "translate(-50%, -50%)";
            }}
          >
            <span className="text-label text-gold">{String(index + 1).padStart(2, "0")}</span>
            <span className="mt-1 font-display text-sm text-ivory md:text-base">
              {product.name}
            </span>
            <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted md:text-xs">
              {product.shortDescription}
            </span>
          </button>
        );
      })}
    </div>
  );
}

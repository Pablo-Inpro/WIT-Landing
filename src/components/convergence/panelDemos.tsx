"use client";

import type { ProductId } from "@/config/products";

/** Compact looping demos for each product panel */
export function PanelDemo({ productId }: { productId: ProductId }) {
  if (productId === "voice-receptor") {
    return (
      <div className="space-y-2 p-2" aria-hidden>
        <div className="flex items-center gap-2">
          <span className="size-1.5 animate-soft-pulse rounded-full bg-gold" />
          <span className="text-[9px] uppercase tracking-wider text-stone">
            Llamada entrante
          </span>
        </div>
        <div className="flex h-8 items-end justify-center gap-0.5">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="w-0.5 rounded-full bg-gold/85"
              style={{
                height: `${28 + ((i * 19) % 60)}%`,
                animation: `conv-wave 1.15s ease-in-out ${i * 0.06}s infinite`,
              }}
            />
          ))}
        </div>
        <p className="line-clamp-2 text-[10px] leading-snug text-ivory/80">
          «Fuga de agua en el portal…»
        </p>
        <div className="rounded border border-gold/25 bg-gold/10 px-2 py-1 text-[9px] text-gold">
          Gestión · Urgente
        </div>
      </div>
    );
  }

  if (productId === "neighbor-assistant") {
    return (
      <div className="space-y-1.5 p-2" aria-hidden>
        <div className="ml-auto max-w-[90%] rounded-md rounded-br-sm bg-petroleum/50 px-2 py-1 text-[10px] leading-snug text-ivory/90">
          ¿Qué se aprobó sobre la fachada?
        </div>
        <div className="flex gap-1 px-0.5">
          <span className="size-1 rounded-full bg-stone animate-soft-pulse" />
          <span
            className="size-1 rounded-full bg-stone animate-soft-pulse"
            style={{ animationDelay: "0.15s" }}
          />
          <span
            className="size-1 rounded-full bg-stone animate-soft-pulse"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
        <div className="max-w-[95%] rounded-md rounded-bl-sm border border-border/50 bg-elevated/60 px-2 py-1 text-[10px] leading-snug text-ivory/85">
          Se aprobó la reparación con tope de 48.000 €.
        </div>
        <p className="text-[9px] text-gold/80">Acta 03/2025 · Punto 4</p>
      </div>
    );
  }

  if (productId === "document-studio") {
    return (
      <div className="space-y-1.5 p-2" aria-hidden>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[9px] uppercase tracking-wider text-gold">
            Acta · borrador
          </span>
          <span className="rounded border border-gold/30 px-1 py-0.5 text-[8px] text-gold">
            Revisión
          </span>
        </div>
        {["Lectura del acta", "Cuentas", "Fachada oeste"].map((item, i) => (
          <div
            key={item}
            className="flex gap-1.5 text-[10px] text-ivory/85"
            style={{
              animation: `conv-fade-line 4s ease-in-out ${i * 0.35}s infinite`,
            }}
          >
            <span className="font-mono text-[8px] text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="truncate">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // info-nucleus — compact
  return (
    <div className="relative flex h-[4.5rem] items-center justify-center" aria-hidden>
      <svg viewBox="0 0 80 80" className="h-full w-full opacity-90">
        <circle cx="40" cy="40" r="6" fill="#C0A153" opacity="0.85">
          <animate
            attributeName="opacity"
            values="0.55;0.95;0.55"
            dur="2.8s"
            repeatCount="indefinite"
          />
        </circle>
        {[
          [40, 14],
          [62, 32],
          [58, 58],
          [22, 58],
          [18, 28],
        ].map(([x, y], i) => (
          <g key={i}>
            <line
              x1="40"
              y1="40"
              x2={x}
              y2={y}
              stroke="#C0A153"
              strokeWidth="0.6"
              opacity="0.45"
            />
            <circle cx={x} cy={y} r="2.2" fill={i % 2 ? "#F5F4F0" : "#5C6B6A"}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 40 40`}
                to={`${i % 2 ? 360 : -360} 40 40`}
                dur={`${10 + i * 2}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

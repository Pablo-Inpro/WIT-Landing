"use client";

import Image from "next/image";

import { products } from "@/config/products";
import { siteConfig } from "@/config/site";

import { AppPanel } from "./AppPanel";

/** Symmetric corners around the center logo */
const SLOTS = [
  { place: "left-0 top-0 origin-top-left" },
  { place: "right-0 top-0 origin-top-right" },
  { place: "left-0 bottom-0 origin-bottom-left" },
  { place: "right-0 bottom-0 origin-bottom-right" },
] as const;

export function ConvergenceStage() {
  return (
    <div className="relative w-full">
      <header className="mx-auto max-w-2xl text-center md:max-w-3xl">
        <p className="text-eyebrow text-gold">07 / La convergencia</p>
        <h2
          id="conv-title"
          className="mt-3 font-display text-[clamp(1.5rem,3.2vw+0.4rem,2.85rem)] font-semibold leading-[1.15] tracking-tight text-balance text-ivory"
        >
          Diferentes soluciones.
          <span className="mt-1.5 block bg-[linear-gradient(120deg,#F5F4F0_20%,#C0A153_55%,#F5F4F0_90%)] bg-clip-text text-transparent">
            Una misma inteligencia.
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted md:text-base">
          Cuatro herramientas especializadas. Un ecosistema conectado.
        </p>
      </header>

      <div className="relative mx-auto mt-10 w-full max-w-5xl md:mt-12">
        {/* Desktop: symmetric 4 corners + center logo */}
        <div className="relative hidden min-h-[560px] md:block lg:min-h-[600px]">
          {/* Connection lines — geometric, symmetric */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="conv-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C0A153" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#C0A153" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#C0A153" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* TL → center */}
            <path
              d="M 18 22 C 30 30, 42 42, 50 50"
              fill="none"
              stroke="url(#conv-line-grad)"
              strokeWidth="0.35"
            />
            {/* TR → center */}
            <path
              d="M 82 22 C 70 30, 58 42, 50 50"
              fill="none"
              stroke="url(#conv-line-grad)"
              strokeWidth="0.35"
            />
            {/* BL → center */}
            <path
              d="M 18 78 C 30 70, 42 58, 50 50"
              fill="none"
              stroke="url(#conv-line-grad)"
              strokeWidth="0.35"
            />
            {/* BR → center */}
            <path
              d="M 82 78 C 70 70, 58 58, 50 50"
              fill="none"
              stroke="url(#conv-line-grad)"
              strokeWidth="0.35"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
            <div className="rounded-full border border-gold/25 bg-[#0B1114] px-7 py-5">
              <Image
                src={siteConfig.brand.logoLight}
                alt="WIT"
                width={220}
                height={76}
                className="h-auto w-36 opacity-95 lg:w-44"
              />
            </div>
          </div>

          <ul className="absolute inset-0" aria-label="Aplicaciones WIT">
            {products.map((product, index) => {
              const slot = SLOTS[index];
              if (!slot) return null;
              return (
                <li
                  key={product.id}
                  className={`absolute z-10 p-2 lg:p-3 ${slot.place}`}
                >
                  <AppPanel product={product} index={index} />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile: logo + stacked cards */}
        <div className="md:hidden">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-gold/25 bg-[#0B1114] px-5 py-3.5">
              <Image
                src={siteConfig.brand.logoLight}
                alt="WIT"
                width={180}
                height={62}
                className="h-auto w-24 opacity-95"
              />
            </div>
          </div>
          <ul
            className="mx-auto grid max-w-md grid-cols-2 gap-2.5 sm:gap-3"
            aria-label="Aplicaciones WIT"
          >
            {products.map((product, index) => (
              <li key={product.id} className="min-w-0">
                <AppPanel
                  product={product}
                  index={index}
                  className="w-full max-w-none"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

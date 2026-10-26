"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";

import { SceneShell } from "./SceneShell";

export function SceneAwakening() {
  return (
    <SceneShell
      id="inicio"
      className="justify-center overflow-hidden pt-[var(--header-h)] md:min-h-[100svh] md:overflow-visible"
      aria-labelledby="hero-title"
    >
      <div className="container-page relative flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center px-1 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-[38%] h-[min(70vmin,22rem)] w-[min(70vmin,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--wit-gold)_26%,transparent)_0%,transparent_72%)] md:h-[70vmin] md:w-[70vmin]"
          data-hero-glow
          aria-hidden
        />

        <div
          className="relative mb-8 md:mb-14"
          data-hero-logo
          style={{ perspective: "900px" }}
        >
          <Image
            src={siteConfig.brand.logoLight}
            alt="WIT"
            width={520}
            height={180}
            priority
            className="relative z-10 mx-auto h-auto w-[min(72vw,18rem)] opacity-95 md:w-[min(70vw,34rem)]"
            data-hero-logo-img
          />
        </div>

        <h1
          id="hero-title"
          data-hero-title
          className="font-display text-hero font-semibold text-ivory text-balance"
        >
          {siteConfig.tagline}
        </h1>
        <p
          data-hero-sub
          className="mt-4 max-w-xl text-pretty text-sub text-muted md:mt-6"
        >
          Un ecosistema inteligente. Una nueva forma de gestionar comunidades.
        </p>

        <a
          href="#ecosistema"
          data-hero-scroll
          className="transition-micro mt-10 inline-flex flex-col items-center gap-2 text-stone hover:text-gold md:mt-20"
        >
          <span className="text-label">Explorar</span>
          <ChevronDown className="size-5 animate-ambient-float" aria-hidden />
        </a>
      </div>
    </SceneShell>
  );
}

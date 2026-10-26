"use client";

import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { siteConfig } from "@/config/site";

import { SceneShell } from "./SceneShell";

export function SceneAwakening() {
  return (
    <SceneShell
      id="escena-despertar"
      className="justify-center overflow-visible pt-[var(--header-h)]"
      aria-labelledby="hero-title"
    >
      <div className="container-page relative flex min-h-[calc(100svh-var(--header-h))] flex-col items-center justify-center text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-[40%] h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--wit-gold)_26%,transparent)_0%,transparent_72%)]"
          data-hero-glow
          aria-hidden
        />

        <div
          className="relative mb-10 md:mb-14"
          data-hero-logo
          style={{ perspective: "900px" }}
        >
          <Image
            src={siteConfig.brand.logoLight}
            alt="WIT"
            width={520}
            height={180}
            priority
            className="relative z-10 mx-auto h-auto w-[min(78vw,28rem)] opacity-95 md:w-[min(70vw,34rem)]"
            data-hero-logo-img
          />
        </div>

        <h1
          id="hero-title"
          data-hero-title
          className="font-display text-hero font-semibold text-ivory"
        >
          {siteConfig.tagline}
        </h1>
        <p
          data-hero-sub
          className="mt-5 max-w-xl text-sub text-muted md:mt-6"
        >
          Un ecosistema inteligente. Una nueva forma de gestionar comunidades.
        </p>

        <a
          href="#escena-ecosistema"
          data-hero-scroll
          className="transition-micro mt-16 inline-flex flex-col items-center gap-2 text-stone hover:text-gold md:mt-20"
        >
          <span className="text-label">Explorar</span>
          <ChevronDown className="size-5 animate-ambient-float" aria-hidden />
        </a>
      </div>
    </SceneShell>
  );
}

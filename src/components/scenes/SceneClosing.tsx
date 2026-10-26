"use client";

import Image from "next/image";
import { useState } from "react";

import { DemoRequestModal } from "@/components/contact/DemoRequestModal";
import { WorkInProgressModal } from "@/components/contact/WorkInProgressModal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

import { SceneShell } from "./SceneShell";

export function SceneClosing() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [wipOpen, setWipOpen] = useState(false);

  return (
    <SceneShell
      id="demo"
      className="md:min-h-[90svh]"
      aria-labelledby="close-title"
    >
      <div className="container-page flex flex-col items-center py-6 text-center md:py-16">
        <Image
          src={siteConfig.brand.logoLight}
          alt=""
          width={180}
          height={62}
          className="mb-8 h-auto w-24 opacity-90 md:mb-10 md:w-36"
          data-close-logo
          aria-hidden
        />

        <h2
          id="close-title"
          data-close-title
          className="font-display text-scene font-semibold text-balance text-ivory"
        >
          El futuro de la gestión.
          <span className="mt-2 block">Todo conectado.</span>
        </h2>

        <p
          data-close-sub
          className="mt-5 max-w-lg text-pretty text-sub text-muted md:mt-6"
        >
          Descubre una nueva forma de trabajar, gestionar y comunicarte con
          tus comunidades.
        </p>

        <div
          data-close-ctas
          className="mt-8 flex w-full max-w-xl flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-8"
        >
          <Magnetic className="block w-full flex-1 sm:max-w-[17.5rem]">
            {siteConfig.demoRequestUrl ? (
              <Button
                as="a"
                href={siteConfig.demoRequestUrl}
                variant="primary"
                className="w-full"
              >
                Contacta con nosotros
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                className="w-full"
                onClick={() => setDemoOpen(true)}
              >
                Contacta con nosotros
              </Button>
            )}
          </Magnetic>
          <Magnetic className="block w-full flex-1 sm:max-w-[17.5rem]" strength={0.18}>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => setWipOpen(true)}
            >
              Prueba nuestra DEMO
            </Button>
          </Magnetic>
        </div>
      </div>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <WorkInProgressModal open={wipOpen} onClose={() => setWipOpen(false)} />
    </SceneShell>
  );
}

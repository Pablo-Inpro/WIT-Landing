"use client";

import { SceneShell } from "./SceneShell";

export function SceneEcosystem() {
  return (
    <SceneShell id="ecosistema" aria-labelledby="eco-title">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center" data-eco-copy>
          <p className="text-eyebrow text-gold">El ecosistema</p>
          <h2
            id="eco-title"
            className="mt-3 font-display text-scene font-semibold text-ivory md:mt-4"
          >
            Una misma inteligencia.
            <span className="mt-2 block text-muted">Múltiples soluciones.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted md:mt-6 md:text-base">
            Desde la llamada del vecino hasta el acta de la junta, WIT ofrece
            aplicaciones especializadas pensadas para el día a día de la
            administración de fincas.
          </p>
        </div>
      </div>
    </SceneShell>
  );
}

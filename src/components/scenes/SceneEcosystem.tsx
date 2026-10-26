"use client";

import { SceneShell } from "./SceneShell";

export function SceneEcosystem() {
  return (
    <SceneShell id="escena-ecosistema" aria-labelledby="eco-title">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center" data-eco-copy>
          <p className="text-eyebrow text-gold">El ecosistema</p>
          <h2
            id="eco-title"
            className="mt-4 font-display text-scene font-semibold text-ivory"
          >
            Una misma inteligencia.
            <span className="mt-2 block text-muted">Múltiples soluciones.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-muted">
            Desde la llamada del vecino hasta el acta de la junta, WIT ofrece
            aplicaciones especializadas pensadas para el día a día de la
            administración de fincas.
          </p>
        </div>
      </div>
    </SceneShell>
  );
}

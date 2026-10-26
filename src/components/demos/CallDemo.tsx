"use client";

import { Phone } from "lucide-react";

import { voiceDemo } from "@/config/demos";

type CallDemoProps = {
  className?: string;
};

export function CallDemo({ className = "" }: CallDemoProps) {
  return (
    <div className={`demo-panel overflow-hidden ${className}`} data-demo="call">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3 md:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-petroleum/40 text-gold">
            <Phone className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-medium text-ivory">{voiceDemo.caller}</p>
            <p className="text-xs text-muted">{voiceDemo.status}</p>
          </div>
        </div>
        <span className="demo-badge">
          <span className="size-1.5 rounded-full bg-gold animate-soft-pulse" />
          En vivo · demo
        </span>
      </div>

      <div className="grid gap-5 p-4 md:grid-cols-[1fr_1.1fr] md:p-5">
        <div
          className="relative h-28 overflow-hidden rounded-md bg-deep/80 md:h-36"
          data-call-wave
          aria-hidden
        >
          <svg
            className="voice-wave-svg absolute inset-0 h-full w-full text-gold"
            viewBox="0 0 240 64"
            preserveAspectRatio="none"
          >
            <path
              className="voice-wave-line"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              d="M-72 32 C-60 18 -48 18 -36 32 S-12 46 0 32 S24 18 36 32 S60 46 72 32 S96 18 108 32 S132 46 144 32 S168 18 180 32 S204 46 216 32 S240 18 252 32 S276 46 288 32 S312 18 324 32"
            >
              <animate
                attributeName="d"
                dur="2.8s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                values="
M-72 32 C-60 18 -48 18 -36 32 S-12 46 0 32 S24 18 36 32 S60 46 72 32 S96 18 108 32 S132 46 144 32 S168 18 180 32 S204 46 216 32 S240 18 252 32 S276 46 288 32 S312 18 324 32;
M-72 32 C-60 44 -48 44 -36 32 S-12 20 0 32 S24 44 36 32 S60 20 72 32 S96 44 108 32 S132 20 144 32 S168 44 180 32 S204 20 216 32 S240 44 252 32 S276 20 288 32 S312 44 324 32;
M-72 32 C-60 18 -48 18 -36 32 S-12 46 0 32 S24 18 36 32 S60 46 72 32 S96 18 108 32 S132 46 144 32 S168 18 180 32 S204 46 216 32 S240 18 252 32 S276 46 288 32 S312 18 324 32"
              />
            </path>
            <path
              className="voice-wave-line voice-wave-line--soft"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
              strokeOpacity="0.45"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              d="M-70 32 C-58 24 -46 40 -34 32 S-10 24 2 32 S26 40 38 32 S62 24 74 32 S98 40 110 32 S134 24 146 32 S170 40 182 32 S206 24 218 32 S242 40 254 32 S278 24 290 32 S314 40 326 32"
            >
              <animate
                attributeName="d"
                dur="3.4s"
                begin="0.35s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                values="
M-70 32 C-58 24 -46 40 -34 32 S-10 24 2 32 S26 40 38 32 S62 24 74 32 S98 40 110 32 S134 24 146 32 S170 40 182 32 S206 24 218 32 S242 40 254 32 S278 24 290 32 S314 40 326 32;
M-70 32 C-58 40 -46 24 -34 32 S-10 40 2 32 S26 24 38 32 S62 40 74 32 S98 24 110 32 S134 40 146 32 S170 24 182 32 S206 40 218 32 S242 24 254 32 S278 40 290 32 S314 24 326 32;
M-70 32 C-58 24 -46 40 -34 32 S-10 24 2 32 S26 40 38 32 S62 24 74 32 S98 40 110 32 S134 24 146 32 S170 40 182 32 S206 24 218 32 S242 40 254 32 S278 24 290 32 S314 40 326 32"
              />
            </path>
            <path
              className="voice-wave-line voice-wave-line--faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.9"
              strokeOpacity="0.25"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              d="M-70 32 C-56 28 -42 36 -28 32 S0 28 14 32 S42 36 56 32 S84 28 98 32 S126 36 140 32 S168 28 182 32 S210 36 224 32 S252 28 266 32 S294 36 308 32 S322 28 336 32"
            >
              <animate
                attributeName="d"
                dur="4.1s"
                begin="0.55s"
                repeatCount="indefinite"
                calcMode="spline"
                keyTimes="0;0.5;1"
                keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
                values="
M-70 32 C-56 28 -42 36 -28 32 S0 28 14 32 S42 36 56 32 S84 28 98 32 S126 36 140 32 S168 28 182 32 S210 36 224 32 S252 28 266 32 S294 36 308 32 S322 28 336 32;
M-70 32 C-56 36 -42 28 -28 32 S0 36 14 32 S42 28 56 32 S84 36 98 32 S126 28 140 32 S168 36 182 32 S210 28 224 32 S252 36 266 32 S294 28 308 32 S322 36 336 32;
M-70 32 C-56 28 -42 36 -28 32 S0 28 14 32 S42 36 56 32 S84 28 98 32 S126 36 140 32 S168 28 182 32 S210 36 224 32 S252 28 266 32 S294 36 308 32 S322 28 336 32"
              />
            </path>
          </svg>
        </div>

        <div className="flex flex-col gap-2.5" data-call-transcript>
          {voiceDemo.transcript.map((line) => {
            const isClara = line.role !== "neighbor";

            return (
              <div
                key={line.text}
                data-call-line
                className={`max-w-[92%] px-3 py-2 text-sm leading-relaxed md:max-w-[85%] ${
                  isClara
                    ? "ml-auto rounded-2xl rounded-br-md border border-gold/25 bg-petroleum/45 text-ivory/95"
                    : "rounded-2xl rounded-bl-md bg-elevated text-ivory"
                }`}
              >
                <p
                  className={`mb-1 text-[10px] uppercase tracking-wider ${
                    isClara ? "text-gold/80" : "text-stone"
                  }`}
                >
                  {isClara ? "CLARA" : "Vecino"}
                </p>
                {line.text}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="border-t border-border/60 bg-surface/40 px-4 py-4 md:px-5"
        data-call-ticket
      >
        <p className="text-label text-gold">Gestión creada</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div>
            <p className="text-xs text-stone">Motivo</p>
            <p className="text-sm text-ivory">{voiceDemo.ticket.title}</p>
          </div>
          <div>
            <p className="text-xs text-stone">Prioridad</p>
            <p className="text-sm text-gold">{voiceDemo.ticket.priority}</p>
          </div>
          <div>
            <p className="text-xs text-stone">Estado</p>
            <p className="text-sm text-ivory">{voiceDemo.ticket.status}</p>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted">{voiceDemo.ticket.summary}</p>
      </div>
    </div>
  );
}

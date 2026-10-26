"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";

type WorkInProgressModalProps = {
  open: boolean;
  onClose: () => void;
};

export function WorkInProgressModal({ open, onClose }: WorkInProgressModalProps) {
  const titleId = useId();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-[var(--gutter)] py-8"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-deep/80 backdrop-blur-sm"
        aria-label="Cerrar"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="demo-panel relative z-10 w-full max-w-md p-5 text-center md:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1.5 text-muted transition-micro hover:bg-surface hover:text-ivory"
          aria-label="Cerrar"
        >
          <X className="size-5" aria-hidden />
        </button>

        <p className="text-eyebrow text-gold">DEMO</p>
        <h2
          id={titleId}
          className="mt-3 font-display text-2xl font-semibold text-ivory md:text-[1.75rem]"
        >
          Próximamente disponible
        </h2>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          La demostración interactiva estará lista en breve. Mientras tanto,
          puede explorar el ecosistema o ponerse en contacto con nosotros.
        </p>

        <div className="mt-8 flex justify-center">
          <Button type="button" variant="primary" onClick={onClose}>
            Entendido
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

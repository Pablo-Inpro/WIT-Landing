"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { Button } from "@/components/ui/Button";

type DemoRequestModalProps = {
    open: boolean;
    onClose: () => void;
};

type FormState = {
    name: string;
    email: string;
    phone: string;
    message: string;
};

const initialForm: FormState = {
    name: "",
    email: "",
    phone: "",
    message: "",
};

export function DemoRequestModal({ open, onClose }: DemoRequestModalProps) {
    const titleId = useId();
    const panelRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);
    const [form, setForm] = useState<FormState>(initialForm);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
        "idle",
    );
    const [errorMessage, setErrorMessage] = useState("");

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

    useEffect(() => {
        if (!open) {
            setForm(initialForm);
            setStatus("idle");
            setErrorMessage("");
        }
    }, [open]);

    const update =
        (field: keyof FormState) =>
            (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                setForm((current) => ({ ...current, [field]: event.target.value }));
            };

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = (await response.json()) as { error?: string };

            if (!response.ok) {
                setStatus("error");
                setErrorMessage(data.error ?? "No se pudo enviar el mensaje.");
                return;
            }

            setStatus("success");
        } catch {
            setStatus("error");
            setErrorMessage("No se pudo enviar el mensaje. Inténtalo más tarde.");
        }
    }

    const fieldClass =
        "mt-1.5 w-full rounded-md border border-border bg-deep/70 px-3 py-2.5 text-sm text-ivory outline-none transition-micro placeholder:text-stone focus:border-gold/50";

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
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="demo-panel relative z-10 my-auto w-full max-w-lg p-5 md:p-6"
            >
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-label text-gold">Contacto</p>
                        <h2
                            id={titleId}
                            className="mt-2 font-display text-xl font-semibold text-ivory md:text-2xl"
                        >
                            Solicitar una demostración
                        </h2>
                        <p className="mt-2 text-sm text-muted">
                            Déjanos tus datos y te contactamos.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1.5 text-muted transition-micro hover:bg-surface hover:text-ivory"
                        aria-label="Cerrar formulario"
                    >
                        <X className="size-5" aria-hidden />
                    </button>
                </div>

                {status === "success" ? (
                    <div className="mt-8 space-y-5">
                        <p className="text-sm leading-relaxed text-ivory/90">
                            Mensaje enviado. Te responderemos lo antes posible.
                        </p>
                        <Button type="button" variant="primary" onClick={onClose}>
                            Cerrar
                        </Button>
                    </div>
                ) : (
                    <form className="mt-6 space-y-4" onSubmit={onSubmit}>
                        <label className="block text-sm text-stone">
                            Nombre y apellidos{" "}
                            <span className="text-gold" aria-hidden>
                                *
                            </span>
                            <input
                                required
                                name="name"
                                autoComplete="name"
                                maxLength={120}
                                value={form.name}
                                onChange={update("name")}
                                className={fieldClass}
                            />
                        </label>

                        <label className="block text-sm text-stone">
                            Correo{" "}
                            <span className="text-gold" aria-hidden>
                                *
                            </span>
                            <input
                                required
                                type="email"
                                name="email"
                                autoComplete="email"
                                maxLength={200}
                                value={form.email}
                                onChange={update("email")}
                                className={fieldClass}
                            />
                        </label>

                        <label className="block text-sm text-stone">
                            Teléfono
                            <input
                                type="tel"
                                name="phone"
                                autoComplete="tel"
                                maxLength={40}
                                value={form.phone}
                                onChange={update("phone")}
                                className={fieldClass}
                            />
                        </label>

                        <label className="block text-sm text-stone">
                            Comentario{" "}
                            <span className="text-gold" aria-hidden>
                                *
                            </span>
                            <textarea
                                required
                                name="message"
                                rows={4}
                                maxLength={2000}
                                value={form.message}
                                onChange={update("message")}
                                className={`${fieldClass} resize-y`}
                            />
                        </label>

                        {status === "error" ? (
                            <p className="text-sm text-gold" role="alert">
                                {errorMessage}
                            </p>
                        ) : null}

                        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                            <Button type="button" variant="secondary" onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button type="submit" variant="primary" disabled={status === "loading"}>
                                {status === "loading" ? "Enviando…" : "Enviar"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>,
        document.body,
    );
}
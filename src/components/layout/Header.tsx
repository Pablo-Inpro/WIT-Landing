"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { products } from "@/config/products";
import { siteConfig } from "@/config/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "inline-flex h-8 items-center transition-micro text-sm leading-none text-muted hover:text-ivory focus-visible:text-ivory";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,height] duration-300 ${
        scrolled || open
          ? "border-b border-border/40 bg-[color-mix(in_srgb,var(--wit-bg)_78%,transparent)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-6">
        <a href="#escena-despertar" className="relative z-10 flex items-center gap-2">
          <Image
            src={siteConfig.brand.logoLight}
            alt="WIT"
            width={120}
            height={40}
            priority
            className="h-7 w-auto md:h-8"
          />
        </a>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Principal"
        >
          <a href="#escena-ecosistema" className={linkClass}>
            Ecosistema
          </a>
          <div className="group relative inline-flex h-8 items-center">
            <button
              type="button"
              className={`${linkClass} border-0 bg-transparent p-0 font-inherit`}
              aria-haspopup="true"
            >
              Aplicaciones
            </button>
            <div className="invisible absolute left-1/2 top-full z-20 w-64 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="rounded-lg border border-border bg-elevated/95 p-2 shadow-soft backdrop-blur-md">
                {products.map((product) => (
                  <a
                    key={product.id}
                    href={`#${product.sceneId}`}
                    className="block rounded-md px-3 py-2 text-sm text-muted hover:bg-surface hover:text-ivory"
                  >
                    {product.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="#escena-cierre" className={linkClass}>
            DEMO
          </a>
        </nav>

        <button
          type="button"
          className="relative z-10 inline-flex size-10 items-center justify-center rounded-md text-ivory md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border/40 bg-deep/95 px-[var(--gutter)] py-6 md:hidden"
          aria-label="Móvil"
        >
          <ul className="flex flex-col gap-4">
            <li>
              <a
                href="#escena-ecosistema"
                className="text-lg text-ivory"
                onClick={() => setOpen(false)}
              >
                Ecosistema
              </a>
            </li>
            {products.map((product) => (
              <li key={product.id}>
                <a
                  href={`#${product.sceneId}`}
                  className="text-muted"
                  onClick={() => setOpen(false)}
                >
                  {product.name}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#escena-cierre"
                className="text-gold"
                onClick={() => setOpen(false)}
              >
                Cierre
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

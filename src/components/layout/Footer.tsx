import Image from "next/image";

import { products } from "@/config/products";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/30 bg-transparent py-10 md:py-16">
      <div className="container-page grid gap-8 sm:grid-cols-2 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10">
        <div>
          <Image
            src={siteConfig.brand.logoLight}
            alt="WIT"
            width={100}
            height={34}
            className="h-7 w-auto opacity-90"
          />
          <p className="mt-4 max-w-sm text-sm text-muted">
            {siteConfig.tagline} Un ecosistema inteligente para comunidades de
            propietarios.
          </p>
        </div>

        <div>
          <p className="text-label text-stone">Aplicaciones</p>
          <ul className="mt-4 space-y-2">
            {products.map((product) => (
              <li key={product.id}>
                <a
                  href={`#${product.sceneId}`}
                  className="transition-micro text-sm text-muted hover:text-ivory"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-label text-stone">Navegación</p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a href="#inicio" className="hover:text-ivory">
                Inicio
              </a>
            </li>
            <li>
              <a href="#ecosistema" className="hover:text-ivory">
                Ecosistema
              </a>
            </li>
            <li>
              <a href="#convergencia" className="hover:text-ivory">
                Convergencia
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page mt-12 flex flex-col gap-2 border-t border-border/40 pt-6 text-xs text-stone md:flex-row md:justify-between">
        <span>© 2026 WIT</span>
        <span>Todos los derechos reservados — INPRO Solutions</span>
      </div>
    </footer>
  );
}

/**
 * Site-wide configuration. Edit URLs and CTAs here — do not invent destinations.
 */

export const siteConfig = {
  name: "WIT",
  tagline: "Todo conecta.",
  description:
    "WIT es un ecosistema inteligente de aplicaciones para la gestión de comunidades de propietarios y la administración de fincas.",
  locale: "es",
  /** Set when an official production URL exists. Leave null until then. */
  canonicalUrl: null as string | null,
  /** Primary commercial CTA. null = show the button without a destination. */
  demoRequestUrl: null as string | null,
  contactEmail: "dev@inpro.es" as string | null,
  social: {
    linkedin: null as string | null,
    x: null as string | null,
  },
  brand: {
    logoLight: "/brand/logo-blanco.png",
    logoColor: "/brand/logo-verde.png",
    markGold: "/brand/W-Dorada.png",
    markDark: "/brand/W-Negra.png",
    appGold: "/brand/app-dorado.png",
    appLight: "/brand/app-blanco.png",
    appNegative: "/brand/app-negativo.png",
    appDefault: "/brand/APP.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;

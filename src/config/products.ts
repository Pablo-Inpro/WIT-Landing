/**
 * Central product configuration for the WIT ecosystem.
 * Commercial names may change — edit here only.
 */

export type ProductAvailability = "available" | "coming_soon" | "preview";

export type ProductId =
  | "voice-receptor"
  | "neighbor-assistant"
  | "document-studio"
  | "info-nucleus";

export type ProductConfig = {
  id: ProductId;
  /** Scene anchor id for in-page navigation */
  sceneId: string;
  /** Provisional commercial label — replace when definitive */
  name: string;
  descriptiveName: string;
  subtitle: string;
  shortDescription: string;
  longDescription: string;
  features: readonly string[];
  ctaLabel: string;
  /** External product URL. null = no outbound link (use in-page CTA). */
  url: string | null;
  availability: ProductAvailability;
  accent: string;
  sceneTint: string;
  visual: {
    icon: "phone" | "message" | "file" | "network";
    demoLabel: string;
  };
};

export const products: readonly ProductConfig[] = [
  {
    id: "voice-receptor",
    sceneId: "conecta",
    name: "WIT Conecta",
    descriptiveName: "WIT Conecta — receptor inteligente de llamadas",
    subtitle: "Cada llamada importa.",
    shortDescription:
      "Una voz inteligente que escucha, comprende y organiza cada solicitud.",
    longDescription:
      "Agente de voz basado en inteligencia artificial que atiende llamadas dirigidas a administradores de fincas, conversa con los vecinos y organiza incidencias, consultas y gestiones administrativas.",
    features: [
      "Registro de incidencias y gestiones",
      "Atención de llamadas entrantes",
      "Identificación de urgencias",
      "Atención 24/7",
      "Organización para el administrador",
    ],
    ctaLabel: "Descubrir WIT Conecta",
    url: null,
    availability: "preview",
    accent: "#C0A153",
    sceneTint: "#1a1410",
    visual: {
      icon: "phone",
      demoLabel: "Demostración local — sin llamadas reales",
    },
  },
  {
    id: "neighbor-assistant",
    sceneId: "guia",
    name: "WIT Guía",
    descriptiveName: "WIT Guía — asistente inteligente para vecinos",
    subtitle: "Respuestas cuando las necesitas.",
    shortDescription:
      "La información de tu comunidad, a través de una conversación.",
    longDescription:
      "Inteligencia artificial conversacional especializada en comunidades de propietarios: normativa, actas, acuerdos, documentación e información administrativa autorizada.",
    features: [
      "Consultas generales sobre propiedad horizontal",
      "Consulta histórico de actas y acuerdos",
      "Tarificación de seguros personales",
      "Información administrativa",
      "Documentación de la comunidad",
    ],
    ctaLabel: "Descubrir WIT Guía",
    url: null,
    availability: "preview",
    accent: "#5C6B6A",
    sceneTint: "#0a1a19",
    visual: {
      icon: "message",
      demoLabel: "Ejemplo ficticio — respuesta local",
    },
  },
  {
    id: "document-studio",
    sceneId: "actas",
    name: "WIT Actas",
    descriptiveName: "WIT Actas — generación inteligente de convocatorias y actas",
    subtitle: "Menos trabajo manual. Más tiempo para gestionar.",
    shortDescription:
      "Transforma información de juntas en documentación estructurada lista para enviar gracias a Cenith.",
    longDescription:
      "Herramienta que simplifica convocatorias, órdenes del día y borradores de actas. Organiza asuntos y acuerdos; el administrador siempre revisa antes de aprobar.",
    features: [
      "Elaboración de convocatorias",
      "Órdenes del día organizados",
      "Borradores de actas estructurados",
      "Desarrollo de acuerdos",
      "Automatización de tareas repetitivas",
    ],
    ctaLabel: "Descubrir WIT Actas",
    url: null,
    availability: "preview",
    accent: "#F5F4F0",
    sceneTint: "#12110e",
    visual: {
      icon: "file",
      demoLabel: "Simulación — borrador pendiente de revisión",
    },
  },
  {
    id: "info-nucleus",
    sceneId: "nucleo",
    name: "WIT Núcleo",
    descriptiveName: "WIT Núcleo — núcleo central de información",
    subtitle: "La información que lo conecta todo.",
    shortDescription:
      "La infraestructura de datos que alimenta al resto del ecosistema WIT.",
    longDescription:
      "Organiza comunidades, propiedades, propietarios, documentación, datos económicos y gestiones para que las herramientas autorizadas utilicen la información correspondiente.",
    features: [
      "Comunidades y propiedades",
      "Propietarios y vecinos",
      "Documentación comunitaria",
      "Datos económicos autorizados",
      "Gestiones e información relevante",
    ],
    ctaLabel: "Conocer WIT Núcleo",
    url: null,
    availability: "preview",
    accent: "#003F3E",
    sceneTint: "#060d0f",
    visual: {
      icon: "network",
      demoLabel: "Representación conceptual — acceso restringido",
    },
  },
] as const;

export function getProduct(id: ProductId): ProductConfig {
  const product = products.find((item) => item.id === id);
  if (!product) {
    throw new Error(`Unknown product: ${id}`);
  }
  return product;
}

export const scenes = [
  { id: "inicio", label: "01", title: "El despertar" },
  { id: "ecosistema", label: "02", title: "El ecosistema" },
  { id: "conecta", label: "03", title: "La voz" },
  { id: "guia", label: "04", title: "La conversación" },
  { id: "actas", label: "05", title: "El documento" },
  { id: "nucleo", label: "06", title: "El núcleo" },
  { id: "convergencia", label: "07", title: "La convergencia" },
  { id: "demo", label: "08", title: "El cierre" },
] as const;

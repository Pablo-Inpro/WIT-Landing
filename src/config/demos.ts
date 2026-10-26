/**
 * Local fictional demo content. Not connected to any AI or telephony service.
 */

export const voiceDemo = {
  caller: "Vecino — Portal A",
  status: "En curso",
  transcript: [
    {
      role: "neighbor" as const,
      text: "Hola, hay una fuga de agua en el portal y está saliendo bastante agua.",
    },
    {
      role: "assistant" as const,
      text: "Entendido. Voy a registrar el aviso como urgente para que puedan gestionarlo.",
    },
  ],
  ticket: {
    title: "Fuga de agua — Portal A",
    category: "Mantenimiento",
    priority: "Urgente",
    status: "Pendiente de revisión",
    summary:
      "Aviso de fuga en portal con salida abundante de agua. Gestión creada para el administrador.",
  },
} as const;

export const chatDemo = {
  community: "Comunidad Ejemplo — C/ Mayor 12",
  messages: [
    {
      role: "user" as const,
      text: "¿Qué se aprobó en la última junta sobre la reparación de la fachada?",
    },
    {
      role: "assistant" as const,
      text: "En la junta ordinaria del 14 de marzo se aprobó iniciar la reparación de la fachada oeste con un presupuesto máximo de 48.000 €, adjudicando la obra a la empresa seleccionada por la comisión de obras.",
    },
  ],
  document: {
    title: "Acta — Junta ordinaria 14/03/2025",
    reference: "Acta nº 03/2025 · Punto 4",
    excerpt:
      "Se aprueba por mayoría la reparación de la fachada oeste…",
    badge: "Ejemplo ficticio",
  },
} as const;

export const documentDemo = {
  meetingType: "Junta ordinaria",
  agenda: [
    "Lectura y aprobación del acta anterior",
    "Estado de cuentas del ejercicio",
    "Reparación de fachada oeste",
    "Renovación del contrato de limpieza",
    "Ruegos y preguntas",
  ],
  decisions: [
    {
      topic: "Reparación de fachada oeste",
      agreement:
        "Se aprueba iniciar las obras con presupuesto máximo de 48.000 €.",
    },
    {
      topic: "Contrato de limpieza",
      agreement:
        "Se renueva el contrato vigente por un periodo adicional de un año.",
    },
  ],
  draftStatus: "Borrador pendiente de revisión",
} as const;

export const nucleusDemo = {
  nodes: [
    { id: "communities", label: "Comunidades", group: "core" },
    { id: "owners", label: "Propietarios", group: "people" },
    { id: "docs", label: "Documentos", group: "data" },
    { id: "tickets", label: "Gestiones", group: "ops" },
    { id: "apps", label: "Aplicaciones", group: "apps" },
  ],
} as const;

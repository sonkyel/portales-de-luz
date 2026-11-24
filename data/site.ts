// =============================================================
// CONDOMINIO PORTALES DE LUZ — Yanahuara, Arequipa
// Todo el contenido de la página sale de este archivo.
// Fuente: brochure "PORTALEZ DE LUZ 2026.pdf" (carpeta /brochure).
// Para actualizar disponibilidad o precios, edita solo aquí.
// =============================================================

export const site = {
  name: "Portales de Luz",
  fullName: "Condominio Portales de Luz",
  district: "Yanahuara",
  city: "Arequipa",
  url: "https://portales-de-luz.vercel.app", // TODO: cambiar si se compra un dominio propio
  tagline: "Vive Yanahuara, vive en una zona elegante y segura de Arequipa.",
  address: "Calle Quesada con Calle Arica, Yanahuara, Arequipa",
  empresa: "Aurium Inmobiliaria",
  contact: {
    whatsapp: "51992084635",
    phoneDisplay: "992 084 635",
  },
};

export const waLink = (msg = "Hola, quiero información sobre el Condominio Portales de Luz en Yanahuara.") =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

export const mapsQuery = "Calle Quesada y Calle Arica, Yanahuara, Arequipa, Perú";

export const caracteristicas = [
  { key: "luz", titulo: "Iluminación", texto: "Ambientes abiertos a la luz natural, con ventanales amplios en cada piso." },
  { key: "seguridad", titulo: "Seguridad 24/7", texto: "Acceso controlado y vigilancia permanente para toda la familia." },
  { key: "diseno", titulo: "Diseño moderno y funcional", texto: "Arquitectura de arcos en sillar y terrazas verdes, pensada para el día a día." },
  { key: "acabados", titulo: "Acabados de alta calidad", texto: "Materiales seleccionados en pisos, cocinas y baños." },
  { key: "distribucion", titulo: "Excelente distribución", texto: "Plantas eficientes, sin pasillos perdidos, con zonas sociales integradas." },
] as const;

export const ubicacion = {
  tiempos: [
    { min: 1, lugar: "Av. Ejército" },
    { min: 2, lugar: "Metro" },
  ],
  cercanos: [
    "Cámara de Comercio e Industria de Arequipa",
    "Comisaría de Yanahuara",
    "Clínica Arequipa",
    "Av. Emmel y Av. Francisco Bolognesi",
  ],
};

export type Tipologia = {
  id: string;
  nombre: string;
  area?: number;
  torres: string;
  ambientes: { n: number; label: string; icon: "cama" | "bano" | "sala" | "cocina" | "comedor" | "lavanderia" | "estudio" }[];
  planos: { src: string; alt: string; w: number; h: number }[];
  // Imágenes referenciales de ambientes generadas con IA (Higgsfield), 1600x1062
  fotos: { src: string; label: string }[];
  nota?: string;
};

export const tipologias: Tipologia[] = [
  {
    id: "a",
    nombre: "Tipo A",
    area: 75,
    torres: "Torre A · pisos 1, 2, 3 y 4",
    ambientes: [
      { n: 2, label: "Habitaciones", icon: "cama" },
      { n: 2, label: "Baños", icon: "bano" },
      { n: 1, label: "Sala", icon: "sala" },
      { n: 1, label: "Cocina", icon: "cocina" },
      { n: 1, label: "Comedor", icon: "comedor" },
      { n: 1, label: "Lavandería", icon: "lavanderia" },
    ],
    planos: [{ src: "/img/tipo-a.jpg", alt: "Plano del departamento tipo A de 75 m²", w: 1400, h: 1337 }],
    fotos: [
      { src: "/img/ambientes/a-sala.jpg", label: "Sala, comedor y cocina" },
      { src: "/img/ambientes/a-dormitorio.jpg", label: "Dormitorio principal" },
      { src: "/img/ambientes/bano.jpg", label: "Baño" },
    ],
  },
  {
    id: "bc",
    nombre: "Tipo B · C",
    area: 101,
    torres: "Torres B y C · pisos 1, 2, 3 y 4",
    ambientes: [
      { n: 2, label: "Habitaciones", icon: "cama" },
      { n: 2, label: "Baños", icon: "bano" },
      { n: 1, label: "Sala", icon: "sala" },
      { n: 1, label: "Cocina", icon: "cocina" },
      { n: 1, label: "Comedor", icon: "comedor" },
      { n: 1, label: "Sala de estudio", icon: "estudio" },
    ],
    planos: [{ src: "/img/tipo-bc.jpg", alt: "Plano del departamento tipo B y C de 101 m²", w: 1400, h: 1253 }],
    fotos: [
      { src: "/img/ambientes/bc-sala.jpg", label: "Sala y comedor" },
      { src: "/img/ambientes/bc-cocina.jpg", label: "Cocina con isla" },
      { src: "/img/ambientes/bc-estudio.jpg", label: "Sala de estudio" },
      { src: "/img/ambientes/bano.jpg", label: "Baño" },
    ],
  },
  {
    id: "d",
    nombre: "Tipo D",
    area: 97,
    torres: "Torre D · pisos 1, 2, 3 y 4",
    ambientes: [
      { n: 3, label: "Habitaciones", icon: "cama" },
      { n: 2, label: "Baños", icon: "bano" },
      { n: 1, label: "Sala", icon: "sala" },
      { n: 1, label: "Cocina", icon: "cocina" },
      { n: 1, label: "Comedor", icon: "comedor" },
      { n: 1, label: "Lavandería", icon: "lavanderia" },
    ],
    planos: [{ src: "/img/tipo-d.jpg", alt: "Plano del departamento tipo D de 97 m²", w: 1400, h: 1127 }],
    fotos: [
      { src: "/img/ambientes/d-cocina.jpg", label: "Cocina, sala y comedor" },
      { src: "/img/ambientes/d-dormitorio.jpg", label: "Dormitorio secundario" },
      { src: "/img/ambientes/bano.jpg", label: "Baño" },
    ],
  },
  {
    id: "duplex",
    nombre: "Dúplex",
    torres: "Torres B, C y D · pisos 5 y 6",
    ambientes: [],
    nota: "Departamentos en dos niveles con terraza ajardinada, escalera interior y zona de estudio en el segundo nivel. Consulta área y precio por WhatsApp.",
    planos: [
      { src: "/img/duplex-1.jpg", alt: "Dúplex, primer nivel", w: 1400, h: 1057 },
      { src: "/img/duplex-2.jpg", alt: "Dúplex, segundo nivel", w: 1400, h: 1110 },
    ],
    fotos: [
      { src: "/img/ambientes/duplex-sala.jpg", label: "Sala a doble nivel" },
      { src: "/img/ambientes/duplex-terraza.jpg", label: "Terraza ajardinada" },
    ],
  },
];

// ---------- Disponibilidad (tabla del brochure) ----------
export type Estado = "libre" | "separado" | "vendido" | "duplex" | "cochera" | "vacio";

export const estadoInfo: Record<Exclude<Estado, "vacio">, { label: string }> = {
  libre: { label: "Libre" },
  separado: { label: "Separado" },
  vendido: { label: "Vendido" },
  duplex: { label: "Dúplex" },
  cochera: { label: "Cochera" },
};

export const torresOrden = ["D", "C", "B", "A"] as const;

type Celda = { u?: string; e: Estado };
// Filas de piso 6 a piso 1, columnas en el orden de torresOrden.
// Los pisos 5 y 6 de D, C y B son un solo dúplex (se fusionan en la tabla).
export const disponibilidad: { piso: number; celdas: Celda[] }[] = [
  { piso: 6, celdas: [{ u: "D105", e: "duplex" }, { u: "C105", e: "duplex" }, { u: "B105", e: "duplex" }, { e: "vacio" }] },
  { piso: 5, celdas: [{ e: "duplex" }, { e: "duplex" }, { e: "duplex" }, { u: "A104", e: "separado" }] },
  { piso: 4, celdas: [{ u: "D103", e: "vendido" }, { u: "C104", e: "vendido" }, { u: "B104", e: "separado" }, { u: "A103", e: "libre" }] },
  { piso: 3, celdas: [{ u: "D102", e: "vendido" }, { u: "C103", e: "libre" }, { u: "B103", e: "separado" }, { u: "A102", e: "vendido" }] },
  { piso: 2, celdas: [{ u: "D101", e: "vendido" }, { u: "C102", e: "vendido" }, { u: "B102", e: "libre" }, { u: "A101", e: "vendido" }] },
  { piso: 1, celdas: [{ u: "D101", e: "libre" }, { u: "C101", e: "libre" }, { u: "B101", e: "libre" }, { e: "cochera" }] },
];

// ---------- Precios (USD) ----------
export const precios = {
  area: 101,
  tipo: "Flat",
  torres: "Torres B y C",
  planes: [
    { id: "regular", titulo: "Precio regular", detalle: "Pago estándar", m2: 1800, total: 181800 },
    { id: "inicial30", titulo: "Promocional", detalle: "Con cuota inicial del 30%", m2: 1550, total: 156550 },
    { id: "inicial50", titulo: "Promocional", detalle: "Con cuota inicial del 50%", m2: 1500, total: 151500, destacado: true },
  ],
  vendidas: ["Torre A", "Torre D"],
  adicionales: [
    { label: "Cochera", precio: 20000 },
    { label: "Depósito", precio: 5000 },
  ],
};

export const usd = (n: number) =>
  "US$ " + n.toLocaleString("en-US", { maximumFractionDigits: 0 });

// Tipología de una unidad según su torre (y si es dúplex)
export function tipologiaDeUnidad(torre: string, estado: Estado): Tipologia {
  if (estado === "duplex") return tipologias.find((t) => t.id === "duplex")!;
  if (torre === "A") return tipologias.find((t) => t.id === "a")!;
  if (torre === "D") return tipologias.find((t) => t.id === "d")!;
  return tipologias.find((t) => t.id === "bc")!;
}

// ---------- Vivir en Yanahuara ----------
export const entorno = [
  {
    key: "mirador",
    titulo: "Mirador de Yanahuara",
    texto: "Los arcos de sillar con vista al Misti, muy cerca de casa. El paseo de domingo de toda Arequipa.",
  },
  {
    key: "iglesia",
    titulo: "Plaza e Iglesia San Juan Bautista",
    texto: "Fachada barroca mestiza del siglo XVIII y el ambiente tranquilo del barrio tradicional.",
  },
  {
    key: "gastronomia",
    titulo: "Picanterías y cafés",
    texto: "Yanahuara reúne algunas de las cocinas más tradicionales de la ciudad, además de cafés y restaurantes.",
  },
  {
    key: "centro",
    titulo: "A minutos del Centro Histórico",
    texto: "Cruzas el río Chili y estás en la Plaza de Armas, sin dejar la calma de un distrito residencial.",
  },
  {
    key: "salud",
    titulo: "Salud y servicios",
    texto: "Clínica Arequipa, la Cámara de Comercio y la comisaría del distrito están en el entorno inmediato.",
  },
  {
    key: "transporte",
    titulo: "Bien conectado",
    texto: "A 1 minuto de la Av. Ejército y a 2 del Metro: comercio, bancos y transporte al paso.",
  },
] as const;

// ---------- Proceso de compra ----------
export const proceso = [
  { titulo: "Conversa con un asesor", texto: "Escríbenos por WhatsApp y resolvemos tus dudas sobre tipologías, precios y formas de pago." },
  { titulo: "Visita el proyecto", texto: "Agenda una cita para conocer el proyecto y recorrer la zona con un asesor." },
  { titulo: "Elige y separa tu unidad", texto: "Escoge torre, piso y plan de pago. Separas la unidad para que nadie más la tome." },
  { titulo: "Firma y paga tu inicial", texto: "Firmas la minuta, abonas la cuota inicial del plan elegido y coordinas el pago del saldo." },
] as const;

// ---------- Preguntas frecuentes (solo datos confirmados del brochure) ----------
export const faqs = [
  {
    q: "¿Qué tipos de departamento hay?",
    a: "Flats de 75 m² (Torre A, 2 habitaciones), 101 m² (Torres B y C, 2 habitaciones y sala de estudio) y 97 m² (Torre D, 3 habitaciones), en los pisos 1 al 4. En los pisos 5 y 6 hay dúplex.",
  },
  {
    q: "¿Cuánto cuesta un departamento?",
    a: "Hoy hay disponibilidad en el flat de 101 m² de las Torres B y C: US$ 181,800 a precio regular (US$ 1,800/m²), US$ 156,550 con 30% de inicial (US$ 1,550/m²) o US$ 151,500 con 50% de inicial (US$ 1,500/m²).",
  },
  {
    q: "¿La cochera y el depósito están incluidos?",
    a: "No, se adquieren por separado: la cochera cuesta US$ 20,000 y el depósito US$ 5,000.",
  },
  {
    q: "¿Dónde queda exactamente?",
    a: "En Yanahuara, Arequipa, en la esquina de la Calle Quesada con la Calle Arica, a 1 minuto de la Av. Ejército.",
  },
  {
    q: "¿Cuánto miden y cuestan los dúplex?",
    a: "Los dúplex están en los pisos 5 y 6 de las Torres B, C y D. Escríbenos por WhatsApp para recibir el área y el precio actualizados.",
  },
  {
    q: "¿Puedo comprar con crédito hipotecario?",
    a: "Escríbenos y un asesor te orienta según tu caso. Puedes usar el simulador de esta página para tener una referencia de la cuota mensual.",
  },
] as const;

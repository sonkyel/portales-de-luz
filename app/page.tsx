import Image from "next/image";
import {
  Lightbulb,
  ShieldCheck,
  Compass,
  Diamond,
  SquaresFour,
  MapPin,
  Clock,
  WhatsappLogo,
  Car,
  Archive,
  ArrowRight,
  ArrowUpRight,
  Mountains,
  Church,
  ForkKnife,
  Buildings,
  FirstAidKit,
  Bus,
  Plus,
  Check,
  Minus,
} from "@phosphor-icons/react/dist/ssr";
import Navbar from "@/components/Navbar";
import Tipologias from "@/components/Tipologias";
import Disponibilidad from "@/components/Disponibilidad";
import Simulador from "@/components/Simulador";
import Galeria from "@/components/Galeria";
import ContactoForm from "@/components/ContactoForm";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Lotus, { Logo } from "@/components/Lotus";
import AuriumLogo from "@/components/AuriumLogo";
import {
  site,
  waLink,
  mapsQuery,
  caracteristicas,
  ubicacion,
  disponibilidad,
  tipologias,
  precios,
  entorno,
  proceso,
  faqs,
  usd,
} from "@/data/site";

const featureIcons = {
  luz: Lightbulb,
  seguridad: ShieldCheck,
  diseno: Compass,
  acabados: Diamond,
  distribucion: SquaresFour,
} as const;

const entornoIcons = {
  mirador: Mountains,
  iglesia: Church,
  gastronomia: ForkKnife,
  centro: Buildings,
  salud: FirstAidKit,
  transporte: Bus,
} as const;

function SectionTitle({
  eyebrow,
  title,
  intro,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${center ? "" : "lg:mx-0 lg:text-left"}`}>
      <p className={`eyebrow ${light ? "text-arena-300" : "text-granate"}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] sm:text-5xl ${
          light ? "text-crema" : "text-tinta"
        }`}
      >
        {title}
      </h2>
      {intro && <p className={`mt-5 text-[1.02rem] leading-relaxed ${light ? "text-crema/80" : "text-tinta-soft"}`}>{intro}</p>}
    </div>
  );
}

// Filas del comparador de tipologías
const comparar: { label: string; get: (t: (typeof tipologias)[number]) => React.ReactNode }[] = [
  { label: "Área total", get: (t) => (t.area ? `${t.area} m²` : "Consultar") },
  { label: "Ubicación", get: (t) => t.torres },
  { label: "Habitaciones", get: (t) => t.ambientes.find((a) => a.icon === "cama")?.n ?? "Consultar" },
  { label: "Baños", get: (t) => t.ambientes.find((a) => a.icon === "bano")?.n ?? "Consultar" },
  { label: "Sala de estudio", get: (t) => (t.id === "bc" ? true : t.id === "duplex" ? true : false) },
  { label: "Lavandería", get: (t) => (t.ambientes.some((a) => a.icon === "lavanderia") ? true : "Consultar") },
  { label: "Dos niveles y terraza", get: (t) => t.id === "duplex" },
  {
    label: "Disponibilidad",
    get: (t) => {
      const torres = t.id === "a" ? ["A"] : t.id === "d" ? ["D"] : t.id === "bc" ? ["B", "C"] : [];
      if (t.id === "duplex") return "Consultar";
      const orden = ["D", "C", "B", "A"];
      const libres = disponibilidad.flatMap((f) => f.celdas.filter((c, i) => c.e === "libre" && torres.includes(orden[i]))).length;
      return libres > 0 ? `${libres} libre${libres > 1 ? "s" : ""}` : "Agotado";
    },
  },
];

function Valor({ v }: { v: React.ReactNode }) {
  if (v === true) return <Check weight="bold" className="inline size-5 text-granate md:mx-auto md:block" aria-label="Sí" />;
  if (v === false) return <Minus className="inline size-5 text-tinta-soft/40 md:mx-auto md:block" aria-label="No" />;
  return <>{v}</>;
}

export default function Home() {
  const libres = disponibilidad.flatMap((f) => f.celdas).filter((c) => c.e === "libre").length;

  return (
    <>
      <Navbar />

      <main id="inicio">
        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden pt-24 lg:pt-28">
          <Lotus className="pointer-events-none absolute -left-24 top-40 hidden h-[26rem] w-[40rem] text-granate/[0.05] lg:block" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-24">
            <div className="text-center lg:text-left">
              <p className="reveal inline-flex items-center gap-2 rounded-full bg-granate/[0.07] px-3.5 py-1.5 text-[0.78rem] font-semibold text-granate">
                <span className="size-2 rounded-full bg-st-vendido" />
                Últimas {libres} unidades disponibles
              </p>
              <h1 className="reveal reveal-2 mt-6 font-[family-name:var(--font-display)] text-[3.4rem] font-semibold leading-[0.95] text-granate sm:text-7xl lg:text-[5.6rem]">
                Portales
                <br />
                <span className="font-medium italic text-tinta">de Luz</span>
              </h1>
              <p className="reveal reveal-3 mx-auto mt-7 max-w-md text-lg leading-relaxed text-tinta-soft lg:mx-0">
                Departamentos de 75 a 101 m² y dúplex con terraza en Yanahuara, la zona más{" "}
                <strong className="font-semibold text-tinta">elegante y segura</strong> de Arequipa. A un minuto de la Av. Ejército.
              </p>
              <div className="reveal reveal-3 mx-auto mt-9 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start">
                <a
                  href={waLink("Hola, quiero agendar una visita a Portales de Luz.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-granate px-7 py-4 font-semibold text-crema shadow-[0_14px_30px_-12px_rgb(139_26_32/0.7)] transition hover:bg-granate-900"
                >
                  <WhatsappLogo weight="fill" className="size-5" />
                  Agenda tu visita
                </a>
                <a
                  href="#simulador"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-granate/25 px-7 py-4 font-semibold text-granate transition hover:border-granate"
                >
                  Simula tu pago
                  <ArrowRight className="size-4.5" />
                </a>
              </div>
              <p className="reveal reveal-3 mt-8 text-sm text-tinta-soft">
                Desde <strong className="text-tinta">{usd(precios.planes[2].total)}</strong> · flat de {precios.area} m² con 50% de inicial
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="arch relative aspect-[4/5] overflow-hidden bg-sillar shadow-[var(--shadow-card)]">
                <Image
                  src="/img/fachada-hero.jpg"
                  alt="Fachada del Condominio Portales de Luz con arcos de sillar y terrazas verdes"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_70%]"
                />
              </div>
              <div className="absolute -bottom-6 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[var(--shadow-card)] sm:left-auto sm:-left-8 sm:translate-x-0">
                <span className="grid size-11 place-items-center rounded-full bg-granate text-crema">
                  <MapPin weight="fill" className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-bold text-tinta">En la mejor zona de Yanahuara</span>
                  <span className="text-xs text-tinta-soft">Calle Quesada con Calle Arica</span>
                </span>
              </div>
            </div>
          </div>

          <div className="bg-granate text-crema">
            <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-10 px-5 py-12 text-center sm:px-6 lg:grid-cols-4 lg:py-10 lg:text-left lg:px-8">
              {[
                ["4", "torres de departamentos"],
                ["75–101", "m² por departamento"],
                ["2–3", "habitaciones por flat"],
                ["1 min", "de la Av. Ejército"],
              ].map(([n, l]) => (
                <div key={l} className="lg:border-l lg:border-crema/20 lg:pl-5">
                  <dt className="sr-only">{l}</dt>
                  <dd>
                    <span className="block font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-5xl">{n}</span>
                    <span className="mt-1 block text-[0.82rem] text-crema/75">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ================= PROYECTO ================= */}
        <section id="proyecto" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div className="arch relative aspect-[3/4] overflow-hidden">
              <Image src="/img/patio.jpg" alt="Patio interior con árbol en flor y arcos de sillar" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-top" />
            </div>

            <div>
              <SectionTitle
                eyebrow="El proyecto"
                title={
                  <>
                    Arcos de sillar,
                    <br />
                    <span className="font-medium italic text-granate">luz y jardín</span> en cada piso
                  </>
                }
                intro="Cuatro torres (A, B, C y D) alineadas sobre la Calle Quesada y unidas por un patio interior. Un frente de arcos que dialoga con la tradición arequipeña y terrazas verdes que dan sombra y privacidad."
              />
              <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 sm:gap-y-7">
                {caracteristicas.map((c) => {
                  const Icon = featureIcons[c.key];
                  return (
                    <li key={c.key} className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-start sm:gap-4 sm:text-left">
                      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-arena/25 text-granate">
                        <Icon className="size-6" />
                      </span>
                      <span>
                        <span className="block font-semibold text-tinta">{c.titulo}</span>
                        <span className="mt-1 block text-[0.9rem] leading-relaxed text-tinta-soft">{c.texto}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 rounded-[2rem] bg-white p-6 shadow-[var(--shadow-card)] sm:p-10 lg:grid-cols-[0.6fr_1.4fr]">
              <div className="text-center lg:text-left">
                <p className="eyebrow text-granate">Planta general</p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold">Cuatro torres, un solo patio</h3>
                <p className="mt-4 leading-relaxed text-tinta-soft">
                  Las torres D, C, B y A se ordenan una junto a otra. El ingreso se da por la Calle Arica y el frente principal mira a la Calle Quesada.
                </p>
                <a href="#disponibilidad" className="mt-6 inline-flex items-center gap-2 font-semibold text-granate hover:underline">
                  Ver disponibilidad por torre <ArrowRight className="size-4" />
                </a>
              </div>
              <Image
                src="/img/plano-general.jpg"
                alt="Plano general con la ubicación de las torres A, B, C y D entre Calle Quesada y Calle Arica"
                width={1400}
                height={965}
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </section>

        {/* ================= DEPARTAMENTOS ================= */}
        <section id="departamentos" className="bg-crema-200 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Departamentos"
              title={
                <>
                  Elige el espacio <span className="font-medium italic text-granate">a tu medida</span>
                </>
              }
              intro="Flats de 2 y 3 habitaciones en los pisos 1 al 4, y dúplex con terraza en los pisos 5 y 6."
            />
            <div className="mt-12">
              <Tipologias />
            </div>

            <div className="mt-20">
              <h3 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold lg:text-left">Compara las tipologías</h3>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:hidden">
                {tipologias.map((t) => (
                  <div key={t.id} className="rounded-[1.5rem] bg-white p-6 shadow-[var(--shadow-card)]">
                    <p className="text-center font-[family-name:var(--font-display)] text-2xl font-semibold text-granate">{t.nombre}</p>
                    <dl className="mt-4 divide-y divide-granate/10 text-sm">
                      {comparar.map((fila) => (
                        <div key={fila.label} className="flex items-center justify-between gap-4 py-2.5">
                          <dt className="text-tinta-soft">{fila.label}</dt>
                          <dd className="text-right font-semibold text-tinta">
                            <Valor v={fila.get(t)} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
              <div className="mt-6 hidden overflow-x-auto rounded-[1.5rem] bg-white shadow-[var(--shadow-card)] md:block">
                <table className="w-full min-w-[40rem] text-sm">
                  <caption className="sr-only">Comparación de tipologías de departamento</caption>
                  <thead>
                    <tr className="border-b border-granate/10">
                      <th scope="col" className="w-44 p-5 text-left font-medium text-tinta-soft">
                        &nbsp;
                      </th>
                      {tipologias.map((t) => (
                        <th key={t.id} scope="col" className="p-5 text-center font-[family-name:var(--font-display)] text-xl font-semibold text-granate">
                          {t.nombre}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparar.map((fila, k) => (
                      <tr key={fila.label} className={k % 2 ? "bg-crema/60" : ""}>
                        <th scope="row" className="p-4 pl-5 text-left font-medium text-tinta-soft">
                          {fila.label}
                        </th>
                        {tipologias.map((t) => (
                          <td key={t.id} className="p-4 text-center font-semibold text-tinta">
                            <Valor v={fila.get(t)} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ================= DISPONIBILIDAD ================= */}
        <section id="disponibilidad" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row lg:items-end">
              <SectionTitle
                eyebrow="Disponibilidad"
                title={
                  <>
                    Quedan <span className="font-medium italic text-granate">{libres} unidades</span> libres
                  </>
                }
                intro="Estado de cada departamento por torre y piso. Toca una unidad para ver su plano, precio y consultar directamente por ella."
              />
              <p className="max-w-xs text-center text-xs text-tinta-soft lg:text-right">La disponibilidad cambia rápido: confírmala con un asesor antes de tu visita.</p>
            </div>
            <div className="mt-12">
              <Disponibilidad />
            </div>
          </div>
        </section>

        {/* ================= PRECIOS ================= */}
        <section id="precios" className="bg-crema-200 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Precios"
              title={
                <>
                  Flat de {precios.area} m² · <span className="font-medium italic text-granate">{precios.torres}</span>
                </>
              }
              intro={`Precios en dólares por m². Mientras mayor sea tu cuota inicial, mejor el precio. ${precios.vendidas.join(" y ")}: vendidas.`}
            />

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {precios.planes.map((p, i) => (
                <article
                  key={p.id}
                  className={`relative flex flex-col rounded-[1.75rem] p-8 text-center lg:text-left ${
                    p.destacado ? "bg-granate text-crema shadow-[0_30px_60px_-30px_rgb(139_26_32/0.8)]" : "bg-white shadow-[var(--shadow-card)]"
                  }`}
                >
                  {p.destacado && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-arena px-3 py-1 text-[0.7rem] font-bold tracking-wider text-granate-950 lg:left-auto lg:right-6 lg:translate-x-0">
                      MEJOR PRECIO
                    </span>
                  )}
                  <p className={`eyebrow ${p.destacado ? "text-arena-300" : "text-granate"}`}>
                    Opción {i + 1} · {p.titulo}
                  </p>
                  <p className={`mt-2 text-sm ${p.destacado ? "text-crema/75" : "text-tinta-soft"}`}>{p.detalle}</p>
                  <p className="mt-8 font-[family-name:var(--font-display)] text-5xl font-semibold">
                    {usd(p.m2)}
                    <span className={`ml-1 font-[family-name:var(--font-body)] text-base font-medium ${p.destacado ? "text-crema/70" : "text-tinta-soft"}`}>/ m²</span>
                  </p>
                  <div className={`mt-8 border-t pt-5 ${p.destacado ? "border-crema/20" : "border-granate/10"}`}>
                    <p className={`text-xs ${p.destacado ? "text-crema/70" : "text-tinta-soft"}`}>
                      Precio total · {precios.tipo} {precios.area} m²
                    </p>
                    <p className="mt-1 text-2xl font-bold">{usd(p.total)}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
              {precios.adicionales.map((a) => {
                const Icon = a.label === "Cochera" ? Car : Archive;
                return (
                  <div key={a.label} className="flex flex-col items-center gap-3 rounded-[1.5rem] bg-white p-6 text-center sm:flex-row sm:gap-5 sm:text-left">
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-granate text-crema">
                      <Icon className="size-7" />
                    </span>
                    <span>
                      <span className="block text-sm text-tinta-soft">Precio {a.label.toLowerCase()}</span>
                      <span className="block whitespace-nowrap text-xl font-bold text-tinta sm:text-2xl">{usd(a.precio)}</span>
                    </span>
                  </div>
                );
              })}
            </div>

            <div id="simulador" className="mt-24 scroll-mt-24">
              <h3 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl lg:text-left">
                Simula tu <span className="italic text-granate">plan de pago</span>
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-center text-tinta-soft lg:mx-0 lg:text-left">Elige el plan, suma cochera o depósito y estima tu cuota mensual si financias el saldo.</p>
              <div className="mt-8">
                <Simulador />
              </div>
            </div>
            <p className="mt-5 text-center text-xs text-tinta-soft lg:text-left">Precios referenciales en dólares americanos, sujetos a disponibilidad y a cambio sin previo aviso.</p>
          </div>
        </section>

        {/* ================= UBICACIÓN + ENTORNO ================= */}
        <section id="ubicacion" className="bg-granate-950 py-20 text-crema sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <SectionTitle
                light
                eyebrow="Ubicación"
                title={
                  <>
                    Muy cerca de <span className="font-medium italic text-arena-300">todo</span> lo que necesitas
                  </>
                }
                intro="En el corazón residencial de Yanahuara, en la esquina de la Calle Quesada con la Calle Arica."
              />
              <div className="mt-10 grid grid-cols-2 gap-4">
                {ubicacion.tiempos.map((t) => (
                  <div key={t.lugar} className="rounded-2xl bg-crema/[0.06] p-5 text-center ring-1 ring-crema/10 lg:text-left">
                    <Clock className="mx-auto size-6 text-arena-300 lg:mx-0" />
                    <p className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold">{t.min} min</p>
                    <p className="mt-1 text-sm text-crema/75">de la {t.lugar}</p>
                  </div>
                ))}
              </div>
              <ul className="mx-auto mt-10 w-fit space-y-3 lg:mx-0">
                {ubicacion.cercanos.map((c) => (
                  <li key={c} className="flex items-center gap-3 text-crema/85">
                    <MapPin weight="fill" className="size-4.5 shrink-0 text-arena" />
                    {c}
                  </li>
                ))}
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-9 flex w-fit lg:mx-0 items-center gap-2 font-semibold text-arena-300 underline-offset-4 hover:underline"
              >
                Cómo llegar en Google Maps
                <ArrowUpRight className="size-4.5" />
              </a>
            </div>

            <div className="min-h-[22rem] overflow-hidden rounded-[2rem] ring-1 ring-crema/10 lg:min-h-0">
              <iframe
                title="Mapa de ubicación de Portales de Luz en Yanahuara"
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&output=embed`}
                className="h-full min-h-[22rem] w-full grayscale-[35%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div className="mx-auto mt-24 max-w-7xl px-5 sm:px-6 lg:px-8">
            <h3 className="text-center font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl lg:text-left">
              Vivir en <span className="italic text-arena-300">Yanahuara</span>
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-center text-crema/75 lg:mx-0 lg:text-left">El distrito tradicional de Arequipa: calles de sillar, vida de barrio y todo a la mano.</p>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[1.75rem] bg-crema/10 sm:grid-cols-2 lg:grid-cols-3">
              {entorno.map((e) => {
                const Icon = entornoIcons[e.key];
                return (
                  <li key={e.key} className="bg-granate-950 p-8 text-center sm:p-7 sm:text-left">
                    <Icon className="mx-auto size-8 text-arena-300 sm:mx-0" />
                    <p className="mt-5 text-lg font-semibold">{e.titulo}</p>
                    <p className="mt-2 text-sm leading-relaxed text-crema/70">{e.texto}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ================= GALERÍA ================= */}
        <section id="galeria" aria-label="Galería" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col items-center justify-between gap-4 lg:flex-row lg:items-end">
              <SectionTitle eyebrow="Galería" title={<>Así se verá <span className="font-medium italic text-granate">tu nuevo hogar</span></>} />
              <p className="text-xs text-tinta-soft">Imágenes referenciales del proyecto. Toca para ampliar.</p>
            </div>
            <Galeria />
          </div>
        </section>

        {/* ================= PROCESO ================= */}
        <section id="proceso" className="bg-crema-200 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Cómo comprar"
              title={
                <>
                  Tu departamento en <span className="font-medium italic text-granate">4 pasos</span>
                </>
              }
            />
            <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {proceso.map((p, i) => (
                <li key={p.titulo} className="relative rounded-[1.5rem] bg-white p-7 text-center shadow-[var(--shadow-card)] md:text-left">
                  <span className="font-[family-name:var(--font-display)] text-6xl font-semibold leading-none text-granate/15">0{i + 1}</span>
                  <p className="mt-4 text-lg font-semibold text-tinta">{p.titulo}</p>
                  <p className="mt-2 text-sm leading-relaxed text-tinta-soft">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="preguntas" className="py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div className="text-center lg:text-left">
              <SectionTitle eyebrow="Preguntas frecuentes" title={<>Lo que más <span className="font-medium italic text-granate">nos preguntan</span></>} />
              <a
                href={waLink("Hola, tengo una consulta sobre Portales de Luz.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-8 flex w-fit lg:mx-0 items-center gap-2 rounded-full border border-granate/25 px-6 py-3 font-semibold text-granate transition hover:border-granate"
              >
                <WhatsappLogo weight="fill" className="size-5" />
                ¿Otra duda? Escríbenos
              </a>
            </div>
            <div className="divide-y divide-granate/10 border-y border-granate/10">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-tinta [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="size-5 shrink-0 text-granate transition group-open:rotate-45" />
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-tinta-soft">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACTO ================= */}
        <section id="contacto" className="relative overflow-hidden bg-granate py-20 text-crema sm:py-28">
          <Lotus className="pointer-events-none absolute -right-20 -top-10 h-[30rem] w-[46rem] text-crema/[0.07]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
            <div className="text-center lg:text-left">
              <p className="eyebrow text-arena-300">Contacto</p>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight sm:text-6xl">
                Vive Yanahuara.
                <br />
                <span className="font-medium italic">Vive Portales de Luz.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-md text-crema/80 lg:mx-0">
                Déjanos tus datos y un asesor te escribe con planos, precios y horarios de visita. O escríbenos directo:
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-8 flex w-fit items-center gap-3 text-2xl font-bold text-crema hover:text-white lg:mx-0"
              >
                <span className="grid size-12 place-items-center rounded-full bg-crema text-granate">
                  <WhatsappLogo weight="fill" className="size-6" />
                </span>
                {site.contact.phoneDisplay}
              </a>
              <p className="mt-4 text-sm text-crema/60">{site.address}</p>
            </div>
            <ContactoForm />
          </div>
        </section>
      </main>

      <footer className="bg-granate-950 pb-24 pt-12 text-crema/70 sm:pb-12">
        <div className="mx-auto grid max-w-7xl justify-items-center gap-10 px-5 text-center sm:px-6 md:grid-cols-[1fr_auto_auto] md:items-center md:justify-items-start md:gap-14 md:text-left lg:px-8">
          <Logo light />
          <div className="text-sm leading-relaxed">
            <p>{site.address}</p>
            <p>WhatsApp {site.contact.phoneDisplay}</p>
          </div>
          <div>
            <p className="eyebrow mb-3 text-[0.6rem] text-crema/50">Un proyecto presentado por</p>
            <AuriumLogo light />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-6 lg:px-8">
          <p className="border-t border-crema/10 pt-6 text-center text-xs text-crema/45 md:text-left">
            Imágenes y planos referenciales. Precios en dólares sujetos a disponibilidad. © {new Date().getFullYear()} {site.empresa} · {site.fullName}.
          </p>
        </div>
      </footer>

      <WhatsAppFloat />
    </>
  );
}

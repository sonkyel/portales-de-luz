"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { WhatsappLogo, X, CursorClick } from "@phosphor-icons/react";
import {
  disponibilidad,
  torresOrden,
  estadoInfo,
  precios,
  tipologiaDeUnidad,
  usd,
  waLink,
  type Estado,
} from "@/data/site";

const estadoClase: Record<Estado, string> = {
  libre: "bg-st-libre text-tinta ring-1 ring-inset ring-granate/15",
  separado: "bg-st-separado text-tinta",
  vendido: "bg-st-vendido text-white",
  duplex: "bg-st-duplex text-tinta",
  cochera: "bg-sillar text-tinta-soft",
  vacio: "bg-transparent",
};

type Sel = { unidad: string; torre: string; piso: number; estado: Estado };

export default function Disponibilidad() {
  const [soloLibres, setSoloLibres] = useState(false);
  const [sel, setSel] = useState<Sel | null>(null);

  const conteo = useMemo(() => {
    const c = { libre: 0, separado: 0, vendido: 0 } as Record<string, number>;
    disponibilidad.forEach((f) => f.celdas.forEach((x) => x.u && c[x.e] !== undefined && c[x.e]++));
    return c;
  }, []);

  const tip = sel ? tipologiaDeUnidad(sel.torre, sel.estado) : null;
  const conPrecio = sel && (sel.torre === "B" || sel.torre === "C") && sel.estado !== "duplex";

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="rounded-[1.5rem] bg-white p-3 shadow-[var(--shadow-card)] sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-4">
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {(["libre", "separado", "vendido", "duplex"] as const).map((e) => (
              <li key={e} className="flex items-center gap-2 text-[0.8rem] text-tinta-soft">
                <span className={`size-3.5 rounded ${estadoClase[e]}`} />
                {estadoInfo[e].label}
                {e !== "duplex" && <span className="font-semibold text-tinta">{conteo[e]}</span>}
              </li>
            ))}
          </ul>
          <label className="flex cursor-pointer items-center gap-2 text-[0.8rem] font-semibold text-granate">
            <input
              type="checkbox"
              checked={soloLibres}
              onChange={(e) => setSoloLibres(e.target.checked)}
              className="size-4 accent-[var(--color-granate)]"
            />
            Solo libres
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] border-separate border-spacing-1.5 text-center">
            <caption className="sr-only">Disponibilidad por torre y piso. Selecciona una unidad para ver su ficha.</caption>
            <thead>
              <tr>
                <th scope="col" className="w-16" />
                {torresOrden.map((t) => (
                  <th key={t} scope="col" className="pb-1 text-[0.75rem] font-bold tracking-wider text-granate">
                    TORRE {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disponibilidad.map((fila) => (
                <tr key={fila.piso}>
                  <th scope="row" className="pr-1 text-left text-[0.75rem] font-bold tracking-wider text-granate">
                    PISO {fila.piso}
                  </th>
                  {fila.celdas.map((c, i) => {
                    if (fila.piso === 5 && c.e === "duplex") return null;
                    const span = fila.piso === 6 && c.e === "duplex" ? 2 : 1;
                    const torre = torresOrden[i];
                    const clickable = !!c.u;
                    const atenuado = soloLibres && c.e !== "libre" && c.e !== "vacio";
                    const activo = sel && sel.unidad === c.u && sel.piso === fila.piso;
                    return (
                      <td key={i} rowSpan={span} className="p-0">
                        {clickable ? (
                          <button
                            type="button"
                            onClick={() => setSel({ unidad: c.u!, torre, piso: fila.piso, estado: c.e })}
                            aria-pressed={!!activo}
                            aria-label={`${c.u}, torre ${torre}, piso ${fila.piso}: ${estadoInfo[c.e as Exclude<Estado, "vacio">].label}`}
                            className={`h-full min-h-12 w-full rounded-lg px-2 py-3 text-[0.9rem] font-semibold transition ${estadoClase[c.e]} ${
                              atenuado ? "opacity-20" : "hover:-translate-y-0.5 hover:shadow-md"
                            } ${activo ? "outline-3 outline-offset-2 outline-granate" : ""}`}
                          >
                            {c.u}
                            {c.e === "duplex" && <span className="block text-[0.68rem] font-medium opacity-70">Dúplex</span>}
                          </button>
                        ) : (
                          <div className={`rounded-lg px-2 py-3 text-[0.9rem] font-semibold ${estadoClase[c.e]} ${atenuado ? "opacity-20" : ""}`}>
                            {c.e === "cochera" ? "Cochera" : ""}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ficha de la unidad */}
      <aside aria-live="polite" className="rounded-[1.5rem] bg-granate p-7 text-crema shadow-[var(--shadow-card)]">
        {!sel || !tip ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
            <CursorClick className="size-10 text-arena-300" />
            <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold">Elige una unidad</p>
            <p className="mt-2 max-w-60 text-sm text-crema/75">Toca cualquier departamento de la tabla para ver su ficha y consultar por él.</p>
          </div>
        ) : (
          <div className="reveal" key={`${sel.unidad}-${sel.piso}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="eyebrow text-arena-300">
                  Torre {sel.torre} · Piso {sel.estado === "duplex" ? "5 y 6" : sel.piso}
                </p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold">{sel.unidad}</p>
              </div>
              <button type="button" onClick={() => setSel(null)} aria-label="Cerrar ficha" className="grid size-9 place-items-center rounded-full bg-crema/10 hover:bg-crema/20">
                <X className="size-4.5" />
              </button>
            </div>

            <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold ${estadoClase[sel.estado]}`}>
              {estadoInfo[sel.estado as Exclude<Estado, "vacio">].label}
            </span>

            <div className="mt-6 rounded-2xl bg-white p-3">
              <Image src={tip.planos[0].src} alt={tip.planos[0].alt} width={tip.planos[0].w} height={tip.planos[0].h} sizes="320px" className="h-auto w-full" />
            </div>

            <p className="mt-5 font-semibold">
              {tip.nombre}
              {tip.area ? ` · ${tip.area} m²` : ""}
            </p>
            {tip.ambientes.length > 0 && (
              <p className="mt-1 text-sm text-crema/75">
                {tip.ambientes.map((a) => `${a.n} ${a.label.toLowerCase()}`).join(" · ")}
              </p>
            )}

            {sel.estado === "vendido" ? (
              <p className="mt-5 text-sm text-crema/80">Esta unidad ya fue vendida. Consulta por unidades similares disponibles.</p>
            ) : conPrecio ? (
              <dl className="mt-5 space-y-2 border-t border-crema/15 pt-4 text-sm">
                {precios.planes.map((p) => (
                  <div key={p.id} className="flex justify-between gap-3">
                    <dt className="text-crema/75">{p.id === "regular" ? "Precio regular" : p.detalle}</dt>
                    <dd className="font-bold">{usd(p.total)}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-5 text-sm text-crema/80">Precio a consultar con un asesor.</p>
            )}

            <a
              href={waLink(
                sel.estado === "vendido"
                  ? `Hola, vi que la unidad ${sel.unidad} de Portales de Luz está vendida. ¿Tienen una similar disponible?`
                  : `Hola, me interesa la unidad ${sel.unidad} (Torre ${sel.torre}) de Portales de Luz. ¿Me pueden dar más información?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-crema py-3.5 text-sm font-bold text-granate transition hover:bg-white"
            >
              <WhatsappLogo weight="fill" className="size-5" />
              {sel.estado === "vendido" ? "Ver unidades similares" : `Consultar por ${sel.unidad}`}
            </a>
          </div>
        )}
      </aside>
    </div>
  );
}

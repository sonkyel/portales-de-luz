"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Bed,
  Toilet,
  Couch,
  CookingPot,
  ForkKnife,
  WashingMachine,
  Student,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { tipologias, waLink, type Tipologia } from "@/data/site";

const icons = {
  cama: Bed,
  bano: Toilet,
  sala: Couch,
  cocina: CookingPot,
  comedor: ForkKnife,
  lavanderia: WashingMachine,
  estudio: Student,
} as const;

export default function Tipologias() {
  const [activo, setActivo] = useState(tipologias[0].id);
  const [vista, setVista] = useState<"ambientes" | "plano">("ambientes");
  const [foto, setFoto] = useState(0);
  const t = tipologias.find((x) => x.id === activo) as Tipologia;

  return (
    <div>
      <div role="tablist" aria-label="Tipos de departamento" className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center lg:justify-start">
        {tipologias.map((x) => {
          const sel = x.id === activo;
          return (
            <button
              key={x.id}
              role="tab"
              aria-selected={sel}
              aria-controls={`panel-${x.id}`}
              onClick={() => {
                setActivo(x.id);
                setFoto(0);
              }}
              className={`rounded-full border px-4 py-3 text-sm font-semibold transition sm:px-5 sm:py-2.5 ${
                sel
                  ? "border-granate bg-granate text-crema"
                  : "border-granate/20 bg-white/60 text-granate hover:border-granate/50"
              }`}
            >
              {x.nombre}
              {x.area ? <span className={sel ? "text-crema/70" : "text-tinta-soft"}> · {x.area} m²</span> : null}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${t.id}`}
        role="tabpanel"
        key={t.id}
        className="reveal mt-8 grid overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-card)] lg:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="relative bg-granate px-6 py-9 text-center text-crema sm:p-10 lg:text-left">
          <p className="eyebrow text-arena-300">{t.torres}</p>
          <div className="mt-4 flex items-end justify-center gap-3 lg:justify-start">
            {t.area ? (
              <>
                <span className="font-[family-name:var(--font-display)] text-7xl font-semibold leading-none sm:text-8xl">
                  {t.area}
                </span>
                <span className="pb-2 text-lg font-medium text-crema/80">m² de área total</span>
              </>
            ) : (
              <span className="font-[family-name:var(--font-display)] text-6xl font-semibold leading-none">
                Dúplex
              </span>
            )}
          </div>

          {t.ambientes.length > 0 && (
            <ul className="mx-auto mt-9 grid max-w-sm grid-cols-2 gap-x-4 gap-y-5 text-left lg:mx-0">
              {t.ambientes.map((a) => {
                const Icon = icons[a.icon];
                return (
                  <li key={a.label} className="flex items-center gap-3">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-crema/10 text-arena-300">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-xl font-bold">{a.n}</span>
                      <span className="text-[0.8rem] text-crema/75">{a.label}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}

          {t.nota && <p className="mx-auto mt-8 max-w-sm leading-relaxed text-crema/85 lg:mx-0">{t.nota}</p>}

          <a
            href={waLink(`Hola, quiero información del departamento ${t.nombre}${t.area ? ` de ${t.area} m²` : ""} en Portales de Luz.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-crema px-6 py-3 text-sm font-semibold text-granate transition hover:bg-white"
          >
            <WhatsappLogo weight="fill" className="size-5" />
            Consultar este departamento
          </a>
        </div>

        <div className="flex flex-col p-4 sm:p-6">
          <div role="group" aria-label="Vista" className="mb-4 inline-flex w-fit self-center rounded-full bg-crema-200 p-1 text-sm font-semibold sm:self-end">
            {(["ambientes", "plano"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVista(v)}
                aria-pressed={vista === v}
                className={`rounded-full px-4 py-1.5 transition ${vista === v ? "bg-granate text-crema" : "text-granate hover:bg-white"}`}
              >
                {v === "ambientes" ? `Ambientes (${t.fotos.length})` : t.planos.length > 1 ? "Planos" : "Plano"}
              </button>
            ))}
          </div>

          {vista === "ambientes" ? (
            <div className="reveal" key={`amb-${t.id}`}>
              <figure className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-sillar">
                <Image
                  src={t.fotos[foto]?.src ?? t.fotos[0].src}
                  alt={`${t.fotos[foto]?.label ?? ""} del departamento ${t.nombre} (imagen referencial)`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-tinta/70 px-3 py-1 text-xs font-semibold text-crema backdrop-blur">
                  {t.fotos[foto]?.label}
                </figcaption>
              </figure>
              <div className="mt-3 grid grid-cols-4 gap-2">
                {t.fotos.map((f, i) => (
                  <button
                    key={f.src}
                    type="button"
                    onClick={() => setFoto(i)}
                    aria-label={`Ver ${f.label}`}
                    aria-pressed={foto === i}
                    className={`relative aspect-[3/2] overflow-hidden rounded-lg transition ${
                      foto === i ? "ring-2 ring-granate ring-offset-2" : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={f.src} alt="" fill sizes="120px" className="object-cover" />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-tinta-soft sm:text-left">Imágenes referenciales de ambientación generadas digitalmente. Mobiliario y decoración no incluidos.</p>
            </div>
          ) : (
            <div className={`reveal grid flex-1 place-items-center gap-6 ${t.planos.length > 1 ? "sm:grid-cols-2" : ""}`} key={`plano-${t.id}`}>
              {t.planos.map((p, i) => (
                <figure key={p.src} className="w-full">
                  <Image src={p.src} alt={p.alt} width={p.w} height={p.h} sizes="(min-width: 1024px) 50vw, 100vw" className="h-auto w-full" />
                  {t.planos.length > 1 && <figcaption className="eyebrow mt-3 text-center text-tinta-soft">Nivel {i + 1}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-xs text-tinta-soft lg:text-left">Planos e imágenes referenciales con mobiliario de ambientación.</p>
    </div>
  );
}

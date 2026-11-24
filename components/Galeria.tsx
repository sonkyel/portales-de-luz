"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, CaretLeft, CaretRight, ArrowsOut } from "@phosphor-icons/react";

const fotos = [
  { src: "/img/fachada-arcos.jpg", alt: "Fachada en perspectiva con arcos de sillar y balcones de fierro forjado", w: 1574, h: 1620, cls: "sm:col-span-2 sm:row-span-2" },
  { src: "/img/balcones.jpg", alt: "Balcones y terrazas vistos desde la calle", w: 807, h: 2117, cls: "sm:row-span-2" },
  { src: "/img/patio.jpg", alt: "Patio interior con árbol en flor", w: 1036, h: 1555, cls: "" },
  { src: "/img/fachada-lateral.jpg", alt: "Detalle de la fachada con arcos", w: 593, h: 941, cls: "col-span-2 sm:col-span-1" },
  { src: "/img/ambientes/a-sala.jpg", alt: "Sala, comedor y cocina integrados (interior referencial)", w: 1600, h: 1062, cls: "col-span-2" },
  { src: "/img/ambientes/duplex-terraza.jpg", alt: "Terraza ajardinada del dúplex (interior referencial)", w: 1600, h: 1062, cls: "col-span-2" },
];

export default function Galeria() {
  const [i, setI] = useState<number | null>(null);
  const cerrar = useCallback(() => setI(null), []);
  const mover = useCallback((d: number) => setI((v) => (v === null ? v : (v + d + fotos.length) % fotos.length)), []);

  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrar();
      if (e.key === "ArrowRight") mover(1);
      if (e.key === "ArrowLeft") mover(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [i, cerrar, mover]);

  return (
    <>
      <div className="grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:grid-cols-4 sm:gap-4">
        {fotos.map((f, k) => (
          <button
            key={f.src}
            type="button"
            onClick={() => setI(k)}
            aria-label={`Ampliar: ${f.alt}`}
            className={`group relative overflow-hidden rounded-[1.25rem] ${f.cls} ${k === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-full bg-white/85 text-granate opacity-0 transition group-hover:opacity-100">
              <ArrowsOut className="size-4.5" />
            </span>
          </button>
        ))}
      </div>

      {i !== null && (
        <div role="dialog" aria-modal="true" aria-label="Galería de imágenes" className="fixed inset-0 z-[60] flex items-center justify-center bg-granate-950/95 p-4" onClick={cerrar}>
          <button type="button" onClick={cerrar} aria-label="Cerrar" className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-crema/10 text-crema hover:bg-crema/20">
            <X className="size-6" />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); mover(-1); }} aria-label="Anterior" className="absolute left-3 grid size-11 place-items-center rounded-full bg-crema/10 text-crema hover:bg-crema/20 sm:left-6">
            <CaretLeft className="size-6" />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={fotos[i].src} alt={fotos[i].alt} width={fotos[i].w} height={fotos[i].h} sizes="90vw" className="max-h-[80vh] w-auto rounded-xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-crema/70">
              {fotos[i].alt} · {i + 1}/{fotos.length}
            </figcaption>
          </figure>
          <button type="button" onClick={(e) => { e.stopPropagation(); mover(1); }} aria-label="Siguiente" className="absolute right-3 grid size-11 place-items-center rounded-full bg-crema/10 text-crema hover:bg-crema/20 sm:right-6">
            <CaretRight className="size-6" />
          </button>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { tipologias, waLink } from "@/data/site";

const motivos = ["Quiero agendar una visita", "Quiero recibir precios y planos", "Quiero separar una unidad", "Tengo otra consulta"];

export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [interes, setInteres] = useState("");
  const [motivo, setMotivo] = useState(motivos[0]);
  const [horario, setHorario] = useState("Cualquier horario");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (nombre.trim().length < 2) {
      setError("Escribe tu nombre para que el asesor sepa cómo llamarte.");
      return;
    }
    setError("");
    const t = tipologias.find((x) => x.id === interes);
    const lineas = [
      `Hola, soy ${nombre.trim()}. ${motivo} en Portales de Luz.`,
      t ? `Me interesa: ${t.nombre}${t.area ? ` (${t.area} m²)` : ""}.` : "",
      `Horario de contacto: ${horario.toLowerCase()}.`,
      mensaje.trim(),
    ].filter(Boolean);
    window.open(waLink(lineas.join("\n")), "_blank", "noopener,noreferrer");
  }

  const campo =
    "mt-2 w-full rounded-xl border border-crema/20 bg-crema/[0.06] px-4 py-3 text-crema placeholder:text-crema/40 focus:border-arena focus:outline-none focus:ring-2 focus:ring-arena/40";

  return (
    <form onSubmit={enviar} noValidate className="rounded-[2rem] bg-granate-950/60 p-6 ring-1 ring-crema/10 backdrop-blur sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-crema/85">Tu nombre</span>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            autoComplete="given-name"
            placeholder="Ej. María"
            aria-invalid={!!error}
            aria-describedby={error ? "err-nombre" : undefined}
            className={campo}
          />
          {error && (
            <span id="err-nombre" className="mt-2 block text-sm text-arena-300">
              {error}
            </span>
          )}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-crema/85">¿Qué buscas?</span>
          <select value={motivo} onChange={(e) => setMotivo(e.target.value)} className={campo}>
            {motivos.map((m) => (
              <option key={m} className="text-tinta">
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-medium text-crema/85">Departamento de interés</span>
          <select value={interes} onChange={(e) => setInteres(e.target.value)} className={campo}>
            <option value="" className="text-tinta">
              Aún no lo sé
            </option>
            {tipologias.map((t) => (
              <option key={t.id} value={t.id} className="text-tinta">
                {t.nombre}
                {t.area ? ` · ${t.area} m²` : ""}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-medium text-crema/85">¿Cuándo te contactamos?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Mañana", "Tarde", "Noche", "Cualquier horario"].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorario(h)}
                aria-pressed={horario === h}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  horario === h ? "bg-crema text-granate" : "bg-crema/10 text-crema hover:bg-crema/20"
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block sm:col-span-2">
          <span className="text-sm font-medium text-crema/85">
            Mensaje <span className="text-crema/50">(opcional)</span>
          </span>
          <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={3} placeholder="Cuéntanos qué necesitas" className={campo} />
        </label>
      </div>

      <button
        type="submit"
        className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-crema py-4 font-bold text-granate transition hover:bg-white"
      >
        <WhatsappLogo weight="fill" className="size-5" />
        Enviar por WhatsApp
      </button>
      <p className="mt-3 text-center text-xs text-crema/50">Se abrirá WhatsApp con tu mensaje listo. No guardamos tus datos en esta página.</p>
    </form>
  );
}

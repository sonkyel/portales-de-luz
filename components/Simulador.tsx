"use client";

import { useState } from "react";
import { WhatsappLogo, Info } from "@phosphor-icons/react";
import { precios, usd, waLink } from "@/data/site";

const inicialPorPlan: Record<string, number | null> = { regular: null, inicial30: 30, inicial50: 50 };

function cuotaMensual(monto: number, tea: number, anios: number) {
  const i = Math.pow(1 + tea / 100, 1 / 12) - 1;
  const n = anios * 12;
  if (monto <= 0) return 0;
  if (i === 0) return monto / n;
  return (monto * i) / (1 - Math.pow(1 + i, -n));
}

export default function Simulador() {
  const [plan, setPlan] = useState("inicial50");
  const [inicialLibre, setInicialLibre] = useState(20);
  const [cochera, setCochera] = useState(false);
  const [deposito, setDeposito] = useState(false);
  const [tea, setTea] = useState(9);
  const [anios, setAnios] = useState(20);

  const p = precios.planes.find((x) => x.id === plan)!;
  const extra = (cochera ? precios.adicionales[0].precio : 0) + (deposito ? precios.adicionales[1].precio : 0);
  const total = p.total + extra;
  const pctInicial = inicialPorPlan[plan] ?? inicialLibre;
  const inicial = Math.round((total * pctInicial) / 100);
  const saldo = total - inicial;
  const cuota = cuotaMensual(saldo, tea, anios);
  const ahorro = precios.planes[0].total - p.total;

  const msg = `Hola, simulé en la web el flat de ${precios.area} m² (Torres B y C) con el plan "${
    p.id === "regular" ? "precio regular" : p.detalle.toLowerCase()
  }"${cochera ? " + cochera" : ""}${deposito ? " + depósito" : ""}: total ${usd(total)}. ¿Me pueden asesorar?`;

  const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
        on ? "border-granate bg-granate text-crema" : "border-granate/20 bg-white text-tinta hover:border-granate/50"
      }`}
    >
      {children}
    </button>
  );

  return (
    <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[var(--shadow-card)] lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-8 p-6 sm:p-10">
        <fieldset>
          <legend className="eyebrow w-full text-center text-granate sm:text-left">1 · Plan de pago</legend>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {precios.planes.map((x) => (
              <Chip key={x.id} on={plan === x.id} onClick={() => setPlan(x.id)}>
                <span className="block font-bold">{usd(x.m2)}/m²</span>
                <span className={`text-xs ${plan === x.id ? "text-crema/75" : "text-tinta-soft"}`}>
                  {x.id === "regular" ? "Precio regular" : x.detalle}
                </span>
              </Chip>
            ))}
          </div>
          {plan === "regular" && (
            <label className="mt-5 block">
              <span className="flex justify-between text-sm text-tinta-soft">
                Cuota inicial que puedes dar <strong className="text-tinta">{inicialLibre}%</strong>
              </span>
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={inicialLibre}
                onChange={(e) => setInicialLibre(+e.target.value)}
                className="mt-2 w-full accent-[var(--color-granate)]"
              />
            </label>
          )}
        </fieldset>

        <fieldset>
          <legend className="eyebrow w-full text-center text-granate sm:text-left">2 · Adicionales</legend>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <Chip on={cochera} onClick={() => setCochera((v) => !v)}>
              <span className="block font-bold">Cochera</span>
              <span className={`text-xs ${cochera ? "text-crema/75" : "text-tinta-soft"}`}>+ {usd(precios.adicionales[0].precio)}</span>
            </Chip>
            <Chip on={deposito} onClick={() => setDeposito((v) => !v)}>
              <span className="block font-bold">Depósito</span>
              <span className={`text-xs ${deposito ? "text-crema/75" : "text-tinta-soft"}`}>+ {usd(precios.adicionales[1].precio)}</span>
            </Chip>
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow w-full text-center text-granate sm:text-left">3 · Financiamiento del saldo (referencial)</legend>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="flex justify-between text-sm text-tinta-soft">
                Tasa anual (TEA) <strong className="text-tinta">{tea.toFixed(1)}%</strong>
              </span>
              <input type="range" min={5} max={15} step={0.5} value={tea} onChange={(e) => setTea(+e.target.value)} className="mt-2 w-full accent-[var(--color-granate)]" />
            </label>
            <label className="block">
              <span className="flex justify-between text-sm text-tinta-soft">
                Plazo <strong className="text-tinta">{anios} años</strong>
              </span>
              <input type="range" min={5} max={25} step={1} value={anios} onChange={(e) => setAnios(+e.target.value)} className="mt-2 w-full accent-[var(--color-granate)]" />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col bg-granate-950 p-6 text-center text-crema sm:p-10 lg:text-left" aria-live="polite">
        <p className="eyebrow text-arena-300">Tu simulación</p>
        <p className="mt-3 text-sm text-crema/70">
          Flat {precios.area} m² · Torres B y C{cochera ? " + cochera" : ""}
          {deposito ? " + depósito" : ""}
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-6xl">{usd(total)}</p>
        {ahorro > 0 && (
          <p className="mx-auto mt-2 inline-flex w-fit rounded-full bg-arena/20 px-3 py-1 text-xs font-semibold text-arena-300 lg:mx-0">
            Ahorras {usd(ahorro)} frente al precio regular
          </p>
        )}

        <dl className="mt-8 space-y-4 border-t border-crema/15 pt-6 text-left">
          <div className="flex justify-between gap-4">
            <dt className="text-crema/75">Cuota inicial ({pctInicial}%)</dt>
            <dd className="text-lg font-bold">{usd(inicial)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-crema/75">Saldo a financiar</dt>
            <dd className="text-lg font-bold">{usd(saldo)}</dd>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-2xl bg-crema/[0.07] p-5 text-center sm:flex-row sm:justify-between sm:gap-4 sm:p-4 sm:text-left">
            <dt className="text-crema/85">
              Cuota mensual estimada
              <span className="block text-xs text-crema/55">
                {anios} años · TEA {tea.toFixed(1)}%
              </span>
            </dt>
            <dd className="whitespace-nowrap font-[family-name:var(--font-display)] text-4xl font-semibold sm:text-3xl">{usd(Math.round(cuota))}</dd>
          </div>
        </dl>

        <p className="mt-5 flex gap-2 text-left text-xs leading-relaxed text-crema/55">
          <Info className="mt-0.5 size-4 shrink-0" />
          Simulación referencial. La tasa, el plazo y la aprobación del crédito dependen de tu banco; no incluye seguros ni gastos.
        </p>

        <a
          href={waLink(msg)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-full bg-crema px-4 py-4 text-sm font-bold text-granate transition hover:bg-white max-lg:mt-8 sm:text-base"
        >
          <WhatsappLogo weight="fill" className="size-5" />
          Enviar mi simulación a un asesor
        </a>
      </div>
    </div>
  );
}

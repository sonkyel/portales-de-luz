// Loto del logotipo de Portales de Luz (trazo lineal, hereda currentColor).
export default function Lotus({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinejoin="round"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M32 3c-6 6-6 22 0 33 6-11 6-27 0-33Z" />
      <path d="M32 36c-3-10-9-19-17-23-1 11 6 20 17 23Z" />
      <path d="M32 36c3-10 9-19 17-23 1 11-6 20-17 23Z" />
      <path d="M32 36C24 30 13 27 4 28c5 7 16 10 28 8Z" />
      <path d="M32 36c8-6 19-9 28-8-5 7-16 10-28 8Z" />
    </svg>
  );
}

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Lotus className={`h-7 w-11 ${light ? "text-crema" : "text-granate"}`} />
      <span className="flex flex-col leading-none">
        <span className={`text-[0.55rem] font-semibold tracking-[0.32em] ${light ? "text-crema/70" : "text-tinta-soft"}`}>
          CONDOMINIO
        </span>
        <span
          className={`font-[family-name:var(--font-display)] text-[1.35rem] font-semibold tracking-wide ${
            light ? "text-crema" : "text-granate"
          }`}
        >
          PORTALES DE LUZ
        </span>
      </span>
    </span>
  );
}

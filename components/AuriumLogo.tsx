// Logo de Aurium Inmobiliaria (inmobiliaria que presenta Portales de Luz).
// Isotipo vectorizado del diseño elegido (brand/aurium-icono.svg); el nombre usa Montserrat.

export function AuriumMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 792 721" fill="currentColor" className={className} aria-hidden="true">
      <defs>
        <clipPath id="aurium-interior">
          <path d="M396 178 L670 721 L122 721 Z" />
        </clipPath>
      </defs>
      <path fillRule="evenodd" d="M396 0 L790 721 L2 721 Z M396 178 L670 721 L122 721 Z" />
      <path clipPath="url(#aurium-interior)" d="M396 389 L792 633 L792 686 L396 442 L0 686 L0 633 Z" />
      <path d="M327 721 V610 A69 69 0 0 1 465 610 V721 Z" />
    </svg>
  );
}

export default function AuriumLogo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} aria-label="Aurium Inmobiliaria" role="img">
      <AuriumMark className={`h-9 w-10 ${light ? "text-crema" : "text-granate"}`} />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.15rem] font-semibold tracking-[0.22em] ${light ? "text-crema" : "text-tinta"}`}>
          AURIUM
        </span>
        <span className={`mt-1 text-[0.5rem] font-medium tracking-[0.42em] ${light ? "text-crema/60" : "text-tinta-soft"}`}>
          INMOBILIARIA
        </span>
      </span>
    </span>
  );
}

"use client";

import { useEffect, useState } from "react";
import { List, X, WhatsappLogo } from "@phosphor-icons/react";
import { Logo } from "@/components/Lotus";
import { waLink } from "@/data/site";

const links = [
  { href: "#proyecto", label: "Proyecto" },
  { href: "#departamentos", label: "Departamentos" },
  { href: "#disponibilidad", label: "Disponibilidad" },
  { href: "#precios", label: "Precios" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-crema/95 shadow-[0_1px_0_rgb(61_10_13/0.08)] backdrop-blur" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#inicio" aria-label="Portales de Luz, inicio" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.82rem] font-medium text-tinta-soft transition-colors hover:text-granate"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-granate px-5 py-2.5 text-[0.82rem] font-semibold text-crema transition hover:bg-granate-900 sm:flex"
          >
            <WhatsappLogo weight="fill" className="size-4.5" />
            Cotizar
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="grid size-11 place-items-center rounded-full text-granate lg:hidden"
          >
            {open ? <X className="size-6" /> : <List className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-granate/10 px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-[family-name:var(--font-display)] text-2xl text-granate"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-granate py-3.5 font-semibold text-crema"
          >
            <WhatsappLogo weight="fill" className="size-5" />
            Cotizar por WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

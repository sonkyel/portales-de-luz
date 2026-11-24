"use client";

import { useEffect, useState } from "react";
import { WhatsappLogo, Phone } from "@phosphor-icons/react";
import { site, waLink } from "@/data/site";

// Escritorio: botón flotante de WhatsApp. Móvil: barra fija inferior con WhatsApp y llamada.
export default function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className={`fixed bottom-6 right-6 z-40 hidden items-center gap-2.5 rounded-full bg-[#25D366] py-3.5 pl-3.5 pr-5 text-white shadow-[0_14px_34px_-10px_rgba(37,211,102,0.8)] transition-all duration-300 hover:-translate-y-0.5 sm:flex ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <WhatsappLogo weight="fill" className="size-6" />
        <span className="text-[0.9rem] font-semibold">WhatsApp</span>
      </a>

      <div
        className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-[auto_1fr] gap-2 border-t border-granate/10 bg-crema/95 p-3 backdrop-blur transition-transform duration-300 sm:hidden ${
          show ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          href={`tel:+${site.contact.whatsapp}`}
          aria-label={`Llamar al ${site.contact.phoneDisplay}`}
          className="grid size-12 place-items-center rounded-full border border-granate/25 text-granate"
        >
          <Phone weight="fill" className="size-5" />
        </a>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white"
        >
          <WhatsappLogo weight="fill" className="size-5" />
          Escríbenos por WhatsApp
        </a>
      </div>
    </>
  );
}

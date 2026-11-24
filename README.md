# Condominio Portales de Luz — Yanahuara, Arequipa

Página de una sola vista (Next.js + Tailwind) construida a partir de `brochure/PORTALEZ DE LUZ 2026.pdf`.

## Correr en local

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

> Los scripts usan `--webpack` porque Turbopack falla con la "á" de la ruta de la carpeta ("Página…"). En Vercel funciona igual.

## Dónde editar

Todo el contenido (precios, disponibilidad, tipologías, WhatsApp) está en **`data/site.ts`**.
- Disponibilidad: arreglo `disponibilidad` (estados: `libre`, `separado`, `vendido`, `duplex`, `cochera`).
- Precios: objeto `precios`.
- Imágenes: `public/img/` (recortadas del brochure).
- Ambientes interiores: `public/img/ambientes/` — generados con Higgsfield (GPT Image 2.6) usando los planos como referencia. Son referenciales, no fotos del proyecto. Originales en `brand/ambientes-originales/`.

## Pendientes

- [ ] Dominio propio (hoy: https://portales-de-luz.vercel.app, en `site.url` de `data/site.ts`).
- [x] Inmobiliaria: Aurium Inmobiliaria (logo en `brand/`, componente `components/AuriumLogo.tsx`).
- [ ] Área y precio de los dúplex (el brochure no los indica).
- [ ] Revisar la tabla de disponibilidad del brochure: `D101` aparece en piso 1 y piso 2, y la tabla de precios dice "Torre A vendida" aunque A103 figura como libre y A104 separado.
- [ ] Confirmar la ubicación exacta en Google Maps (hoy busca "Calle Quesada y Calle Arica, Yanahuara").

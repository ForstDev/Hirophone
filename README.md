# Hirophone Perú — propuesta de rediseño

Propuesta alterna de tienda en línea para [Hirophone](https://www.hirophone.com),
construida 100% en código. Hirophone vende celulares en cuotas —solo con DNI e
inicial, sin planes post pago— dentro de malls en Lima y provincia.

No hay pasarela de pagos, por diseño. El carrito termina en una **cotización por
WhatsApp**, que es como Hirophone vende hoy en tienda.

---

## Arranque rápido

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

Para producción:

```bash
npm run build
npm run start
```

Requiere Node 20.9 o superior.

---

## Stack

El mismo stack usado en la propuesta de DFG Truck Parts:

| Pieza | Elección |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Lenguaje | TypeScript en modo estricto |
| Estilos | Tailwind v4 con tokens en `app/globals.css` |
| Animación | Motion 12 (`motion/react`) |
| Scroll | Lenis |
| Iconos | Phosphor |
| Datos | JSON en `data/` (sin backend ni base de datos) |

---

## Alcance de este prototipo

Por acuerdo con el cliente, este build cubre **solo la tienda de cara al
público** (sin panel administrativo):

- Inicio, catálogo con filtros y buscador, ficha de producto, carrito →
  cotización por WhatsApp, y Nosotros con sucursales.
- El carrito vive en `localStorage` y se sincroniza entre pestañas.
- El número de WhatsApp y los textos del mensaje de cotización se cambian en
  un solo lugar: `lib/constants.ts`.

### Datos de muestra, no reales

El sitio real de Hirophone no expone un catálogo estructurado por SKU (solo
banners promocionales genéricos). Para poder diseñar y probar un flujo de
e-commerce real, este prototipo usa:

- **`data/products.json`** — 21 modelos representativos (Xiaomi, Samsung,
  Apple, Motorola, Honor) con specs, precio e inicial **ilustrativos**.
- **`data/branches.json`** — 12 sucursales de muestra repartidas en los malls
  que Hirophone menciona (Real Plaza, Mall Aventura, Mall Plaza, Open Plaza),
  8 en Lima y 4 en provincia. La web real habla de 40 tiendas en total.

Ambos archivos están pensados para reemplazarse con la data real de Hirophone
sin tocar componentes: solo hay que respetar la forma de `lib/types.ts`.

Como no existe fotografía de producto por SKU, cada tarjeta usa un ícono de
celular vectorial (`components/catalog/PhoneGlyph.tsx`) coloreado con el
acento del producto, en vez de fotografías genéricas de stock.

---

## Paleta

| Token | Valor | Uso |
| --- | --- | --- |
| `orange-500` | `#FE6601` | Color de marca exacto: precios, CTAs, ofertas |
| `orange-50…900` | — | Variaciones del naranja para fondos, hover y estados |
| `navy` | `#16213E` | Único color secundario: señales de confianza/financiamiento (badges "Nuevo", simulador de cuotas) — nunca compite con el naranja |
| `black` | `#0A0A0A` | Footer y bloques de marca, según brief |
| `ink` / `ink-soft` / `ink-mute` | — | Texto |

Tipografía: **Sora** para titulares (display), **Inter** para texto y
**JetBrains Mono** para precios y SKUs (cifras tabulares). Esquinas
redondeadas en todo el producto — es una tienda de consumo, no un catálogo
industrial.

---

## Estructura

```
app/
  page.tsx                  home
  catalogo/                 catálogo con filtros por marca/gama y buscador
  producto/[slug]/          ficha de producto + simulador de cuotas
  carrito/                  revisión de la cotización antes de WhatsApp
  nosotros/                 quiénes somos + sucursales
components/
  site/                     Header, Footer, WhatsappFloat, scroll suave
  home/                     secciones de la portada
  catalog/                  tarjeta de producto, filtros, toolbar
  product/                  agregar a cotización, simulador de cuotas
  cart/                     carrito (contexto + UI)
  nosotros/                 tarjetas y lista de sucursales
lib/
  catalog.ts                filtros, facetas, relacionados
  wa.ts                     arma el mensaje y el link de WhatsApp
  constants.ts               número de WhatsApp y textos del sitio
data/
  products.json              catálogo de muestra
  branches.json               sucursales de muestra
```

---

## Antes de llevarlo a producción

1. Reemplazar `data/products.json` y `data/branches.json` con la data real.
2. Confirmar el número de WhatsApp en `lib/constants.ts` (hoy usa el mismo
   número publicado en hirophone.com).
3. Si se decide sumar un panel de administración (edición de productos,
   ajustes, indicadores), se puede seguir el mismo patrón usado en la
   propuesta de DFG.

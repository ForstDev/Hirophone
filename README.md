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

Abre <http://localhost:3000>. El panel administrativo está en `/admin`
(usuario `admin`, contraseña `admin`).

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
| Datos | JSON en `data/` + overrides en `data/runtime/` local o Vercel Blob en producción |

---

## Alcance de este prototipo

- Inicio, catálogo con filtros y buscador, ficha de producto, carrito →
  cotización por WhatsApp, y Nosotros con sucursales.
- El carrito vive en `localStorage` y se sincroniza entre pestañas.
- **Panel admin en `/admin`**: indicadores de uso, edición de productos
  (precio, inicial, cuotas, badge, descripción y foto) y ajustes (número de
  WhatsApp, mensaje de cotización, correo). Ver detalle más abajo.

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

### Fotos de producto

19 de los 21 equipos tienen foto real en `public/products/`, sacada de las
páginas y newsrooms oficiales de cada fabricante (Xiaomi, Samsung, Apple,
Motorola, Honor) — el detalle exacto de dónde salió cada una no queda
registrado en el repo, así que antes de una campaña grande conviene
confirmar con cada marca que el uso está permitido, o reemplazarlas por
fotos propias del proveedor de Hirophone.

Quedan **2 sin foto** (Galaxy A05 y Galaxy A15): no encontré una imagen
oficial limpia — sin texto promocional encima ni especificaciones erróneas —
así que por ahora muestran el ícono vectorial de respaldo
(`components/catalog/PhoneGlyph.tsx`) en vez de forzar una que quede mal.

El panel admin (`/admin/productos`) es la forma de agregar, corregir o
reemplazar cualquier foto —subiendo un archivo o pegando una URL— sin tocar
código ni volver a desplegar.

---

## Panel administrativo

`/admin` — usuario `admin`, contraseña `admin` (cambian con las variables de
entorno `HIROPHONE_ADMIN_USER` / `HIROPHONE_ADMIN_PASS`).

- **Indicadores.** Búsquedas más frecuentes, búsquedas sin resultados,
  equipos más vistos, más agregados a cotización, marcas más consultadas,
  actividad diaria y tasas de conversión, más un bloque de salud del
  catálogo (cuántos equipos ya tienen foto real).
- **Productos.** Busca un equipo por SKU o nombre y edita precio, precio
  tachado, inicial, cuotas máximas, badge, descripción y foto (archivo o
  URL). Los cambios se guardan como *overrides* separados de
  `data/products.json` — nunca se pisa el catálogo base, y **Restaurar**
  devuelve un producto a sus valores originales.
- **Ajustes.** Número de WhatsApp, encabezado del mensaje de cotización y
  correo de contacto, con vista previa del mensaje exacto.

### Persistencia en Vercel (Vercel Blob)

El panel guarda sus cambios (overrides de producto, ajustes, eventos) como
JSON. Local, eso vive en archivos dentro de `data/runtime/` — así
`npm run dev` funciona sin configurar nada. Pero **en Vercel el filesystem de
las funciones no es persistente entre invocaciones**, así que ahí el mismo
código usa [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) en su
lugar (`lib/store.ts` elige uno u otro automáticamente según exista o no la
variable `BLOB_READ_WRITE_TOKEN`). Las fotos que se suben desde
`/admin/productos` siguen la misma regla (local a `public/uploads/`, en
Vercel a Blob).

**Para que el panel admin funcione en el despliegue de Vercel**, un único
paso manual en el dashboard (no se puede hacer por código):

1. En el proyecto en Vercel → pestaña **Storage** → **Create Database** →
   **Blob**. Conéctalo al proyecto.
2. Eso agrega solo la variable de entorno `BLOB_READ_WRITE_TOKEN` al
   proyecto. Vuelve a desplegar (o espera el próximo push) para que la
   función la recoja.
3. Opcional para desarrollar local con la misma data que producción:
   `vercel env pull .env.local` trae ese token a tu máquina.

Sin ese paso, el panel admin sigue funcionando mientras la función esté
"tibia" (no se reinicie), pero los cambios se pueden perder en cualquier
momento — por eso no conviene lanzarlo así.

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

### Logo

`public/logo.svg` es el logo real de Hirophone (Importaciones H&R S.A.C.),
un trazo monocromo. `components/brand/Logo.tsx` lo recorta a "ícono +
HIROPHONE" para el header/sidebar (`variant="compact"`, la razón social
queda ilegible tan chico) y lo muestra completo en el footer y el login del
panel (`variant="full"`), invertido a blanco sobre fondo negro con un filtro
CSS.

---

## Estructura

```
app/
  layout.tsx                 fuentes, metadata — sin header/footer
  (shop)/                     la tienda (con Header, Footer, carrito)
    page.tsx                  home
    catalogo/                 catálogo con filtros por marca/gama y buscador
    producto/[slug]/           ficha de producto + simulador de cuotas
    carrito/                  revisión de la cotización antes de WhatsApp
    nosotros/                 quiénes somos + sucursales
  admin/                      panel (login, indicadores, productos, ajustes)
  api/                        auth, admin (producto/ajustes/eventos/upload), track
proxy.ts                      protege /admin/** (Next 16 renombró middleware a proxy)
components/
  site/                       Header, Footer, WhatsappFloat, scroll suave
  home/                       secciones de la portada
  catalog/                    tarjeta de producto, filtros, toolbar, ProductMedia
  product/                    agregar a cotización, simulador de cuotas
  cart/                       carrito (contexto + UI)
  nosotros/                   tarjetas y lista de sucursales
  admin/                      componentes del panel
lib/
  catalog.ts                  filtros, facetas, relacionados, aplica overrides
  store.ts                    persistencia: archivos JSON local, Vercel Blob en producción
  stats.ts                    indicadores derivados del log de eventos
  auth.ts / session.ts        login del panel (cookie firmada)
  wa.ts                       arma el mensaje y el link de WhatsApp
  constants.ts                identidad estática del sitio (no el WhatsApp — eso es Settings)
data/
  products.json                catálogo de muestra
  branches.json                 sucursales de muestra
  runtime/                      (se crea solo) overrides, ajustes, eventos — no se versiona
```

---

## Antes de llevarlo a producción

1. Reemplazar `data/products.json` y `data/branches.json` con la data real.
2. Ir subiendo fotos reales desde `/admin/productos` (o reemplazar
   `PhoneGlyph` por fotos ya en el JSON, vía el campo `image`).
3. Si se despliega en Vercel, crear el Blob store desde el dashboard (ver
   sección de arriba) antes de depender del panel admin en serio.
4. Cambiar `admin` / `admin` por credenciales reales
   (`HIROPHONE_ADMIN_USER`, `HIROPHONE_ADMIN_PASS`) y definir
   `HIROPHONE_SESSION_SECRET` con un valor aleatorio.

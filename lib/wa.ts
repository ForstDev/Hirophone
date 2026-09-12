import type { CartLine, Settings } from "./types";
import { formatPEN } from "./format";

/**
 * No hay pasarela de pagos, por diseño: Hirophone vende por evaluación
 * crediticia en tienda, así que el carrito siempre termina en una
 * cotización por WhatsApp con DNI e inicial, nunca en un cobro en línea.
 *
 * El número y el encabezado del mensaje vienen de `Settings` (editables
 * desde /admin/ajustes), nunca de una constante fija en el código.
 */
export function buildQuoteMessage(lines: CartLine[], settings: Settings): string {
  const rows = lines.map(
    (l, i) =>
      `${i + 1}. ${l.name} (${l.brand}) | SKU ${l.sku} | Cant: ${l.qty} | Inicial desde ${formatPEN(l.initialFrom)}`,
  );
  const units = lines.reduce((n, l) => n + l.qty, 0);

  return [
    settings.quoteIntro,
    "",
    ...rows,
    "",
    `Total: ${lines.length} ${lines.length === 1 ? "equipo" : "equipos"} / ${units} ${units === 1 ? "unidad" : "unidades"}`,
    "",
    "Tengo mi DNI a la mano para la evaluación.",
  ].join("\n");
}

export function buildQuoteUrl(lines: CartLine[], settings: Settings): string {
  const text = encodeURIComponent(buildQuoteMessage(lines, settings));
  return `https://wa.me/${settings.whatsapp}?text=${text}`;
}

export function buildDirectQuoteUrl(productName: string, sku: string, settings: Settings): string {
  const text = encodeURIComponent(
    `${settings.quoteIntro}\n\n1. ${productName} | SKU ${sku} | Cant: 1\n\nTengo mi DNI a la mano para la evaluación.`,
  );
  return `https://wa.me/${settings.whatsapp}?text=${text}`;
}

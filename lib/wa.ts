import type { CartLine } from "./types";
import { SITE, WHATSAPP_NUMBER } from "./constants";
import { formatPEN } from "./format";

/**
 * There is no payment gateway in this build, by design: Hirophone vende por
 * evaluación crediticia en tienda, así que el carrito siempre termina en una
 * cotización por WhatsApp con DNI e inicial, nunca en un cobro en línea.
 */
export function buildQuoteMessage(lines: CartLine[]): string {
  const rows = lines.map(
    (l, i) =>
      `${i + 1}. ${l.name} (${l.brand}) | SKU ${l.sku} | Cant: ${l.qty} | Inicial desde ${formatPEN(l.initialFrom)}`,
  );
  const units = lines.reduce((n, l) => n + l.qty, 0);

  return [
    SITE.quoteIntro,
    "",
    ...rows,
    "",
    `Total: ${lines.length} ${lines.length === 1 ? "equipo" : "equipos"} / ${units} ${units === 1 ? "unidad" : "unidades"}`,
    "",
    "Tengo mi DNI a la mano para la evaluación.",
  ].join("\n");
}

export function buildQuoteUrl(lines: CartLine[]): string {
  const text = encodeURIComponent(buildQuoteMessage(lines));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildDirectQuoteUrl(productName: string, sku: string): string {
  const text = encodeURIComponent(
    `${SITE.quoteIntro}\n\n1. ${productName} | SKU ${sku} | Cant: 1\n\nTengo mi DNI a la mano para la evaluación.`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

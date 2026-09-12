export function formatPEN(value: number): string {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    maximumFractionDigits: 0,
  }).format(value);
}

/** "51913699836" -> "913 699 836" (quita el código de país 51 para mostrar). */
export function formatWhatsappLabel(digits: string): string {
  const local = digits.startsWith("51") ? digits.slice(2) : digits;
  return local.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
}

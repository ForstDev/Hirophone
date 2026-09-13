import clsx from "clsx";

/**
 * Logo real de Hirophone (public/logo.png), tal cual lo usan en su propio
 * sitio: ícono + "HIROPHONE" + la razón social "IMPORTACIONES H&R S.A.C.",
 * ya con su fondo naranja de marca "horneado" en la imagen (no es
 * transparente). Por eso se muestra como una placa/badge con esquinas
 * redondeadas, en vez de intentar recolorearlo para fondos oscuros.
 *
 * A tamaños chicos la razón social queda ilegible, así que la variante
 * "compact" recorta esa franja inferior con overflow-hidden y solo se ve
 * ícono + "HIROPHONE" (header, sidebar del admin). La variante "full"
 * (footer, pantalla de login) muestra el logo completo.
 */
const RATIO = 360 / 209;

export function Logo({
  className,
  variant = "full",
  size = variant === "compact" ? 48 : 64,
}: {
  className?: string;
  variant?: "full" | "compact";
  /** Alto visible en px. En "compact" es el alto ya recortado (sin la razón social). */
  size?: number;
}) {
  if (variant === "compact") {
    // La razón social ocupa ~14% del alto total del archivo: se agranda la
    // imagen y se recorta ese sobrante con el contenedor.
    const rendered = size / 0.86;
    return (
      <span
        className={clsx("relative inline-block overflow-hidden rounded-md", className)}
        style={{ height: size, width: size * RATIO }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- recorte con overflow-hidden, next/image con fill complica el mismo cálculo */}
        <img
          src="/logo.png"
          alt="Hirophone"
          width={360}
          height={209}
          className="absolute left-0 top-0 w-auto"
          style={{ height: rendered }}
        />
      </span>
    );
  }

  return (
    <span className={clsx("inline-block overflow-hidden rounded-lg", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- placa pequeña, no necesita el optimizador */}
      <img
        src="/logo.png"
        alt="Hirophone — Importaciones H&R S.A.C."
        width={360}
        height={209}
        className="block w-auto"
        style={{ height: size }}
      />
    </span>
  );
}

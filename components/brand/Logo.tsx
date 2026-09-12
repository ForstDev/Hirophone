import clsx from "clsx";

/**
 * Logo real de Hirophone (public/logo.svg): un trazo monocromo en negro sobre
 * transparente, con el ícono, "HIROPHONE" y la razón social "IMPORTACIONES
 * H&R S.A.C." como una sola pieza (no vienen separados en el archivo). En el
 * footer, sobre fondo negro, se invierte a blanco con un filtro CSS.
 *
 * A tamaños chicos la razón social queda ilegible, así que la variante
 * "compact" recorta esa franja inferior con overflow-hidden y solo se ve
 * ícono + "HIROPHONE" (header, sidebar del admin). La variante "full"
 * (footer, pantalla de login) muestra el logo completo.
 */
const RATIO = 173 / 100;

export function Logo({
  className,
  tone = "light",
  variant = "full",
  size = variant === "compact" ? 48 : 64,
}: {
  className?: string;
  tone?: "light" | "dark";
  variant?: "full" | "compact";
  /** Alto visible en px. En "compact" es el alto ya recortado (sin la razón social). */
  size?: number;
}) {
  const invert = tone === "dark" && "brightness-0 invert";

  if (variant === "compact") {
    // La razón social ocupa ~14% del alto total del archivo: se agranda la
    // imagen y se recorta ese sobrante con el contenedor.
    const rendered = size / 0.86;
    return (
      <span
        className={clsx("relative inline-block overflow-hidden", className)}
        style={{ height: size, width: size * RATIO }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG local recortado, no necesita el optimizador */}
        <img
          src="/logo.svg"
          alt="Hirophone"
          width={173}
          height={100}
          className={clsx("absolute left-0 top-0 w-auto", invert)}
          style={{ height: rendered }}
        />
      </span>
    );
  }

  return (
    <span className={clsx("inline-flex items-center", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element -- SVG local, no necesita el optimizador */}
      <img
        src="/logo.svg"
        alt="Hirophone — Importaciones H&R S.A.C."
        width={173}
        height={100}
        className={clsx("w-auto", invert)}
        style={{ height: size }}
      />
    </span>
  );
}

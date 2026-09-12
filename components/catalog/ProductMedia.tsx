import Image from "next/image";
import clsx from "clsx";
import { PhoneGlyph } from "./PhoneGlyph";

/**
 * Cada producto puede tener una foto real (subida desde el panel admin o
 * sembrada en data/products.json) o no. Sin foto, cae al ícono vectorial
 * PhoneGlyph — así el catálogo nunca muestra un hueco mientras se van
 * cargando fotos reales producto por producto.
 */
export function ProductMedia({
  image,
  accent,
  uid,
  alt,
  className,
  sizes,
}: {
  image?: string;
  accent: string;
  uid: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  if (image) {
    return (
      <div className={clsx("relative", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 22vw, 45vw"}
          className="object-contain"
          unoptimized={image.startsWith("/uploads/") || image.startsWith("http")}
        />
      </div>
    );
  }

  return <PhoneGlyph accent={accent} uid={uid} className={className} />;
}

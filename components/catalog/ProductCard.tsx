"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { Star, ShoppingBagOpen, Check } from "@phosphor-icons/react";
import type { Product } from "@/lib/types";
import { formatPEN } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { ProductMedia } from "./ProductMedia";
import { snap } from "@/lib/motion";

const BADGE_STYLES: Record<string, string> = {
  Oferta: "bg-orange-600 text-white",
  Nuevo: "bg-navy text-white",
  "Más vendido": "bg-ink text-white",
};

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  function quickAdd(e: React.MouseEvent) {
    e.preventDefault();
    cart.add({
      slug: product.slug,
      sku: product.sku,
      name: product.name,
      brand: product.brand,
      price: product.price,
      initialFrom: product.initialFrom,
      accent: product.accent,
      image: product.image,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={snap}
      className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper"
    >
      <Link href={`/producto/${product.slug}`} className="flex h-full flex-col">
        <div className="photo-plate relative aspect-[4/3.4] p-6">
          {product.badge && (
            <span
              className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[0.65rem] font-bold ${BADGE_STYLES[product.badge]}`}
            >
              {product.badge}
            </span>
          )}
          <ProductMedia
            image={product.image}
            accent={product.accent}
            uid={product.slug}
            alt={product.name}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="label text-ink-mute">{product.brand}</p>
          <h3 className="text-[0.95rem] font-bold leading-snug text-ink">{product.name}</h3>

          <div className="flex items-center gap-1 text-xs text-ink-mute">
            <Star weight="fill" className="size-3.5 text-orange-500" />
            <span className="font-semibold text-ink">{product.rating}</span>
            <span>({product.reviews})</span>
            <span className="mx-1">·</span>
            <span>{product.storageGb} GB</span>
          </div>

          <div className="mt-auto flex flex-col gap-0.5 pt-2">
            {product.compareAtPrice && (
              <span className="code-type text-xs text-ink-mute line-through">
                {formatPEN(product.compareAtPrice)}
              </span>
            )}
            <span className="code-type text-xl font-bold text-ink">
              {formatPEN(product.price)}
            </span>
            <span className="text-xs font-semibold text-navy">
              Desde {formatPEN(product.initialFrom)} de inicial
            </span>
          </div>
        </div>
      </Link>

      <button
        type="button"
        onClick={quickAdd}
        className="flex items-center justify-center gap-2 border-t border-line py-3 text-sm font-bold text-ink transition active:scale-[0.98] hover:bg-orange-50 hover:text-orange-600"
      >
        {added ? (
          <>
            <Check weight="bold" className="size-4 text-orange-600" />
            Agregado
          </>
        ) : (
          <>
            <ShoppingBagOpen weight="bold" className="size-4" />
            Agregar
          </>
        )}
      </button>
    </motion.div>
  );
}

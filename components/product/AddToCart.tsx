"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBagOpen, WhatsappLogo, Check } from "@phosphor-icons/react";
import type { Product, Settings } from "@/lib/types";
import { useCart } from "@/components/cart/CartProvider";
import { buildDirectQuoteUrl } from "@/lib/wa";
import { track } from "@/lib/track";

export function AddToCart({ product, settings }: { product: Product; settings: Settings }) {
  const cart = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    track({ type: "view", slug: product.slug, sku: product.sku, name: product.name, brand: product.brand });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  function handleAdd() {
    cart.add(
      {
        slug: product.slug,
        sku: product.sku,
        name: product.name,
        brand: product.brand,
        price: product.price,
        initialFrom: product.initialFrom,
        accent: product.accent,
        image: product.image,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-11 items-center justify-center text-ink-soft hover:text-orange-600"
            aria-label="Reducir cantidad"
          >
            <Minus weight="bold" className="size-4" />
          </button>
          <span className="code-type w-8 text-center text-sm font-bold">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(10, q + 1))}
            className="flex size-11 items-center justify-center text-ink-soft hover:text-orange-600"
            aria-label="Aumentar cantidad"
          >
            <Plus weight="bold" className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-black"
        >
          {added ? (
            <>
              <Check weight="bold" className="size-4" />
              Agregado a tu cotización
            </>
          ) : (
            <>
              <ShoppingBagOpen weight="bold" className="size-4" />
              Agregar a cotización
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={buildDirectQuoteUrl(product.name, product.sku, settings)}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-600"
        >
          <WhatsappLogo weight="fill" className="size-4" />
          Cotizar este equipo ahora
        </a>
        {added && (
          <button
            type="button"
            onClick={cart.open}
            className="text-xs font-bold text-orange-600 underline underline-offset-2"
          >
            Ver mi cotización
          </button>
        )}
      </div>
    </div>
  );
}

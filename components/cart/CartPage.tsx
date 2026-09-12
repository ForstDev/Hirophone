"use client";

import Link from "next/link";
import { Trash, WhatsappLogo, ShoppingBagOpen, CaretRight } from "@phosphor-icons/react";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";
import { ProductMedia } from "@/components/catalog/ProductMedia";
import { formatPEN } from "@/lib/format";
import { buildQuoteMessage, buildQuoteUrl } from "@/lib/wa";
import { track } from "@/lib/track";

export function CartPage() {
  const cart = useCart();

  if (!cart.ready) return null;

  if (cart.lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-line-strong py-24 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-surface-2 text-ink-mute">
          <ShoppingBagOpen className="size-6" />
        </span>
        <div>
          <p className="font-bold text-ink">Tu cotización está vacía</p>
          <p className="mt-1 text-sm text-ink-soft">
            Agrega equipos desde el catálogo para armar tu cotización por WhatsApp.
          </p>
        </div>
        <Link
          href="/catalogo"
          className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600"
        >
          Ver catálogo
          <CaretRight weight="bold" className="size-3.5" />
        </Link>
      </div>
    );
  }

  const initialTotal = cart.lines.reduce((sum, l) => sum + l.initialFrom * l.qty, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <div className="flex flex-col gap-4">
        {cart.lines.map((line) => (
          <div
            key={line.slug}
            className="flex items-center gap-4 rounded-lg border border-line bg-paper p-4"
          >
            <div className="photo-plate relative size-20 shrink-0 rounded-md p-2">
              <ProductMedia
                image={line.image}
                accent={line.accent}
                uid={`cart-${line.slug}`}
                alt={line.name}
                className="h-full w-full"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="label text-ink-mute">{line.brand}</p>
              <Link
                href={`/producto/${line.slug}`}
                className="block truncate font-bold text-ink hover:text-orange-600"
              >
                {line.name}
              </Link>
              <p className="code-type mt-1 text-sm text-ink-soft">{formatPEN(line.price)}</p>
            </div>
            <QtyStepper qty={line.qty} onChange={(q) => cart.setQty(line.slug, q)} />
            <button
              type="button"
              onClick={() => cart.remove(line.slug)}
              aria-label="Quitar"
              className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-mute hover:bg-orange-50 hover:text-orange-600"
            >
              <Trash weight="bold" className="size-4" />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={cart.clear}
          className="w-fit text-xs font-bold text-ink-mute hover:text-orange-600"
        >
          Vaciar cotización
        </button>
      </div>

      <div className="flex h-fit flex-col gap-5 rounded-lg border border-line bg-surface p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">Resumen</p>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Equipos</span>
            <span className="font-bold text-ink">{cart.units}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-ink-soft">Inicial estimada</span>
            <span className="code-type font-bold text-navy">{formatPEN(initialTotal)}</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-ink-mute">
            Mensaje que se enviará
          </p>
          <pre className="thin-scroll mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap rounded-md border border-line bg-paper p-3 text-xs text-ink-soft">
            {buildQuoteMessage(cart.lines, cart.settings)}
          </pre>
        </div>

        <a
          href={buildQuoteUrl(cart.lines, cart.settings)}
          target="_blank"
          rel="noreferrer"
          onClick={() => track({ type: "quote", lines: cart.lines.length, units: cart.units })}
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white hover:brightness-95"
        >
          <WhatsappLogo weight="fill" className="size-4" />
          Enviar cotización por WhatsApp
        </a>
        <p className="text-center text-[0.7rem] text-ink-mute">
          Sin pagos en línea: la evaluación y la compra se confirman en tienda con tu DNI.
        </p>
      </div>
    </div>
  );
}

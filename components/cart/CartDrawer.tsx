"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X, Trash, WhatsappLogo, ShoppingBagOpen, CaretRight } from "@phosphor-icons/react";
import { useCart } from "./CartProvider";
import { QtyStepper } from "./QtyStepper";
import { ProductMedia } from "@/components/catalog/ProductMedia";
import { formatPEN } from "@/lib/format";
import { buildQuoteMessage, buildQuoteUrl } from "@/lib/wa";
import { track } from "@/lib/track";
import { expo } from "@/lib/motion";

/**
 * La cotización vive en un panel, no en /carrito: se abre sobre cualquier
 * página sin perder el contexto del catálogo. El panel queda separado de los
 * cuatro bordes de la pantalla a propósito, para que las cuatro esquinas se
 * vean redondeadas en vez de la típica hoja lateral a bordes rectos.
 */
export function CartDrawer() {
  const cart = useCart();

  if (!cart.ready) return null;

  const initialTotal = cart.lines.reduce((sum, l) => sum + l.initialFrom * l.qty, 0);

  return (
    <AnimatePresence>
      {cart.isOpen && (
        <>
          <motion.div
            key="cart-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={cart.close}
            className="fixed inset-0 bg-ink/50 backdrop-blur-[2px]"
            style={{ zIndex: "var(--z-drawer)" }}
          />

          <motion.aside
            key="cart-panel"
            initial={{ x: "110%" }}
            animate={{ x: 0 }}
            exit={{ x: "110%" }}
            transition={expo(0.45)}
            role="dialog"
            aria-label="Tu cotización"
            className="thin-scroll fixed inset-y-3 right-3 flex w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl bg-paper shadow-2xl"
            style={{ zIndex: "var(--z-drawer)" }}
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-4">
              <h2 className="text-base font-bold text-ink">Tu cotización</h2>
              <button
                type="button"
                onClick={cart.close}
                aria-label="Cerrar"
                className="flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-surface hover:text-ink"
              >
                <X size={19} weight="bold" />
              </button>
            </header>

            {cart.lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
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
                  onClick={cart.close}
                  className="flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-orange-600"
                >
                  Ver catálogo
                  <CaretRight weight="bold" className="size-3.5" />
                </Link>
              </div>
            ) : (
              <>
                <div className="thin-scroll flex flex-1 flex-col gap-3 overflow-y-auto px-5 py-4">
                  {cart.lines.map((line) => (
                    <div
                      key={line.slug}
                      className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3"
                    >
                      <div className="photo-plate relative size-16 shrink-0 rounded-lg p-2">
                        <ProductMedia
                          image={line.image}
                          accent={line.accent}
                          uid={`drawer-${line.slug}`}
                          alt={line.name}
                          className="h-full w-full"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="label text-ink-mute">{line.brand}</p>
                        <Link
                          href={`/producto/${line.slug}`}
                          onClick={cart.close}
                          className="block truncate text-sm font-bold text-ink hover:text-orange-600"
                        >
                          {line.name}
                        </Link>
                        <p className="code-type mt-0.5 text-xs text-ink-soft">
                          {formatPEN(line.price)}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2">
                        <QtyStepper qty={line.qty} onChange={(q) => cart.setQty(line.slug, q)} />
                        <button
                          type="button"
                          onClick={() => cart.remove(line.slug)}
                          aria-label="Quitar"
                          className="text-ink-mute transition-colors hover:text-orange-600"
                        >
                          <Trash weight="bold" className="size-4" />
                        </button>
                      </div>
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

                <footer className="flex shrink-0 flex-col gap-3 border-t border-line bg-surface px-5 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Equipos</span>
                    <span className="font-bold text-ink">{cart.units}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Inicial estimada</span>
                    <span className="code-type font-bold text-navy">
                      {formatPEN(initialTotal)}
                    </span>
                  </div>

                  <details className="text-xs text-ink-mute">
                    <summary className="cursor-pointer font-bold text-ink-soft">
                      Ver mensaje que se enviará
                    </summary>
                    <pre className="thin-scroll mt-2 max-h-32 overflow-y-auto whitespace-pre-wrap rounded-md border border-line bg-paper p-3 text-[0.7rem] text-ink-soft">
                      {buildQuoteMessage(cart.lines, cart.settings)}
                    </pre>
                  </details>

                  <a
                    href={buildQuoteUrl(cart.lines, cart.settings)}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      track({ type: "quote", lines: cart.lines.length, units: cart.units })
                    }
                    className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white transition active:scale-[0.97] hover:brightness-95"
                  >
                    <WhatsappLogo weight="fill" className="size-4" />
                    Enviar cotización por WhatsApp
                  </a>
                  <p className="text-center text-[0.65rem] text-ink-mute">
                    Sin pagos en línea: la compra se confirma en tienda con tu DNI.
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

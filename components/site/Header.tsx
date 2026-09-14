"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { List, X, MagnifyingGlass, ShoppingBagOpen } from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { snap } from "@/lib/motion";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useCart();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <div className="sticky top-0 z-40" style={{ zIndex: "var(--z-header)" }}>
      <header className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Logo variant="compact" />
          </Link>

          {/* Todo lo interactivo vive junto, pegado a la derecha del logo. */}
          <div className="flex items-center gap-2 sm:gap-3">
            <nav className="hidden items-center gap-7 pr-2 lg:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-sm font-semibold transition-colors hover:text-orange-600 ${
                    isActive(item.href) ? "text-orange-600" : "text-ink-soft"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <HeaderSearch />

            <button
              type="button"
              onClick={cart.open}
              aria-label="Ver cotización"
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition active:scale-95 hover:border-orange-300 hover:text-orange-600"
            >
              <ShoppingBagOpen className="size-5" />
              {cart.ready && cart.units > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-navy text-[0.65rem] font-bold text-white">
                  {cart.units}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition active:scale-95 lg:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <List className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={snap}
              className="overflow-hidden border-t border-line bg-paper lg:hidden"
            >
              <div className="shell flex flex-col gap-1 py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`rounded-lg px-3 py-3 text-base font-semibold hover:bg-surface ${
                      isActive(item.href) ? "text-orange-600" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}

/**
 * Solo la lupa hasta que se toca: recién ahí aparece el campo de texto,
 * expandiéndose desde el ícono en vez de ocupar espacio todo el tiempo.
 */
function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const term = query.trim();
    router.push(term ? `/catalogo?q=${encodeURIComponent(term)}` : "/catalogo");
    setOpen(false);
    setQuery("");
  }

  return (
    <div className="flex items-center">
      <AnimatePresence initial={false}>
        {open && (
          <motion.form
            onSubmit={onSubmit}
            initial={{ width: 0, opacity: 0, marginRight: 0 }}
            animate={{ width: 220, opacity: 1, marginRight: 8 }}
            exit={{ width: 0, opacity: 0, marginRight: 0 }}
            transition={snap}
            className="overflow-hidden"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
              placeholder="Buscar un equipo…"
              className="h-11 w-[220px] rounded-full border border-line bg-surface px-4 text-sm text-ink outline-none placeholder:text-ink-mute"
            />
          </motion.form>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar búsqueda" : "Buscar"}
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition active:scale-95 hover:border-orange-300 hover:text-orange-600"
      >
        {open ? <X className="size-5" /> : <MagnifyingGlass className="size-5" />}
      </button>
    </div>
  );
}

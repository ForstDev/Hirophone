"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  List,
  X,
  MagnifyingGlass,
  ShoppingBagOpen,
  CaretRight,
} from "@phosphor-icons/react";
import { Logo } from "@/components/brand/Logo";
import { useCart } from "@/components/cart/CartProvider";
import { snap } from "@/lib/motion";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/nosotros#sucursales", label: "Sucursales" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const cart = useCart();
  const router = useRouter();

  function onSearch(e: React.FormEvent) {
    e.preventDefault();
    const term = query.trim();
    router.push(term ? `/catalogo?q=${encodeURIComponent(term)}` : "/catalogo");
    setMenuOpen(false);
  }

  return (
    <div className="sticky top-0 z-40" style={{ zIndex: "var(--z-header)" }}>
      <header className="border-b border-line bg-paper/95 backdrop-blur">
        <div className="shell flex h-[76px] items-center justify-between gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
            <Logo variant="compact" />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink-soft transition-colors hover:text-orange-600"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form
            onSubmit={onSearch}
            className="hidden max-w-xs flex-1 items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 md:flex"
          >
            <MagnifyingGlass className="size-4 text-ink-mute" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar Xiaomi, Samsung, iPhone…"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-mute"
            />
          </form>

          <div className="flex items-center gap-2">
            <Link
              href="/catalogo"
              className="hidden shrink-0 items-center gap-2 rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-orange-600 sm:flex"
            >
              Ver catálogo
              <CaretRight weight="bold" className="size-3.5" />
            </Link>

            <Link
              href="/carrito"
              aria-label="Carrito de cotización"
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-orange-300 hover:text-orange-600"
            >
              <ShoppingBagOpen className="size-5" />
              {cart.ready && cart.units > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-navy text-[0.65rem] font-bold text-white">
                  {cart.units}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-ink lg:hidden"
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
                <form onSubmit={onSearch} className="mb-2 flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5">
                  <MagnifyingGlass className="size-4 text-ink-mute" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar un equipo…"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-ink-mute"
                  />
                </form>
                {NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-surface"
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

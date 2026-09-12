"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { CartLine, Settings } from "@/lib/types";
import { track } from "@/lib/track";

const STORAGE_KEY = "hirophone.cart.v1";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  units: number;
  ready: boolean;
  isOpen: boolean;
  settings: Settings;
  /** Devuelve la cantidad resultante para que quien llama confirme la acción. */
  add: (line: Omit<CartLine, "qty">, qty?: number) => number;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

const noopSubscribe = () => () => {};

export function CartProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  const [lines, setLines] = useState<CartLine[]>(() =>
    typeof window === "undefined" ? [] : readStoredCart(),
  );
  const [isOpen, setIsOpen] = useState(false);
  const ready = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable: cart still works for this tab */
    }
  }, [lines, ready]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || e.newValue === null) return;
      try {
        setLines(JSON.parse(e.newValue) as CartLine[]);
      } catch {
        /* ignore malformed payload from another tab */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((line: Omit<CartLine, "qty">, qty = 1) => {
    let resulting = qty;
    setLines((prev) => {
      const found = prev.find((l) => l.slug === line.slug);
      if (found) {
        resulting = Math.min(99, found.qty + qty);
        return prev.map((l) => (l.slug === line.slug ? { ...l, qty: resulting } : l));
      }
      return [...prev, { ...line, qty }];
    });
    track({ type: "cart_add", slug: line.slug, sku: line.sku, name: line.name, qty });
    return resulting;
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(99, qty) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.length,
      units: lines.reduce((n, l) => n + l.qty, 0),
      ready,
      isOpen,
      settings,
      add,
      setQty,
      remove,
      clear,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [lines, ready, isOpen, settings, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

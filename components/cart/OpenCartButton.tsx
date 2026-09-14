"use client";

import { useCart } from "./CartProvider";

/** Abre el panel de cotización. Mismo trato visual que un link de texto normal. */
export function OpenCartButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const cart = useCart();
  return (
    <button type="button" onClick={cart.open} className={className}>
      {children}
    </button>
  );
}

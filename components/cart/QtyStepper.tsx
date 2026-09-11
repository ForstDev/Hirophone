"use client";

import { Minus, Plus } from "@phosphor-icons/react";

export function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex items-center rounded-full border border-line">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        className="flex size-9 items-center justify-center text-ink-soft hover:text-orange-600"
        aria-label="Reducir cantidad"
      >
        <Minus weight="bold" className="size-3.5" />
      </button>
      <span className="code-type w-7 text-center text-sm font-bold">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        className="flex size-9 items-center justify-center text-ink-soft hover:text-orange-600"
        aria-label="Aumentar cantidad"
      >
        <Plus weight="bold" className="size-3.5" />
      </button>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowClockwise } from "@phosphor-icons/react";

export function ResetEvents() {
  const router = useRouter();
  const [armed, setArmed] = useState(false);
  const [pending, start] = useTransition();

  const reset = async () => {
    await fetch("/api/admin/events", { method: "DELETE" });
    setArmed(false);
    start(() => router.refresh());
  };

  if (!armed) {
    return (
      <button
        onClick={() => setArmed(true)}
        className="inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-paper px-3.5 py-2.5 text-xs font-semibold text-ink-mute transition-colors hover:border-ink hover:text-ink"
      >
        <ArrowClockwise size={14} weight="bold" />
        Reiniciar métricas
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-full border border-orange-500 bg-orange-50 px-3 py-2">
      <span className="text-xs font-semibold text-orange-700">Se borra todo el historial</span>
      <button
        onClick={reset}
        disabled={pending}
        className="rounded-full bg-orange-500 px-3 py-1.5 text-[11.5px] font-bold text-white transition enabled:active:scale-[0.97] hover:bg-orange-600 disabled:opacity-60"
      >
        {pending ? "Borrando" : "Confirmar"}
      </button>
      <button
        onClick={() => setArmed(false)}
        className="px-2 text-xs font-semibold text-ink-mute hover:text-ink"
      >
        Cancelar
      </button>
    </div>
  );
}

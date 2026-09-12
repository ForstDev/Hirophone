"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, SpinnerGap } from "@phosphor-icons/react";

export function AdminSearch({
  initialValue,
  estado,
}: {
  initialValue: string;
  estado: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState(initialValue);
  const [pending, start] = useTransition();

  useEffect(() => {
    if (value === initialValue) return;

    const timer = window.setTimeout(() => {
      const sp = new URLSearchParams();
      if (value.trim()) sp.set("q", value.trim());
      if (estado && estado !== "todos") sp.set("estado", estado);
      const qs = sp.toString();
      start(() => router.replace(qs ? "/admin/productos?" + qs : "/admin/productos"));
    }, 280);

    return () => window.clearTimeout(timer);
  }, [value, initialValue, estado, router]);

  return (
    <div className="flex w-full items-center gap-2.5 rounded-full border border-line-strong bg-paper px-3.5 lg:max-w-[420px]">
      <MagnifyingGlass size={17} weight="bold" className="shrink-0 text-ink-mute" />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Buscar por SKU o nombre"
        aria-label="Buscar producto para editar"
        className="h-11 w-full bg-transparent text-[13.5px] text-ink placeholder:text-ink-mute focus:outline-none"
      />
      {pending && <SpinnerGap size={16} className="shrink-0 animate-spin text-ink-mute" />}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Registra la búsqueda una vez por término, para alimentar los indicadores del panel. */
export function SearchTracker({ term, results }: { term: string; results: number }) {
  useEffect(() => {
    if (!term) return;
    track({ type: "search", term, results });
  }, [term, results]);

  return null;
}
